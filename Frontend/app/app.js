﻿var app = angular.module('Foosball', [
    'ngRoute',
    'leaderboardService'])
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
          templateUrl: 'views/home.html',
          controller: 'homeController'
      })
      .when('/leaderboard', {
          templateUrl: 'views/leaderboard.html',
          controller: 'leaderboardController'
      })
      .otherwise({
          redirectTo: '/404.png'
      });
}])
.controller('mainController', function ($scope) {
    $scope.message = "Main Content";
});;