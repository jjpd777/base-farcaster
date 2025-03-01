'use client';
import {
  Transaction,
  TransactionButton,
  TransactionStatus,
  TransactionStatusAction,
  TransactionStatusLabel,
} from '@coinbase/onchainkit/transaction';
import type {
  TransactionError,
  TransactionResponse,
} from '@coinbase/onchainkit/transaction';
import type { Address, ContractFunctionParameters } from 'viem';
import {
  BASE_MAINNET_CHAIN_ID,
  mintABI,
  mintContractAddress,
} from '../constants';

export default function TransactionWrapper({ address }: { address: Address }) {
  const contracts = [
    {
      address: mintContractAddress,
      abi: mintABI,
      functionName: 'mintStringNFT',
      args: ['God Bless America.'],
    },
  ] as unknown as ContractFunctionParameters[];

  const handleError = (err: TransactionError) => {
    console.error('Transaction error:', err);
    console.error('Error details:', JSON.stringify(err, null, 2));
  };

  const handleSuccess = (response: TransactionResponse) => {
    console.log('Transaction successful', response);
    console.log('Transaction hash:', response.transactionHash);
    console.log('Full response:', JSON.stringify(response, null, 2));
    
    // Provide link to user
    console.log(`View on Base Scan: https://basescan.org/tx/${response.transactionHash}`);
  };

  return (
    <div className="flex w-[450px]">
      <Transaction
        isSponsored
        contracts={contracts}
        className="w-[450px]"
        chainId={BASE_MAINNET_CHAIN_ID}
        onError={handleError}
        onSuccess={handleSuccess}
      >
        <TransactionButton className="mt-0 mr-auto ml-auto w-[450px] max-w-full text-[white]" />
        <TransactionStatus>
          <TransactionStatusLabel />
          <TransactionStatusAction />
        </TransactionStatus>
      </Transaction>
    </div>
  );
}
