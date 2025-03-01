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
import { useEffect, useState } from 'react';
import type { Address, ContractFunctionParameters } from 'viem';
import { publicClient } from 'wagmi';
import {
  BASE_SEPOLIA_CHAIN_ID,
  mintABI,
  mintContractAddress,
} from '../constants';

export default function TransactionWrapper({ address }: { address: Address }) {
  const [txHash, setTxHash] = useState<string | null>(null);
  const [mintedTokenId, setMintedTokenId] = useState<string | null>(null);
  
  // Log initial component mount and configuration
  useEffect(() => {
    console.log('TransactionWrapper initialized with:', {
      userAddress: address,
      chainId: BASE_SEPOLIA_CHAIN_ID,
      contractAddress: mintContractAddress,
      isSponsored: true
    });
  }, [address]);
  
  // Monitor transaction if we have a hash
  useEffect(() => {
    if (!txHash) return;
    
    const checkTransaction = async () => {
      try {
        const client = publicClient();
        console.log('Fetching transaction receipt for:', txHash);
        const receipt = await client.getTransactionReceipt({ hash: txHash as `0x${string}` });
        
        console.log('Transaction receipt:', {
          status: receipt.status,
          blockNumber: receipt.blockNumber,
          gasUsed: receipt.gasUsed.toString(),
          effectiveGasPrice: receipt.effectiveGasPrice.toString(),
          logs: receipt.logs
        });
        
        // Try to extract the token ID from logs if the transaction was successful
        if (receipt.status === 'success' && receipt.logs.length > 0) {
          // Most NFT contracts emit a Transfer event with the token ID as the 3rd topic
          console.log('Looking for Transfer event in logs...');
          const transferEvent = receipt.logs.find(log => 
            log.topics[0] === '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
          );
          
          if (transferEvent && transferEvent.topics.length >= 4) {
            const tokenId = parseInt(transferEvent.topics[3], 16).toString();
            console.log('Found minted token ID:', tokenId);
            setMintedTokenId(tokenId);
          } else {
            console.log('No Transfer event found in logs');
          }
        }
      } catch (error) {
        console.error('Error checking transaction:', error);
      }
    };
    
    checkTransaction();
    // Set up polling to check transaction status
    const interval = setInterval(checkTransaction, 5000);
    return () => clearInterval(interval);
  }, [txHash]);

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
    console.error('Error details:', {
      code: err.code,
      message: err.message,
      stack: err.stack,
      name: err.name
    });
    
    if (err.cause) {
      console.error('Error cause:', err.cause);
    }
  };

  const handleSuccess = (response: TransactionResponse) => {
    console.log('Transaction successful', response);
    console.log('Transaction details:', {
      hash: response.hash,
      chainId: response.chainId,
      from: response.from,
      to: response.to,
      data: response.data,
      value: response.value?.toString() || '0',
      gasLimit: response.gasLimit?.toString() || 'unknown'
    });
    
    // Store the transaction hash for monitoring
    setTxHash(response.hash);
    
    // Log the block explorer URLs for easy verification
    const isMainnet = response.chainId === 8453;
    const baseUrl = isMainnet 
      ? 'https://basescan.org' 
      : 'https://sepolia.basescan.org';
    
    console.log('View transaction on BaseScan:', 
      `${baseUrl}/tx/${response.hash}`);
    console.log('View address on BaseScan:', 
      `${baseUrl}/address/${address}`);
    console.log('View contract on BaseScan:', 
      `${baseUrl}/address/${mintContractAddress}`);
  };

  return (
    <div className="flex w-[450px] flex-col">
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
          <TransactionStatusAction />
        </TransactionStatus>
      </Transaction>
      
      {mintedTokenId && (
        <div className="mt-4 p-3 bg-green-100 text-green-800 rounded">
          Token ID: {mintedTokenId} minted successfully!<br/>
          <a 
            href={`https://${BASE_SEPOLIA_CHAIN_ID === 8453 ? 'basescan.org' : 'sepolia.basescan.org'}/token/${mintContractAddress}?a=${mintedTokenId}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline"
          >
            View on BaseScan
          </a>
        </div>
      )}
    </div>
  );
}
