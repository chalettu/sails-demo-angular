(function() {
  'use strict';

  angular
    .module('sailsDemoAngular')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
