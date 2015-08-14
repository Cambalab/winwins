<?php
use Illuminate\Database\Seeder;
use Winwins\Model\Winwin;

class WinwinsTableSeeder extends Seeder {

    public function run() {
        DB::table('winwins')->delete();

        $winwin = new Winwin();
        $winwin->user_id = "79";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Marcha de velas por la Tierra";
        $winwin->what_happen = "Los países ricos producen el 65% de los gases contaminantes y el 95% de los residuos tóxicos. Sin embargo los países pobres son los más afectados y sus poblaciones más vulnerables.";
        $winwin->description= "";
        $winwin->what_we_do = "Apagar las luces de nuestros hogares y marcha a pie a la plaza principal de cada cuidad el jueves 27 de septiembre del 2012 clamando por la responsabilidad ambiental de nuestros Estados, empresas y compatriotas.";
        $winwin->users_amount = "1000";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->selected = 1;
        $winwin->closing_date= '2015-10-10'; 
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "45";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Perritos Limpios en el Barrio de los And";
        $winwin->what_happen = "Me parece que queda muy feo, y aparte es muy riesgoso para los niños que juegan, que tengamos los deshechos de los perros, en las veredas y jardines adentro del parque. Pero cada vecino a quien le pregunto dice: &quot;
        $winwin->description= Todos dejan la caca en el Piso&quot;
        $winwin->what_we_do = ";
        $winwin->users_amount = "";
        $winwin->image = "ww-default.jpg"
        "winwinAvatar_avatar.jpg";
        $winwin->published = 1;
        $winwin->selected = 1;
        $winwin->closing_date= '2015-10-10'; 
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "113";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Perritos Barrio Andes";
        $winwin->what_happen = "Me parece que queda muy feo, y aparte es muy riesgoso para los niños que juegan, que tengamos los deshechos de los perros, en las veredas y jardines adentro del parque. Pero cada vecino a quien le pregunto dice: &quot;
        $winwin->description= Todos dejan la caca en el Piso&quot;
        $winwin->what_we_do = ";
        $winwin->users_amount = "";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->selected = 1;
        $winwin->closing_date= '2015-10-10'; 
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "57";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Probando la Actividad Reciente";
        $winwin->what_happen = "Crear un Winwin";
        $winwin->description= "";
        $winwin->what_we_do = "Crear un Winwin";
        $winwin->users_amount = "11";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->selected = 1;
        $winwin->closing_date= '2015-10-10'; 
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "71";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Difusión de Winwins como herramienta ";
        $winwin->what_happen = "esta red social es nueva, por lo tanto poco conocida.";
        $winwin->description= "";
        $winwin->what_we_do = "Comprometernos a invitar cada uno a 5 amigos/as a que se sumen a winwins.";
        $winwin->users_amount = "100";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->selected = 1;
        $winwin->closing_date= '2015-10-10'; 
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "61";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Difundamos Winwins como herramienta ";
        $winwin->what_happen = "esta red social es nueva, por lo tanto poco conocida y esta realidad dificulta su crecimiento.";
        $winwin->description= "";
        $winwin->what_we_do = " Comprometernos a invitar cada uno a 5 amigos/as a que se sumen a winwins.";
        $winwin->users_amount = "100";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->selected = 1;
        $winwin->closing_date= '2015-10-10'; 
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "92";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Difusión de Winwins como herramienta ";
        $winwin->what_happen = "esta red social es nueva, por lo tanto poco conocida.";
        $winwin->description= "";
        $winwin->what_we_do = "Comprometernos a invitar cada uno a 5 amigos/as a que se sumen a winwins.";
        $winwin->users_amount = "100";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->selected = 1;
        $winwin->closing_date= '2015-10-10'; 
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "28";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Clasificando basura en casa ";
        $winwin->what_happen = "Tiramos muchas cosas que otros pueden sacar provecho y contaminamos nuestro medio. Si supieras que todos los integrantes de la casa se comprometen a poner su granito de arena clasificando la basura que generamos, vos... lo harías tambien?";
        $winwin->description= "";
        $winwin->what_we_do = "Clasificar la basura en 3 grupos: vidrio (saco amarillo), plastico (saco rojo), papel (saco verde) y orgánico (saco blanco)";
        $winwin->users_amount = "50";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->selected = 1;
        $winwin->closing_date= '2015-10-10'; 
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "114";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Mercado El Progreso";
        $winwin->what_happen = "El mercado ni sus camerciantes cuentan con ningun tipo de ayuda, ni reconcimiento por mantener vivo y en condiciones excelentes este mercado emblemático. El barrio tambien quiere colaborar y fortalecer los esfuerzos por cuidar de este tesoro porteño.";
        $winwin->description= "";
        $winwin->what_we_do = "Si somos muchos los vecinos, aportando una pequeña suma podríamos organizarnos para restaurar el edificio, de a tramos para no entorpecer el funcionamiento del mercado. Tambien podríamos trabajar en su difusión, en su fachada. Podríamos hacer juntos muchas cosas! Sumate!";
        $winwin->users_amount = "300";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->selected = 1;
        $winwin->closing_date= '2015-10-10'; 
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "114";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Mercado El Progreso";
        $winwin->what_happen = "El mercado ni sus camerciantes cuentan con ningun tipo de ayuda, ni reconcimiento por mantener vivo y en condiciones excelentes este mercado emblemático. El barrio tambien quiere colaborar y fortalecer los esfuerzos por cuidar de este tesoro porteño.";
        $winwin->description= "";
        $winwin->what_we_do = "Si somos muchos los vecinos, aportando una pequeña suma podríamos organizarnos para restaurar el edificio, de a tramos para no entorpecer el funcionamiento del mercado. Tambien podríamos trabajar en su difusión, en su fachada. Podríamos hacer juntos muchas cosas! Sumate!";
        $winwin->users_amount = "300";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->selected = 1;
        $winwin->closing_date= '2015-10-10'; 
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "106";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Mercado El Progreso";
        $winwin->what_happen = "El mercado ni sus camerciantes cuentan con ningun tipo de ayuda, ni reconcimiento por mantener vivo y en condiciones excelentes este mercado emblemático. El barrio tambien quiere colaborar y fortalecer los esfuerzos por cuidar de este tesoro porteño.";
        $winwin->description= "";
        $winwin->what_we_do = "Si somos muchos los vecinos, aportando una pequeña suma podríamos organizarnos para restaurar el edificio, de a tramos para no entorpecer el funcionamiento del mercado. Tambien podríamos trabajar en su difusión, en su fachada. Podríamos hacer juntos muchas cosas! Sumate!";
        $winwin->users_amount = "300";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "104";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Pintemos el Colegio San Cristobal";
        $winwin->what_happen = "Hace ya 4 años, que nos prometen, pero nuestros hijos van a clases donde se desascara la pintura";
        $winwin->description= "";
        $winwin->what_we_do = "Juntémonos entre los padres. Si somos 20 lo pintamos en un funde";
        $winwin->users_amount = "20";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "67";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Prueba1";
        $winwin->what_happen = "Prueba";
        $winwin->description= "";
        $winwin->what_we_do = "Prueba";
        $winwin->users_amount = "20";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "22";
        $winwin->scope = "GLOBAL";
        $winwin->title = "prueba2";
        $winwin->what_happen = "prueba2";
        $winwin->description= "";
        $winwin->what_we_do = "prueba2";
        $winwin->users_amount = "30";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "36";
        $winwin->scope = "GLOBAL";
        $winwin->title = "La Playa Limpia!!";
        $winwin->what_happen = "La gente deja mugre en la playa, pero también las tormentas nos traen la basura que está en el mar.";
        $winwin->description= "";
        $winwin->what_we_do = " cada finde salir a una caminata de limpieza te sumarías?";
        $winwin->users_amount = "20";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "112";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Limpiemos la Playa Juntos!!";
        $winwin->what_happen = "El mar trae muchos plásticos y mugre. Y encima la gente deja siempre cosas tiradas";
        $winwin->description= "";
        $winwin->what_we_do = " hacer una caminata de limpieza todos los lunes, te sumarías??";
        $winwin->users_amount = "20";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "83";
        $winwin->scope = "GLOBAL";
        $winwin->title = "TEST de cambios realizados";
        $winwin->what_happen = "Este winwin es una prueba de los cambios realizados.";
        $winwin->description= "";
        $winwin->what_we_do = "No hay que hacer nada. Este winwin es una prueba de los cambios realizados.";
        $winwin->users_amount = "100000";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "76";
        $winwin->scope = "GLOBAL";
        $winwin->title = "af-fww áéíóú";
        $winwin->what_happen = "un winwin para probar";
        $winwin->description= "";
        $winwin->what_we_do = "rezar!";
        $winwin->users_amount = "2";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "11";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Help Scooping Sandy's Sand!!!";
        $winwin->what_happen = "One of the mayor issues in the New Jersey area is the amount of Sand that Sandy left on streets and also on private Gardens, Neighbors are sadden, broken and have to spend most of their energy and time scooping. They also could do with some feeling of contention. They deserve our help! Right?";
        $winwin->description= "";
        $winwin->what_we_do = "If you knew that we were a group of 200 volunteers ready to go to the NJ shores area to help and try to comfort. Would you Join In Too?";
        $winwin->users_amount = "30";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "106";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Compras grupales en Mercado Central CABA";
        $winwin->what_happen = "En el mercado central de la Cuidad de Buenos Aires se pueden comprar productos alimenticios al bulto o por unidad a precios realmente convenientes.";
        $winwin->description= "";
        $winwin->what_we_do = "Organizarnos en grupos de 10 familias para ir a hacer compras quincenalmente, rotando al comprador (el que efectivamente va) periodicamente.";
        $winwin->users_amount = "10";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "111";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Juntos contra la emergencia hídrica";
        $winwin->what_happen = "En muchas regiones de la Argentina padecemos de ciclos cada vez más frecuentes y más extensos en el tiempo de escasez de agua.";
        $winwin->description= "";
        $winwin->what_we_do = " ahorrar y cuidar del agua, usando menos de este recurso para lavar los platos, tomar una ducha, lavar la ropa, etc.";
        $winwin->users_amount = "1000";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "42";
        $winwin->scope = "GLOBAL";
        $winwin->title = "levantemos la caca del perro";
        $winwin->what_happen = "ñalkfjañlkjfñlakjñlfkñak  lkafñlkfjalkajfñalkfl";
        $winwin->description= "";
        $winwin->what_we_do = "omos 50 para para empezar a laevñkañlkjañlfkjañlkfañlkjÂ ";
        $winwin->users_amount = "50";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "42";
        $winwin->scope = "GLOBAL";
        $winwin->title = "los perritos limpios";
        $winwin->what_happen = "los perritos hacen caca en todos lados, ";
        $winwin->description= "";
        $winwin->what_we_do = "0 para llevar todos bolsitas cuando plkjñalkfjñlakjfñalkj{propuesta participativa}";
        $winwin->users_amount = "50";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "16";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Alcanzando la meta de adhesiones";
        $winwin->what_happen = "intentando ver el mensaje que llega cuando se completa la cantidad de quorun";
        $winwin->description= "";
        $winwin->what_we_do = "para ver el mensaje de cierre (tambiénÂ la encuesta final)";
        $winwin->users_amount = "2";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "70";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Chaco y el mal de Chagas";
        $winwin->what_happen = "Transmitido por la vinchuca, en la etapa crónica suele presentar cardiomiopatía difusa grave. Ante la urgencia del caso, el Ministerio, la Fundación y ambas compañías farmacéuticas, con la participación de la Anmat, el INTI y el Instituto Fatala Chaben, iniciaron a fines del año pasado una carrera contra reloj. El resultado es este primer lote de calidad y la posibilidad de iniciar la producción. Se hará en la planta de Mataderos de Maprimed. ";
        $winwin->description= "";
        $winwin->what_we_do = "s 4 para Conseguir que Maprimed distribuya un % gratis deÂ benznidazol en la provincia de Chaco.El tratamiento con benznidazol se realiza por única vez tomando dos píldoras diarias durante 60 días.";
        $winwin->users_amount = "4";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "66";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Motivemos a Los Estudiantes!";
        $winwin->what_happen = "Los alumnos van al colegio totalmente DESANIMADOS. El secundario completo ya no asegura a los alumnos conseguir su primer trabajo digno y por ende desarticula sus expectativas de independencia económica. Incluso el acceder a un nivel terciario no garantiza un futuro próspero. La incertidumbre plantea un desánimo colectivo que se traduce en la falta total de expectativas por mejorar, aburrirse de palabras y conocimientos que no me servirán para nada y la retórica: para qué vengo al ";
        $winwin->description= "";
        $winwin->what_we_do = "mos 400 para paraentusiasmar y contagiarles Pasión por la vida a los alumnos de 100 colegios, elprimer lunes de cada mes. Â NecesitamosMotivadores personales que sepan contagiar de entusiasmo al alumnado. Que elcolegio vuelva a ser el espacio público donde se siembren los primeros sueñospersonales con consciencia colectiva. Revalorizar las materias que más leinteresan a cada uno y fortalecer la visualización de un futuro construido apartir de la detonación interna ";
        $winwin->users_amount = "400";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "40";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Ayuda para los perros perdidos de La Pla";
        $winwin->what_happen = "Luego de las inundaciones, de a poco se va restaurando el orden en La Plata. Desgraciadamente, muchos perros se han perdido de sus dueños, y necesitamos una mano para ayudarlos a encontrar su hogar";
        $winwin->description= "";
        $winwin->what_we_do = "para ir a La Plata el fin de semana a ayudar a los coordinadores de la campaña para reunir a las mascotas con sus dueños";
        $winwin->users_amount = "5";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "23";
        $winwin->scope = "GLOBAL";
        $winwin->title = "probando WW";
        $winwin->what_happen = "se afecto con un malicioso";
        $winwin->description= "";
        $winwin->what_we_do = " {propuesta participativa} tener mucha paciencia";
        $winwin->users_amount = "15";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "105";
        $winwin->scope = "GLOBAL";
        $winwin->title = "winwin prueba nuevo servidor";
        $winwin->what_happen = "esto es una prueba";
        $winwin->description= "";
        $winwin->what_we_do = " propuesta participativa del winwin prueba nuevo servidor";
        $winwin->users_amount = "2";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "86";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Vaquita para el viaje de 15 de Laurita";
        $winwin->what_happen = "la nena está por cumplir años y quiere ir a visitar a su hermana mayor en Paris.";
        $winwin->description= "";
        $winwin->what_we_do = "{10} para poner 200 dólares cada uno para comparar el pasaje";
        $winwin->users_amount = "10";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "113";
        $winwin->scope = "GLOBAL";
        $winwin->title = "alertas sobre explotaciones forestales ilegales";
        $winwin->what_happen = "se exploran áreas ilegalmente";
        $winwin->description= "";
        $winwin->what_we_do = " detectar las explotaciones ilegales en la provincia del Chaco y denunciarlas en un mapa web armado bajo el concepto de crowdsourced";
        $winwin->users_amount = "10";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "61";
        $winwin->scope = "GLOBAL";
        $winwin->title = "winwin creado con mi cuenta de facebook";
        $winwin->what_happen = "pueba";
        $winwin->description= "";
        $winwin->what_we_do = " prueba propuesta participativa";
        $winwin->users_amount = "2";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "90";
        $winwin->scope = "GLOBAL";
        $winwin->title = "mi nuevo winwin de prueba";
        $winwin->what_happen = "prueba";
        $winwin->description= "";
        $winwin->what_we_do = " prueba propuesta participativa";
        $winwin->users_amount = "2";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "20";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Abogados";
        $winwin->what_happen = "Los abogados tenemos muy mala fama.";
        $winwin->description= "";
        $winwin->what_we_do = "ayudar a limpiar nuestra inmerecida mala fama, aportarías $1000 a Ricciardi para que se ocupe de una campaña ed mkt a favor de los bogas?";
        $winwin->users_amount = "50";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "90";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Pizarra Pizarra izarra izarra izarra iza";
        $winwin->what_happen = "Leo";
        $winwin->description= "";
        $winwin->what_we_do = " {propuesta participativa}";
        $winwin->users_amount = "1";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "89";
        $winwin->scope = "GLOBAL";
        $winwin->title = "1er WW";
        $winwin->what_happen = "Probando la funcionalidad";
        $winwin->description= "";
        $winwin->what_we_do = " probar el nuevo WW";
        $winwin->users_amount = "2";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "51";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Demo Winwin";
        $winwin->what_happen = "Estamos probando la carga de winwins";
        $winwin->description= "";
        $winwin->what_we_do = " hacer pruebas en el sitio";
        $winwin->users_amount = "10";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "111";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Lorem Ipsum is simply dummy text of the ";
        $winwin->what_happen = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into ";
        $winwin->description= "";
        $winwin->what_we_do = "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and";
        $winwin->users_amount = "2";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "30";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Ayudemos al fin de semana...";
        $winwin->what_happen = "Una buena asociación del fin de semana es el espacio de dispersión y reencuentro familiar y/o con amigos, que nos permite recargar pilas para la semana siguiente. Es sabido que los fines de semana, también, son para ponerse al día con todos los demás quehaceres que nos van quedando de la semana: - Estudiar - Ordenar la casa - Hacer deporte - Etc....";
        $winwin->description= "";
        $winwin->what_we_do = " {propuesta participativa}";
        $winwin->users_amount = "2";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "66";
        $winwin->scope = "GLOBAL";
        $winwin->title = "WW de prueba";
        $winwin->what_happen = "WW de prueba";
        $winwin->description= "";
        $winwin->what_we_do = " WW de prueba";
        $winwin->users_amount = "2";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "117";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Denunciando crápulas";
        $winwin->what_happen = "hay mucha gente mala y sin código en la vida laboral: discriminadores, maltratadores, serruchadores de piso, gente que se arroga trabajos que hicieron otros, en fin...";
        $winwin->description= "";
        $winwin->what_we_do = " armar, mantener y gestionar un blog dedicado a escrachar a esta gente";
        $winwin->users_amount = "6";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "14";
        $winwin->scope = "GLOBAL";
        $winwin->title = "WW de Juan Acosta";
        $winwin->what_happen = "WW de Juan Acosta";
        $winwin->description= "";
        $winwin->what_we_do = " WW";
        $winwin->users_amount = "3";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "94";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Apagón y marchas barriales";
        $winwin->what_happen = "Los países ricos producen el 65% de los gases contaminantes y el 95% de los residuos tóxicos. Sin embargo los países pobres son los más afectados y sus poblaciones más vulnerables.";
        $winwin->description= "";
        $winwin->what_we_do = "Apagar las luces de nuestros hogares a las 18:30hs y marchar a pie con velas a la plaza principal de tu barrio el jueves 29 de agosto del 2013 clamando por la responsabilidad ambiental de nuestros Estados, empresas y compatriotas.";
        $winwin->users_amount = "100000";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "57";
        $winwin->scope = "GLOBAL";
        $winwin->title = "probando nuevos contenidos";
        $winwin->what_happen = "probando nuevos contenidosprobando nuevos contenidosprobando nuevos contenidos";
        $winwin->description= "";
        $winwin->what_we_do = " probando nuevos contenidosprobando nuevos contenidosprobando nuevos contenidosprobando nuevos contenidosprobando nuevos contenidosprobando nuevos contenidos";
        $winwin->users_amount = "5";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "3";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Organizando los residuos domésticos";
        $winwin->what_happen = "Tiramos muchas cosas que otros pueden sacar provecho y contaminamos nuestro medio. ";
        $winwin->description= "";
        $winwin->what_we_do = "Si supieras que todos vecinos del Parque Centenario se comprometen a poner su granito de arena clasificando la basura que generamos, vos... ";
        $winwin->users_amount = "5";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "91";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Reciclemos";
        $winwin->what_happen = "La separación de residuos en origen es el primer paso para que el proceso de reciclado sea exitoso.";
        $winwin->description= "";
        $winwin->what_we_do = "todos los vecinos del edificio nos comprometemos a separar nuestros residuos, para así llegar a ser el 1er Edificio Verde de Chacarita";
        $winwin->users_amount = "0";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "73";
        $winwin->scope = "GLOBAL";
        $winwin->title = "ww sin quorum";
        $winwin->what_happen = "parece que no se puede ahora crear un ww sin quorum";
        $winwin->description= "";
        $winwin->what_we_do = "crear un ww sin quorum";
        $winwin->users_amount = "2";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "96";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Mantener calles sanas y limpias en Buenos Aires";
        $winwin->what_happen = "Cada vez se puede caminar menos por las calles de la ciudad, ni hablar de moverse con mochilas, sillas de ruedas, carritos de bebes, carritos para el super.";
        $winwin->description= "";
        $winwin->what_we_do = "Gestion en las comunas el control y arreglo de las veredas rotas, también fomentar que la gente sea más limpia, teniendo mas cestos de basura, etc.";
        $winwin->users_amount = "30";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "11";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Temporada en Villadrau";
        $winwin->what_happen = "Necesitamos estar en familia";
        $winwin->description= "";
        $winwin->what_we_do = "10 pasar la primavera en familia en la casa de Sebas y Nat";
        $winwin->users_amount = "10";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "17";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Prueba";
        $winwin->what_happen = "Prueba";
        $winwin->description= "";
        $winwin->what_we_do = "Prueba";
        $winwin->users_amount = "2";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "54";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Prueba";
        $winwin->what_happen = "Prueba";
        $winwin->description= "";
        $winwin->what_we_do = "Prueba";
        $winwin->users_amount = "1000";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "94";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Winwins de prueba";
        $winwin->what_happen = "Lorem ipsum ";
        $winwin->description= "";
        $winwin->what_we_do = "100";
        $winwin->users_amount = "150";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "59";
        $winwin->scope = "GLOBAL";
        $winwin->title = "inventores unidos";
        $winwin->what_happen = "no hay una agrupación laica que integre la diversidad de inventores argentinos";
        $winwin->description= "";
        $winwin->what_we_do = "100 armar una asociación civil";
        $winwin->users_amount = "100";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "16";
        $winwin->scope = "GLOBAL";
        $winwin->title = "NUEVO WW con grupo Privado";
        $winwin->what_happen = "Probando esta funcionalidad";
        $winwin->description= "";
        $winwin->what_we_do = "probar que funcione esta funcionalidad";
        $winwin->users_amount = "3";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "27";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Limpiemos la Playa Mientras Charlamos!";
        $winwin->what_happen = "En la temporada, la playa del delfín, se llena con cosas (botellas plástico, papeles, etc.)que los vecinos y turistas van dejando, pero también algunas que trae el mar. Es feo, pero se puede solucionar, y eso mejoraría no sólo la imagen de "ww-default.jpg"
        $winwin->description= "";
        $winwin->what_we_do = "bajar a la playa juntos las mañanas de los lunes y los jueves, con bolsas de consorcio para levantar la basura, mientras caminamos y charlamos";
        $winwin->users_amount = "30";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "89";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Apertura de datos de educación (CABA)";
        $winwin->what_happen = "No se cuenta con datos abiertos sobre la información pública del presupuesto del Ministerio de Educación del Gobierno de la Cuidad de Buenos Aires.";
        $winwin->description= "";
        $winwin->what_we_do = "firmar un petitorio a la Jefatura porteña para abrir estos datos en y para presentar un prouecto de ley en la legislatura.";
        $winwin->users_amount = "100000";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "116";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Reciclemos en Dorrego 4454";
        $winwin->what_happen = "Ya tenemos vecinos que reciclan, pero la mayoría no. La cooperativa el Algarrobo, nos propone pasar todos los martes y viernes para buscar los plásticos, cartones y vidrios que podamos separar. Lo que reciclamos se transforma en productos nuevos, que no requieren nuevas explotaciones de recursos, lo que NO Reciclamos termina en montañas inmanejables que rodean nuestra ciudad.";
        $winwin->description= "";
        $winwin->what_we_do = "reciclar en nuestro edificio de Dorrego 4454, ";
        $winwin->users_amount = "40";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "65";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Prueba";
        $winwin->what_happen = "Prueba";
        $winwin->description= "";
        $winwin->what_we_do = "Prueba";
        $winwin->users_amount = "3";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "102";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Prueba 1 (26-12-13)";
        $winwin->what_happen = "Prueba";
        $winwin->description= "";
        $winwin->what_we_do = "Prueba";
        $winwin->users_amount = "3";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "66";
        $winwin->scope = "GLOBAL";
        $winwin->title = "escuadra de ayuda a vecinos sin luz";
        $winwin->what_happen = "enfermos, personas mayores están atrapadas en sus casas por la falta de luz. necesitan nuestra ayuda";
        $winwin->description= "una persona de guardia por cada día, que le pasa la posta y la bitácora de la guardia al siguiente.";
        $winwin->what_we_do = "ayudar a los enfermos y personas mayores de cada barrio, rotando cada día para ayudarlos a hacer compras, llevarles agua e higienisarlos";
        $winwin->users_amount = "10";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "107";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Cumple Sorpresa";
        $winwin->what_happen = "El 20/1 cumple Agus 40 y no quiere hacer nada... ";
        $winwin->description= "La idea es conseguir un lugar, hacer una pantomima para llevarlo, invitar a sus amigos y... PARTY TIME";
        $winwin->what_we_do = "organizar una fiestita sorpresa a Agus";
        $winwin->users_amount = "5";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "112";
        $winwin->scope = "GLOBAL";
        $winwin->title = "UNO NUEVO CHECKING";
        $winwin->what_happen = "Es muy largo de contar pero se pueden escribit hasta 1000 caracters...";
        $winwin->description= "Es muy largo de contar pero se pueden escribit hasta 1000 caracters...";
        $winwin->what_we_do = "que podemos armar grupos y varias cosas";
        $winwin->users_amount = "2";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "112";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Oraciones por la paz";
        $winwin->what_happen = "los pueblos más pobres del globo confrontan entre sí sin advertir que las circunstancias que provocan el conflicto son digitadas por el contrabando y la droga";
        $winwin->description= "cada uno elije cómo pedir por la paz entre los pueblos y las personas en desventaja, por esta causa vale rezar, meditar, visualizar, etc.";
        $winwin->what_we_do = "orar y/o meditar 5 minutos todos los días a las 9am por la paz entre los pueblos pobres del globo";
        $winwin->users_amount = "100";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "102";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Limpiando la Playa mientras charlamos ";
        $winwin->what_happen = "Entre lo que trae el mar, y lo que dejan tirado algunos, estamos en un lugar lejos de natural.";
        $winwin->description= "undefined";
        $winwin->what_we_do = "bajar los sábados a limpiar la playa mientras charlamos";
        $winwin->users_amount = "20";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "50";
        $winwin->scope = "GLOBAL";
        $winwin->title = "NO REPRESIÃ“N a los PUEBLOS ORIGINARIOS";
        $winwin->what_happen = "En Argentina los pueblos originarios son uno de los colectivos más reprimidos por las policías y demás fuerzas de seguridad nacionales. ";
        $winwin->description= "Debemos parar esta represión injusta y cruel que sólo demuestra los negocios e inescrupulosos que hay detrás de estos tristísimos sucesos. El encuentro de al menos 20 en cada plaza sería de media hora una vez al menos, convidando prensa y con cartelería homogenea en cada nodo.";
        $winwin->what_we_do = "que nos juntemos los primeros sábados de c/ mes en la plaza principal de la capital de la prov. en q' vivamos protestando por la represión a los pueblos originarios";
        $winwin->users_amount = "20";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "68";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Limpieza de la Plaza Las Heras";
        $winwin->what_happen = "La plaza está muy sucia, y se llena de ratas y enfermedades";
        $winwin->description= "Deberíamos juntarnos un fin de semana con ropa cómoda y que no importe que se ensucie. Pensamos llevar una guitarra y empanadas. ";
        $winwin->what_we_do = "limpiar el Parque Las Heras, mientras cantamos";
        $winwin->users_amount = "25";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "68";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Limpieza de la Plaza Las Heras";
        $winwin->what_happen = "La plaza está muy sucia, y se llena de ratas y enfermedades";
        $winwin->description= "Deberíamos juntarnos un fin de semana con ropa cómoda y que no importe que se ensucie. Pensamos llevar una guitarra y empanadas. ";
        $winwin->what_we_do = "limpiar el Parque Las Heras, mientras cantamos";
        $winwin->users_amount = "25";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "10";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Vecinos quita hambre";
        $winwin->what_happen = "En el barrio de Colegiales hay muchas persona sin techo que sólo comen cuando  un vecino los convida con algo...";
        $winwin->description= "undefined";
        $winwin->what_we_do = "ocuparnos de un desayuno diario para las personas sin techo que se presenten en la plaza de barrio";
        $winwin->users_amount = "10";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "96";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Compra colectiva de Orgánicos";
        $winwin->what_happen = "No hay productos orgánicanicos en todos los mercados y comercios. Como en general  tenes que viajar para comprar verduras organicas, e ir a otro lado para comprar productos orgánicos de almacen lo ideal es hacer compras grandes y ahorrar viajes, ademas de aprovechar precios al mayor.";
        $winwin->description= "undefined";
        $winwin->what_we_do = "organizar una compra mensual de almacén orgánico, otra mensual de hortalizas y otra quincenal de frutas";
        $winwin->users_amount = "50";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "80";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Prueba";
        $winwin->what_happen = "Prueba";
        $winwin->description= "undefined";
        $winwin->what_we_do = "Prueba";
        $winwin->users_amount = "2";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "110";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Prueba";
        $winwin->what_happen = "Prueba";
        $winwin->description= "undefined";
        $winwin->what_we_do = "Prueba";
        $winwin->users_amount = "2";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "64";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Prueba3";
        $winwin->what_happen = "Prueba";
        $winwin->description= "undefined";
        $winwin->what_we_do = "Prueba";
        $winwin->users_amount = "3";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "115";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Prueba4";
        $winwin->what_happen = "Prueba";
        $winwin->description= "undefined";
        $winwin->what_we_do = "Prueba";
        $winwin->users_amount = "3";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "9";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Prueba5";
        $winwin->what_happen = "Prueba";
        $winwin->description= "undefined";
        $winwin->what_we_do = "Prueba";
        $winwin->users_amount = "3";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "73";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Prueba";
        $winwin->what_happen = "Prueba";
        $winwin->description= "undefined";
        $winwin->what_we_do = "Prueba";
        $winwin->users_amount = "3";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "90";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ";
        $winwin->what_happen = "Aenean luctus adipiscing risus, a blandit diam lacinia iaculis. Maecenas venenatis purus vel odio semper sit amet facilisis est mattis. Aliquam erat volutpat. Quisque aliquet purus eget dolor tempus dignissim. Nullam gravida tristique varius. Praesent pretium ultrices velit id lacinia. Cras sodales feugiat mi, at tincidunt elit interdum in. In id augue ligula. Aenean luctus adipiscing risus cada cual.";
        $winwin->description= "undefined";
        $winwin->what_we_do = "Vivamus elementum eros in quam imperdiet ac commodo ipsum hendrerit. Sed orci justo, aliquam sed mattis in, aliquam in mauris. Cras et ipsum sed lectus suscipit scelerisque. ";
        $winwin->users_amount = "1";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "108";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Pasto Verde para todos";
        $winwin->what_happen = "Con mas pasto se producen mejores sensaciones al caminar.";
        $winwin->description= "undefined";
        $winwin->what_we_do = "Que hay mas pasto en las casas, barrios y ciudades";
        $winwin->users_amount = "4";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "24";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Manejo del Tiempo";
        $winwin->what_happen = "Tenemos que mejorar el manejo del tiempo. Clave para el día de hoy.";
        $winwin->description= "undefined";
        $winwin->what_we_do = "Para manejar de la mejor manera de usar nuestro tiempo y crear un taller experimental.";
        $winwin->users_amount = "10";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "42";
        $winwin->scope = "GLOBAL";
        $winwin->title = "El Patrón del Mal";
        $winwin->what_happen = "Adicción por la serie colombiana";
        $winwin->description= "undefined";
        $winwin->what_we_do = "Para que levanten la serie para que la gente pueda utilizar mejor su tiempo. Borrar es una prueba.";
        $winwin->users_amount = "8";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "17";
        $winwin->scope = "GLOBAL";
        $winwin->title = "5to WinWins";
        $winwin->what_happen = "Creo un 5to winwins.";
        $winwin->description= "undefined";
        $winwin->what_we_do = "Para detectar si lo que muestra en mis winwins esta ok!";
        $winwin->users_amount = "2";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "84";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Prueba";
        $winwin->what_happen = "Prueba";
        $winwin->description= "undefined";
        $winwin->what_we_do = "Prueba";
        $winwin->users_amount = "2";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "122";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Herramientas para erradicar la pobreza";
        $winwin->what_happen = "Según un informe muy reciente del Banco Mundial, es improbable que el crecimiento por sí solo permita terminar con la pobreza extrema para 2030, pues, a medida que esta disminuye, el crecimiento tiende a sacar de la pobreza a un menor número de personas. Ello obedece a que, al llegar a esta etapa, muchas de las personas que todavía viven en la pobreza extrema se encuentran en una situación en la que es sumamente difícil mejorar sus condiciones de vida. Por lo tanto, no debemos esperar sól";
        $winwin->description= "undefined";
        $winwin->what_we_do = "firmar un petitorio al Gobierno Nacional para que genere una Política de Estado en forma participativa y de largo plazo para erradicar la pobreza ";
        $winwin->users_amount = "100000";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "110";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Creative and effective social accountability";
        $winwin->what_happen = "It is more more often to raise citizen voice to the heart of sustainable development by building a community of people and resources prepared to harness the data revolution.";
        $winwin->description= "undefined";
        $winwin->what_we_do = "to spread the knowledge and develop skills in our neigbours";
        $winwin->users_amount = "1000";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "58";
        $winwin->scope = "GLOBAL";
        $winwin->title = "MEZ test";
        $winwin->what_happen = "Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing. Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero. Cras id dui. Aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede. Sed lectus. Donec mollis hendrerit risus. Phasel";
        $winwin->description= "Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing. Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero. Cras id dui. Aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede. Sed lectus. Donec mollis hendrerit risus. Phasellus nec sem in justo pellentesque facilisis. Etiam imperdiet imperdiet orci. Nunc nec neque. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi.";
        $winwin->what_we_do = "Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing. Phasellus ullamcorper ipsum ";
        $winwin->users_amount = "69";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "87";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Prueba para subir una unica foto";
        $winwin->what_happen = "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.";
        $winwin->description= "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.";
        $winwin->what_we_do = "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido ";
        $winwin->users_amount = "100";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "11";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Cibervigilancia en Obelisco";
        $winwin->what_happen = "Varias veces al año indaptados convierten una protesta o un festejo en un desman violento.";
        $winwin->description= "Si por Internet podemos ver quiénes son y qué hacen estos inadaptados en sus picos de locura violenta podemos amedrentarlos con una &quot;
        $winwin->what_we_do = condena social&quot;
        $winwin->users_amount = ";
        $winwin->image = "ww-default.jpg"
        "2";
        "winwinAvatar_avatar.jpg";
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "45";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Recepción a la selección de futbol";
        $winwin->what_happen = "salieron subcampeones del mundo, te parece poca cosas???";
        $winwin->description= "vamos ARGENTINA!!!";
        $winwin->what_we_do = "hacerles una recepción cariñosa";
        $winwin->users_amount = "3";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "67";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Medita en casa";
        $winwin->what_happen = "los principiantes buscan orientación y consejos... nosotros -los más experimentados- podemos ayudarlos vía email, telefónica o redes sociales.";
        $winwin->description= "la empatía y compartir la experiencia propia no sólo ayudará a otros si no que enriquecerá nuestro tránsito.";
        $winwin->what_we_do = "mentorear principiantes de meditación en el hogar";
        $winwin->users_amount = "4";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "77";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Juntos por mas patrocinadores";
        $winwin->what_happen = "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. ";
        $winwin->description= "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.";
        $winwin->what_we_do = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.";
        $winwin->users_amount = "5";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "62";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Otro pero sin habilitar con primer post";
        $winwin->what_happen = "Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up";
        $winwin->description= "It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up.";
        $winwin->what_we_do = "Contrary to popular belief, ";
        $winwin->users_amount = "4";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "35";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Venas de conciencia ";
        $winwin->what_happen = "El 9 de noviembre celebramos el Día Nacional del Donante Voluntario de Sangre. Argentina registra menos de 1.000.000 donaciones por año, cuando el sistema de salud requeriría al menos 1.500.000 para alcanzar la autosuficiencia en glóbulos rojos. De estas donaciones, apenas un 10% corresponden a la donación voluntaria.Vos podrías ser la diferencia entre la vida y la muerte de una persona. La donación es sencilla, acá podés verificar los requisitos:http://goo.gl/iXh4cB";
        $winwin->description= "Cuántas transfusiones se utilizan en un hospital?-Accidente grave de tránsito: 20 - 30-Trasplante de hígado: 20 - 30-Parto complicado: 4 - 6 -Hemorragia digestiva: 10-Paciente con leucemia: 250 Sólo el hospital Garrahan requiere 60 donantes diarios para cubrir las necesidades de sus pacientes. Unámonos para alivianarles la carga al menos un día a estos profesionales de la salud. ";
        $winwin->what_we_do = "donar sangre en el hospital público o centro de recepción más cercano";
        $winwin->users_amount = "60";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "41";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Reconstruyamos la Huerta de Don Torcuato";
        $winwin->what_happen = "En junio pasado se incendió el salón de la Huerta Comunitaria Don Torcuato, junto al cuartito de herramientas y el depósito de alimentos para los desayunos ... Fué muy fuerte ver todo hecho carbón desparramado en el suelo ... ni las estanterías, los libros, las semillas, los bancos las mesitas, los juguetes, etc... Solo quedaron en pié un par de barriles de metal ... impresionante ... las actividades tuvieron que suspenderse por una cuestión de seguridad ... el techo se quemó mucho y ";
        $winwin->description= "Para el mantenimiento de la huerta y la reconstrucción de las instalaciones seguro necesitaremos herramientas: Carretilla, palas de punta, ancha, recta, corazón o la que sea ... palitas de mano, baldes de esos usados de pintura o enduido ... y no tan urgente: tijeras de podar, pinzas, pico de loro, alicate, martillo, clavos, masa, alambre y todo tipo de herramientas que no usen ... ";
        $winwin->what_we_do = "Somos 40 para reconstruir con productos reciclados y técnicas de permacultura la Huerta de Don Torcuato que se incendió en junio pasado y donde se desarrollaban proyectos educativos con niños del barrio";
        $winwin->users_amount = "40";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "104";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Winwins Para probar Pizarra destacados";
        $winwin->what_happen = "Deseas ver la versión para tu país? De lo contrario, es posible que no puedas ver algunas películas y series de TV. Sí (redireccionar a mi país) - No (quedarme en el sitio actual).";
        $winwin->description= "Deseas ver la versión para tu país? De lo contrario, es posible que no puedas ver algunas películas y series de TV. Sí (redireccionar a mi país) - No (quedarme en el sitio actual).";
        $winwin->what_we_do = "Deseas ver la versión para tu país? De lo contrario, es posible que no puedas ver algunas películas y series de TV. Sí (redireccionar a mi país) - No (quedarme en el sitio actual).";
        $winwin->users_amount = "1000";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "23";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Campaña Niños Solidarios";
        $winwin->what_happen = "La Campaña Niños Solidarios es una campaña creada por la ONG Mensajeros de la Paz y consiste en que niños ofrezcan un regalo a otro niño que no está en condición de recibir regalos por su situación de pobreza o exclusión social. Los regalos serán distribuidos entre una red de centros y hogares de la ciudad y provincia de Buenos Aires.";
        $winwin->description= "La acción es ir al Parque para dar a conocer la campaña y invitar a la gente que traigan juguetes. En el mismo Parque, los niños se acercan y arman las cajas, las embalan y pueden escribir cartas o hacer dibujos para el niño que recibirá el regalo.";
        $winwin->what_we_do = "ir al Parque Centenario los sábados para juntar regalos para la Campaña Niños Solidarios";
        $winwin->users_amount = "15";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "50";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Huerta en el Barrio de los Andes";
        $winwin->what_happen = "Tenemos el Jardincito del fondo sin utilizar y podríamos procurarnos ahí, especias tipo romero, perejil, etc.";
        $winwin->description= "Tenemos las herramientas disponibles que usa los chicos que trabajan en mantenimiento, creo que podría ser todos los sábados, una reunión de unos 5 como mínimo, de la lista de 20 que se sumen. ";
        $winwin->what_we_do = "hacer una huerta orgánica en el Barrio de los Andes";
        $winwin->users_amount = "20";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "60";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Nuevo ww";
        $winwin->what_happen = "saradasass";
        $winwin->description= "saradasass llegará antes de que esté activo... lets see";
        $winwin->what_we_do = "para ver cómo llega el mensaje por email y cuando...";
        $winwin->users_amount = "4";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "24";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Desafio Nuevo para ver el MSJ nuevo";
        $winwin->what_happen = "Desafio Nuevo para ver el MSJ nuevoDesafio Nuevo para ver el MSJ nuevoDesafio Nuevo para ver el MSJ nuevoDesafio Nuevo para ver el MSJ nuevoDesafio Nuevo para ver el MSJ nuevoDesafio Nuevo para ver el MSJ nuevoDesafio Nuevo para ver el MSJ nuevoDesafio Nuevo para ver el MSJ nuevoDesafio Nuevo para ver el MSJ nuevoDesafio Nuevo para ver el MSJ nuevoDesafio Nuevo para ver el MSJ nuevoDesafio Nuevo para ver el MSJ nuevo";
        $winwin->description= "Desafio Nuevo para ver el MSJ nuevoDesafio Nuevo para ver el MSJ nuevoDesafio Nuevo para ver el MSJ nuevoDesafio Nuevo para ver el MSJ nuevo";
        $winwin->what_we_do = "Desafio Nuevo para ver el MSJ nuevoDesafio Nuevo para ver el MSJ nuevoDesafio Nuevo para ver el MSJ nuevoDesafio Nuevo para ver el MSJ nuevo ";
        $winwin->users_amount = "3";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "66";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Nombre Winwin";
        $winwin->what_happen = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ";
        $winwin->description= "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ";
        $winwin->what_we_do = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ";
        $winwin->users_amount = "10";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "11";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Winwin desde el IOS";
        $winwin->what_happen = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ";
        $winwin->description= "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ";
        $winwin->what_we_do = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ";
        $winwin->users_amount = "10";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "104";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Huerta en Lobos!!";
        $winwin->what_happen = "Falta muy poquito para terminar, pero necesitamos amigos que empujen";
        $winwin->description= "Faltan sólo unos 10 metros cuadrados, entre 10 lo hacemos en una hora... y luego podemos comer ensalada de Rúcula Orgánica con orgullo y vinagreta.";
        $winwin->what_we_do = "trabajar juntos el suelo de la Huerta del Paso del Lobo, mientras comemos cosas ricas y hacemos Danzoterapia";
        $winwin->users_amount = "10";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "117";
        $winwin->scope = "GLOBAL";
        $winwin->title = "M";
        $winwin->what_happen = "M";
        $winwin->description= "M";
        $winwin->what_we_do = "M";
        $winwin->users_amount = "3";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "27";
        $winwin->scope = "GLOBAL";
        $winwin->title = "con tilde en la á";
        $winwin->what_happen = "tampoco acá";
        $winwin->description= "ni siquiera acá mamá";
        $winwin->what_we_do = "que no haya problemas con las á";
        $winwin->users_amount = "2";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "32";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Messi Andan las Encuestas";
        $winwin->what_happen = "Established fact that a reader will be distracted by the readable content of a page when looking at its layout. ";
        $winwin->description= "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English";
        $winwin->what_we_do = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content her";
        $winwin->users_amount = "3";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "77";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Poemario de la memoria";
        $winwin->what_happen = "Memoria";
        $winwin->description= "Memoria";
        $winwin->what_we_do = "para armar un poemario sobre los muertos en las inundaciones del 2013";
        $winwin->users_amount = "30";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "42";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Bake sale";
        $winwin->what_happen = "Perritos";
        $winwin->description= "Perritos";
        $winwin->what_we_do = "para organizar una venta solidaria y recaudar fondos para la Asociación Perritos";
        $winwin->users_amount = "35";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();

        $winwin = new Winwin();
        $winwin->user_id = "102";
        $winwin->scope = "GLOBAL";
        $winwin->title = "Bake sale";
        $winwin->what_happen = "Perritos";
        $winwin->description= "Perritos";
        $winwin->what_we_do = "para organizar una venta solidaria y recaudar fondos para la Asociación Perritos";
        $winwin->users_amount = "35";
        $winwin->image = "ww-default.jpg"
        $winwin->published = 1;
        $winwin->save();



    }

}

