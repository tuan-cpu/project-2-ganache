const Lottery = artifacts.require("Lottery");

module.exports = function (deployer) {
  deployer.deploy(Lottery, '0xC3Ba8a81B08A73a35eE5E616793b84B8d7F31F68');
};
