!function(a){function b(){if(!(this instanceof b))return new b;this.boundary="------RWWorkerFormDataBoundary"+Math.random().toString(36);var a=this.data=[];this.__append=function(b){var c,d=0;if("string"==typeof b)for(c=b.length;c>d;++d)a.push(255&b.charCodeAt(d));else if(b&&b.byteLength){"byteOffset"in b||(b=new Uint8Array(b));for(c=b.byteLength;c>d;++d)a.push(255&b[d])}}}if(!a.FormData){a.FormData=b;var c=XMLHttpRequest.prototype.send;XMLHttpRequest.prototype.send=function(a){return a instanceof b&&(a.__endedMultipart||a.__append("--"+a.boundary+"--\r\n"),a.__endedMultipart=!0,this.setRequestHeader("Content-Type","multipart/form-data; boundary="+a.boundary),a=new Uint8Array(a.data)),c.call(this,a)},b.prototype.append=function(a,b,c){if(this.__endedMultipart&&(this.data.length-=this.boundary.length+6,this.__endedMultipart=!1),arguments.length<2)throw new SyntaxError("Not enough arguments");var d="--"+this.boundary+'\r\nContent-Disposition: form-data; name="'+a+'"';return b instanceof File||b instanceof Blob?this.append(a,new Uint8Array((new FileReaderSync).readAsArrayBuffer(b)),c||b.name):("number"==typeof b.byteLength?(d+='; filename="'+(c||"blob").replace(/"/g,"%22")+'"\r\n',d+="Content-Type: application/octet-stream\r\n\r\n",this.__append(d),this.__append(b),d="\r\n"):d+="\r\n\r\n"+b+"\r\n",void this.__append(d))}}}(this||self),angular.module("config",[]).constant("api_host","http://dev-winwins.net").value("debug",!0),angular.module("winwinsApp",["ngAnimate","ngCookies","ngResource","ngFileUpload","ngSanitize","ngTouch","ngTagsInput","ui.router","ui.select","satellizer","config","infinite-scroll","zumba.angular-waypoints","oitozero.ngSweetAlert","pascalprecht.translate","720kb.background","720kb.socialshare","truncate","tmh.dynamicLocale"]).config(["$locationProvider","$stateProvider","$urlRouterProvider",function(a,b,c){function d(a,b,c,d){var e=a.defer();return c.isAuthenticated()?e.resolve():(console.dir(d),b.path("/signin")),e.promise}c.otherwise("/"),a.html5Mode(!0),b.state("main",{url:"/",templateUrl:"views/main.html",controller:"MainCtrl"}).state("signUp",{url:"/signup",templateUrl:"views/signup.html",controller:"SignUpCtrl"}).state("logout",{url:"/logout",template:null,controller:"LogoutCtrl"}).state("account",{url:"/account",templateUrl:"views/user/account.html",controller:"MainCtrl"}).state("winwin",{url:"/winwin",templateUrl:"views/winwin.html",controller:"WinwinCtrl"}).state("winwin-new",{url:"/winwin-new",templateUrl:"views/winwin/edit.html",controller:"winwin-edit",resolve:{loginRequired:d}}).state("winwin-first-post",{url:"/winwin-first-post/:winwinId",templateUrl:"views/winwin/first_post.html",controller:"winwin-first-post"}).state("winwin-promote",{url:"/winwin-promote/:winwinId",templateUrl:"views/winwin/promote.html",controller:"winwin-promote"}).state("winwin-list",{url:"/winwin-list",templateUrl:"views/winwin/list.html",controller:"winwin-list"}).state("winwin-search",{url:"/winwin-search",templateUrl:"views/winwin/search.html",controller:"winwin-search"}).state("winwin-view",{url:"/winwin-view/:winwinId",templateUrl:"views/winwin/view.html",controller:"winwin-view"}).state("winwin-view.muro",{url:"/winwin-view/:winwinId",templateUrl:"views/winwin/muro.html",controller:"winwin-muro"}).state("winwin-view.members",{url:"/winwin-view/:winwinId",templateUrl:"views/winwin/participantes.html",controller:"winwin-members"}).state("winwin-view.sponsors",{url:"/winwin-view/:winwinId",templateUrl:"views/winwin/sponsors.html",controller:"winwin-sponsors"}).state("winwin-view.admin_campanada",{url:"/winwin-view/:winwinId",templateUrl:"views/winwin/admin_campanada.html",controller:"winwin-campanada"}).state("winwin-view.admin_configuracion",{url:"/winwin-view/:winwinId",templateUrl:"views/winwin/admin_configuracion.html",controller:"winwin-configuracion"}).state("winwin-view.admin_patrocinio",{url:"/winwin-view/:winwinId",templateUrl:"views/winwin/admin_solicitud_patrocinio.html",controller:"winwin-patrocinio"}).state("winwin-view.admin_miembros",{url:"/winwin-view/:winwinId",templateUrl:"views/winwin/admin_participantes.html",controller:"winwin-miembros"}).state("winwin-view.winwin-sponsor-request",{url:"/winwin-sponsor-request/:winwinId",templateUrl:"views/winwin/admin_solicitud_patrocinio.html",controller:"winwin-sponsor-request"}).state("createWW",{url:"/createww",templateUrl:"views/createWW.html",controller:"CreateWWCtrl"}).state("createWWid",{url:"/createwwid",templateUrl:"views/createWWid.html",controller:"CreateWWCtrl"}).state("signIn",{url:"/signin",templateUrl:"views/login.html",controller:"LoginCtrl"}).state("success-login",{url:"/success-login",templateUrl:"views/login_success.html",controller:"SuccessLogin"}).state("failure-login",{url:"/fail-login",templateUrl:"views/login_failure.html",controller:"FailureLogin"}).state("activateWW",{url:"/activate",templateUrl:"views/activateWW.html",controller:"ActivateWWCtrl"}).state("promote",{url:"/promote",templateUrl:"views/promote.html",controller:"ActivateWWCtrl"}).state("members",{url:"/members",templateUrl:"views/members.html",controller:"MembersCtrl"}).state("comments",{url:"/comments",templateUrl:"views/comments.html",controller:"WinwinCtrl"}).state("group-view",{url:"/group-view/:groupId",templateUrl:"views/group/view.html",controller:"group-view"}).state("group-new",{url:"/group-new",templateUrl:"views/group/edit.html",controller:"group-edit"}).state("group-list",{url:"/group-list",templateUrl:"views/group/list.html",controller:"group-list"}).state("user-view",{url:"/user-view/:groupId",templateUrl:"views/user/view.html",controller:"user-view"}).state("user-list",{url:"/user-list",templateUrl:"views/user/list.html",controller:"user-list"}).state("sponsor-view",{url:"/sponsor-view/:sponsorId",templateUrl:"views/sponsor/view.html",controller:"sponsor-view"}).state("search-list",{url:"/search/:query",templateUrl:"views/search/list.html",controller:"search-list"}).state("sponsor-list",{url:"/sponsor-list",templateUrl:"views/sponsor/list.html",controller:"sponsor-list"}),d.$inject=["$q","$location","$auth","$state"]}]).config(["$authProvider","api_host",function(a,b){a.baseUrl=b+"/",a.httpInterceptor=!0,a.facebook({clientId:"1082199191794840",scope:"email,public_profile"}),a.google({clientId:"313110710680-p22p1s5brqn7tfaqj9v16u67bic5smqk.apps.googleusercontent.com"}),a.yahoo({clientId:"dj0yJmk9SDVkM2RhNWJSc2ZBJmQ9WVdrOWIzVlFRMWxzTXpZbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0yYw--"}),a.twitter({url:"/auth/twitter"})}]).config(["$translateProvider","tmhDynamicLocaleProvider",function(a,b){a.useMissingTranslationHandlerLog(),a.useStaticFilesLoader({prefix:"resources/locale-",suffix:".json"}),a.preferredLanguage("es_ES"),a.useLocalStorage(),b.localeLocationPattern("bower_components/angular-i18n/angular-locale_{{locale}}.js")}]).directive("ngEnter",function(){return function(a,b,c){b.bind("keydown keypress",function(b){13===b.which&&(a.$apply(function(){a.$eval(c.ngEnter)}),b.preventDefault())})}}).constant("LOCALES",{locales:{es_ES:"Español",en_US:"English"},preferredLocale:"es_ES"}).controller("Ctrl",["$scope","$location","$window",function(a,b,c){a.$on("$locationChangeStart",function(c,d,e){a.startPath=b.path(),a.startNewUrl=d,a.startOldUrl=e}),a.$on("$locationChangeSuccess",function(c,d,e){a.successPath=b.path(),a.successNewUrl=d,a.successOldUrl=e}),a.back=function(){c.history.back()},a.forward=function(){c.history.forward()}}]),angular.module("winwinsApp").controller("MainCtrl",["$scope","$auth","$http","$state","Winwin",function(a,b,c,d,e){a.winwins=[],e.query(function(b){a.winwins=b}),a.isAuthenticated=function(){return b.isAuthenticated()},a.goControlPanel=function(){d.go("account")},a.join=function(e){b.isAuthenticated()?c.get("/api/winwins/join/"+e).success(function(b){swal({title:"info",text:"winwin_join",type:"info",showcancelbutton:!1,closeonconfirm:!0}),a.view(e)}).error(function(a){swal({title:"ADVERTENCIA",text:a.message,type:"warning",showCancelButton:!1,closeOnConfirm:!0})}):d.go("signIn")},a.view=function(a){console.log("view "+a),d.go("winwin-view",{winwinId:a})},a.openShare=function(a){$("#socialModal").modal("show"),console.log("winwin_id: "+a)}}]),angular.module("winwinsApp").controller("SignUpCtrl",["$scope","$auth","SweetAlert",function(a,b,c){a.signup=function(){b.signup({username:a.name,email:a.email,password:a.password,birthdate:a.birthdate,name:a.name,lastname:a.lastname,language_code:"ES"})["catch"](function(a){c.swal("Pasó algo!",a.message,"warning",function(){$state.go("signup")})})},a.authenticate=function(a){b.authenticate(a).then(function(){$rootScope.currentUser=data,c.swal("Genial!","Vamos a tu cuenta!","success",function(){$state.go("main")})})["catch"](function(a){$state.go("failure-login"),c.swal("Pasó algo!",a.message,"warning",function(){$state.go("signup")})})}}]),angular.module("winwinsApp").controller("winwin-edit",["$scope","$state","$auth","Upload","Winwin","Interest",function(a,b,c,d,e,f){a.winwin=new e({}),a.interests=[],a.scopes=["GLOBAL","REGION","COUNTRY","STATE","CITY"],a.first_stage=!0,a.second_stage=!1,a.winwin.closing_date=new Date,a.closingdatechange=function(a){},$("#datetimepicker1").datetimepicker({minDate:new Date,format:"DD MM YYYY"}),f.query(function(b){a.interests=b}),a.doValidateBasic=function(){return!0},a.persistBasic=function(){console.log("persist basic"),a.doValidateBasic()&&(a.first_stage=!1,a.second_stage=!0,console.log("First Stage: "+a.first_stage),console.log("Second Stage: "+a.second_stage))},a.doSave=function(){a.winwin.$save(function(c){b.go("winwin-first-post",{winwinId:a.winwin.id})})},a.uploading=!1,a.files=[],a.$watch("files",function(){console.log("watch files"),a.upload(a.files)}),a.upload=function(b){if(b&&b.length)for(var c=0;c<b.length;c++){var e=b[c];d.upload({url:"/api/winwins/upload",method:"POST",fields:{},file:e,fileFormDataName:"myFile"}).progress(function(b){var c=parseInt(100*b.loaded/b.total);a.uploading=!0,console.log("progress: "+c+"% "+b.config.file.name)}).success(function(b,c,d,e){console.log("file "+e.file.name+"uploaded. Response: "+b),console.dir(b),a.uploading=!1,a.winwin.image=b.filename}).error(function(){a.uploading=!1})}},a.setVideoUrl=function(){console.log("set video"),swal({title:"Video Link",text:"Ingresa dirección de video:",type:"input",inputType:"url",showCancelButton:!0,closeOnConfirm:!0},function(b){var c=/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;b&&b.match(c)?(console.log("Valido"),a.winwin.video=b):console.log("No Valido")})}}]).controller("winwin-first-post",["$scope","$stateParams","$http","$state","$auth","Winwin","Account","Post",function(a,b,c,d,e,f,g,h){console.dir(b),a.post=new h({}),a.profile={},a.winwin={},g.getProfile().success(function(b){b&&(a.profile=b.profile)}),f.get({id:b.winwinId},function(b){a.winwin=b,a.post.reference_id=b.id,a.post.type="WINWIN"}),a.setVideoUrl=function(){swal({title:"Video Link",text:"Ingresa dirección de video:",type:"input",inputType:"text",showCancelButton:!0,closeOnConfirm:!0},function(b){a.video=b})},a.files=[],a.$watch("files",function(){a.upload(a.files)}),a.upload=function(b){if(b&&b.length)for(var c=0;c<b.length;c++){var d=b[c];Upload.upload({url:"/api/post/upload",fields:{},file:d}).progress(function(a){parseInt(100*a.loaded/a.total)}).success(function(b,c,d,e){a.post.media_id=b.media_id})}},a.submitPost=function(){console.log("submit"),console.dir(a.post),a.post.$save(function(b){c.get("/api/winwins/activate/"+a.winwin.id).success(function(b){swal({title:"Info",text:"winwin_activated",type:"info",showcancelbutton:!1,closeonconfirm:!0}),d.go("winwin-promote",{winwinId:a.winwin.id})}).error(function(a){swal({title:"Error",text:a.message,type:"warning",showCancelButton:!1,closeOnConfirm:!0})})})}}]).controller("winwin-promote",["$scope","$stateParams","$http","$state","Winwin","Account",function(a,b,c,d,e,f){a.profile={},a.winwin={},f.getProfile().success(function(b){b&&(a.profile=b.profile)}),e.get({id:b.winwinId},function(b){a.winwin=b}),a.goView=function(){d.go("winwin-view",{winwinId:a.winwin.id})}}]).controller("winwin-list",["$scope","WinwinPaginate",function(a,b){a.winwins=new b,a.doFilter=function(a){console.log(a)}}]).controller("winwin-search",["$scope","$http",function(a,b){a.winwins=[],a.do_search=function(){b.get("/api/winwins/search/",{params:{q:a.query}}).success(function(b){a.winwins=b}).error(function(a){})}}]).controller("winwin-view",["$scope","$http","$state","$stateParams","$timeout","$anchorScroll","$location","Winwin","Account",function(a,b,c,d,e,f,g,h,i){a.main_view=!0,a.winwin={},a.getWinwin=function(){a.winwin=h.get({id:d.winwinId},function(b){a.winwin=b,a.calculate_time()})},a.isSponsor=!1,i.getProfile().success(function(b){b&&(a.profile=b.profile,a.isSponsor=b.sponsor)}),a.duration_days=0,a.duration_hours=0,a.duration_minutes=0,a.calculate_time=function(){var b=moment(),c=moment(a.winwin.closing_date);a.duration_days=c.diff(b,"days"),console.log(a.duration_days),a.duration_hours=c.diff(b.add(a.duration_days,"days"),"hours"),console.log(a.duration_hours);var d=c.diff(b.add(a.duration_days,"days").add(a.duration_hours,"hours"),"minutes");a.duration_minutes=0>d?0:d,console.log(a.duration_minutes)},a.getWinwin(),a.join=function(){$auth.isAuthenticated()?b.get("/api/winwins/join/"+a.winwin.id).success(function(b){a.getWinwin(),swal({title:"info",text:"winwin_join",type:"info",showcancelbutton:!1,closeonconfirm:!0})}).error(function(a){swal({title:"ADVERTENCIA",text:a.message,type:"warning",showCancelButton:!1,closeOnConfirm:!0})}):c.go("signIn")},a.pass=function(){c.go("winwin-list")},a.left=function(){b.get("/api/winwins/left/"+a.winwin.id).success(function(b){a.getWinwin(),swal({title:"info",text:"winwin_left",type:"info",showcancelbutton:!1,closeonconfirm:!0})}).error(function(a){swal({title:"ADVERTENCIA",text:a.message,type:"warning",showCancelButton:!1,closeOnConfirm:!0})})},a.first_view=!0,a.setup_components=function(){var b=a;e(function(){b.view_height=$("winwin-view").height(),a.height_to_change=1.5*b.view_height,b.height_to_change=b.view_height,$(window).scroll(function(){$(this).scrollTop()>a.view_height?($("#menu-winwin").fadeIn(500),a.first_view&&(a.first_view=!1,a.goMuro())):$("#menu-winwin").fadeOut(500)})},1e3)},a.setup_components(),a.current_subview="muro",a.goMuro=function(){a.current_subview="muro",a.isAdmin=!1,c.go("winwin-view.muro",{winwinId:a.winwin.id})},a.goMembers=function(){a.current_subview="members",a.isAdmin=!1,c.go("winwin-view.members",{winwinId:a.winwin.id})},a.goSponsors=function(){a.current_subview="sponsors",a.isAdmin=!1,c.go("winwin-view.sponsors",{winwinId:a.winwin.id})},a.goWinwin=function(){a.current_subview="muro",a.isAdmin=!1,g.hash("winwin-view"),f()},a.goAdmin=function(){a.isAdmin=!0},a.goPatrocinio=function(){a.current_subadmin="patrocinio",c.go("winwin-view.admin_patrocinio",{winwinId:a.winwin.id})},a.goRequestPatrocinio=function(){a.current_subview="sponsor",c.go("winwin-view.winwin-sponsor-request",{winwinId:a.winwin.id})},a.goMiembros=function(){a.current_subadmin="miembros",c.go("winwin-view.admin_miembros",{winwinId:a.winwin.id})},a.goConfiguracion=function(){a.current_subadmin="configuracion",c.go("winwin-view.admin_configuracion",{winwinId:a.winwin.id})},a.goCampanada=function(){a.current_subadmin="campanada",c.go("winwin-view.admin_campanada",{winwinId:a.winwin.id})},a.isAdmin=!1,a.next=function(){console.log("next"),a.winwin.next_id&&c.go("winwin-view",{winwinId:a.winwin.next_id})},a.previous=function(){console.log("back"),a.winwin.previous_id&&c.go("winwin-view",{winwinId:a.winwin.previous_id})}}]).controller("winwin-members",["$scope","$http","$stateParams","Winwin",function(a,b,c,d){d.get({id:c.winwinId},function(b){a.winwin=b})}]).controller("winwin-sponsors",["$scope","$http","$stateParams","Winwin",function(a,b,c,d){d.get({id:c.winwinId},function(b){a.winwin=b})}]).controller("winwin-muro",["$scope","$http","$stateParams","Winwin","Account","Post",function(a,b,c,d,e,f){a.posts=[],a.last={},b.get("http://winwins.app/api/posts/winwin/"+c.winwinId+"/posts").success(function(b){a.posts=b.posts,a.last=b.last}),d.get({id:c.winwinId},function(b){a.winwin=b}),a.post=new f({}),a.profile={},a.winwin={},a.isSponsor=!1,e.getProfile().success(function(b){b&&(a.profile=b.profile,a.isSponsor=b.sponsor)}),a.setVideoUrl=function(){swal({title:"Video Link",text:"Ingresa dirección de video:",type:"input",inputType:"text",showCancelButton:!0,closeOnConfirm:!0},function(b){a.video=b})},a.files=[],a.$watch("files",function(){a.upload(a.files)}),a.upload=function(b){if(b&&b.length)for(var c=0;c<b.length;c++){var d=b[c];Upload.upload({url:"/api/post/upload",fields:{},file:d}).progress(function(a){parseInt(100*a.loaded/a.total)}).success(function(b,c,d,e){a.post.media_id=b.media_id})}},a.submitPost=function(){a.post.reference_id=a.winwin.id,a.post.type="WINWIN",console.dir(a.post),a.post.$save(function(a){swal({title:"Info",text:"post_send",type:"info",showcancelbutton:!1,closeonconfirm:!0})})}}]).controller("winwin-campanada",["$scope","$http","$state","$stateParams","Winwin",function(a,b,c,d,e){e.get({id:d.winwinId},function(b){a.winwin=b}),a.sentCampanada=function(){b.post("/api/winwins/campanada/"+a.winwin.id,{body:a.body}).success(function(b){swal({title:"Info",text:"campanada_sent",type:"info",showcancelbutton:!1,closeonconfirm:!0}),c.go("winwin-view",{winwinId:a.winwin.id})}).error(function(a){swal({title:"Error",text:a.message,type:"warning",showCancelButton:!1,closeOnConfirm:!0})})}}]).controller("winwin-miembros",["$scope","$http","$stateParams","Winwin",function(a,b,c,d){d.get({id:c.winwinId},function(b){a.winwin=b})}]).controller("winwin-configuracion",["$scope","$http","$stateParams","Winwin",function(a,b,c,d){d.get({id:c.winwinId},function(b){a.winwin=b})}]).controller("winwin-patrocinio",["$scope","$http","$stateParams","Winwin",function(a,b,c,d){d.get({id:c.winwinId},function(b){a.winwin=b})}]).controller("winwin-sponsor-request",["$scope","$http","$state","$stateParams","Winwin",function(a,b,c,d,e){e.get({id:d.winwinId},function(b){a.winwin=b}),a.sentRequest=function(){b.post("/api/winwins/sponsor_request/"+a.winwin.id,{body:a.body}).success(function(b){swal({title:"Info",text:"sponsor_request_sent",type:"info",showcancelbutton:!1,closeonconfirm:!0}),c.go("winwin-view",{winwinId:a.winwin.id})}).error(function(a){swal({title:"Error",text:a.message,type:"warning",showCancelButton:!1,closeOnConfirm:!0})})}}]),angular.module("winwinsApp").controller("search-list",["$scope","$stateParams","$state","$http",function(a,b,c,d){console.dir(b),a.hits=[],a.winwins=[],a.users=[],a.sponsors=[],a.groups=[],d.get("/api/ww/search/",{params:{q:b.query}}).success(function(b){a.hits=b,a.users=b.users||[],a.winwins=b.winwins||[],a.groups=b.groups||[],a.sponsors=b.sponsors||[]}).error(function(a){console.log(a)}),a.view=function(a,b){switch(console.log("Type: "+a+" - Id: "+b),a){case"winwins":c.go("winwin-view",{winwinId:b});break;case"users":c.go("user-view",{userId:b});break;default:c.go("winwin-view",{winwinId:b})}}}]),angular.module("winwinsApp").controller("group-edit",["$scope","$state","$auth","Upload","Group","Interest",function(a,b,c,d,e,f){a.group=new e({}),a.doValidate=function(){return!0},a.doSave=function(){a.doValidate()&&a.group.$save(function(c){b.go("group-view",{groupId:a.group.id})})},a.files=[],a.$watch("files",function(){a.upload(a.files)}),a.upload=function(b){if(b&&b.length)for(var c=0;c<b.length;c++){var e=b[c];d.upload({url:"/api/winwins/upload",fields:{},file:e}).progress(function(a){parseInt(100*a.loaded/a.total)}).success(function(b,c,d,e){a.group.photo=b.filename})}}}]).controller("group-list",["$scope","GroupPaginate",function(a,b){a.groups=new b}]).controller("group-view",["$scope","$http","$state","$stateParams","$timeout","$anchorScroll","$location","Group",function(a,b,c,d,e,f,g,h){a.getGroup=function(){a.group=h.get({id:d.groupId},function(a){})},a.getGroup(),a.join=function(){b.get("/api/groups/join/"+a.group.id).success(function(b){a.getGroup(),swal({title:"info",text:"group_join",type:"info",showcancelbutton:!1,closeonconfirm:!0})}).error(function(a){swal({title:"ADVERTENCIA",text:a.message,type:"warning",showCancelButton:!1,closeOnConfirm:!0})})},a.left=function(){b.get("/api/groups/left/"+a.group.id).success(function(b){swal({title:"info",text:"group_left",type:"info",showcancelbutton:!1,closeonconfirm:!0}),a.getGroup()}).error(function(a){swal({title:"ADVERTENCIA",text:a.message,type:"warning",showCancelButton:!1,closeOnConfirm:!0})})},a.addToGroup=function(c){b.get("/api/groups/"+a.group.id+"/add_winwin/"+c).success(function(b){swal({title:"info",text:"winwin_added_to_group",type:"info",showcancelbutton:!1,closeonconfirm:!0}),a.getGroup()}).error(function(a){swal({title:"ADVERTENCIA",text:a.message,type:"warning",showCancelButton:!1,closeOnConfirm:!0})})},a.removeFromGroup=function(c){b.get("/api/groups/"+a.group.id+"/remove_winwin/"+c).success(function(b){swal({title:"info",text:"winwin_removed_from_group",type:"info",showcancelbutton:!1,closeonconfirm:!0}),a.getGroup()}).error(function(a){swal({title:"ADVERTENCIA",text:a.message,type:"warning",showCancelButton:!1,closeOnConfirm:!0})})}}]),angular.module("winwinsApp").controller("sponsor-list",["$scope","$state","SponsorPaginate",function(a,b,c){a.sponsors=new c,a.view=function(a){b.go("sponsor-view",{sponsorId:a})}}]).controller("sponsor-view",["$scope","$http","$state","$stateParams","$timeout","$anchorScroll","$location","Sponsor",function(a,b,c,d,e,f,g,h){a.getSponsor=function(){a.sponsor=h.get({id:d.sponsorId},function(a){})},a.getSponsor(),a.follow=function(){b.get("/api/sponsors/follow/"+a.sponsor.id).success(function(b){a.getSponsor(),swal({title:"info",text:"sponsor_join",type:"info",showcancelbutton:!1,closeonconfirm:!0})}).error(function(a){swal({title:"ADVERTENCIA",text:a.message,type:"warning",showCancelButton:!1,closeOnConfirm:!0})})},a.unfollow=function(){b.get("/api/sponsors/unfollow/"+a.sponsor.id).success(function(b){swal({title:"info",text:"sponsor_left",type:"info",showcancelbutton:!1,closeonconfirm:!0}),a.getSponsor()}).error(function(a){swal({title:"ADVERTENCIA",text:a.message,type:"warning",showCancelButton:!1,closeOnConfirm:!0})})}}]),angular.module("winwinsApp").controller("user-list",["$scope","$state","$http","$auth","UserPaginate",function(a,b,c,d,e){a.users=new e,a.isAuthenticated=function(){return d.isAuthenticated()},a.view=function(a){b.go("user-view",{userId:a})},a.follow=function(b){c.get("/api/users/follow/"+b).success(function(b){a.getUser(),swal({title:"info",text:"user_join",type:"info",showcancelbutton:!1,closeonconfirm:!0})}).error(function(a){swal({title:"ADVERTENCIA",text:a.message,type:"warning",showCancelButton:!1,closeOnConfirm:!0})})}}]).controller("user-view",["$scope","$http","$state","$stateParams","$timeout","$anchorScroll","$location","User",function(a,b,c,d,e,f,g,h){a.getUser=function(){a.user=h.get({id:d.userId},function(a){})},a.getUser(),a.follow=function(){b.get("/api/users/follow/"+a.user.id).success(function(b){a.getUser(),swal({title:"info",text:"user_join",type:"info",showcancelbutton:!1,closeonconfirm:!0})}).error(function(a){swal({title:"ADVERTENCIA",text:a.message,type:"warning",showCancelButton:!1,closeOnConfirm:!0})})},a.unfollow=function(){b.get("/api/users/unfollow/"+a.user.id).success(function(b){swal({title:"info",text:"user_left",type:"info",showcancelbutton:!1,closeonconfirm:!0}),a.getUser()}).error(function(a){swal({title:"ADVERTENCIA",text:a.message,type:"warning",showCancelButton:!1,closeOnConfirm:!0})})}}]),angular.module("winwinsApp").controller("WinwinMenuCtrl",["$scope","$state","$stateParams","$window",function(a,b,c,d){$(window).unbind("scroll"),$(window).bind("scroll",function(){console.log($(window).scrollTop())}),a.submenu={members:!1,sponsors:!1,comments:!0,config:!1},a.subMenuClick=function(c){$.each(a.submenu,function(b,c){a.submenu[b]=!1}),a.submenu[c]=!0,b.go("winwin."+c)}}]),angular.module("winwinsApp").controller("CreateWWCtrl",["$scope",function(a){a.region="",a.category="",a.selectRegion=function(b){a.region=b},a.selectCategory=function(b){a.category=b}}]),angular.module("winwinsApp").controller("ActivateWWCtrl",["$scope",function(a){a.backImg="https://mehranbanaei.files.wordpress.com/2014/12/children-in-central-african-republic.jpg",a.icon="../images/placeholder-square.71f60642.jpg"}]),angular.module("winwinsApp").controller("LoginCtrl",["$scope","$rootScope","$auth","$state","SweetAlert",function(a,b,c,d,e){a.login=function(){c.login({email:a.email,password:a.password}).then(function(a){b.currentUser=a,e.swal("Genial!","Vamos a tu cuenta!","success",function(){d.go("main")})})["catch"](function(a){console.dir(a),e.swal("Pasó algo!",a.data.message,"warning",function(){d.go("signin")})})},a.authenticate=function(a){c.authenticate(a).then(function(){e.swal("Genial!","Vamos a tu cuenta!","success",function(){d.go("main")})})["catch"](function(a){e.swal("Pasó algo!",a.message+'<br/><span class="advertencia">Vuelve a inentar</span>',"warning",function(){d.go("signin")})})}}]).controller("FailureLogin",["$scope","$state","$timeout",function(a,b,c){}]).controller("SuccessLogin",["$scope","$state","$timeout",function(a,b,c){c(function(){b.go("main")},3e3)}]),angular.module("winwinsApp").controller("LogoutCtrl",["$auth","$rootScope",function(a,b){a.isAuthenticated()&&a.logout().then(function(){})}]),angular.module("winwinsApp").controller("MembersCtrl",["$scope","$animate",function(a,b){}]),angular.module("winwinsApp").controller("NavController",["$scope","$location","$auth","$window","Account",function(a,b,c,d,e){a.isCollapsed=!0,a.unreadNotifications=0,a.$on("$routeChangeSuccess",function(){a.isCollapsed=!0}),a.$on("$stateChangeStart",function(){a.isCollapsed=!0,c.isAuthenticated()?e.getStatus().then(function(b){a.unreadNotifications=b.data.notifications_unread||0}):a.unreadNotifications=0}),a.isAuthenticated=function(){return c.isAuthenticated()},a.do_back=function(){d.history.back()}}]),angular.module("winwinsApp").directive("closingDatePicker",["$window","$templateCache",function(a,b){if(!a.moment)return console.log("moment.js is required for this datepicker, http://momentjs.com/"),{link:function(){}};var c="datepicker.directive.html",d=b.get(c);return d||(d=['<div ng-repeat="i in localeOrder track by $index"  class="dropdown col-xs-4 no-padding">','<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">','<span ng-bind="date[options[i].name] || options[i].name"> </span>','<span class="caret"></span>',"</button>",'<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">','<li ng-repeat="(j, option) in options[i].options track by $index">','<span style="cursor:pointer" ng-click="select(options[i].name, option)" ng-bind="options[i].labels[j] || option.value"></span>',"</li>","</ul>","</div>"].join(""),b.put(c,d)),{restrict:"A",require:"ngModel",templateUrl:c,scope:{model:"=ngModel",minDate:"=minDate",maxDate:"=maxDate",locale:"=?locale"},link:function(a,b,c,d){function e(b){var c=j.get("years"),d=i.get("years"),e=j.get("month"),f=i.get("month"),k=j.get("date"),l=i.get("date");if(i!==j){a.options.years.options=[];for(var m=d;c>=m;m++){var n={value:m,available:!0};b&&b.years===m&&(n.selected=!0),a.options.years.options.push(n)}}if(i!==j){a.options.months.options=[];for(var m=0;m<h.length;m++){var o={value:h[m]};b&&b.months===h[m]&&(o.selected=!0),b&&b.years&&(b.years===d?f>m&&(o.disabled=!0):b.years===c&&m>e&&(o.disabled=!0)),a.options.months.options.push(o)}}if(i!==j)if(a.options.days.options=[],b&&b.years&&b.months||b.months){var p;p=b.years?b.years:moment().get("year");for(var q=moment({years:p,months:h.indexOf(b.months)}).endOf("month").get("date"),m=0;q>m;m++){var r={};r.value=m+1,b&&b.days&&b.days===m+1&&(r.selected=!0),b.years&&b.months&&(b.years===d&&h.indexOf(b.months)===f?l>m&&(r.disabled=!0):b.years===c&&h.indexOf(b.months)===e&&m>k&&(r.disabled=!0)),a.options.days.options.push(r)}}else{a.options.days.options=[];for(var m=0;m<g.length;m++){var r={};r.value=m+1,b&&b.days&&b.days===m+1&&(r.selected=!0),a.options.days.options.push(r)}}}function f(){if(void 0!==a.date.years&&void 0!==a.date.months&&void 0!==a.date.days){var b={years:a.date.years,months:h.indexOf(a.date.months),date:a.date.days};b=moment.utc(b),d.$setViewValue(b)}}var g=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],h=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];a.localeOrder=["days","months","years"];var i,j,k={days:{name:"days",initLabel:"Día",options:[]},months:{name:"months",initLabel:"Mes",options:[]},years:{name:"years",initLabel:"Año",options:[]}};if(a.minDate&&"now"!==a.minDate){var l;l="number"==typeof a.minDate?a.minDate>0?moment().add(a.minDate,"years"):a.minDate<0?moment().subtract(Math.abs(a.minDate),"years"):moment():moment(a.minDate),i=l}else i=moment();if(a.maxDate&&"now"!==a.maxDate){var m;m="number"==typeof a.maxDate?a.maxDate>0?moment().add(a.maxDate,"years"):a.maxDate<0?moment().subtract(Math.abs(a.maxDate),"years"):moment():moment(a.maxDate),j=m}else j=moment();a.options=angular.copy(k),a.date={},a.select=function(b,c){(void 0===c.disabled||c.disabled!==!0)&&(a.date[b]=c.value,e(a.date),f())};var n=function(b){if(void 0!==b){var c=moment(b);e({years:c.get("year"),months:h[c.get("months")],days:c.get("date")})}else e();if(void 0!==b){var d=moment(b);if(d.isValid()){var g={};g.days=d.date(),g.months=h[d.month()],g.years=d.year(),a.date=g}}else a.date={};return f(),b},o=function(a){return a&&a.isValid()?(a.isAfter(i)||i.isSame(a))&&(j.isAfter(a)||j.isSame(a))?(d.$setValidity("not-allowed",!0),a.format()):void d.$setValidity("not-allowed",!1):void 0};d.$parsers.push(o),d.$formatters.push(n)}}}]),angular.module("birth-day",["ng"]).directive("birthDayPicker",function(){return{restrict:"A",replace:!0,required:"birthday",scope:{birthday:"=",onChange:"&"},template:'<div class="birthday-picker input-group"><input type="number" placeholder="Día" id="monthDay" ng-model="birthDay" min="1" max="31" max-lengh="2" ng-change="birthpickerchanged();" class="birth-day form-control col-xs-4 col-md-4 no-padding"/><select ng-model="birthMonth" ng-change="birthpickerchanged();" class="birth-month  form-control col-xs-4 col-md-4 no-padding"><option value="1">Enero</option><option value="2">Febrero</option><option value="3">Marzo</option><option value="4">Abril</option><option value="5">Mayo</option><option value="6">Junio</option><option value="7">Julio</option><option value="8">Agosto</option><option value="9">Septiembre</option><option value="10">Octubre</option><option value="11">Noviembre</option><option value="12">Diciembre</option></select><input type="number" placeholder="Año" id="Year" ng-model="birthYear" min="1900" max-lengh="4"  max="{{maxyear();}}" ng-change="birthpickerchanged();" class="birth-year form-control col-xs-4 col-md-4 no-padding" name="birth"/></div>',link:function(a,b,c){if(null==a.birthday)a.birthMonth=(new Date).getMonth(),a.birthDay=(new Date).getDate(),a.birthYear=(new Date).getFullYear();else{var d=new Date(a.birthday);a.birthMonth=d.getMonth()+1,a.birthDay=d.getDate(),a.birthYear=d.getFullYear()}a.birthpickerchanged=function(){a.birthDay>31?a.birthDay=31:a.birthDay<=0?a.birthDay=1:void 0==a.birthDay&&(a.birthDay=31),a.birthDay>a.maxyear()&&(a.birthDay=a.maxyear());var b=new Date(a.birthYear,a.birthMonth-1,a.birthDay,0,0,0);a.birthday=b,a.onChange({data:a.birthday})},a.maxyear=function(){return(new Date).getFullYear()}}}}),angular.module("winwinsApp").directive("ensureUnique",["$http",function(a){return{require:"ngModel",link:function(a,b,c,d){a.$watch(c.ngModel,function(){})}}}]),angular.module("winwinsApp").directive("searchBar",["$animate","$state",function(a,b){
return{restrict:"E",replace:!0,scope:{},templateUrl:"views/extras/searchBar.html",link:function(a,c,d,e){a.searchActive=!1,a.toggleSearchBar=function(){a.searchActive=!a.searchActive,a.searchActive},a.search=function(){console.dir($("#query").val()),b.go("search-list",{query:$("#query").val(),winwin:$("#search_winwin").val(),user:$("#search_user").val(),group:$("#search_group").val(),sponsor:$("#search_sponsor").val()})}}}}]),angular.module("winwinsApp").directive("ngTranslateLanguageSelect",["LocaleService",function(a){"use strict";return{restrict:"A",replace:!0,template:'<div class="dropdown language-select" ng-if="visible"><select ng-model="currentLocaleDisplayName"ng-options="localesDisplayName for localesDisplayName in localesDisplayNames"ng-change="changeLanguage(currentLocaleDisplayName)"></select></div>',controller:["$scope",function(b){b.currentLocaleDisplayName=a.getLocaleDisplayName(),b.localesDisplayNames=a.getLocalesDisplayNames(),b.visible=b.localesDisplayNames&&b.localesDisplayNames.length>1,b.changeLanguage=function(b){a.setLocaleByDisplayName(b)}}]}}]),angular.module("truncate",[]).filter("characters",function(){return function(a,b,c){if(isNaN(b))return a;if(0>=b)return"";if(a&&a.length>b){if(a=a.substring(0,b),c)for(;" "===a.charAt(a.length-1);)a=a.substr(0,a.length-1);else{var d=a.lastIndexOf(" ");-1!==d&&(a=a.substr(0,d))}return a+"…"}return a}}).filter("splitcharacters",function(){return function(a,b){if(isNaN(b))return a;if(0>=b)return"";if(a&&a.length>b){var c=a.substring(0,b/2),d=a.substring(a.length-b/2,a.length);return c+"..."+d}return a}}).filter("words",function(){return function(a,b){if(isNaN(b))return a;if(0>=b)return"";if(a){var c=a.split(/\s+/);c.length>b&&(a=c.slice(0,b).join(" ")+"…")}return a}}),angular.module("winwinsApp").factory("Group",["$resource","api_host",function(a,b){return a(b+"/api/groups/:id",{id:"@id"},{update:{method:"POST"}})}]).factory("Sponsor",["$resource","api_host",function(a,b){return a(b+"/api/sponsors/:id",{id:"@id"},{update:{method:"POST"}})}]).factory("Account",["$http",function(a){return{getProfile:function(){return a.get("/api/me")},getStatus:function(){return a.get("/api/me/status")},updateProfile:function(b){return a.put("/api/me",b)}}}]).factory("User",["$resource","api_host",function(a,b){return a(b+"/api/users/:id",{id:"@id"},{update:{method:"POST"}})}]).factory("Winwin",["$resource","api_host",function(a,b){return a(b+"/api/winwins/:id",{id:"@id"},{update:{method:"POST"}})}]).factory("Post",["$resource","api_host",function(a,b){return a(b+"/api/posts/:id",{id:"@id"},{update:{method:"POST"}})}]).factory("ActivityType",["$resource","api_host",function(a,b){return a(b+"/api/parametric/activities/:id",{id:"@id"},{update:{method:"POST"}})}]).factory("Interest",["$resource","api_host",function(a,b){return a(b+"/api/parametric/interests/:id",{id:"@id"},{update:{method:"POST"}})}]).factory("Marital",["$resource","api_host",function(a,b){return a(b+"/api/parametric/marital/:id",{id:"@id"},{update:{method:"POST"}})}]).factory("Language",["$resource","api_host",function(a,b){return a(b+"/api/parametric/languages/:id",{id:"@id"},{update:{method:"POST"}})}]).factory("TokenService",["$http","api_host",function(a,b){function c(){return a.get(b+"/auth/token").then(d,e)}function d(a){return a}function e(a){return a}return{get:c}}]).factory("WinwinPaginate",["$http","api_host",function(a,b){var c=function(){this.items=[],this.busy=!1,this.current_page=0};return c.prototype.nextPage=function(){if(!this.busy){this.busy=!0;var c=this;a.get(b+"/api/winwins/paginate/"+(this.current_page||"0")+"/15").success(function(a){c.current_page=c.current_page+1;for(var b=0;b<a.length;b++)c.items.push(a[b]);c.busy=!1})}},c}]).factory("GroupPaginate",["$http","api_host",function(a,b){var c=function(){this.items=[],this.busy=!1,this.current_page=0};return c.prototype.nextPage=function(){if(!this.busy){this.busy=!0;var c=this;a.get(b+"/api/groups/paginate/"+(this.current_page||"0")+"/15").success(function(a){c.current_page=c.current_page+1;for(var b=0;b<a.length;b++)c.items.push(a[b]);c.busy=!1})}},c}]).factory("UserPaginate",["$http","api_host",function(a,b){var c=function(){this.items=[],this.busy=!1,this.current_page=0};return c.prototype.nextPage=function(){if(!this.busy){this.busy=!0;var c=this;a.get(b+"/api/users/paginate/"+(this.current_page||"0")+"/15").success(function(a){c.current_page=c.current_page+1;for(var b=0;b<a.length;b++)c.items.push(a[b]);c.busy=!1})}},c}]).factory("SponsorPaginate",["$http","api_host",function(a,b){var c=function(){this.items=[],this.busy=!1,this.current_page=0};return c.prototype.nextPage=function(){if(!this.busy){this.busy=!0;var c=this;a.get(b+"/api/sponsors/paginate/"+(this.current_page||"0")+"/15").success(function(a){c.current_page=c.current_page+1;for(var b=0;b<a.length;b++)c.items.push(a[b]);c.busy=!1})}},c}]),angular.module("winwinsApp").service("LocaleService",["$translate","LOCALES","$rootScope","tmhDynamicLocale",function(a,b,c,d){"use strict";var e=b.locales,f=Object.keys(e);f&&0!==f.length||console.error("There are no _LOCALES provided");var g=[];f.forEach(function(a){g.push(e[a])});var h=a.proposedLanguage(),i=function(a){return-1!==f.indexOf(a)},j=function(b){return i(b)?(h=b,void a.use(b)):void console.error('Locale name "'+b+'" is invalid')};return c.$on("$translateChangeSuccess",function(a,b){document.documentElement.setAttribute("lang",b.language),d.set(b.language.toLowerCase().replace(/_/g,"-"))}),{getLocaleDisplayName:function(){return e[h]},setLocaleByDisplayName:function(a){j(f[g.indexOf(a)])},getLocalesDisplayNames:function(){return g}}}]);