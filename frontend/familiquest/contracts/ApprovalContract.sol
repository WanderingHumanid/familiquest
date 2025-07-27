// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ApprovalContract {
    address public parent;
    mapping(uint => bool) public questApproved;

    constructor() {
        parent = msg.sender;
    }

    modifier onlyParent() {
        require(msg.sender == parent, "Only parent can approve");
        _;
    }

    function approveQuest(uint questId) public onlyParent {
        questApproved[questId] = true;
    }

    function isApproved(uint questId) public view returns (bool) {
        return questApproved[questId];
    }
}
