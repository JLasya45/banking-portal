import React, { useRef } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../.././Admin/admindash.css"
import { GiHamburgerMenu } from "react-icons/gi";
import { BiLogOut } from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";
import { FaHome, FaUserAlt, FaRegCreditCard, FaWpforms, FaQuestionCircle } from "react-icons/fa";
import { BiSearchAlt } from "react-icons/bi";
import Kakashi from "../../../../images/NavbarImages/kakashi.ico"
import { RiLuggageDepositFill } from 'react-icons/ri'
import jsPDF from "jspdf";
import "jspdf-autotable";

let SuccessIcon = { color: "green" };
let FailedIcon = { color: "red" };

const AllCustomer = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // Get data from cookies
    const getCookie = (name) => {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    const [adminData, setAdminData] = useState(getCookie("adminData"));
    useEffect(() => {
        const cookieValue = JSON.parse(getCookie("adminData"));
        setAdminData(cookieValue);
    }, []);

    const [userData, setUserData] =  useState([]);
        useEffect(() => {
            axios
            .get("http://localhost:8080/api/customers/all-customers")
            .then((response) => {
            console.log(response.data);
            setUserData(response.data);
            })
            .catch((error) => {
            console.log(error);
            });
        
        }, []);



    const tableRef = useRef(null);

    const generatePdf = () => {
        const doc = new jsPDF();
        const imgData = "https://www.goodreturns.in/img/2019/11/csbbanklogo-1574336687.jpeg";
        //const pdfWidth = pdf.internal.pageSize.getWidth();
        doc.addImage(imgData, "JPEG", 4, 4, 25, 10);
        doc.autoTable({ html: "#my-table" });
        doc.save("User_Details.pdf");
    };

    return (
        <>
            <div className="wrapper">
                {/* <!-- Sidebar  --> */}
                <nav id="sidebar" className={sidebarOpen ? "active" : ""}>
                    <div className="sidebar-header fs-5">
                        <Link className="list-item d-flex" to="/userdash">
                            <FaUserAlt className="me-3 mt-1" />
                            <span >{adminData.adminName}</span>
                        </Link>
                    </div>
                    <ul className="list-unstyled components">
                        <li>
                            <Link className="list-item d-flex" to="/admindash">
                                <FaHome className="me-3 mt-1" />
                                <span >Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link className="list-item d-flex" to="/admindash/allcustomer">
                                <BsPeopleFill className="me-3 mt-1" />
                                <span>All Customer</span>
                            </Link>
                        </li>
                        <li>
                            <Link className="list-item d-flex" to="/admindash/customer-kyc">
                                <FaQuestionCircle className="me-3 mt-1" />
                                <span>Customer Kyc Details</span>
                            </Link>
                        </li>
                        <li>
                            <Link className="list-item d-flex" to="/admindash/customer-card">
                                <FaRegCreditCard className="me-3 mt-1" />
                                <span>Customer Card Application </span>
                            </Link>
                        </li>
                        <li>
                            <Link className="list-item d-flex" to="/admindash/customer-loan">
                                <FaWpforms className="me-3 mt-1" />
                                <span>Customer Loan Application</span>
                            </Link>
                        </li>
                        <li>
                            <Link className="list-item d-flex" to="/admindash/deposit">
                                <RiLuggageDepositFill className="me-3 mt-1" />
                                <span>Deposit In User Account</span>
                            </Link>
                        </li>
                        <li>
                            <Link className="list-item d-flex" to="/admindash/customer-query">
                                <FaQuestionCircle className="me-3 mt-1" />
                                <span>Query from User</span>
                            </Link>
                        </li>
                        <li>
                            <Link className="list-item d-flex" to="/admindash/usergoldloan-app">
                                <FaQuestionCircle className="me-3 mt-1" />
                                <span>User Gold Loan Appliaction</span>
                            </Link>
                        </li>
                    </ul>

                    <ul className="list-unstyled CTAs">
                        <li>
                            <Link to="/" className="logout d-flex col"><BiLogOut className="me-3 mt-1 col-3" />
                                <span className="col-4">Logout</span>
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* <!-- Page Content  --> */}
                <div id="content">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                            <button type="button" onClick={toggleSidebar} id="sidebarCollapse" className="btn btn-outline-dark align-middle">
                                <GiHamburgerMenu />
                            </button>
                            <h3><span><img className='mb-1' src={Kakashi} width="30px" /></span><strong>PSL Bank Ltd.</strong></h3>
                        </div>
                    </nav>
                    <div className="text-center fs-1 mb-5">All the Customer </div>
                    <div className="card">
                        <div className="card-header fw-bold text-white bg-dark fs-1">
                            Search User
                        </div>
                        <div className="card-body d-flex row">
                            <div className="col-md-6 mb-2">
                                <input type="text" id="acc_no" className="form-control col-6" placeholder='Enter account number' />
                            </div>
                            <div className="col-md-6 mb-2">
                                <input type="text" id="ifsc_no" className="form-control col-6" placeholder='Enter ifsc code' />
                            </div>
                            <div className="row d-flex justify-content-center">
                                <button className="btn btn-outline-secondary col-md-4 mt-3"> Search </button>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header fw-bold text-white bg-dark fs-1">
                            Search User to Delete <BiSearchAlt />
                        </div>
                        <div className="card-body d-flex row">
                            <div className="col-md-6 mb-2">
                                <input type="text" id="userId" className="form-control col-6" placeholder='Enter User Id' />
                            </div>
                            <div className="col-md-6 text-start">
                                <button type="button" className="btn-sm btn btn-danger m-1"> Delete </button>
                            </div>
                        </div>
                    </div>




                    <div className="col data-table mt-4">
                        <table className="table bg-white shadow-sm  text-center table-hover userTable" ref={tableRef} id="my-table">
                        <thead className="table-dark" >
                            <tr>
                                <th scope="col">Acc no.</th>
                                <th scope="col">User_Name</th>
                                <th scope="col">User_Email</th>
                                <th scope="col">Adhar_Card</th>
                                <th scope="col">PAN_Card</th>
                                <th scope="col">Contact_Info</th>
                                <th scope="col">DOB</th>
                                <th scope="col">Gender</th>
                                <th scope="col">Address</th>
                                <th scope="col">Delete User</th>
                            </tr>
                        </thead>
                        <tbody>
                        {userData.map((data) => (
                            <tr>
                                <td>{data.userAccountNumber}</td>
                                <td>{data.userName}</td>
                                <td>{data.email}</td>
                                <td>{data.userAadharNo}</td>
                                <td>{data.userPAN}</td>
                                <td>{data.userPhoneNo}</td>
                                <td>{data.userDOB}</td>
                                <td>{data.userGender}</td>
                                <td>{data.userAddress}</td>

                                <td>
                                    <button type="button" className="btn-sm btn btn-danger m-1"> Delete </button>
                                </td>
                            </tr>))}
                        </tbody>
                    </table>
                    <div className="col-md-6 text-start">
                        <button type="submit" className="btn btn-outline-success shadow p-1 mb-5 rounded-1 justify-content-center" onClick={generatePdf}>
                            Generate Pdf</button>
                    </div>

                </div>
            </div>
        </div>
        </>

    )
}

export default AllCustomer;