const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js")

const  wallet = new Keypair()
const publicKey = wallet.publicKey
const secretKey = wallet.secretKey

console.log("Public Key",publicKey)
console.log("Secret Key",secretKey)

const getWalletBalance = async() => {
    try {
        const connection = new Connection(clusterApiUrl("devnet"),"confirmed")
        const walletBalance = await connection.getBalance(publicKey)
        console.log("Wallet Balance: ",walletBalance)
    } catch(err) {
        console.log(err)
    }
}

const airDropSol = async() => {
    const connection = new Connection(clusterApiUrl("devnet"),"confirmed")
    const fromAirDropSignature = await connection.requestAirdrop(publicKey,1 * LAMPORTS_PER_SOL)
    await connection.confirmTransaction(fromAirDropSignature)
}
const main = async() => {
    await getWalletBalance()
    await airDropSol()
    await getWalletBalance()
}
main()