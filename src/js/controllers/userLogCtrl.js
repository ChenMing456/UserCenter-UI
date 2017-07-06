/**
 * Created by Domoke on 2017/6/26.
 */
'use strict';
app.controller('UserLogCtrl', ['$scope', 'i18nService', '$http', function ($scope, i18nService, $http) {
    i18nService.setCurrentLang('zh-cn');

    var vm = this;
    vm.gridOptionsUserLog = {
        enableHorizontalScrollbar: 0, //grid水平滚动条是否显示, 0-不显示  1-显示
        paginationPageSize: 10,
        paginationPageSizes: [10, 20, 50, 100],
        rowHeight: 36,
        columnDefs: [
            { name: 'type', enableFiltering: false, displayName: '类型' },
            { name: 'description', enableFiltering: false, displayName: '描述' },
            { name: 'create_time', enableFiltering: false, displayName: '操作时间' },
        ],
        data: []
    };

    // 获取客户信息
    var getUserLogs = function () {
        vm.userLogs = [];
        $http.get('api/user_logs.json').then(function (resp) {
            var data = resp.data;
            for(var i in data.resources) {
                vm.userLogs.push({
                    guid:data.resources[i].metadata.guid,
                    create_time:data.resources[i].metadata.created_at,
                    type:data.resources[i].entity.type,
                    description :data.resources[i].entity.description
                });
            }
            vm.gridOptionsUserLog.data = vm.userLogs;
        });
    };

    // 首次加载
    getUserLogs();

    // 刷新grid
    vm.refreshGrid = function () {
        getUserLogs();
    }

    // 搜索
    $scope.$watch('searchLog', function (newVal, oldVal) {
        if (newVal === oldVal)
            return;
        vm.gridOptionsUserLog.data = vm.userLogs.filter(function (data) {
            if (data.description) {
                if (data.description.toLowerCase().indexOf($scope.searchLog.toLowerCase()) > -1) {
                    return true;
                }
                else {
                    return false;
                }
            }
        });
    });
}]);