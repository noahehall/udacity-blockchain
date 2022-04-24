pragma solidity <0.9;

contract Message {
    string myMessage;

    function setMessage(string memory _msg) public {
        myMessage = _msg;
    }

    function getMessage() public view returns (string memory) {
        return myMessage;
    }
}
