const changePassword = function ($scope, $http, $routeParams){
    $http.get(`http://localhost:3000/Users/${$routeParams.id}`).then(function (response) {
        $scope.user = response.data;


        $scope.updatePassword = function () {
            if($scope.repeatPassword==$scope.newPassword && $scope.user.password === $scope.password) {
                $http.patch(`http://localhost:3000/Users/${$routeParams.id}`, {password: $scope.newPassword}).then(function (response) {
                    alert("Updated password successfully !!!");
                });
            }
            else {
                alert("Please enter the correct password");
            }
        }
    }, function (error) {
        
    })
}

app.controller('changePassword', changePassword);