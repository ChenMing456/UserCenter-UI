/**
 * Created by Domoke on 2017/7/6.
 */
"use strict";

app.controller('ContractDetailsCtrl', ['$scope', 'i18nService', '$http','$stateParams',function ($scope, i18nService, $http,$stateParams) {
    i18nService.setCurrentLang('zh-cn');
    var vm = this;
    //获取实际guid值。
    vm.guid=$stateParams.contract_guid;
    //根据guid值获取对应的属性值。
    $http.get('api/contracts_unaudit.json').then(function (resp) {
            var data = resp.data;
            for(var i in data.resources){
            vm.contractName=data.resources[i].entity.name;
            vm.contractType=data.resources[i].entity.type;
            vm.contractTpl=data.resources[i].entity.template;
            vm.contractAtta=data.resources[i].entity.attachment;
            vm.contractState=data.resources[i].entity.status;
            vm.message=vm.showMassage(data.resources[i].entity.status);
        }
    });
    //显示处理状态信息。
    vm.showMassage=function(number){
        var mess="";
        if(number==10){
            mess="待处理";
        }
        if(number==20){
            mess="待审核";
        }
        if(number==30){
            mess="已签订";
        }
          return mess;
    };
}]);
