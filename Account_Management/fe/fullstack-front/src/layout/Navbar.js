import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddUserClick = () => {
    setLoading(true); // Hiển thị spinner
    setTimeout(() => {
      setLoading(false); // Tắt spinner sau 1 giây
      navigate('/adduser'); // Điều hướng đến trang AddUser
    }, 1000); // Chờ 1 giây trước khi điều hướng
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Full Stack Application</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <button className='btn btn-outline-light' onClick={handleAddUserClick} disabled={loading}>
            {loading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              'AddUser'
            )}
          </button>
        </div>
      </nav>
    </div>
  );
}
