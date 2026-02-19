
import React from 'react';

interface AdPlaceholderProps {
  type: 'header' | 'sidebar' | 'content' | 'footer';
  className?: string;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ type, className = '' }) => {
  const styles = {
    header: 'h-24 w-full bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm',
    sidebar: 'h-64 w-full bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm',
    content: 'h-48 w-full bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm my-8',
    footer: 'h-32 w-full bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm mt-8',
  };

  return (
    <div className={`${styles[type]} ${className}`}>
      {/* AdSense Ad Slot */}
      <div className="text-center">
        <p className="font-medium">ADVERTISEMENT</p>
        <p className="text-xs opacity-60">Your AdSense code would go here</p>
      </div>
    </div>
  );
};
