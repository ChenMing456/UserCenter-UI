/**
 * Created by Domoke on 2017/7/5.
 */
"use strict";
app.controller('RechargeCtrl', ['$scope', '$http', function($scope, $http) {
  var vm = this;
  // 自定义金额一开始为空,充值按钮一开始禁用
  vm.customedMoney = '';
  vm.showAbledButton = true;
  // 点击不同金额button按钮
  vm.showActiveBtn = function(number) {
    vm.showAbledButton = false;
    vm.customedMoney = '';
    vm.buttonMoney = number;
  };
  // 输入框change事件(禁用充值按钮和显示提示图标)
  vm.inputChange = function() {
    // 0到100000之间的正整数
    var r = /^[1-9]\d{0,4}$/;
    vm.showError = false;
    vm.buttonMoney = '';
    if (vm.customedMoney == '') {
      vm.showAbledButton = true;
    } else {
      // 符合规则就显示成功图标 同时充值按钮解除禁用
      if (r.test(vm.customedMoney)) {
        vm.showSuccess = true;
        vm.showAbledButton = false;
      } else {
        vm.showError = true;
        vm.showSuccess = false;
        vm.showAbledButton = true;
      }
    }
  };
  // 点击立即充值按钮
  vm.ImmediateRecharge = function() {
    // 发出去一个post表单提交 拿回返回数据 如果状态变为20就证明充值成功
    // 在这里统一模拟成功(需要modal)
    // console.log(vm.pay_type);
    alert('充值成功！');
  };

}]);
