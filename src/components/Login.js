import { useState } from 'react';
import { Container, Form, Row, Col, Alert, Button } from 'react-bootstrap';
import Loading from './Loading';

export default function Login() {
    const [message, setMessage] = useState('');
    const [errorUsername, setErrorUsername] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [dataLoad, setDataLoad] = useState(false);

    const handleSubmit = event => {
        event.preventDefault();
        if (!username) {
            setErrorUsername('Please enter username');
            if (!password) setErrorPassword('Please enter password');
            return;
        } else if (!password) {
            setErrorPassword('Please enter password');
            return;
        }
        setErrorUsername('');
        setErrorPassword('');
        setDataLoad(false);
        fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
            .then(res => res.json())
            .then(data => {
                setDataLoad(true);
                if (data.id !== undefined) {
                    sessionStorage.setItem('userId', data.id);
                    window.location.href = `/carts/user/${data.id}`;
                } else {
                    setMessage(data.message);
                }
            })
            .catch(error => {
                setDataLoad(true);
                setMessage('Error occurred while logging in.');
            });
    };
    if (!dataLoad) return <Loading />;
    return (
        <Container>
            <h1 style={{ textAlign: 'center' }}>Login Form</h1>

            <Form
                style={{ margin: '0 auto', width: '400px' }}
                onSubmit={handleSubmit}
            >
                {message && <Alert variant="danger">{message}</Alert>}

                <Row className="mb-3 col-12">
                    <Form.Group as={Col} controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            placeholder="Enter your username"
                            onChange={e => setUsername(e.target.value)}
                        />
                        {errorUsername && (
                            <Alert variant="danger">{errorUsername}</Alert>
                        )}
                    </Form.Group>
                </Row>
                <Row className="mb-3 col-12">
                    <Form.Group as={Col} controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            onChange={e => setPassword(e.target.value)}
                        />
                        {errorPassword && (
                            <Alert variant="danger">{errorPassword}</Alert>
                        )}
                    </Form.Group>
                </Row>
                <Button
                    style={{ margin: '12px 160px' }}
                    variant="primary"
                    type="submit"
                >
                    Login
                </Button>
            </Form>
        </Container>
    );
}
