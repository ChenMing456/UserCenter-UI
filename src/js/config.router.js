'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .run(
        ['$rootScope', '$state', '$stateParams',
            function ($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]
    )
    .config(
        ['$stateProvider', '$urlRouterProvider', 'JQ_CONFIG',
            function ($stateProvider, $urlRouterProvider, JQ_CONFIG) {
                var version = localStorage.getItem('app_version');
                $urlRouterProvider
                    .when('', '/account.dashboard')
                    .otherwise('/404');
                $stateProvider
                    .state('404', {
                        url: '/404',
                        templateUrl: 'tpl/404.html',
                    })
                    .state('account', {
                        abstract: true,
                        url: '/account',
                        templateUrl: 'tpl/account.html?v=' + version,
                    })
                    .state('account.dashboard', {
                        url: '/dashboard',
                        templateUrl: 'tpl/account_dashboard.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/dashboardCtrl.js']);
                                }]
                        }
                    })
                    .state('account.apps', {
                        url: '/apps',
                        templateUrl: 'tpl/account_apps.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/appCtrl.js']);
                                }]
                        }
                    })
                    .state('account.app_add', {
                        url:'/app_add',
                        templateUrl: 'tpl/app/app_add.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('w5c.validator').then(
                                        function(){
                                            return $ocLazyLoad.load(['js/controllers/appCtrl.js']);
                                        }
                                    );
                                }]
                        }
                    })
                    .state('account.instances', {
                        url: '/instances',
                        templateUrl: 'tpl/account_instances.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/instanceCtrl.js']);
                                }]
                        }
                    })
                    .state('account.resources', {
                        url: '/resources',
                        templateUrl: 'tpl/account_resources.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/resourceCtrl.js']);
                                }]
                        }
                    })
                    .state('account.customers', {
                        url: '/customers',
                        templateUrl: 'tpl/account_customers.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/customerCtrl.js']);
                                }]
                        }
                    })
                    .state('account.contracts', {
                        url: '/contracts',
                        templateUrl: 'tpl/account_contracts.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/contractCtrl.js']);
                                }]
                        }
                    })
                    .state('account.recharge_logs', {
                        url: '/recharge_logs',
                        templateUrl: 'tpl/account_recharge_logs.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/rechargeLogCtrl.js']);
                                }]
                        }
                    })
                    .state('account.alarms', {
                        url: '/alarms',
                        templateUrl: 'tpl/account_alarms.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/alarmCtrl.js']);
                                }]
                        }
                    })
                    .state('account.user_logs', {
                        url: '/user_logs',
                        templateUrl: 'tpl/account_user_logs.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/userLogCtrl.js']);
                                }]
                        }
                    })
                    .state('account.example', {
                        url: '/example',
                        template: '<div ui-view></div>'
                    })
                    .state('account.example.form_valid', {
                        url: '/form_valid',
                        templateUrl: 'tpl/example/form_valid.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad){
                                    return $ocLazyLoad.load(['js/controllers/exampleCtrl.js']);
                                }]
                        }
                    })
            }
        ]
    );
