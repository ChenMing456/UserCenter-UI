/**
 * Created by Domoke on 2017/6/26.
 */
"use strict";

angular.module('account.contracts', [])
    .factory('Contracts', function ($resource) {

        return $resource('/v1/userapi/contracts/:guid/:', {guid: '@guid'});
    })
    .service('ContractService', function ($http) {

    });