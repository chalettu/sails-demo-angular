(function() {
  'use strict';

  angular
    .module('sailsDemoAngular')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log,$sails,$rootScope) {

    $sails.on("connect", function (message) {
      $rootScope.socketConnected = true;
    });
    $sails.on("disconnect", function (message) {
      console.log("Disconnected, i think");
      $rootScope.socketConnected=false;
    });

    $log.debug('runBlock end');
  }

})();
