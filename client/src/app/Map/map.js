/*global angular, console, google, document*/

angular.module('poabus').controller("MapController", ["$scope", "servicebusinpoa", "$routeParams", function ($scope, servicebusinpoa, $routeParams) {
    'use strict';
    
    
    //Criando mapa
    var map, cordinates = [];
    
    function initialize() {
        var latlng = new google.maps.LatLng(-30.044876, -51.1835),
            options = {
                zoom: 13,
                center: latlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
        
        map = new google.maps.Map(document.getElementById("mapa"), options);
    }
    
    initialize();
    //populando mapa
    servicebusinpoa.itinerario($routeParams.term).then(
        function (stuff) {
            var i,
                rota;
            angular.forEach(stuff, function (item) {
                if(item.lat != null){
                    cordinates.push(new google.maps.LatLng(item.lat, item.lng));
                }
            });
            
            rota = new google.maps.Polyline({
                path: cordinates,
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2
            });
            
            rota.setMap(map);
            
        },
        function () {
            console.error('File not found!');
        }
    );
}]);