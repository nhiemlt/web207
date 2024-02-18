const quizTemplate = function ($scope, $http, $routeParams, $interval) {


    $http.get(`http://localhost:3000/Quizs/${$routeParams.id}`).then(function (response) {
        $scope.quiz = response.data;

        $scope.key = 0;
        $scope.question = $scope.quiz.data[$scope.key];

        $scope.preButton = "btn-secondary";
        $scope.nextButton = "btn-primary";

        $scope.next = function () {
            if ($scope.key < $scope.quiz.data.length - 1) {
                $scope.key++;
                $scope.key == $scope.quiz.length ? $scope.nextButton = "btn-secondary" : $scope.nextButton = "btn-primary";
                $scope.preButton = "btn-primary";
                $scope.question = $scope.quiz.data[$scope.key];
            }
        }

        $scope.pre = function () {
            if ($scope.key >= 1) {
                $scope.key--;
                $scope.key == 0 ? $scope.preButton = "btn-secondary" : $scope.preButton = "btn-primary";
                $scope.nextButton = "btn-primary";
                $scope.question = $scope.quiz.data[$scope.key];
            }
        }


    }, function (error) {

    });

    $scope.handInputChange = function (value) {
        const arrayId = value?.split("-");
        const quiz = $scope.quiz;
        $scope.quiz.data = $scope.quiz.data.map(function (item) {
            return item.id == arrayId[0] ? { ...item, value: arrayId[1] } : item;
        });
    }

    $scope.result = '';
    $scope.time = true;

    $scope.handleSubmit = function () {
        let count = 0;
        $scope?.quiz?.data?.map(function (item) {
            (item?.AnswerId == item.value) && count++;
        });
        $scope.result = `${count}/${$scope?.quiz?.data?.length}`;
        $scope.time = false;
    };

    
    $scope.retest = function () {
        $scope.key = 0;
        $scope.question = $scope.quiz.data[$scope.key];
        $scope.result = '';
        $scope.time = true;
    }

    var targetTime = new Date().getTime() + 30 * 60 * 1000;

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
        $scope.time = false;
    });

    $scope.stopCountdown = function() {
        $interval.cancel(intervalPromise);
        $scope.time = false;
    };



}

app.controller('quizTemplate', quizTemplate);