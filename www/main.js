/*global angular*/
angular.module('poabus', ['ngRoute', 'ngTouch', 'ngAnimate', 'pasvaz.bindonce']);

angular.module('poabus').config(['$routeProvider', function ($routeProvider) {
    'use strict';
    
    $routeProvider.when('/home', { templateUrl: 'home.html', controller: "HomeController"});
	$routeProvider.when('/bus', { templateUrl: 'listitems.html', controller: "BusController"});
	$routeProvider.when('/lotacao', { templateUrl: 'listitems.html', controller: "LotacaoController"});
	$routeProvider.when('/itinerario/:term', { templateUrl: 'itinerario.html', controller: "ItinerarioController"});
	$routeProvider.when('/map/:term', { templateUrl: 'map.html', controller: "MapController"});
    $routeProvider.otherwise({ redirectTo: '/home' });
}]);

/*global angular,google */

angular.module("poabus").directive('tap', function () {
    'use strict';
	return function (scope, element, attrs) {
		var tapping = false;
		element.bind('touchstart', function (e) {
			tapping = true;
		});
		element.bind('touchmove', function (e) {
			tapping = false;
		});
		element.bind('touchend', function (e) {
			if (tapping) {
				scope.$apply(attrs['tap'], element);
			}
		});
	};
});
/*global angular,google */

angular.module("poabus").directive("tapclick", function () {
    'use strict';
	return function (scope, elm, attrs) {

		elm.addClass("animated");


		elm.bind("click", function () {
			if (elm.hasClass("expanded")) {
				elm.removeClass("expanded");
			} else {
				elm.addClass("expanded");
			}

		});


	};

});
/*global angular, console, google, document*/

angular.module('poabus').controller("HomeController", ["$scope", function ($scope) {
    'use strict';
}]);
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
/*global angular, console, google, document*/

angular.module('poabus').controller("LotacaoController", ["$scope", "servicebusinpoa", function ($scope, servicebusinpoa) {
    'use strict';
    
    servicebusinpoa.listlotacao().then(
        function (stuff) {
            $scope.items = stuff;
        },
        function () {
            console.error('File not found!');
        }
    );
    
    
}]);
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
/*global angular,console,alert,google,document,localStorage*/

angular.module('poabus').service('servicebusinpoa', ["$http", "$q", function ($http, $q) {
	'use strict';
	var p,
		
		send = function (url) {
			p = $q.defer();
			if (localStorage.getItem(url) != null) {
				p.resolve(JSON.parse(localStorage.getItem(url)));
			} else {
				$http.get(url).success(
					function (dados) {
						p.resolve(dados);
						localStorage.setItem(url, JSON.stringify(dados));
					}
					
				).error(
					
					function (error) {
						alert("error:" + error);
						p.reject();
					}
					
				);
			}
			return p.promise;
		};
	
	this.listbus = function () {
		return send('http://businpoa.herokuapp.com/list/bus');
	};
	
	this.listlotacao = function () {
		return send('http://businpoa.herokuapp.com/list/lotacao');
	};
	
	this.itinerario = function (id) {
		return send('http://businpoa.herokuapp.com/itinerario/' + id);
	};
	
}]);




