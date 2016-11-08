<?php namespace Winwins\Http\Controllers;

use Carbon\Carbon;
use Config;
use DB;
use Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use JWT;
use Log;
use Response;
use Storage;
use Validator;
use Winwins\Conversation;
use Winwins\Follower;
use Winwins\InterestsInterested;
use Winwins\Media;
use Winwins\Message\Mailer;
use Winwins\Message\Message;
use Winwins\Model\Repository\UserRepository;
use Winwins\Post;
use Winwins\Skill;
use Winwins\User;
use Winwins\UserDetail;
use Winwins\UserSkills;

class UserController extends Controller {

    public function __construct() {
        $this->middleware('auth', ['except' => ['paginate', 'index', 'show', 'search', 'getUserTimeline', 'sentMailContact']]);
    }

    public function sendMessage(Request $request){
        $current_user = false;
        $token = $request->input('_token') ?: $request->header('X-XSRF-TOKEN');
        if ( $token )  {
            $token = $request->header('Authorization');
            if(isset($token[1])) {
                $token = explode(' ', $request->header('Authorization'))[1];
                $payload = (array) JWT::decode($token, Config::get('app.token_secret'), array('HS256'));
                $current_user = User::find($payload['sub']);
            }
        }
        //HARCODED
        $current_user = User::find(32);
        //END HARCODED

        $cnvid = $request->input('conversation_id');

        if($current_user){
            //SI NO EXISTE CONVERSATIOn, LA CREO
            if($cnvid==0){
                //CRE CONVERSACION
                DB::table('conversations')->insert(
                    [   'created_at' => new Carbon(),
                        'updated_at' => new Carbon(),
                        'subject' => $request->input('subject')]
                );

                $cnvid = DB::table('conversations')->max('id');

                //CREO PARTICIPANTE (perfil publico)
                DB::table('participants')->insert(
                    [   'conversation_id' => $cnvid,
                        'last_read' => new Carbon(),
                        'created_at' => new Carbon(),
                        'updated_at' => new Carbon(),
                        'user_id' => $request->input('receiver_id')]
                );

                //CREO PARTICIPANTE (logueado)
                DB::table('participants')->insert(
                    [   'conversation_id' => $cnvid,
                        'last_read' => new Carbon(),
                        'created_at' => new Carbon(),
                        'updated_at' => new Carbon(),
                        'user_id' => $current_user->id]
                );
            }
            $participantsID = DB::table('participants')
                ->join('users','users.id','=','participants.user_id')
                ->where('participants.conversation_id', '=', $cnvid)
                ->where('participants.user_id', '=', $current_user->id)
                ->select('participants.id')
                ->get();

            DB::table('messages')->insert(
                ['conversation_id' => $cnvid,
                    'created_at' => new Carbon(),
                    'updated_at' => new Carbon(),
                    'participant_id' => $participantsID[0]->id,
                    'body' => $request->input('message')]
            );
        }
        return response()->json(['enviado']);
    }


    public function paginate(Request $request, $page = 0, $amount = 15) {
        $current_user = false;
		$token = $request->input('_token') ?: $request->header('X-XSRF-TOKEN');
		if ( $token )  {
            $token = $request->header('Authorization');
            if(isset($token[1])) {
                $token = explode(' ', $request->header('Authorization'))[1];
                $payload = (array) JWT::decode($token, Config::get('app.token_secret'), array('HS256'));
                $current_user = User::find($payload['sub']);
            }
        }

        $users = DB::table('user_details')
            ->join('users', 'user_details.user_id', '=', 'users.id')
            ->where('users.active', '=', 1)
            ->where('users.is_sponsor', '!=', 1)
            ->where('users.suspend', '=', 0)
            ->select('user_details.photo', 'user_details.cover_photo', 'users.id', 'user_details.name', 'user_details.lastname') 
            ->skip($page * $amount)
            ->take($amount)
            ->orderBy('id', 'desc')
            ->get();

        $collection = Collection::make($users);
        $collection->each(function($user) use($current_user){
            $user->winwins_count = DB::table('winwins_users')
                ->where('user_id', '=', $user->id)->count();
            $user->followers_count = DB::table('followers')
                ->where('followed_id', '=', $user->id)->count();
            $user->username = $user->name . ' ' . $user->lastname;

            if($current_user) {
                $user->already_following = count($current_user->following->filter(function($model) use ($current_user, $user) {
                    return $model->id == $user->id;
                })) > 0;
            }

        });
        return $collection;
    }

