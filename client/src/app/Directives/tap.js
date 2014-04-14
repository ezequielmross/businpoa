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