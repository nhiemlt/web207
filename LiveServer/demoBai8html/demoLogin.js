const app = angular.module('app', []);

const ctrl = function ($scope, $http) {

    $scope.login = async function () {
        try {
            const userData = await $http.get(`http://localhost:3000/Users/${$scope.username}`);
            if (userData.data.password == $scope.password) {
                alert("Đăng nhập thành công!");
            } else {
                alert("Đăng nhập thất bại!");
            }
        } catch (error) {
            alert("Tên đăng nhập không hợp lệ");
        }
    }
}


app.controller('ctrl', ctrl);