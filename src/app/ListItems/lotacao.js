/*global angular, console, google, document*/

angular.module('poabus').controller("LotacaoController", ["$scope", "servicebusinpoa", function ($scope, servicebusinpoa) {
    'use strict';
    $scope.name = "";
    $scope.name = "Lotação";
    servicebusinpoa.listlotacao().then(
        function (stuff) {
            $scope.items = stuff;
        },
        function () {
            console.error('File not found!');
        }
    );
    
    
}]);