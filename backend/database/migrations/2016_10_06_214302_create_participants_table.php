<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateParticipantsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('participants', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('conversation_id')->unsigned();
            $table->integer('user_id')->unsigned();
            $table->timestamp('last_read')->nullable();

            $table->foreign('conversation_id')->references('id')->on('conversations');
            $table->foreign('user_id')->references('id')->on('users');

            // $table->primary(['conversation_id', 'user_id']);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::drop('participants');
    }
}
