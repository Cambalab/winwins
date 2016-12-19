<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddTipoQuorumToWinwins extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS = 0');
        Schema::table('winwins', function ($table) {
            $table->integer('tipo_quorum')->unsigned()->default(1);
            $table->foreign('tipo_quorum')->references('id')->on('quorums');

        });
        DB::statement('SET FOREIGN_KEY_CHECKS = 1');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('winwins', function ($table) {
            $table->dropForeign(['tipo_quorum']);
            $table->dropColumn(['tipo_quorum']);
        });
    }
}
