import { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'tel';
  value?: string | number;
  onChange?: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  options?: { value: string; label: string }[];
  rows?: number;
}

export default function FormField({
  label,
  name,
  type = 'text',
  value = '',
  onChange,
  placeholder,
  required = false,
  error,
  options = [],
  rows = 3
}: FormFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-2">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none resize-none"
        />
      ) : type === 'select' ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          required={required}
          className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
        >
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
        />
      )}
      
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
} 