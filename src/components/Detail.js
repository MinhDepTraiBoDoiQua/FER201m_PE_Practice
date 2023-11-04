import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table } from 'react-bootstrap';

export default function Detail() {
    const { id } = useParams();

    const [student, setStudent] = useState({});
    useEffect(() => {
        axios.get(`http://localhost:9999/students/${id}`).then(res => {
            setStudent(res.data);
        });
    }, [id]);
    return (
        <div>
            <h3 style={{ textAlign: 'center' }}>Student Detail</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Date Of Birth</th>
                        <th>Gender</th>
                        <th>Class</th>
                        <th>Image</th>
                        <th>Feedback</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={student.id}>
                        <td>{student.id}</td>
                        <td>{student.name}</td>
                        <td>{student.dateofbirth}</td>
                        <td>{student.gender === true ? 'Male' : 'Female'}</td>
                        <td>{student.class}</td>
                        <td>
                            <img
                                src={`${student.image}`}
                                className="rounded mx-auto d-block"
                                width="200px"
                            ></img>
                        </td>
                        <td>{student.feedback}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}
