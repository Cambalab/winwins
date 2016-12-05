<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTagsTaggerTable extends Migration {

  //Polymorphic Many to Many

  public function up() {
    Schema::create('tags_tagger', function(Blueprint $table) {
      $table->integer('tag_id')->unsigned();
      $table->integer('tagger_id')->unsigned();
      $table->enum('type', ['WINWIN']);

      $table->timestamps();
    });
  }

  public function down() {
    Schema::drop('tags_tagger');
  }


}
