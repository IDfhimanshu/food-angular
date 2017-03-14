
/*
 * @Author- Hiamnshu Gupta
 * Date-Mar11, 2017
 * Change-History
 * Purpose- file responsible Admin login and signup
 */

//controller for home Page
app.controller('adminCreateProductCtrl', function ($scope,$http,adminServices,$timeout,cookieServices,$location,Upload) {
//check if admin is already logged in
    if(cookieServices.get('admin') !== undefined){
      $scope.product_img_url = '';
      //function to create products
      $scope.product = {};
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
      $scope.product.meal_type= $scope.custom_meal_types[0];
      $scope.product.meal_serving_type= $scope.custom_serving_types[0];
      $scope.create_product = function(product){
          //get data
          var requestData = {
                        product_name: product.product_name,
                        product_sku: product.product_sku,
                        product_stock: product.product_stock,
                        product_price: product.product_price,
                        product_desc: product.product_desc,
                        product_image:$scope.product_img_url,
                        meal_type: product.meal_type.name,
                        meal_serving_type: product.meal_serving_type.name
                    }
          //call service admin sign up method
          adminServices.create_product(requestData)
            .then(function(response){
              if(response.data.status === 200 && response.data.success === true){
                $scope.alertHide = true;
                $scope.alert =
                  { type: 'success', msg: 'product created successfully' };
                  $timeout($scope.closeAlert,4000);
                  $location.path( "/server/admin/products" );
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
      //function to close alert box
      $scope.closeAlert = function(index) {
        $scope.alertHide = false;
    };
    $scope.upload = function() {
      if ($scope.file) {
        $scope.uploadFile($scope.file);
      }
    };
    //function to upload file
    $scope.uploadFile = function (file) {
        Upload.upload({
          url: "https://api.cloudinary.com/v1_1/dogfjkjzi/upload",
          data: {
            upload_preset: 'gmn9sble',
            file: file
          }
        }).then(function (resp) {
          $scope.alertHide = true;
          $scope.alert =
            { type: 'success', msg: 'Image uploaded successfully' };
            $timeout($scope.closeAlert,4000);
            $scope.product_img_url = resp.data.url;
        });
      };
      $scope.closeAlert = function(index) {
        $scope.alertHide = false;
    };
    }else{
      $location.path( "/server/admin/login" );
  }
});
