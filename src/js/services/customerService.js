/**
 * Created by Domoke on 2017/6/26.
 */
"use strict";

angular.module('account.customers', [])
    .factory('Customers', function ($resource) {

        return $resource('/customers/:guid', {guid: '@guid'});
    })
    .service('CustomerService', function ($http) {

    });