import Web3 from 'web3'
const getProvider = async():Promise<Web3 | Error> => {
    if(window.ethereum){
        return new Web3(window.ethereum);
    }
    else throw new Error("No wallet Found")
}

export default getProvider