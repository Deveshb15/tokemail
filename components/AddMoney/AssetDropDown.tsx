import React from 'react';
import Image from 'next/image';
import Select from 'react-select';
import { Tokens } from '@/hooks/useGetTokens'

const formatOptionLabel = ({ value, label, icon="https://i.ibb.co/ZX63CHy/Expo-App-Icon-Splash.png" }: any, { context }: any) => (
    <div className="flex items-center">
      <Image width={10} height={10} src={icon} alt={label} className="w-5 h-5 mr-2" />
      <span className={context === 'value' ? 'text-white' : 'text-dark-grey'}>{label}</span>
    </div>
  );
  

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: '#E8E8E8',
    border: 'none',
    borderRadius: '0.75rem', 
    padding: '6px 32px',
    display: 'flex',
    alignItems: 'center',
    color: 'black',
    cursor: 'pointer',
    
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: '#fff',
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    color: 'black',
  }),
  indicatorSeparator: (provided: any) => ({
    ...provided,
    display: 'none', 
  }),
};

const DropdownButton: React.FC<{ tokens: Tokens[], selectedToken: any, setSelectedToken: any }> = ({ tokens, selectedToken,  setSelectedToken }) => {
  console.log("TOKENS ", tokens)
  return (
    <div className="">
      <Select
        options={tokens}
        formatOptionLabel={formatOptionLabel}
        styles={customStyles}
        value={selectedToken}
        isSearchable={false}
        onChange={(selectedOption) => setSelectedToken(selectedOption)}
      />
    </div>
  );
};

export default DropdownButton;