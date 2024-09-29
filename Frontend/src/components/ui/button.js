// src/components/ui/button.js
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../lib/utils";

const buttonVariants = ({ variant = 'primary', size = 'medium' } = {}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const variantStyles = variant === 'primary'
    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 shadow';

  const sizeStyles = size === 'large' ? 'px-6 py-3 text-lg' : 'px-4 py-2 text-sm';

  return cn(baseStyles, variantStyles, sizeStyles);
};

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      ref={ref}
      {...props}
    />
  );
});

Button.displayName = "Button";

export { Button, buttonVariants };
