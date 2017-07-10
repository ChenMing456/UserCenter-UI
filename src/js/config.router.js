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
                    .when('/', '/account.signin')
                    .otherwise('/404');
                $stateProvider
                    .state('404', {
                        url: '/404',
                        templateUrl: 'tpl/404.html',
                    })
                    .state('access', {
                        url: '/access',
                        template: '<div ui-view class="fade-in-right-big smooth"></div>'
                    })
                    .state('access.signin', {
                        url: '/signin',
                        templateUrl: 'tpl/user/user_signin.html',
                        resolve: {
                            deps: ['uiLoad',
                                function( uiLoad ){
                                    return uiLoad.load( ['js/controllers/userSigninCtrl.js'] );
                                }]
                        }
                    })
                    .state('access.signup', {
                        url: '/signup',
                        templateUrl: 'tpl/user/user_signup.html',
                        resolve: {
                            deps: ['uiLoad',
                                function( uiLoad ){
                                    return uiLoad.load( ['js/controllers/userSignupCtrl.js'] );
                                }]
                        }
                    })
                    .state('access.forgotpwd', {
                        url: '/forgotpwd',
                        templateUrl: 'tpl/page_forgotpwd.html'
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
                    .state('account.app', {
                        url:'/app',
                        template: '<div ui-view  ></div>'
                    })
                    .state('account.app.details', {
                        url:'/:app_guid/details',
                        templateUrl: 'tpl/app/app_details.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/appDetailsCtrl.js']);
                                }]
                        }
                    })
                    .state('account.app.create', {
                        url:'/create',
                        templateUrl: 'tpl/app/app_create.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/appCreateCtrl.js']);
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
                    .state('account.instance', {
                        url:'/instance',
                        template: '<div ui-view  ></div>'
                    })
                    .state('account.instance.details', {
                        url:'/:instance_guid/details',
                        templateUrl: 'tpl/instance/instance_details.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/instanceDetailsCtrl.js']);
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
                    .state('account.resource', {
                        url:'/resource',
                        template: '<div ui-view  ></div>'
                    })
                    .state('account.resource.details', {
                        url:'/:resource_guid/details',
                        templateUrl: 'tpl/resource/resource_details.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/resourceDetailsCtrl.js']);
                                }]
                        }
                    })
                    .state('account.resource.add', {
                        url:'/add',
                        templateUrl: 'tpl/resource/resource_add.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/resourceAddCtrl.js']);
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
                    .state('account.contract', {
                        url:'/contract',
                        template: '<div ui-view  ></div>'
                    })
                    .state('account.contract.details', {
                        url:'/:contract_guid/details',
                        templateUrl: 'tpl/contract/contract_details.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/contractDetailsCtrl.js']);
                                }]
                        }
                    })
                    .state('account.contract.edit', {
                        url:'/:contract_guid/edit',
                        templateUrl: 'tpl/contract/contract_edit.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/contractEditCtrl.js']);
                                }]
                        }
                    })
                    .state('account.recharge_orders', {
                        url: '/recharge_orders',
                        templateUrl: 'tpl/account_recharge_orders.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/rechargeOrderCtrl.js']);
                                }]
                        }
                    })
                    .state('account.recharge', {
                        url: '/recharge',
                        templateUrl: 'tpl/recharge/recharge.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/rechargeCtrl.js']);
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
                    .state('account.sp_apply', {
                        url: '/sp_apply',
                        templateUrl: 'tpl/user/sp_apply.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/spApplyCtrl.js']);
                                }]
                        }
                    })
                    .state('account.app_component', {
                        url:'/app/:app_guid/component',
                        template: '<div ui-view  ></div>'
                    })
                    .state('account.app_component.add', {
                        url: '/add',
                        templateUrl: 'tpl/app/app_component_add.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/appComponentAddCtrl.js']);
                                }]
                        }
                    })
                    .state('account.app_version', {
                        url:'/app/:app_guid/version',
                        template: '<div ui-view  ></div>'
                    })
                    .state('account.app_version.add', {
                        url: '/add',
                        templateUrl: 'tpl/app/app_version_add.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/appVersionAdd.js']);
                                }]
                        }
                    })
                    .state('account.app_version.edit', {
                        url: '/edit',
                        templateUrl: 'tpl/app/app_version_edit.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/appVersionEdit.js']);
                                }]
                        }
                    })
                    .state('account.notices', {
                        url: '/notices',
                        templateUrl: 'tpl/account_notices.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/noticeCtrl.js']);
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
