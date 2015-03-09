'use strict';

module.exports = function(app) {
  app.controller('unicornsController', ['$scope', '$http', function($scope, $http) {
    $scope.unicorns = [];
    $scope.getAll = function() {
      $http({
        method: 'GET',
        url: '/api/v1/unicorns'
      })
      .success(function(data) {
        $scope.unicorns = data;
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.create = function(unicorn) {
      $http({
        method: 'POST',
        url: '/api/v1/unicorns',
        data: unicorn
      })
      .success(function(data) {
        $scope.unicorns.push(data);
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.save = function(unicorn) {
      $http({
        method: 'PUT',
        url: '/api/v1/unicorns/' + unicorn._id,
        data: unicorn
      })
      .success(function() {
        unicorn.editing = false;
      })
      .error(function(data) {
        console.log(data);
      })
    };

    $scope.remove = function(unicorn) {
      $http({
        method: 'DELETE',
        url: 'api/v1/unicorns/' + unicorn._id
      })
      .success(function() {
        $scope.unicorns.splice($scope.unicorns.indexOf(unicorn), 1);
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.editToggle = function(unicorn) {
      if (unicorn.editing) {
        unicorn.unicornName = unicorn.oldUnicornName;
        unicorn.editing = false;
      } else {
        unicorn.oldUnicornName = unicorn.unicornName;
        unicorn.editing = true;
      }
    }
  }]);
};