(function () {
    'use strict';
    angular.module('app').controller('HomeController', HomeController);
    HomeController.$inject = ['UserService', '$rootScope', '$http', '$filter'];

    function HomeController(UserService, $rootScope, $http, $filter) {
        var vm = this;
        vm.serachPlanet = serachPlanet;
        vm.user = null;
        vm.allUsers = [];
        vm.planetsDetails = [];
        $rootScope.currentUser.userLogged = true;
        //vm.deleteUser = deleteUser;
        initController();

        function initController() {
            $http.get('http://swapi.co/api/planets/').then(function (response) {
                //console.log('planets',response);
                vm.planetsDetails = response.data.results;
            }, function myError(response) {});
            loadCurrentUser();
            //loadAllUsers();
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username).then(function (user) {
                vm.user = user;
            });
        }

        function serachPlanet() {
            //console.log('seraching..');
            if (vm.planetsDetails.length) {
                vm.searchResult = $filter('filter')(vm.planetsDetails, vm.searchIn);
                console.log(vm.searchResult);
            }else{
                vm.searchResult = [];
            }
        }
        /*function loadAllUsers() {
            UserService.GetAll().then(function (users) {
                vm.allUsers = users;
            });
        }*/
        /*function deleteUser(id) {
            UserService.Delete(id).then(function () {
                loadAllUsers();
            });
        }*/
    }
})();
