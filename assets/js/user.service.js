(function () {
    'use strict';
    angular.module('app').factory('UserService', UserService);
    UserService.$inject = ['$timeout', '$filter', '$q'];

    function UserService($timeout, $filter, $q) {
        var service = {};
        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Delete = Delete;
        return service;

        function GetAll() {
            var deferred = $q.defer();
            deferred.resolve(getUsers());
            return deferred.promise;
        }

        function GetById(id) {
            var deferred = $q.defer();
            var filtered = $filter('filter')(getUsers(), {
                id: id
            });
            var user = filtered.length ? filtered[0] : null;
            deferred.resolve(user);
            return deferred.promise;
        }

        function GetByUsername(username) {
            var deferred = $q.defer();
            var filtered = $filter('filter')(getUsers(), {
                username: username
            });
            var user = filtered.length ? filtered[0] : null;
            deferred.resolve(user);
            return deferred.promise;
        }



        function Delete(id) {
            var deferred = $q.defer();
            var users = getUsers();
            for (var i = 0; i < users.length; i++) {
                var user = users[i];
                if (user.id === id) {
                    users.splice(i, 1);
                    break;
                }
            }
            setUsers(users);
            deferred.resolve();
            return deferred.promise;
        }
        // private functions
        function getUsers() {
            if (!localStorage.users) {
                localStorage.users = JSON.stringify([]);
            }
            return JSON.parse(localStorage.users);
        }

        function setUsers(users) {
            localStorage.users = JSON.stringify(users);
        }
    }
})();
