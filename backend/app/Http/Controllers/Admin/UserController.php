<?php

namespace Winwins\Http\Controllers\Admin;

use Winwins\Http\Requests;
use Winwins\Http\Controllers\Controller;
use \Serverfireteam\Panel\CrudController;

use Illuminate\Http\Request;

class UserController extends CrudController{

    public function all($entity){
        parent::all($entity);

        $this->filter = \DataFilter::source(new \Winwins\User);
        $this->filter->add('username',   'User Name',  'text');
        $this->filter->add('email',      'User Email', 'text');
        $this->filter->add('active',     'Active',     'select')
            ->options(array(
                1 => 'Active',
                0 => 'Inactive',
            ));

        $this->filter->add('is_sponsor', 'Is Sponsor', 'select')
            ->options(array(
                0 => 'Not Sponsor',
                1 => 'Is Sponsor',
            ));

        $this->filter->add('is_admin',   'Is Admin',   'select')
            ->options(array(
                0 => 'Is Normal User',
                1 => 'Is Admin',
            ));

        $this->filter->submit('search');
        $this->filter->reset('reset');
        $this->filter->build();

        $this->grid = \DataGrid::source($this->filter);
        $this->grid->add('username',     'User Name');
        $this->grid->add('email',        'User Email');
        $this->grid->add('active',       'Active');
        $this->grid->add('is_sponsor',   'Is Sponsor');
        $this->grid->add('is_admin',     'Is Admin');
        $this->grid->add('accept_terms', 'Accepted Terms');

        $this->addStylesToGrid();

        return $this->returnView();
    }

    public function  edit($entity){

        parent::edit($entity);

        $this->edit = \DataEdit::source(new \Winwins\User());
        $this->edit->label('Editar User');


        $this->edit->add('username',   'User Name',  'text')->rule('required');
        $this->edit->add('email',      'Email',      'text')->rule('required');

        $this->edit->add('active',     'active',     'checkbox');
        $this->edit->add('is_sponsor', 'is_sponsor', 'checkbox');
        $this->edit->add('is_admin',   'is_admin',   'checkbox');

        $this->edit->add('groups',     'Groups',     'checkboxgroup')
            ->options(\Winwins\Group::lists("name", "id")->all());

        $this->edit->add('facebook',   'Facebook',   'text');
        $this->edit->add('google',     'Google',     'text');
        $this->edit->add('twitter',    'twitter',    'text');

        $this->edit->add('__change_password', 'Change Password', 'checkbox')->insertValue(0);
        $this->edit->add('__new_password',    'Password',        'text');

        $editForm = $this->edit;
        $editForm->saved(function() use ($editForm) {
            if (\Input::get('__change_password')) {
                $editForm->model->password = \Hash::make(\Input::get('__new_password'));
                $editForm->model->save();
            }
        });

        return $this->returnEditView();
    }

}

