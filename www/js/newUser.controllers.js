(function () {
    'use strict';

    angular
        .module('newUser')
        .controller('newUserController', newUserController);

    newUserController.$inject = ['$state', 'userService'];
    function newUserController($state, userService) {
        var newUserVm = this;

        newUserVm.user = {
            "username": '',
            "password": '',
            "email": '',
            "phoneNum": '',
            "teamname": '',
            'league': '',
            "prediction": ''
        }
        newUserVm.message = '';
        newUserVm.clear = clear;
        newUserVm.submitNewUser = submitNewUser;
        newUserVm.backToLogin = backToLogin;

        function clear() {
            newUserVm.user.username = '',
            newUserVm.user.password = '',
            newUserVm.user.phoneNum = '',
            newUserVm.user.email = ''
        }

        function submitNewUser() {

             userService
                .createUser(newUserVm.user)
                .then(function (response) {
                    newUserVm.message = response.message;
                    if (newUserVm.message == "Success!") {
                        newUserVm.clear();
                        $state.transitionTo("login");
                    }
                    else {
                        newUserVm.clear();
                    }
                })
        }

        function backToLogin() {
            $state.transitionTo("login");
        }
    }
})();