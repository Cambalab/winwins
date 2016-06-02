<?php

namespace Winwins\Http\Controllers\Admin;

use Winwins\Http\Requests;
use Winwins\Http\Controllers\Controller;
use \Serverfireteam\Panel\CrudController;

use Illuminate\Http\Request;

class WinwinController extends CrudController{

    public function all($entity){
        parent::all($entity);

        $this->filter = \DataFilter::source(new \Winwins\Winwin);

        $this->filter->add('status',      'Status',       'select')->options(\Winwins\Winwin::$WinwinStatus);
        $this->filter->add('scope',       'Scope',        'select')->options(\Winwins\Winwin::$WinwinScope);
        $this->filter->add('title',       'Title',        'text');
        $this->filter->add('what_happen', 'What Happens', 'text');
        $this->filter->add('description', 'Description',  'text');
        $this->filter->add('what_we_do',  'What we do',   'text');

        $this->filter->submit('search');
        $this->filter->reset('reset');
        $this->filter->build();

        $this->grid = \DataGrid::source($this->filter);

        $this->grid->add('status',      'Status');
        $this->grid->add('scope',       'Scope');
        $this->grid->add('title',       'Title');
        $this->grid->add('what_happen', 'What Happens');
        // $this->grid->add('description', 'Description');
        $this->grid->add('what_we_do',  'What we do');

        $this->addStylesToGrid();


        return $this->returnView();
    }

    public function  edit($entity){

        $request = Request();

        parent::edit($entity);

        $this->edit = \DataEdit::source(new \Winwins\Winwin());
        $this->edit->label('Editar Winwin');

        $this->edit->add('user',  'User (Creator)', 'select')
            ->options(\Winwins\User::lists('username', 'id')->all());
        $this->edit->add('users', 'Users', 'checkboxgroup')
            ->options(\Winwins\User::lists("username", "id")->all());


        $this->edit->add('title', 'Title', 'text')->rule('required');

        $this->edit->add('status', 'Status', 'select')->options(\Winwins\Winwin::$WinwinStatus);
        $this->edit->add('scope',  'Scope',  'select')->options(\Winwins\Winwin::$WinwinScope);

        $this->edit->add('interests',     'Interests',     'checkboxgroup')
            ->options(\Winwins\Interest::lists("name", "id")->all());

        $this->edit->add('what_happen', 'What happens', 'textarea')->rule('required');
        $this->edit->add('description', 'Description',  'textarea')->rule('required');
        $this->edit->add('what_we_do',  'What we do',   'textarea')->rule('required');

        $this->edit->add('selected',    'selected',     'checkbox');
        $this->edit->add('is_video',    'is_video',     'checkbox');
        $this->edit->add('video',       'Video',        'text');

        $this->edit->add('image',       'Image',        'text');

        return $this->returnEditView();
    }

}

