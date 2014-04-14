/*global angular, console, google, document*/

angular.module('poabus').controller("LotacaoController", ["$scope", "servicebusinpoa", function ($scope, servicebusinpoa) {
    'use strict';
    $scope.isbus = false;
    $scope.islotacao = true;
    
    servicebusinpoa.listlotacao().then(
        function (stuff) {
            $scope.items = stuff;
        },
        function () {
            console.error('File not found!');
        }
    );
    
    
}]);