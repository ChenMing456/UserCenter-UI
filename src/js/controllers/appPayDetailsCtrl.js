/**
 * Created by Domoke on 2017/7/6.
 */
"use strict";

app.controller('AppPayDetailsCtrl', ['$scope', 'i18nService', '$http','$state','$stateParams', function ($scope, i18nService, $http,$state,$stateParams) {
    var app_guid = $stateParams.app_guid;
    var vm = this;
    i18nService.setCurrentLang('zh-cn');
    //获取已经购买应用的信息
    var getPayedApp = function (app_guid) {
        vm.appDetail = {}
        $http.get('api/app_detail.json').then(function (resp) {
            var data = resp.data;
            vm.appDetail = {
                name:data.entity.name,
                logo:data.entity.logo,
                intro:data.entity.intro,
                description_text:data.entity.description_text,
                description_images:data.entity.description_images,
                grade_star:data.entity.grade_star,
                used_count:data.entity.used_count,
                published_at:data.entity.published_at,
                guid:data.metadata.guid,
            }
        })
    }

    getPayedApp();

    //部署应用
    var deployApp = function () {
        
    }
    //提交评价
    vm.summitComment = function(app_guid){

    }


}]);