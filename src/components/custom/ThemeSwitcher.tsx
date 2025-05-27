import React from 'react';
import { useTheme, Theme, themeNames } from '../../context/ThemeProvider';
import { Button } from '../ui/button';
import { Palette, Moon, Sun, Cpu, Database, LineChart } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';

const ThemeSwitcher = () => {
  const { theme, setTheme, availableThemes } = useTheme();

  const getThemeIcon = (themeKey: string) => {
    switch (themeKey) {
      case 'light':
        return <Sun className="h-4 w-4" />;
      case 'dark':
        return <Moon className="h-4 w-4" />;
      case 'neural-dark':
        return <Cpu className="h-4 w-4" />;
      case 'data-green':
        return <Database className="h-4 w-4" />;
      case 'ml-orange':
        return <LineChart className="h-4 w-4" />;
      default:
        return <Palette className="h-4 w-4" />;
    }
  };

  const getCurrentThemeIcon = () => {
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      return getThemeIcon(systemTheme);
    }
    return getThemeIcon(theme);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-md">
          {getCurrentThemeIcon()}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(availableThemes).map(([key, name]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => setTheme(key as Theme)}
            className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-secondary focus:bg-secondary focus:outline-none"
          >
            {getThemeIcon(key)}
            <span>{name}</span>
            {theme === key && <span className="ml-auto text-primary">✓</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitcher;