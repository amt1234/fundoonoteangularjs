app.factory('Userfactory', function ($http) {
    var factory = [];

    factory.postmethod = function (userdata, url) {
        return $http({
            method: 'POST',
            url: url,
            header: {},
            data: userdata
        })
    };

    factory.getmethod=function(){
        return $http({
            method:'GET',
            header:{},
            data:userlogin
        })
    };
    return factory;
});