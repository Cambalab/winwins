<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddWwCommentToTypeEnum extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("ALTER TABLE posts CHANGE type type ENUM('WINWIN', 'GROUP', 'CONVERSATION', 'REPLY', 'WW_COMMENT', 'USER', 'USER_TESTIMONIAL', 'DASHBOARD', 'WWG_COMMENT') DEFAULT NULL;");
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
