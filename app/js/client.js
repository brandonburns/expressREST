'use strict';

require('angular/angular');

var unicornsApp = angular.module('unicornsApp', []);

require('./notes/controllers/unicorns_controller')(unicornsApp);