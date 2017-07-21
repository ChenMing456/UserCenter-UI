/**
 * Created by Domoke on 2017/6/26.
 */
'use strict';
app.controller('ResourceCtrl', ['$scope', 'i18nService', '$http','$confirm','toaster',function ($scope,i18nService,$http,$confirm,toaster) {
    i18nService.setCurrentLang('zh-cn');

    var optCellTemplate = '<div class="ui-grid-cell-contents btn-group">' +
        '<button type="button" class="btn btn-sm btn-info" ng-click="grid.appScope.editResource(row.entity)" ui-sref="account.resource.details({resource_guid:row.entity.guid})" ><i class="fa fa-pencil-square-o fa-fw"></i>编辑</button>' +
        '<button type="button" class="btn btn-sm btn-danger" ng-click="grid.appScope.deleteResource(row.entity)"><i class="fa fa-trash-o fa-fw"></i>删除</button>' +
        '</div>';
    //var nameCellTemplate = '<div class="ui-grid-cell-contents" ng-click="grid.appScope.ResourceShowDeatils(row.entity)"><a ui-sref="account.resource.details({guid:row.entity.guid})">{{row.entity.name}}</a></div>';

    var vm = this;
    vm.gridOptionsResource = {
        enableHorizontalScrollbar: 0, //grid水平滚动条是否显示, 0-不显示  1-显示
        paginationPageSize: 10,
        paginationPageSizes: [5, 10, 20, 30],
        rowHeight: 46,
        columnDefs: [
            { name: 'type', enableFiltering:false, displayName: '类型' },
            { name: 'name', enableFiltering: false, displayName: '名称' },
            { name: 'create_time', enableFiltering: true, displayName: '创建时间' },
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
                    config :data.resources[i].entity.config
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
    };

    // 根据资源的：类型/名称/时间，搜索资源
    $scope.$watch('searchResource', function (newVal, oldVal) {
        if (newVal === oldVal)
            return;
        vm.gridOptionsResource.data = vm.resources.filter(function (data) {
            if (data.name) {
                if ((data.name.toLowerCase().indexOf($scope.searchResource.toLowerCase()) > -1)||(data.type.toLowerCase().indexOf($scope.searchResource.toLowerCase()) > -1)||(data.create_time.toLowerCase().indexOf($scope.searchResource.toLowerCase())>-1)){
                    return true;
                }
                else {
                    return false;
                }
            }
        });
    });
//     //点击资源名称，显示资源详情
//     $scope.ResourceShowDetails=function (entity) {
//     };
//     //编辑资源
//     $scope.editResource=function (entity) {
//         // console.log(entity.name);
// };

    //删除资源
    $scope.deleteResource=function (entity) {
        //使用cinfirm确认是否删除
        $confirm({
            text: '确认要删除[  ' + entity.name +  '   ]吗?',
            title: "确认删除",
            ok: "确认",
            cancel: '取消'
        }).then(function () {
            //用json模拟效果
            vm.resources = [];
            $http.get('api/resources.json').then(function (resp) {
                var data = resp.data;
                for(var i in data.resources) {
                    if (entity.name==data.resources[i].entity.name) {
                        data.resources[i].delete;
                    }
                    else {
                        vm.resources.push({
                            guid: data.resources[i].metadata.guid,
                            create_time: data.resources[i].metadata.created_at,
                            name: data.resources[i].entity.name,
                            type: data.resources[i].entity.type,
                            config: data.resources[i].entity.config
                        });
                    }
                }
                vm.gridOptionsResource.data = vm.resources;
            });
            //删除成功提示
            toaster.pop('success', '', '删除成功！');
        });

        //实际操作，对应后台URL
        // vm.resources = [];
        // $http.get('/resources/：guid').then(function (resp) {
        //     var data = resp.data;
        //     for(var i in data.resources) {
        //         if (entity.name==data.resources[i].entity.name) {
        //             data.resources[i].delete;
        //         }
        //         else {
        //             vm.resources.push({
        //                 guid: data.resources[i].metadata.guid,
        //                 create_time: data.resources[i].metadata.created_at,
        //                 name: data.resources[i].entity.name,
        //                 type: data.resources[i].entity.type,
        //                 config: data.resources[i].entity.config
        //             });
        //         }
        //     }
        //     vm.gridOptionsResource.data = vm.resources;
        // });
    };

}]);

