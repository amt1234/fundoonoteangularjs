app.factory('Userfactory', function ($http) {
    var factory = [];
    var api_url="http://localhost:8080/SpringRestFoundoNote/";

    factory.postmethod = function (userdata, url) {
        return $http({
            method: 'POST',
            url:api_url+ url,
            headers: {'userid':localStorage.getItem('Token')},
            data: userdata
        })
    };

    factory.getmethod=function(url){
        return $http({
            method:'GET',
            url:api_url+ url,
            headers:{'userid':localStorage.getItem('Token')}
        })
    };
    return factory;
});