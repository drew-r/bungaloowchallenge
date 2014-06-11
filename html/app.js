var app = angular.module('bungaloowChallenge', ['ngResource','ngCookies', 'http-auth-interceptor', 'ui.bootstrap','ui.router']);

function RootCtrl($scope) {
	$scope.me.loggedIn = false;
}
