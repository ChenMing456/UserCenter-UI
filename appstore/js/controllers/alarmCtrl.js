/**
 * Created by Domoke on 2017/6/26.
 */
'use strict';
app.controller('AlarmCtrl', ['$scope', 'i18nService', '$http', function ($scope, i18nService, $http) {
    i18nService.setCurrentLang('zh-cn');

    var vm = this;
    vm.gridOptionsAlarm = {
        enableHorizontalScrollbar: 0, //grid水平滚动条是否显示, 0-不显示  1-显示
        paginationPageSize: 10,
        paginationPageSizes: [10, 20, 50, 100],
        rowHeight: 46,
        columnDefs: [
            { name: 'type', enableFiltering: false, displayName: '类型' },
            { name: 'description', enableFiltering: false, displayName: '描述' },
        ],
        data: []
    };

    // 获取所有合约信息
    var getAlarms = function () {
        vm.alarms = [];
        $http.get('api/alarms.json').then(function (resp) {
            var data = resp.data;
            for(var i in data.resources) {
                vm.alarms.push({
                    type :data.resources[i].entity.type,
                    description:data.resources[i].entity.description,
                });
            }
            vm.gridOptionsAlarm.data = vm.alarms;
        });
    };

    // 首次加载
    getAlarms();

    // 刷新grid
    vm.refreshGrid = function () {
        getAlarms();
    }

    // 搜索
    $scope.$watch('searchAlarm', function (newVal, oldVal) {
        if (newVal === oldVal)
            return;
        vm.gridOptionsAlarm.data = vm.alarms.filter(function (data) {
            if (data.description) {
                if (data.description.toLowerCase().indexOf($scope.searchAlarm.toLowerCase()) > -1) {
                    return true;
                }
                else {
                    return false;
                }
            }
        });
    });
}]);