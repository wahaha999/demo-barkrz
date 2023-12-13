import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classnames from "classnames";

import { Collapse, Navbar, NavItem, NavLink, Nav, Container } from "reactstrap";

const MobileNavbar = (props) => {
  const [navbarCollapse, setNavbarCollapse] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    document.documentElement.classList.toggle("nav-open", false);
    window.onclick = OnClickNavOutSide;
    // eslint-disable-next-line
  }, []);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  const OnClickNavOutSide = (event) => {
    if (document.querySelector("#closeBtn") === event.target) {
      return;
    }
    if (navbarCollapse) {
      if (event.target !== document.querySelector("#mobileNavBar")) {
        setNavbarCollapse(!navbarCollapse);
        document.documentElement.classList.toggle("nav-open");
      }
    }
  };

  return (
    <Navbar
      className="fixed-top"
      expand="lg"
      style={{
        backgroundColor: "#7FC4AF",
        height: "60px",
      }}
    >
      <Container>
        <div className="navbar-translate">
          <div className="custom-mobile-logo">
            <NavLink href="/">
              <img
                src={
                  require("@app/assets/svgs/new/logo-name-white.svg").default
                }
                width="120px"
                className="mt-auto mb-auto"
                alt=""
              />
            </NavLink>
          </div>
          <button
            aria-expanded={navbarCollapse}
            className={classnames("navbar-toggler navbar-toggler", {
              toggled: navbarCollapse,
            })}
            style={{ marginRight: "auto", color: "white" }}
          >
            <i
              className="fa fa-bars"
              id="closeBtn"
              onClick={toggleNavbarCollapse}
            />
          </button>
        </div>
        <Collapse
          className="justify-content-end"
          navbar
          isOpen={navbarCollapse}
        >
          <Nav navbar id="mobileNavBar">
            {!isLoggedIn ? (
              <NavItem>
                <NavLink href="/">
                  <span className="mobile-nav-item-span"> Home </span>
                </NavLink>
              </NavItem>
            ) : (
              <NavItem>
                <NavLink href="/petsList">
                  <span className="mobile-nav-item-span"> My Pets </span>
                </NavLink>
              </NavItem>
            )}
            {isLoggedIn && (
              <NavItem>
                <NavLink href="/documents">
                  <span className="mobile-nav-item-span"> Documents </span>
                </NavLink>
              </NavItem>
            )}
            <NavItem>
              <NavLink href="https://shop.barkrz.com">
                <span className="mobile-nav-item-span"> Shop </span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/contact-us">
                <span className="mobile-nav-item-span">Contact Us</span>
              </NavLink>
            </NavItem>
            {!isLoggedIn && (
              <NavItem>
                <NavLink href="/faq">
                  <span className="mobile-nav-item-span"> FAQ </span>
                </NavLink>
              </NavItem>
            )}
            {!isLoggedIn ? (
              <NavItem>
                <NavLink href="/auth">
                  <span className="mobile-nav-item-span"> Log In </span>
                </NavLink>
              </NavItem>
            ) : (
              <NavItem>
                <NavLink href="/settings">
                  <span className="mobile-nav-item-span"> Account </span>
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default MobileNavbar;
