/**
 * Created by ssy on 17/7/25.
 */
"use strict";

app.controller('AddCommentCtrl', ['$scope', 'i18nService', '$http', '$modalInstance', '$modal', 'toaster', function ($scope, i18nService, $http ,$modalInstance, $modal, toaster) {
// 新增应用组件model
    var vm = this;

    // w5c验证配置
    vm.validateOptions = {
        blurTrig: true
    };

    // 确定
    vm.ok = function (myForm) {
        myForm.$setDirty();
        // 防止重复提交
        vm.entity.submitted = true;
        $http.get('api/app_component_add.json').then(function (resp) {
            $modalInstance.close('success');
        }, function (err) {
            vm.entity.submitted = false;
        });
    }

    // 取消
    vm.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);