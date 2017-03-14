
/*
 Author- Himanshu Gupta
 Date- June11, 2015
 Purpose- this js is responsible for creation of cookie and destroy it
 */

'use strict';
app.factory('cookieServices', ['$http','$cookies', function($http,$cookies){
	return{
		set:function(key,value){
			return $cookies.putObject(key, value);
		},
		get:function(key){
			return $cookies.getObject(key);
		},
		destroy:function(key){
			return $cookies.remove(key);
		}
	};
}])
