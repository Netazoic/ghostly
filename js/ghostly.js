//Ghost API functions
// See https://github.com/TryGhost/Ghost/wiki/%5BWIP%5D-API-Documentation
// See also https://ghost.org/forum/plugins/16157-when-will-ghost-s-api-be-available/
var USER_NAME = "reader@netazoic.com";
//var PSSWD = 'Iaaon0ghost!';
var PSSWD = 'BGiagr8blog!';
var myAccessToken;
var myRefreshToken;

function getCredential(){
	//POST /ghost/api/v0.1/authentication/token
	//Content-Type: application/x-www-form-urlencoded
	//grant_type=password&username=<username>&password=<password>&client_id=ghost-admin
	var flgDebug = 1;
	var url = "/ghost/api/v0.1/authentication/token";
	var postData= "grant_type=password";
	postData +="&username=" + USER_NAME;
	postData +="&password=" + PSSWD;
	postData +="&client_id=ghost-admin";
	var fLoad = function(data){
		if(flgDebug){
			console.debug("we have a winner");
			console.debug(data);
		}
		myAccessToken = data.access_token;
		myRefreshToken = data.refresh_token;
	};
	var jqxhr = $.ajax({
		  type: 'POST',
		  url: url,
		  data: postData,
		  success: fLoad,
		  dataType: 'json',
		  async:false
		});
	return myAccessToken;
}
/*
 * Posts
GET /ghost/api/v0.1/posts - get all posts
Options:
page - pagination (default: 1)
limit - number of posts per page (all or an integer. default: 15)
status - status of the page (all, published, draft)
staticPages - include static pages (default: false)
POST /ghost/api/v0.1/posts - add new post
GET /ghost/api/v0.1/posts/:id - get post with id
GET /ghost/api/v0.1/posts/slug/:slug - get post with slug
PUT /ghost/api/v0.1/posts/:id - update post with id
DELETE /ghost/api/v0.1/posts/:id - delete post with id
 */

function getPosts(){
	var url = "/ghost/api/v0.1/posts";
	var data= null;
	var flgDebug = true;
	var posts = null;
	var fLoad = function(data,status,xhr){
		posts = data.posts;
	};
	getAPI(url,data,fLoad,flgDebug);
	return posts;
}

function getAPI(url,data,fLoad,flgDebug){
	var dataBack=null;  //the json result of the api get request
	if(!fLoad) fLoad = function(data,status,xhr){
		if(flgDebug){
			console.debug("we have a winner");
			console.debug(data);
		}
		dataBack = data;
	};

	var jqxhr = $.ajax({
	    url: url,
	    dataType : 'json',
	    beforeSend : function(xhr) {
	    	if(!myAccessToken){
	    		myAccessToken = getCredential();
	    	}
	      // generate base 64 string from username + password
	      //var bytes = Crypto.charenc.Binary.stringToBytes(username + ":" + password);
	      //var base64 = Crypto.util.bytesToBase64(bytes);
	      // set header
	      xhr.setRequestHeader("Authorization", "Bearer " + myAccessToken);
	    },
	    error : function(xhr,status,error) {
	    	if(flgDebug)console.debug("Error with getAPI: " + status + ": " + error);
	      
	    },
	    success: fLoad,
		foo:"bar"
	});
	return dataBack;
}

