import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

const MyNavbar = () => {
    return (
        <nav className="navbar">
            <h2>MmoAnalysis</h2>
            <div className="links">
                <NavDropdown title="Players" id="basic-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/players">
                        Overview
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/players/registry">
                        Character Registry
                    </NavDropdown.Item>
                </NavDropdown>
            </div>
        </nav>
    );
}

export default MyNavbar;
