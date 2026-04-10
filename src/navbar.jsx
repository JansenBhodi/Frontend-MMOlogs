import { Container, Navbar } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

const MyNavbar = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    MmoAnalysis
                </Navbar.Brand>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="nav-header">
                        <Navbar.Text as={Link} to="/players/newlog">
                            Upload Log
                        </Navbar.Text>

                        <NavDropdown title="Bosses" id="bosses-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/bosses">
                                All Bosses
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/bosses/create">
                                Boss Creation
                            </NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Players" id="players-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/players">
                                Overview
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/players/registry">
                                Character Registry
                            </NavDropdown.Item>
                        </NavDropdown>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNavbar;
