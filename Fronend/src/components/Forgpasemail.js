import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Forgpasemail = (props) => {
    const history = useNavigate();
    const [pass1value, setpass1value] = useState("");
    const [formData, updateFormData] = useState({ email: "" });
    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        })
    };

    const handleSubmit = (e) => {
        const resetpassworddata = async () => {
            try {
                let response = await fetch('http://127.0.0.1:8000/auth/request-reset-email/', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "email": formData.email
                    })
                })
                if (response.status === 200) {
                    setpass1value("");
                    setTimeout(() => {
                        history('/');
                    }, 1000);
                    props.showalert("password reset link is sent to your mail id", "success");
                }
                else {
                    setpass1value("please enter registered mail id, if not then contact with you staff");
                }
            } catch (err) {
                props.showalert("some error ocuur try again later", "danger");
            }

        }
        resetpassworddata();
    }
    return (
        <div className='abcd1'>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">


                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">HOME</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className='anmol'>
                <div className='container text-centre'>
                    <div className="form-groupform-control my-4">
                        <label htmlFor="exampleInputEmail1 my-2">Enter Registered Mail Id</label>
                        <input
                            type="email"
                            className="form-control"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                            name='email'
                            onChange={handleChange}
                        />
                        <small id="passwordHelpBlock" className="form-text text-muted">
                            {pass1value}
                        </small>
                    </div>
                    <button type="submit" onClick={handleSubmit} className="btn btn-primary my-6">Submit</button>
                </div>
            </div>
        </div>
    )
}

export default Forgpasemail
