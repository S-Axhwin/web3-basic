import {
    Connection,
    LAMPORTS_PER_SOL,
    PublicKey,
} from "@solana/web3.js";

export const airdrop = async (address, amt) => {
    const pubKey = new PublicKey(address); //convert the public key into usable pubkey
    const conn = new Connection("http://127.0.0.1:8899", "confirmed");
    //Establising connection to the blockchain
    const signa = await conn.requestAirdrop(pubKey, LAMPORTS_PER_SOL*amt);
    //converting lamports into sol so that I can request airdrop to the connection
    await conn.confirmTransaction(signa);
    //after airdroping the sol confirming the transaction into the blockchain network
}

export const showBal = async ( address ) => {
    const pubKey = new PublicKey(address);

    const conn = new Connection("http://127.0.0.1:8899", "confirmed");
    const res = await conn.getAccountInfo( pubKey );
    //connection object have a function called getAccountInfo which takes pubKey as a argument and returs many things about the account such on of them is the how much lamports the induvidual have in there account
    return res.lamports/LAMPORTS_PER_SOL;
    //converting the lamports into sol so that user can read the sol not the lamports
    
}

(async() => {
    const key = "3AaXqCwztQqg5TyBLF9UBXoRVPukNt9xk9XBcujnFC9s";
    const bal = await showBal(key);
    console.log(`the bal of acc is: ${bal}`);
    await airdrop(key, 5);
    const newBal = await showBal(key);
    console.log(`the bal after airdrop is: ${newBal}`);
})();