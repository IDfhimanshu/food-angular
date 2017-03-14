app.controller("ModalDialogController", function ($scope, $modalInstance,$rootScope,adminServices,$timeout,$route) {

  //function to update user detail
  $scope.update_product_detail = {};
  $scope.custom_meal_types = [
      {name:'starter'},
      {name:'main_course'},
      {name:'dessert'}
  ];
  $scope.custom_serving_types = [
      {name:'breakfast'},
      {name:'lunch'},
      {name:'dinner'}
  ];
  $scope.product_status = [
      {name:'active',value:true},
      {name:'inactive',value:false}
  ];
  $scope.update_product_detail.meal_type= $scope.custom_meal_types[0];
  $scope.update_product_detail.meal_serving_type= $scope.custom_serving_types[0];
  $scope.update_product_detail.product_status= $scope.product_status[0].value;
  $scope.update_user = function(user_data){
    var requestData = {
                  first_name: user_data.first_name,
                  last_name: user_data.last_name,
                  email: user_data.email,
                  mobile: user_data.mobile,
                  id: user_data.id
              }
    //call service admin sign up method
    adminServices.update_user(requestData)
      .then(function(response){
        if(response.data.status === 200 && response.data.success === true){
          $scope.alertHide = true;
          $scope.alert =
            { type: 'success', msg: 'User updated successfully' };
            $timeout($scope.closeAlert,4000);
            $route.reload();
        }else if (response.data.status === 203 && response.data.success === false) {
          $scope.alertHide = true;
          $scope.alert =
            { type: 'danger', msg: 'Email id already exists' };
            $timeout($scope.closeAlert,4000);
        }else{
          $scope.alertHide = true;
          $scope.alert =
            { type: 'danger', msg: response.data.message };
            $timeout($scope.closeAlert,4000);
          }
      })
      .catch(function(err){
      });
  };
  //function to update product detail
  $scope.update_product = function(product,product_drop){

    var requestData = {
                  product_id : product.id,
                  product_name: product.product_name,
                  product_sku: product.product_sku,
                  product_stock: product.product_stock,
                  product_price: product.product_price,
                  product_desc: product.product_desc,
                  active:product_drop.product_status,
                  meal_type: product_drop.meal_type.name,
                  meal_serving_type: product_drop.meal_serving_type.name
              }
    //call service admin sign up method
    adminServices.update_product(requestData)
      .then(function(response){
        if(response.data.status === 200 && response.data.success === true){
          $scope.alertHide = true;
          $scope.alert =
            { type: 'success', msg: 'product updated successfully' };
            $timeout($scope.closeAlert,4000);
            $route.reload();
        }else{
          $scope.alertHide = true;
          $scope.alert =
            { type: 'danger', msg: response.data.message };
            $timeout($scope.closeAlert,4000);
          }
      })
      .catch(function(err){
      });
  };
  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
  $scope.closeAlert = function(index) {
    $scope.alertHide = false;
};
});
