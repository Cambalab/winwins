<?php namespace Winwins\Http\Controllers;

use JWT;
use Auth;
use Log;
use DB;
use Config;
use Validator;
use Storage;
use Response;
use Illuminate\Support\Collection;
use Winwins\Http\Requests;
use Winwins\Http\Controllers\Controller;
use Winwins\User;
use Winwins\Group;
use Winwins\GroupsUser;
use Winwins\GroupsWinwin;
use Winwins\Model\Repository\GroupRepository;
use Winwins\SponsorsGroup;
use Winwins\Winwin;
use Winwins\Post;
use Winwins\Media;
use Winwins\Message\Mailer;
use Winwins\Message\Message;
use Winwins\InterestsInterested;

use Illuminate\Http\Request;

class GroupController extends Controller {

    public function __construct() {
        $this->middleware('auth', ['except' => ['paginate', 'index', 'show', 'search', 'socialShow']]);
    }

    public function paginate(Request $request, $page = 0, $amount = 15) {
        $groups = DB::table('groups')->where('private', '=', 0)->skip($page * $amount)->take($amount)->get();
        $collection = Collection::make($groups);
        $collection->each(function($group) {
            $users_count = DB::table('users')
                ->join('groups_users', 'users.id', '=', 'groups_users.user_id')
                ->where('groups_users.group_id', '=', $group->id)->count();
            $group->users_already_joined = $users_count;
        });
        return $collection;
    }



	public function index() {
        $groups = Group::all();
        $collection = Collection::make($groups);
        $collection->each(function($group) {
            $users_count = count($group->users);
            $group->users_already_joined = $users_count;
        });
        return $collection;

	}

    public function getGroupsByUser(Request $request) {

        $user = User::find($request['user']['sub']);
        
        $groups = Group::where('user_id', '=', $user->getId());
        $collection = Collection::make($groups);
        $collection->each(function($group) {
            $users_count = count($group->users);
            $group->users_already_joined = $users_count;
        });
        
        return $collection;
    }

	public function updateGroup(Request $request, $id ) {
        $user = User::find($request['user']['sub']);
        $group = Group::find($id);

        DB::transaction(function() use ($request, $group, $user) {

            $group->name = $request->input('name');
            $group->description = $request->input('description');
            $group->private = $request->input('private') ? 1 : 0;
            $group->control_ww = $request->input('control_ww') ? 1 : 0;
            $group->confirm_ww = $request->input('confirm_ww') ? 1 : 0;

            $group->photo = $request->input('photo');
            if( !isset($group->photo) ) {
                $group->photo = $request->input('gallery_image');
                if( !isset($group->photo) ) {
                    $group->photo = 'group-default.gif';
                }
            }

            $group->save();

        });

        Log::info('grupo updated');
        return $group;
	}

    public function storeImage(Request $request, Media $media) {

        $user = User::find($request['user']['sub']);

        if(!$request->hasFile('file')) {
            return Response::json(['error' => 'no_file_sent']);
        }

        if(!$request->file('file')->isValid()) {
            return Response::json(['error' => 'file_not_valid']);
        }

        $file = $request->file('file');

        $v = Validator::make(
            $request->all(),
            ['file' => 'required|mimes:jpeg,jpg,png|max:8000']
        );

        if($v->fails()) {
            return Response::json(['error' => $v->errors()]);
        }


        $image = Media::create([
            'name' => $request->file('file')->getClientOriginalName(),
            'ext' => $request->file('file')->guessExtension(),
            'user_id' => $user->id || 1,
            'bucket' => 'S3',
            'type' => 'IMAGE'
        ]);

        $filename = 'group_'.md5(strtolower(trim($image->name))).'_'.$image->id . '.' . $image->ext;

        Storage::disk('s3-gallery')->put('/' . $filename, file_get_contents($file), 'public');
        $image->name = $filename;
        $image->save();

        return Response::json(['OK' => 1, 'filename' => $filename]);
    }


