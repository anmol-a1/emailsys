import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import ContactsDiv from './ContactsDiv';
import { useNavigate } from 'react-router';
const Adminhomepage = (props) => {
    const history = useNavigate();
    const [load, setload] = useState(false);
    const [data, setdata] = useState([]);
    const [formData, updateFormData] = useState({ email_body: "", email_subject: "" });
    const FetchContacts = async (e) => {

        let response = await fetch('http://127.0.0.1:8000/emails/userslist/')
        let data = await response.json();
        console.log(data);
        setdata(data);
        setload(true);
    };
    const handleChange1 = (e) => {

        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        })


    };

    const handleSubmit = async (e) => {
        var li = [];
        var markedCheckbox = document.querySelectorAll('input[type="checkbox"]:checked');
        for (var checkbox of markedCheckbox) {
            li.push(checkbox.value);
        }
        console.log(li);
        try {
            const was = await fetch('http://127.0.0.1:8000/emails/sendemail/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    list: li,
                    email_body:formData.email_body,
                    email_subject:formData.email_subject

                })
            })
            console.log("hoihoh");
            props.showalert("Email Sent Successfully", "success");
            history('/adminhomepage')
            
        }   
        catch (error) {
            props.showalert("Some Error Occured", "danger");
        }
    };
    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link text-primary" to="/">Home</Link>
                        </li>
                    </ul>
                    <form class="form-inline my-2 my-lg-0">
                            <ul>
                                <li className="nav-item active">
                                    <Link className="nav-link text-primary" to="/">Logout</Link>
                                </li>
                            </ul>

                        </form>
                </div>
            </nav>
            <div style={{ margin: "0px auto", width: "1200px" }}>
                <div className='container my-3'>
                    <button onClick={FetchContacts} class="my-2 btn btn-primary" type="submit">Fetch Contacts</button>
                    {

                        load && data.length > 0 ? data.map((element) => (
                            <ContactsDiv element={element} key={element.id} />

                        )
                        )



                            : <p></p>
                    }
                    {

                        load && data.length > 0 ?

                            <div>
                            <form>
                            <div className="form-group">
                                <label >Email Subject</label>
                                <input type="email" className="form-control"  onChange={handleChange1} aria-describedby="emailHelp"  name="email_subject" placeholder="Enter Subject" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email Body</label>
                                <input type="email" className="form-control"  onChange={handleChange1} aria-describedby="emailHelp"  name="email_body" placeholder="Enter Email Body" />
                            </div>
                            
        
                        </form>
                            </div>
                            : <p></p>
                    }
                    {

                        load && data.length > 0 ?

                            <div className="d-flex justify-content-end">
                                <button type="submit" onClick={handleSubmit} className="btn btn-primary my-5">Submit</button>
                            </div>
                            : <p></p>
                    }
                </div>
            </div>

        </>
    )
}

export default Adminhomepage
