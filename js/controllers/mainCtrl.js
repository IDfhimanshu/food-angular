//main controller
app.controller('mainCtrl', function ($scope,$http,cookieServices,$location) {
    if(cookieServices.get('user') !== undefined){
       $location.path( "/home" );
    }else{
      $location.path( "/users/sign_in" );
    }
});
