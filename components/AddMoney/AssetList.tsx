import React from 'react';
import Image from "next/image";
import { Tokens } from '@/hooks/useGetTokens'

const Assets: React.FC<{ tokens: Tokens[] }> = ({ tokens }) => {
  return (
    <div>
      <p  className="text-dark-grey lg:text-base text-sm font-medium leading-loose tracking-tighter mb-4">All Assets</p>
      <ul>
        {tokens?.map((token, index) => (
          <li key={index} className="flex items-center mb-4">
            <Image src={token.icon ?? "https://i.ibb.co/ZX63CHy/Expo-App-Icon-Splash.png"} alt={token.name} className="w-7 h-7 mr-4 rounded-full" width={10} height={10} />
            <div className="flex-1">
              <div className="font-semibold text-dark-grey text-base">{token.symbol}</div>
              <div className="text-sm text-ultralight-grey">{token.name}</div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-dark-grey text-base">{token.amount?.toFixed(2)}</div>
              <div className="text-sm text-ultralight-grey">${token.value?.toFixed(2)}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Assets;