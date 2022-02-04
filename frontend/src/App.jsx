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
import { useState } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, PageNotFound } from './pages';
import { Footer } from './components';
import { ThemeContext, themes } from './styles/ThemeContext';

function App() {

    const [darkMode, setDarkMode] = useState(true);

    return (
        <>
        <Navbar className="px-0 bg-light border" variant="light">
            <Container fluid>
            <Navbar.Brand href="/"><img src={darkMode ? logo_dark : logo_light} 
                                        className="primary-logo px-4" 
                                        alt="Boilerplate"></img></Navbar.Brand>
            <Nav className="ml-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/dining">Dining Info</Nav.Link>
                <Nav.Link href="/settings">Settings</Nav.Link>
            </Nav>
            </Container>
        </Navbar>
        <Container fluid>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
        </Container>
        <ThemeContext.Consumer>
            {({ changeTheme }) => (
            <Footer toggleDark={() => {setDarkMode(!darkMode);
                                    changeTheme(darkMode === true ? themes.light : themes.dark);}}/>
                                    )}
        </ThemeContext.Consumer>
        </>
    );
}

export default App;
