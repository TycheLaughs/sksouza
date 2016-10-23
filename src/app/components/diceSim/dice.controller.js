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

   vm.rollDice = function(){
      vm.clearRecord();
      for(var i = 0; i < vm.diceCount; i++){
         vm.diceRolls.push(vm.rollOneDie(vm.diceDenomination));
         //$log.debug(vm.diceRolls);
      }
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
     vm.diceCount ++;
  };
  vm.countDecr = function(){
     //$log.debug("calling countDecr()");
     if(vm.diceCount > 1){
       vm.diceCount --;
      }
   };


  }
})();
