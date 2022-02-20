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
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home, PageNotFound, RegisterForm, LoginForm, PreferenceQuiz, About, Profile } from './pages';
import { Footer } from './components';

function App() {

    const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const [theme, setTheme] = useState(defaultDark ? 'dark' : 'light');

    // handles toggling the values that keep track of the current theme
    const toggleDarkMode = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem("DARK_MODE", newTheme);
        changeDisplayMode(newTheme);
    }

    // On page load, we make sure the theme is correct (dark or light)
    useEffect(() => {
        const savedDarkMode = localStorage.getItem("DARK_MODE");

        if (defaultDark && savedDarkMode === 'light') {
            setTheme('light');
        } else {
            if (theme === 'dark') {
                localStorage.setItem("DARK_MODE", theme);
                changeDisplayMode(theme);
            }
    
            if (savedDarkMode !== 'light') {
                if (theme === 'dark') {
                    changeDisplayMode(theme);
                }
            }
        }
    }, [])

    /**
     * changeDisplayMode
     * 
     * Changes the bootstrap theme from light to dark or
     * from dark to light.
     * 
     * @param {'light' or 'dark'} theme 
     */
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
                <Nav.Link href="/profile/a" >Profile</Nav.Link>
                <Nav.Link href="/profile/a" >Maps</Nav.Link>
                <Nav.Link href="/dining">Dining Info</Nav.Link>
                <Nav.Link href="/settings">Settings</Nav.Link>
            </Nav>
            </Container>
        </Navbar>
        <Container>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={LoginForm} />
                    <Route path="/register" component={RegisterForm} changeDisplayMode={changeDisplayMode}/>
                    <Route path="/about" component={About} />
                    <Route path="/preference-quiz" component={PreferenceQuiz} />
                    <Route path="/profile/:id" component={Profile} />
                    <Route path="*" component={PageNotFound} />
                </Switch>
            </BrowserRouter>
        </Container>
            <Footer toggleDark={() => toggleDarkMode()} theme={theme === 'dark' ? true : false}/>
        </div>
    );
}

export default App;
