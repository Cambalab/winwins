<!doctype html>
<html itemscope itemtype="http://schema.org/Event">
    <head>
        <meta name="author" content="{{ $winwin->user->detail->name }} {{ $winwin->user->detail->lastname }}"/>
        <meta property="og:site_name" content="Winwins - Acuerdos en Accion"/>

        <meta property="fb:app_id" content="1082199191794840" />
        <meta property="og:url" content="{{ $url_base }}/ww/{{ $winwin->id }}"/>
        <meta property="og:type" content="article"/>
        <meta property="og:title" content="{{ $winwin->title }}"/>
        <meta property="og:description" content="¿Si supieras que somos {{ $winwin->users_amount }} para {{ $winwin->what_we_do }} te sumarías?"/>
        <meta property="og:image" content="{{ $url_images }}/600x315/smart/{{ $winwin->image }}"/>
        <meta itemprop="name" content="{{ $winwin->title }}">
        <meta itemprop="description" content="¿Si supieras que somos {{ $winwin->users_amount }} para {{ $winwin->what_we_do }} te sumarías?">
        <meta itemprop="image" content="{{ $url_images }}/120x120/smart/{{ $winwin->image }}">

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@winwinsorg" />


        <meta http-equiv="refresh" content="0;url='{{ $url_base }}/#/winwin/{{ $winwin->id }}'">

    </head>
    <body>

    </body>
</html>
