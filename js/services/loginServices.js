/*
    Author- Himanhsu
    Purpose- this file is used to check whether user is logged in or not
 */

app.factory('loginServices', function ($http,$rootScope,$location,cookieServices) {
    return {
        //function to get session value if stored and return true else false
            islogged: function () {
              if (cookieServices.get('user')) {
                  return true;
              }else{
                      return false;
                  }
            },
          logout: function () {

          localServices.destroy('user');
        }
    }
});
