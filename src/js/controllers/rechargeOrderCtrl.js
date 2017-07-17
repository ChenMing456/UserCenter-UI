/**
 * Created by Domoke on 2017/6/26.
 */
'use strict';

app.controller('RechargeOrderCtrl', ['$scope', 'i18nService', '$http', '$filter', function($scope, i18nService, $http, $filter) {
  i18nService.setCurrentLang('zh-cn');

  var vm = this;
  vm.gridOptionsRechargeOrder = {
    enableHorizontalScrollbar: 0, //grid水平滚动条是否显示, 0-不显示  1-显示
    paginationPageSize: 10,
    paginationPageSizes: [10, 20, 50, 100],
    rowHeight: 46,
    columnDefs: [{
        name: 'money',
        enableFiltering: false,
        displayName: '充值金额'
      },
      {
        name: 'pay_type',
        enableFiltering: false,
        displayName: '支付类型'
      },
      {
        name: 'pay_money',
        enableFiltering: false,
        displayName: '支付金额'
      },
      {
        name: 'paid_at',
        enableFiltering: false,
        displayName: '支付时间'
      },
      {
        name: 'status',
        enableFiltering: false,
        displayName: '支付状态'
      }
    ],
    data: []
  };

  // 获取客户信息
  var getRechargeOrders = function() {
    vm.rechargeOrders = [];
    $http.get('api/recharge_orders.json').then(function(resp) {
      var data = resp.data;
      for (var i in data.resources) {
        vm.rechargeOrders.push({
          guid: data.resources[i].metadata.guid,
          money: $filter('currency')(data.resources[i].entity.money, '￥ '),
          pay_type: data.resources[i].entity.pay_type,
          pay_money: $filter('currency')(data.resources[i].entity.pay_money, '￥ '),
          paid_at: data.resources[i].entity.paid_at,
          status: data.resources[i].entity.status,
        });
      }
      vm.gridOptionsRechargeOrder.data = vm.rechargeOrders;
    });
  };

  // 首次加载
  getRechargeOrders();

  // 刷新grid
  vm.refreshGrid = function() {
    getRechargeOrders();
  };

  // 搜索
  $scope.$watch('searchOrder', function(newVal, oldVal) {
    if (newVal === oldVal)
      return;
    vm.gridOptionsRechargeOrder.data = vm.rechargeOrders.filter(function(data) {
      if (data.paid_at) {
        if (data.paid_at.toLowerCase().indexOf($scope.searchOrder.toLowerCase()) > -1) {
          return true;
        } else {
          return false;
        }
      }
    });
  });
}]);
