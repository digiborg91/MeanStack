var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");


var refresh = function() {
  $http.get('/luaslist').success(function(response) {
    console.log("I got the data I requested");
    $scope.luaslist = response;
    $scope.luas_stops_english = "";
  });
};

refresh();

$scope.addStop = function() {
  console.log($scope.luas_stops_english);
  $http.post('/luaslist', $scope.luas_stops_english).success(function(response) {
    console.log(response);
    refresh();
  });
};

$scope.remove = function(id) {
  console.log(id);
  $http.delete('/luaslist/' + id).success(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  console.log(id);
  $http.get('/luaslist/' + id).success(function(response) {
    $scope.luas_stops_english = response;
  });
};  

$scope.update = function() { //function needs fixed
  console.log($scope.stop._id);
  $http.put('/luaslist/' + $scope.luas_stops_english._id, $scope.luas_stops_english).success(function(response) {
    refresh();
  })
};

$scope.deselect = function() {
  $scope.luas_stops_english = "";
}

}]);﻿