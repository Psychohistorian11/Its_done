import React from 'react';
import './color-picker.css';
import { Input } from '@/components/ui/input';

interface ColorPickerProps {
  onChange: (color: string) => void;
  id: string;
  value?: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ onChange, id, value = "#000000" }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value); 
  };

  return (
    <div className="form-color flex col-span-3">
      <div className="form-input-wrapper">
        <div 
          className="form-input-fill" 
          data-color={value} 
          style={{ backgroundColor: value }}
        />
        <Input 
          type="color" 
          id={id} 
          name={id} 
          value={value} 
          onChange={handleChange} 
        />
      </div>
    </div>
  );
}

export default ColorPicker;
