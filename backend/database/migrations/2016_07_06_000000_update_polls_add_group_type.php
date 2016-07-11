<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdatePollsAddGroupType extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('polls', function($table){
            $table->dropForeign(['winwin_id']);
            $table->dropColumn('winwin_id');
            $table->integer('reference_id')->unsigned();
            $table->enum('type', ['WINWIN', 'GROUP']);
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
    }
}
