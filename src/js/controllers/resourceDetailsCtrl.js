/**
 * Created by chenming on 2017/7/14.
 */
"use strict";
app.controller('ResourceDetailsCtrl', ['$scope', 'i18nService', '$http','$filter', '$stateParams','toaster', function ($scope,i18nService, $http,$filter,$stateParams,toaster) {
    i18nService.setCurrentLang('zh-cn');
    //获取当前需要编辑的资源的guid
    var guid = $stateParams.resource_guid;
    //用添加的resources_details.json模拟数据，实际接口：/resources/：guid
    $http.get('api/resources_details.json').then(function (resp) {
        var data = resp.data;
        //将取得的资源详情显示在页面中
        $scope.now_resource_name=data.entity.name;
        $scope.now_resource_type=data.entity.type;
    });

    // 点击保存按钮，保存编辑修改后的资源
    $scope.saveResource=function () {
        // 获取当前时间。保存修改后，时间更新为当前时间
        var date=new Date();
        var local_time=$filter('date')(date, "yyyy-MM-dd HH:mm:ss");
        //修改后的新数据
        var add_resources={
            "metadata":{
                "guid":"f4f73c73-b5b7-482c-9ca7-c0d907e96084",
                "created_at":local_time,
                "updated_at":null
            },
            "entity":{
                "name":$scope.now_resource_name,
                "type":$scope.now_resource_type,
                "config":"资源连接配置"
            }
        };

        // 传入后台json文件
        // $http.post('/resources',add_resources).then(function (resp) {
        //
        // });

        //提示保存成功！
        return toaster.pop('success', '', '保存成功!');
    };

}]);