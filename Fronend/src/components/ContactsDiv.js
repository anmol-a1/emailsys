import React from 'react'
import { useState } from 'react'
const ContactsDiv = (props) => {
    const [checked, setChecked] = useState(true);
    return (
        <div style={{textAlign:"center"}}>
            <div className="row my-3">
                <div className="col-sm-4">
                    <label htmlFor="staticEmail2" className="visually-hidden">{props.element.first_name}</label>
                </div>
                <div className="col-sm-4">
                    <label htmlFor="staticEmail2" className="visually-hidden">{props.element.email}</label>
                </div>
                <div className="col-sm-4">
                <input style={{height:"20px",width:"20px"}} type="checkbox"  defaultChecked={checked}
        onChange={() => setChecked(!checked)} value={props.element.email} id="" />
                </div>
            </div>
            <hr />
        </div>
    )
}

export default ContactsDiv
