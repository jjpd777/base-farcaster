
export const BASE_SEPOLIA_CHAIN_ID = 84532;
export const mintContractAddress = '0x83bd615eb93eE1336acA53e185b03B54fF4A17e8';
export const mintABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
    ],
    name: 'mintTo',
    outputs: [],
    stateMutability: 'public',
    type: 'function',
  },
] as const;
