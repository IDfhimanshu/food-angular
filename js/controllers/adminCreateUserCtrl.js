
/*
 * @Author- Hiamnshu Gupta
 * Date-Mar11, 2017
 * Change-History
 * Purpose- file responsible Admin login and signup
 */

//controller for home Page
app.controller('adminCreateUserCtrl', function ($scope,$http,adminServices,$timeout,cookieServices,$location) {
//check if admin is already logged in
    if(cookieServices.get('admin') !== undefined){
      //function to create users
      $scope.create_user = function(user){
        if(user.password !== user.confirm_password){
          $scope.alertHide = true;
          $scope.alert =
            { type: 'danger', msg: 'Password and Confirm Password does not match' };
            $timeout($scope.closeAlert,4000);
        }else{
          //get data
          var requestData = {
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        mobile: user.mobile,
                        password: user.password,
                        created_by: 'admin'
                    }
          //call service admin sign up method
          adminServices.create_user(requestData)
            .then(function(response){
              if(response.data.status === 200 && response.data.success === true){
                $scope.alertHide = true;
                $scope.alert =
                  { type: 'success', msg: 'User created successfully' };
                  $timeout($scope.closeAlert,4000);
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
      //function to close alert box
      $scope.closeAlert = function(index) {
        $scope.alertHide = false;
    };
    }else{
      $location.path( "/server/admin/login" );
  }
});
