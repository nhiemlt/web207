const course = function ($scope, $http) {
    $scope.subjects = [];

    $http.get(`http://localhost:3000/Subjects`).then(function (response) {
        $scope.subjects = response.data;

        $scope.courses = [1];
        let k = 0;
        for (let i = 0; i < $scope.subjects.length; i++) {
            if (i != 0 && i % 8 == 0) {
                k++;
            }
            else if (i == $scope.subjects.length) {
                k++;
            }
            $scope.courses[k] = k + 1;
        }

        $scope.start = 0;
        $scope.end = $scope.subjects.length > 8 ? 8 : $scope.subjects.length;

        $scope.ind = 0;

        const updateInd = function (index) {
            $scope.ind = index;
            console.log($scope.ind);
        }

        $scope.next = function () {
            if ($scope.start < $scope.subjects.length - 8) {
                $scope.start += 8;
                $scope.end += 8;
                updateInd($scope.ind + 1);

            }
        }
        $scope.prev = function () {
            if ($scope.start > 0) {
                $scope.start -= 8;
                $scope.end -= 8;
                updateInd($scope.ind - 1)
            }
        }

        $scope.numberClick = function (number) {
            $scope.start = number * 8;
            $scope.end = number * 8 + 8;
            updateInd(number);
        }

        $scope.subjectTemplate = {
            id: 'Subject ID',
            Name: "Subject Name",
            Logo: "1.png"
        };

        $scope.quizTemplate = {};

        $scope.subjectClick = function (subject) {
            $scope.subjectTemplate = subject;
            $http.get(`http://localhost:3000/Quizs/`+$scope.subjectTemplate.id).then(function (response) {
                $scope.quizTemplate = response.data;
            }, function (error) {
        
            });
        }

    }, function (error) {

    });
}

app.controller('course', course);