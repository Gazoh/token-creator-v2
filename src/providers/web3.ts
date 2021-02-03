import Web3 from 'web3';
import ERC_20_ABI from '../assets/objects/abi.json';

export const connectWeb3 = async (fallback?: any, onError?: Function) => {
    try {
        const providerFallback = process.env.REACT_APP_WEB3_PROVIDER_FALLBACK ? process.env.REACT_APP_WEB3_PROVIDER_FALLBACK : 'http://localhost:3000/';
        // @ts-ignore 
        const ethereum = window.ethereum;
        // @ts-ignore 
        let web3 = window.web3;
        if (typeof ethereum !== 'undefined') {
            await ethereum.enable();
            web3 = new Web3(ethereum);
        } else if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
        } else {
            web3 = new Web3(new Web3.providers.HttpProvider(providerFallback));
        }
        if (fallback) fallback(web3)
    } catch {
        if (onError) onError()
    }
}

/**
 * Get current account chain ID's
 * @param callback returns result of account else console.logs an error
 */
export const getAccounts = async (callback: Function) => {
    // @ts-ignore 
    let web3 = window.web3;
    if(web3 && web3.eth) {
        await web3.eth.getAccounts((error: any, result: any) => {
            if (error) {
                console.log('error', error);
            } else {
                callback(result);
            }
        });
    }
}

/**
 * Get current account chain ID
 * @param number return array number of the current account you want
 * @param fallback return chainID
 */
export const getChainID = (number: number = 0, fallback: Function) => {
    getAccounts((accounts: any) => {
        fallback(accounts[number])
    })
}

/**
 * Get balance of chainID
 * @param chainID return chainID in order to get the balance of the given param(s);
 * @param fallback returns balance
 */
export const balanceOf = async (chainID: any, fallback?: Function) => {
    try {
        connectWeb3((web3: any) => {
            let abi = ERC_20_ABI;
            let tokenChainID = '0x2dC7b857772A4Ef7F9f39A88048F15374e4de161';
            let tokenContract = new web3.eth.Contract(abi, tokenChainID);
            tokenContract.methods.balanceOf(chainID).call().then(function (bal: any) {
                const currentBalance = web3.utils.fromWei(bal, 'ether');
                if (fallback) fallback(currentBalance);
            })
        });
    } catch {
        console.log('nope')
    }
}