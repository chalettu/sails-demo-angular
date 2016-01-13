(function() {
  'use strict';

  angular
    .module('sailsDemoAngular')
    .controller('MainController', function($scope,$timeout,rest){

      var vm = this;

      vm.awesomeThings = [];
      vm.classAnimation = '';
      vm.creationDate = 1452658293741;




      $scope.activate=function(){
        $timeout(function() {
          vm.classAnimation = 'rubberBand';
        }, 4000);
      };


      $scope.activate();




    });
})();
