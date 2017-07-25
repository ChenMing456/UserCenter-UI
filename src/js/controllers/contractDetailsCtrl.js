/**
 * Created by Domoke on 2017/7/6.
 */
"use strict";

app.controller('ContractDetailsCtrl', ['$scope', 'i18nService', '$http', '$stateParams', function($scope, i18nService, $http, $stateParams) {
    i18nService.setCurrentLang('zh-cn');
    var vm = this;
    //获取实际guid值。
    vm.guid = $stateParams.contract_guid;
    //根据guid值获取对应的属性值。
    $http.get('api/contracts_unaudit.json').then(function(resp) {
      var data = resp.data;
        vm.contractName = data.resources[0].entity.name;
        vm.contractType = data.resources[0].entity.type;
        vm.contractTpl = data.resources[0].entity.template;
        vm.contractAtta = data.resources[0].entity.attachment;
        vm.contractState = data.resources[0].entity.status;
        vm.message = vm.showMassage(data.resources[0].entity.status);
    });
    //显示处理状态信息。
    vm.showMassage = function(number) {
      var mess = "";
      if (number == 10) {
        mess = "待处理";
      }
      if (number == 20) {
        mess = "待审核";
      }
      if (number == 30) {
        mess = "已签订";
      }
      return mess;
    };
    // pdfViewer相关配置
    vm.showPdfViewer = false;
    $scope.pdfUrl = 'tpl/relativity.pdf';
    $scope.pdfPassword = 'test';
    $scope.scroll = 0;
    $scope.loading = '正在加载.....';
    $scope.onLoad = function() {
      $scope.loading = '';
    };

    vm.pdfPreview = function() {
      vm.showPdfViewer = true;
    }
  }
]);
