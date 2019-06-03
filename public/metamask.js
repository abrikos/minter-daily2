function isInstalled() {
	if (typeof web3 !== 'undefined'){
		console.log('MetaMask is installed')
	}
	else{
		console.log('MetaMask is not installed')
	}
}

function isLocked() {
	web3.eth.getAccounts(function(err, accounts){
		if (err != null) {
			console.log(err)
		}
		else if (accounts.length === 0) {
			console.log('MetaMask is locked')
		}
		else {
			//sendDeposit()
			console.log('MetaMask is unlocked')
		}
	});
}

isLocked()

function checkBalance() {
	tokenInst.balanceOf(
		web3.eth.accounts[0],
		function (error, result) {
			if (!error && result) {
				var balance = result.c[0];
				if (balance < balanceNeeded * (100000000)) {
					console.log('MetaMask shows insufficient balance')
					return false;
				}
				console.log('MetaMask shows sufficient balance')
				// Include here your transaction function here
			}
			else {
				console.error(error);
			}
			return false;
		});
}

web3.version.getNetwork((err, netId) => {
	switch (netId) {
		case "1":
			console.log('This is mainnet')
			break
		case "2":
			console.log('This is the deprecated Morden test network.')
			break
		case "3":
			console.log('This is the ropsten test network.')
			break
		case "4":
			console.log('This is the Rinkeby test network.')
			break
		case "42":
			console.log('This is the Kovan test network.')
			break
		default:
			console.log('This is an unknown network.')
	}
})

window.addEventListener("load", function() {
	// Checking if Web3 has been injected by the browser (Mist/MetaMask)
	if (typeof web3 !== "undefined") {
		// Use Mist/MetaMask's provider
		window.web3 = new Web3(web3.currentProvider);
	} else {
		console.log("No web3? You should consider trying MetaMask!");
		// fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
		window.web3 = new Web3(
			new Web3.providers.HttpProvider("https://localhost:8545")
		);
	}

	// APP >

	web3.eth.getAccounts(function(error, accounts) {
		if (!error) {
			web3.eth.getBalance(accounts[0], function(error, balance) {
				if (!error) {
					console.log(
						"Your account: " +
						accounts[0] +
						" has a balance of: " +
						balance.toNumber() / 1000000000000000000 +
						"EthStore"
					);
				} else {
					console.error(error);
				}
			});
		} else {
			console.error(error);
		}
	});
});

web3.eth.getBlock("latest", false, (error, result) => {
	console.log(result.gasLimit)
	// => 8000029
});

function sendDeposit() {
	web3.eth.getAccounts(function(error, result) {
		let tx = {from:result[0],
			to:"0x05F48FcEb7434b24C137a6Ad598e8d0b7938751A",
			value:  web3.toWei(0.01, 'ether'),
			data: web3.toHex("{game:'tote',id:'463636266'}"),
			//gasPrice:web3.toHex(80000),
			gas:web3.toHex(43000),
		};
		web3.eth.sendTransaction(
			tx, function(err, transactionHash) {
				if (!err)
					console.log(transactionHash);
				else console.log(err)
			});


	});

}
