(function() {
  'use strict';

  angular
    .module('sailsDemoAngular')
    .controller('MainController', function($scope,$timeout,$sails,rest){

      var vm = this;
    $scope.users=[];
      vm.awesomeThings = [];
      vm.classAnimation = '';
      vm.creationDate = 1452658293741;

      var params={
        'url':"demo/demoSocket",
        data:{}
      };
$timeout(function(
){
  rest.get(params).then(function(data){

    if (data.hasOwnProperty('err')){

    }else{
      console.log(data);
    }
  });
},5000);


      var barsHandler = $sails.on("users", function (message) {
          console.log(message);
        if (message.verb === "created") {
          $scope.users.push(message.data);
        }
      });

      $scope.activate=function(){
        $timeout(function() {
          vm.classAnimation = 'rubberBand';
        }, 4000);
      };


      $scope.activate();




    });
})();
