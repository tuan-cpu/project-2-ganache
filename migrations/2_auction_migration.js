const Auction = artifacts.require("Auction");

module.exports = function (deployer) {
  deployer.deploy(Auction, '0xC3Ba8a81B08A73a35eE5E616793b84B8d7F31F68');
};
