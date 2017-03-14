
/*
 * @Author- Hiamnshu Gupta
 * Date-Mar11, 2017
 * Change-History
 * Purpose- file responsible for profile controller
 */

//controller for profile Page
app.controller('profileCtrl', function ($scope,$http,cookieServices,userServices,$timeout,$location,$route) {
    //function for getting all the data of food
    //check if user is already logged in
        if(cookieServices.get('user') !== undefined){
          $scope.get_user = function(){
            userServices.get_user()
              .then(function(response){
                if(response.data.status === 200 && response.data.success === true){
                  $scope.user = response.data.data[0];
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
          $scope.update_user = function(user_data){
            var requestData = {
                          first_name: user_data.first_name,
                          last_name: user_data.last_name,
                          email: user_data.email,
                          mobile: user_data.mobile,
                          id: user_data.id
                      }
            //call service admin sign up method
            userServices.update_user(requestData)
              .then(function(response){
                if(response.data.status === 200 && response.data.success === true){
                  $scope.alertHide = true;
                  $scope.alert =
                    { type: 'success', msg: 'User updated successfully' };
                    $timeout($scope.closeAlert,4000);
                    $route.reload();
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
          };
          $scope.get_user();
          $scope.closeAlert = function(index) {
            $scope.alertHide = false;
        };
        }else{
            $location.path('/users/sign_in');
        }
});
