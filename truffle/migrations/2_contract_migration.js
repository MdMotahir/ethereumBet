const FlipContract = artifacts.require("FlipContract.sol");


module.exports = async function(deployer) {
    await deployer.deploy(FlipContract);
    let instance = await FlipContract.deployed();
    instance.fundContract({value: 90 * 1000000000000000000});
}