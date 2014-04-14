/*global angular, console, google, document*/
angular.module('poabus').controller("RootController", ["$scope", "$location", "$rootScope", '$window', function ($scope, $location, $rootScope, $window) {
    'use strict';
    
    $scope.slide = 'slide-left';
    
    $scope.$on('someEvent', function ($event, data) {
        $scope.count = data;
    });
    
    $scope.goTo = function (string) {
        $scope.slide = 'slide-left';
        $location.path(string);
    };
    $scope.back = function () {
        $scope.slide = 'slide-right';
        $window.history.back();
    };
    
}]);