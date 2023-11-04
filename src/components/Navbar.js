import { Nav } from 'react-bootstrap';

export default function NavBar() {
    return (
        <Nav
            style={{
                background: '#1b71c8',
                color: 'white',
                marginBottom: '20px',
            }}
        >
            <Nav.Item>
                <Nav.Link href="/home" style={{ color: 'white' }}>
                    HOME
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/dashboard" style={{ color: 'white' }}>
                    DASHBOARD
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/contact" style={{ color: 'white' }}>
                    CONTACT
                </Nav.Link>
            </Nav.Item>
        </Nav>
    );
}
