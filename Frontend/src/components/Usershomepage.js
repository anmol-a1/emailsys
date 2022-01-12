import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
const Usershomepage = (props) => {
    const location = useLocation();
    const { email, user_name } = location.state;
    return (
        <>
            <div style={{ height: "100vh", width: "100vw", backgroundColor: "#42f548" }}>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link text-primary" to="/">Home</Link>
                            </li>
                            <li className="nav-item active">
                                <p className="nav-link text-primary">{user_name}</p>
                            </li>
                            <li className="nav-item active">
                                <p className="nav-link text-primary">{email}</p>
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


                    </div>
                </div>
            </div>

        </>
    )
}

export default Usershomepage

