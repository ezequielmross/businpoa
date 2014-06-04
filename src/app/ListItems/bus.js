/*global angular, console, google, document*/

angular.module('poabus').controller("BusController", ["$scope", "servicebusinpoa", "$location", "$filter", function ($scope, servicebusinpoa, $location, $filter) {
    'use strict';
    
    $scope.$watch("items", function (newvalue, oldvalue) {
        var filtro = $filter('filter')($scope.items, 'true');
        
        if (oldvalue != null) {
            $scope.$emit('someEvent', filtro.length);
        }
    }, true);
    
    servicebusinpoa.listbus().then(
        function (stuff) {
            $scope.items = stuff;
        },
        function () {
            console.error('File not found!');
        }
    );
}]);