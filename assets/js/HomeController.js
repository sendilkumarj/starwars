(function () {
    'use strict';
    angular.module('app').controller('HomeController', HomeController);
    HomeController.$inject = ['UserService', '$rootScope', '$http', '$filter'];

    function HomeController(UserService, $rootScope, $http, $filter) {
        var vm = this;
        vm.serachPlanet = serachPlanet;
        vm.actualPop = actualPop;
        //vm.sortNumber = sortNumber;
        vm.population = [];
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
                angular.forEach(vm.planetsDetails, function (_pla) {
                    if (_pla.population != 'unknown') {
                        vm.population.push(parseInt(_pla.population));
                    }
                })
                vm.population.sort(sortNumber);
                // console.log(vm.population.max());
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
            if (vm.planetsDetails.length && vm.searchIn != '') {
                vm.searchResult = $filter('filter')(vm.planetsDetails, vm.searchIn);
                //console.log(vm.searchResult);
            }
            else {
                vm.searchResult = null;
            }
        }

        function sortNumber(a, b) {
            return a - b;
        }
        Array.prototype.max = function () {
            return Math.max.apply(null, this);
        };

        function actualPop(val) {
            //console.log(val);
            var percent = '';
            if (val != 'unknown') {
                 percent = parseInt(val)/vm.population.max() * 10 +'em';

            }else{
                percent = 0+'em';
            }
            console.log('percent', percent);
            return percent;
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
