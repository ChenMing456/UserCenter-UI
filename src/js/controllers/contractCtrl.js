/**
 * Created by Domoke on 2017/6/26.
 */
'use strict';
app.controller('ContractCtrl', ['$scope', 'i18nService', '$http', function ($scope, i18nService, $http) {
    i18nService.setCurrentLang('zh-cn');

    var optCellTemplate = '<div class="ui-grid-cell-contents btn-group">' +
        '<a ui-sref="account.contract.details({contract_guid:row.entity.guid})" class="btn btn-sm btn-default"><i class="fa fa-pencil-square-o fa-fw"></i>查看</a>' +
        '<a ng-show="row.entity.status === 10" ui-sref="account.contract.edit({contract_guid:row.entity.guid})" class="btn btn-sm btn-info"><i class="fa fa-pencil-square-o fa-fw"></i>编辑</a>' +
        '</div>';

    var nameCellTemplate = '<div class="ui-grid-cell-contents"><a ui-sref="account.contract.details({contract_guid:row.entity.guid})">{{row.entity.name}}</a></div>';

    var vm = this;
    vm.gridOptionsContract = {
        enableHorizontalScrollbar: 0, //grid水平滚动条是否显示, 0-不显示  1-显示
        paginationPageSize: 10,
        paginationPageSizes: [10, 20, 50, 100],
        rowHeight: 46,
        columnDefs: [
            { name: 'name', enableFiltering: false, displayName: '合约名称' , cellTemplate:nameCellTemplate},
            { name: 'type', enableFiltering: false, displayName: '合约类型' },
            { name: 'template', enableFiltering: false, displayName: '合约模板' },
            { name: 'attachment', enableFiltering: false, displayName: '合约附件' },
            { name: 'status', enableFiltering: false, displayName: '状态' },
            { name: 'guid', enableFiltering: false, displayName: '操作', cellTemplate: optCellTemplate },
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
                    status:data.resources[i].entity.status
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

    // 获取待审核合约信息
    vm.getUnauditContracts = function () {
        vm.contracts = [];
        $http.get('api/contracts_unaudit.json').then(function (resp) {
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
            vm.getUnauditContracts();
        } else if(+vm.filter_opt === 3) {
            vm.getFinishedContracts();
        } else if(+vm.filter_opt === 4) {
            vm.getAllContracts();
        }
    };

    // 首次加载
    vm.filterContracts();

    // 搜索
    $scope.$watch('searchContract', function (newVal, oldVal) {
        if (newVal === oldVal)
            return;
        vm.gridOptionsContract.data = vm.contracts.filter(function (data) {
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
