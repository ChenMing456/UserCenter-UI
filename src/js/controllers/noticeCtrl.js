/**
 * Created by Domoke on 2017/6/26.
 */
'use strict';
app.controller('NoticeCtrl', ['$scope', 'i18nService', '$http', function ($scope, i18nService, $http) {
    i18nService.setCurrentLang('zh-cn');

    var vm = this;
    vm.gridOptionsNotice = {
        enableHorizontalScrollbar: 0, //grid水平滚动条是否显示, 0-不显示  1-显示
        paginationPageSize: 10,
        paginationPageSizes: [10, 20, 50, 100],
        rowHeight: 36,
        columnDefs: [
            { name: 'title', enableFiltering: false, displayName: '标题' },
            { name: 'create_time', enableFiltering: false, displayName: '创建时间' },
            { name: '', enableFiltering: false, displayName: '是否已读' },
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
                    title:data.resources[i].entity.nick_name,
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