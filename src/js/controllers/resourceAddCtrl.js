/**
 * Created by chenming on 2017/7/14.
 */
"use strict";
// 添加资源
<<<<<<< HEAD
app.controller('ResourceAddCtrl', ['$scope', 'i18nService', '$http','$filter', function ($scope,i18nService, $http,$filter) {
=======
app.controller('ResourceAddCtrl', ['$scope', 'i18nService', '$http','$filter','toaster', function ($scope,i18nService, $http,$filter,toaster) {
>>>>>>> 20419f7e676ff377fe82c8a1eae6022ac2c28b1a
    i18nService.setCurrentLang('zh-cn');

    // 点击添加按钮，添加资源
    $scope.addResource=function () {
<<<<<<< HEAD
        alert("添加成功！");
=======

>>>>>>> 20419f7e676ff377fe82c8a1eae6022ac2c28b1a
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

<<<<<<< HEAD
=======
        //提示添加成功！
        return toaster.pop('success', '', '添加成功!');
>>>>>>> 20419f7e676ff377fe82c8a1eae6022ac2c28b1a
    };

}]);