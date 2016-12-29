/**
* formApp Module
*
* Description
*/
angular.module('formApp', [])
  .controller('validataController', ['$scope', function($scope){
    $scope.user={};
    $scope.doRegister = function(data){
      if(data){
        alert("注册成功！");
      }
    }
  }])
  //自定义一个密码校验指令
  .directive('pwdRepeat', [ function(){
    return {
      require: 'ngModel', 
      restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
      link: function($scope, iElm, iAttrs, ctrl) {
        ctrl.$validators.pwdRepeat = function(modelValue){
          return modelValue === $scope.user.password?true : false;
        }
      }
    };
  }])
  //自定义一个用户名是否被注册指令
  .directive('userName', ['$q','$http',function($q,$http){
    return {
      require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
      restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
      link: function($scope, iElm, iAttrs, ctrl) {
        ctrl.$asyncValidators.userName = function(modelValid){
          var d = $q.defer();
          //获取数据
          $http.get('http://localhost:3200/api/***/***')
            .then(function successCallback(obj){
              //假设返回来的是一个数组[{name:"张山"},{name:"李四"}]
              var data = obj.data;
              //遍历数据，如果data[i].name与modelValid相等，那就已被注册
              for(var i = 0 ; i<data.length; i++){
                if(data[i].name === modelValid){
                    console.log("正点");
                    var c = true;
                    return d.reject();  
                }
              }
              if(!c){
                d.resolve();
              }
            },function errorCallback(obj){
              console.log("Dfdf");
          });
          return d.promise; 
        }
      }
    };
  }]);
 