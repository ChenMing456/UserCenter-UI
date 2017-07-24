/**
 * Created by Domoke on 2017/7/9.
 */
"use strict";

app.controller('AppVersionAddCtrl', ['$scope', 'i18nService', '$http', function ($scope, i18nService, $http) {
    var vm = this

    vm.uploader = new FileUploader({
        url: 'js/controllers/upload.php'
    });

    vm.uploader.filters.push({
        name: 'customFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            return this.queue.length < 2;
        }
    });

    // uploader回调监听
    vm.uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        console.info('onWhenAddingFileFailed', item, filter, options);
    };
    vm.uploader.onAfterAddingFile = function(fileItem) {
        console.info('onAfterAddingFile', fileItem);
    };
    vm.uploader.onAfterAddingAll = function(addedFileItems) {
        console.info('onAfterAddingAll', addedFileItems);
    };
    vm.uploader.onBeforeUploadItem = function(item) {
        console.info('onBeforeUploadItem', item);
    };
    vm.uploader.onProgressItem = function(fileItem, progress) {
        console.info('onProgressItem', fileItem, progress);
    };
    vm.uploader.onProgressAll = function(progress) {
        console.info('onProgressAll', progress);
    };
    vm.uploader.onSuccessItem = function(fileItem, response, status, headers) {
        console.info('onSuccessItem', fileItem, response, status, headers);
    };
    vm.uploader.onErrorItem = function(fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
    };
    vm.uploader.onCancelItem = function(fileItem, response, status, headers) {
        console.info('onCancelItem', fileItem, response, status, headers);
    };
    vm.uploader.onCompleteItem = function(fileItem, response, status, headers) {
        console.info('onCompleteItem', fileItem, response, status, headers);
    };
    vm.uploader.onCompleteAll = function() {
        console.info('onCompleteAll');
    };

    vm.entity = {
        name:'',
        intro:'',
        price_type:1,
        selling_price:999,
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