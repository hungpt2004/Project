import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddUser() {

    let navigate = useNavigate();
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [user, setUser] = useState({
        name: "",
        username: "",
        email: ""
    });

    const{name, username, email} = user;


    const onInputChange = (e) => {
        setUser({...user,[e.target.name]:e.target.value});
    }

    const cancelClick = () => {
        setLoading1(true);
        setTimeout(()=>{
            setLoading1(false);
            navigate("/");
        }, 1000);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading2(true); // Bắt đầu loading

        // Giả lập thời gian chờ 1 giây
        setTimeout(async () => {
            try {
                await axios.post("http://localhost:8080/user", user); // Gửi dữ liệu
                navigate("/"); // Điều hướng sau khi dữ liệu được gửi thành công
            } catch (error) {
                console.error("Error during registration", error); // Xử lý lỗi
            } finally {
                setLoading2(false); // Tắt loading sau khi quá trình hoàn tất
            }
        }, 1000); // Thực hiện sau 1 giây
    }

    

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Register User</h2>

                    <form onSubmit={(e) => onSubmit(e)}>
                    {/* Name */}
                    <div className="input-group mb-3">
                        <span className="input-group-text w-25">Name</span>
                        <input 
                        type="text" 
                        class="form-control" 
                        placeholder="Enter your name ..." 
                        aria-label="Name" 
                        aria-describedby="basic-addon1" 
                        name='name' 
                        value={name}
                        onChange={(e) => onInputChange(e)}
                        />
                        
                    </div>

                    {/* Username */}
                    <div className="input-group mb-3">
                        <span className="input-group-text w-25">Username</span>
                        <input 
                        type="text" 
                        class="form-control" 
                        placeholder="Enter your username ..." 
                        aria-label="Username" 
                        aria-describedby="basic-addon1" 
                        name='username'
                        value={username}
                        onChange={(e) => onInputChange(e)}
                        />
                        
                    </div>

                    {/* Email */}
                    <div className="input-group mb-3">
                        <span className="input-group-text w-25">Email</span>
                        <input 
                        type="text" 
                        class="form-control"
                        placeholder="Enter your email ..." 
                        aria-label="Email" 
                        aria-describedby="basic-addon1" 
                        name='email'
                        value={email}
                        onChange={(e) => onInputChange(e)}
                        />
                        
                    </div>
                    {/* <button type='submit' className='btn btn-outline-primary mx-2'>Sign Up</button> */}
                    <button className='btn btn-outline-primary mx-2' disabled={loading2}>
                        {loading2 ? (
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        ) : (
                            'Sign Up'
                        )}
                    </button>
                    <button className='btn btn-outline-danger mx-2' onClick={cancelClick} disabled={loading1}>
                        {loading1 ? (
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        ) : (
                            'Cancel'
                        )}
                    </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
