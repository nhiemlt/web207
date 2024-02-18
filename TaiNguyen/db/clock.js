var app = angular.module('quiz', []);

app.controller('quizBox', function ($scope, $interval) {
    var targetTime = new Date().getTime() + 10 * 60 * 1000;

    function updateCountdown() {
        var currentTime = new Date().getTime();
        var timeDifference = targetTime - currentTime;

        $scope.minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        $scope.seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        if (timeDifference <= 0) {
            $scope.minutes = 0;
            $scope.seconds = 0;
            $interval.cancel(intervalPromise); 
        }
    }

    var intervalPromise = $interval(updateCountdown, 1000);

    updateCountdown();

    $scope.$on('$destroy', function () {
        $interval.cancel(intervalPromise);
    });

    $scope.number = 1;
    $scope.preButton = "btn-secondary";
    $scope.nextButton = "btn-primary";

    $scope.next = function () {
        
        if ($scope.number <10 ){
            $scope.number++;
            $scope.number == 10 ? $scope.nextButton = "btn-secondary" : $scope.nextButton = "btn-primary"; 
            $scope.preButton = "btn-primary";
        }
    }

    $scope.pre = function () {
        if ($scope.number >1 ){
            $scope.number--;
            $scope.number == 1? $scope.preButton = "btn-secondary" : $scope.preButton = "btn-primary";
            $scope.nextButton = "btn-primary";
        }
    }
});

