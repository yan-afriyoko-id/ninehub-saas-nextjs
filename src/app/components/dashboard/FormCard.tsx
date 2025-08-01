import { ReactNode } from 'react';

interface FormCardProps {
  title: string;
  children: ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
  submitText?: string;
  cancelText?: string;
  onCancel?: () => void;
}

export default function FormCard({ 
  title, 
  children, 
  onSubmit, 
  submitText = "Save", 
  cancelText = "Cancel",
  onCancel 
}: FormCardProps) {
  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      
      <form onSubmit={onSubmit} className="p-6">
        <div className="space-y-4">
          {children}
        </div>
        
        {(onSubmit || onCancel) && (
          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-700">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                {cancelText}
              </button>
            )}
            {onSubmit && (
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                {submitText}
              </button>
            )}
          </div>
        )}
      </form>
    </div>
  );
} 