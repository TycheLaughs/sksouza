(function() {
  'use strict';

  angular
    .module('sksouza')
    .controller('EditorController', function ($scope, $window, $state) {

      $scope.$on('$stateChangeSuccess', function(event) {
         //if (location.hostname === 'tychelaughs.github.io') {
             ga('send', 'pageview', { page: $state.current.name });
          // }

       });
       //console.log($state.current.name);


      var canv, context;
  	   var i, j;
      $scope.whichCanv = "large";
      $scope.max = 9;
      $scope.squareSize = 60;
  	   $scope.xPoints = [];
      $scope.yPoints = [];
      $scope.tiles = [];
  	   $scope.mouseX = 0;
      $scope.mouseY = 0;
  	   $scope.coordTile = {"x": "", "y": ""};
      $scope.noFill = true;
      $scope.inactive = "#010E16";
      $scope.active ="#70C9E3";
      $scope.normal ="#A6C9E3";
      $scope.bkg = "gray";
      $scope.movingStroke = "#010E16";
  	   $scope.canClickTiles = true;
      $scope.uhOh = false;

        switch($scope.whichCanv){
         case 'large':
             canv = document.getElementById('canv');
             $scope.squareSize = 60;
             break;

         case 'small':
             canv = document.getElementById('canvSml');
             $scope.squareSize = 30;
             break;
        }

        $scope.drawBase = function(){
           for(i = 0; i < $scope.xPoints.length; i++){
             context.fillRect($scope.xPoints[i], $scope.yPoints[i], $scope.squareSize, $scope.squareSize);
             context.strokeRect($scope.xPoints[i], $scope.yPoints[i], $scope.squareSize, $scope.squareSize);
             context.fill();
             context.stroke();
            }
         };

         $scope.init = function(){
            context = canv.getContext('2d');
            context.fillStyle = $scope.inactive;
            context.strokeStyle = $scope.normal;
            for(i=0; i < $scope.max; i++){
               for(j = 0; j < $scope.max ; j++){
                  $scope.xPoints.push((i*$scope.squareSize)+($scope.squareSize/2));
                  $scope.yPoints.push(((j*$scope.squareSize)+($scope.squareSize/2)));
               }
            }
            $scope.drawBase();
         };

         $scope.switchCanv = function(){
            switch($scope.whichCanv){
              case 'large':
                 canv = document.getElementById('canv');
                 $scope.squareSize = 60;
                 break;
              case 'small':
                 canv = document.getElementById('canvSml');
                 $scope.squareSize = 30;
                 break;
            }
            $scope.xPoints.splice(0, $scope.xPoints.length);
            $scope.yPoints.splice(0, $scope.yPoints.length);
            $scope.tiles.splice(0, $scope.tiles.length);
            $scope.init();
         };

         $scope.dealWithClicks = function(x, y){
            $scope.coordTile = {"x": "", "y": ""};
            for(i = 0; i < $scope.xPoints.length; i++){
               $scope.noFill = true;
               if((x > $scope.xPoints[i])&& (x < ($scope.xPoints[i] + $scope.squareSize)) && (y > $scope.yPoints[i]) && (y < ($scope.yPoints[i] + $scope.squareSize))){
                     $scope.coordTile.x = $scope.xPoints[i];
                     $scope.coordTile.y = $scope.yPoints[i];
                     if($scope.tiles.length === 0){
                        //console.log("tiles empty: should be filling purple");
                        $scope.tiles.push($scope.coordTile);
                        context.fillStyle = $scope.active;
                        context.strokeStyle = $scope.movingStroke;
                        $scope.noFill = false;
                     }
                     else{
                        for(j = 0; j < $scope.tiles.length; j++){
                           if($scope.coordTile.x === $scope.tiles[j].x && $scope.coordTile.y === $scope.tiles[j].y){
                              //console.log("tiles not empty: should be filling green");
                              $scope.tiles.splice(j, 1);
                              context.fillStyle = $scope.inactive;
                              context.strokeStyle = $scope.normal;
                              $scope.noFill = false;
                           }
                        }
                        if($scope.noFill){
                           //console.log("tiles not empty: should be filling purple");
                           //context.clearRect(xPoints[i], yPoints[j], squareSize, squareSize);
                           $scope.tiles.push($scope.coordTile);
                           context.fillStyle = $scope.active;
                           context.strokeStyle = $scope.movingStroke;
                           $scope.noFill = false;
                        }
                     }
                     context.fillRect($scope.xPoints[i], $scope.yPoints[i], $scope.squareSize, $scope.squareSize);
                     context.strokeRect($scope.xPoints[i], $scope.yPoints[i], $scope.squareSize, $scope.squareSize);
                     context.fill();
                     context.stroke();
                     //console.log(JSON.stringify($scope.tiles));
               }
            }
         };
      /*clearCanv clears the canvas */
         $scope.clearCanv = function(){
            context.clearRect(0, 0, canv.width, canv.height);
         };
         function drawUpdate(){
            $scope.clearCanv();
            $scope.canClickTiles = false;
            context.fillStyle = $scope.inactive;
            context.strokeStyle = $scope.bkg;
            $scope.drawBase();
            context.fillStyle = $scope.active;
            context.strokeStyle = $scope.movingStroke;
            for(i = 0; i < $scope.tiles.length; i++){
               context.fillRect($scope.tiles[i].x, $scope.tiles[i].y, $scope.squareSize, $scope.squareSize);
               context.strokeRect($scope.tiles[i].x, $scope.tiles[i].y, $scope.squareSize, $scope.squareSize);
               context.fill();
               context.stroke();
            }
         }

         $scope.left = function(){
            for(i = 0; i < $scope.tiles.length; i++){
               $scope.tiles[i].x -= 5;
               if($scope.tiles[i].x < ($scope.squareSize/2)){
                  $scope.uhOh = true;
               }
            }
            if($scope.uhOh){
               for(i = 0; i < $scope.tiles.length; i++){
                  $scope.tiles[i].x += 5;
               }
               $scope.uhOh = false;
            }
            drawUpdate();
         };

         $scope.right = function(){
            for(i = 0; i < $scope.tiles.length; i++){
               $scope.tiles[i].x += 5;
               if($scope.tiles[i].x > (canv.width - (3*$scope.squareSize/2))){
                  $scope.uhOh= true;
               }
            }
            if($scope.uhOh){
               for(i = 0; i < $scope.tiles.length; i++){
                  $scope.tiles[i].x -= 5;
               }
               $scope.uhOh = false;
            }
            drawUpdate();
         };

         $scope.up = function(){
            for(i = 0; i < $scope.tiles.length; i++){
               $scope.tiles[i].y -= 5;
               if($scope.tiles[i].y < ($scope.squareSize/2)){
                  $scope.uhOh = true;
               }
            }
            if($scope.uhOh){
               for(i = 0; i < $scope.tiles.length; i++){
                  $scope.tiles[i].y += 5;
               }
               $scope.uhOh = false;
            }
            drawUpdate();
         };

         $scope.down = function(){
            for(i = 0; i < $scope.tiles.length; i++){
               $scope.tiles[i].y += 5;
               if($scope.tiles[i].y > (canv.height - (3*$scope.squareSize/2))){
                  $scope.uhOh = true;
               }
            }
            if($scope.uhOh){
               for(i = 0; i < $scope.tiles.length; i++){
                  $scope.tiles[i].y -= 5;
               }
               $scope.uhOh = false;
            }
            drawUpdate();
         };

         $scope.tileReset = function(){
            if($scope.tiles.length > 0){
               //console.log("resetting editor");
               $scope.tiles.splice(0, $scope.tiles.length);
               $scope.clearCanv();
            }
            $scope.canClickTiles = true;
            context.strokeStyle = $scope.normal;
            context.fillStyle = $scope.inactive;
            $scope.drawBase();
         };

         $scope.recieveClicks = function(e) {
           $scope.mouseX = Number(e.pageX - canv.offsetLeft);
           $scope.mouseY = Number(e.pageY - canv.offsetTop);
           //console.log($scope.mouseX + ', ' + $scope.mouseY);
           if($scope.canClickTiles){
            $scope.dealWithClicks($scope.mouseX, $scope.mouseY);
            }
         };

         $scope.init();

         //console.log("x points: " + JSON.stringify(xPoints));
         //console.log("y points: "+JSON.stringify(yPoints));
      });
}());
