import React from 'react';


interface Asset {
  icon: string; 
  name: string;
  fullName: string;
  value: string;
  amount: string;
}

const assets: Asset[] = [
  { icon: '/degen-icon.png', name: 'BTC', fullName: 'Bitcoin', value: '$824.00', amount: '0.0000035 BTC' },
  { icon: '/eth-icon.png', name: 'ETH', fullName: 'Ethereum', value: '$164.00', amount: '0.000091 ETH' },
  { icon: '/degen-icon.png', name: 'DEGEN', fullName: 'Degen', value: '$649.00', amount: '0.0012 DEGEN' },
  { icon: '/eth-icon.png', name: 'SOL', fullName: 'Solana', value: '$1,380.00', amount: '0.040 SOL' },
  { icon: '/degen-icon.png', name: 'SOL', fullName: 'Solana', value: '$1,380.00', amount: '0.040 SOL' },
];

const Assets: React.FC = () => {
  return (
    <div>
      <p  className="text-dark-grey lg:text-base text-sm leading-loose tracking-tighter mb-4">All Assets</p>
      <ul>
        {assets.map((asset, index) => (
          <li key={index} className="flex items-center mb-4">
            <img src={asset.icon} alt={asset.name} className="w-7 h-7 mr-4"/>
            <div className="flex-1">
              <div className="font-semibold text-dark-grey text-base">{asset.name}</div>
              <div className="text-sm text-ultralight-grey">{asset.fullName}</div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-dark-grey text-base">{asset.value}</div>
              <div className="text-sm text-ultralight-grey">{asset.amount}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Assets;