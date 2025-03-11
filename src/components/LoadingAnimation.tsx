
import React from 'react';

export const LoadingAnimation = () => {
  return (
    <div className="loading-dots flex space-x-1.5 items-center">
      <span className="w-2.5 h-2.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
      <span className="w-2.5 h-2.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
      <span className="w-2.5 h-2.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
    </div>
  );
};
