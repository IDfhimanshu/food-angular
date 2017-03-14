/*
 * @Author- Hiamnshu Gupta
 * Date-Mar11, 2017
 * Change-History
 * Purpose- file responsible nav bar controller
 */

//controller for header bar
app.controller('navbarCtrl', function ($scope,$http,$location,$timeout,cookieServices) {
  //function to sign out as admin
    $scope.sign_out_admin = function(){
      //remove admin cookies
      cookieServices.destroy('admin');
      $location.path("/server/admin/login");
    }

    //function to sign out as login
    $scope.sign_out_user  = function(){
      //remove admin cookies
      cookieServices.destroy('user');
      $location.path("/users/sign_in");
    }
});