	public function store(Request $request) {
        $user = User::find($request['user']['sub']);

        $group = new Group;
        DB::transaction(function() use ($request, $group, $user) {

            $group->name = $request->input('name');
            $group->description = $request->input('description');
            $group->private = $request->input('private') ? 1 : 0;
            $group->control_ww = $request->input('control_ww') ? 1 : 0;
            $group->confirm_ww = $request->input('confirm_ww') ? 1 : 0;
            $group->photo = $request->input('photo');

            if( !isset($group->photo) ) {
                $group->photo = 'group-default.gif';
            }

            $group->user_id = $user->id;
            $group->save();
                 
            $groupsUsers = new GroupsUser;
            $groupsUsers->user_id = $user->id;
            $groupsUsers->group_id = $group->id;
            $groupsUsers->moderator = true;

            if($request->has('interests')) {
                $text_interest = Collection::make($request->input('interests'))->pluck('name')->toArray();
                $group->categories_text = implode(" ",$text_interest);
            }

            if($request->has('interests')) {
                $interests = $request->input('interests');
                foreach($interests as $interest) {

                    $interestsInterested = InterestsInterested::firstOrCreate([
                        'interest_id' => $interest['id'],
                        'interested_id' => $group->id,
                        'type' => 'GROUP'
                    ]);
                }
            }

            $groupsUsers->save();

            $user->newActivity()
                ->from($user)
                ->withType('GROUP_CREATED')
                ->withSubject('you_have_created_new_group_title')
                ->withBody('you_have_created_new_group_title_body')
                ->regarding($group)
                ->deliver();


        });

        Log::info('grupo creado');
        return $group;
	}


	public function show(Request $request, $id) {
        $group = Group::find($id);

        $user = false;
        $token = $request->input('_token') ?: $request->header('X-XSRF-TOKEN');
        if ( $token )  {
            $token = $request->header('Authorization');
            if(isset($token[1])) {
                $token = explode(' ', $request->header('Authorization'))[1];
                $payload = (array) JWT::decode($token, Config::get('app.token_secret'), array('HS256'));
                $user = User::find($payload['sub']);
            }
        }

        $group->members_count = count($group->users);
        $group->winwins;

        $group->winwins->each(function($winwin) {
            $users_count = count($winwin->users);
            $winwin->users_already_joined = $users_count;
        });

        $group->sponsors;

        $group->interests = DB::table('interests')
            ->join('interests_interested', 'interests.id', '=', 'interests_interested.interest_id')
            ->where('type', '=', 'GROUP')
            ->where('interested_id', '=', $group->id)
            ->select('interests.name','interests.description', 'interests.id')
            ->get();

        $group->already_joined = false;

        $group->posts = DB::table('posts')
            ->where('type', '=', 'GROUP')
            ->where('reference_id', '=', $group->id)->get();

        if($user) {
            $group->is_creator = ( $group->user_id == $user->id );
            $group->already_joined = count($group->users->filter(function($model) use ($user) {
                $model->detail;
                return $model->id == $user->id;
            })) > 0;
            $group->is_admin = ($user->id == $group->user_id);
        }

        return $group;
	}

    public function socialShow(Request $request, $id) {
        $group = Group::find($id);
        $group_user = $group->user;
        $group_user->detail;
        return view('groups.view', [
            'group' => $group,
            'facebook_app_id' => Config::get('app.facebook_app_id'),
            'url_base' => Config::get('app.url'),
            'url_images' => Config::get('app.url_images')
        ]);
    }


	public function update($id) {
        $group = Group::find($id);
        //Set updated

        $group->save();
        return $group;
	}

	public function destroy($id) {
        Group::destroy($id);
	}

    //Actions
	public function search(Request $request, GroupRepository $groupRepository) {
        $query = $request->input('q');
        return $groupRepository->search($query);
    }


	public function join(Request $request, $id) {
        $user = User::find($request['user']['sub']);
        $group = Group::find($id);
        $group->user();
        if($user->id == $group->user->id) {
            return response()->json(['message' => 'join_as_owner_already_joined'], 400);
        } else {
            $already_joined = count($group->users->filter(function($model) use ($user) {
                return $model->id == $user->id;
            })) > 0;

            if($already_joined) {
                return response()->json(['message' => 'join_already_joined'], 400);
            } else {
                DB::transaction(function() use ($group, $user) {
                    $groupsUsers = new GroupsUser;
                    $groupsUsers->user_id = $user->id;
                    $groupsUsers->group_id = $group->id;
                    $groupsUsers->moderator = false;
                    $groupsUsers->save();

                    $user->newActivity()
                        ->from($user)
                        ->withType('GROUP_JOIN')
                        ->withSubject('you_have_join_group_title')
                        ->withBody('you_have_join_group_title_body')
                        ->regarding($group)
                        ->deliver();


                });
            }
        }
	}

