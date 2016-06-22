// This is a JavaScript file

var module = angular.module('chat-app', ['onsen']);
document.addEventListener ("deviceready", onDeviceReady, false);
function onDeviceReady () {
}
// コントローラー
module.controller('mainCtrl', function($scope, $http, $sce, $q, $anchorScroll, $location) {
        // document.readyの実装
        var socket;
        $scope.chat=[];
        angular.element(document).ready(function () {
    	// ソケット通信テスト
	    	$scope.socketTest(socket);
        });
       // ソケット通信テスト
      $scope.socketTest = function(socket) {
         var url = "ws://183.181.172.86:3000/";//サーバのURL。
         socket = io.connect(url);   
         socket.on('connect', function() {
            console.log("connect");
            socket.emit("archive");
         });
	    //サーバからのテキストを受けて表示
         socket.on('recieved',function(text){
            console.log("recieved:"+text);
            $scope.chat.push(text);
            $scope.$apply();
         });
         //サーバにテキストを送信
         $scope.send =function(){
          console.log("sending:"+$scope.text);
          socket.emit('send',$scope.text);
         };
      };
});  

