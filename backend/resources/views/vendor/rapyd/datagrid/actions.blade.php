@if (in_array("show", $actions))
    <a class="" title="@lang('rapyd::rapyd.show')" href="{!! url('panel/'.$current_entity.'/'.$uri) !!}?show={!! $id !!}"><span class="glyphicon glyphicon-list-alt"> </span></a>
@endif
@if (in_array("modify", $actions))
    <a class="" title="@lang('rapyd::rapyd.modify')" href="{!! url('panel/'.$current_entity.'/'.$uri) !!}?modify={!! $id !!}"><span class="fa fa-edit"> </span></a>
@endif
@if (in_array("aprobar", $actions))
    <a class="" title="Aprobar" href="{!! url('panel/'.$current_entity.'/'.$uri) !!}?aprobar={!! $id !!}"><span class="fa fa-thumbs-o-up"> </span></a>
@endif
@if (in_array("delete", $actions))
    <span class"ww-spacer"></span>
    <a class="text-danger" title="@lang('rapyd::rapyd.delete')" href="{!! url('panel/'.$current_entity.'/'.$uri) !!}?delete={!! $id !!}"><span class="glyphicon glyphicon-trash"> </span></a>
@endif
