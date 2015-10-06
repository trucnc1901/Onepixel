

/*
 * This is a JS library that allows you to use the Adobe IMS (Identity Management System) in your
 * Adobe web application.
 * Dependencies: jQuery (loaded only when the browser doesn't support the needed features: JSON & querySelectorAll).
 */
(function() {
    "use strict";

    window.AdobeIMSStrings = {
        user: {
    
            allow_pop_up_window: "The browser's pop-up blocker has stopped a window from opening. To be able to sign-in, please use the browser's UI (in the address bar) to allow the window to be opened. Thank you.",
            confirm_expired_credentials_sign_in_again: "Your session has expired. To protect your account, you need to confirm your password periodically. Do you want to sign in again?",
            alert_expired_credentials_sign_in_again: "Your session has expired. To protect your account, you need to confirm your password periodically. Please sign in again.",
            network_error: "A network error has occurred. Are you connected to the internet?"
    
        },
        dev: { /* Don't translate these strings. */
            adobeid: "Please declare the adobeid variable before loading the Javascript file for the IMS SDK",
            both_modal_and_redirect: "Error: you can't have both adobeid.uses_modal_mode and adobeid.uses_redirect_mode set to true.",
            client_id_missing: "Error: the ClientID is missing.",
            api_calls_only_https: "Error: the API calls must be made only through HTTPS.",
            mandatory_sign_in_only_in_redirect: "is_mandatory_sign_in only works in full web redirect mode.",
            scope_doesnt_ask_for_userId_from_profile: "The provided scopes don't ask for the userId from the user's profile",
            client_id_missing_from_query: "Please add the '#client_id#' to the comma separated list that is the client_id query parameter",
            load_the_sdk_only_once: "Please load the Javascript SDK only once."
        }
    };

    var adobeImsExists = !!window.adobeIMS;

    
(function(){function logToConsole(text){if(window.console&&typeof(window.console.log)=="function")
window.console.log("imslib.js: "+text);}
function logToConsoleInDebugMode(text){if(isDebugMode)
logToConsole(text);}
function logErrorToConsoleInDebugMode(text){if(isDebugMode&&window.console&&typeof(window.console.error)=="function")
window.console.error("imslib.js: "+text);}
function String_insert(self,index,string){if(index>0)
return self.substring(0,index)+string+self.substring(index,self.length);else
return string+self;}
function String_lastIndexOf(self,string){var index=-1,lastIndex;do{lastIndex=index;index=self.indexOf(string,index+1);}while(index!=-1);return lastIndex;}
function String_contains(self,string){return self.indexOf(string)!=-1;}
function String_startsWith(self,string){return 0==self.indexOf(string);}
function String_hasContent(string){return typeof(string)=="string"&&string.length>0;}
function String_withoutWhitespaces(string){return string.replace(/\s/g,"");}
function Date_asMilliseconds(date){if(!date)
date=new Date();if(assert(date instanceof Date,"Date_asMilliseconds: provided date is not a Date."))
return 0;return Number(date);}
function debugAlert(text){if(isDebugMode){alert("imslib.js (message appears only on dev environments):\n"+text);logToConsole(text);}}
function assert(condition,text){if(!condition){debugAlert("assert: "+text);logErrorToConsoleInDebugMode("assert: "+text);}
return!condition;}
function isFunction(fn){return fn&&typeof(fn)=="function";}
function callIfFunction(fn,self,args){if(isFunction(fn))
return fn.apply(self,args||[]);}
function removeKeyFromObject(object,key){try{delete object[key];}catch(exception){object[key]=undefined;}}
function cloneObject(object){if(object===null)
return null;if(typeof(object)!="object")
return object;if(object instanceof Array){var clone=[];each(object,function(index,objectInArray){clone.push(cloneObject(objectInArray));});assert(equals(object,clone),"cloned object has failed for "+JSON.stringify(object));return clone;}
var clone=new Object();for(var key in object)
clone[key]=cloneObject(object[key]);assert(equals(object,clone),"cloned object has failed for "+JSON.stringify(object));return clone;}
function equals(object1,object2){if(object1===null)
return object2===null;if(object2===null)
return object1===null;if(typeof(object1)!=typeof(object2))
return false;if(object1 instanceof Array){if(!(object2 instanceof Array)||object1.length!=object2.length)
return false;for(var index=0;index<object1.length;++index)
if(!equals(object1[index],object2[index]))
return false;return true;}
if(typeof(object1)=="object"){for(var key in object1)
if(!(key in object2)||!equals(object1[key],object2[key]))
return false;for(var key in object2)
if(!(key in object1))
return false;return true;}else{return object1==object2;}}
function isEmptyObject(object){return!object||equals(object,new Object());}
function Object_keys(object){if(Object.keys){return Object.keys(object);}
var keys=[];for(var key in object){if(object.hasOwnProperty(key)){keys.push(key);}}
return keys;}
function getDocumentHead(){if(document.head)
return document.head;var heads=document.getElementsByTagName("head");if(heads&&heads.length)
return heads[0];return null;}
function getBasePath(url){return url.substring(0,String_lastIndexOf(url,"/")+1);}
function getHashFromURL(url){if(!url)
url=window.location.href;var index=url.indexOf("#");return index!=-1?url.substring(index):"";}
function getQueryParamsAsMap(string){string=string.replace(/^(#|\?|&)/,"");var param_map=new Object();each(string.split("&"),function(idx,key_value_pair){var arr=key_value_pair.split("=");param_map[arr[0]]=decodeURIComponent(arr[1]);});return param_map;}
function isJqueryNeeded(){if(!(window["JSON"]&&isFunction(JSON.parse)))
return true;if(typeof(document.querySelectorAll)!="function")
return true;if(document.body){var element=document.createElement("div");element.setAttribute("data-isJqueryNeeded","no");document.body.appendChild(element);var result=document.querySelectorAll('[data-isJqueryNeeded="no"]');document.body.removeChild(element);return result.length!=1;}
return false;}
function querySelectorAll(query){if(_jQuery)
return _jQuery(query);if(document.querySelectorAll)
return document.querySelectorAll(query);return[];}
function each(array,fnToCall){if(_jQuery&&_jQuery.each){_jQuery.each.call(_jQuery,array,fnToCall);}else{for(var index=0;index<array.length;++index)
if(false===fnToCall.call(array[index],index,array[index]))
break;}}
function existsInArray(item,array){for(var index=0;index<array.length;++index)
if(equals(array[index],item))
return true;return false;}
function addEventListener(element,eventName,fnToCall){if(_jQuery)
_jQuery(element).on(eventName,fnToCall);else if(element.addEventListener)
element.addEventListener(eventName,fnToCall,false);else if(element.attachEvent)
element.attachEvent("on"+eventName,fnToCall);}
function parseJSON(json){if(_jQuery)
return _jQuery.parseJSON(json);return JSON.parse(json);}
function applyExtraApiParameters(params,extraParams){var clonedParams=cloneObject(params);for(var indexArgument=1;indexArgument<arguments.length;++indexArgument){var extraParams=arguments[indexArgument];if(typeof(extraParams)!="object")
continue;for(var key in extraParams){var value=extraParams[key];if(typeof(value)!="undefined"){if(typeof(value)!="object"){clonedParams[key]=value;}else{clonedParams[key]=applyExtraApiParameters(clonedParams[key]||new Object(),value);}}else{removeKeyFromObject(clonedParams,key);}}};return clonedParams;}
var thisScriptTag=document.querySelector&&document.querySelector('script[src*="imslib.js"]');var isDebugMode=thisScriptTag&&thisScriptTag.src.match(/^http(s:\/\/ims-na1-(dev|qa)\d\.adobelogin\.com)|(s?:\/\/[\w-]+\.(corp|eur)\.adobe\.com)|(s:\/\/adobeid-na1-(dev|qa)\d\.services\.adobe\.com)/i);if(isDebugMode){if(thisScriptTag)
logToConsole("loaded from "+thisScriptTag.src);logToConsole("isDebugMode");}
function isStoragePolyfillNeeded(storage){if(storage===null||typeof storage==="undefined"){return true;}
try{storage.setItem("isStoragePolyfillNeeded",true);if(storage.getItem("isStoragePolyfillNeeded")!="true")
return true;storage.removeItem("isStoragePolyfillNeeded");return false;}catch(e){return true;}}
var _storage=null;try{_storage=window.localStorage;}catch(e){if(isDebugMode){logToConsole("localStorage disabled");}}
if(isStoragePolyfillNeeded(_storage)){if(isDebugMode)
logToConsole("isStoragePolyfillNeeded");var MyStorage=function(){var data={};return{length:0,clear:function(){data={};this.length=0;},getItem:function(key){var value=data[key];return typeof(value)=="undefined"?null:value;},keys:function(){return data;},removeItem:function(key){if(!data.hasOwnProperty(key))
return;removeKeyFromObject(data,key);--this.length;},setItem:function(key,value){if(!data.hasOwnProperty(key))
++this.length;data[key]=String(value);}};};_storage=new MyStorage();assert(!isStoragePolyfillNeeded(_storage),"isLocalStoragePolyfillNeeded");}
var _url_ims_api,_access_token_storage_key="adobeid_ims_access_token",_access_token_storage_key_separator="/",_profile_storage_key="adobeid_ims_profile",_sso_cookie_expires_at_storage_key="adobeid_cookie_expires_at",_sso_cookie_expiration={"remember_me":14*24*3600*1000,"not_remember_me":15*60*1000},_from_ims="from_ims",_from_ims_hash=_from_ims+"=true",_context_from_redirect_hash_parameter_name="rctx",_redirect_page_in_modal_mode="redirectims.html",_ims_modal_window="ims_modal_window",_modal_window_default_size={"sign_in":{"width":600,"height":700},"sign_up":{"width":600,"height":850},"sign_out":{"width":320,"height":240},"jump":{"width":600,"height":850},"any":{"width":800,"height":600}},_jQuery=null;function AdobeIMS(){if(!(window.JSON&&isFunction(window.JSON.stringify))){var script=document.createElement("script");getDocumentHead().appendChild(script);script.type="text/javascript";script.src="https://static.adobelogin.com/renga-idprovider/resources/js/json2-min.js";}
var adobeIMS=this;if(typeof(window.adobeid)=="object"){this.adobeid=window.adobeid;}else{if(this._isFinalRedirectPageInModalMode()){this.adobeid=window.opener.adobeid||new Object();}else{this.adobeid=(window.adobeid=new Object());debugAlert(AdobeIMSStrings.dev.adobeid);}}
if(!isDebugMode&&this.adobeid.uses_debug_mode)
isDebugMode=true;this._accessTokensInfos=new Object();this._profile=null;this._is_already_attached_to_ui=false;this._last_ui_update={"_any_update_so_far":false,"_accessTokensInfos":new Object(),"_profile":null,"update":function(){this._any_update_so_far=true;this._accessTokensInfos=cloneObject(adobeIMS._accessTokensInfos);this._profile=cloneObject(adobeIMS._profile);},"areThereUIUpdatesToPerformForAccessTokens":function(){if(!this._any_update_so_far)
return true;return!equals(this._accessTokensInfos,adobeIMS._accessTokensInfos);},"areThereUIUpdatesToPerformForProfile":function(){if(!this._any_update_so_far)
return true;return!equals(this._profile,adobeIMS._profile);},"areThereUIUpdatesToPerform":function(){return this.areThereUIUpdatesToPerformForProfile()||this.areThereUIUpdatesToPerformForAccessTokens();}};}
if(window.adobeIMS){debugAlert(AdobeIMSStrings.dev.load_the_sdk_only_once);return;}
window.adobeIMS={"IMSAPIs":{},"errors":{"network":{"name":"networkError","userMessage":AdobeIMSStrings.user.network_error},"fromApiCallRedirect":{"name":"fromApiCallRedirectError","userMessage":"","setMessage":function(message){this.userMessage=message;return this;}},"avatarPicture":{"name":"avatarPictureError","userMessage":AdobeIMSStrings.dev.scope_doesnt_ask_for_userId_from_profile},"jsException":{"name":"jsExceptionError","message":"","exception":null,"setException":function(e,message){this.exception=e;this.message=message||"";return this;}}},"getUrlForApiCall":function(api,version,params){if(arguments.length==2){params=arguments[1];version=null;}
var client_id=params.client_id?params.client_id:this.getClientID(api);var url=api.endpoint[client_id];if(typeof(url)!="string"){debugAlert(AdobeIMSStrings.dev.client_id_missing_from_query.replace("#client_id#",client_id));return"";}
if(version)
url+="/"+version;var isFirst=true;for(var key in params){var value=params[key];if(value===undefined)
continue;url+=(isFirst?"?":"&")+key+"="+encodeURIComponent(typeof(value)=="object"?JSON.stringify(value):value);isFirst=false;}
assert(url.length<2083,"this url is too long for visitors using IE<=8:\n"+url);return url;},"makeApiCall":function(api,version,params,fnToCall){if(arguments.length==3){fnToCall=arguments[2];params=arguments[1];version=null;}
if(isDebugMode)
logToConsole("#api# api call with #params# parameters".replace("#api#",api.name).replace("#params#",JSON.stringify(params)));this._ajaxGet(this.getUrlForApiCall(api,version,params),fnToCall,"jsonp");},"getUserProfile":function(){return this._profile;},"getUserPictureURL":function(){if(!this._profile)
return"";if(this._profile.userId){return this.getUrlForApiCall(this.config.api.avatar,{})+"/"+this._profile.userId;}else{this._onError(this.errors.avatarPicture);return"";}},"getAccessTokenInfo":function(isReAuthentication,client_id,scope){return this._accessTokensInfos[this.getAccessTokenSessionStorageKey(isReAuthentication,client_id,scope)];},"getAccessToken":function(isReAuthentication,client_id,scope){var info=this.getAccessTokenInfo(isReAuthentication,client_id,scope);return info?info.access_token:null;},"getAccessTokenSessionStorageKey":function(isReAuthentication,client_id,scope){return[_access_token_storage_key,client_id||this.getClientID(),Boolean(isReAuthentication),scope||this.getScope()].join(_access_token_storage_key_separator);},"getKeyForAccessToken":function(access_token){for(var key in this._accessTokensInfos)
if(access_token==this._accessTokensInfos[key].access_token)
return key;assert(false,"unknown access_token for key: "+key);return null;},"_isAccessTokenInfoUsable":function(info){return info&&typeof(info.access_token)=="string"&&typeof(info.client_id)=="string"&&this.isKnownClientID(info.client_id)&&typeof(info.scope)=="string"&&typeof(info.isReAuthentication)=="boolean"&&typeof(info.expires_in)=="number"&&typeof(info.expiresAtMilliseconds)=="number"&&Date_asMilliseconds()<info.expiresAtMilliseconds;},"loadFromStorage":function(){this._accessTokensInfos=new Object();for(var key in _storage.keys?_storage.keys():_storage)
if(String_startsWith(key,_access_token_storage_key)){try{var accessTokenInfo=parseJSON(_storage.getItem(key));if(!this.isKnownClientID(accessTokenInfo.client_id)){continue;}
if(this._isAccessTokenInfoUsable(accessTokenInfo)){this._accessTokensInfos[key]=accessTokenInfo;}else{logToConsoleInDebugMode("unusable access token info: "+_storage.getItem(key));_storage.removeItem(key);}}catch(e){_storage.removeItem(key);}}
this._profile=parseJSON(_storage.getItem(_profile_storage_key));},"hasTokenButItHasExpired":function(isReAuthentication,client_id,scope){var info=this.getAccessTokenInfo(isReAuthentication,client_id,scope);return info&&Date_asMilliseconds()>info.expiresAtMilliseconds?info:undefined;},"isSignedInUser":function(isReAuthentication,client_id,scope){var info=this.getAccessTokenInfo(isReAuthentication,client_id,scope);return info&&Date_asMilliseconds()<info.expiresAtMilliseconds?info:undefined;},"signIn":function(api_parameters,contextToBePassedOnRedirect){this.contextToBePassedOnRedirect=contextToBePassedOnRedirect;var customApiParameters=applyExtraApiParameters({"response_type":"token","client_id":this.getClientID(this.config.api.authorize,api_parameters),"scope":this.getScope(),"locale":this.getLocale()},this.getAdobeIdApiParametersForApi(this.config.api.authorize),api_parameters);customApiParameters.redirect_uri=this._getRedirectUri(this.config.api.authorize,customApiParameters);if(this.isModal())
this._callCallbacksToUpdateUI();this._openWindow(this.getUrlForApiCall(this.config.api.authorize,customApiParameters),customApiParameters.idp_flow=="create_account"?_modal_window_default_size.sign_up:_modal_window_default_size.sign_in);},"reAuthenticate":function(api_parameters,contextToBePassedOnRedirect){var customApiParameters=applyExtraApiParameters({"reauth":"check","puser":this._profile&&this._profile.email?this._profile.email:undefined,"eu":this._profile&&this._profile.email?"true":undefined},this.getAdobeIdApiParametersForApi(this.config.api.authorize),api_parameters);this.signIn(customApiParameters,contextToBePassedOnRedirect);},"isReAuthentication":function(api_parameters){return api_parameters&&api_parameters.reauth;},"updateRedirectUriForReAuthentication":function(redirect_uri,api_parameters){if(!(typeof(redirect_uri)=="string"&&this.isReAuthentication(api_parameters)))
return redirect_uri;if(!String_contains(redirect_uri,"reauth="))
redirect_uri=redirect_uri+"&reauth="+api_parameters.reauth;return redirect_uri;},"getContextFromRedirectForAccessToken":function(access_token){if(this.contextPassedFromRedirect&&this.contextPassedFromRedirect.access_token==access_token){var context=this.contextPassedFromRedirect.context;this.contextPassedFromRedirect=null;return context;}else{return null;}},"signUp":function(api_parameters,contextToBePassedOnRedirect){if(this.isModal())
this._callCallbacksToUpdateUI();this.signIn(applyExtraApiParameters({"idp_flow":"create_account"},api_parameters),contextToBePassedOnRedirect);},_invalidateTokens:function(accessTokenKeys,callback){var self=this;var countOfTokensToInvalidate=accessTokenKeys.length;if(countOfTokensToInvalidate){each(accessTokenKeys,function(index,accessTokenKey){self.makeApiCall(self.config.api.logout_token,{'access_token':self._accessTokensInfos[accessTokenKey].access_token},function(){--countOfTokensToInvalidate;if(countOfTokensToInvalidate===0){callIfFunction(callback);}});});}else{callIfFunction(callback);}},"signOut":function(api_parameters){var customApiParameters=applyExtraApiParameters(this.getAdobeIdApiParametersForApi(this.config.api.logout),api_parameters);var self=this;function invalidateAccessTokenWithRedirect(accessTokenInfo){if(!accessTokenInfo){self._clearCredentials({"updateUI":true});return;}
if(self.isModal()&&customApiParameters.redirect_uri)
self.switchToRedirectMode();var allApiParameters=applyExtraApiParameters({"access_token":accessTokenInfo.access_token,"redirect_uri":self._getRedirectUri(self.config.api.logout,customApiParameters)},customApiParameters);var url=self.getUrlForApiCall(self.config.api.logout,allApiParameters);self._clearCredentials({"updateUI":true});self._openWindow(url,_modal_window_default_size.sign_out);}
var accessTokenKeys=Object_keys(this._accessTokensInfos);if(accessTokenKeys.length){var lastAccessTokenInfo=this._accessTokensInfos[accessTokenKeys.pop()];this._invalidateTokens(accessTokenKeys,function(){invalidateAccessTokenWithRedirect(lastAccessTokenInfo);});}else{self._clearCredentials({"updateUI":true});}},"switchToRedirectMode":function(){this.adobeid.uses_modal_mode=false;this.adobeid.uses_redirect_mode=true;},"switchToModalMode":function(){this.adobeid.uses_modal_mode=true;this.adobeid.uses_redirect_mode=false;},"_clearCredentials":function(params){if(params&&params.access_token){var key=this.getKeyForAccessToken(params.access_token);_storage.removeItem(key);removeKeyFromObject(this._accessTokensInfos,key);}else{for(var key in this._accessTokensInfos)
if(String_startsWith(key,_access_token_storage_key))
_storage.removeItem(key);this._accessTokensInfos=new Object();_storage.removeItem(_profile_storage_key);this._profile=null;_storage.removeItem(_sso_cookie_expires_at_storage_key);this._clearTimerTestSSOCookieWillExpire();}
if(params&&params.updateUI===true)
this._callCallbacksToUpdateUI(params);},"_callCallbacksToUpdateUI":function(params){if(!this._last_ui_update.areThereUIUpdatesToPerform())
return;var cloned_last_ui_update=cloneObject(this._last_ui_update);this._last_ui_update.update();if(isFunction(this.adobeid.onProfile)&&cloned_last_ui_update.areThereUIUpdatesToPerformForProfile()){try{callIfFunction(this.adobeid.onProfile,this.adobeid,[this._profile]);}catch(e){this._onError(this.errors.jsException.setException(e,"adobeid.onProfile"));}}
if(isFunction(this.adobeid.onAccessToken)&&cloned_last_ui_update.areThereUIUpdatesToPerformForAccessTokens()){try{for(var key in this._accessTokensInfos)
if(!equals(this._accessTokensInfos[key],cloned_last_ui_update._accessTokensInfos[key]))
if(!params||(params&&params.access_token&&params.access_token==this._accessTokensInfos[key].access_token))
callIfFunction(this.adobeid.onAccessToken,this.adobeid,[this._accessTokensInfos[key].access_token,this._accessTokensInfos[key]]);}catch(e){this._onError(this.errors.jsException.setException(e,"adobeid.onAccessToken"));}}},"_onReady":function(){if(this.onReadyAlreadyCalled)
return;this.onReadyAlreadyCalled=true;this._callCallbacksToUpdateUI();try{callIfFunction(this.adobeid.onReady,this.adobeid);}catch(e){this._onError(this.errors.jsException.setException(e,"adobeid.onReady"));}},"_onError":function(error){try{callIfFunction(this.adobeid.onError,this.adobeid,[error]);}catch(e){}
if(typeof(this.adobeid.onError)!=="function"){if(typeof(error.userMessage)=="string"){logToConsoleInDebugMode(error.userMessage);}else{logErrorToConsoleInDebugMode("unhandled javascript error: "+JSON.stringify(error));}
if(error.debug){logToConsoleInDebugMode(JSON.stringify(error.debug));}}},"_update_url_ims_api":function(){if(this.adobeid.target_env){var adobecom={"replaceWhat":/https?:\/\/adobeid-na1-(dev|qa|stg)\d\.services\.adobe\.com/i,"replaceWith":"https://adobeid-na1-"+this.adobeid.target_env+".services.adobe.com"},adobelogin={"replaceWhat":/https?:\/\/ims-na1-(dev|qa|stg)\d\.adobelogin\.com/i,"replaceWith":"https://ims-na1-"+this.adobeid.target_env+".adobelogin.com"},local=/https?:\/\/\S*\.corp\.adobe\.com(:\d*)?/i;for(var apiKey in this.config.api){var api=this.config.api[apiKey];if(isEmptyObject(api.endpoint))
continue;for(var client_id in api.endpoint){var isLocal=local.test(api.endpoint[client_id]);if(isLocal){var endpoint=String_contains(api.name,"check")||String_contains(api.name,"logout")?adobecom:adobelogin;api.endpoint[client_id]=api.endpoint[client_id].replace(local,endpoint.replaceWith);}else{api.endpoint[client_id]=api.endpoint[client_id].replace(adobecom.replaceWhat,adobecom.replaceWith).replace(adobelogin.replaceWhat,adobelogin.replaceWith);}}}
if(isDebugMode){logToConsole("target_env = "+this.adobeid.target_env);logToConsole("authorize = "+this.config.api.authorize.endpoint[this.getClientID(this.config.api.authorize)]);logToConsole("check = "+this.config.api.check.endpoint[this.getClientID(this.config.api.check)]);}}},"_initialize":function(){var self=this;this._update_url_ims_api();this._signInWhenRedirectedBackFromIMS(function(){if(self._isFinalRedirectPageInModalMode()){if(window.opener){window.opener.adobeIMS._importDataFromModalWindow(self);window.close();}}else{self._attachHandlersToUI();self._signInBasedOnStoredCredentials(function(){if(self.isSignedInUser()){self._testAccessTokensAreStillValid();}else{if(!self.hasJustSingleLoggedOutSLO){self.signInBasedOnSingleSignOnSSO(function(){if(self.isMandatorySignIn()&&!self.isSignedInUser())
self.signIn();self._onReady();});}else{self.hasJustSingleLoggedOutSLO=false;self._callCallbacksToUpdateUI();if(self.isMandatorySignIn()&&!self.isSignedInUser())
self.signIn();self._onReady();}}});}});},"_signInWhenRedirectedBackFromIMS":function(fnContinuation){var self=this;var currentHash=getHashFromURL().substring(1);currentHash=currentHash.replace("%23expires_in","#expires_in").replace("%23error","#error").replace("?error","#error").replace("#","&");var imsResponseAsMap=getQueryParamsAsMap(currentHash);var access_token=imsResponseAsMap["access_token"];var apiName=imsResponseAsMap["api"];if(apiName==this.config.api.authorize.name)
assert(access_token,"the authorize api must return an access_token");var isReAuthentication=Boolean(imsResponseAsMap["reauth"]);var client_id=imsResponseAsMap["client_id"]||this.getClientID();var scope=imsResponseAsMap["scope"]||this.getScope();var expires_in=imsResponseAsMap["expires_in"];var isFromImsLibJs=imsResponseAsMap[_from_ims]==="true";var error=imsResponseAsMap["error"];var contextAsString=imsResponseAsMap[_context_from_redirect_hash_parameter_name];this.contextPassedFromRedirect=contextAsString?{"context":parseJSON(contextAsString),"access_token":access_token}:null;var isActionNeeded=(access_token&&expires_in)||(isFromImsLibJs&&apiName==this.config.api.logout.name)||(error&&isFromImsLibJs);if(!isActionNeeded){fnContinuation.call(this);return;}
window.location.hash=imsResponseAsMap["old_hash"]||"";if(access_token){this.hasJustReturnedFromAuthorize=true;this._setAccessTokenAndGetProfile(access_token,isReAuthentication,client_id,scope,expires_in,null,function(){self.validateSSOCookieLifetime(access_token,fnContinuation);});}else{this._accessTokensInfos=new Object();this._profile=null;if(error)
this._onError(this.errors.fromApiCallRedirect.setMessage(error));fnContinuation.call(this);}},"_setAccessTokenAndGetProfile":function(access_token,isReAuthentication,client_id,scope,expires_in,freshProfile,fnContinuation){var self=this;expires_in=Number(expires_in);var user_id=freshProfile&&freshProfile.userId;this._removeAccessTokensIfDifferentUserId(user_id);if(isEmptyObject(this._accessTokensInfos))
this.loadFromStorage();if(!this.shouldAcceptTheToken(access_token,client_id,scope,user_id,true,isReAuthentication)){callIfFunction(fnContinuation,self);return;}
var key=this.getAccessTokenSessionStorageKey(isReAuthentication,client_id,scope);var now=Date_asMilliseconds();this._accessTokensInfos[key]={"access_token":access_token,"client_id":client_id,"user_id":user_id,"scope":scope,"expires_in":expires_in,"createdAtMilliseconds":now,"expiresAtMilliseconds":now+expires_in,"isReAuthentication":isReAuthentication};_storage.setItem(key,JSON.stringify(this._accessTokensInfos[key]));if(this.onReadyAlreadyCalled)
this._callCallbacksToUpdateUI();if(freshProfile){callIfFunction(fnContinuation,self);}else{this.makeApiCall(this.config.api.profile,applyExtraApiParameters({"bearer_token":access_token},this.getAdobeIdApiParametersForApi(this.config.api.profile)),function(profile){self.setProfile(profile);callIfFunction(fnContinuation,self);});}},"setProfile":function(profile){if(!profile||profile.error_flag)
return;this._profile=profile;if(profile){_storage.setItem(_profile_storage_key,JSON.stringify(this._profile));this._removeAccessTokensIfDifferentUserId(profile.userId);}else{_storage.removeItem(_profile_storage_key);}
if(this.onReadyAlreadyCalled)
this._callCallbacksToUpdateUI();},"_removeAccessTokensIfDifferentUserId":function(user_id){if(!user_id)
return;for(var key in this._accessTokensInfos){var info=this._accessTokensInfos[key];if(info.user_id&&info.user_id!=user_id){this._clearCredentials({"access_token":info.access_token,"updateUI":false});if(isDebugMode)
logToConsole("remove token because of different user_id (isReAuthentication="+info.isReAuthentication+")");}}},"_signInBasedOnStoredCredentials":function(fnContinuation){this.loadFromStorage();if(isEmptyObject(this._accessTokensInfos)){this._clearCredentials();callIfFunction(fnContinuation,this);}else{if(this.hasJustReturnedFromAuthorize){this.hasJustReturnedFromAuthorize=false;callIfFunction(fnContinuation);}else{this.testSingleLogOutSLO(fnContinuation);}}},"signInBasedOnSingleSignOnSSO":function(fnContinuation){var self=this;var customApiParameters=applyExtraApiParameters({"client_id":this.getClientID(this.config.api.check),"scope":this.getScope(this.config.api.check),"locale":this.getLocale(),"redirect_uri":this._getRedirectUri(this.config.api.check)},this.getAdobeIdApiParametersForApi(this.config.api.check));this.makeApiCall(this.config.api.check,customApiParameters,function(response){if(response.jump){if(isDebugMode)
logToConsole("jump to "+response.jump);self._openWindow(response.jump,_modal_window_default_size.jump);}else{if(response.access_token){var profileFromSSO=cloneObject(response);each(["access_token","expires_in","token_type"],function(index,key){removeKeyFromObject(profileFromSSO,key);});self.setProfile(profileFromSSO);self._setAccessTokenAndGetProfile(response.access_token,false,customApiParameters.client_id,customApiParameters.scope,response.expires_in,profileFromSSO,function(){self.validateSSOCookieLifetime(response.access_token,fnContinuation);});}else{if(response.error==="ride_AdobeID_acct_evs"){self._clearCredentials();self.signIn();}else if(response.error==='ride_AdobeID_acct_disabled'){self._invalidateTokens(Object_keys(this._accessTokensInfos),function(){self._clearCredentials({updateUI:true});self.signIn();});}else{callIfFunction(fnContinuation,self);}}}});},"testSingleLogOutSLO":function(fnContinuation){if(!this.isSingleLogOutEnabled()){callIfFunction(fnContinuation,this);return;}
var self=this;this.makeApiCall(this.config.api.check_status,applyExtraApiParameters({"client_id":this.getClientID(this.config.api.check_status)},this.getAdobeIdApiParametersForApi(this.config.api.check_status)),function(response){if(response.sso===false&&response.remember_me===false){self._clearCredentials({"updateUI":true});self.hasJustSingleLoggedOutSLO=true;callIfFunction(fnContinuation,self);}else{self.signInBasedOnSingleSignOnSSO(fnContinuation);}});},"validateSSOCookieLifetime":function(access_token,fnContinuation){callIfFunction(fnContinuation,this);return;},"_clearTimerTestSSOCookieWillExpire":function(){if(this._timerTestSSOCookieWillExpire){clearInterval(this._timerTestSSOCookieWillExpire);this._timerTestSSOCookieWillExpire=null;}},"shouldAcceptTheToken":function(access_token,client_id,scope,user_id,isValid,isReAuthentication){var isOk=true;var reasonsToReject=[{"shouldReject":isValid===false,"shouldLogToErrorConsole":false,"message":"access_token is invalid."},{"shouldReject":isValid===true&&user_id&&this._profile&&user_id!==this._profile.userId,"shouldLogToErrorConsole":false,"message":"access_token was from another userId (isReAuthentication=#0).".replace("#0",isReAuthentication)},{"shouldReject":isValid===true&&!this.isKnownClientID(client_id),"shouldLogToErrorConsole":true,"message":"the #0 client_id associated with the access token is not for a known client_id (#1).".replace("#0",client_id).replace("#1",Object.keys?Object.keys(this.config.api.authorize.endpoint).join(","):this.getClientID())},{"shouldReject":isValid===true&&!this.matchesTheRequiredScope(scope),"shouldLogToErrorConsole":true,"message":"the (#0) scope associated with the access token doesn't match the required scope (#1).".replace("#0",scope).replace("#1",this.getScope())},{"shouldReject":!access_token,"shouldLogToErrorConsole":true,"message":"no access token."}];each(reasonsToReject,function(index,reasonToReject){if(reasonToReject["shouldReject"]){isOk=false;(reasonToReject["shouldLogToErrorConsole"]?logErrorToConsoleInDebugMode:logToConsoleInDebugMode)("shouldAcceptTheToken: "+reasonToReject["message"]);}});return isOk;},"testAccessTokenIsStillValid":function(access_token,fnToCallAtTheEnd){var self=this;var info=this._accessTokensInfos[this.getKeyForAccessToken(access_token)];assert(info,"we need token information to validate it");var fnContinuation=function(){--self.countOfTokensToValidate;assert(self.countOfTokensToValidate>=0,"countOfTokensToValidate shouldn't be negative");if(self.countOfTokensToValidate==0)
callIfFunction(fnToCallAtTheEnd,self);};var handleResponse=function(response){if(response.token&&self.shouldAcceptTheToken(access_token,response.token.client_id,response.token.scope,response.token.user_id,response.valid,info.isReAuthentication)){fnContinuation();}else{logToConsoleInDebugMode("validate/token: access_token is invalid. removing.");self._clearCredentials({"updateUI":self.onReadyAlreadyCalled,"access_token":access_token});try{if(response.token&&self.isKnownClientID(response.token.client_id)&&self.matchesTheRequiredScope(response.token.scope)){callIfFunction(self.adobeid.onAccessTokenHasExpired,self.adobeid,[access_token,info]);}}catch(e){self._onError(self.errors.jsException.setException(e,"adobeid.onAccessTokenHasExpired"));}
if(info.isReAuthentication){fnContinuation();}else{self.signInBasedOnSingleSignOnSSO(function(){if(!self.isSignedInUser()){if(self.isMandatorySignIn()){self.signIn();}else{if(self.adobeid.uses_browser_dialog_when_access_token_expires){if(self.isModal())
self._displayAlertToUser(AdobeIMSStrings.user.alert_expired_credentials_sign_in_again);else if(self._confirmAlertToUser(AdobeIMSStrings.user.confirm_expired_credentials_sign_in_again))
self.signIn();}}}
fnContinuation();});}}};if(info&&this.isKnownClientID(info.client_id)){this.makeApiCall(this.config.api.validate_token,{"token":access_token,"client_id":info.client_id,"typeof":"access_token"},handleResponse);}else{handleResponse({"valid":false});}},"_testAccessTokensAreStillValid":function(){assert(typeof(this.countOfTokensToValidate)=="undefined"||this.countOfTokensToValidate===0,"problem with validating tokens");this.countOfTokensToValidate=0;for(var key in this._accessTokensInfos)
++this.countOfTokensToValidate;var self=this;for(var key in this._accessTokensInfos)
self.testAccessTokenIsStillValid(this._accessTokensInfos[key].access_token,function(){self._onReady();});},"_importDataFromModalWindow":function(adobeIMSInModalWindow){if(!isEmptyObject(adobeIMSInModalWindow._accessTokensInfos)){this.contextPassedFromRedirect=cloneObject(adobeIMSInModalWindow.contextPassedFromRedirect);if(!equals(adobeIMSInModalWindow._profile,this._profile)&&!isEmptyObject(adobeIMSInModalWindow._profile))
this.setProfile(cloneObject(adobeIMSInModalWindow._profile));for(var key in adobeIMSInModalWindow._accessTokensInfos)
if(!equals(adobeIMSInModalWindow._accessTokensInfos[key],this._accessTokensInfos[key])){this._accessTokensInfos[key]=cloneObject(adobeIMSInModalWindow._accessTokensInfos[key]);_storage.setItem(key,JSON.stringify(this._accessTokensInfos[key]));this.validateSSOCookieLifetime(this._accessTokensInfos[key].access_token);}
this._callCallbacksToUpdateUI();if(adobeIMSInModalWindow.isSignedInUser(true)&&!this.isSignedInUser(false))
this.signInBasedOnSingleSignOnSSO();}else{this._clearCredentials({"updateUI":true});}},"_attachHandlersToUI":function(){if(this._is_already_attached_to_ui)
return;this._is_already_attached_to_ui=true;var self=this;each([{"attribute":"signin","fnToCall":this.signIn},{"attribute":"reauthenticate","fnToCall":this.reAuthenticate},{"attribute":"signup","fnToCall":this.signUp},{"attribute":"signout","fnToCall":this.signOut}],function(indexInfo,info){var buttons=querySelectorAll('[data-adobeid-action="'+info.attribute+'"]');each(buttons,function(indexButton,button){addEventListener(button,"click",function(){info.fnToCall.call(self)});});});},"_openWindow":function(url,params){if(this.isModal()){var width=Math.min((params&&params.width)||_modal_window_default_size.any.width,screen.availWidth),height=Math.min((params&&params.height)||_modal_window_default_size.any.height,screen.availHeight),left=parseInt((screen.availLeft?screen.availLeft:0)+Math.max(0,screen.availWidth-width)/2),top=parseInt((screen.availTop?screen.availTop:0)+Math.max(0,screen.availHeight-height)/2)
var w=window.open(url,_ims_modal_window,"width="+width+",height="+height+",left="+left+",top="+top+",toolbar=no,menubar=no");if(!w){this._displayAlertToUser(AdobeIMSStrings.user.allow_pop_up_window);return;}
if(typeof(w.focus)=="function"){w.focus();}}else{if(this.isMandatorySignIn()){window.location.replace(url);}else{window.location.href=url;}}
this.contextToBePassedOnRedirect=null;},"isModal":function(){if(this._isFinalRedirectPageInModalMode())
return true;if(this.adobeid.uses_modal_mode===true&&this.adobeid.uses_redirect_mode===true){debugAlert(AdobeIMSStrings.dev.both_modal_and_redirect);return true;}
return typeof(this.adobeid.uses_modal_mode)=="boolean"?this.adobeid.uses_modal_mode:(this.adobeid.uses_redirect_mode===false);},"_isFinalRedirectPageInModalMode":function(){return String_contains(window.location.href,_redirect_page_in_modal_mode)&&window.opener&&window.opener!=window;},"getAdobeIdApiParametersForApi":function(api){if(!(api&&api.name&&this.adobeid.api_parameters))
return new Object();for(var apiKey in this.adobeid.api_parameters)
if(String_contains(api.name,apiKey))
return this.adobeid.api_parameters[apiKey];return new Object();},"getLocale":function(){return this.adobeid.locale||this.config.locale;},"sunbreakHack":function(scope){return scope.replace(this.config.sunbreakScope,this.config.sunbreakScopeExpanded);},"matchesTheRequiredScope":function(scopeToValidate){if(assert(String_hasContent(scopeToValidate),"scopeToValidate must be a non empty string for matchesTheRequiredScope"))
return false;var scopeListToValidate=this.sunbreakHack(String_withoutWhitespaces(scopeToValidate)).split(',');var isOk=true;each(this.sunbreakHack(this.getScope()).split(','),function(index,requiredScope){if(!existsInArray(requiredScope,scopeListToValidate)){isOk=false;return false;}});return isOk;},"getScope":function(api,extraParams){var customApiParameters=applyExtraApiParameters(this.getAdobeIdApiParametersForApi(api),extraParams);var scope="AdobeID,openid";if(customApiParameters.scope)
scope=customApiParameters.scope;else if(this.adobeid.scope)
scope=this.adobeid.scope;return String_withoutWhitespaces(scope);},"isKnownClientID":function(client_id){return client_id in this.config.api.authorize.endpoint;},"getClientID":function(api,extraParams){var customApiParameters=applyExtraApiParameters(this.getAdobeIdApiParametersForApi(api),extraParams);if(customApiParameters.client_id)
return customApiParameters.client_id;if(this.adobeid.client_id)
return this.adobeid.client_id;return this.config.clientId;},"isMandatorySignIn":function(){if(this.adobeid.is_mandatory_sign_in===true&&this.isModal()){debugAlert(AdobeIMSStrings.dev.mandatory_sign_in_only_in_redirect);return false;}
return typeof(this.adobeid.is_mandatory_sign_in)=="boolean"?this.adobeid.is_mandatory_sign_in:false;},"isSingleLogOutEnabled":function(){if(typeof(this.adobeid.uses_single_log_out)=="boolean")
return this.adobeid.uses_single_log_out;return this.config.sloEnabled;},"isRefreshSSOCookiesEnabled":function(){if(typeof(this.adobeid.uses_refresh_sso_cookies)=="boolean")
return this.adobeid.uses_refresh_sso_cookies;return this.config.refreshSsoCookiesEnabled;},"_getRedirectUri":function(api,extraParams){var redirect_uri="";var customApiParameters=applyExtraApiParameters(this.getAdobeIdApiParametersForApi(api),extraParams);if(this.isModal()){redirect_uri=getBasePath(window.location.href)+_redirect_page_in_modal_mode+"#"+_from_ims_hash;}else{if(customApiParameters.redirect_uri)
redirect_uri=customApiParameters.redirect_uri;else if(this.adobeid.redirect_uri)
redirect_uri=this.adobeid.redirect_uri;else
redirect_uri=window.location.href;assert(!String_contains(redirect_uri,_from_ims),"the redirect_uri mustn't already contain #from_ims");var old_hash=getHashFromURL(redirect_uri);var without_hash=redirect_uri;if(old_hash)
without_hash=without_hash.substring(0,without_hash.length-old_hash.length);redirect_uri=without_hash+"#"+_from_ims_hash+"&old_hash="+encodeURIComponent(old_hash);}
if(customApiParameters.client_id)
redirect_uri+="&client_id="+encodeURIComponent(customApiParameters.client_id);if(customApiParameters.scope)
redirect_uri+="&scope="+encodeURIComponent(customApiParameters.scope);if(api&&api.name)
redirect_uri+="&api="+encodeURIComponent(api.name);redirect_uri=this.updateRedirectUriForReAuthentication(redirect_uri,customApiParameters);if(!isEmptyObject(this.contextToBePassedOnRedirect))
redirect_uri+="&"+_context_from_redirect_hash_parameter_name+"="+encodeURIComponent(JSON.stringify(this.contextToBePassedOnRedirect));return redirect_uri;},"_ajaxGet":function(url,fnToCall,type){var self=this;if(/^https:\/\//i.test(url)||/^http:\/\/[\w-]+.(corp|eur).adobe.com/i.test(url)){var errorFn=function(){var networkError=cloneObject(self.errors.network);networkError.debug={url:url,withJQuery:!!_jQuery};self._onError(networkError);};if(_jQuery){_jQuery.get.apply(_jQuery,arguments).fail(errorFn);}else{if(type=="jsonp"){var randomKey=Math.random().toString();randomKey="_"+randomKey.substring(randomKey.indexOf(".")+1);this[randomKey]=function(object){if(isDebugMode)
logToConsole("api call response: "+JSON.stringify(object));fnToCall.call(adobeIMS,object);removeKeyFromObject(adobeIMS,randomKey);};var script=document.createElement("script");script.src=url+(String_contains(url,"?")?"&":"?")+"callback=window.adobeIMS."+randomKey;addEventListener(script,"load",function(){getDocumentHead().removeChild(script);});addEventListener(script,"error",function(){getDocumentHead().removeChild(script);errorFn();});getDocumentHead().appendChild(script);}else{var nativeRequest=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");nativeRequest.onreadystatechange=function(){if(nativeRequest.readyState==4&&nativeRequest.status==200){fnToCall.call(null,nativeRequest.responseText);}};nativeRequest.onerror=errorFn;nativeRequest.open("GET",url,true);nativeRequest.send();}}}else{debugAlert(AdobeIMSStrings.dev.api_calls_only_https);}},"_displayAlertToUser":function(text){alert(text);},"_confirmAlertToUser":function(text){return confirm(text);},"_handleTheJQueryDependency":function(){var self=this;if(isJqueryNeeded()){var initialize=function(){_jQuery=window.jQuery;_jQuery(document).ready(function(){self._initialize();});};if(typeof(window.jQuery)=="undefined"){var script=document.createElement("script");getDocumentHead().appendChild(script);script.type="text/javascript";script.src="https://static.adobelogin.com/renga-idprovider/resources/js/jquery-1.11.1.min.js";var timerWaitForJQuery=function(){if(window["jQuery"])
initialize.call();else
setTimeout(timerWaitForJQuery,50);};timerWaitForJQuery();}else{initialize.call();}}else{this._initialize();}},"_waitForDOMContentLoaded":function(){var self=this;var alreadyCalled=false;var fnToCall=function(){if(alreadyCalled)
return;alreadyCalled=true;self._handleTheJQueryDependency();};if(document.readyState=="complete"||document.readyState=="loaded"){fnToCall.call();}else{addEventListener(document,"DOMContentLoaded",fnToCall);addEventListener(window,"load",fnToCall);}}};AdobeIMS.call(adobeIMS);})();

    if (adobeImsExists) return;

    window.adobeIMS.config = {
        locale: "en_US" || "en_US",
        clientId: "BehanceWebSusi1",
        sloEnabled: true,
        refreshSsoCookiesEnabled: false,
        sunbreakScope: "acct_mgmt_webui",
        sunbreakScopeExpanded: "acct_mgmt_api,gnav,update_profile.address.mail_to,update_profile.dob,update_profile.email,update_profile.first_name,update_profile.industry,update_profile.job_function,update_profile.job_title,update_profile.last_name,update_profile.mrktPerm,update_profile.password,update_profile.phoneNumber,update_profile.phonetic_name,update_profile.preferred_languages,update_profile.screen_name,update_profile.secondary_email",

        api: {
            "authorize": {
                "name": "authorize",
                "endpoint": {
                     "BehanceWebSusi1": "https://ims-na1.adobelogin.com/ims/authorize/v1"
                    
                }
            },
            "check": {
                "name": "check/token",
                "endpoint": {
                     "BehanceWebSusi1": "https://adobeid-na1.services.adobe.com/ims/check/v1/token"
                    
                }
            },
            "check_status": {
                "name": "check/status",
                "endpoint": {
                     "BehanceWebSusi1": "https://adobeid-na1.services.adobe.com/ims/check/v1/status"
                    
                }
            },
            "logout": {
                "name": "logout",
                "endpoint": {
                     "BehanceWebSusi1": "https://adobeid-na1.services.adobe.com/ims/logout/v1"
                    
                }
            },
            "logout_token": {
                "name": "logout_token",
                "endpoint": {
                     "BehanceWebSusi1": "https://adobeid-na1.services.adobe.com/ims/logout/v1/token"
                    
                }
            },
            "profile": {
                "name": "profile",
                "endpoint": {
                     "BehanceWebSusi1": "https://ims-na1.adobelogin.com/ims/profile/v1"
                    
                }
            },
            "validate_token": {
                "name": "validate_token",
                "endpoint": {
                     "BehanceWebSusi1": "https://ims-na1.adobelogin.com/ims/validate_token/v1"
                    
                }
            },
            "avatar": {
                "name": "avatar/download",
                "endpoint": {
                     "BehanceWebSusi1": "https://ims-na1.adobelogin.com/ims/avatar/download"
                    
                }
            },

            "versions": {
                "v1": "v1"
            }
        }
    };

    // Also keep old IMSAPIs for backwards compatibility
    window.adobeIMS.IMSAPIs = window.adobeIMS.config.api;

    window.adobeIMS._waitForDOMContentLoaded();
})();
