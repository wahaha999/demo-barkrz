import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import * as S from "@app/views/components/StyleComponents";
import { post } from "@app/constants.js";

const FooterPage = (props) => {
  const initialState = {
    subscribe_email: "",
  };
  const [{ subscribe_email }, setState] = useState(initialState);

  const subscribe = async (e) => {
    e.preventDefault();
    const response = await post("subscribe", { email: subscribe_email });
    if (response.data.success === true) {
      setState((prevState) => ({ ...prevState, subscribe_email: "" }));
      Swal.fire({
        text: "Thanks for subscribing to our newsletter! Be on the lookout for exciting new updates.",
        icon: "success",
        timer: 4000,
      });
    }
  };

  const OnHandleChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    window.addEventListener("load", props.reveal);
  }, []);

  return (
    <>
      <S.Container background="#1F1F39" mt="0" className="reveal">
        <S.PositionContent top="-30px" left="15%">
          <img
            src={require("@app/assets/svgs/new/Graphic Elements.svg").default}
            alt="Graphic"
          />
        </S.PositionContent>
        <div style={{ paddingTop: "25px" }} className="reveal">
          <S.Title mt="100" color="#FFFFFF" mSize="30">
            Join Our Newsletter
          </S.Title>
          <S.Comment2
            color="rgba(255, 255, 255, 0.5)"
            text="center"
            mb="50"
            mMb="20"
            mColor="rgba(255, 255, 255, 0.5)"
          >
            Stay up to date on recent pet tech news, health tips, and more. We
            look forward to seeing you join the community!
          </S.Comment2>
          <S.Content width="40" mt="10" mMt="0" pPadding="20">
            <S.Form onSubmit={subscribe}>
              <S.Input
                placeholder="Enter your email address"
                onChange={OnHandleChange}
                value={subscribe_email}
                name="subscribe_email"
                type="email"
                width="70"
                mWidth="100"
                background="transparent"
                required
              />
              <S.Button
                background="#7FC4AF"
                margin="0"
                width="25"
                mWidth="100"
                joinBtn="true"
                border="none"
                type="submit"
              >
                Submit
              </S.Button>
            </S.Form>
          </S.Content>
        </div>
        <S.Footer ref={props.contactToRef} className="reveal">
          <S.Column width="33.33" mt="50" mText="center">
            <img
              src={require("@app/assets/svgs/new/logo-name-white.svg").default}
              alt="Logo"
            />
            <S.Comment2
              color="rgba(255, 255, 255, 0.5)"
              text="left"
              mColor="rgba(255, 255, 255, 0.5)"
              mText="center"
              mt="20"
              mMt="30"
            >
              support@barkrz.com
            </S.Comment2>
          </S.Column>
          <S.Column mt="50" mMt="10">
            <S.Title2 color="#FFFFFF" display="none">
              Company
            </S.Title2>
            <S.Link
              mt="20"
              mText="center"
              href="https://shop.barkrz.com"
              target="_blank"
            >
              Shop
            </S.Link>
            <S.Link mt="10" href="#howitworks" mText="center">
              How it works
            </S.Link>
            <S.Link mt="10" href="#faq" mText="center">
              FAQ
            </S.Link>
            <S.Link mt="10" href="/contact-us" mText="center">
              Contact
            </S.Link>
            <S.Link mt="10" href="/auth" mText="center">
              Login
            </S.Link>
          </S.Column>
          <S.Column mt="50" mMt="0">
            <S.Title2 color="#FFFFFF" display="none">
              Legal
            </S.Title2>
            {/* <S.Link mt="10" mText="center">
            Terms & Conditions
          </S.Link> */}
            <S.Link
              mt="10"
              href="https://www.privacypolicygenerator.info/live.php?token=T7ZhiggfVkTXQ90hKwa8S8mzOwAMw78B"
              mText="center"
            >
              Privacy Policy
            </S.Link>
          </S.Column>
          <S.Column mt="50">
            <S.Content mt="0" mMt="0" text="center">
              <a href="https://www.facebook.com/Barkrzpetid/">
                <S.Icon className="fab fa-facebook" />
              </a>
              <a href="https://www.instagram.com/barkrzusa/?hl=en">
                <S.Icon className="fab fa-instagram" ml="30" />
              </a>
            </S.Content>
            <S.Content mt="20" mMt="40">
              <S.Comment2 mColor="#FFFFFF">
                Your Favorite Pet ID! © 2023
              </S.Comment2>
              {/* <S.Button width="80" background="#FFFFFF" color="#1F1F39">
                <img
                  src={require("@app/assets/svgs/new/image 3.svg").default}
                  alt="App Store"
                />
                Coming Soon!
              </S.Button>
              <S.Button width="80" background="#FFFFFF" color="#1F1F39">
                <img
                  src={require("@app/assets/svgs/new/image 4.svg").default}
                  alt="Play Store"
                />
                Coming Soon!
              </S.Button> */}
            </S.Content>
          </S.Column>
        </S.Footer>
      </S.Container>
    </>
  );
};

export default FooterPage;