	public function left(Request $request, $id) {
        $user = User::find($request['user']['sub']);
        $group = Group::find($id);
        $group->user();
        if($user->id == $group->user->id) {
            return response()->json(['message' => 'left_owner_cant'], 400);
        } else {
            $already_joined = count($group->users->filter(function($model) use ($user) {
                return $model->id == $user->id;
            })) > 0;

            if(!$already_joined) {
                return response()->json(['message' => 'left_first_join'], 400);
            } else {
                DB::transaction(function() use ($group, $user) {
                    DB::table('groups_users')->where('user_id', $user->id )->where('group_id', $group->id)->delete();

                    $user->newActivity()
                        ->from($user)
                        ->withType('GROUP_LEFT')
                        ->withSubject('you_have_left_group_title')
                        ->withBody('you_have_left_group_title_body')
                        ->regarding($group)
                        ->deliver();

                });


            }
        }
	}

	public function addWinwin($id, $winwin_id) {
        $group = Group::find($id);
        $winwin = Winwin::find($winwin_id);

        $already_joined = false;
        $already_joined = count($group->winwins->filter(function($model) use ($winwin) {
            return $model->id == $winwin->id;
        })) > 0;

        if($already_joined) {
            return response()->json(['message' => 'group_add_winwin_already_joined'], 400);
        } else {
            DB::transaction(function() use ($group, $winwin) {
                $groupsWinwins = new GroupsWinwin;
                $groupsWinwins->winwin_id = $winwin->id;
                $groupsWinwins->group_id = $group->id;
                $groupsWinwins->pending = true;
                $groupsWinwins->save();
            });
        }

        $group = Group::find($id);
        $group->winwins;

        return $group;
	}

	public function removeWinwin($id, $winwin_id) {
        $group = Group::find($id);
        $winwin = Winwin::find($winwin_id);

        $already_joined = count($group->winwins->filter(function($model) use ($winwin) {
            return $model->id == $winwin->id;
        })) > 0;

        if(!$already_joined) {
            return response()->json(['message' => 'group_remove_winwin_not_joined'], 400);
        } else {
            DB::table('groups_winwins')->where('winwin_id', $winwin->id )->where('group_id', $group->id)->delete();
        }

	}

    public function sentEmailInvitations(Request $request, Mailer $mailer, $groupId) {

        $template_name = 'winwin_group_invitation';
        $user = User::find($request['user']['sub']);
        $group = Group::find($groupId);
        $detail = $user->detail;

        foreach($request->input('mails') as $recipient) {
            $message = new Message($template_name, array(
                'meta' => array(
                    'base_url' => Config::get('app.url'),
                    'group_link' => Config::get('app.url').'/#/group/'.$group->id,
                    'logo_url' => 'http://winwins.org/assets/imgs/logo-winwins_es.gif'
                ),
                'sender' => array(
                    'name' => $detail->name,
                    'lastname' => $detail->lastname,
                    'photo' => Config::get('app.url_images').'/72x72/smart/'.$detail->photo,
                ),
                'group' => array(
                    'id' => $group->id,
                    'users_amount' => count($group->users),
                    'what_we_do' => $group->description,
                ),

            ));
            $message->subject('WW - '.$group->title);
            $message->to(null, $recipient);
            $message_sent = $mailer->send($message);
        }

        return response()->json(['message' => 'winwin_emails_sent'], 200);
    }

	public function create() {
		//
	}

	public function edit($id) {
		//
	}

	public function conversation(Request $request, $id) {
        $user = User::find($request['user']['sub']);

        $post = new Post;

        DB::transaction(function() use ($request, $post, $user, $id) {
            $post->reference_id = $id;
            $post->type = 'CONVERSATION';
            $post->user_id = $user->id;
            $post->title = $request->input('title');
            $post->content = $request->input('content');
            $post->save();
        });

        return $this->group_thread($id);                                    
	}



