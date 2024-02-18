const app = angular.module("app", ["ngRoute"]);

const config = function($routeProvider){
  $routeProvider
  .when("/", {
    templateUrl: "views/home.html",
    controller: "home"
  })
  .when("/account", {
    templateUrl: "views/account.html",
    controller: "account"
  })
  .when("/change-password/:id",{
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

app.config(config);