(function() {
  'use strict';

  angular
    .module('winwins')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, ENV, RestangularProvider, $authProvider, cfpLoadingBarProvider, amDatePickerConfigProvider) {

    // Enable log
    var debug = true;
    if(ENV.name === 'prod') {
      debug = false;
    }
    $logProvider.debugEnabled(debug);

    // Toastr Set options
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;

    // Restangular Set options
    RestangularProvider.setBaseUrl(ENV.apiBase);
    RestangularProvider.setRequestSuffix('/');
    RestangularProvider.setRestangularFields({
      selfLink: 'url'
    });

    // Satellizer set options
    $authProvider.baseUrl = ENV.base + '/';
    $authProvider.httpInterceptor = true;
    $authProvider.facebook(ENV.satellizer.facebook);
    $authProvider.google(ENV.satellizer.google);
    $authProvider.yahoo(ENV.satellizer.yahoo);
    $authProvider.twitter(ENV.satellizer.twitter);

    // angular-loading-bar
    cfpLoadingBarProvider.includeSpinner = false;

    amDatePickerConfigProvider.setOptions({
        calendarIcon: '/static/images/icons/ic_today_24px.svg',
        clearIcon: '/static/images/icons/ic_close_24px.svg',
        nextIcon: '/static/images/icons/ic_chevron_right_18px.svg',
        prevIcon: '/assets/images/ic_keyboard_arrow_left_black_24px.svg'
    })

  }

})();
