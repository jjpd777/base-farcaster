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
  BASE_SEPOLIA_CHAIN_ID,
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
  };

  const handleSuccess = (response: TransactionResponse) => {
    console.log('Transaction successful', response);
    
    // Extract transaction hash and open Basescan in a new tab
    if (response.transactionReceipts && response.transactionReceipts.length > 0) {
      const transactionHash = response.transactionReceipts[0].transactionHash;
      if (transactionHash) {
        window.open(`https://basescan.org/tx/${transactionHash}`, '_blank');
      }
    }
  };

  return (
    <div className="flex w-[450px]">
      <Transaction
        isSponsored
        contracts={contracts}
        className="w-[450px]"
        chainId={BASE_SEPOLIA_CHAIN_ID}
        onError={handleError}
        onSuccess={handleSuccess}
      >
        <TransactionButton className="mt-0 mr-auto ml-auto w-[450px] max-w-full text-[white]" />
        <TransactionStatus>
          <TransactionStatusLabel />
          {/* Only show the action button for completed transactions */}
          {({ status }) => 
            status === 'confirmed' && <TransactionStatusAction />
          }
        </TransactionStatus>
      </Transaction>
    </div>
  );
}
