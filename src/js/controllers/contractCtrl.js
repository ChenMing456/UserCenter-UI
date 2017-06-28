/**
 * Created by Domoke on 2017/6/26.
 */
'use strict';
app.controller('ContractCtrl', ['$scope', 'uiGridConstants', 'i18nService', '$http', function ($scope, uiGridConstants, i18nService, $http) {
    i18nService.setCurrentLang('zh-cn');

    var vm = this;
    vm.gridOptionsContract = {
        enableHorizontalScrollbar: 0, //grid水平滚动条是否显示, 0-不显示  1-显示
        paginationPageSize: 10,
        paginationPageSizes: [10, 20, 50, 100],
        rowHeight: 36,
        columnDefs: [
            { name: 'name', enableFiltering: false, displayName: '合约名称' },
            { name: 'type', enableFiltering: false, displayName: '合约类型' },
            { name: 'template', enableFiltering: false, displayName: '合约模板' },
            { name: 'attachment', enableFiltering: false, displayName: '合约附件' },
            { name: 'status', enableFiltering: false, displayName: '状态' }
        ],
        data: []
    };

    // 获取所有合约信息
    vm.getAllContracts = function () {
        vm.contracts = [];
        $http.get('api/contracts.json').then(function (resp) {
            var data = resp.data;
            for(var i in data.resources) {
                vm.contracts.push({
                    guid:data.resources[i].metadata.guid,
                    name:data.resources[i].entity.name,
                    type :data.resources[i].entity.type,
                    template:data.resources[i].entity.template,
                    attachment:data.resources[i].entity.attachment,
                    status:data.resources[i].entity.status,
                });
            }
            vm.gridOptionsContract.data = vm.contracts;
        });
    };

    // 获取已完成合约信息
    vm.getFinishedContracts = function () {
        vm.contracts = [];
        $http.get('api/contracts_over.json').then(function (resp) {
            var data = resp.data;
            for(var i in data.resources) {
                vm.contracts.push({
                    guid:data.resources[i].metadata.guid,
                    name:data.resources[i].entity.name,
                    type :data.resources[i].entity.type,
                    template:data.resources[i].entity.template,
                    attachment:data.resources[i].entity.attachment,
                    status:data.resources[i].entity.status,
                });
            }
            vm.gridOptionsContract.data = vm.contracts;
        });
    };

    // 获取未完成合约信息
    vm.getUnfinishedContracts = function () {
        vm.contracts = [];
        $http.get('api/contracts_unfinished.json').then(function (resp) {
            var data = resp.data;
            for(var i in data.resources) {
                vm.contracts.push({
                    guid:data.resources[i].metadata.guid,
                    name:data.resources[i].entity.name,
                    type :data.resources[i].entity.type,
                    template:data.resources[i].entity.template,
                    attachment:data.resources[i].entity.attachment,
                    status:data.resources[i].entity.status,
                });
            }
            vm.gridOptionsContract.data = vm.contracts;
        });
    };

    vm.filter_opt = 1;
    vm.filterContracts = function () {
        if(+vm.filter_opt === 1) {
            vm.getUnfinishedContracts();
        } else if(+vm.filter_opt === 2) {
            vm.getFinishedContracts();
        } else if(+vm.filter_opt === 3) {
            vm.getAllContracts();
        }
    };

    // 首次加载
    vm.filterContracts();

    // 搜索
    $scope.$watch('searchContract', function (newVal, oldVal) {
        if (newVal === oldVal)
            return;
        vm.gridOptionsCustomer.data = vm.customers.filter(function (data) {
            if (data.name) {
                if (data.name.toLowerCase().indexOf($scope.searchContract.toLowerCase()) > -1) {
                    return true;
                }
                else {
                    return false;
                }
            }
        });
    });
}]);
