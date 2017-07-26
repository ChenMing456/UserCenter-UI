/**
 * Created by Domoke on 2017/7/6.
 */
"use strict";

app.controller('AppCreateCtrl', ['$scope', 'i18nService', '$http','$state', function ($scope, i18nService, $http,$state) {
    i18nService.setCurrentLang('zh-cn');
    var vm  = this;
    $scope.categoryInfo = [
        {"name":"基础服务","value":1},
        {"name":"企业软件","value":2},
        {"name":"研发管理","value":3},
        {"name":"运维管理","value":4},
        {"name":"安全管理","value":5},
        {"name":"行业增值","value":6},
    ]
    //初始化表单
    vm.appForm = {
        name : "",
        simple_name : "",
        intro : "",
        description_imgs : "",
        description_text : "",
        type : "",
        category : "",
        logo : ""
    }
    //创建应用
    vm.createApp = function () {
        $state.go('account.apps');
    }

    // w5c验证配置
    vm.validateOptions = {
        blurTrig: true
    };

    //取消按钮
    vm.cancel = function () {
        $state.go('account.apps');
    }


}]);