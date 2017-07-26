/**
 * Created by chenming on 2017/7/14.
 */
"use strict";
// 添加资源
app.controller('ResourceAddCtrl', ['$scope', 'i18nService', '$http','$filter','toaster', function ($scope,i18nService, $http,$filter,toaster) {

    i18nService.setCurrentLang('zh-cn');

    // 点击添加按钮，添加资源
    $scope.addResource=function () {
        // 获取当前时间、前端数据
        var date=new Date();
        var local_time=$filter('date')(date, "yyyy-MM-dd HH:mm:ss");
        var add_resources={
            "metadata":{
                "guid":"f4f73c73-b5b7-482c-9ca7-c0d907e96084",
                "created_at":local_time,
                "updated_at":null
            },
            "entity":{
                "name":$scope.resource_name,
                "type":$scope.resource_type,
                "config":"资源连接配置"
            }
        };
        // 传入后台json文件
        // $http.post('/resources',add_resources).then(function (resp) {
        //
        // });

        //提示添加成功！
        return toaster.pop('success', '', '添加成功!');

    };

}]);