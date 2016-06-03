<!doctype html>
<html itemscope itemtype="http://schema.org/Event">
    <head>
        <meta name="author" content="{{ $group_user->detail->name }} {{ $group_user->detail->lastname }}"/>
        <meta property="og:site_name" content="Winwins - Acuerdos en Accion"/>

        <meta property="fb:app_id" content="1082199191794840" />
        <meta property="og:url" content="{{ $url_base }}/group/{{ $group->id }}"/>
        <meta property="og:type" content="article"/>
        <meta property="og:title" content="{{ $group->name }}"/>
        <meta property="og:description" content="{{ $group->description }}"/>
        <meta property="og:image" content="{{ $url_images }}/600x315/smart/{{ $group->image }}"/>
        <meta itemprop="name" content="{{ $group->name }}">
        <meta itemprop="image" content="{{ $url_images }}/120x120/smart/{{ $group->image }}">

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@winwinsorg" />


        <meta http-equiv="refresh" content="0;url='{{ $url_base }}/#/wwg/{{ $group->id }}'">

    </head>
    <body>

    </body>
</html>