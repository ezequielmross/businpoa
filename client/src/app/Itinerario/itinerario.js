/*global angular, console, google, document*/

angular.module('poabus').controller("ItinerarioController", ["$scope", "servicebusinpoa", "$routeParams", function ($scope, servicebusinpoa, $routeParams) {
    'use strict';
    $scope.map = "/map/" + $routeParams.term;
    servicebusinpoa.itinerario($routeParams.term).then(
        function (stuff) {
            $scope.items = stuff;
            console.log(stuff);
        },
        function () {
            console.error('File not found!');
        }
    );
    
}]);