import {
    Connection,
    Keypair,
    LAMPORTS_PER_SOL,
    PublicKey,
    SystemProgram,
    Transaction,
    sendAndConfirmTransaction,
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
    return res.lamports / LAMPORTS_PER_SOL;
    //converting the lamports into sol so that user can read the sol not the lamports
}

export const transferSol = async (from, to, amt) => {
  const conn = new Connection("http://localhost:8899", "confirmed");
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: from.publicKey,
      toPubkey: to.publicKey,
      lamports: LAMPORTS_PER_SOL * amt,
    }),
  )

  await sendAndConfirmTransaction(conn, transaction, [
    from
  ])
  console.log("done");
}
/*
(async() => {
  const secretRev = Uint8Array.from([163,11,99,25,139,81,194,80,147,52,36,34,215,125,135,87,252,120,149,34,17,137,224,196,123,214,42,233,59,204,200,161,28,180,30,183,21,138,128,253,213,109,121,106,68,91,203,52,25,50,85,146,251,204,196,146,15,39,245,70,236,96,39,155]);
  
  const secretSend = Uint8Array.from([105,30,10,184,209,66,170,117,73,229,174,114,82,20,202,205,108,167,189,59,167,224,8,146,97,34,30,221,103,177,244,59,104,163,45,197,237,105,162,166,2,145,154,185,151,137,97,188,141,42,165,125,242,22,75,252,138,52,230,82,173,251,144,85])

  const Senderpair = Keypair.fromSecretKey(secretSend);
  const Revpair = Keypair.fromSecretKey(secretRev)
  await transferSol(Senderpair, Revpair, 2);

})();
*/


(async() => {
  
  console.log(await showBal("2w3iSna1AY2wY5psmvG7mAkyQNzj5htxBH6Fs8d7zjrJ")); 
})()

/*
//sendSol.js
const web3 = require("@solana/web3.js");


const connection = new web3.Connection(
    "http://localhost:8899",
    'confirmed',
  );

const secret=[148,228,17,223,206,155,214,220,237,114,66,182,9,119,161,18,160,81,88,60,179,195,98,17,106,11,87,199,186,238,246,39,21,82,33,87,190,244,205,175,160,240,46,59,221,127,198,156,231,98,181,169,14,247,179,191,254,72,64,238,235,87,68,135]; // Replace with your secret key
const from = web3.Keypair.fromSecretKey(new Uint8Array(secret));


// Generate a random address to send to
const to = web3.Keypair.generate();

(async () => {
    const transaction = new web3.Transaction().add(
        web3.SystemProgram.transfer({
          fromPubkey: from.publicKey,
          toPubkey: to.publicKey,
          lamports: web3.LAMPORTS_PER_SOL / 100,
        }),
      );
        
      // Sign transaction, broadcast, and confirm
      const signature = await web3.sendAndConfirmTransaction(
        connection,
        transaction,
        [from],
      );
      console.log('SIGNATURE', signature);
})()
*/