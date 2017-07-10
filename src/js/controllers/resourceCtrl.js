/**
 * Created by Domoke on 2017/6/26.
 */
'use strict';
app.controller('ResourceCtrl', ['$scope', 'i18nService', '$http', function ($scope, i18nService, $http) {
    i18nService.setCurrentLang('zh-cn');

    var optCellTemplate = '<div class="btn-group">' +
        '<button type="button" class="btn btn-sm btn-info" ng-click="grid.appScope.editResource(row.entity)"><i class="fa fa-pencil-square-o fa-fw"></i>编辑</button>' +
        '<button type="button" class="btn btn-sm btn-danger" ng-click="grid.appScope.deleteResource(row.entity)"><i class="fa fa-trash-o fa-fw"></i>删除</button>' +
        '</div>';

    var vm = this;
    vm.gridOptionsResource = {
        enableHorizontalScrollbar: 0, //grid水平滚动条是否显示, 0-不显示  1-显示
        paginationPageSize: 10,
        paginationPageSizes: [10, 20, 50, 100],
        rowHeight: 36,
        columnDefs: [
            { name: 'type', enableFiltering: false, displayName: '类型' },
            { name: 'name', enableFiltering: false, displayName: '名称' },
            { name: 'create_time', enableFiltering: false, displayName: '创建时间' },
            { name: 'guid', enableFiltering:false, displayName:'操作', cellTemplate:optCellTemplate}
        ],
        data: []
    };

    // 获取资源信息
    var getResources = function () {
        vm.resources = [];
        $http.get('api/resources.json').then(function (resp) {
            var data = resp.data;
            for(var i in data.resources) {
                vm.resources.push({
                    guid:data.resources[i].metadata.guid,
                    create_time:data.resources[i].metadata.created_at,
                    name:data.resources[i].entity.name,
                    type:data.resources[i].entity.type,
                    config :data.resources[i].entity.config,
                });
            }
            vm.gridOptionsResource.data = vm.resources;
        });
    };

    // 首次加载
    getResources();

    // 刷新grid
    vm.refreshGrid = function () {
        getResources();
    }

    // 搜索
    $scope.$watch('searchResource', function (newVal, oldVal) {
        if (newVal === oldVal)
            return;
        vm.gridOptionsResource.data = vm.resources.filter(function (data) {
            if (data.name) {
                if (data.name.toLowerCase().indexOf($scope.searchResource.toLowerCase()) > -1) {
                    return true;
                }
                else {
                    return false;
                }
            }
        });
    });
}]);