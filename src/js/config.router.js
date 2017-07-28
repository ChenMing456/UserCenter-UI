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
                    .when('', '/access/signin')
                    .otherwise('/404');
                $stateProvider
                    .state('404', {
                        url: '/404',
                        templateUrl: 'tpl/404.html?v=' + version,
                    })
                    .state('access', {
                        url: '/access',
                        template: '<div ui-view class="fade-in-right-big smooth"></div>'
                    })
                    .state('access.signin', {
                        url: '/signin',
                        templateUrl: 'tpl/user/user_signin.html?v=' + version,
                        resolve: {
                            deps: ['uiLoad',
                                function( uiLoad ){
                                    return uiLoad.load( ['js/controllers/userSigninCtrl.js?v=' + version] );
                                }]
                        }
                    })
                    .state('access.signup', {
                        url: '/signup',
                        templateUrl: 'tpl/user/user_signup.html?v=' + version,
                        resolve: {
                            deps: ['uiLoad',
                                function( uiLoad ){
                                    return uiLoad.load( ['js/controllers/userSignupCtrl.js?v=' + version] );
                                }]
                        }
                    })
                    .state('access.forgotpwd', {
                        url: '/forgotpwd',
                        templateUrl: 'tpl/page_forgotpwd.html?v=' + version
                    })
                    .state('account', {
                        abstract: true,
                        url: '/account',
                        templateUrl: 'tpl/account.html?v=' + version,
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function( $ocLazyLoad){
                                    return $ocLazyLoad.load('toaster').then(
                                        function(){
                                            return $ocLazyLoad.load(['js/controllers/indexCtrl.js?v=' + version]);
                                        }
                                    );
                                }]
                        }
                    })
                    .state('account.dashboard', {
                        url: '/dashboard',
                        templateUrl: 'tpl/account_dashboard.html?v=' + version,
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/dashboardCtrl.js?v=' + version]);
                                }]
                        }
                    })
                    .state('account.apps', {
                        url: '/apps',
                        templateUrl: 'tpl/account_apps.html?v=' + version,
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/appCtrl.js?v=' + version]);
                                }]
                        }
                    })
                    .state('account.app', {
                        url:'/app',
                        template: '<div ui-view  ></div>'
                    })
                    .state('account.app.details', {
                        url:'/:app_guid/details',
                        templateUrl: 'tpl/app/app_details.html?v=' + version,
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/appDetailsCtrl.js?v=' + version]);
                                }]
                        }
                    })
                    .state('account.app.create', {
                        url:'/create',
                        templateUrl: 'tpl/app/app_create.html?v=' + version,
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/appCreateCtrl.js?v=' + version]);
                                }]
                        }
                    })
                    .state('account.instances', {
                        url: '/instances',
                        templateUrl: 'tpl/account_instances.html?v=' + version,
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/instanceCtrl.js?v=' + version]);
                                }]
                        }
                    })
                    .state('account.instance', {
                        url:'/instance',
                        template: '<div ui-view  ></div>'
                    })
                    .state('account.instance.details', {
                        url:'/:instance_guid/details',
                        templateUrl: 'tpl/instance/instance_details.html?v=' + version,
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/instanceDetailsCtrl.js?v=' + version]);
                                }]
                        }
                    })
                    .state('account.resources', {
                        url: '/resources',
                        templateUrl: 'tpl/account_resources.html?v=' + version,
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/resourceCtrl.js?v=' + version]);
                                }]
                        }
                    })
                    .state('account.resource', {
                        url:'/resource',
                        template: '<div ui-view  ></div>'
                    })
                    .state('account.resource.details', {
                        url:'/:resource_guid/details',
                        templateUrl: 'tpl/resource/resource_details.html?v=' + version,
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/resourceDetailsCtrl.js?v=' + version]);
                                }]
                        }
                    })
                    .state('account.resource.add', {
                        url:'/add',
                        templateUrl: 'tpl/resource/resource_add.html?v=' + version,
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/resourceAddCtrl.js?v=' + version]);
                                }]
                        }
                    })
                    .state('account.customers', {
                        url: '/customers',
                        templateUrl: 'tpl/account_customers.html?v=' + version,
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/customerCtrl.js?v=' + version]);
                                }]
                        }
                    })
                    .state('account.contracts', {
                        url: '/contracts',
                        templateUrl: 'tpl/account_contracts.html?v=' + version,
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/contractCtrl.js?v=' + version]);
                                }]
                        }
                    })
                    .state('account.contract', {
                        url:'/contract',
                        template: '<div ui-view  ></div>'
                    })
                    .state('account.contract.details', {
                        url:'/:contract_guid/details',
                        templateUrl: 'tpl/contract/contract_details.html?v=' + version,
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('pdf').then(
                                        function(){
                                            return $ocLazyLoad.load(['js/controllers/contractDetailsCtrl.js?v=' + version]);
                                        }
                                    );
                                }]
                        }
                    })
                    .state('account.contract.edit', {
                        url:'/:contract_guid/edit',
                        templateUrl: 'tpl/contract/contract_edit.html?v=' + version,
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('pdf').then(
                                        function(){
                                            return $ocLazyLoad.load(['js/controllers/contractEditCtrl.js?v=' + version]);
                                        }
                                    );
                                }]
                        }
                    })
                    .state('account.recharge_orders', {
                        url: '/recharge_orders',
                        templateUrl: 'tpl/account_recharge_orders.html?v=' + version,
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/rechargeOrderCtrl.js?v=' + version]);
                                }]
                        }
                    })
                    .state('account.recharge', {
                        url: '/recharge',
                        templateUrl: 'tpl/recharge/recharge.html?v=' + version,
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/rechargeCtrl.js?v=' + version]);
                                }]
                        }
                    })
                    .state('account.alarms', {
                        url: '/alarms',
                        templateUrl: 'tpl/account_alarms.html?v=' + version,
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/alarmCtrl.js?v=' + version]);
                                }]
                        }
                    })
                    .state('account.user_logs', {
                        url: '/user_logs',
                        templateUrl: 'tpl/account_user_logs.html?v=' + version,
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/userLogCtrl.js?v=' + version]);
                                }]
                        }
                    })
                    .state('account.sp_apply', {
                        url: '/sp_apply',
                        templateUrl: 'tpl/user/sp_apply.html?v=' + version,
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/spApplyCtrl.js?v=' + version]);
                                }]
                        }
                    })
                    .state('account.app_component', {
                        url:'/app/:app_guid/component',
                        template: '<div ui-view  ></div>'
                    })
                    .state('account.app_component.add', {
                        url: '/add',
                        templateUrl: 'tpl/app/app_component_add.html?v=' + version,
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/appComponentAddCtrl.js?v=' + version]);
                                }]
                        }
                    })
                    .state('account.app_version', {
                        url:'/app/:app_guid/version',
                        template: '<div ui-view  ></div>'
                    })
                    .state('account.app_version.add', {
                        url: '/add',
                        templateUrl: 'tpl/app/app_version_add.html?v=' + version,
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/appVersionAddCtrl.js?v=' + version]);
                                }]
                        }
                    })
                    .state('account.app_version.edit', {
                        url: '/edit',
                        templateUrl: 'tpl/app/app_version_edit.html?v=' + version,
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/appVersionEdit.js?v=' + version]);
                                }]
                        }
                    })
                    .state('account.notices', {
                        url: '/notices',
                        templateUrl: 'tpl/account_notices.html?v=' + version,
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/noticeCtrl.js?v=' + version]);
                                }]
                        }
                    })
                    .state('account.example', {
                        url: '/example',
                        template: '<div ui-view></div>'
                    })
                    .state('account.example.form_valid', {
                        url: '/form_valid',
                        templateUrl: 'tpl/example/form_valid.html?v=' + version,
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad){
                                    return $ocLazyLoad.load(['js/controllers/exampleCtrl.js?v=' + version]);
                                }]
                        }
                    })
                    .state('account.app.payDetails', {
                    url:'/:app_guid/payDetails',
                    templateUrl: 'tpl/app/app_pay_details.html?v=' + version,
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['js/controllers/appPayDetailsCtrl.js?v=' + version]);
                            }]
                        }
                    })
                    .state('account.app.marketDetails', {
                        url:'/:app_guid/marketDetails',
                        templateUrl: 'tpl/app/app_market_details.html?v=' + version,
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/appMarketDetailsCtrl.js?v=' + version]);
                                }]
                        }
                    })
            }
        ]
    );
