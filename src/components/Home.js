import axios from 'axios';
import { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Home() {
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
            <h3 style={{ textAlign: 'center' }}>Home</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Date Of Birth</th>
                        <th>Gender</th>
                        <th>Class</th>
                        <th>Image</th>
                        <th>Detail</th>
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
                                <Link to={`/detail/${student.id}`}>
                                    <Button variant="primary">Detail</Button>{' '}
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}
