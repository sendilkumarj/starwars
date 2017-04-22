(function () {
    'use strict';
    angular.module('app').controller('LoginController', LoginController);
    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService', '$http', '$rootScope'];

    function LoginController($location, AuthenticationService, FlashService, $http, $rootScope) {
        var vm = this;
        vm.login = login;
        $rootScope.userLogged = false;
        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            $rootScope.userLogged = true;
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.statusText == 'OK') {
                    angular.forEach(response.data.results, function(_userObj){
                        //console.log(_userObj);

                    })


                    //AuthenticationService.SetCredentials(vm.username, vm.password);
                    $location.path('/');
                }
                else {
                    FlashService.Error(response.statusText);
                    console.log('Error', response.statusText);
                    vm.dataLoading = false;
                    $rootScope.userLogged = false
                }
            });
        };
    }
})();
