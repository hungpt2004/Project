import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export default function ViewUser() {

    const [user, setUser] = useState(
        {
            name: "",
            username: "",
            email:""
        }
    );
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {id} = useParams();

    const handleClickBack = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate("/");
        }, 1000)
    };

    const loadUsers = async () => {
        const result = await axios.get(`http://localhost:8080/user/${id}`);
        setUser(result.data);
    };

    useEffect(()=>{
        loadUsers();
    },[]);

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>User Details</h2>
                    <div className='card'>
                        <div className='card-header'>
                            Details of Users Id: {user.id}
                            <ul className='list-group list-group-flush'>
                                <li className='list-group-item'>
                                    <b>Name:</b>
                                    {user.name}
                                </li>
                                <li className='list-group-item'>
                                    <b>Username:</b>
                                    {user.username}
                                </li>
                                <li className='list-group-item'>
                                    <b>Email:</b>
                                    {user.email}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <button onClick={handleClickBack} disabled={loading} className='btn btn-primary my-2'>
                        {loading ? 
                        (<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>) 
                        :
                        ('Back to Home')
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}
