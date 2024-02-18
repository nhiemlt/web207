const home = function($scope, $http){
    $scope.subjects = [];

  $http.get(`http://localhost:3000/Subjects`).then(function (response) {
    $scope.subjects = response.data;
  }, function (error) {
    
  });
}

app.controller('home', home);