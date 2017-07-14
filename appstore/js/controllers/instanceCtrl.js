/**
 * Created by Domoke on 2017/6/26.
 */
'use strict';
app.controller('InstanceCtrl', ['$scope', 'i18nService', '$http', function ($scope, i18nService, $http) {
    i18nService.setCurrentLang('zh-cn');

    var optCellTemplate = '<div class="ui-grid-cell-contents btn-group">' +
        '<a ui-sref="account.instance.details({instance_guid:row.entity.guid})" class="btn btn-sm btn-info" ><i class="fa fa-pencil-square-o fa-fw"></i>查看详情</a>' +
        '</div>';

    var vm = this;
    vm.gridOptionsInstance = {
        enableHorizontalScrollbar: 0, //grid水平滚动条是否显示, 0-不显示  1-显示
        paginationPageSize: 10,
        paginationPageSizes: [10, 20, 50, 100],
        rowHeight: 46,
        columnDefs: [
            { name: 'user_name', enableFiltering: false, displayName: '客户账号' },
            { name: 'app_name', enableFiltering: false, displayName: '应用名称' },
            { name: 'component_name', enableFiltering: false, displayName: '组件名称' },
            { name: 'host', enableFiltering: false, displayName: '主机' },
            { name: 'port', enableFiltering: false, displayName: '端口' },
            { name: 'cpu', enableFiltering: false, displayName: 'CPU使用率' },
            { name: 'memory', enableFiltering: false, displayName: '内存使用率' },
            { name: 'disk', enableFiltering: false, displayName: '磁盘使用率' },
            { name: 'quota_memory', enableFiltering: false, displayName: '内存配额' },
            { name: 'quota_disk', enableFiltering: false, displayName: '磁盘配额' },
            { name: 'run_time', enableFiltering: false, displayName: '运行时间' },
            { name: 'status', enableFiltering: false, displayName: '运行状态' },
            { name: 'guid', enableFiltering: false, displayName: '操作' , cellTemplate:optCellTemplate},
        ],
        data: []
    };

    // 获取客户信息
    var getInstances = function () {
        vm.instances = [];
        $http.get('api/instances.json').then(function (resp) {
            var data = resp.data;
            for(var i in data.resources) {
                vm.instances.push({
                    guid:data.resources[i].metadata.guid,
                    create_time:data.resources[i].metadata.created_at,
                    user_guid:data.resources[i].user.guid,
                    user_name:data.resources[i].user.user_name,
                    user_nick_name:data.resources[i].user.nick_name,
                    app_guid :data.resources[i].app.guid,
                    app_name:data.resources[i].app.name,
                    app_version:data.resources[i].app.latest_version,
                    component_guid:data.resources[i].component.guid,
                    component_name:data.resources[i].component.name,
                    component_version:data.resources[i].component.version,
                    host:data.resources[i].entity.host,
                    port:data.resources[i].entity.port,
                    cpu:data.resources[i].entity.cpu,
                    memory:data.resources[i].entity.memory,
                    disk:data.resources[i].entity.disk,
                    quota_memory:data.resources[i].entity.quota_memory,
                    quota_disk:data.resources[i].entity.quota_disk,
                    run_time:data.resources[i].entity.run_time,
                    status:data.resources[i].entity.status,
                });
            }
            vm.gridOptionsInstance.data = vm.instances;
        });
    };

    // 首次加载
    getInstances();

    // 刷新grid
    vm.refreshGrid = function () {
        getInstances();
    }

    // 搜索
    $scope.$watch('searchInstance', function (newVal, oldVal) {
        if (newVal === oldVal)
            return;
        vm.gridOptionsInstance.data = vm.instances.filter(function (data) {
            if (data.nick_name) {
                if (data.nick_name.toLowerCase().indexOf($scope.searchInstance.toLowerCase()) > -1) {
                    return true;
                }
                else {
                    return false;
                }
            }
        });
    });
}]);