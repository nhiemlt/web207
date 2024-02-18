
const account = function ($scope, $http) {
  $http.get('http://localhost:3000/Account').then(function (response) {
    $scope.acc = response.data;

    if ($scope.acc.length > 0) {
      $http.get(`http://localhost:3000/Users/${$scope.acc[0].id}`).then(function (response) {
        $scope.user = response.data;

        $scope.birthday = new Date($scope.user.birthday);

        $scope.updateAccount = function () {
          const data = {
            username: $scope.user.username,
            email: $scope.user.email,
            fullname: $scope.user.fullname,
            birthday: $scope.birthday,
            gender: $scope.user.gender,
            password: $scope.user.password
          };
          
          $http.put(`http://localhost:3000/Users/${$scope.user.id}`, data)
            .then(function (response) {
              
            })
            .catch(function (error) {
              console.error(error);
            });
        }

      }),
        function (error) { };
    }


  }, function (error) {

  })

}


app.controller('account', account);