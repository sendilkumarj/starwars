(function () {
    'use strict';
    angular.module('app').controller('LoginController', LoginController);
    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService', '$http'];

    function LoginController($location, AuthenticationService, FlashService, $http) {
        var vm = this;
        vm.login = login;
        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
           vm.dataLoading = true;
            $http({
                method: 'GET'
                , url: 'https://swapi.co/api/people/1/'
                , crossDomain: true
                , contentType: "application/json; charset=utf-8"
            }).then(function (response) {
                //callback(response);
                console.log('response', response);
            });
            /*AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    $location.path('/');
                }
                else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });*/
        };
    }
})();
