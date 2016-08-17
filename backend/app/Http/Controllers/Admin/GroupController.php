<?php

namespace Winwins\Http\Controllers\Admin;

use Winwins\Http\Requests;
use Winwins\Http\Controllers\Controller;
use \Serverfireteam\Panel\CrudController;

use Illuminate\Http\Request;

class GroupController extends CrudController{

    public function all($entity){
        parent::all($entity);

        $this->filter = \DataFilter::source(new \Winwins\Group);
        $this->filter->add('name',   'Group Name',  'text');
        $this->filter->add('description',      'Group Description', 'text');

        $this->filter->add('canceled',     'Canceled',     'select')
            ->options(array(
                1 => 'Canceled',
                0 => 'Active',
            ));


        $this->filter->submit('search');
        $this->filter->reset('reset');
        $this->filter->build();

        $this->grid = \DataGrid::source($this->filter);
        $this->grid->add('name',     'Group Name');
        $this->grid->add('description',        'Group Description');
        $this->grid->add('canceled',     'Canceled');

        $this->addStylesToGrid();

        return $this->returnView();
    }

    public function  edit($entity){

        parent::edit($entity);

        $this->edit = \DataEdit::source(new \Winwins\Group());
        $this->edit->label('Editar Group');


        $this->edit->add('name',   'Group Name',  'text')->rule('required');

        $this->edit->add('description',     'Group Description',     'text');

        $this->edit->add('user_id', 'User ID', 'checkboxgroup')
            ->options(\Winwins\User::lists("username", "id")->all());

        $this->edit->add('canceled',     'Canceled',     'select')
            ->options(array(
                1 => 'Canceled',
                0 => 'Active',
            ));

        $editForm = $this->edit;
        $editForm->saved(function() use ($editForm) {

        });

        return $this->returnEditView();
    }

}
