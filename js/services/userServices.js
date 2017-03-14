//service file to responsible for all admin related stuff
//@author -  Himanshu
'use strict';
app.service('userServices', function($http, $q,cookieServices){
  //function for signing up the admin
  this.sign_up = function(data){
      //set headers for request
      var headers = { 'Content-Type': 'application/json','api_key':'ahjgdj87698bjb89#sfksdfsfb#278' };
      return $http({
        method: 'POST',
        url: 'https://limitless-beyond-58363.herokuapp.com/users/signup',
        data: data,
        headers: headers
      });
  };
  //function to get particular product
  this.get_product_by_slug = function(product_slug){
      //set headers for request
      var headers = { 'Content-Type': 'application/json','api_key':'ahjgdj87698bjb89#sfksdfsfb#278' };
      return $http({
        method: 'GET',
        url: 'https://limitless-beyond-58363.herokuapp.com/product/get/slug?slug=' + product_slug,
        headers: headers
      });
  };
  //function to orer food
    this.order_food = function(order){
        //set headers for request
        var header_data = cookieServices.get('user').data;
        var headers = { 'Content-Type': 'application/json','api_key':'ahjgdj87698bjb89#sfksdfsfb#278','user_id':parseInt(header_data.id),'auth_token':header_data.auth_token };
        return $http({
          method: 'POST',
          url: 'https://limitless-beyond-58363.herokuapp.com/order/create',
          data: order,
          headers: headers
        });
    };
  //function to create user by admin
  this.get_all_products = function(offset){
      //set headers for request
      var header_data = cookieServices.get('admin').data;
      var headers = { 'api_key':'ahjgdj87698bjb89#sfksdfsfb#278','user_id':header_data.id,'auth_token':header_data.auth_token };
      return $http({
        method: 'GET',
        url: 'https://limitless-beyond-58363.herokuapp.com/products/get/all?offset='+ offset,
        headers: headers
      });
  };
  //function to to get all users order
  this.get_users_order = function(offset){
      //set headers for request
      var header_data = cookieServices.get('user').data;
      var headers = { 'Content-Type': 'application/json','api_key':'ahjgdj87698bjb89#sfksdfsfb#278','user_id':header_data.id,'auth_token':header_data.auth_token };
      return $http({
        method: 'GET',
        url: 'https://limitless-beyond-58363.herokuapp.com/order/all?offset='+ offset,
        headers: headers
      });
  };
  this.get_user = function(user_id){
      //set headers for request
      var header_data = cookieServices.get('user').data;
      console.log(header_data);
      var headers = { 'Content-Type': 'application/json','api_key':'ahjgdj87698bjb89#sfksdfsfb#278','user_id':header_data.id,'auth_token':header_data.auth_token };
      return $http({
        method: 'GET',
        url: 'https://limitless-beyond-58363.herokuapp.com/users/get?id=' + header_data.id,
        headers: headers
      });
  };
  //function to update user by admin
  this.update_user = function(data){
      //set headers for request
      var header_data = cookieServices.get('user').data;
      var headers = { 'Content-Type': 'application/json','api_key':'ahjgdj87698bjb89#sfksdfsfb#278','user_id':header_data.id,'auth_token':header_data.auth_token };
      return $http({
        method: 'POST',
        url: 'https://limitless-beyond-58363.herokuapp.com/user/update',
        data: data,
        headers: headers
      });
  };
  this.sign_in = function(data){
      //set headers for request
      var headers = { 'Content-Type': 'application/json','api_key':'ahjgdj87698bjb89#sfksdfsfb#278' };
      return $http({
        method: 'POST',
        url: 'https://limitless-beyond-58363.herokuapp.com/users/signin',
        data: data,
        headers: headers
      });
  };
});
