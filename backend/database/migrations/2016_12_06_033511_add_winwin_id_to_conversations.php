<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddWinwinIdToConversations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('conversations', function ($table) {
            $table->integer('winwin_id')->unsigned()->nullable();
            $table->foreign('winwin_id')->references('id')->on('winwins');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('conversations', function ($table) {
            $table->dropForeign(['winwin_id']);
            $table->dropColumn(['winwin_id']);
        });
    }
}
