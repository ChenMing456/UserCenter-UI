/**
 * Created by Domoke on 2017/6/26.
 */
'use strict';
app.controller('CustomerCtrl', ['$scope', 'i18nService', '$http', function ($scope, i18nService, $http) {
    i18nService.setCurrentLang('zh-cn');

    var vm = this;
    vm.gridOptionsCustomer = {
        enableHorizontalScrollbar: 0, //grid水平滚动条是否显示, 0-不显示  1-显示
        paginationPageSize: 10,
        paginationPageSizes: [10, 20, 50, 100],
        rowHeight: 46,
        columnDefs: [
            { name: 'nick_name', enableFiltering: false, displayName: '昵称' },
            { name: 'order_at', enableFiltering: false, displayName: '下单时间' },
            { name: 'app_version', enableFiltering: false, displayName: '应用版本' },
            { name: 'instance_number', enableFiltering: false, displayName: '实例数' },
            { name: 'run_status', enableFiltering: false, displayName: '运行状态' }
        ],
        data: []
    };

    // 获取客户信息
    var getCustomers = function () {
        vm.customers = [];
        $http.get('api/customers.json').then(function (resp) {
            var data = resp.data;
            for(var i in data.resources) {
                vm.customers.push({
                    guid:data.resources[i].metadata.guid,
                    nick_name:data.resources[i].entity.nick_name,
                    order_at :data.resources[i].entity.order_at,
                    app_version:data.resources[i].entity.app_version,
                    instance_number:data.resources[i].entity.instance_number,
                    run_status:data.resources[i].entity.run_status,
                });
            }
            vm.gridOptionsCustomer.data = vm.customers;
        });
    };

    // 首次加载
    getCustomers();

    // 刷新grid
    vm.refreshGrid = function () {
        getCustomers();
    }

    // 搜索
    $scope.$watch('searchCustomer', function (newVal, oldVal) {
        if (newVal === oldVal)
            return;
        vm.gridOptionsCustomer.data = vm.customers.filter(function (data) {
            if (data.nick_name) {
                if (data.nick_name.toLowerCase().indexOf($scope.searchCustomer.toLowerCase()) > -1) {
                    return true;
                }
                else {
                    return false;
                }
            }
        });
    });
}]);
