import React, { forwardRef } from 'react';
import { Check } from 'lucide-react';

const Checkbox = forwardRef((props, ref) => {
  const { label, className, ...rest } = props;
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          ref={ref}
          {...rest}
        />
        <div
          className={`w-5 h-5 border-2 rounded transition-colors ${
            props.checked
              ? 'bg-blue-500 border-blue-500'
              : 'border-gray-300 bg-white'
          }`}
        >
          {props.checked && (
            <Check className="w-4 h-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          )}
        </div>
      </div>
      {label && <span className="text-sm text-gray-700">{label}</span>}
    </label>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;

// Example usage
export const CheckboxExample = () => {
  const [isChecked, setIsChecked] = React.useState(false);

  return (
    <div className="p-4 space-y-4">
      <Checkbox
        label="I agree to the terms and conditions"
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
      />
      <Checkbox
        label="Disabled checkbox"
        disabled
      />
      <Checkbox
        label="Checked and disabled checkbox"
        checked
        disabled
      />
    </div>
  );
};
