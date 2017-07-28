/**
 * Created by Domoke on 2017/6/26.
 */
"use strict";

angular.module('account.instances', [])
    .factory('Instances', function ($resource) {

        return $resource('/v1/userapi/instances/:guid', {guid: '@guid'});
    })
    .service('InstanceService', function ($http) {

    });