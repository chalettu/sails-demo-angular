/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('sailsDemoAngular')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant("ENV",{
    "name": "server",
    "version": "1.0",
    "api":"http://localhost:4000"
    });
})();
