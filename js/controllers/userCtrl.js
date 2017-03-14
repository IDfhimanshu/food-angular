/*
 * @Author- Hiamnshu Gupta
 * Date-Mar11, 2017
 * Change-History
 * Purpose- file responsible user login and signup
 */

//controller for user login Page
app.controller('userCtrl', function ($scope,$http,userServices,$timeout,cookieServices,$location,Upload) {
//check if admin is already logged in
if(cookieServices.get('user') !== undefined){
    $location.path( "/home" );
}else{
$scope.user_img_url = '';
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
        $scope.user_img_url = resp.data.url;
    });
  };
//function to register admin
$scope.userRegistration = function(sign_up){
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
                  profile_url: $scope.user_img_url,
                  mobile: sign_up.mobile,
                  password: sign_up.password,
              }
    //call service admin sign up method
    userServices.sign_up(requestData)
      .then(function(response){
        if(response.data.status === 200 && response.data.success === true){
          $scope.alertHide = true;
          $scope.alert =
            { type: 'success', msg: 'user Signed up successfully' };
            $timeout($scope.closeAlert,4000);
            cookieServices.set('user',response.data);
            $location.path( "/home" );
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
//function to login user
$scope.userLogin = function(login){
  var requestData = {
                email: login.email,
                password: login.password,
            }
  //call service admin sign up method
  userServices.sign_in(requestData)
    .then(function(response){
      if(response.data.status === 200 && response.data.success === true){
          cookieServices.set('user',response.data);
          $location.path( "/home" );
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
