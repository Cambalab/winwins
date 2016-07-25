<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateReportsTable extends Migration {

	public function up() {
		Schema::create('reports', function(Blueprint $table) {
			$table->increments('id');

                  $table->integer('reference_id')->unsigned();

                  $table->enum('type', ['WINWIN', 'GROUP', 'CONVERSATION', 'REPLY', 'WW_COMMENT', 'USER', 'USER_TESTIMONIAL', 'DASHBOARD', 'WWG_COMMENT']);

                  $table->integer('user_id')->unsigned();
                  $table->foreign('user_id')->references('id')->on('users');

                  $table->longText('reason');

                  $table->boolean('canceled')->default(FALSE);

      		$table->timestamps();
            });
	}

	public function down() {
		Schema::drop('reports');
	}

}
