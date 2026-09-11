// eslint-disable-next-line no-unused-vars
import React,{useState} from 'react';
import { Moon, Sun } from 'lucide-react';


function capitalizeWords(str) {
  return str
    .toLowerCase() // Optional: forces the rest of the letters to lowercase
    .split(' ')    // Splits the string into an array of words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalizes each first letter
    .join(' ');    // Joins the array back into a string
}

const ThemeSwitch = () => {
  // accepting the root node and setting the reverse to switch themes.
  const root = document.documentElement;
  const [theme, setTheme] = useState('Dark');
  
  const handleThemeSwitch = () => {
      const currentTheme = document.documentElement.dataset.theme;
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      if(theme){
        setTheme(capitalizeWords(newTheme));
      }
      root.dataset.theme = newTheme;
  }

  switch (theme){
    case 'Light':
      return (
        <div onClick={handleThemeSwitch} className='flex flex-row w-full md:w-fit h-fit items-center gap-2 font-semibold hover:cursor-pointer text-foreground px-4 py-2 rounded-full hover:shadow hover:bg-muted-foreground hover:text-background'>
          <Sun />
          <p className='md:hidden'>Light Mode</p>
        </div>
      )
    case 'Dark':
      return (
        <div onClick={handleThemeSwitch} className='flex flex-row w-full md:w-fit h-fit items-center gap-2 font-semibold hover:cursor-pointer text-foreground px-4 py-2 rounded-full hover:shadow hover:bg-muted-foreground'>
          
          <Moon />
          <p className='md:hidden'>Dark Mode</p>
        </div>
      )
  }
}

export default ThemeSwitch
