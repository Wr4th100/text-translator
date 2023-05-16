import { useEffect, useState } from 'react';

export default function useDarkSide() : [string, React.Dispatch<React.SetStateAction<string>>] {
  const [theme, setTheme] = useState(localStorage.theme);
  const colorTheme = theme === 'dark' ? 'light' : 'dark';
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);
    root.classList.add("transition")
    root.classList.add("duration-500")
    root.classList.add("ease-in-out")

    // save theme to local storage
    localStorage.setItem('theme', theme);
  }, [theme, colorTheme]);

  return [colorTheme, setTheme];
}