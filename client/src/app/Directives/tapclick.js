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