import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import { cn } from '@/utils/cn';

// The one button for the whole app. Colours are semantic tokens (primary, secondary, accent ...), which each
// route group defines in its own theme: styles/tailwind.css for the public pages, console.css for the admin.
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        dark: 'bg-foreground text-background hover:bg-foreground/90',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40',
        outline:
          'border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:hover:bg-input/50',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
        onDark: 'border border-[#fff]/20 bg-[#fff]/5 text-[#fff] hover:bg-[#fff]/10',
        gold: 'bg-gold text-navy hover:bg-gold/90',
      },
      size: {
        default: 'h-[var(--btn-h,2.25rem)] px-4 py-2 has-[>svg]:px-3',
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: 'h-[var(--btn-h-sm,2rem)] gap-1.5 rounded-md px-3 has-[>svg]:px-2.5',
        lg: 'h-[var(--btn-h-lg,2.5rem)] rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-[var(--btn-h,2.25rem)]',
        'icon-xs': "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

type Props = React.ComponentProps<'button'> &
  Omit<VariantProps<typeof buttonVariants>, 'variant'> & {
    // `plain` applies no styling at all: the older admin dashboard and desks bring their own classes.
    variant?: NonNullable<VariantProps<typeof buttonVariants>['variant']> | 'plain';
    asChild?: boolean;
  };

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: Props) {
  const Comp = asChild ? Slot.Root : 'button';
  const classes =
    variant === 'plain' ? className : cn(buttonVariants({ variant, size, className }));

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={classes}
      {...props}
    />
  );
}

export { Button, buttonVariants };
