(function() {
  'use strict';

  angular
    .module('sksouza')
    .controller('DiceController', DiceController);

  /** @ngInject */
  function DiceController() {
    var vm = this;
   vm.diceDenomination = 6;
   vm.diceCount = 1;
   vm.diceRolls = [];
   vm.nextDiceCount = 1;
   vm.nextDiceDenom = 6;

   vm.rollDice = function(){
      vm.clearRecord();
      for(var i = 0; i < vm.nextDiceCount; i++){
         vm.diceRolls.push(vm.rollOneDie(vm.nextDiceDenom));
         //$log.debug(vm.diceRolls);
      }
      vm.diceCount = vm.nextDiceCount;
      vm.diceDenomination = vm.nextDiceDenom;
   };

   vm.rollOneDie = function(dieType){
      var roll = Math.floor(Math.random() * dieType) + 1;
      //$log.debug(roll);
       return roll;
   };

   vm.clearRecord = function(){
      while(vm.diceRolls.length > 0){
         vm.diceRolls.pop();
      }
   };
   vm.countIncr = function(){
     //$log.debug("calling countIncr()");
     vm.nextDiceCount ++;
     //vm.clearRecord();
  };
  vm.countDecr = function(){
     //$log.debug("calling countDecr()");
     if(vm.nextDiceCount > 1){
       vm.nextDiceCount --;
      }
      //m.clearRecord();
   };


  }
})();
