(function() {
  'use strict';

  angular
    .module('winwins')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, ENV, RestangularProvider, $authProvider, cfpLoadingBarProvider, amDatePickerConfigProvider, AnalyticsProvider) {

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

    // Google Analytics
    AnalyticsProvider.setAccount({  
                                    tracker: 'UA-79951335-2', 
                                    trackEvent: true 
                                });
    AnalyticsProvider.trackPages(true);
    AnalyticsProvider.setDomainName('http://dev-winwins.net/#/');

    // angular-loading-bar
    cfpLoadingBarProvider.includeSpinner = true;

    amDatePickerConfigProvider.setOptions({
        calendarIcon: '/assets/images/ic_today_black_24px.svg',
        clearIcon: '/assets/images/ic_close_black_24px.svg',
        nextIcon: '/assets/images/ic_keyboard_arrow_right_black_24px.svg',
        prevIcon: '/assets/images/ic_keyboard_arrow_left_black_24px.svg'
    })

  }

})();
