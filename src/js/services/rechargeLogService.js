/**
 * Created by Domoke on 2017/6/26.
 */
"use strict";

angular.module('account.recharge_logs', [])
    .factory('RechargeLogs', function ($resource) {

        return $resource('/v1/userapi/recharge_logs/:guid', {guid: '@guid'});
    })
    .service('RechargeLogService', function ($http) {

    });