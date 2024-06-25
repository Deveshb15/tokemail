import React from 'react';
import Select from 'react-select';
import { Tokens } from '@/hooks/useGetTokens'

const formatOptionLabel = ({ value, label, icon }: any, { context }: any) => (
    <div className="flex items-center">
      <img src={icon} alt={label} className="w-5 h-5 mr-2" />
      <span className={context === 'value' ? 'text-white' : 'text-dark-grey'}>{label}</span>
    </div>
  );
  

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: '#9261E1',
    border: 'none',
    borderRadius: '0.75rem', 
    padding: '6px 12px',
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

const DropdownButton: React.FC<{ tokens: Tokens[] }> = ({ tokens }) => {
  console.log("TOKENS ", tokens)
  return (
    <div className="w-48">
      <Select
        options={tokens}
        formatOptionLabel={formatOptionLabel}
        styles={customStyles}
        defaultValue={tokens[0]}
        isSearchable={false}
        onChange={(selectedOption) => console.log(selectedOption)}
      />
    </div>
  );
};

export default DropdownButton;