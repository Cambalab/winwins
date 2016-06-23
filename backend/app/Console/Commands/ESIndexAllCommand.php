<?php namespace Winwins\Console\Commands;

use Log;
use Config;
use Illuminate\Console\Command;

use Winwins\Winwin;
use Winwins\Group;
use Winwins\UserDetail;
use Winwins\User;
use Elasticsearch\Client;

class ESIndexAllCommand extends Command {

    protected $name = "winwins:es-index";

    protected $description = "Indexes all main entities to elasticsearch";

    public function handle() {
        $params = array();
        $params['hosts'] = array(Config::get('app.es_hosts'));
        $es = new Client($params);

        $models = Winwin::all();
        foreach ($models as $model) {
            $model->user;
            $es->index([
                'index' => 'winwins',
                'type' => 'winwins',
                'id' => $model->id,
                'body' => $model->toArray()
            ]);
        }
        Log::info('Winwins indexed');

        $models = Group::all();
        foreach ($models as $model) {
            $es->index([
                'index' => 'winwins',
                'type' => 'groups',
                'id' => $model->id,
                'body' => $model->toArray()
            ]);
        }
        Log::info('Groups indexed');

        $models = User::all();
        foreach ($models as $model) {
            $model->detail;
            $es->index([
                'index' => 'winwins',
                'type' => 'users',
                'id' => $model->id,
                'body' => $model->toArray()
            ]);
        }
        Log::info('Users indexed');


    }
}
