// Base Mainnet Chain ID
export const BASE_SEPOLIA_CHAIN_ID = 8453;

// Your deployed NFT contract address on Base Mainnet
export const mintContractAddress = "0xF10106a1C3dB402955e9E172E01685E2a19820e6";

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
