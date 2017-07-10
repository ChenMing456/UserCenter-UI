/**
 * Created by Domoke on 2017/7/9.
 */
"use strict";

app.controller('UserSigninCtrl', ['$scope', 'i18nService', '$http', function ($scope, i18nService, $http) {

}]);

/* Controllers */
// signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state', function($scope, $http, $state) {
    $scope.user = {};
    $scope.authError = null;
    $scope.login = function() {
        $scope.authError = null;
        // Try to login
        $http.get('api/login', {email: $scope.user.email, password: $scope.user.password})
            .then(function(response) {
                if ( !response.data.user ) {
                    $scope.authError = 'Email or Password not right';
                }else{
                    $state.go('account.dashboard');
                }
            }, function(x) {
                $scope.authError = 'Server Error';
            });
    };
}])
;