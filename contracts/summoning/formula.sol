// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import { SD59x18, sd } from "@prb/math/src/SD59x18.sol";

contract SummonFormula {

  function f1(int256 gen) public pure returns (SD59x18 result){
    SD59x18 k1 = sd(1.05e18);
    SD59x18 generation = sd(gen);      
    
    result = k1;
    result = result.pow(generation);

  }

  function f2(int256 summonCount_) public pure returns (SD59x18 result){
    SD59x18 k2 = sd(1.1e18);
    SD59x18 summonCount = sd(summonCount_);

    result = k2;
    result = result.pow(summonCount);
  }

  function f3(int256 currentTotalSupply_) public pure returns (SD59x18 result){
    SD59x18 k3 = sd(0.15e18);
    SD59x18 initialTotalSupply = sd(4096e18);
    SD59x18 currentTotalSupply = sd(currentTotalSupply_);
      
    result = currentTotalSupply;
    result = result.div(initialTotalSupply);
    result = result.pow(k3);
  }

  function summonCost(int256 gen, int256 summonCount, int256 currentTotalSupply)external pure returns(SD59x18 result){
    SD59x18 price = sd(100e18);

    result = price;
    result = result.mul(f1(gen)).mul(f2(summonCount)).mul(f3(currentTotalSupply));
  }

}