import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Delete() {
    const { id } = useParams();
    const [confirmationShown, setConfirmationShown] = useState(false);

    useEffect(() => {
        if (!confirmationShown) {
            if (window.confirm('Are you sure to delete this student?')) {
                axios
                    .delete(`http://localhost:9999/students/${id}`)
                    .then(res => {
                        alert('Delete successfully');
                        window.location.href = '/dashboard';
                    });
            } else {
                window.location.href = '/dashboard';
            }
            setConfirmationShown(true);
        }
    }, [id, confirmationShown]);
}
