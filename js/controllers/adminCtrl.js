
/*
 * @Author- Hiamnshu Gupta
 * Date-Mar11, 2017
 * Change-History
 * Purpose- file responsible Admin login and signup
 */

//controller for home Page
app.controller('adminCtrl', function ($scope,$http,adminServices,$timeout,cookieServices,$rootScope,$location,$modal,$route) {
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
      $scope.pagination = {
          currentpage:  $scope.currentpage
      };
      $scope.maxSize = 5; //Number of pager buttons to show
      //function to get all users
      $scope.users = {};
      $scope.get_all_users = function(){
        if(page !== undefined){
          offset = (page-1)*5;
        }
          adminServices.get_all_users(offset)
            .then(function(response){
              if(response.data.status === 200 && response.data.success === true){
                $scope.users = response.data.data.users;
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
      $scope.create_user = function(){
        $location.path("/server/admin/users/create")
      };
      //call get users function
      $scope.get_all_users();
      //function for pagination

      $scope.pageChanged = function() {
        $location.url($location.path() + "/?page=" + $scope.pagination.currentpage);
      };
      $scope.setPage = function () {
      };
      //function to get user detail
      $scope.get_user = function(user_id){
        adminServices.get_user(user_id)
          .then(function(response){
            if(response.data.status === 200 && response.data.success === true){
              $rootScope.user_detail = response.data.data[0];
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
      //function to delete user
      $scope.delete_user = function(user_id){
        adminServices.delete_user(user_id)
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
      //update user, open modal
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
