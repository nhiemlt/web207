const home = function($scope, $http){
  $scope.status = true;
    $http.get('http://localhost:3000/Account').then(function (response) {
    $scope.acc = response.data;
    $scope.acc.length > 0 ? $scope.status = true : $scope.status = false;

  }, function (error) {

  })
}

app.controller('home', home);