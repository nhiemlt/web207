const app = angular.module("app", ["ngRoute"]);

const config = function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "views/home.html",
      controller: "home"
    })
    .when("/account", {
      templateUrl: "views/account.html",
      controller: "account"
    })
    .when("/change-password/:id", {
      templateUrl: "views/change-password.html",
      controller: "changePassword"
    })
    .when("/contact", {
      templateUrl: "views/contact.html",
      controller: "contact"
    })
    .when("/course", {
      templateUrl: "views/course.html",
      controller: "course"
    })
    .when("/feedback", {
      templateUrl: "views/feedback.html",
      controller: "feedback"
    })
    .when("/introduce", {
      templateUrl: "views/introduce.html",
      controller: "introduce"
    })
    .when("/quiz-template/:id", {
      templateUrl: "views/quiz-template.html",
      controller: "quizTemplate"
    })
    .otherwise({
      templateUrl: "views/home.html",
      controller: "home"
    });
};

app.controller("ctrl", function ($scope, $http) {
  
  $scope.page = ['active', '', '', '', '']

  $scope.pageClick = function(ind){
    for (var i = 0; i < $scope.page.length; i++){
      if ( i!=ind){
        $scope.page[i] = '';
      }
      else {
        $scope.page[i] = 'active';
      }
    }
  }


  $http.get('http://localhost:3000/Account').then(function (response) {
    $scope.acc = response.data;
    $scope.acc.length > 0 ? $scope.status = true : $scope.status = false;
    if ($scope.status) {
      $scope.logOut = function () {
        $http.delete(`http://localhost:3000/Account/${$scope.acc[0].id}`).then(function (deleteResponse) {
        }, function (deleteError) { });
      }
    }
  }, function (error) {

  })

})

const getUser = function () {

}

app.config(config);