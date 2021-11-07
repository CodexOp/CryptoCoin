var codex = artifacts.require('codex');
contract('codex', (accounts)=>{
it('sets total supply', ()=>{
    return codex.deployed().then(function(instance){
        tokenInstance = instance;
        return tokenInstance.totalSupply();
    }).then(function(totalSupply){
    assert.equal(totalSupply.toNumber(), 100000, 'sets the total supply to 1M')
    })
})
})