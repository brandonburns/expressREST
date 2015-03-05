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
    expect(Array.isArray($scope.notes)).toBe(true);
  });

  describe('REST requests', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectations();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should have a getAll function', function() {
      $httpBackend.expectGET('/api/v1/unicorns').respond(200, [{unicornName: 'test note'}]);

      var notesController = $ControllerConstructor('notesController', {$scope: $scope});
      $scope.getAll();
      $httpBackend.flush();

      expect($scope.notes[0].unicornName).toBe('test note');
    });
  });
});