/**
 * Created by Domoke on 2017/6/26.
 */
'use strict';

angular.module('account.apps', [])
.factory('Apps', function ($resource) {

    return $resource('/v1/userapi/apps/:guid', {guid: '@guid'});
})
.service('AppService', function ($http) {
    this.buyApp = function () {
        // 购买应用
    };
})
.factory('Components',function ($resource) {
    return $resource('/v1/userapi/components/:guid',{guid: '@guid'});
})
.service('Componets',function ($http) {

})
;