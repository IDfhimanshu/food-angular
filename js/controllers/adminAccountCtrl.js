
/*
 * @Author- Hiamnshu Gupta
 * Date-Mar11, 2017
 * Change-History
 * Purpose- file responsible Admin login and signup
 */

//controller for home Page
app.controller('adminAccountCtrl', function ($scope,$http,adminServices,$timeout,cookieServices,$location) {
//check if admin is already logged in
    if(cookieServices.get('admin') !== undefined){
        $location.path( "/server/admin/users" );
    }else{
    $scope.loginForm = true;
    //function to hide and show sign up form
    $scope.show_login = function(){
      //check for form and opposite open
      if($scope.loginForm === true){
        $scope.loginForm = false;
      }else{
        $scope.loginForm = true;
      }
    }
    //function to register admin
    $scope.adminRegistration = function(sign_up){
      if(sign_up.password !== sign_up.confirm_password){
        $scope.alertHide = true;
        $scope.alert =
          { type: 'danger', msg: 'Password and Confirm Password does not match' };
          $timeout($scope.closeAlert,4000);
      }else{
        //get data
        var requestData = {
                      first_name: sign_up.first_name,
                      last_name: sign_up.last_name,
                      email: sign_up.email,
                      mobile: sign_up.mobile,
                      password: sign_up.password,
                  }
        //call service admin sign up method
        adminServices.sign_up(requestData)
          .then(function(response){
            if(response.data.status === 200 && response.data.success === true){
              $scope.alertHide = true;
              $scope.alert =
                { type: 'success', msg: 'Admin Signed up successfully' };
                $timeout($scope.closeAlert,4000);
                cookieServices.set('admin',response.data);
                $location.path( "/server/admin/users" );
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
      }
    };
    //function to register admin
    $scope.adminLogin = function(login){

      var requestData = {
                    email: login.email,
                    password: login.password,
                }
      //call service admin sign up method
      adminServices.sign_in(requestData)
        .then(function(response){
          if(response.data.status === 200 && response.data.success === true){
              cookieServices.set('admin',response.data);
              $location.path( "/server/admin/users" );
          }else if (response.data.status === 203 && response.data.success === false) {
            $scope.alertHide = true;
            $scope.alert =
              { type: 'danger', msg: 'Invalid Login Details' };
              $timeout($scope.closeAlert,4000);
          }else{
            $scope.alertHide = true;
            $scope.alert =
              { type: 'danger', msg: response.data.message };
              $timeout($scope.closeAlert,4000);
            }
        })
        .catch(function(err){
          $scope.alertHide = true;
          $scope.alert =
            { type: 'danger', msg: 'Something went wrong, please try again later' };
            $timeout($scope.closeAlert,4000);
        });
    }

    //function to close alert box
      $scope.closeAlert = function(index) {
        $scope.alertHide = false;
    };
  }
});
