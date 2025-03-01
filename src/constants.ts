// Base Mainnet Chain ID (8453) or Base Sepolia Testnet Chain ID (84532)
export const BASE_SEPOLIA_CHAIN_ID = 84532; // Updated to Base Sepolia testnet

// Your deployed NFT contract address on Base Mainnet
export const mintContractAddress = "0xa4DC59e6f5BF53e6511343CB9C20aDcF92D7D903";

// Updated ABI for NftMint contract
export const mintABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "content",
        type: "string",
      },
    ],
    name: "mintStringNFT",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "public",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getTokenContent",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;
