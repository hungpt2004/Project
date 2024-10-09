import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function Home() {

  const [users, setUsers] = useState([]);
  const [loading1, setLoading1] = useState({}); //Đối tượng lưu trạng thái Loading
  const [loading2, setLoading2] = useState({});

  const {id} = useParams();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/users");
    setUsers(result.data);
  }

  const viewUsers = async (id) => {
    setLoading2((prev) => ({...prev, [id]: true}));
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const result = await axios.get(`http://localhost:8080/user/${id}`);
      setUsers(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading2((prev) => ({...prev, [id]:false}));
    }
  }

  const deleteUsers = async (id) => {
    setLoading1((prev) => ({...prev, [id]: true})); //Đặt trạng thái của id user
    //Giải thích
    //Trước khi cập nhật: Giả sử loading là {1: false, 2: false}, có nghĩa là không có người dùng nào đang ở trạng thái loading.
    //Khi gọi setLoading((prev) => ({ ...prev, [id]: true })) với id = 1: loading sẽ trở thành {1: true, 2: false}. 
    //Đối tượng loading bây giờ cho biết rằng người dùng với id = 1 đang ở trạng thái loading, trong khi người dùng với id = 2 thì không.
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await axios.delete(`http://localhost:8080/user/${id}`);
      loadUsers();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading1((prev) => ({...prev, [id]: false}));
    }
  }

  return (
    <div className='container'>
      <div className='py-4'>
        <table className="table text-center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user, index) => (
                <tr>
                  <th scope="row" key={index}>{index}</th>
                  <td>{user.username}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {/* <button className='btn btn-primary mx-2'>View</button> */}
                    <Link className='btn btn-primary mx-2'
                    to={`/viewuser/${user.id}`}
                    >View</Link>

                    <Link className='btn btn-outline-primary mx-2'
                    to={`/edituser/${user.id}`}
                    >Edit</Link>

                    <button 
                    className='btn btn-danger mx-2' 
                    onClick={()=>deleteUsers(user.id)}
                    disabled={loading1[user.id]}
                    >
                      {loading1[user.id] ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      ) : (
                        'Delete'
                        )}
                      </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
