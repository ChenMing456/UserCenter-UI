/**
 * Created by Domoke on 2017/6/26.
 */
"use strict";

angular.module('account.resources', [])
    .factory('Resources', function ($resource) {

        return $resource('/resources/:guid', {guid: '@guid'});
    })
    .service('ResourceService', function ($http) {

    });