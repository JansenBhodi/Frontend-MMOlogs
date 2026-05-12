import { Container, Navbar } from 'react-bootstrap';
import { Collapsible } from '@chakra-ui/react';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

const MyNavbar = () => {
    return (
        <Navbar>
            <Container>
                <Navbar.Brand as={Link} to="/">
                    MmoAnalysis
                </Navbar.Brand>
                    <Navbar.Text as={Link} to="/players/newlog">
                        Upload Log
                    </Navbar.Text>

                <Collapsible.Root>
                    <Collapsible.Trigger>
                        Bosses
                    </Collapsible.Trigger>
                    <Collapsible.Content>
                        <Navbar.Text as={Link} to="/bosses">
                            All Bosses
                        </Navbar.Text>
                        <Navbar.Text as={Link} to="/bosses/create">
                            Boss Creation
                        </Navbar.Text>
                    </Collapsible.Content>
                </Collapsible.Root>
                
                <Collapsible.Root>
                    <Collapsible.Trigger>
                        Players
                    </Collapsible.Trigger>
                    <Collapsible.Content>
                        <Navbar.Text as={Link} to="/players">
                            Overview
                        </Navbar.Text>
                        <Navbar.Text as={Link} to="/players/registry">
                            Character Registry
                        </Navbar.Text>
                    </Collapsible.Content>
                </Collapsible.Root>
            </Container>
        </Navbar>
    );
}

export default MyNavbar;
