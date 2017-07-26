/**
 * Created by Domoke on 2017/7/8.
 */
"use strict";
app.config(["w5cValidatorProvider", function (w5cValidatorProvider) {
    // 全局配置
    w5cValidatorProvider.config({
        blurTrig:true,
        showError:function(elem,errorMessage){
            elem.$invalid = true;
            console.log(errorMessage);
            elem.title = errorMessage;
        },
        removeError:function (elem) {
            elem.title = ''
        }
    });
    w5cValidatorProvider.setRules({
        company_name:{
            required:"请输入公司全称",
            minlength:"请输入正确的名字，不能少于{minlength}字"
        },
        company_website:{
            required:"请输入公司网址",
            url:"输入url格式不正确"
        },
        company_introduction:{
            required:"请输入公司介绍",
            maxlength:"描述最多不能超过{maxlength}字"
        },
        company_address:{
            required:"请输入公司地址",
            maxlength:"地址不要超过{maxlength}字"
        },
        linkman:{
            required:"请输入联系人",
            minlength:"请输入正确姓名，至少{minlength}个字",
            maxlength:"请不要输入过多的姓名，至多{maxlength}字"
        },
        contact_number:{
            required:"请输入联系方式（手机号码）",
            number:"请输入数字手机号码",
            minlength:"请输入正确的号码，不少于{minlength}位"
        },
        corporate_account_bank:{
            required:"请输入开户银行"
        },
        coporate_account_name:{
            required:"请输入开户名",
            minlength:"请输入正确姓名,不少于{minlength}字"
        },
        coporate_account_number:{
            required:"请输入对公账号",
            number:"请输入数字对公账号"
        },
        company_reg_name:{
            required:"请输入企业注册名称",
            minlength:"请输入正确的注册姓名，不得少于{minlength}字"
        },
        business_license_number:{
            required:"请输入工商营业执照注册号",
            number:"请输入数字注册号"
        }
    })
}]);
app.controller('SpApplyCtrl', ['$scope', 'i18nService', '$http', function ($scope, i18nService, $http) {
    var vm = this;

    $scope.is_finish = false;
    $scope.ConfSubmit = function(){
        $scope.is_finish = true;
    }
}]);