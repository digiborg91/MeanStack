var myApp = angular.module('myApp', ['ui.bootstrap']);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World controller");

    $scope.currentPage = 1;
    $scope.pageSize = 5;


var refresh = function() {
  $http.get('/luaslist').success(function(response) {
    console.log("Data Requested");
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
  console.log($scope.luas_stops_english._id);  //Function fixed. replaced ($scope.stop._id) with ($scope.luas_stops_english._id);  
  $http.put('/luaslist/' + $scope.luas_stops_english._id, $scope.luas_stops_english).success(function(response) {
    refresh();
  })
};

$scope.deselect = function() {
  $scope.luas_stops_english = "";
}

// .filter('pagination', function()   {
//      return function(luaslist, start) {
//        return luaslist.slice(start);       MOVE TO A CONFIG FILE OR AT THE VERY BOTTON OF FILE 
//     }

//   });

}])﻿

.filter('pagination', function()   {
     return function(luaslist, start) {
       return luaslist.slice(start);
    }

  });