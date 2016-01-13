(function() {
  'use strict';

  angular
    .module('sailsDemoAngular')
    .config(config);

  /** @ngInject */
  function config($logProvider,$sailsProvider,ENV) {
    // Enable log
    $logProvider.debugEnabled(true);

    $sailsProvider.url = ENV.api;

  }

})();
