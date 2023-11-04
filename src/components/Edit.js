import axios from 'axios';
import { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

export default function Edit() {
    const { id } = useParams();

    const [student, setStudent] = useState({});

    const [messageName, setMessageName] = useState('');
    const [messageDateOfBirth, setMessageDateOfBirth] = useState('');
    const [messageGender, setMessageGender] = useState('');
    const [messageClass, setMessageClass] = useState('');
    const [messageImage, setMessageImage] = useState('');

    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [classStudent, setClassStudent] = useState('');
    const [image, setImage] = useState('');
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:9999/students/${id}`).then(res => {
            setName(res.data.name);
            setDateOfBirth(res.data.dateofbirth);
            setGender(res.data.gender ? 1 : 0);
            setClassStudent(res.data.class);
            setImage(res.data.image);
            setFeedback(res.data?.feedback ?? '');
        });
    }, [id]);

    const handleSubmit = e => {
        e.preventDefault();
        setMessageName('');
        setMessageDateOfBirth('');
        setMessageGender('');
        setMessageClass('');
        setMessageImage('');
        let check = true;
        if (!name.trim().includes(' ')) {
            setMessageName('Name must contain at least 2 words');
            check = false;
        }
        if (!image.match(urlRegex)) {
            setMessageImage('Image must be a valid URL');
            check = false;
        }
        if (dateOfBirth === '') {
            setMessageDateOfBirth('Date of birth is required');
            check = false;
        }
        if (gender === '' || gender === -1) {
            setMessageGender('Gender is required');
            check = false;
        }
        if (classStudent === '') {
            setMessageClass('Class is required');
            check = false;
        }

        if (check) {
            let data = {
                name: name,
                dateofbirth: dateOfBirth,
                gender: gender === 1 ? true : false,
                class: classStudent,
                image: image,
                feedback: feedback,
            };

            axios
                .put('http://localhost:9999/students/' + id, data)
                .then(res => {
                    alert('Update student successfully');
                    window.location.href = '/dashboard';
                });
        }
    };
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>
                    Name <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                {messageName && (
                    <Form.Text className="text-muted">
                        <span style={{ color: 'red' }}>{messageName}</span>
                    </Form.Text>
                )}
            </Form.Group>

            <Form.Group>
                <Form.Label>
                    Date of birth <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Form.Control
                    type="date"
                    placeholder="Enter date of birth"
                    value={dateOfBirth}
                    onChange={e => setDateOfBirth(e.target.value)}
                />
                {messageDateOfBirth && (
                    <Form.Text className="text-muted">
                        <span style={{ color: 'red' }}>
                            {messageDateOfBirth}
                        </span>
                    </Form.Text>
                )}
            </Form.Group>

            <Form.Group>
                <Form.Label>
                    Gender <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Form.Control
                    as="select"
                    value={gender}
                    onChange={e => setGender(Number(e.target.value))}
                >
                    <option value={-1}>Select Gender</option>
                    <option value={1}>Male</option>
                    <option value={0}>Female</option>
                </Form.Control>
                {messageGender && (
                    <Form.Text className="text-muted">
                        <span style={{ color: 'red' }}>{messageGender}</span>
                    </Form.Text>
                )}
            </Form.Group>

            <Form.Group>
                <Form.Label>
                    Class <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter class"
                    value={classStudent}
                    onChange={e => setClassStudent(e.target.value)}
                />
                {messageClass && (
                    <Form.Text className="text-muted">
                        <span style={{ color: 'red' }}>{messageClass}</span>
                    </Form.Text>
                )}
            </Form.Group>

            <Form.Group>
                <Form.Label>
                    Image Link <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter image link"
                    value={image}
                    onChange={e => setImage(e.target.value)}
                />
                {messageImage && (
                    <Form.Text className="text-muted">
                        <span style={{ color: 'red' }}>{messageImage}</span>
                    </Form.Text>
                )}
            </Form.Group>

            <Form.Group>
                <Form.Label>Feedback</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter feedback"
                    value={feedback}
                    onChange={e => setFeedback(e.target.value)}
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}
