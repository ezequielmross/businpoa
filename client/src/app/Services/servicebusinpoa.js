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
		return send('http://10.51.100.33:5000/list/bus');
	};
	
	this.listlotacao = function () {
		return send('http://10.51.100.33:5000/list/lotacao');
	};
	
	this.itinerario = function (id) {
		return send('http://10.51.100.33:5000/itinerario/' + id);
	};
	
}]);




