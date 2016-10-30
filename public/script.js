var app = angular.module("FloydApp", ["ngRoute"]);


app.config(function ($routeProvider) {
	$routeProvider
	.when("/", {
		templateUrl: "/templates/home.html",
		controller: "mainController"
	})
	.when("/about", {
		templateUrl: "/templates/about.html",
		controller: "mainController"
	})
	.when("/albumview/:albumId", {
		templateUrl: "/templates/albumview.html",
		controller: "mainController"
	})
	.when("/allalbums", {
		templateUrl: "/templates/seeall.html",
		controller: "mainController"
	})
	.otherwise("/", {
		templateUrl: "/templates/home.html",
		controller: "mainController"
	});
});
