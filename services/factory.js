app.factory('Userfactory', function ($http) {
    var factory = [];

    factory.postmethod = function (userdata, url) {
        return $http({
            method: 'POST',
            url: url,
            headers: {},
            data: userdata
        })
    };

    factory.getmethod=function(url){
        return $http({
            method:'GET',
            url: url,
            headers:{'userid':localStorage.getItem('Token')}
            //data:userlogin
        })
    };
    return factory;
});