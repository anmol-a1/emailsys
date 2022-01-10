import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router';
import axiosInstance from '../Axios';
import { Link } from 'react-router-dom'

const Start = (props) => {
    const history = useNavigate();
    const [logintext, setlogintext] = useState("")
    const [registertext, setregistertext] = useState("")
    const [formData, updateFormData] = useState({ email: "", password: "" });
    const [formData1, updateFormData1] = useState({ name1: "", email1: "", password: "" });
    const handleChange1 = (e) => {
        updateFormData1({
            ...formData1,
            [e.target.name]: e.target.value.trim(),
        })
    };

    const handleSubmit1 = (e) => {
        e.preventDefault();
        console.log(formData1);
        function ValidateEmail(mail) {
            if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
                return (true)
            }
            setregistertext("invalid email");
            return (false)
        }
        if (formData1.password.length >= 0 && formData1.name1.length >= 3 && ValidateEmail(formData1.email1)) {
            const signupdata = async () => {
                try {
                    const was = await fetch('http://127.0.0.1:8000/auth/create/', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            user_name: formData1.name1,
                            first_name: formData1.name1,
                            email: formData1.email1,
                            password: formData1.password,
                            is_active: true
                        })
                    })
                    const div = document.querySelector('.modal-backdrop') // Get element from DOM
                    div.classList.remove('modal-backdrop');
                    const div1 = document.querySelector('.fade') // Get element from DOM
                    div1.classList.remove('fade');
                    const div2 = document.querySelector('.show') // Get element from DOM
                    div2.classList.remove('show');
                    history('/');
                    props.showalert("signup success","success");

                } catch (err) {
                    setregistertext("error occured");
                }
            }
            signupdata();
        }
        else{
            setregistertext("please fill fields correctly");
        }


    };
    const handleChange = (e) => {

        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        })


    };
    const handleSubmit2 = (e) => {
        const div = document.querySelector('.modal-backdrop') // Get element from DOM
                    div.classList.remove('modal-backdrop');
                    const div1 = document.querySelector('.fade') // Get element from DOM
                    div1.classList.remove('fade');
                    const div2 = document.querySelector('.show') // Get element from DOM
                    div2.classList.remove('show');
                    history('/forgpassemail');
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const loginandgetdata = async () => {
            console.log(formData);
            try {
                const resp = await axiosInstance.post('login/', {
                    email: formData.email,
                    password: formData.password
                });
                localStorage.setItem('access_token', resp.data.access);
                localStorage.setItem('refresh_token', resp.data.refresh);
                axiosInstance.defaults.headers['Authorization'] =
                    'JWT ' + localStorage.getItem('access_token');
                document.getElementById("exampleModalCenter").classList.remove("show");
                const div = document.querySelector('.modal-backdrop') // Get element from DOM
                div.classList.remove('modal-backdrop');
                const div1 = document.querySelector('.fade') // Get element from DOM
                div1.classList.remove('fade');
                const div2 = document.querySelector('.show') // Get element from DOM
                div2.classList.remove('show');
                if (resp.data.isstaff === true) {
                    history('/adminhomepage', {
                        state: {
                            email: resp.data.email,user_name: resp.data.user_name
                        }
                    });
                }
                else {
                    history('/userhomepage', {
                        state: {
                            email: resp.data.email,user_name: resp.data.user_name
                        }
                    });

                }


            } catch (err) {
                setlogintext("Invalid credentials");

                console.log("some error occured");
            }
        }
        loginandgetdata();

    };


    return (
        <>


            <div style={{height:"100vh",width:"100vw",backgroundColor:"#42f548"}}>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">


                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link text-primary" to="/">Email Software</Link>
                        </li>
                    </ul>
                    <form class="form-inline my-2 my-lg-0">
                        <button class="btn btn-outline-success mx-4 my-2 my-sm-0" type="button" data-toggle="modal" data-target="#exampleModalCenter">Login</button>
                        <button class="btn btn-outline-success mx-4 my-2 my-sm-0" type="button" data-toggle="modal" data-target="#exampleModalCenter1">Register</button>
                    </form>

                </div>
            </nav>
            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalCenterTitle">Login Form</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email</label>
                                    <input name="email" type="email" onChange={handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                    <small id="emailHelp" className="form-text text-muted"></small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input style={{ border: '2px solid black' }} name="password" type="password" onChange={handleChange} className="form-control" id="exampleInputPassword1" placeholder="Password" />
                                </div>
                                <div className="form-group form-check">
                                    <input style={{ fontSize: "20px", color: "black" }} onChange={handleChange} type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                                </div>
                                <p style={{color:"red"}}>{logintext}</p>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" onClick={handleSubmit2} className="btn btn-primary">Forgot Password ?</button>
                            <button type="submit" onClick={handleSubmit} className="btn btn-primary">login</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="exampleModalCenter1" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalCenterTitle">Signup Form</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Name</label>
                                    <input type="email" className="form-control" onChange={handleChange1} aria-describedby="emailHelp" name="name1" placeholder="Enter Name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email Address</label>
                                    <input type="email" className="form-control" onChange={handleChange1} aria-describedby="emailHelp" name="email1" placeholder="Enter email" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input type="password" className="form-control" onChange={handleChange1} name="password" placeholder="Password" />
                                    <small id="emailHelp" className="form-text text-muted">Password Must be Atleast 8 Letters Long</small>
                                </div>
                                <p style={{color:"red"}}>{registertext}</p>
                            </form>

                        </div>
                        <div class="modal-footer">
                            <button type="submit" onClick={handleSubmit1} className="btn btn-primary">Signup</button>
                        </div>
                    </div>
                </div>
            </div>
            </div>

        </>


    )
}
export default Start
