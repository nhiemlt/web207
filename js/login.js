var app = angular.module('login', []);

app.controller('login-ctrl', function ($scope, $http) {
    $scope.bl = false;
    $scope.buttonName = 'Log in';
    $scope.title = "WELCOME TO THE FOXY";
    $scope.content = "Login now !";

    $scope.status = {
        type: "password",
        icon : "fa-regular fa-eye"
    }

    $scope.changeEye = function () {
        $scope.status.type == "password" ? $scope.status.type = "text" : $scope.status.type = "password";
        $scope.status.icon == "fa-solid fa-eye-slash" ? $scope.status.icon = "fa-regular fa-eye" : $scope.status.icon = "fa-solid fa-eye-slash";
    };

    $scope.loginForm = function () {
        $scope.bl = false;
        $scope.buttonName = 'Log in';
        $scope.title = "WELCOME TO WEBSITE";
        $scope.content = "Login now !";
        $scope.username = '';
        $scope.email = '';
        $scope.password = '';
        $scope.status = {
            type: "password",
            icon : "fa-regular fa-eye"
        }
        $("#banner").animate({ left: "0px" }, "slow");
        $("#banner").css({ transform: "scaleX(-1)", backgroundImage: "url('images/login-banner2.png')" });
        $("#form").animate({ left: "60vw" }, "slow");
        $(".form-input").animate({ height: "9vh" }, "liner");
        $(".form-group>button").animate({ top: "-3.3vw" }, "liner");
        $("#form").css({ boxShadow: "-3vh 3vh 3vh rgba(0, 0, 0, 0.322)" });
        $("#form-username").animate({ top: "1.5vw" }, "liner");
        $("#form-password").animate({ top: "8vw" }, "liner");
    };

    $scope.signinForm = function () {
        $scope.bl = true;
        $scope.buttonName = 'Sign up';
        $scope.title = "CREATE AN ACCOUNT";
        $scope.content = "Let's get started !";
        $scope.username = '';
        $scope.email = '';
        $scope.password = '';    
        $scope.status = {
            type: "password",
            icon : "fa-regular fa-eye"
        }
        $("#banner").animate({ left: "25vw" }, "slow");
        $("#banner").css({ transform: "scaleX(1)", backgroundImage: "url('images/login-banner.png')" });
        $("#form").animate({ left: "10vw" }, "slow");
        $(".form-input").animate({ height: "8vh" }, "liner");
        $(".form-group>button").animate({ top: "-2.7vw" }, "liner");
        $("#form").css({ boxShadow: "3vh 3vh 3vh rgba(0, 0, 0, 0.322)" });
        $("#form-username").animate({ top: "1vw" }, "liner");
        $("#form-password").animate({ top: "11vw" }, "liner");
    };


    $scope.login = function () {
        $http.get(`http://localhost:3000/Users/${$scope.username}`).then(function (response) {
            $scope.User = response.data;
            if ($scope.User.password === $scope.password) {
                handleLogin($scope.User);
                window.location.href = "index.html";
            } else {
                alert("Login failed");
            }
        }, function(error) {
            alert("Please check your username or password !")
        }
        )
    }
    
    $scope.handleForm = function(){
        if($scope.buttonName=== 'Log in'){
            $scope.login();
        }
        else{
            $scope.signup($scope.username, $scope.email, $scope.password);
        }
    }

    $scope.signup = function (username, email, password) {
        $http.get(`http://localhost:3000/Users?username=${username}`).then(function (usernameResponse) {
            // Check if the email already exists
            $http.get(`http://localhost:3000/Users?email=${email}`).then(function (emailResponse) {
                if (username==''){
                    alert('Please enter a username');
                }
                else if (email==''){
                    alert('Please enter an email');
                }
                else if (usernameResponse.data.length > 0) {
                    alert("Username already exists, please choose another username.");
                } else if (emailResponse.data.length > 0) {
                    alert("Email already exists, please choose another email.");
                } else {
                    $http.post(`http://localhost:3000/Users`, {
                        id: username,
                        username: username,
                        email: email,
                        password: password
                    }).then(function (response) {
                        handleLogin(response.data);
                    });
                }
            });
        });
    };
    

    const handleLogin = function (user) {
        const data = {
            id: user.id,
            username: user.username,
            time: new Date()
        };

        $http.get('http://localhost:3000/Account').then(function (response) {
            if (response.data.length > 0) {
                const oldLoginDataId = response.data[0].id; 
                $http.delete(`http://localhost:3000/Account/${oldLoginDataId}`).then(function (deleteResponse) {

                    postNewLoginData(data);
                }, function (deleteError) {
                    console.error(deleteError);
                });
            } else {
                postNewLoginData(data);
            }
        }, function (error) {
            console.error(error);
        });
    };

    function postNewLoginData(data) {
        $http.post(`http://localhost:3000/Account`, data).then(function (response) {
            
        }, function (error) {
            console.error(error);
        });
    }


});