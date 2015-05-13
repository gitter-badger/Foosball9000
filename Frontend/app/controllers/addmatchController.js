"use strict";

app.controller("addmatchController",
    function ($scope, $q, $location, $routeParams, match, user) {

        $scope.playerlist = {};
        $scope.match = {};
        $scope.match.MatchResult = {};
        $scope.validationFailed = false;
        $scope.errorMessage = "";
        $scope.loading = true;
        $scope.today = new Date();

        if ($routeParams.matchId == undefined || $routeParams.matchId === "0") {
            user.getUsers().then(function (payload) {
                $scope.userList = payload;
                $scope.loading = false;
            });
        } else {
            $q.all([match.getMatch($routeParams.matchId), user.getUsers()]).then(function (payload) {
                $scope.userList = payload[1];

                var existingMatch = payload[0];
                $scope.playerlist.Player1 = existingMatch.PlayerList[0];
                $scope.playerlist.Player2 = existingMatch.PlayerList[1];
                $scope.playerlist.Player3 = existingMatch.PlayerList[2];
                $scope.playerlist.Player4 = existingMatch.PlayerList[3];

                $scope.match.MatchResult.Team1Score = existingMatch.MatchResult.Team1Score;
                $scope.match.MatchResult.Team2Score = existingMatch.MatchResult.Team2Score;
                $scope.match.StaticFormationTeam1 = existingMatch.StaticFormationTeam1;
                $scope.match.StaticFormationTeam2 = existingMatch.StaticFormationTeam2;

                $scope.today = existingMatch.TimeStampUtc;

                $scope.loading = false;
            });
        }


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