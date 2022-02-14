/**
 *  App.jsx
 * 
 *  Main application parent page, all other pages/components
 *  are routed through this component.
 * 
 *  @author Ashton Statz
 */

// Image imports
import logo_dark from './assets/boilerplate_logo_black_1.png';
import logo_light from './assets/boilerplate_logo_light_gray_1.png';

// Component imports
import { useState, useEffect } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, PageNotFound, RegisterForm, LoginForm } from './pages';
import { Footer } from './components';

function App() {

    const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    /*var storedDarkMode = localStorage.getItem("DARK_MODE");*/
    const [theme, setTheme] = useState(defaultDark ? 'dark' : 'light');

    const toggleDarkMode = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        alert("new theme: " + newTheme);
        changeDisplayMode(newTheme);
    }

    /*useEffect(() => {
        storedDarkMode = localStorage.getItem("DARK_MODE");

        if (darkMode != storedDarkMode) {
            //toggleDarkMode();
            return;
        }

        if (darkMode) {
            //alert("trying to change display mode now");
            changeDisplayMode("dark");
        }
    }, [darkMode])*/

    const changeDisplayMode = (theme) => {

        switch (theme) {
            case "dark":
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
            case "light":
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
    }

    return (
        <div data-theme={theme}>
        <Navbar className="px-0 bg-light border" variant="light">
            <Container fluid>
            <Navbar.Brand href="/"><img src={theme === 'light' ? logo_dark : logo_light} 
                                        className="primary-logo px-4" 
                                        alt="Boilerplate"></img></Navbar.Brand>
            <Nav className="ml-auto">
                <Nav.Link href="/" >Home</Nav.Link>
                <Nav.Link href="/dining">Dining Info</Nav.Link>
                <Nav.Link href="/settings">Settings</Nav.Link>
            </Nav>
            </Container>
        </Navbar>
        <Container>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
        </Container>
            <Footer toggleDark={() => toggleDarkMode() /*setDarkMode(!darkMode);
                                    changeTheme(darkMode === true ? themes.light : themes.dark);
            storeDarkMode(darkMode);}*/}/>
        </div>
    );
}

export default App;
