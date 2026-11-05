'use client';
import { useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/store/theme';
import { cn } from '@/utils/cn';

export function ThemeToggle({ className }: { className?: string }) {
  const dark = useTheme((s) => s.dark);
  const init = useTheme((s) => s.init);
  const toggle = useTheme((s) => s.toggle);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={toggle}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={dark}
      className={cn('border-slate-200 text-slate-700', className)}
    >
      {dark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
    </Button>
  );
}
