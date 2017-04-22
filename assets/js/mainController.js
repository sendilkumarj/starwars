(function () {
    'use strict';
    angular.module('app').controller('mainController', mainController);
    mainController.$inject = ['$rootScope'];

    function mainController($rootScope) {
        //console.log('main controller loaded');
        var vm = this;

        $rootScope.currentUser = {
            userLogged: false
        };


    }
})();
