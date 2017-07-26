/**
 * Created by Domoke on 2017/6/26.
 */
'use strict';
app.controller('AppCtrl', ['$scope', 'i18nService', '$http',  function ($scope, i18nService, $http) {
    var vm = this;
    i18nService.setCurrentLang('zh-cn');
    vm.apps = [];
    //获取全部应用
    var getApps = function () {
        vm.apps = [];
        $http.get('api/apps_my.json').then(function (resp) {
            var data = resp.data;
            angular.forEach(data.resources,function (app) {
                var appInfo = {
                    guid:app.metadata.guid,
                    name:app.entity.name,
                    simple_name:app.entity.simple_name,
                    logo:app.entity.logo,
                }
                if(app.entity.status===10){
                    appInfo.status = "未发布";
                    appInfo.color = "bg-warning";
                }else if(app.entity.status===20){
                    appInfo.status = "已发布";
                    appInfo.color = "bg-success";
                }else if(app.entity.status===30){
                    appInfo.status = "暂时下架";
                    appInfo.color = "bg-info";
                }else if(app.entity.status===40){
                    appInfo.status = "永久下架";
                    appInfo.color = "bg-danger";
                }else {
                    appInfo.status = "";
                }
                vm.apps.push(appInfo);
            })
        })
    }

    getApps();

}]);

app.controller('AppMarketCtrl', ['$scope', 'i18nService', '$http',  function ($scope, i18nService, $http) {
    var vm = this;
    i18nService.setCurrentLang('zh-cn');
    vm.apps = [];
    //获取全部应用
    var getApps = function () {
        vm.apps = [];
        $http.get('api/apps_market.json').then(function (resp) {
            var data = resp.data;
            angular.forEach(data.resources,function (app) {
                var appInfo = {
                    guid:app.metadata.guid,
                    name:app.entity.name,
                }
                vm.apps.push(appInfo);
            })
        })
    }

    getApps();

}]);

app.controller('AppPayCtrl', ['$scope', 'i18nService', '$http','$modal', 'toaster','$log',  function ($scope, i18nService, $http,$modal, toaster,$log) {
    var vm = this;
    i18nService.setCurrentLang('zh-cn');
    vm.apps = [];
    //获取全部应用
    var getApps = function () {
        vm.apps = [];
        $http.get('api/apps_bought.json').then(function (resp) {
            var data = resp.data;
            angular.forEach(data.resources,function (app) {
                var appInfo = {
                    guid:app.metadata.guid,
                    name:app.app.name,
                    cost:app.entity.cost,
                    status:app.entity.status,
                    confd_text:app.app_version.confd_text,
                    logo:app.app.logo,
                    simple_name:app.app.simple_name,
                }
                if(app.entity.status===10){
                    appInfo.status = "未支付";
                    appInfo.color = "bg-warning";
                }else if(app.entity.status===20){
                    appInfo.status = "未评价";
                    appInfo.color = "bg-info";
                }else if(app.entity.status===30){
                    appInfo.status = "已评价";
                    appInfo.color = "bg-success";
                }else {
                    appInfo.status = "";
                }
                vm.apps.push(appInfo);
            })
        })
    }

    getApps();

    vm.entity = {
        star:'',
        comment:'',
        submitted: false
    };

    //点评
    vm.comment = function () {

        var modalInstance = $modal.open({
            backdrop: false,
            templateUrl: 'tpl/app/modal_comment_add.html',
            controller: 'AddCommentCtrl as addComment',
            resolve: {
                deps: ['$ocLazyLoad',
                    function( $ocLazyLoad){
                        return $ocLazyLoad.load('js/controllers/appCommentAddCtrl.js');
                    }]
            }
        });

        modalInstance.result.then(function (result) {
            if(result === 'success') {
                return toaster.pop('success', '', '新增点评成功');
            }
            return toaster.pop('error', '', '新增点评失败');
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }

}]);