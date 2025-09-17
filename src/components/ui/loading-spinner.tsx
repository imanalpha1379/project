import * as React from 'react';
import { cn } from '@/shared/lib/utils';

interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'cyber';
}

const LoadingSpinner = React.forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({ className, size = 'md', variant = 'default', ...props }, ref) => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-8 h-8',
      lg: 'w-12 h-12',
    };

    if (variant === 'cyber') {
      return (
        <div
          ref={ref}
          className={cn('flex items-center justify-center', className)}
          {...props}
        >
          <div className={cn(
            'relative',
            sizeClasses[size]
          )}>
            {/* Outer ring */}
            <div className="absolute inset-0 border-2 border-cyan-400/20 rounded-full"></div>
            
            {/* Spinning ring */}
            <div className="absolute inset-0 border-2 border-transparent border-t-cyan-400 border-r-purple-400 rounded-full animate-spin"></div>
            
            {/* Inner glow */}
            <div className="absolute inset-2 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-full animate-pulse"></div>
            
            {/* Center dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-center', className)}
        {...props}
      >
        <div
          className={cn(
            'border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin',
            sizeClasses[size]
          )}
        />
      </div>
    );
  }
);
LoadingSpinner.displayName = 'LoadingSpinner';

export { LoadingSpinner };