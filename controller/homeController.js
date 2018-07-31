app.controller('homeController',function($scope,$mdSidenav,$state){
$scope.toggleLeft=buildToggle('open');
$scope.toggleRight=buildToggle('close');

  function buildToggle(ComponentId){
      return function(){
        if(ComponentId=='open')
        {
          console.log("open................");
          $mdSidenav(ComponentId).toggle();
          document.getElementById("main").style.marginLeft = "280px";
        }
        else{
          console.log("close................");
          $mdSidenav(ComponentId).toggle();
          document.getElementById("main").style.marginLeft = "0px";
        } 
  };
  }
// $scope.toggleLeft=function openNav(){
  
//   $mdSidenav('open').toggle();
//     document.getElementById("main").style.marginLeft = "250px";
  
//   };
// $scope.toggleRight=function closeNav() {
//   $mdSidenav('close').toggle();
//   document.getElementById("main").style.marginLeft= "0";
// };
  
  //$state function call
  $state.go('home.dashboard');
});
// document.getElementById("mySidenav").style.width = "250px";
//     document.getElementById("main").style.marginLeft = "250px";

// function openNav() {
//     document.getElementById("mySidenav").style.width = "250px";
//     document.getElementById("main").style.marginLeft = "250px";
// }

// function closeNav() {
//     document.getElementById("mySidenav").style.width = "0";
//     document.getElementById("main").style.marginLeft= "0";
// }