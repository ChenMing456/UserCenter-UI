
"use strict";

app.controller('AppMarketDetailsCtrl', ['$scope', 'i18nService', '$http','$state','$stateParams', function ($scope, i18nService, $http,$state,$stateParams) {
    var app_guid = $stateParams.app_guid;
    var vm = this;
    i18nService.setCurrentLang('zh-cn');
    //获取已经购买应用的信息
    var getMarketApp = function (app_guid) {
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

    getMarketApp();

    //购买应用
    var buyApp = function () {
        alert("hello");
    }

    //版本列表
    var optCellTemplate = '<div class="ui-grid-cell-contents btn-group">' +
        '<button type="button" class="btn btn-sm btn-success" ng-click="grid.appScope.buyApp(row.entity)"><i class="fa fa-download fa-fw"></i>购买</button>' +
        '</div>';

    vm.gridOptionsVersions = {
        enableHorizontalScrollbar: 0, //grid水平滚动条是否显示, 0-不显示  1-显示
        paginationPageSize: 5,
        paginationPageSizes: [10, 20, 50, 100],
        rowHeight: 46,
        columnDefs: [
            { name: 'number', enableFiltering: false, displayName: '版本号' },
            { name: 'introduction', enableFiltering: false, displayName: '介绍' },
            { name: 'published_at', enableFiltering: false, displayName: '发布时间' },
            { name: 'guid', enableFiltering:false, displayName:'操作', cellTemplate:optCellTemplate}
        ],
        data: []
    };

    // 获取版本信息
    var getVersions = function () {
        vm.versions = [];
        $http.get('api/app_detail.json').then(function (resp) {
            var data = resp.data.entity.versions;
            angular.forEach(data,function (version) {
                vm.versions.push({
                    number:version.number,
                    introduction:version.introduction,
                    published_at:version.published_at,
                });
            })
            vm.gridOptionsVersions.data = vm.versions;
        })
    };

    // 首次加载
    getVersions();

    // 刷新grid
    vm.refreshGrid = function () {
        getVersions();
    };

    // 搜索
    $scope.$watch('searchVersion', function (newVal, oldVal) {
        if (newVal === oldVal)
            return;
        vm.gridOptionsVersions.data = vm.versions.filter(function (data) {
            if (data.number) {
                if (data.number.toLowerCase().indexOf($scope.searchVersion.toLowerCase()) > -1) {
                    return true;
                }
                else {
                    return false;
                }
            }
        });
    });


}]);