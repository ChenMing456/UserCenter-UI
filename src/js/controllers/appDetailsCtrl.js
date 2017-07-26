/**
 * Created by Domoke on 2017/7/6.
 */
"use strict";

app.controller('AppDetailsCtrl', ['$scope', 'i18nService', '$http','$state','$stateParams', function ($scope, i18nService, $http,$state,$stateParams) {
    var vm = this;
    vm.appGuid = $stateParams.app_guid;
    vm.appDetail = {
        name : "",
        simple_name : "",
        intro : "",
        description_imgs : "",
        description_text : "",
        type : "",
        category : "",
        logo : ""
    }

    //查询应用信息详情
    var getAppDetail = function () {

    }

    //加载应用详情
    getAppDetail();

    //修改应用信息详情
    var postAppDetail = function () {

    }


}]);

app.controller('AppComponentCtrl', ['$scope', 'i18nService', '$http', '$modal', 'toaster', '$log', function ($scope, i18nService, $http, $modal, toaster, $log) {
    i18nService.setCurrentLang('zh-cn');

    var optCellTemplate = '<div class="ui-grid-cell-contents btn-group">' +
        '<button type="button" class="btn btn-sm btn-success" ng-click="grid.appScope.downloadComponent(row.entity)"><i class="fa fa-download fa-fw"></i>下载</button>' +
        '<button type="button" class="btn btn-sm btn-danger" ng-click="grid.appScope.deleteComponent(row.entity)"><i class="fa fa-trash-o fa-fw"></i>删除</button>' +
        '</div>';

    var vm = this;
    vm.gridOptionsComponent = {
        enableHorizontalScrollbar: 0, //grid水平滚动条是否显示, 0-不显示  1-显示
        paginationPageSize: 10,
        paginationPageSizes: [10, 20, 50, 100],
        rowHeight: 46,
        columnDefs: [
            { name: 'name', enableFiltering: false, displayName: '名称' },
            { name: 'version', enableFiltering: false, displayName: '版本' },
            { name: 'remarks', enableFiltering: false, displayName: '说明' },
            { name: 'create_time', enableFiltering: false, displayName: '创建时间' },
            { name: 'guid', enableFiltering:false, displayName:'操作', cellTemplate:optCellTemplate}
        ],
        data: []
    };

    // 获取资源信息
    var getComponents = function () {
        vm.components = [];
        $http.get('api/app_components.json').then(function (resp) {
            var data = resp.data;
            for(var i in data.resources) {
                vm.components.push({
                    guid:data.resources[i].metadata.guid,
                    create_time:data.resources[i].metadata.created_at,
                    name:data.resources[i].entity.name,
                    version:data.resources[i].entity.version,
                    remarks :data.resources[i].entity.remarks,
                    attachment:data.resources[i].entity.attachment,
                });
            }
            vm.gridOptionsComponent.data = vm.components;
        });
    };

    // 首次加载
    getComponents();

    // 刷新grid
    vm.refreshGrid = function () {
        getComponents();
    };

    vm.addComponent = function () {
        var modalInstance = $modal.open({
            backdrop: false,
            templateUrl: 'modal_component_add.html',
            controller: 'AddComponentCtrl as cpt',
            resolve: {
                deps: ['$ocLazyLoad',
                    function( $ocLazyLoad){
                        return $ocLazyLoad.load('angularFileUpload');
                    }]
            }
        });

        modalInstance.result.then(function (result) {
            if(result === 'success') {
                return toaster.pop('success', '', '新增应用组件成功');
            }
            return toaster.pop('error', '', '新增应用组件失败');
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    // 搜索
    $scope.$watch('searchComponent', function (newVal, oldVal) {
        if (newVal === oldVal)
            return;
        vm.gridOptionsComponent.data = vm.components.filter(function (data) {
            if (data.name) {
                if (data.name.toLowerCase().indexOf($scope.searchComponent.toLowerCase()) > -1) {
                    return true;
                }
                else {
                    return false;
                }
            }
        });
    });
}]);

app.controller('AddComponentCtrl', ['$scope', '$http', '$modalInstance', '$modal', 'toaster', '$log', 'FileUploader', function ($scope, $http, $modalInstance, $modal, toaster, $log, FileUploader) {
    // 新增应用组件model
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
        version:'',
        attachment:'',
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

app.controller('AppVersionCtrl', ['$scope', 'i18nService', '$http', function ($scope, i18nService, $http) {
    i18nService.setCurrentLang('zh-cn');

    var optCellTemplate = '<div class="ui-grid-cell-contents btn-group">' +
        '<button type="button" class="btn btn-sm btn-success" ng-click="grid.appScope.soldOn(row.entity)"><i class="fa fa-pencil-square-o fa-fw"></i>发布</button>' +
        '<button type="button" class="btn btn-sm btn-warning" ng-click="grid.appScope.soldOut(row.entity)"><i class="fa fa-pencil-square-o fa-fw"></i>下架</button>' +
        '<button type="button" class="btn btn-sm btn-default" ng-click="grid.appScope.editVersion(row.entity)"><i class="fa fa-pencil-square-o fa-fw"></i>编辑</button>' +
        '<button type="button" class="btn btn-sm btn-danger" ng-click="grid.appScope.deleteVersion(row.entity)"><i class="fa fa-trash-o fa-fw"></i>删除</button>' +
        '</div>';

    var vm = this;
    vm.gridOptionsVersion = {
        enableHorizontalScrollbar: 0, //grid水平滚动条是否显示, 0-不显示  1-显示
        paginationPageSize: 10,
        paginationPageSizes: [10, 20, 50, 100],
        rowHeight: 46,
        columnDefs: [
            { name: 'name', enableFiltering: false, displayName: '版本号' },
            { name: 'create_time', enableFiltering: false, displayName: '创建时间' },
            { name: 'selling_price', enableFiltering: false, displayName: '销售价格(￥)' },
            { name: 'sold_count', enableFiltering: false, displayName: '已售数量' },
            { name: 'guid', enableFiltering:false, displayName:'操作', cellTemplate:optCellTemplate, width:300}
        ],
        data: []
    };

    // 获取资源信息
    var getVersions = function () {
        vm.versions = [];
        $http.get('api/app_versions.json').then(function (resp) {
            var data = resp.data;
            for(var i in data.resources) {
                vm.versions.push({
                    guid:data.resources[i].metadata.guid,
                    create_time:data.resources[i].metadata.created_at,
                    name:data.resources[i].entity.name,
                    intro:data.resources[i].entity.intro,
                    selling_price :data.resources[i].entity.selling_price,
                    sold_count:data.resources[i].entity.sold_count,
                    app_guid:data.resources[i].app.guid,
                    app_name:data.resources[i].app.name,
                });
            }
            vm.gridOptionsVersion.data = vm.versions;
        });
    };

    // 首次加载
    getVersions();

    // 刷新grid
    vm.refreshGrid = function () {
        getVersions();
    }

    // 搜索
    $scope.$watch('searchVersion', function (newVal, oldVal) {
        if (newVal === oldVal)
            return;
        vm.gridOptionsVersion.data = vm.versions.filter(function (data) {
            if (data.name) {
                if (data.name.toLowerCase().indexOf($scope.searchVersion.toLowerCase()) > -1) {
                    return true;
                }
                else {
                    return false;
                }
            }
        });
    });
}]);

app.controller('AppCommentCtrl', ['$scope', 'i18nService', '$http','$state','$stateParams', function ($scope, i18nService, $http,$state,$stateParams) {
    var vm = this;
    vm.appGuid = $stateParams.app_guid;
    vm.comments = [];

    //查询应用评价
    var getAppComments = function (appGuid) {
        vm.comments = [];
        $http.get('api/app_comments.json').then(function (resp) {
            var data = resp.data;
            angular.forEach(data.resources,function (app_comment) {
                var commentInfo = {
                    guid:app_comment.metadata.guid,
                    user_guid:app_comment.entity.user_guid,
                    star:app_comment.entity.star,
                    comment:app_comment.entity.comment,
                    create_time:app_comment.metadata.created_at,
                }
                vm.comments.push(commentInfo);
            })
        })
    }

    //加载应用评价
    getAppComments(vm.appGuid);


}]);