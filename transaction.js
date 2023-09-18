// This function will send 0.055075 fantom tokens from the user's account to a specified recipient address
// and return the transaction hash that can be seen on Etherscan
async function sendFantomTokens(recipient) {
    // Check if the MetaMask extension is installed
    if (window.ethereum) {
      // Create a web3 instance using the MetaMask provider
      const web3 = new Web3(window.ethereum);
  
      // Request the user to enable MetaMask for your site
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      } catch (error) {
        // Handle the error if the user rejects the request
        console.error(error);
        return null;
      }
  
      // Get the current network id
      const networkId = await web3.eth.net.getId();
  
      // Check if the current network is Fantom testnet
      if (networkId === 250) {
        // Get the current account address
        const accounts = await web3.eth.getAccounts();
        const address = accounts[0];
  
        // Convert the amount of tokens to wei units
        const amount = web3.utils.toWei("0.055075", "ether");
  
        // Create a transaction object with the necessary fields
        const tx = {
          from: address,
          to: recipient,
          value: amount,
          gas: 21000,
          gasPrice: web3.utils.toHex(web3.utils.toWei("15", "gwei"))
        };
  
        // Send the transaction to Fantom testnet and get the transaction hash
        const txHash = await web3.eth.sendTransaction(tx);
  
        // Return the transaction hash
        return txHash;
      } else {
        // Handle the error if the current network is not Fantom testnet
        console.error('Please switch to Fantom testnet');
        return null;
      }
    } else {
      // Handle the error if MetaMask is not installed
      console.error('Please install MetaMask');
      return null;
    }
  }
  