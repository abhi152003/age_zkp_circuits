require("@nomicfoundation/hardhat-toolbox");
require("hardhat-circom");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  circom: {
    inputBasePath: './circuits',
    ptau: 'https://storage.googleapis.com/zkevm/ptau/powersOfTau28_hez_final_15.ptau',
    circuits: [
      {
        name: 'ageCheck',
      }
    ]
  }
};
