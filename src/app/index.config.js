(function() {
  'use strict';

  angular
    .module('sailsDemoAngular')
    .config(config);

  /** @ngInject */
  function config($logProvider,$sailsProvider,ENV) {
    // Enable log
    $logProvider.debugEnabled(true);
   // io.sails.autoConnect = true;
    $sailsProvider.url = ENV.api;
  //  io.sails.url = ENV.api;

  }

})();
