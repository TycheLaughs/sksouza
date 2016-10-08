(function() {
  'use strict';

  angular
    .module('sksouza')
    .controller('EditorController', EditorController);

   function EditorController($window, $document){
      var vm = this;
      var canv, context;
      var i, j;
      vm.whichCanv = "large";
      vm.max = 9;
      vm.squareSize = 60;
      vm.xPoints = [];
      vm.yPoints = [];
      vm.tiles = [];
      vm.mouseX = 0;
      vm.mouseY = 0;
      vm.coordTile = {"x": "", "y": ""};
      vm.noFill = true;
      vm.inactive = "#010E16";
      vm.active ="#70C9E3";
      vm.normal ="#A6C9E3";
      vm.bkg = "gray";
      vm.movingStroke = "#010E16";
      vm.canClickTiles = true;
      vm.uhOh = false;

      switch(vm.whichCanv){
      case 'large':
          canv = $document[0].getElementById('canvEd');
          vm.squareSize = 60;
          break;

      case 'small':
          canv = $document[0].getElementById('canvSmlEd');
          vm.squareSize = 30;
          break;
     }

      vm.drawBase = function(){
           for(i = 0; i < vm.xPoints.length; i++){
             context.fillRect(vm.xPoints[i], vm.yPoints[i], vm.squareSize, vm.squareSize);
             context.strokeRect(vm.xPoints[i], vm.yPoints[i], vm.squareSize, vm.squareSize);
             context.fill();
             context.stroke();
            }
         };

         vm.init = function(){
            context = canv.getContext('2d');
            context.fillStyle = vm.inactive;
            context.strokeStyle = vm.normal;
            for(i=0; i < vm.max; i++){
               for(j = 0; j < vm.max ; j++){
                  vm.xPoints.push((i*vm.squareSize)+(vm.squareSize/2));
                  vm.yPoints.push(((j*vm.squareSize)+(vm.squareSize/2)));
               }
            }
            vm.drawBase();
         };

         vm.switchCanv = function(){
            switch(vm.whichCanv){
              case 'large':
                 canv = $document[0].getElementById('canvEd');
                 vm.squareSize = 60;
                 break;
              case 'small':
                 canv = $document[0].getElementById('canvSmlEd');
                 vm.squareSize = 30;
                 break;
            }
            vm.xPoints.splice(0, vm.xPoints.length);
            vm.yPoints.splice(0, vm.yPoints.length);
            vm.tiles.splice(0, vm.tiles.length);
            vm.init();
         };

      vm.dealWithClicks = function(x, y){
            vm.coordTile = {"x": "", "y": ""};
            for(i = 0; i < vm.xPoints.length; i++){
               vm.noFill = true;
               if((x > vm.xPoints[i])&& (x < (vm.xPoints[i] + vm.squareSize)) && (y > vm.yPoints[i]) && (y < (vm.yPoints[i] + vm.squareSize))){
                     vm.coordTile.x = vm.xPoints[i];
                     vm.coordTile.y = vm.yPoints[i];
                     if(vm.tiles.length === 0){
                        //console.log("tiles empty: should be filling purple");
                        vm.tiles.push(vm.coordTile);
                        context.fillStyle = vm.active;
                        context.strokeStyle = vm.movingStroke;
                        vm.noFill = false;
                     }
                     else{
                        for(j = 0; j < vm.tiles.length; j++){
                           if(vm.coordTile.x === vm.tiles[j].x && vm.coordTile.y === vm.tiles[j].y){
                              //console.log("tiles not empty: should be filling green");
                              vm.tiles.splice(j, 1);
                              context.fillStyle = vm.inactive;
                              context.strokeStyle = vm.normal;
                              vm.noFill = false;
                           }
                        }
                        if(vm.noFill){
                           //console.log("tiles not empty: should be filling purple");
                           //context.clearRect(xPoints[i], yPoints[j], squareSize, squareSize);
                           vm.tiles.push(vm.coordTile);
                           context.fillStyle = vm.active;
                           context.strokeStyle = vm.movingStroke;
                           vm.noFill = false;
                        }
                     }
                     context.fillRect(vm.xPoints[i], vm.yPoints[i], vm.squareSize, vm.squareSize);
                     context.strokeRect(vm.xPoints[i], vm.yPoints[i], vm.squareSize, vm.squareSize);
                     context.fill();
                     context.stroke();
                     //console.log(JSON.stringify(vm.tiles));
               }
            }
         };
      /*clearCanv clears the canvas */
      vm.clearCanv = function(){
         context.clearRect(0, 0, canv.width, canv.height);
      };
      function drawUpdate(){
         vm.clearCanv();
         vm.canClickTiles = false;
         context.fillStyle = vm.inactive;
         context.strokeStyle = vm.bkg;
         vm.drawBase();
         context.fillStyle = vm.active;
         context.strokeStyle = vm.movingStroke;
         for(i = 0; i < vm.tiles.length; i++){
            context.fillRect(vm.tiles[i].x, vm.tiles[i].y, vm.squareSize, vm.squareSize);
            context.strokeRect(vm.tiles[i].x, vm.tiles[i].y, vm.squareSize, vm.squareSize);
            context.fill();
            context.stroke();
         }
      }

      vm.left = function(){
            for(i = 0; i < vm.tiles.length; i++){
               vm.tiles[i].x -= 5;
               if(vm.tiles[i].x < (vm.squareSize/2)){
                  vm.uhOh = true;
               }
            }
            if(vm.uhOh){
               for(i = 0; i < vm.tiles.length; i++){
                  vm.tiles[i].x += 5;
               }
               vm.uhOh = false;
            }
            drawUpdate();
         };

      vm.right = function(){
            for(i = 0; i < vm.tiles.length; i++){
               vm.tiles[i].x += 5;
               if(vm.tiles[i].x > (canv.width - (3*vm.squareSize/2))){
                  vm.uhOh= true;
               }
            }
            if(vm.uhOh){
               for(i = 0; i < vm.tiles.length; i++){
                  vm.tiles[i].x -= 5;
               }
               vm.uhOh = false;
            }
            drawUpdate();
         };

      vm.up = function(){
            for(i = 0; i < vm.tiles.length; i++){
               vm.tiles[i].y -= 5;
               if(vm.tiles[i].y < (vm.squareSize/2)){
                  vm.uhOh = true;
               }
            }
            if(vm.uhOh){
               for(i = 0; i < vm.tiles.length; i++){
                  vm.tiles[i].y += 5;
               }
               vm.uhOh = false;
            }
            drawUpdate();
         };

      vm.down = function(){
            for(i = 0; i < vm.tiles.length; i++){
               vm.tiles[i].y += 5;
               if(vm.tiles[i].y > (canv.height - (3*vm.squareSize/2))){
                  vm.uhOh = true;
               }
            }
            if(vm.uhOh){
               for(i = 0; i < vm.tiles.length; i++){
                  vm.tiles[i].y -= 5;
               }
               vm.uhOh = false;
            }
            drawUpdate();
         };

      vm.tileReset = function(){
            if(vm.tiles.length > 0){
               //console.log("resetting editor");
               vm.tiles.splice(0, vm.tiles.length);
               vm.clearCanv();
            }
            vm.canClickTiles = true;
            context.strokeStyle = vm.normal;
            context.fillStyle = vm.inactive;
            vm.drawBase();
         };

      vm.recieveClicks = function(e) {
         vm.mouseX = Number(e.pageX - canv.getBoundingClientRect().left + $window.pageXOffset);
         vm.mouseY = Number(e.pageY - canv.getBoundingClientRect().top + $window.pageYOffset);
           //console.log(vm.mouseX + ', ' + vm.mouseY);
           if(vm.canClickTiles){
            vm.dealWithClicks(vm.mouseX, vm.mouseY);
            }
         };

      vm.init();
   }
}());
