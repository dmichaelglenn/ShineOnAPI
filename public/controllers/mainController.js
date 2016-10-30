var app = angular.module("FloydApp");

app.controller("mainController", ["$scope", "$http", "$location", "$routeParams", function($scope, $http, $location, $routeParams) {
    $scope.allAlbums = [];
    $scope.albumData = {
        wikiUrl: "whats.com",
        name: "The Wall"
    };

    var baseUrl = "http://localhost:8080/albums";

    $scope.getAlbums = function() {
        $http.get(baseUrl)
            .then(function(response) {
                $scope.allAlbums = response.data;
            });
    };

    $scope.goToAlbum = function(){
        $location.url('/albumview/' + $scope.selectedAlbum);
    };

    $scope.go = function(selectedAlbum) {
        console.log(selectedAlbum);
        $http.get(baseUrl + "/" + selectedAlbum)
            .then(function(response) {
                $scope.albumData = response.data;
                $scope.test = "Can you see this?";
                console.log($scope.albumData);
            });
        console.log("This will run first", $scope.albumData);
    };

    console.log($routeParams);
    if($routeParams.albumId){
        $scope.go($routeParams.albumId);
    }

    $scope.getAlbums();
}]);
