import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useNavigate } from "react-router-dom";
import { DropdownButton, Dropdown, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import { BASE_URL } from "../../BASE_URL";

function SecondNavbar() {
  const [token, setToken] = useState(null);
  const [name, setName] = useState("");
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/user/display`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        });
        const data = await response.json();
        setName(data.data[0].name || "");
      } catch (error) {
        console.error("Error fetching data from the backend", error);
      }
    };
    fetchData();
  }, []);
  

  const handleNavigate = () => {
    navigate("/");
  };

  const handlelogin = () => {
    navigate("/login");
  };
  const handlepassword=()=>{
    navigate("/changepassword")
  }
  const contectus=()=>{
    navigate("/Contect-Us")
  }
  const handleLogout = () => {
    setShowLogoutConfirmation(true);
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setShowLogoutConfirmation(false);
    navigate("/login");
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirmation(false);
  };

  const hanldeprofile = () => {
    navigate("/my-profile");
  };

  const handlehome2 = () => {
    navigate("/home");
  };

  return (
    <>
      <Navbar expand="md" className="mb-3 shadow">
        <Container>
          <Navbar.Brand>
            <div className="LogoDesign" onClick={handleNavigate}>
              <img src="/NavLogo.png" alt="one click" className="logoNav" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="112"
                height="12"
                viewBox="0 0 104 12"
                fill="none"
              >
                <path
                  d="M97.2026 0.281943L0.555664 11.1916H97.8164C102.471 11.1916 105.001 5.74872 101.999 2.19082C100.819 0.793056 99.0198 0.0768092 97.2026 0.281943Z"
                  fill="#74CC7E"
                />
              </svg>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Collapse id="offcanvasNavbar">
            <Nav className="justify-content-end flex-grow-1 pe-0 font">
              <Nav.Link className="me-4 font special" onClick={handlehome2}>
                Home
              </Nav.Link>
              <Nav.Link className="me-4 font special" href="#">
                Free Listing
              </Nav.Link>
              <Nav.Link className="me-4 font special" href="#">
                Service
              </Nav.Link>
              <Nav.Link className="me-4 font special" href="#" onClick={contectus}>
                Contact Us
              </Nav.Link>
              {token ? (
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {name}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                  <Dropdown.Item onClick={hanldeprofile}>Profile</Dropdown.Item>
                  <Dropdown.Item href="#/ChangePassword" onClick={handlepassword}>
                     Change Password
                   </Dropdown.Item>
                   <Dropdown.Item onClick={handleLogout}><i class="fas fa-sign-out-alt"></i>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Nav.Link
                  className="me-4 font special"
                  onClick={handlelogin}
                  href="#"
                >
                  Login/Register
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showLogoutConfirmation} onHide={handleCancelLogout} centered >
        <Modal.Body className="pt-5 d-flex flex-column align-items-center body">
          <FontAwesomeIcon icon={faSignOutAlt} size="2x" className="" />
          <span className="mb-3">Are you sure you want to logout?</span>
        </Modal.Body>
        <Modal.Footer>
          <Button className="font-bold" variant="secondary" onClick={handleCancelLogout}>
            No
          </Button>
          <Button className="font-bold" variant="primary" onClick={handleConfirmLogout}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SecondNavbar;
