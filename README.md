# btc-smart-accounts

A simplified version of ERC4337.

## Goals

A smart contract managed with a third-party provider
A smart contract managed with MetaMask Wallet

## Technical

Users send UserOperation objects into a separate mempool.
A special class of actor called bundlers package up a set of these objects into a transaction making a handleOps call to a special contract,
and that transaction then gets included in a block.

### UserOperation

Data structure w/ following fields:  
sender address The account making the operation  
nonce uint256 Anti-replay parameter (see “Semi-abstracted Nonce Support” )  
factory address account factory, only for new accounts  
factoryData bytes data for account factory (only if account factory exists)  
callData bytes The data to pass to the sender during the main execution call  
callGasLimit uint256 The amount of gas to allocate the main execution call  
verificationGasLimit uint256 The amount of gas to allocate for the verification step  
preVerificationGas uint256 Extra gas to pay the bunder  
maxFeePerGas uint256 Maximum fee per gas (similar to EIP-1559 max_fee_per_gas)  
maxPriorityFeePerGas uint256 Maximum priority fee per gas (similar to EIP-1559 max_priority_fee_per_gas)  
paymaster address Address of paymaster contract, (or empty, if account pays for itself)  
paymasterVerificationGasLimit uint256 The amount of gas to allocate for the paymaster validation code  
paymasterPostOpGasLimit uint256 The amount of gas to allocate for the paymaster post-operation code  
paymasterData bytes Data for paymaster (only if paymaster exists)  
signature bytes Data passed into the account to verify authorization

### Sender

### EntryPoint

Contract that executes UserOperations

sender address   
nonce uint256   
initCode bytes concatenation of factory address and factoryData (or empty)   
callData bytes   
accountGasLimits bytes32 concatenation of verificationGas (16 bytes) and callGas (16 bytes)   
preVerificationGas uint256   
gasFees bytes32 concatenation of maxPriorityFee (16 bytes) and maxFeePerGas (16 bytes)   
paymasterAndData bytes concatenation of paymaster fields (or empty)   
signature bytes

### Bundler

### Paymaster

Pays for transaction instead of Sender
