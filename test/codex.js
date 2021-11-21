var codex = artifacts.require('codex');
contract('codex', (accounts)=>{
it('sets total supply', ()=>{
    return codex.deployed().then(function(instance){
        tokenInstance = instance;
        return tokenInstance.totalSupply();
    }).then(function(totalSupply){
    assert.equal(totalSupply.toNumber(), 100000, 'sets the total supply to 1M')
    return tokenInstance.balanceOf(accounts[0]);
    }).then(function(adminBalance){
        assert.equal(adminBalance.toNumber(), 100000, 'allocates the initial supply of admin')
    })
})

it('Checking Name', ()=>{
return codex.deployed().then(function(instance){
    tokenInstance = instance;
    return tokenInstance.name();
}).then(function(name){
assert.equal(name, 'codex', 'has correct name')
return tokenInstance.symbol();
}).then(function(symbol){
assert.equal(symbol, 'CODEX', 'has correct symbol')
return tokenInstance.standard();
}).then((standard)=>{
assert.equal(standard, 'V1.0', 'has correct standard')
})
})


it('Trasfer function', ()=>{
    return codex.deployed().then((instance)=>{
    tokenInstance = instance;

    return tokenInstance.transfer.call(accounts[1], 99999999999999999)
    }).then(assert.fail).catch(function(error){
        assert(error.message, 'error message must contain revert');
        return tokenInstance.transfer(accounts[1], 20000, {from:accounts[0]})
    }).then((receipt)=>{
        assert.equal(receipt.logs.length, 1, 'trigger one event');
        assert.equal(receipt.logs[0].event, 'Transfer', 'Should Be A "transfer" event');
        assert.equal(receipt.logs[0].args._from, accounts[0], 'logs the account token are transferred from');
        assert.equal(receipt.logs[0].args._to, accounts[1], 'logs the account token are transferred to');
        assert.equal(receipt.logs[0].args._value, 20000, 'logs the transferred token value');



return tokenInstance.balanceOf(accounts[1]);
    }).then((balance)=>{
assert.equal(balance.toNumber(), 20000, 'adds the amount to the receiving amount');
return tokenInstance.balanceOf(accounts[0])
    }).then((balance)=>{
        assert.equal(balance.toNumber(), 80000, 'deducts from sender account')
    })
});

})  