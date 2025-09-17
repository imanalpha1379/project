import * as React from 'react';
import { cn } from '@/shared/lib/utils';

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-lg border bg-card text-card-foreground shadow-sm',
      className
    )}
    {...props}
  />
));
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-2xl font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

// Cyberpunk variant
const CyberCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    glowColor?: 'cyan' | 'purple' | 'pink' | 'green';
  }
>(({ className, glowColor = 'cyan', ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'relative bg-black/40 backdrop-blur-md border rounded-2xl overflow-hidden transition-all duration-300 group',
      {
        'border-cyan-500/20 hover:border-cyan-400/40 hover:shadow-[0_0_30px_rgba(0,255,255,0.15)]': glowColor === 'cyan',
        'border-purple-500/20 hover:border-purple-400/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]': glowColor === 'purple',
        'border-pink-500/20 hover:border-pink-400/40 hover:shadow-[0_0_30px_rgba(236,72,153,0.15)]': glowColor === 'pink',
        'border-green-500/20 hover:border-green-400/40 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)]': glowColor === 'green',
      },
      className
    )}
    {...props}
  >
    {/* Background gradient */}
    <div className={cn(
      'absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300',
      {
        'bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20': glowColor === 'cyan',
        'bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-cyan-500/20': glowColor === 'purple',
        'bg-gradient-to-br from-pink-500/20 via-orange-500/20 to-red-500/20': glowColor === 'pink',
        'bg-gradient-to-br from-green-500/20 via-cyan-500/20 to-blue-500/20': glowColor === 'green',
      }
    )} />
    
    {/* Top glow line */}
    <div className={cn(
      'absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent to-transparent',
      {
        'via-cyan-400/50': glowColor === 'cyan',
        'via-purple-400/50': glowColor === 'purple',
        'via-pink-400/50': glowColor === 'pink',
        'via-green-400/50': glowColor === 'green',
      }
    )} />
    
    {props.children}
  </div>
));
CyberCard.displayName = 'CyberCard';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, CyberCard };