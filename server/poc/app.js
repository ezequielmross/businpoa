/* global angular, console, alert */
angular.module("client", []).run(["$http", function Run($http) {
    
    $http.get("http://localhost:5000/list/bus").success(function onSuccess(data) {
        console.debug(data);
        alert('Worked!');
    }).error(function onError() {
        console.warn(arguments);
        alert('Something is wrong!');
    });
    
}]);