/**
 * Created by Domoke on 2017/7/6.
 */
"use strict";

app.controller('AppDetailsCtrl', ['$scope', 'i18nService', '$http', function ($scope, i18nService, $http) {

}]);

app.controller('AppComponentCtrl', ['$scope', 'i18nService', '$http', function ($scope, i18nService, $http) {
    i18nService.setCurrentLang('zh-cn');

    var optCellTemplate = '<div class="ui-grid-cell-contents btn-group">' +
        '<button type="button" class="btn btn-sm btn-success" ng-click="grid.appScope.downloadComponent(row.entity)"><i class="fa fa-download fa-fw"></i>下载</button>' +
        '<button type="button" class="btn btn-sm btn-danger" ng-click="grid.appScope.deleteComponent(row.entity)"><i class="fa fa-trash-o fa-fw"></i>删除</button>' +
        '</div>';

    var vm = this;
    vm.gridOptionsComponent = {
        enableHorizontalScrollbar: 0, //grid水平滚动条是否显示, 0-不显示  1-显示
        paginationPageSize: 10,
        paginationPageSizes: [10, 20, 50, 100],
        rowHeight: 46,
        columnDefs: [
            { name: 'name', enableFiltering: false, displayName: '名称' },
            { name: 'version', enableFiltering: false, displayName: '版本' },
            { name: 'remarks', enableFiltering: false, displayName: '说明' },
            { name: 'create_time', enableFiltering: false, displayName: '创建时间' },
            { name: 'guid', enableFiltering:false, displayName:'操作', cellTemplate:optCellTemplate}
        ],
        data: []
    };

    // 获取资源信息
    var getComponents = function () {
        vm.components = [];
        $http.get('api/app_components.json').then(function (resp) {
            var data = resp.data;
            for(var i in data.resources) {
                vm.components.push({
                    guid:data.resources[i].metadata.guid,
                    create_time:data.resources[i].metadata.created_at,
                    name:data.resources[i].entity.name,
                    version:data.resources[i].entity.version,
                    remarks :data.resources[i].entity.remarks,
                    attachment:data.resources[i].entity.attachment,
                });
            }
            vm.gridOptionsComponent.data = vm.components;
        });
    };

    // 首次加载
    getComponents();

    // 刷新grid
    vm.refreshGrid = function () {
        getComponents();
    }

    // 搜索
    $scope.$watch('searchComponent', function (newVal, oldVal) {
        if (newVal === oldVal)
            return;
        vm.gridOptionsComponent.data = vm.components.filter(function (data) {
            if (data.name) {
                if (data.name.toLowerCase().indexOf($scope.searchComponent.toLowerCase()) > -1) {
                    return true;
                }
                else {
                    return false;
                }
            }
        });
    });
}]);

app.controller('AppVersionCtrl', ['$scope', 'i18nService', '$http', function ($scope, i18nService, $http) {
    i18nService.setCurrentLang('zh-cn');

    var optCellTemplate = '<div class="ui-grid-cell-contents btn-group">' +
        '<button type="button" class="btn btn-sm btn-success" ng-click="grid.appScope.soldOn(row.entity)"><i class="fa fa-pencil-square-o fa-fw"></i>发布</button>' +
        '<button type="button" class="btn btn-sm btn-warning" ng-click="grid.appScope.soldOut(row.entity)"><i class="fa fa-pencil-square-o fa-fw"></i>下架</button>' +
        '<button type="button" class="btn btn-sm btn-default" ng-click="grid.appScope.editVersion(row.entity)"><i class="fa fa-pencil-square-o fa-fw"></i>编辑</button>' +
        '<button type="button" class="btn btn-sm btn-danger" ng-click="grid.appScope.deleteVersion(row.entity)"><i class="fa fa-trash-o fa-fw"></i>删除</button>' +
        '</div>';

    var vm = this;
    vm.gridOptionsVersion = {
        enableHorizontalScrollbar: 0, //grid水平滚动条是否显示, 0-不显示  1-显示
        paginationPageSize: 10,
        paginationPageSizes: [10, 20, 50, 100],
        rowHeight: 46,
        columnDefs: [
            { name: 'name', enableFiltering: false, displayName: '版本号' },
            { name: 'create_time', enableFiltering: false, displayName: '创建时间' },
            { name: 'selling_price', enableFiltering: false, displayName: '销售价格(￥)' },
            { name: 'sold_count', enableFiltering: false, displayName: '已售数量' },
            { name: 'guid', enableFiltering:false, displayName:'操作', cellTemplate:optCellTemplate, width:300}
        ],
        data: []
    };

    // 获取资源信息
    var getVersions = function () {
        vm.versions = [];
        $http.get('api/app_versions.json').then(function (resp) {
            var data = resp.data;
            for(var i in data.resources) {
                vm.versions.push({
                    guid:data.resources[i].metadata.guid,
                    create_time:data.resources[i].metadata.created_at,
                    name:data.resources[i].entity.name,
                    intro:data.resources[i].entity.intro,
                    selling_price :data.resources[i].entity.selling_price,
                    sold_count:data.resources[i].entity.sold_count,
                    app_guid:data.resources[i].app.guid,
                    app_name:data.resources[i].app.name,
                });
            }
            vm.gridOptionsVersion.data = vm.versions;
        });
    };

    // 首次加载
    getVersions();

    // 刷新grid
    vm.refreshGrid = function () {
        getVersions();
    }

    // 搜索
    $scope.$watch('searchVersion', function (newVal, oldVal) {
        if (newVal === oldVal)
            return;
        vm.gridOptionsVersion.data = vm.versions.filter(function (data) {
            if (data.name) {
                if (data.name.toLowerCase().indexOf($scope.searchVersion.toLowerCase()) > -1) {
                    return true;
                }
                else {
                    return false;
                }
            }
        });
    });
}]);