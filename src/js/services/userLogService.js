/**
 * Created by Domoke on 2017/6/26.
 */
"use strict";

angular.module('account.user_logs', [])
    .factory('UserLogs', function ($resource) {

        return $resource('/v1/userapi/user_logs/:guid', {guid: '@guid'});
    })
    .service('UserLogService', function ($http) {

    });