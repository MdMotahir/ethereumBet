// SPDX-License-Identifier: GPL-3.0
import "./../node_modules/@openzeppelin/contracts/access/Ownable.sol";

pragma solidity ^0.8.11;

contract FlipContract is Ownable {

    uint public ContractBalance;

    event bet(address indexed user, uint indexed bet, bool indexed win, uint8 side);
    event funded(address owner, uint funding);

    //function to simulate coin flip 50/50 randoms
    function flip(uint8 side) public payable returns (bool) {
        require(address(this).balance >= msg.value * 2,"This contract does not have enough funds to cover the bet");
        require(side == 0 || side == 1, "Side must be 0 or 1");
        bool win;

        // if (block.timestamp % 2 == side) {
        if (side == 1) {
            ContractBalance -= msg.value;
            payable(msg.sender).transfer(msg.value * 2);
            win = true;
        } else {
            ContractBalance += msg.value;
            win = false;
        }
        emit bet(msg.sender,msg.value, win, side);
        return win;
    }

    function withdrawAll() public onlyOwner returns(uint) {
        payable(msg.sender).transfer(address(this).balance);
        assert(address(this).balance == 0);
        return address(this).balance;
    }

    function getBalance() public view returns(uint) {
        return ContractBalance;
    }
    function getCurrentBalance() public view returns(uint) {
        return address(this).balance;
    }

    function fundContract() public payable onlyOwner {
        require(msg.value !=0);
        ContractBalance += msg.value;
        emit funded(msg.sender, msg.value);
        assert(ContractBalance == address(this).balance);
    }

}