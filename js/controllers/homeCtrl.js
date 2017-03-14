
/*
 * @Author- Hiamnshu Gupta
 * Date-Mar11, 2017
 * Change-History
 * Purpose- file responsible for home controller
 */

//controller for home Page

app.controller('homeCtrl', function ($scope,$http,$timeout,cookieServices,adminServices,$location,$route) {
    //function for getting all the data of food
    //check if admin is already logged in
        if(cookieServices.get('user') !== undefined){
          $scope.filter = 'meal_serving_type';
          $scope.arrangment = true;
          let offset = 0;
          let page = $location.search().page;
          $scope.itemsPerPage = 5;
          if(page !== undefined && typeof page === 'string'){
            $scope.currentpage = page;
          }else{
            $scope.currentpage = 1;
          }
          $scope.pagination = {
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

          $scope.userPageChanged = function() {
            $location.url($location.path() + "/?page=" + $scope.pagination.currentpage);
          };
          $scope.stateChanged = function(value,type){
            $scope.filter = value;
            $scope.arrangment = type;
          };
          $scope.closeAlert = function(index) {
            $scope.alertHide = false;
        };
        }else{
          $location.path('/')
        }
});
