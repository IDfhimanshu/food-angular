
/*
 * @Author- Hiamnshu Gupta
 * Date-Mar11, 2017
 * Change-History
 * Purpose- file responsible for product related info
 */

//controller for product Page
app.controller('orderCtrl', function ($scope,userServices,$timeout,cookieServices,$location) {
//check if user is already logged in
if(cookieServices.get('user') !== undefined){
  let offset = 0;
  let page = $location.search().page;
  $scope.itemsPerPage = 5;
  if(page !== undefined && typeof page === 'string'){
    $scope.currentpage = page;
  }else{
    $scope.currentpage = 1;
  }
  $scope.orderpagination = {
      currentpage:  $scope.currentpage
  };
  $scope.maxSize = 5; //Number of pager buttons to show
  //function to get all products
  $scope.products = {};
  //get user's order
  $scope.get_users_order = function(){
    if(page !== undefined){
      offset = (page-1)*5;
    }
      userServices.get_users_order(offset)
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
  //call get products function
  $scope.get_users_order();
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
  $scope.orderChanged = function() {
    $location.url($location.path() + "/?page=" + $scope.orderpagination.currentpage);
  };
  $scope.setPage = function () {
  };
  $scope.closeAlert = function(index) {
    $scope.alertHide = false;
};
}else{
  $location.path( "/users/sign_in" );
}
});
