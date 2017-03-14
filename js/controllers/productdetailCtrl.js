
/*
 * @Author- Hiamnshu Gupta
 * Date-Mar11, 2017
 * Change-History
 * Purpose- file responsible for product related info
 */

//controller for product Page
app.controller('productdetailCtrl', function ($scope,userServices,$timeout,cookieServices,$location) {
//check if admin is already logged in
    if(cookieServices.get('user') !== undefined){
      var product_url = ($location.url()).split('/');
      var product_slug = product_url[product_url.length - 1];
      $scope.quantRange = [1,2,3,4,5,6,7,8,9,10];
      $scope.quant = $scope.quantRange[0];
      //function to get product detail
      $scope.get_product_detail = function(product_slug){
        userServices.get_product_by_slug(product_slug)
          .then(function(response){
            if(response.data.status === 200 && response.data.success === true){
              $scope.product_info = response.data.data[0];
              $scope.product_price = response.data.data[0].product_price;
              if($scope.product_info.product_stock > 0){
                $scope.isOrderable = true;
              }
            }else if(response.data.status === 201){
              $location.path( "/404" );
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
      //function to get order product_price
    $scope.get_order_price = function(){
      if($scope.product_info.product_stock >= $scope.quant){
          $scope.product_info.product_price = $scope.product_price * $scope.quant;
          $scope.isOrderable = true;
      }else{
        $scope.isOrderable = false;
        $scope.alert =
          { type: 'danger', msg: 'Stock does not have that quantity' };
          $timeout($scope.closeAlert,4000);
      }
    }
      //function to check order if it is valid order or
    $scope.order = function(){
      var d = new Date();
      var hour = d.getHours();
      console.log(hour);
      if($scope.product_info.meal_serving_type == 'breakfast' && hour >= 7){
        $scope.alertHide = true;
        $scope.alert =
          { type: 'danger', msg: 'OOps Time up, breakfast over' };
          $timeout($scope.closeAlert,4000);
      }else if ($scope.product_info.meal_serving_type == 'lunch' && hour >= 12){
        $scope.alertHide = true;
        $scope.alert =
          { type: 'danger', msg: 'OOps Time up, Launh over' };
          $timeout($scope.closeAlert,4000);
        }else if($scope.product_info.meal_serving_type == 'dinner' && hour >= 21){
          $scope.alertHide = true;
          $scope.alert =
            { type: 'danger', msg: 'OOps Time up, Sleep Now Good nt' };
            $timeout($scope.closeAlert,4000);
          }else{
            var requestData = {
              product_id : $scope.product_info.id,
              price:$scope.product_info.product_price,
              quantity:$scope.quant,
              product_stock : $scope.product_info.product_stock - $scope.quant
            }
            userServices.order_food(requestData)
              .then(function(response){
                if(response.data.status === 200 && response.data.success === true){
                  $scope.alertHide = true;
                  $scope.product_info.product_stock = $scope.product_info.product_stock - $scope.quant;
                  $scope.alert =
                  { type: 'success', msg: 'Order created successfully, its on way' };
                  $timeout($scope.closeAlert,4000);
                }else if(response.data.status === 201){
                  $location.path( "/404" );
                }else{
                  $scope.alertHide = true;
                  $scope.alert =
                    { type: 'danger', msg: response.data.message };
                    $timeout($scope.closeAlert,4000);
                  }
              })
              .catch(function(err){
              });
          }
    }
    //function to close alert box
      $scope.closeAlert = function(index) {
        $scope.alertHide = false;
    };
    $scope.get_product_detail(product_slug);
    }else{
      $location.path( "/users/sign_in" );
  }
});
