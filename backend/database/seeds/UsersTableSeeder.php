<?php
use Illuminate\Database\Seeder;
use Winwins\User;
use Winwins\UserDetail;

class UsersTableSeeder extends Seeder {

    public function run() {
        DB::table('users')->delete();

        $user = new User();
        $user->email = 'clodo@camba.coop';
        $user->username = 'clodo';
        $user->password = '$2y$10$0cUA3QaSO9oTc27fpr1hHOS0hdofKTJrUOis5TAN4/MDh9ZauQiDC';
        $user->facebook = 'facebook';
        $user->active = 1;
        $user->save();
        $detail = new UserDetail();
        $detail->user_id = $user->id;
        $detail->lastname = 'Bidau';
        $detail->name = 'Claudio';
        $detail->sex = 'M';
        $detail->photo = 'placeholder-square.jpg';
        $detail->save();
    }

}
