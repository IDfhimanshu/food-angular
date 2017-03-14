//service file to responsible for all admin related stuff
//@author -  Himanshu
'use strict';
app.service('adminServices', function($http, $q,cookieServices){
  //function for signing up the admin
  this.sign_up = function(data){
      //set headers for request
      var headers = { 'Content-Type': 'application/json','api_key':'ahjgdj87698bjb89#sfksdfsfb#278' };
      return $http({
        method: 'POST',
        url: 'https://limitless-beyond-58363.herokuapp.com/admin/signup',
        data: data,
        headers: headers
      });
  };
  //function to get particular user
  this.get_user = function(user_id){
      //set headers for request
      var header_data = cookieServices.get('admin').data;
      var headers = { 'Content-Type': 'application/json','api_key':'ahjgdj87698bjb89#sfksdfsfb#278','user_id':header_data.id,'auth_token':header_data.auth_token };
      return $http({
        method: 'GET',
        url: 'https://limitless-beyond-58363.herokuapp.com/admin/users/get?id=' + user_id,
        headers: headers
      });
  };
  //function to delete user
  this.delete_user = function(user_id){
      //set headers for request
      var header_data = cookieServices.get('admin').data;
      var headers = { 'Content-Type': 'application/json','api_key':'ahjgdj87698bjb89#sfksdfsfb#278','user_id':header_data.id,'auth_token':header_data.auth_token };
      return $http({
        method: 'POST',
        url: 'https://limitless-beyond-58363.herokuapp.com/admin/users/delete?id=' + user_id,
        headers: headers
      });
  };
  //function to delete product
  this.delete_product = function(product_id){
      //set headers for request
      var header_data = cookieServices.get('admin').data;
      var headers = { 'Content-Type': 'application/json','api_key':'ahjgdj87698bjb89#sfksdfsfb#278','user_id':header_data.id,'auth_token':header_data.auth_token };
      return $http({
        method: 'POST',
        url: 'https://limitless-beyond-58363.herokuapp.com/products/delete?id=' + product_id,
        headers: headers
      });
  };
  //function to get particular product
  this.get_product = function(product_id){
      //set headers for request
      var headers = { 'Content-Type': 'application/json','api_key':'ahjgdj87698bjb89#sfksdfsfb#278' };
      return $http({
        method: 'GET',
        url: 'https://limitless-beyond-58363.herokuapp.com/product/get?id=' + product_id,
        headers: headers
      });
  };
  //function to create user by admin
  this.get_all_users = function(offset){
      //set headers for request
      var header_data = cookieServices.get('admin').data;

      var headers = { 'Content-Type': 'application/json','api_key':'ahjgdj87698bjb89#sfksdfsfb#278','user_id':header_data.id,'auth_token':header_data.auth_token };
      return $http({
        method: 'GET',
        url: 'https://limitless-beyond-58363.herokuapp.com/admin/users/get/all?offset='+ offset,
        headers: headers
      });
  };
  //function to create user by admin
  this.create_user = function(data){
      //set headers for request
      var headers = { 'Content-Type': 'application/json','api_key':'ahjgdj87698bjb89#sfksdfsfb#278' };
      return $http({
        method: 'POST',
        url: 'https://limitless-beyond-58363.herokuapp.com/admin/users/create',
        data: data,
        headers: headers
      });
  };
  //function to create product
  this.create_product = function(data){
      //set headers for request
      var header_data = cookieServices.get('admin').data;
      var headers = { 'Content-Type': 'application/json','api_key':'ahjgdj87698bjb89#sfksdfsfb#278','user_id':header_data.id,'auth_token':header_data.auth_token };
      return $http({
        method: 'POST',
        url: 'https://limitless-beyond-58363.herokuapp.com/admin/products/create',
        data: data,
        headers: headers
      });
  };
  //function to create user by admin
  this.get_all_products = function(offset){
      //set headers for request
      var headers = { 'Content-Type': 'application/json','api_key':'ahjgdj87698bjb89#sfksdfsfb#278' };
      return $http({
        method: 'GET',
        url: 'https://limitless-beyond-58363.herokuapp.com/products/get/all?offset='+ offset,
        headers: headers
      });
  };
  //get all order
  this.get_all_order = function(offset){
      //set headers for request
      var header_data = cookieServices.get('admin').data;
      var headers = { 'api_key':'ahjgdj87698bjb89#sfksdfsfb#278','user_id':header_data.id,'auth_token':header_data.auth_token };
      return $http({
        method: 'GET',
        url: 'https://limitless-beyond-58363.herokuapp.com/admin/order/all?offset='+ offset,
        headers: headers
      });
  };
  //funciton to cancel order
  this.cancel_order = function(order_id){
      var data = {
        order_id : order_id
      }
      //set headers for request
      var header_data = cookieServices.get('admin').data;
      var headers = { 'Content-Type': 'application/json','api_key':'ahjgdj87698bjb89#sfksdfsfb#278','user_id':header_data.id,'auth_token':header_data.auth_token };
      return $http({
        method: 'POST',
        url: 'https://limitless-beyond-58363.herokuapp.com/admin/order/cancel',
        data: data,
        headers: headers
      });
  };
  //funciton to cancel order
  this.cancel_order = function(order_id){
      var data = {
        order_id : order_id
      }
      //set headers for request
      var header_data = cookieServices.get('admin').data;
      var headers = { 'Content-Type': 'application/json','api_key':'ahjgdj87698bjb89#sfksdfsfb#278','user_id':header_data.id,'auth_token':header_data.auth_token };
      return $http({
        method: 'POST',
        url: 'https://limitless-beyond-58363.herokuapp.com/admin/order/cancel',
        data: data,
        headers: headers
      });
  };
  //funciton to mark complete order
  this.complete_order = function(order_id){
      var data = {
        order_id : order_id
      }
      //set headers for request
      var header_data = cookieServices.get('admin').data;
      var headers = { 'Content-Type': 'application/json','api_key':'ahjgdj87698bjb89#sfksdfsfb#278','user_id':header_data.id,'auth_token':header_data.auth_token };
      return $http({
        method: 'POST',
        url: 'https://limitless-beyond-58363.herokuapp.com/admin/order/complete',
        data: data,
        headers: headers
      });
  };
  //function to update user by admin
  this.update_user = function(data){
      //set headers for request
      var header_data = cookieServices.get('admin').data;
      var headers = { 'Content-Type': 'application/json','api_key':'ahjgdj87698bjb89#sfksdfsfb#278','user_id':header_data.id,'auth_token':header_data.auth_token };
      return $http({
        method: 'POST',
        url: 'https://limitless-beyond-58363.herokuapp.com/admin/users/update',
        data: data,
        headers: headers
      });
  };
  //function to update user by admin
  this.update_product = function(data){
      //set headers for request
      var header_data = cookieServices.get('admin').data;
      var headers = { 'Content-Type': 'application/json','api_key':'ahjgdj87698bjb89#sfksdfsfb#278','user_id':header_data.id,'auth_token':header_data.auth_token };
      return $http({
        method: 'POST',
        url: 'https://limitless-beyond-58363.herokuapp.com/product/update',
        data: data,
        headers: headers
      });
  };
  this.sign_in = function(data){
      //set headers for request
      var headers = { 'Content-Type': 'application/json','api_key':'ahjgdj87698bjb89#sfksdfsfb#278' };
      return $http({
        method: 'POST',
        url: 'https://limitless-beyond-58363.herokuapp.com/admin/signin',
        data: data,
        headers: headers
      });
  };
});
