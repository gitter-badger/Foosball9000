"use strict";

app.controller("addmatchController",
    function ($scope, $q, $location, $routeParams, match, user) {

        $scope.playerlist = {};
        $scope.match = {};
        $scope.match.MatchResult = {};
        $scope.validationFailed = false;
        $scope.errorMessage = "";
        $scope.loading = true;
        var d = new Date();
        $scope.today = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds());
        
        user.getUsers().then(function (payload) {
            $scope.userList = payload;
            $scope.loading = false;
        }).then(function (payload) {
            if ($routeParams.matchId !== 0) {
                match.getMatch($routeParams.matchId).then(function (m) {
                    $scope.playerlist.Player1 = m.PlayerList[0];
                    $scope.playerlist.Player2 = m.PlayerList[1];
                    $scope.playerlist.Player3 = m.PlayerList[2];
                    $scope.playerlist.Player4 = m.PlayerList[3];

                    $scope.match.Id = m.Id;
                    var gameTime = new Date(m.TimeStampUtc);
                    $scope.today = new Date(gameTime.getFullYear(), gameTime.getMonth(), gameTime.getDate(), gameTime.getHours(), gameTime.getMinutes(), gameTime.getSeconds());
                    
                    $scope.match.StaticFormationTeam1 = m.StaticFormationTeam1;
                    $scope.match.StaticFormationTeam2 = m.StaticFormationTeam2;
                    $scope.match.MatchResult.Team1Score = m.MatchResult.Team1Score;
                    $scope.match.MatchResult.Team2Score = m.MatchResult.Team2Score;
                });
            }
        });


        $scope.submit = function() {
            $scope.match.PlayerList = [];
            $scope.match.PlayerList.push($scope.playerlist.Player1);
            $scope.match.PlayerList.push($scope.playerlist.Player2);
            $scope.match.PlayerList.push($scope.playerlist.Player3);
            $scope.match.PlayerList.push($scope.playerlist.Player4);

            var validationResult = match.validateMatch($scope.match);
            if (validationResult.validated) {
                $scope.validationFailed = false;
                $scope.loading = true;
                $scope.match.TimeStampUtc = $scope.today;

                var addMatchPromise = match.addMatch($scope.match);

                addMatchPromise.then(function () {
                    $scope.loading = false;
                    console.log($scope.match);
                    $location.path("leaderboard");
                }, function () {
                    $scope.loading = false;
                    $scope.errorMessage = "Request failed ";
                    $scope.validationFailed = true;
                });
                
            } else {
                $scope.validationFailed = true;
                $scope.errorMessage = validationResult.errorMessage;
            }
        };
    });