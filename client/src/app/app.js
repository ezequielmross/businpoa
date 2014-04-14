/*global angular*/
angular.module('poabus', ['ngRoute', 'ngTouch', 'ngAnimate', 'pasvaz.bindonce']);

angular.module('poabus').config(['$routeProvider', function ($routeProvider) {
    'use strict';
    
    $routeProvider.when('/home', { templateUrl: 'home.html', controller: "HomeController"});
	$routeProvider.when('/bus', { templateUrl: 'listitems.html', controller: "BusController"});
	$routeProvider.when('/lotacao', { templateUrl: 'listitems.html', controller: "LotacaoController"});
	$routeProvider.when('/itinerario/:term', { templateUrl: 'itinerario.html', controller: "ItinerarioController"});
	$routeProvider.when('/map/:term', { templateUrl: 'mapa.html', controller: "MapController"});
    $routeProvider.otherwise({ redirectTo: '/home' });
}]);