	public function index() {
        $users = UserDetail::all();
        return response()->json($users, 200, [], JSON_NUMERIC_CHECK);
	}

	public function show(Request $request, $id)
  {
    $user = User::find($id);
    $userDetail = array();

    $my_self = false;
    $token = $request->input('_token') ?: $request->header('X-XSRF-TOKEN');
    if ($token) {
      $token = $request->header('Authorization');
      if (isset($token[1])) {
        $token = explode(' ', $request->header('Authorization'))[1];
        $payload = (array)JWT::decode($token, Config::get('app.token_secret'), array('HS256'));
        $my_self = User::find($payload['sub']);
      }
    }
    //HARCODED
    $my_self = User::find(32);
    //END HARCODED

    if ($user) {
      $winwins = $user->winwins;
      foreach ($winwins as $winwin) {
        $winwin->user;
      }

      $userDetail = $user->detail;
      $userDetail->email = $user->email;
      $userDetail->groups = $user->groups;
      $userDetail->winwins = $winwins;
      $userDetail->notifications = $user->notifications;

      $userDetail->groups->each(function ($group) {
        $users_count = count($group->users);
        $group->users_already_joined = $users_count;
      });

      $userDetail->winwins->each(function ($winwin) {
        $users_count = count($winwin->users);
        $winwin->users_already_joined = $users_count;
      });

      $user->notifications->each(function ($notification) {
        try {
          $notification->object = $notification->getObject();
        } catch (\Exception $e) {
        }
        //$notification->formatted = trans('ww.'.$notification->body, $notification->object->toArray());
      });

      $userDetail->interests_list = DB::table('interests')
        ->join('interests_interested', 'interests.id', '=', 'interests_interested.interest_id')
        ->where('type', '=', 'USER')
        ->where('interested_id', '=', $user->id)
        ->select('interests.name', 'interests.description', 'interests.id')
        ->get();

      $userDetail->skills = DB::table('skills')
        ->join('user_skills', 'skills.id', '=', 'user_skills.skill_id')
        ->where('user_id', '=', $user->id)
        ->select('skills.id', 'skills.name as text')
        ->get();

      $userDetail->activities = DB::select(' SELECT notifications.type,

                                                          notifications.created_at,

                                                          winwins.title

                                                   FROM   notifications,

                                                          winwins

                                                   WHERE  notifications.user_id = ' . $user->id . '

                                                   AND    (

                                                           notifications.type="ww_join"

                                                           || notifications.type="ww_successful"

                                                           || notifications.type="ww_created")

                                                   AND    notifications.object_id = winwins.id

                                                   UNION

                                                   SELECT notifications.type,

                                                          notifications.created_at,

                                                          groups.NAME

                                                   FROM   notifications,

                                                          groups

                                                   WHERE  notifications.user_id = ' . $user->id . '

                                                   AND    (

                                                          notifications.type="group_join"

                                                           || notifications.type="group_left"

                                                           || notifications.type="group_created")

                                                  AND    notifications.object_id = groups.id

                                                  UNION

                                                  SELECT   notifications.type,

                                                           notifications.created_at,

                                                           users.username

                                                  FROM     notifications,

                                                           users

                                                  WHERE    notifications.user_id = ' . $user->id . '

                                                  AND      (

                                                          notifications.type="user_follow"

                                                           || notifications.type="user_unfollow")

                                                  AND      notifications.object_id = users.id

                                                  ORDER BY created_at DESC ');
      //$userDetail->followers = $user->followers;
      //$userDetail->following = $user->following;

        if ($my_self) {
          if ($my_self->id == $user->id) {
            $converown = DB::table('participants')
              ->join('users', 'participants.user_id', '=', 'users.id')
              ->join('conversations', 'conversations.id', '=', 'participants.conversation_id')
              ->where('users.id', '=', $my_self->id)
              ->select('conversations.id', 'conversations.subject')
              ->get();
            $conversations = new Collection();

            foreach ($converown as $c) {
              $messages = DB::table('messages')
                ->join('participants', 'participants.id', '=', 'messages.participant_id')
                ->join('users', 'participants.user_id', '=', 'users.id')
                ->join('user_details', 'users.id', '=', 'user_details.user_id')
                ->select('users.id as user_id', 'messages.body', 'messages.participant_id', 'messages.created_at', 'user_details.name', 'users.photo')
                ->where('messages.conversation_id', '=', $c->id)
                ->orderBy('messages.created_at', 'asc')
                ->get();

              $cnv = new Conversation();
              $cnv->id = $c->id;
              $cnv->subject = $c->subject;
              $cnv->messages = $messages;
              $cnv->show_avatar = $user->photo;
              $cnv->show_name = $user->username;
              $conversations[] = $cnv;
            }
          } else {
            //GET CONVERSATION LOGGED Y EL DE PERFIL
            $converown = DB::table('participants')
              ->join('users', 'participants.user_id', '=', 'users.id')
              ->join('conversations', 'conversations.id', '=', 'participants.conversation_id')
              ->where('users.id', '=', $my_self->id)
              ->select('conversations.id', 'conversations.subject')
              ->get();
            $converother = DB::table('participants')
              ->join('users', 'participants.user_id', '=', 'users.id')
              ->join('conversations', 'conversations.id', '=', 'participants.conversation_id')
              ->where('users.id', '=', $user->id)
              ->select('conversations.id', 'conversations.subject')
              ->get();

            $cvsIDS = array();
            foreach ($converown as $cown) {
              foreach ($converother as $cother) {
                if ($cown->id == $cother->id) {
                  $cvsIDS[] = $cown;
                }
              }
            }

            $conversations = new Collection();

            foreach ($cvsIDS as $c) {
              $messages = DB::table('messages')
                ->join('participants', 'participants.id', '=', 'messages.participant_id')
                ->join('users', 'participants.user_id', '=', 'users.id')
                ->join('user_details', 'users.id', '=', 'user_details.user_id')
                ->select('users.id as user_id', 'messages.body', 'messages.participant_id', 'messages.created_at', 'user_details.name', 'users.photo')
                ->where('messages.conversation_id', '=', $c->id)
                ->orderBy('messages.created_at', 'asc')
                ->get();
              //Log::info($messages);
              $cnv = new Conversation();
              $cnv->id = $c->id;
              $cnv->subject = $c->subject;
              $cnv->messages = $messages;
              $cnv->show_avatar = $user->photo;
              $conversations[] = $cnv;
            }

          }
        } else {
          $conversations = array();
        }

        $userDetail->conversations = $conversations;
        $followers = DB::table('user_details')
          ->select('user_details.name', 'user_details.lastname', 'user_details.photo', 'user_details.user_id')
          ->join('followers', 'user_details.user_id', '=', 'followers.follower_id')
          ->where('followers.followed_id', '=', $id)->get();
        $userDetail->followers = $followers;

        $following = DB::table('user_details')
          ->select('user_details.name', 'user_details.lastname', 'user_details.photo', 'user_details.user_id')
          ->join('followers', 'user_details.user_id', '=', 'followers.followed_id')
          ->where('followers.follower_id', '=', $id)->get();
        $userDetail->following = $following;


        $comments = DB::table('posts')
          ->select('posts.content', 'posts.created_at', 'posts.user_id', 'user_details.photo', 'user_details.name')
          ->join('user_details', 'posts.user_id', '=', 'user_details.user_id')
          ->where('posts.reference_id', '=', $id)->where('posts.type', 'USER')->orderBy('posts.created_at', 'desc')->get();


        $userDetail->comments = $comments;

//            $userDetail->myself = true;

        if ($my_self) {
          if ($my_self->id == $id) {
            $userDetail->myself = true;
          } else {
            $already_following = count($user->followers->filter(function ($model) use ($my_self) {
                return $model->id == $my_self->id;
              })) > 0;
            $userDetail->already_following = $already_following;
          }
        }

      }

      return response()->json($userDetail, 200, [], JSON_NUMERIC_CHECK);
    }

    protected
    function createToken($user) {
      $payload = [
        'sub' => $user->id,
        'iat' => time(),
        'exp' => time() + (2 * 7 * 24 * 60 * 60)
      ];
      return JWT::encode($payload, Config::get('app.token_secret'));
    }

    public
    function getUserStatus(Request $request)
    {
      $user = User::find($request['user']['sub']);
      return array(
        'notifications_unread' => $this->countUnreadNotifications($user)
      );
    }

    public
    function getUser(Request $request)
    {
      $user = User::find($request['user']['sub']);

      if (isset($user)) {
        $is_sponsor = false;
        $is_sponsor_active = false;
        $user->sponsor;
        if (isset($user->sponsor)) {
          $is_sponsor = true;
          $is_sponsor_active = ($user->sponsor->status == 'ACTIVE');
        }
        return response()->json(
          array(
            'user' => $user,
            'profile' => $user->detail,
            'sponsor' => $user->sponsor,
            'is_sponsor' => $is_sponsor,
            'is_sponsor_active' => $is_sponsor_active,
            'active' => $user->active == 1,
            'notifications' => $this->notifications($user),
            'notifications_unread' => $this->countUnreadNotifications($user)
          ), 200, [], JSON_NUMERIC_CHECK);
      } else {
        return response()->json(
          array(
            'user' => false,
            'profile' => false,
            'sponsor' => false,
            'is_sponsor' => false,
            'notifications' => false,
            'notifications_unread' => false
          ), 200, [], JSON_NUMERIC_CHECK);

      }
    }

    public
    function getUserTimeline($userId)
    {
      $user = User::find($userId);

      $activities = $user->notifications;
      $fellows = array();
      if (isset($user)) {
        foreach ($user->following as $fellow) {
          $fellows[$fellow->id] = $fellow;
          $activities = $activities->merge($fellow->notifications->filter(function ($item) {
            return !in_array($item->type, array('CAMPANADA', 'SPONSOR_CANCEL', 'SPONSOR_REQUEST'));
          }));
        }
      }
      foreach ($activities as $activity) {
        try {
          $activity->object = $activity->getObject();
        } catch (\Exception $e) {
        }
      }

      return response()->json($activities->sortByDesc('id')->values(), 200, [], JSON_NUMERIC_CHECK);
    }

    public
    function updateUser(Request $request)
    {
      $user = User::find($request['user']['sub']);

      $user->username = $request->input('username');
      $user->email = $request->input('email');
      $user->save();

      $token = $this->createToken($user);

      return response()->json(['token' => $token]);
    }


    public
    function cancelAccount(Request $request)
    {
      $user = User::find($request['user']['sub']);

      $user->cancel_reason = $request->input('body');
      $user->canceled = true;

      $user->save();

      return response()->json(['message' => 'user_cancel']);
    }


    public
    function updateProfile(Request $request)
    {
      $user = User::find($request['user']['sub']);

      if (!$user) {
        return response()->json(['message' => 'user_not_found']);
      }

      $userDetail = UserDetail::find($user->id);

      if ($request->has('email')) {
        $user->email = $request->input('email');
      }

      if ($request->has('name')) {
        $userDetail->name = $request->input('name');
      }
      if ($request->has('photo')) {
        $userDetail->photo = $request->input('photo');
        $user->photo = $request->input('photo');
      }

      if ($request->has('cover_photo')) {
        $userDetail->cover_photo = $request->input('cover_photo');
        $user->cover_photo = $request->input('cover_photo');
      }

      if ($request->has('lastname')) {
        $userDetail->lastname = $request->input('lastname');
      }

      if ($request->has('birthdate')) {
        $userDetail->birthdate = $request->input('birthdate');
      }

      if ($request->has('about')) {
        $userDetail->about = $request->input('about');
      }

      if ($request->has('interests')) {
        $userDetail->interests = $request->input('interests');
      }

      if ($request->has('interests_list')) {

        DB::table('interests_interested')->where('type', 'USER')->where('interested_id', $user->id)->delete();
        $interests = $request->input('interests_list');
        foreach ($interests as $interest) {
          $interestsInterested = InterestsInterested::firstOrCreate([
            'interest_id' => $interest['id'],
            'interested_id' => $user->id,
            'type' => 'USER'
          ]);
        }
      }

      if ($request->has('skills_list')) {
        $skills = $request->input('skills_list');

        DB::table('user_skills')->where('user_id', $user->id)->delete();

        foreach ($skills as $skill) {
          if (!isset($skill["id"])) {
            $newSkill = new Skill();
            $newSkill->name = $skill["text"];
            $newSkill->save();
            $userSkills = UserSkills::firstOrCreate([
              'skill_id' => $newSkill->id,
              'user_id' => $user->id
            ]);

          } else {
            $userSkills = UserSkills::firstOrCreate([
              'skill_id' => $skill['id'],
              'user_id' => $user->id
            ]);
          }

          $userSkills->save();
        }
      }

      if ($request->has('language_code')) {
        $userDetail->language_code = $request->input('language_code');
      }

      if ($request->has('invite_ww')) {
        $userDetail->invite_ww = $request->input('invite_ww');
      }

      if ($request->has('ww_to_finish')) {
        $userDetail->ww_to_finish = $request->input('ww_to_finish');
      }

      if ($request->has('invite_group')) {
        $userDetail->invite_group = $request->input('invite_group');
      }

      if ($request->has('not_message')) {
        $userDetail->not_message = $request->input('not_message');
      }

      if ($request->has('email_notification')) {
        $userDetail->email_notification = $request->input('email_notification');
      }

      if ($request->has('private')) {
        $userDetail->private = $request->input('private');
      }

      $user->username = $userDetail->name . ' ' . $userDetail->lastname;

      $current_password = $request->input('current_password');
      $password = $request->input('password');

      if (isset($current_password) && isset($password)) {

        if (Hash::check($current_password, $user->password)) {
          $user->password = Hash::make($request->input('password'));
        } else {
          return response()->json(['message' => 'user_current_password_wrong'], 400);
        }
      }

      $user->save();
      $userDetail->save();

      return $userDetail;
    }

    public
    function search(Request $request, UserRepository $userRepository)
    {
      $query = $request->input('q');
      return $userRepository->search($query);
    }

    public
    function notifications($user)
    {
      $notifications = $user->notifications;
      return $notifications;
    }

    public
    function countUnreadNotifications($user)
    {
      $notificationsCount = $user->notifications()->unread()->count();
      return $notificationsCount;
    }

    public
    function unreadNotifications($id)
    {
      $user = User::find($id);
      $notifications = $user->notifications()->unread()->get();
      return $notifications;
    }

    public
    function follow(Request $request, $id)
    {
      $user = User::find($request['user']['sub']);
      $followed = User::find($id);

      $already_following = false;
      if (!$user) {
        return response()->json(['message' => 'follow_not_logged'], 401);
      }

      if ($user->id == $followed->id) {
        return response()->json(['message' => 'follow_not_himself'], 400);
      } else {
        Log::info($followed->followers);
        $already_following = count($followed->followers->filter(function ($model) use ($user) {
            return $model->id == $user->id;
          })) > 0;

        if ($already_following) {
          return response()->json(['message' => 'follow_already_folllowing'], 400);
        } else {
          DB::transaction(function () use ($followed, $user) {
            $followedsUsers = new Follower;
            $followedsUsers->follower_id = $user->id;
            $followedsUsers->followed_id = $followed->id;
            $followedsUsers->save();
            DB::table('users')->whereId($followed->id)->increment('followers_amount');
            DB::table('user_details')->where('user_id', '=', $followed->id)->increment('followers_amount');

            $followed->newNotification()
              ->from($user)
              ->withType('FOLLOWING')
              ->withSubject('following_you_title')
              ->withBody('following_you_body')
              ->regarding($user)
              ->deliver();
          });
        }
      }
      return response()->json(['follow']);
    }

	public function unfollow(Request $request, $id) {
        $user = User::find($request['user']['sub']);
        $followed = User::find($id);
        $already_following = count($followed->followers->filter(function($model) use ($user) {
            return $model->id == $user->id;
        })) > 0;

        if(!$already_following) {
            return response()->json(['message' => 'follow_follow_first_to_unfollow'], 400);
        } else {
            DB::table('followers')->where('follower_id', $user->id )->where('followed_id', $followed->id)->delete();
            DB::table('users')->whereId($followed->id)->decrement('followers_amount');
            DB::table('user_details')->where('user_id','=',$followed->id)->decrement('followers_amount');
        }
        return response()->json(['unfollow']);
	}

	public function comment(Request $request, $id) {
        $user = User::find($request['user']['sub']);

        $post = new Post;

        DB::transaction(function() use ($request, $post, $user, $id) {
            $post->reference_id = $id;
            $post->type = 'USER';
            $post->user_id = $user->id;
            $post->title = '';
            $post->content = $request->input('content');
            $post->save();
        });

                                    
        $comments = DB::table('posts')
            ->select('posts.content', 'posts.created_at', 'posts.user_id', 'user_details.photo', 'user_details.name')
            ->join('user_details', 'posts.user_id', '=', 'user_details.id')
            ->where('posts.reference_id', '=', $id)->where('posts.type', 'USER')->orderBy('posts.created_at', 'desc')->get();

        return $comments;
	}

	public function markNotificationsAsRead(Request $request) {
        $user = User::find($request['user']['sub']);

        DB::transaction(function() use ($user) {
            DB::table('notifications')
                ->where('user_id', $user->id)
                ->update(['is_read' => 1]);
        });

        return array(
            'message' => 'notifications_mark_as_read'
        );
	}

    public function storeImage(Request $request, Media $media) {

        $user = User::find($request['user']['sub']);

        if(!$request->hasFile('file')) { 
            return Response::json(['error' => 'no_file_sente']);
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

        Log::info($request->file('file'));

        $image = Media::create([
            'name' => $request->file('file')->getClientOriginalName(),
            'ext' => $request->file('file')->guessExtension(),
            'user_id' => $user->id || 1,
            'bucket' => 'S3',
            'type' => 'IMAGE'
        ]);
        
        $filename = 'user_'.md5(strtolower(trim($image->name))).'_'.$image->id . '.' . $image->ext;

        Log::info('Uploading to S3 file '.$filename);
        Storage::disk('s3-gallery')->put('/' . $filename, file_get_contents($file), 'public');

        return Response::json(['OK' => 1, 'filename' => $filename]);
    }

    public function sentMailContact(Request $request, Mailer $mailer) {
        $template_name = 'winwin_contact';
        $users = DB::table('users')->where('active', '=', 1)->where('is_admin', '=', 1)->whereNotNull('email')->get();

        foreach($users as $user) {
            $message = new Message($template_name, array(
                'meta' => array(
                    'logo_url' => 'http://winwins.org/imgs/logo-winwins_es.gif',
                    'username' => $request->input('contact')['name'].' '.$request->input('contact')['lastname'],
                    'email' => $request->input('contact')['email'],
                    'message' => $request->input('contact')['message']
                )
            ));
            $message->subject('WinWin - Contacto');
            $message->to(null, $user->email);
            $message_sent = $mailer->send($message);
        }
    
        return response()->json(['message' => 'email_sent']);
    }


}
