import React from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Forgpass = (props) => {
    const { param1, param2 } = useParams();
    const [formData, updateFormData] = useState({ password1: "", password2: "" });
    const [pass1value, setpass1value] = useState("Must be 8-20 characters long");
    const [pass1value2, setpass1value2] = useState("");

    const history = useNavigate();
    const handleChange = (e) => {

        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        })
        if (formData.password1.length >= 8) {
            setpass1value("ok");
        }

    };
    const handleChange2 = (e) => {

        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        })

    };

    const handleSubmit = (e) => {
        if (formData.password1 === formData.password2) {

            const resetpassworddata = async () => {
                try {
                    await fetch('http://127.0.0.1:8000/auth/password-reset-complete/', {
                        method: 'PATCH',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "password": formData.password2,
                            "token": param2,
                            "uidb64": param1
                        })
                    })
                } catch (err) {

                }
                setTimeout(() => {
                    history('/');
                }, 2000);
                props.showalert("password reset successfully", "success");
            }
            resetpassworddata();
        }
        else {
            setpass1value2("password not matching");
        }
    };
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
                <div className='container my-4'>
                    <div className='my-4' >
                        <div>
                            <div className="form-group my-4">
                                <div className="form-groupform-control my-4">
                                    <label htmlFor="exampleInputEmail1 my-2">Enter New Password</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        aria-describedby="emailHelp"
                                        placeholder="Enter Password"
                                        name='password1'
                                        onChange={handleChange}
                                    />
                                    <small id="passwordHelpBlock" className="form-text text-muted">
                                        {pass1value}
                                    </small>
                                </div>
                                <div className="form-groupform-control my-4">
                                    <label htmlFor="exampleInputEmail1 my-2">Confirm Password</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        aria-describedby="emailHelp"
                                        placeholder="Enter Password"
                                        name='password2'
                                        onChange={handleChange2}
                                    />
                                    <small id="passwordHelpBlock" className="form-text text-muted">
                                        {pass1value2}
                                    </small>
                                </div>
                            </div>

                            <button type="submit" onClick={handleSubmit} className="btn btn-primary my-6">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Forgpass

