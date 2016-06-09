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
        Schema::table('posts', function ($table) {
            $table->enum('type', ['WINWIN', 'GROUP', 'CONVERSATION', 'REPLY', 'WW_COMMENT', 'USER', 'USER_TESTIMONIAL', 'DASHBOARD', 'WWG_COMMENT'])->change();
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
