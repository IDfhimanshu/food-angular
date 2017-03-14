
/*
 * @Author- Hiamnshu Gupta
 * Date-Mar11, 2017
 * Change-History
 * Purpose- file responsible for product related info by admin
 */

//controller for product Page
app.controller('productCtrl', function ($scope,$http,adminServices,$timeout,cookieServices,$rootScope,$location,$modal,$route) {
//check if admin is already logged in
    if(cookieServices.get('admin') !== undefined){
      let offset = 0;
      let page = $location.search().page;
      $scope.itemsPerPage = 5;
      if(page !== undefined && typeof page === 'string'){
        $scope.currentpage = page;
      }else{
        $scope.currentpage = 1;
      }
      $scope.prpagination = {
          currentpage:  $scope.currentpage
      };
      $scope.maxSize = 5; //Number of pager buttons to show
      //function to get all products
      $scope.products = {};
      $scope.get_all_products = function(){
        if(page !== undefined){
          offset = (page-1)*5;
        }
          adminServices.get_all_products(offset)
            .then(function(response){
              if(response.data.status === 200 && response.data.success === true){
                $scope.products = response.data.data.products;
                $scope.totalItems = response.data.data.count;
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
      $scope.create_product = function(){
        $location.path("/server/admin/products/create")
      };
      //call get products function
      $scope.get_all_products();
      //function for pagination

      $scope.prpageChanged = function() {
        $location.url($location.path() + "/?page=" + $scope.prpagination.currentpage);
      };
      $scope.setPage = function () {
      };
      //function to get product detail
      $scope.get_product = function(product_id){
        adminServices.get_product(product_id)
          .then(function(response){
            if(response.data.status === 200 && response.data.success === true){
              $rootScope.product_detail = response.data.data[0];
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
      //function to delte product
      $scope.delete_product = function(product_id){
        adminServices.delete_product(product_id)
          .then(function(response){
            if(response.data.status === 200 && response.data.success === true){
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
      $scope.closeAlert = function(index) {
        $scope.alertHide = false;
    };
      //update product, open modal
      $scope.showModal = function(){
        $modal.open({
              templateUrl: 'myModal.html',
              controller: 'ModalDialogController',
         })
        .result.then(
            function () {
            },
            function () {
            }
        );
      }
    }else{
      $location.path( "/server/admin/login" );
  }
});
