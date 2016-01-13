angular.module('restFactory', [])
    .factory('rest', function($q,$sails,$rootScope,$http,$log,ENV) {
        var factory = {};
      console.log(ENV);
        factory.create=function(params){
            var deferred = $q.defer();
            var config={
                "method":"post",
                "data":params.data,
                "url":ENV.api+'/'+params.url,
                "headers":{"Content-Type":"application/json","Accept":"application/json"}
            };
            this.request(config).then(function(data){
                deferred.resolve(data);
            });
            return deferred.promise;

        };
        factory.post=function(params){

          var deferred = $q.defer();
          var config={
            "method":"post",
            "url":ENV.api+'/'+params.url,
            "data":params.data,
            "headers":{"Content-Type":"application/json","Accept":"application/json"}
          };
          this.request(config).then(function(data){
            deferred.resolve(data);
          });
          return deferred.promise;
        };
        factory.get=function(params){
            var deferred = $q.defer();
            var config={
                "method":"get",
                "url":ENV.api+'/'+params.url,
                "headers":{"Content-Type":"application/json","Accept":"application/json"}
            };
            this.request(config).then(function(data){
                deferred.resolve(data);
            });
            return deferred.promise;
        };

        factory.find=function(params){
            var deferred = $q.defer();
            var config={
                "method":"get",
                "params":{"where":params.data},
                "url":ENV.api+'/'+params.url,
                "headers":{"Content-Type":"application/json","Accept":"application/json"}
            };
            this.request(config).then(function(data){
                deferred.resolve(data);
            });
            return deferred.promise;

        };

        factory.update=function(params){

        };
        factory.delete=function(params){
          var deferred = $q.defer();
          var config={
            "method":"delete",
            "url":ENV.api+'/'+params.url+'/'+params.data,
            "headers":{"Content-Type":"application/json","Accept":"application/json"}
          };
          this.request(config).then(function(data){
            deferred.resolve(data);
          });
          return deferred.promise;
        };
        factory.request=function(config){

          if ($rootScope.socketConnected){
           // console.log("Executing with socket");
            return factory.socketRequest(config);

          }
          else
          {
          //  console.log("Making ajax request");
            return factory.httpRequest(config);
          }

        };
    factory.socketRequest=function(config){
      var deferred = $q.defer();

      if (config.method=='get'){

        $sails.get(config.url).success(function (data, status, headers, jwr) {
          deferred.resolve(data);
        }).error(function (data, status, headers, jwr) {
          console.log(status);//refreshToken
          if (status==401){
            token.refreshToken().then(function(data){
              $sails.get(config.url).success(function (return_data, status, headers, jwr) {
                deferred.resolve(return_data);
              }).error(function (data, status, headers, jwr) {
                console.log("We need to boot your ass out");
              });
            })

          }
        });
      }
      else if(config.method=='post'){
        $sails.post(config.url,config.data).success(function (data, status, headers, jwr) {
          deferred.resolve(data);
        }).error(function (data, status, headers, jwr) {
          console.log(status);//refreshToken
          if (status==401){
            token.refreshToken().then(function(data){
              $sails.get(config.url).success(function (return_data, status, headers, jwr) {
                deferred.resolve(return_data);
              }).error(function (data, status, headers, jwr) {
                console.log("We need to boot your ass out");
              });
            })

          }
        });
      }else if(config.method=='delete'){

        $sails.delete(config.url).success(function (data, status, headers, jwr) {
          deferred.resolve(data);
        }).error(function (data, status, headers, jwr) {
          console.log(status);//refreshToken
          if (status==401){
            token.refreshToken().then(function(data){
              $sails.get(config.url).success(function (return_data, status, headers, jwr) {
                deferred.resolve(return_data);
              }).error(function (data, status, headers, jwr) {
                console.log("We need to boot your ass out");
              });
            })

          }
        });

      }

      return deferred.promise;

    };
        factory.httpRequest=function(config){
            var deferred = $q.defer();

            var status={};

            var promise= $http(config)
                .then(function(result) {
                    var responseData=result.data;
                    //	$scope.isAuthenticated = true;
                    deferred.resolve(responseData);

                });

            return deferred.promise;

        };

        return factory;
    });
