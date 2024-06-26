import React , { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const StudentForm = () => {
    const [data, setData] = useState({
        first_name: '',
        last_name: '',
        gender: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setData ((prev) => {
            return {...prev, [name]: value}
        }) 
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Form Validation
        if (data.first_name.length === 0) {
            toast.error("First name field cannot be empty", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
        } else if (data.last_name.length === 0) {
            toast.error("Last name field cannot be empty", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
        } else if (data.gender.length === 0) {
            toast.error("Gender field cannot be empty", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
        } else {
            axios.post("http://localhost:4000/api/students/addStudent", data)
            .then(res => {
                setData([res.data]);
    
                toast.success("New student successfully added", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                })
                }).catch (err => {
                    console.log(err);
            })
    }}

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="w-25 p-3 mx-auto">
                    <div className="form-group">
                        <label className="mb-1">First Name</label>
                        <input type="text" className="form-control" name="first_name" value={data.first_name} onChange={handleChange}/><br/>
                    </div>
                    <div className="form-group">
                        <label className="mb-1">Last Name</label>
                        <input type="text" className="form-control" name="last_name" value={data.last_name} onChange={handleChange}/><br/>
                    </div>
                    <div className="form-group">
                        <label className="mb-1">Gender</label>
                        <input type="text" className="form-control" name="gender" value={data.gender} onChange={handleChange}/><br/>
                    </div>
                    <div className="form-check mt-3 text-center">
                        <button type="submit" className="btn btn-primary justify-content-center">Register Student</button>
                        <ToastContainer/>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default StudentForm;