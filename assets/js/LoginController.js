(function () {
    'use strict';
    angular.module('app').controller('LoginController', LoginController);
    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService', '$http', '$rootScope'];

    function LoginController($location, AuthenticationService, FlashService, $http, $rootScope) {
        var vm = this;
        vm.login = login;
        $rootScope.currentUser = {
            userLogged: false
        };
        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.statusText == 'OK') {
                    vm.dataLoading = false;
                    angular.forEach(response.data.results, function (_userObj) {
                        //console.log(_userObj);
                        if (vm.username == _userObj.name && vm.password === _userObj.birth_year) {

                            AuthenticationService.SetCredentials(vm.username, vm.password);
                            $location.path('/');
                            return;
                        }
                        else {
                            FlashService.Error('Username or password is incorrect', false);
                            $rootScope.currentUser.userLogged = false;
                        }
                    })
                }
                else {
                    FlashService.Error(response.statusText, false);
                    console.log('Error', response.statusText);
                    vm.dataLoading = false;
                    $rootScope.currentUser.userLogged = false;
                }
            });
        };
    }
})();
