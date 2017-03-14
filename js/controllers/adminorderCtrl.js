
/*
 * @Author- Hiamnshu Gupta
 * Date-Mar11, 2017
 * Change-History
 * Purpose- file responsible for product related info
 */

//controller for product Page
app.controller('adminorderCtrl', function ($scope,adminServices,$timeout,cookieServices,$location,$route) {
//check if user is already logged in
if(cookieServices.get('admin') !== undefined){
  let offset = 0;
  let page = $location.search().page;
  $scope.itemsPerPage = 5;
  if(page !== undefined && typeof page === 'string'){
    $scope.currentpage = page;
  }else{
    $scope.currentpage = 1;
  }
  $scope.adminorderpagination = {
      currentpage:  $scope.currentpage
  };
  $scope.maxSize = 5; //Number of pager buttons to show
  //function to get all products
  //get user's order
  $scope.get_all_order = function(){
    if(page !== undefined){
      offset = (page-1)*5;
    }
      adminServices.get_all_order(offset)
        .then(function(response){

          if(response.data.status === 200 && response.data.success === true){
            $scope.orders = response.data.data.orders;
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
    //function to cancel order
    $scope.cancel_order = function(order_id){
      adminServices.cancel_order(order_id)
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
    };
    //function to mark complete order
    $scope.complete_order = function(order_id){
      adminServices.complete_order(order_id)
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
    };
  //call get products function
  $scope.get_all_order();
  //function for pagination
$scope.filterOrder = function(filter){
  $scope.filterVal = filter;
  if(filter == 'all'){
    $scope.isFilterable = false;
    $scope.filterExpr = { status: '' };
  }else{
    $scope.isFilterable = true;
    $scope.filterExpr = { status: $scope.filterVal };
  }
}
  $scope.adminorderChanged = function() {
    $location.url($location.path() + "/?page=" + $scope.adminorderpagination.currentpage);
  };
  $scope.setPage = function () {
  };
  $scope.closeAlert = function(index) {
    $scope.alertHide = false;
};
}else{
  $location.path( "/server/user/login" );
}
});
