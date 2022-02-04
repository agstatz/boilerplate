/**
 * ThemeContextWrapper.js
 * 
 * handles switching of the themes, namely between light
 * and dark mode.
 * 
 * @author Ashton Statz
 */

import React, { useState, useEffect } from 'react';
import { ThemeContext, themes } from './ThemeContext';

export default function ThemeContextWrapper(props) {
  const [theme, setTheme] = useState(themes.dark);

  function changeTheme(theme) {
    setTheme(theme);
  }

  // If theme is altered, change these things
  useEffect(() => {
    switch (theme) {
      case themes.light:
        document.body.classList.add('white-content');
        var all = document.getElementsByTagName("*");

        
        for (var i=0, max=all.length; i < max; i++) {
            // change all references to bg-light to bg-dark
            if (all[i].classList.contains("bg-light")) {
                all[i].classList.remove("bg-light");
                all[i].classList.add("bg-dark");
            }
            
            // change all borders to dark borders
            if (all[i].classList.contains("border")) {
                //all[i].classList.remove("border");
                all[i].classList.add("border-dark");
            }

            // change navbars to dark navbars
            if (all[i].classList.contains("navbar-light")) {
                all[i].classList.remove("navbar-light");
                all[i].classList.add("navbar-dark");
            }
        }
        break;
      case themes.dark:
      default:
        document.body.classList.remove('white-content');
        var all = document.getElementsByTagName("*");
        for (var i=0, max=all.length; i < max; i++) {

            // change all references to bg-dark to bg-light
            if (all[i].classList.contains("bg-dark")) {
                all[i].classList.remove("bg-dark");
                all[i].classList.add("bg-light");
            }
            
            // change all dark borders to light borders
            if (all[i].classList.contains("border-dark")) {
                //all[i].classList.add("border");
                all[i].classList.remove("border-dark");
            }

            // change all dark navbars to light navbars
            if (all[i].classList.contains("navbar-dark")) {
                all[i].classList.remove("navbar-dark");
                all[i].classList.add("navbar-light");
            }

        }
        break;
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme: theme, changeTheme: changeTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}