/**
 * Created by Domoke on 2017/6/26.
 */
'use strict';

angular.module('account.apps', [])
.factory('Apps', function ($resource) {

    return $resource('/apps/:guid', {guid: '@guid'});
})
.service('AppService', function ($http) {
    this.buyApp = function () {
        // 购买应用
    };
});