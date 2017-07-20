/**
 * Created by Domoke on 2017/7/6.
 */
 "use strict";

 app.controller('InstanceDetailsCtrl', ['$scope', 'i18nService', '$http', '$stateParams',function ($scope, i18nService, $http,$stateParams) {
    //var instance_guid=$stateParams.instance_guid;
    $http.get('api/instances.json').then(function(resp){
      var data=resp.data;
      $scope.host=data.resources[0].entity.host;
      $scope.port=data.resources[0].entity.port;
      $scope.cpu=data.resources[0].entity.cpu;
      $scope.memory=data.resources[0].entity.memory;
      $scope.disk=data.resources[0].entity.disk;
      $scope.quota_memory=data.resources[0].entity.quota_memory;
      $scope.quota_disk=data.resources[0].entity.quota_disk;
      $scope.run_time=data.resources[0].entity.run_time;
      $scope.status=data.resources[0].entity.status;
      $scope.user_guid=data.resources[0].user.guid;
      $scope.user_name=data.resources[0].user.user_name;
      $scope.nick_name=data.resources[0].user.nick_name;
      $scope.app_guid=data.resources[0].app.guid;
      $scope.app_name=data.resources[0].app.name;
      $scope.latest_version=data.resources[0].app.latest_version;
      $scope.component_guid=data.resources[0].component.guid;
      $scope.component_name=data.resources[0].component.name;
      $scope.component_version=data.resources[0].component.version;
      $scope.content=data.resources[0].entity.content;
      $scope.created_at=data.resources[0].metadata.created_at;
    })


  }]);
 app.controller('LogShareCtrl', ['$scope', 'i18nService', '$http', '$modal',function ($scope, i18nService, $http,$modal) {
  i18nService.setCurrentLang('zh-cn');

  var optCellTemplate = '<div class="ui-grid-cell-contents btn-group">' +
  '<button type="button" class="btn btn-sm btn-success" ng-click="grid.appScope.openModal()"><i class="icon-share-alt"></i>分享</button>' +
  '</div>';

  var vm = this;
  vm.gridOptionsLog = {
        enableHorizontalScrollbar: 0, //grid水平滚动条是否显示, 0-不显示  1-显示
        paginationPageSize: 10,
        paginationPageSizes: [10, 20, 50, 100],
        rowHeight: 46,
        columnDefs: [
        { name: 'instance_guid', enableFiltering: false, displayName: '实例ID' },
        { name: 'title', enableFiltering: false, displayName: '日志的标题' },
        { name: 'start_time', enableFiltering: false, displayName: '起始时间' },
        { name: 'end_time', enableFiltering: false, displayName: '结束时间' },
        { name: 'guid', enableFiltering:false, displayName:'操作', cellTemplate:optCellTemplate}
        ],
        data: []
      };

    // 获取资源信息
    var getLogs = function () {
      vm.logs = [];
      $http.get('api/instances.json').then(function (resp) {
        var data = resp.data;
        for(var i in data.resources) {
          vm.logs.push({
            instance_guid:data.resources[i].entity.instance_guid,
            title:data.resources[i].entity.title,
            start_time:data.resources[i].entity.start_time,
            end_time:data.resources[i].entity.end_time,
            guid:data.resources[i].metadata.guid,
          });
        }
        vm.gridOptionsLog.data = vm.logs;
      });
    };

    // 首次加载
    getLogs();

    // 重置grid
    vm.reset = function () {
   // alert("11");
   vm.log_s_time='';
   vm.log_e_time='';
   getLogs();
 };

   
    //根据起始时间查询分享列表
    vm.search=function () {
      if(vm.log_s_time&&vm.log_e_time){
        var log_s_time_date=new Date(vm.log_s_time).getTime();
        var log_e_time_date=new Date(vm.log_e_time).getTime();
        vm.gridOptionsLog.data=vm.logs.filter(function(data){
          if(data.start_time&&data.end_time){
            var start_time_date=new Date(data.start_time.split(' ')[0]).getTime();
            var end_time_date=new Date(data.end_time.split(' ')[0]).getTime();
            console.log(log_e_time_date);
            if(start_time_date>log_s_time_date && end_time_date<log_e_time_date){
              return true;
            }else{
              return false;
            }
          }
        });
      }else{
        getLogs();
        return;
      }
    };
    



    $scope.openModal = function (size) {
      var modalInstance = $modal.open({
        templateUrl: 'tpl/instance/modal_instance_logs_share.html',
        controller: 'ModalInstanceCtrl',
        size: size
      });
    };
    
  }]);

 app.controller('DatepickerDemoCtrl', ['$scope', function($scope) {
  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
      return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1,
      class: 'datepicker'
    };

    $scope.initDate = new Date('2016-15-20');
    $scope.formats = ['yyyy-MM-dd','dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
  }]); 




 app.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', function($scope, $modalInstance) {


  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]); 