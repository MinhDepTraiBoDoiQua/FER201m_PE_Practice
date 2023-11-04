import axios from 'axios';
import { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Dashboard() {
    const [students, setStudents] = useState([]);
    useEffect(() => {
        axios
            .get('http://localhost:9999/students?_sort=name&_order=asc')
            .then(res => {
                setStudents(res.data);
            });
    }, []);

    return (
        <>
            <h3 style={{ textAlign: 'center' }}>Dash Board</h3>
            <div style={{ textAlign: 'right', marginBottom: '20px' }}>
                <Link to="/add">
                    <Button variant="success">Add Student</Button>{' '}
                </Link>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Date Of Birth</th>
                        <th>Gender</th>
                        <th>Class</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.dateofbirth}</td>
                            <td>
                                {student.gender === true ? 'Male' : 'Female'}
                            </td>
                            <td>{student.class}</td>
                            <td>
                                <img
                                    src={`${student.image}`}
                                    className="rounded mx-auto d-block"
                                    width="200px"
                                ></img>
                            </td>
                            <td>
                                <Link to={`/edit/${student.id}`}>
                                    <Button variant="primary">Edit</Button>{' '}
                                </Link>
                                <Link to={`/delete/${student.id}`}>
                                    <Button variant="danger">Delete</Button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}
