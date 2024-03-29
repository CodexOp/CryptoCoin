pragma solidity >=0.4.22 <0.9.0;

contract codex{
uint256 public totalSupply;
mapping(address => uint256) public balanceOf;
string public name = 'codex';
string public symbol = 'CODEX';
string public standard = 'V1.0';


event Transfer(
  address indexed _from,
  address indexed _to,
  uint256 _value  
);


function transfer(address _to, uint256 _value) public returns (bool success){
require(balanceOf[msg.sender] >= _value);
balanceOf[msg.sender] -= _value;
balanceOf[_to] += _value;

emit Transfer(msg.sender, _to, _value);
return true;
}


constructor(uint256 _initialSupply) public {
  balanceOf[msg.sender] = _initialSupply;
  totalSupply = _initialSupply;
}

}