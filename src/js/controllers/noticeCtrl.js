/**
 * Created by Domoke on 2017/6/26.
 */
'use strict';
app.controller('NoticeCtrl', ['$scope', 'i18nService', '$confirm', 'toaster', '$http', function ($scope, i18nService, $confirm, toaster, $http) {
    i18nService.setCurrentLang('zh-cn');

    var optCellTemplate = '<div class="ui-grid-cell-contents btn-group">' +
        '<button type="button" class="btn btn-sm btn-info" ng-click="grid.appScope.readNotice(row.entity)"><i class="fa fa-pencil-square-o fa-fw"></i>查看</button>' +
        '<button type="button" class="btn btn-sm btn-danger" ng-click="grid.appScope.deleteNotice(row.entity)"><i class="fa fa-trash-o fa-fw"></i>删除</button>' +
        '</div>';

    var vm = this;
    vm.gridOptionsNotice = {
        enableHorizontalScrollbar: 0, //grid水平滚动条是否显示, 0-不显示  1-显示
        paginationPageSize: 10,
        paginationPageSizes: [10, 20, 50, 100],
        rowHeight: 46,
        columnDefs: [
            { name: 'title', enableFiltering: false, displayName: '标题' },
            { name: 'create_time', enableFiltering: false, displayName: '创建时间' },
            { name: 'is_read', enableFiltering: false, displayName: '是否已读' },
            { name: 'guid', enableFiltering:false , displayName: '操作', cellTemplate:optCellTemplate}
        ],
        data: []
    };

    // 获取客户信息
    var getNotices = function () {
        vm.notices = [];
        $http.get('api/notices.json').then(function (resp) {
            var data = resp.data;
            for(var i in data.resources) {
                vm.notices.push({
                    guid:data.resources[i].metadata.guid,
                    create_time:data.resources[i].metadata.created_at,
                    title:data.resources[i].entity.title,
                    is_read :data.resources[i].entity.is_read
                });
            }
            vm.gridOptionsNotice.data = vm.notices;
        });
    };

    // 首次加载
    getNotices();

    // 刷新grid
    vm.refreshGrid = function () {
        getNotices();
    }

    // 读取消息通知
    $scope.readNotice = function (notice) {
        // 使用模态框
    }

    // 删除消息通知
    $scope.deleteNotice = function (notice) {
        $confirm({
            text: '确认要删除消息[' + notice.title +  ']吗',
            title: "确认删除",
            ok: "确认",
            cancel: '取消'
        }).then(function () {
            toaster.pop('success', '', '删除成功');
        });
    }

    // 搜索
    $scope.$watch('searchNotice', function (newVal, oldVal) {
        if (newVal === oldVal)
            return;
        vm.gridOptionsNotice.data = vm.notices.filter(function (data) {
            if (data.title) {
                if (data.title.toLowerCase().indexOf($scope.searchNotice.toLowerCase()) > -1) {
                    return true;
                }
                else {
                    return false;
                }
            }
        });
    });
}]);