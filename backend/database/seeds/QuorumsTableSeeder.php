<?php

use Illuminate\Database\Seeder;
use Winwins\Quorum;

class QuorumsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      $quorum = new Quorum();
      $quorum->name = "QUORUM_FIJO";
      $quorum->description = "El winwin se completa cuando se alcanza un número fijo de participantes. Una vez alcanzado el número no es posible unirse al Winwin.";
      $quorum->save();

      $quorum = new Quorum();
      $quorum->name = "QUORUM_MOVIL";
      $quorum->description = "El winwin se completa cuando se alcanza un número mínimo de participantes. Una vez alcanzado este número, se pueden seguir uniendo participantes hasta alcanzar un número máximo.";
      $quorum->save();

      $quorum = new Quorum();
      $quorum->name = "QUORUM_ILIMITADO";
      $quorum->description = "No hay restricciones para el número de participantes en el Winwin.";
      $quorum->save();
    }
}
