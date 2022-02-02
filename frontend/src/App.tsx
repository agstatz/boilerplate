/**
 *  App.tsx
 * 
 *  Main application parent page, all other pages/components
 *  are routed through this component. 
 */

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, PageNotFound } from './pages';
import { Footer } from './components';
import logo from './assets/boilerplate_logo_black_1.png';


function App() {
  return (
      <>
    <Navbar className="px-0 bg-light border" variant="light">
        <Container fluid>
        <Navbar.Brand href="/"><img src={logo} className="primary-logo" alt="Boilerplate"></img></Navbar.Brand>
        <Nav className="ml-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/dining">Dining Info</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
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
    <Footer />
    </>
  );
}

export default App;
