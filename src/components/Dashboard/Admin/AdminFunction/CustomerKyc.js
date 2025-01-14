import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../.././Admin/admindash.css"
import { GiHamburgerMenu } from "react-icons/gi";
// import { AiFillCloseCircle, AiFillCheckCircle } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";
import { FaHome, FaUserAlt, FaRegCreditCard, FaWpforms, FaQuestionCircle } from "react-icons/fa";
// import {BiSearchAlt} from "react-icons/bi";
import Kakashi from "../../../../images/NavbarImages/kakashi.ico"
import { RiLuggageDepositFill } from 'react-icons/ri'
import jsPDF from "jspdf";
import "jspdf-autotable";

const CustomerKyc = () => {

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

    const [Data, setUserData] = useState(getCookie("userData"));
    useEffect(() => {
        const cookieValue = JSON.parse(getCookie("userData"));
        setUserData(cookieValue);
    }, []);


    const tableRef = useRef(null);

    const generatePdf = () => {
        const doc = new jsPDF();
        doc.autoTable({ html: "#my-table" });
        doc.save("statement.pdf");
    };

    return (
        <>
            <div className="wrapper">
                {/* <!-- Sidebar  --> */}
                <nav id="sidebar" className={sidebarOpen ? "active" : ""}>
                    <div className="sidebar-header fs-5">
                        <Link className="list-item d-flex" to="/userdash">
                            <FaUserAlt className="me-3 mt-1" />
                            <span >{Data.adminName}</span>
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
                    <div className="text-center fs-1 mb-5">Search by Kyc Details</div>
                    <div className="card">
                    <div className="card-header fw-bold text-white bg-dark fs-1">
                                        Search User
                                    </div>
                        <div className="card-body row">
                            <div className="col-md-8 mb-2 justify-content-center">
                                <input type="text" id="user_id" className="form-control col-6" placeholder='Enter User id' />
                            </div>
                            
                            <div className="row d-flex justify-content-center">
                                <button className="btn btn-outline-secondary col-md-4 mt-3"> Search </button>
                            </div>
                        </div>
                    </div>

                    {/* <div className="card">
                    <div className="card-header fw-bold text-white bg-dark fs-1">
                                        Search User to Delete <BiSearchAlt />
                                    </div>
                        <div className="card-body d-flex row">
                            <div className="col-md-6 mb-2">
                                <input type="text" id="acc_no" className="form-control col-6" placeholder='Enter account number' />
                            </div>
                            <div className="col-md-6 text-start">
                            <button type="button" className="btn-sm btn btn-danger m-1"> Delete </button>
                            </div>
                            </div>
                            </div>
 */}

                    
                        
                            <div className="col data-table mt-4">
                                <table className="table bg-white shadow-sm  text-center table-hover" ref={tableRef} id="my-table">
                                    <thead className="table-dark">
                                        <tr>
                                            <th scope="col">Acc no.</th>
                                            <th scope="col">PAN_Card</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>8098987767878978</td>
                                            <td>BDPPL8756R</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                </div>
            </div>
        </>

    )
}

export default CustomerKyc;