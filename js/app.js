//create a app module
var app=angular.module('inc42',['ngRoute','ui.bootstrap','ngCookies','ngFileUpload']);
//set config for angualr app , write url related logic hasElementTranscludeDirective
//set routeProvider
app.config(['$routeProvider', function ($routeProvider) {
  //define all routes here
  $routeProvider.
          when('/', {templateUrl: 'partials/main.html', controller: 'mainCtrl'}).
          when('/users/sign_in', {templateUrl: 'partials/users.html', controller: 'userCtrl'}).
          when('/products/sign_up', {templateUrl: 'partials/home.html', controller: 'homeCtrl'}).
          when('/server/admin/login', {templateUrl: 'partials/admin/account.html', controller: 'adminAccountCtrl'}).
          when('/server/admin/users', {templateUrl: 'partials/admin/main.html', controller: 'adminCtrl'}).
          when('/server/admin/products', {templateUrl: 'partials/admin/products.html', controller: 'productCtrl'}).
          when('/server/admin/products/create', {templateUrl: 'partials/admin/products_create.html', controller: 'adminCreateProductCtrl'}).
          when('/server/admin/users/create', {templateUrl: 'partials/admin/create_user.html', controller: 'adminCreateUserCtrl'}).
          when('/home', {templateUrl: 'partials/home.html', controller: 'homeCtrl'}).
          when('/products/:any', {templateUrl: 'partials/product_detail.html', controller: 'productdetailCtrl'}).
          when('/orders', {templateUrl: 'partials/order.html', controller: 'orderCtrl'}).
          when('/server/admin/orders', {templateUrl: 'partials/admin/order.html', controller: 'adminorderCtrl'}).
          when('/profile', {templateUrl: 'partials/profile.html', controller: 'profileCtrl'}).
          when('/404', {templateUrl: 'partials/error.html', controller: 'errCtrl'}).
          otherwise({redirectTo: '/404'});

}]);
app.filter('toArray', function () {
  return function (obj, addKey) {
    if (!angular.isObject(obj)) return obj;
    if ( addKey === false ) {
      return Object.keys(obj).map(function(key) {
        return obj[key];
      });
    } else {
      return Object.keys(obj).map(function (key) {
        var value = obj[key];
        return angular.isObject(value) ?
          Object.defineProperty(value, '$key', { enumerable: false, value: key}) :
          { $key: key, $value: value };
      });
    }
  };
});
