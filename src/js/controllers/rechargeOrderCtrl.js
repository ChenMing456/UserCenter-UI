/**
 * Created by Domoke on 2017/6/26.
 */
'use strict';

app.controller('RechargeOrderCtrl', ['$scope', 'i18nService', '$http', '$filter', function($scope, i18nService, $http, $filter) {
  i18nService.setCurrentLang('zh-cn');
  var vm = this;
  // ui-grid的金额列自定义排序算法
  vm.moenySortFn = function(a, b) {
    var new_a = parseInt(a.split('￥')[1].replace(/,/gi, '')),
      new_b = parseInt(b.split('￥')[1].replace(/,/gi, ''));
    if (new_b < new_a) {
      return 1;
    } else {
      return -1;
    }
  };
  vm.gridOptionsRechargeOrder = {
    enableHorizontalScrollbar: 0, //grid水平滚动条是否显示, 0-不显示  1-显示
    paginationPageSize: 10,
    paginationPageSizes: [10, 20, 50, 100],
    rowHeight: 46,
    columnDefs: [{
        name: 'money',
        enableFiltering: false,
        displayName: '充值金额',
        sortingAlgorithm: vm.moenySortFn
      },
      {
        name: 'pay_type',
        enableFiltering: false,
        displayName: '支付类型'
      },
      {
        name: 'pay_money',
        enableFiltering: false,
        displayName: '支付金额',
        sortingAlgorithm: vm.moenySortFn
      },
      {
        name: 'paid_at',
        enableFiltering: false,
        displayName: '支付时间',
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

  // 刷新grid并清除输入日期
  vm.refreshGrid = function() {
    vm.searchOrderStart = '';
    vm.searchOrderEnd = '';
    getRechargeOrders();
  };
  // 根据日期起始进行查询筛选
  vm.searchOrderStart = '';
  vm.searchOrderEnd = '';
  vm.findOrderResult = function() {
    if (vm.searchOrderStart && vm.searchOrderEnd) {
      var searchOrderStart_date = new Date(vm.searchOrderStart).getTime(),
        searchOrderEnd_date = new Date(vm.searchOrderEnd).getTime();
      if (!searchOrderStart_date || !searchOrderEnd_date) {
        return;
      }
      // 根据用户写入或者选择的日期来做判断
      vm.gridOptionsRechargeOrder.data = vm.rechargeOrders.filter(function(data) {
        if (data.paid_at) {
          var paid_at_date = new Date(data.paid_at.split(' ')[0]).getTime();
          if (paid_at_date > searchOrderStart_date && paid_at_date < searchOrderEnd_date) {
            return true;
          } else {
            return false;
          }
        }
      });
    } else {
      getRechargeOrders();
      return;
    }

  };


  // 时间选择器配置
  vm.openStart = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    vm.startOpen = true;
  };
  vm.openEnd = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    vm.endOpened = true;
  };
  vm.dateOptions = {
    formatYear: 'yyyy',
    formatMonth: 'MM',
    startingDay: 1,
    class: 'datepicker'
  };
  vm.format = 'yyyy-MM-dd';
}]);
