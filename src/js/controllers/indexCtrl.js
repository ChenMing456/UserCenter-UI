/**
 * Created by Domoke on 2017/7/18.
 */
"use strict";

app.controller('HeaderCtrl', ['$scope', '$http', '$modal', 'toaster', '$log', function ($scope, $http, $modal, toaster, $log) {

    var vm = this;

    vm.changePwd = function () {
        var modalInstance = $modal.open({
            backdrop: false,
            templateUrl: 'modal_user_change_pwd.html',
            controller: 'ChangePwdCtrl as vm'
        });

        modalInstance.result.then(function (result) {
            if(result === 'success') {
                return toaster.pop('success', '', '修改密码成功');
            }
            return toaster.pop('error', '', '修改密码失败');
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    return vm;
}]);

app.controller('ChangePwdCtrl', ['$scope', '$http', '$modalInstance', '$log', function ($scope, $http, $modalInstance, $log) {
    // 修改密码表单model
    var vm = this;

    vm.entity = {
        password:'',
        new_password:'',
        confirm_password:'',
        submitted: false
    };

    // w5c验证配置
    vm.validateOptions = {
        blurTrig: true
    };

    // 确定
    vm.ok = function (myForm) {
        myForm.$setDirty();
        // 防止重复提交
        vm.entity.submitted = true;
        $http.get('api/user_change_pwd.json').then(function (resp) {
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

