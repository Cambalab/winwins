<?php
use Illuminate\Database\Seeder;
use Winwins\Sponsor;
use Winwins\SponsorsUser;
use Winwins\SponsorsWinwin;

class SponsorsTableSeeder extends Seeder {

    public function run() {
        DB::table('sponsors')->delete();

        $sponsor = new Sponsor();
        $sponsor->name = 'Perian SA';
        $sponsor->user_id = 1;
        $sponsor->about = 'Perian SA';
        $sponsor->contact_name = 'Claudio';
        $sponsor->contact_phone = '+541143816792';
        $sponsor->contact_email = 'clodo@camba.coop';
        $sponsor->type = 'Comercial';
        $sponsor->cover_photo = 'perian-sponsor.png';
        $sponsor->is_active = 1;
        $sponsor->is_main = 1;
        $sponsor->status = 'ACTIVE';
        $sponsor->photo = 'perian-sponsor.png';

        $sponsor->save();

        $sponsor = new Sponsor();
        $sponsor->name = 'Otro Mundo';
        $sponsor->user_id = 1;
        $sponsor->about = 'Otro Mundo';
        $sponsor->contact_name = 'Claudio';
        $sponsor->contact_phone = '+541143816792';
        $sponsor->contact_email = 'clodo@camba.coop';
        $sponsor->type = 'Comercial';
        $sponsor->cover_photo = 'otromundo-sponsor.png';
        $sponsor->is_active = 1;
        $sponsor->is_main = 1;
        $sponsor->status = 'ACTIVE';
        $sponsor->photo = 'otromundo-sponsor.png';

        $sponsor->save();

        $sponsor = new Sponsor();
        $sponsor->name = 'Humanet';
        $sponsor->user_id = 1;
        $sponsor->about = 'Humanet';
        $sponsor->contact_name = 'Claudio';
        $sponsor->contact_phone = '+541143816792';
        $sponsor->contact_email = 'clodo@camba.coop';
        $sponsor->type = 'Comercial';
        $sponsor->cover_photo = 'humanet-sponsor.png';
        $sponsor->is_active = 1;
        $sponsor->is_main = 1;
        $sponsor->status = 'ACTIVE';
        $sponsor->photo = 'humanet-sponsor.png';

        $sponsor->save();

        $sponsor = new Sponsor();
        $sponsor->name = 'CORBO';
        $sponsor->user_id = 1;
        $sponsor->about = 'CORBO';
        $sponsor->contact_name = 'Claudio';
        $sponsor->contact_phone = '+541143816792';
        $sponsor->contact_email = 'clodo@camba.coop';
        $sponsor->type = 'Comercial';
        $sponsor->cover_photo = 'corbo-sponsor.png';
        $sponsor->is_active = 1;
        $sponsor->is_main = 1;
        $sponsor->status = 'ACTIVE';
        $sponsor->photo = 'corbo-sponsor.png';

        $sponsor->save();

        $sponsor = new Sponsor();
        $sponsor->name = 'Chicas Poderosas';
        $sponsor->user_id = 1;
        $sponsor->about = 'Chicas Poderosas';
        $sponsor->contact_name = 'Claudio';
        $sponsor->contact_phone = '+541143816792';
        $sponsor->contact_email = 'clodo@camba.coop';
        $sponsor->type = 'Comercial';
        $sponsor->cover_photo = 'chicas-sponsor.png';
        $sponsor->is_active = 1;
        $sponsor->is_main = 1;
        $sponsor->status = 'ACTIVE';
        $sponsor->photo = 'chicas-sponsor.png';

        $sponsor->save();

        $sponsor = new Sponsor();
        $sponsor->name = 'Cambá Laboratorio de Tecnología';
        $sponsor->user_id = 1;
        $sponsor->about = 'Cambá Laboratorio de Tecnología';
        $sponsor->contact_name = 'Claudio';
        $sponsor->contact_phone = '+541143816792';
        $sponsor->contact_email = 'clodo@camba.coop';
        $sponsor->type = 'Comercial';
        $sponsor->cover_photo = 'camba-sponsor.png';
        $sponsor->is_active = 1;
        $sponsor->is_main = 1;
        $sponsor->status = 'ACTIVE';
        $sponsor->photo = 'camba-sponsor.png';

        $sponsor->save();

        $sponsor = new Sponsor();
        $sponsor->name = 'Perian SA';
        $sponsor->user_id = 1;
        $sponsor->about = 'Perian SA';
        $sponsor->contact_name = 'Claudio';
        $sponsor->contact_phone = '+541143816792';
        $sponsor->contact_email = 'clodo@camba.coop';
        $sponsor->type = 'Comercial';
        $sponsor->cover_photo = 'perian-sponsor.png';
        $sponsor->is_active = 1;
        $sponsor->is_main = 0;
        $sponsor->status = 'ACTIVE';
        $sponsor->photo = 'perian-sponsor.png';

        $sponsor->save();

        $sponsor = new Sponsor();
        $sponsor->name = 'Otro Mundo';
        $sponsor->user_id = 1;
        $sponsor->about = 'Otro Mundo';
        $sponsor->contact_name = 'Claudio';
        $sponsor->contact_phone = '+541143816792';
        $sponsor->contact_email = 'clodo@camba.coop';
        $sponsor->type = 'Comercial';
        $sponsor->cover_photo = 'otromundo-sponsor.png';
        $sponsor->is_active = 1;
        $sponsor->is_main = 0;
        $sponsor->status = 'ACTIVE';
        $sponsor->photo = 'otromundo-sponsor.png';

        $sponsor->save();

        $sponsor = new Sponsor();
        $sponsor->name = 'Humanet';
        $sponsor->user_id = 1;
        $sponsor->about = 'Humanet';
        $sponsor->contact_name = 'Claudio';
        $sponsor->contact_phone = '+541143816792';
        $sponsor->contact_email = 'clodo@camba.coop';
        $sponsor->type = 'Comercial';
        $sponsor->cover_photo = 'humanet-sponsor.png';
        $sponsor->is_active = 1;
        $sponsor->is_main = 0;
        $sponsor->status = 'ACTIVE';
        $sponsor->photo = 'humanet-sponsor.png';

        $sponsor->save();

        $sponsor = new Sponsor();
        $sponsor->name = 'CORBO';
        $sponsor->user_id = 1;
        $sponsor->about = 'CORBO';
        $sponsor->contact_name = 'Claudio';
        $sponsor->contact_phone = '+541143816792';
        $sponsor->contact_email = 'clodo@camba.coop';
        $sponsor->type = 'Comercial';
        $sponsor->cover_photo = 'corbo-sponsor.png';
        $sponsor->is_active = 1;
        $sponsor->is_main = 0;
        $sponsor->status = 'ACTIVE';
        $sponsor->photo = 'corbo-sponsor.png';

        $sponsor->save();

        $sponsor = new Sponsor();
        $sponsor->name = 'Chicas Poderosas';
        $sponsor->user_id = 1;
        $sponsor->about = 'Chicas Poderosas';
        $sponsor->contact_name = 'Claudio';
        $sponsor->contact_phone = '+541143816792';
        $sponsor->contact_email = 'clodo@camba.coop';
        $sponsor->type = 'Comercial';
        $sponsor->cover_photo = 'chicas-sponsor.png';
        $sponsor->is_active = 1;
        $sponsor->is_main = 0;
        $sponsor->status = 'ACTIVE';
        $sponsor->photo = 'chicas-sponsor.png';

        $sponsor->save();

        $sponsor = new Sponsor();
        $sponsor->name = 'Cambá Laboratorio de Tecnología';
        $sponsor->user_id = 1;
        $sponsor->about = 'Cambá Laboratorio de Tecnología';
        $sponsor->contact_name = 'Claudio';
        $sponsor->contact_phone = '+541143816792';
        $sponsor->contact_email = 'clodo@camba.coop';
        $sponsor->type = 'Comercial';
        $sponsor->cover_photo = 'camba-sponsor.png';
        $sponsor->is_active = 1;
        $sponsor->is_main = 0;
        $sponsor->status = 'ACTIVE';
        $sponsor->photo = 'camba-sponsor.png';

        $sponsor->save();
    }

}
