'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('notes controller', function() {
  var $ControllerConstructor;
  var $httpBackend;
  var $scope;

  beforeEach(angular.mock.module('notesApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    var notesController = $ControllerConstructor('notesController', {$scope: $scope});
    expect(typeof notesController).toBe('object');
    expect(Array.isArray($scope.unicorns)).toBe(true);
  });

  describe('REST requests', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should have a getAll function', function() {
      $httpBackend.expectGET('/api/v1/unicorns').respond(200, [{unicornName: 'jim'}]);

      var notesController = $ControllerConstructor('notesController', {$scope: $scope});
      $scope.getAll();
      $httpBackend.flush();

      expect($scope.unicorns[0].unicornName).toBe('jim');
    });

    it('should be able to create new unicorn', function() {
      $httpBackend.expectPOST('/api/v1/unicorns').respond(200, {_id: 1, unicornName: 'bob'});

      var notesController = $ControllerConstructor('notesController', {$scope: $scope});
      $scope.create({unicornName: 'bob'});
      $httpBackend.flush();

      expect($scope.unicorns[0]._id).toBe(1);
    });

    it('should be able to save unicorns', function() {
      $httpBackend.expectPUT('/api/v1/unicorns/1').respond(200);

      $ControllerConstructor('notesController', {$scope: $scope});
      var unicorn = {unicornName: 'dude', _id: 1, editing: true};
      $scope.save(unicorn);
      $httpBackend.flush();

      expect(unicorn.editing).toBe(false);
    });

    it('should be able to delete a unicorn', function() {
      $httpBackend.expectDELETE('api/v1/unicorns/1').respond(200);

      $ControllerConstructor('notesController', {$scope: $scope});
      var unicorn = {unicornName: 'dude man', _id: 1, editing: true};
      $scope.unicorns.push(unicorn);
      $scope.remove(unicorn);
      $httpBackend.flush();

      expect($scope.unicorns.length).toBe(0);
    });
  });
});