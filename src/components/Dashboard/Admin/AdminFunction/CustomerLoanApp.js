import React from "react";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import "../.././Admin/admindash.css"
import { GiHamburgerMenu } from "react-icons/gi";
import { BiLogOut } from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";
import { FaHome, FaUserAlt, FaRegCreditCard, FaWpforms,FaQuestionCircle } from "react-icons/fa";
import Kakashi from "../../../../images/NavbarImages/kakashi.ico"
import { RiLuggageDepositFill } from 'react-icons/ri'
import axios from "axios";


const CustomerLoan = () => {

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

    const [Data, setUserData] = useState(getCookie("adminData"));
    useEffect(() => {
        const cookieValue = JSON.parse(getCookie("adminData"));
        setUserData(cookieValue);
    }, []);

    // const [LoanData, setLoanData] = useState(getCookie("loanAppl"));
    // useEffect(() => {
    //     const cookieValue = JSON.parse(getCookie("loanAppl"));
    //     setLoanData(cookieValue);
    // }, []);

    const [LoanData, setLoanData] = useState([]);

    useEffect(() => {
        axios
        .get("http://localhost:8080/api/users/all-users-loan-request")
        .then((response) => {
          console.log(response.data);
          setLoanData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      
    }, []);

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

                    <div>
                        <table className="table table-hover table-responsive">
                            <thead className="table-dark">
                                <tr>
                                    <th scope="col">Loan Type </th>
                                    <th scope="col">FullName </th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone Number </th>
                                    <th scope="col">Loan Ammount</th>
                                    <th scope="col">Monthly Income </th>
                                    <th scope="col">Annual Income </th>
                                    <th scope="col">Profession </th>
                                    <th scope="col">Address </th>
                                    <th scope="col">Status </th>
                                </tr>
                            </thead>
                            <tbody>
                                {LoanData.map((data)=>(
                                     <tr key={data.id}>
                                    <td scope="row">{data.userLoanType}</td>
                                    <td>{data.userFullName}</td>
                                    <td>{data.email}</td>
                                    <td>{data.userPhoneNo}</td>
                                    <td>{data.loanAmountInRupees}</td>
                                    <td>{data.monthlyIncome}</td>
                                    <td>{data.annualIncome}</td>
                                    <td>{data.userProfession}</td>
                                    <td>{data.userAddress}</td>
                                    <td>
                                        <button type="button" className="btn-sm btn btn-success m-1"> Approve</button>
                                        <button type="button" className="btn-sm btn btn-danger m-1"> Deny </button>
                                    </td>
                                </tr>
                                ))}
                               
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>

    )
}

export default CustomerLoan;