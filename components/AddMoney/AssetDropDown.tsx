import React from 'react';
import Select from 'react-select';

const options = [
  { value: 'btc', label: 'BTC', icon: '/degen-icon.png' },
  { value: 'eth', label: 'ETH', icon: '/eth-icon.png' },
  { value: 'sol', label: 'SOL', icon: '/degen-icon.png' },
];

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

const DropdownButton: React.FC = () => {
  return (
    <div className="w-48">
      <Select
        options={options}
        formatOptionLabel={formatOptionLabel}
        styles={customStyles}
        defaultValue={options[0]}
        isSearchable={false}
      />
    </div>
  );
};

export default DropdownButton;