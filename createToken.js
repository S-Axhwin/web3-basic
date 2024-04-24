import { mintTo, Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
    Keypair, 
    Transaction,
    sendAndConfirmTransaction,
    PublicKey,
    Connection,
    clusterApiUrl,
} from "@solana/web3.js"

import { airdrop } from ".";


const createMint = async (mintWall) => {
    const conn = new Connection("http://localhost:8899");
    const creatorToken = await Token.createMint(conn, mintWall, mintWall.PublicKey, null, 8, TOKEN_PROGRAM_ID);
    return creatorToken.PublicKey;
}

