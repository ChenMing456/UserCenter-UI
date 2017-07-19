/**
 * Created by Domoke on 2017/7/6.
 */
"use strict";

app.controller('ContractDetailsCtrl', ['$scope', 'i18nService', '$http','$stateParams',function ($scope, i18nService, $http,$stateParams) {
    i18nService.setCurrentLang('zh-cn');
    var vm=this;
    console.log($stateParams.contract_guid);
    $scope.data={
        contractName:"",
        contractType:"",
        contractTpl:"",
        contractAtta:"",
        contractState:""
    };
    // 获取待审核合约信息

        $http.get('api/contracts_unfinished.json').then(function (resp) {
            var data = resp.data;
            for(var i in data.resources) {
                $scope.data.contractName=data.resources[i].entity.name;
                $scope.data.contractType=data.resources[i].entity.type;
                $scope.data.contractTpl=data.resources[i].entity.template;
                $scope.data.contractAtta=data.resources[i].entity.attachment;
                $scope.data.contractState=data.resources[i].entity.status;

            }
        });

    //vm.filter_opt = 1;
    //vm.filterContracts = function () {
    //    if(+vm.filter_opt === 1) {
    //        vm.getUnfinishedContracts();
    //    } else if(+vm.filter_opt === 2) {
    //        vm.getUnauditContracts();
    //    } else if(+vm.filter_opt === 3) {
    //        vm.getFinishedContracts();
    //    } else if(+vm.filter_opt === 4) {
    //        vm.getAllContracts();
    //    }
    //};
    //
    //// 首次加载
    //vm.filterContracts();
}]);
app.controller('ImgCropCtrl', ['$scope', function($scope) {
    $scope.myImage='';
    $scope.myCroppedImage='';
    $scope.cropType="circle";

    var handleFileSelect=function(evt) {
        var file=evt.currentTarget.files[0];
        var reader = new FileReader();
        reader.onload = function (evt) {
            $scope.$apply(function($scope){
                $scope.myImage=evt.target.result;
            });
        };
        reader.readAsDataURL(file);
    };
    angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
}]);