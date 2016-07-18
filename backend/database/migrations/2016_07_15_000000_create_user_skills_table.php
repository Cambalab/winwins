<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserSkillsTable extends Migration {

	public function up() {
		Schema::create('user_skills', function(Blueprint $table) {
            $table->integer('skill_id')->unsigned();
            $table->foreign('skill_id')->references('id')->on('skills');
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');

			$table->timestamps();
		});
	}

	public function down() {
		Schema::drop('user_skills');
	}
}