    public function thread(Request $request, $id) {
        return $this->group_thread($id);                                    
    }

    public function group_thread($id) {
        $comments = DB::table('posts')
            ->select('posts.id', 'posts.title', 'posts.content', 'posts.created_at', 'posts.user_id', 'user_details.photo', 'user_details.name')
            ->join('user_details', 'posts.user_id', '=', 'user_details.user_id')
            ->join('groups', 'posts.reference_id', '=', 'groups.id')
            ->where('posts.reference_id', '=', $id)->where('posts.type', 'CONVERSATION')->orderBy('posts.created_at', 'desc')->get();
        
        Log::info($comments);

        $collection = Collection::make($comments);
        $collection->each(function($comment) {
            //Log::info($comment);
            $replies = DB::table('posts')
                ->select('posts.content', 'posts.created_at', 'posts.user_id', 'user_details.photo', 'user_details.name')
                ->join('user_details', 'posts.user_id', '=', 'user_details.user_id')
                ->where('posts.reference_id', '=', $comment->id)->where('posts.type', 'REPLY')->orderBy('posts.created_at', 'desc')->get();
            $comment->replies = $replies;
        });

        return $comments;

    }


	public function conversation_reply(Request $request, $groupId, $id) {
        $user = User::find($request['user']['sub']);

        $post = new Post;

        DB::transaction(function() use ($request, $post, $user, $id) {
            $post->reference_id = $id;
            $post->type = 'REPLY';
            $post->user_id = $user->id;
            $post->content = $request->input('content');
            $post->save();
        });

        return $this->group_thread($groupId);                                    
                                    
	}


	public function sponsorRequest(Request $request, $id) {
        $user = User::find($request['user']['sub']);
        $sponsor = $user->sponsor;

        $group = Group::find($id);
        $group_user = $group->user;
        $request_body = $request->input('body');

        if(!isset($sponsor)) {
            return response()->json(['message' => 'you_are_not_an_sponsor'], 400);
        } else {
            $already_sponsored = count($group->sponsors->filter(function($model) use ($sponsor) {
                return $model->id == $sponsor->id;
            })) > 0;

            if($already_sponsored) {
                return response()->json(['message' => 'you_are_already_sponsored_this_group'], 400);
            } else {
                DB::transaction(function() use ($group, $user, $sponsor, $request_body) {
                    $groupsSponsors = new SponsorsGroup;
                    $groupsSponsors->sponsor_id = $sponsor->id;
                    $groupsSponsors->group_id = $group->id;
                    $groupsSponsors->sponsor_message = $request_body;
                    $groupsSponsors->sponsor_accept = 1;

                    $groupsSponsors->save();
                });
                $group_user->newNotification()
                    ->from($user)
                    ->withType('SPONSOR_REQUEST')
                    ->withSubject('Sponsor_request')
                    ->withBody($request_body)
                    ->regarding($group)
                    ->deliver();

                return response()->json(['message' => 'sponsor_request_sent'], 200);
            }
        }





        if($user->id == $winwin->user->id) {
            $users = $winwin->users;
            foreach($users as $member) {
                //if($member->id != $user->id)

                $member->newNotification()
                    ->from($user)
                    ->withType('CAMPANADA')
                    ->withSubject('New campanada')
                    ->withBody($campanada_body)
                    ->regarding($winwin)
                    ->deliver();
            }
            return response()->json(['message' => 'campanada_sent', 'amount' => count($users)], 200);
        } else {
            return response()->json(['message' => 'you_are_not_an_sponsor'], 400);
        }
	}

    public function closeGroup(Request $request, $id) {
        $user = User::find($request['user']['sub']);
        $group = Group::find($id);

        $request_body = $request->input('body');

        if($user->id == $group->user_id) {
            DB::transaction(function() use ($group, $user, $request_body) {
                $group->canceled = 1;
                $group->canceled_reason = $request_body;
                $group->save();
            });

            return response()->json(['message' => 'group_closed'], 200);
        } else {
            return response()->json(['message' => 'only_group_owner_can_close'], 400);
        }

    }

}
