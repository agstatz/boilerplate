/**
 *  App.jsx
 * 
 *  Main application parent page, all other pages/components
 *  are routed through this component.
 * 
 *  @author Ashton Statz
 */

// Redux imports
import { store } from './store/store'

// Image imports
import logo_dark from './assets/boilerplate_logo_black_1.png';
import logo_light from './assets/boilerplate_logo_light_gray_1.png';

// Component imports
import { useState, useEffect } from 'react';
import { Container, Navbar, Nav, Toast } from 'react-bootstrap';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home, PageNotFound, RegisterForm, LoginForm, PreferenceQuiz, 
         About, Profile, EditAccountForm, Popular, Map, MealPlans,
         MealPlanIndividual } from './pages';
import { Footer } from './components';


function App() {

    const username = store.getState().app.username;
    const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const [theme, setTheme] = useState(defaultDark ? 'dark' : 'light');
    const [showLoggedInWarning, setShowLoggedInWarning] = useState(false);

    // handles toggling the values that keep track of the current theme
    // aka dark mode/light mode
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
                  // change all references of bg-light to bg-dark
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

                  // change tables to dark tables
                  if (all[i].classList.contains("black-content")) {
                      all[i].classList.remove("black-content");
                      all[i].classList.add("white-content");
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

                  
                  // change tables to light tables
                  if (all[i].classList.contains("white-content")) {
                    all[i].classList.remove("white-content");
                    all[i].classList.add("black-content");
                }
              }
              break;
          }
    }

    // handles when a user attempts to sign in
    // (if already signed in, they just get a warning)
    const handleSignInButton = () => {
        if (username) {
            setShowLoggedInWarning(true);
        }
    }

    return (
        <div data-theme={theme} style={{position: 'relative'}}>
            <Navbar className="px-0 bg-light border" variant="light">
                <Container fluid>
                <Navbar.Brand href="/"><img src={theme === 'light' ? logo_dark : logo_light} 
                                            className="primary-logo px-4" 
                                            alt="Boilerplate"></img></Navbar.Brand>
                <Nav className="ml-auto">
                    <Nav.Link href="/" >Home</Nav.Link>
                    <Nav.Link href="/popular">Popular</Nav.Link>
                    <Nav.Link href="/map" >Map</Nav.Link>
                    <Nav.Link href="/search" >Search</Nav.Link>
                    <Nav.Link href={`/profile/${username}`} >Profile</Nav.Link>
                </Nav>
                </Container>
            </Navbar>   
            <Toast  onClose={() => setShowLoggedInWarning(false)}
                    className="bg-light"
                    show={showLoggedInWarning}
                    style={{position: 'fixed', top: '2em', right: '2em', zIndex: '1', color: 'black'}} 
                    delay={3000} autohide >
                <Toast.Header>
                    <strong className="me-auto">Alert</strong>
                    <small>Now</small>
                </Toast.Header>
                <Toast.Body>You are already logged in.</Toast.Body>
            </Toast>
            <Container>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/about" component={About} />
                        <Route path="/edit/:id" component={EditAccountForm} />
                        <Route path="/login" component={LoginForm} />
                        <Route path="/map" component={Map} />
                        <Route exact path="/meal-plans" component={MealPlans} />
                        <Route path="/meal-plans/:id" component={MealPlanIndividual} />
                        <Route path="/popular" component={Popular} />
                        <Route path="/preference-quiz" component={PreferenceQuiz} />
                        <Route path="/profile/:id" component={Profile} />
                        <Route path="/profile/" exact component={PageNotFound} />
                        <Route path="/register" component={RegisterForm}/>
                        <Route path="*" component={PageNotFound} />
                    </Switch>
                </BrowserRouter>
            </Container>
            <Footer toggleDark={() => toggleDarkMode()} theme={theme === 'dark' ? true : false} handleSignIn={() => handleSignInButton()}/>
        </div>
    );
}

export default App;
