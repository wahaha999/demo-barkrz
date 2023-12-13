import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as S from "@app/views/components/StyleComponents";
import classnames from "classnames";

import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
} from "reactstrap";
import * as s from "@app/views/components/StyleComponents";

const CustomNavbar = (props) => {
  const [navbarColor, setNavbarColor] = useState("navbar-transparency");
  const [navbarCollapse, setNavbarCollapse] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    window.onclick = OnClickNavOutSide;
    // window.addEventListener("scroll", updateNavbarColor);

    // return () => {
    //   window.removeEventListener("scroll", updateNavbarColor);
    // };
    // eslint-disable-next-line
  }, []);

  const OnClickNavOutSide = (event) => {
    if (document.querySelector("#customNavbarCloseBtn") === event.target) {
      return;
    }
    if (navbarCollapse) {
      if (event.target !== document.querySelector("#customNavBar")) {
        setNavbarCollapse(!navbarCollapse);
        document.documentElement.classList.toggle("nav-open");
      }
    }
  };
  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  const updateNavbarColor = () => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      setNavbarColor("");
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      setNavbarColor("navbar-transparency");
    }
  };

  return (
    <Navbar
      className={classnames("fixed-top", navbarColor)}
      color-on-scroll="300"
      expand="lg"
    >
      <div className="navbar-translate navbar-fixed-top mt-3">
        <button
          aria-expanded={navbarCollapse}
          className={classnames("navbar-toggler navbar-toggler", {
            toggled: navbarCollapse,
          })}
          style={{ marginRight: "auto", color: "white" }}
        >
          <i
            className="fa fa-bars"
            id="customNavbarCloseBtn"
            onClick={toggleNavbarCollapse}
          />
        </button>
        <NavbarBrand
          data-placement="bottom"
          tag={NavLink}
          href="https://barkrz.com"
        >
          <img
            className="logo-landing-desk"
            src={require("@app/assets/svgs/new/logo-name-white.svg").default}
            alt=""
          />
          <img
            className="ml-4 logo-landing-mob"
            src={require("@app/assets/svgs/new/logo-name-white.svg").default}
            alt=""
          />
        </NavbarBrand>
      </div>
      <Collapse className="justify-content-end" navbar isOpen={navbarCollapse}>
        <Nav navbar className="mr-4" id="customNavBar">
          {isLoggedIn && (
            <NavItem>
              <NavLink
                href="/petsList"
                className={isLoggedIn ? "" : "nav-link-landing"}
              >
                <span
                  className={
                    navbarColor === ""
                      ? "nav-item-span"
                      : "nav-item-span-sticky"
                  }
                >
                  My Pets
                </span>
              </NavLink>
            </NavItem>
          )}
          <NavItem>
            <NavLink
              href="https://shop.barkrz.com"
              className={isLoggedIn ? "" : "nav-link-landing"}
            >
              <span
                className={
                  navbarColor === "" ? "nav-item-span" : "nav-item-span-sticky"
                }
              >
                Shop
              </span>
            </NavLink>
          </NavItem>

          {!isLoggedIn && (
            <NavItem>
              <NavLink
                href="#howitworks"
                className={isLoggedIn ? "" : "nav-link-landing"}
              >
                <span
                  className={
                    navbarColor === ""
                      ? "nav-item-span"
                      : "nav-item-span-sticky"
                  }
                >
                  How It Works
                </span>
              </NavLink>
            </NavItem>
          )}
          {isLoggedIn && (
            <NavItem>
              <NavLink
                href="/documents"
                className={isLoggedIn ? "" : "nav-link-landing"}
              >
                <span
                  className={
                    navbarColor === ""
                      ? "nav-item-span"
                      : "nav-item-span-sticky"
                  }
                >
                  Documents
                </span>
              </NavLink>
            </NavItem>
          )}

          {!isLoggedIn && (
            <NavItem>
              <NavLink
                href="#faq"
                className={isLoggedIn ? "" : "nav-link-landing"}
              >
                <span
                  className={
                    navbarColor === ""
                      ? "nav-item-span"
                      : "nav-item-span-sticky"
                  }
                >
                  FAQ
                </span>
              </NavLink>
            </NavItem>
          )}

          <NavItem>
            <NavLink
              href="/contact-us"
              className={isLoggedIn ? "" : "nav-link-landing"}
            >
              <span
                className={
                  navbarColor === "" ? "nav-item-span" : "nav-item-span-sticky"
                }
              >
                {isLoggedIn ? "Support" : "Contact Us"}
              </span>
            </NavLink>
          </NavItem>
          {isLoggedIn && (
            <NavItem>
              <NavLink
                href="/settings"
                className={isLoggedIn ? "" : "nav-link-landing"}
              >
                <span
                  className={
                    navbarColor === ""
                      ? "nav-item-span"
                      : "nav-item-span-sticky"
                  }
                >
                  Account
                </span>
              </NavLink>
            </NavItem>
          )}
          {!isLoggedIn && (
            <NavItem>
              <NavLink
                href="/auth"
                className={isLoggedIn ? "" : "nav-link-landing"}
              >
                <span
                  className={
                    navbarColor === ""
                      ? "nav-item-span"
                      : "nav-item-span-sticky"
                  }
                >
                  Log In
                </span>
              </NavLink>
            </NavItem>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
