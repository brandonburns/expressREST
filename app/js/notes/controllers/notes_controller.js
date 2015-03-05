'use strict';

module.exports = function(app) {
  app.controller('notesController', ['$scope', '$http', function($scope, $http) {
    $scope.notes = [];
    $scope.getAll = function() {
      $http({
        method: 'GET',
        url: 'api/v1/unicorns',
      })
      .success(function(data) {
        $scope.notes = data;
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.create = function(note) {
      $http({
        method: 'POST',
        url: '/api/v1/unicorns',
        data: note
      })
      .success(function(data) {
        $scope.notes.push(data);
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.save = function(note) {
      $http({
        method: 'PUT',
        url: 'api/v1/unicorns/' + note._id,
        data: note
      })
      .success(function() {
        note.editing = false;
      })
      .error(function(data) {
        console.log(data);
      })
    };

    $scope.remove = function(note) {
      $http({
        method: 'DELETE',
        url: 'api/v1/unicorns/' + note._id
      })
      .success(function() {
        $scope.notes.splice($scope.notes.indexOf(note), 1);
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.editToggle = function(note) {
      if (note.editing) {
        note.unicornName = note.oldUnicornName;
        note.editing = false;
      } else {
        note.oldUnicornName = note.unicornName;
        note.editing = true;
      }
    }
  }]);
};