<!doctype html>
<html itemscope itemtype="http://schema.org/Event">
    <head>
        <meta name="author" content="{{ $winwin->user->detail->name }} {{ $winwin->user->detail->lastname }}"/>
        <meta property="og:site_name" content="Winwins - Acuerdos en Accion"/>

        <meta property="fb:app_id" content="1082199191794840" />
        <meta property="og:url" content="{{ $url_base }}/ww-post/{{ $winwin->id }}"/>
        <meta property="og:type" content="article"/>
        <meta property="og:title" content="{{ $winwin->title }}"/>
        <meta property="og:description" content="{{ $post->content }}"/>
        <meta itemprop="name" content="{{ $winwin->title }}">
        <meta itemprop="description" content="{{ $post->content}}">
@if (isset($media))
        <meta property="og:image" content="{{ $url_images }}/600x315/smart/{{ $post->media->name }}"/>
        <meta itemprop="image" content="{{ $url_images }}/120x120/smart/{{ $post->media->name }}">
@endif

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@winwinsorg" />

        <meta http-equiv="refresh" content="0;url='{{ $url_base }}/#/winwin/{{ $winwin->id }}'">

    </head>
    <body>

    </body>
</html>
