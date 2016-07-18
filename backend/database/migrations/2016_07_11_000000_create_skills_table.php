<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSkillsTable extends Migration {

	public function up() {
		Schema::create('skills', function(Blueprint $table) {	
                  $table->increments('id');
                  $table->string('name');
            });
	}

	public function down() {
		Schema::drop('skills');
	}
}
