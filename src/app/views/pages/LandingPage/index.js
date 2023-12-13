import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import CustomNavbar from "@app/views/components/Navbars/CustomNavbar.js";
import LandingPageHeader from "@app/views/components/Headers/LandingPageHeader.js";
import { post, klaviyoPost } from "@app/constants.js";
import * as S from "@app/views/components/StyleComponents";
import "./style.scss";
import FooterPage from "../FooterPage";

const LandingPage = (props) => {
  const [waitlistEmail, setWaitListEmail] = useState("");
  const [tagNumber, setTagNumber] = useState(2);
  const location = useLocation();
  const howToRef = useRef();
  const smartToRef = useRef();
  const faqToRef = useRef();
  const contactToRef = useRef();

  const initialState = {
    subscribe_email: "",
    contact_name: "",
    contact_email: "",
    contact_subject: "",
    contact_message: "",
    inProgress: false,
  };

  const [
    {
      subscribe_email,
      contact_name,
      contact_email,
      contact_subject,
      contact_message,
      inProgress,
    },
    setState,
  ] = useState(initialState);

  const handleNextTag = () => {
    if (tagNumber === 2) setTagNumber(1);
    else setTagNumber(tagNumber + 1);
  };

  const handlePrevTag = () => {
    if (tagNumber === 1) setTagNumber(2);
    else setTagNumber(tagNumber - 1);
  };

  const OnSendContactMessage = async (e) => {
    e.preventDefault();
    setState((prevState) => ({ ...prevState, inProgress: true }));
    const response = await post("contact", {
      email: contact_email,
      name: contact_name,
      subject: contact_subject,
      message: contact_message,
    });
    resetState();
    if (response.data.success === true) {
      Swal.fire({
        text: "Thanks for reaching out to us. We will be in touch soon!",
        icon: "success",
        timer: 3000,
      });
    } else {
      Swal.fire({
        text: "Failed",
        icon: "error",
        timer: 3000,
      });
    }
  };

  const resetState = () => {
    setState({ ...initialState });
  };

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

  const handleWaitlistEmail = (e) => {
    setWaitListEmail(e.target.value);
  };

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const joinWaitlist = async () => {
    if (!validateEmail(waitlistEmail)) {
      Swal.fire({
        text: "Invalid email",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });

      return;
    }

    // const response = await klaviyoPost(
    //   "list/TaYpNE/subscribe",
    //   { profiles: [{ email: waitlistEmail }] },
    //   { api_key: process.env.KLAVIYO_URL }
    // );
    const response = await post("waitlist", { email: waitlistEmail });
    console.log(response.data);
    if (response.data.success === true) {
      setWaitListEmail("");
      Swal.fire({
        text: "Your email has been added to our waitlist. We will be in touch soon!",
        icon: "success",
        timer: 4000,
      });
    }
  };

  const onShopNow = () => {
    window.open("https://shop.barkrz.com", "_self");
  };

  useEffect(() => {
    console.log("Location changed");
    console.log(location.hash);
    if (location.hash === "#howitworks") {
      howToRef.current.scrollIntoView();
    } else if (location.hash === "#faq") {
      faqToRef.current.scrollIntoView();
    } else if (location.hash === "#contactUs") {
      contactToRef.current.scrollIntoView();
    }
  }, [location]);

  const reveal = () => {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 30;

      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", reveal);
  }, []);

  return (
    <>
      <CustomNavbar />
      <LandingPageHeader reveal={reveal} />
      <S.MainContainer>
        <S.Container>
          <div className="reveal">
            <S.Title color="#1f1f39">Best Sellers</S.Title>
            <S.Comment>CHECK OUT OUR PET TAGS!</S.Comment>
            <S.TagContainer>
              <S.ScrollContent top="220" right="25px" onClick={handleNextTag}>
                <S.Icon
                  className="fas fa-chevron-right"
                  color="#000000"
                ></S.Icon>
              </S.ScrollContent>
              <S.ScrollContent top="220" left="25px" onClick={handlePrevTag}>
                <S.Icon
                  className="fas fa-chevron-left"
                  color="#000000"
                ></S.Icon>
              </S.ScrollContent>
              {/* <S.Tag
                mobile={tagNumber === 2 ? "block" : "none"}
                href="https://shop.barkrz.com/products/custom-engraved-bone"
                target="_blank"
              >
                <img
                  src={require("@app/assets/img/tags/bone-tag.png").default}
                  alt="Blue Dream"
                />
                <S.TagTitle>Custom Engraved Bone</S.TagTitle>
                <S.TagPrice>$23.99</S.TagPrice>
              </S.Tag> */}
              <S.Tag
                mobile={tagNumber === 1 ? "block" : "none"}
                href="https://shop.barkrz.com/products/barkrz-tag"
                target="_blank"
              >
                <img
                  style={{ paddingBottom: "28px" }}
                  src={require("@app/assets/img/tags/black-tag.png").default}
                  alt="black tag"
                />
                <S.TagTitle>Original BarkrZ</S.TagTitle>
                <S.TagPrice>$15.00</S.TagPrice>
              </S.Tag>
              <S.Tag
                mobile={tagNumber === 2 ? "block" : "none"}
                href="https://shop.barkrz.com/products/barkrz-airtag"
                target="_blank"
              >
                <img
                  style={{ paddingBottom: "16px" }}
                  src={
                    require("@app/assets/img/tags/barkrz-airtag.png").default
                  }
                  alt="White air tag"
                />
                <S.TagTitle>BarkrZ Airtag</S.TagTitle>
                <S.TagPrice>$35.00</S.TagPrice>
              </S.Tag>
              {/* <S.Tag
                mobile={tagNumber === 3 ? "block" : "none"}
                href="https://shop.barkrz.com/products/barkrz-bone"
                target="_blank"
              >
                <img
                  src={
                    require("@app/assets/img/tags/bone-tag-print.png").default
                  }
                  alt="Bone Tag"
                />
                <S.TagTitle>Bone Tag</S.TagTitle>
                <S.TagPrice>$15.00</S.TagPrice>
              </S.Tag> */}
              {/* <S.Tag
                mobile={tagNumber === 5 ? "block" : "none"}
                href="https://shop.barkrz.com/products/groovy-cat-tag"
                target="_blank"
              >
                <img
                  src={require("@app/assets/img/tags/groovy-cat.png").default}
                  alt="BarkrZ Black Tag"
                />
                <S.TagTitle>Groovy Cat</S.TagTitle>
                <S.TagPrice>$19.99</S.TagPrice>
              </S.Tag> */}
            </S.TagContainer>

            <S.Expland href="https://shop.barkrz.com/" ref={howToRef}>
              View All
            </S.Expland>
          </div>
          <div className="reveal">
            <S.Title color="#1f1f39">How BarkrZ Works</S.Title>
            <S.Description>
              All of our Pet IDs come with a 1 year product guarantee. BarkrZ
              profiles are meant to grow with you and your pet for life.
            </S.Description>
            <S.Content
              width="80"
              mMt="40"
              display="none"
              mobile="block"
              mWidth="90"
            >
              <video
                width={"100%"}
                poster={require("@app/assets/img/barkrz_thumbnail.JPG").default}
                controls
              >
                <source
                  src={
                    "https://barkrz-prod.s3.us-east-2.amazonaws.com/barkrz_video.mp4?rel=0&amp;showinfo=0&amp;start=1"
                  }
                  type="video/mp4"
                />
              </video>
            </S.Content>
            <S.TutorContainer>
              <S.SidePartial side="left">
                <S.InforWrapper>
                  <S.InforAvarta side="left">
                    <img
                      style={{ padding: "3px" }}
                      src={
                        require("@app/assets/svgs/new/icon_info.svg").default
                      }
                      alt="Vital Information"
                    />
                  </S.InforAvarta>
                  <S.Title2
                    size="16"
                    margin="10px"
                    mMargin="15px"
                    mSize="20"
                    mText="center"
                  >
                    Vital Information
                  </S.Title2>
                  <S.Comment2
                    size="14"
                    text-align="right"
                    mColor="rgba(31, 31, 57, 0.5)"
                    mMt="10"
                  >
                    Save custom notes alongside your pet’s birthday, breed,
                    microchip number, personality info, medical conditions, and
                    tons more.
                  </S.Comment2>
                </S.InforWrapper>
                <S.InforWrapper>
                  <S.InforAvarta side="left">
                    <img
                      style={{ padding: "3px" }}
                      src={require("@app/assets/svgs/solid/folder.svg").default}
                      alt="Document Storage"
                    />
                  </S.InforAvarta>
                  <S.Title2
                    size="16"
                    margin="10px"
                    mMargin="15px"
                    mSize="20"
                    mText="center"
                  >
                    Simplified Pet Wellness
                  </S.Title2>
                  <S.Comment2
                    size="14"
                    text-align="right"
                    mColor="rgba(31, 31, 57, 0.5)"
                    mMt="10"
                  >
                    Keep track of vaccination records, microchip information,
                    adoption papers, and even photo memories inside your BarkrZ
                    account.
                  </S.Comment2>
                </S.InforWrapper>
              </S.SidePartial>
              <S.CenterPartial mobile="none">
                <video
                  width={"100%"}
                  poster={
                    require("@app/assets/img/barkrz_thumbnail.JPG").default
                  }
                  controls
                >
                  <source
                    src={
                      "https://barkrz-prod.s3.us-east-2.amazonaws.com/barkrz_video.mp4?rel=0&amp;showinfo=0&amp;start=1"
                    }
                    type="video/mp4"
                  />
                </video>
              </S.CenterPartial>
              <S.SidePartial side="right">
                <S.InforWrapper>
                  <S.InforAvarta side="right">
                    <img
                      src={
                        require("@app/assets/svgs/new/icon_contact.svg").default
                      }
                      alt="Unlimited Contacts"
                    />
                  </S.InforAvarta>
                  <S.Title2
                    size="16"
                    margin="10px"
                    mMargin="15px"
                    mSize="20"
                    mText="center"
                  >
                    Unlimited Emergency Contacts
                  </S.Title2>
                  <S.Comment2
                    size="14"
                    text="left"
                    mColor="rgba(31, 31, 57, 0.5)"
                    mMt="10"
                  >
                    With BarkrZ you are able to keep an unlimited number of
                    emergency contacts with your pet at all times.
                  </S.Comment2>
                </S.InforWrapper>
                <S.InforWrapper>
                  <S.InforAvarta side="right">
                    <img
                      style={{ padding: "3px" }}
                      src={require("@app/assets/svgs/solid/heart.svg").default}
                      alt="location updates"
                    />
                  </S.InforAvarta>
                  <S.Title2
                    size="16"
                    margin="10px"
                    mMargin="15px"
                    mSize="20"
                    mText="center"
                  >
                    A Safe Return
                  </S.Title2>
                  <S.Comment2
                    size="14"
                    text="left"
                    mColor="rgba(31, 31, 57, 0.5)"
                    mMt="10"
                  >
                    Take comfort knowing that you can be easily contacted and
                    will be automatically notified if your pet is found when
                    lost. Keep track of their location at all times using the
                    BarkrZ AirTag.
                  </S.Comment2>
                </S.InforWrapper>
              </S.SidePartial>
            </S.TutorContainer>
          </div>
          {/* <S.Container ref={smartToRef} className="reveal">
            <S.Title color="#1F1F39" mSize="28" mMt="20">
              BarkrZ SmartChip
            </S.Title>
            <S.Title color="#1F1F39" mSize="28">
              The Modern Microchip
            </S.Title>
            <S.Content width="80" mt="30" display="flex" mMt="0">
              <S.LeftPartial width="40" ml="-20">
                <img
                  className="illus-pet"
                  src={require("@app/assets/svgs/new/Barkrz Illus.svg").default}
                  alt="A effect of ellipse bellow the pet"
                />
              </S.LeftPartial>
              <S.RightPartial width="50" padding="0 50px" smPadding="0 30px">
                <S.Title2
                  size="25"
                  margin="70px 0 0 0"
                  mMargin="25px 0 20px 0"
                  mText="left"
                >
                  What is a Smartchip?
                </S.Title2>
                <S.Comment2 text="left" mText="left" mt="20" mb="25">
                  Our modern pet microchips use NFC technology (just like Apple
                  Pay!) to display your BarkrZ Pet Profile instantly when
                  scanned by any smartphone, in addition to being compatible
                  with normal RFID readers.
                  <br />
                  <br />
                  Our proprietary pet microchips sync to the same profile used
                  on your BarkrZ Pet Tag, creating more opportunities for your
                  pet to be returned home when lost.
                  <br />
                  <br />
                  <S.Content
                    width="80"
                    mMt="40"
                    mb="50"
                    display="none"
                    mobile="block"
                    mWidth="90"
                  >
                    <img
                      src={
                        require("@app/assets/img/microchip-comparison.png")
                          .default
                      }
                      alt="Testimonials"
                    />
                  </S.Content>
                  Stay up to date by joining our waitlist!
                </S.Comment2>
                <S.FlexBox mt="20">
                  <S.Input
                    type="email"
                    onChange={handleWaitlistEmail}
                    value={waitlistEmail}
                    name="waitlist_email"
                    placeholder="Enter your email address"
                  />
                  <S.Button
                    margin="0"
                    mMt="0"
                    width="30"
                    background="#7FC4AF"
                    onClick={joinWaitlist}
                  >
                    Join Waitlist
                  </S.Button>
                </S.FlexBox>
              </S.RightPartial>
            </S.Content>
          </S.Container> */}
          <S.SolutionContainer>
            <div className="reveal">
              <S.Title color="#FFFFFF" mColor="#1F1F39" mMt="30" mSize="25">
                The All In One ID Solution for your Pet
              </S.Title>
              <S.Description>
                Take comfort in the fact that your pet can be located and
                returned safely home.
              </S.Description>
              <S.Content width="75" display="flex" mWidth="100" mMt="50">
                <S.LeftPartial width="30">
                  <S.DeskImg
                    src={require("@app/assets/img/phone_alert.png").default}
                    alt="Phone with email alert from BarkrZ"
                  />
                  <S.MobileImg
                    src={require("@app/assets/img/phone_alert.png").default}
                    alt="Phone with email alert from BarkrZ"
                  />
                </S.LeftPartial>
                <S.RightPartial
                  width="60"
                  padding="40px 100px"
                  mWidth="70"
                  mPadding="40px 50px"
                  mMt="40"
                >
                  <S.Title2 size="18" space="0.23" color="#1F1F39" alpha="60%">
                    BarkrZ Alerts
                  </S.Title2>
                  <S.Title2
                    size="45"
                    mSize="40"
                    smSize="25"
                    color="#FFFFFF"
                    mColor="#1F1F39"
                    mb="12"
                  >
                    Location Updates
                  </S.Title2>
                  <S.Comment2
                    size="20"
                    color="rgba(31, 31, 57, 0.5)"
                    mSize="14"
                    text="left"
                    mText="left"
                  >
                    Be the first to get notified if your pet goes missing.
                    BarkrZ sends a real-time location update anytime their Pet
                    ID gets scanned.
                  </S.Comment2>
                  <S.List>
                    <S.Li>Email notifications</S.Li>
                    <S.Li>
                      Unlimited emergency contacts available for contact
                    </S.Li>
                    <S.Li>Vital information and custom notes</S.Li>
                  </S.List>
                </S.RightPartial>
              </S.Content>
            </div>
            <div className="reveal">
              <S.Content
                width="75"
                display="flex"
                mobile="flex"
                mWidth="100"
                mMt="50"
                flexDir="column-reverse"
              >
                <S.LeftPartial
                  width="60"
                  padding="40px 100px 40px 40px"
                  mWidth="70"
                  mPadding="40px 50px 40px 40px"
                  mMt="50"
                >
                  <S.Title2 size="18" mMt="40" space="0.23" alpha="60%">
                    Your Central Hub
                  </S.Title2>
                  <S.Title2
                    size="45"
                    mSize="40"
                    smSize="25"
                    color="#FFFFFF"
                    mb="12"
                  >
                    More Than Just a Pet Tag
                  </S.Title2>
                  <S.Comment2
                    size="20"
                    color="rgba(31, 31, 57, 0.5)"
                    mSize="14"
                    text="left"
                    mText="left"
                  >
                    Stay up to date with your pet's health using BarkrZ secure
                    document management system to help you organize all of your
                    vaccination records, adoption papers, and more!
                  </S.Comment2>
                  <S.List>
                    <S.Li>Quick access to your pet's vital records</S.Li>
                    <S.Li>Vaccination reminders</S.Li>
                    <S.Li>Personalized recommendations</S.Li>
                  </S.List>
                  <href>
                    <S.ShopButton
                      mColor="#7FC4AF"
                      width="40"
                      onClick={onShopNow}
                    >
                      Shop Now
                    </S.ShopButton>
                  </href>

                  {/* <S.Button width="50">
                  <img
                    src={require("@app/assets/svgs/new/image 3.svg").default}
                    alt="App Store"
                  />
                  App Store
                </S.Button>
                <S.Button width="50">
                  <img
                    src={require("@app/assets/svgs/new/image 4.svg").default}
                    alt="Play Store"
                  />
                  Play Store
                </S.Button> */}
                </S.LeftPartial>
                <S.RightPartial width="27" mMt="50">
                  <S.DeskImg
                    src={require("@app/assets/img/documents-phone.png").default}
                    alt="Get notified"
                  />
                  <S.MobileImg
                    src={require("@app/assets/img/documents-phone.png").default}
                    alt="Get notified"
                  />
                </S.RightPartial>
              </S.Content>
            </div>
          </S.SolutionContainer>
          <S.Container className="reveal">
            <S.Title color="#1F1F39" mSize="30" mMt="20">
              Power In Numbers
            </S.Title>
            <S.Comment>
              We love our pets. Here are just a few of the amazing testimonials
              from our community.
            </S.Comment>
            <S.Content
              width="90"
              mt="50"
              mMt="0"
              mImgMt="300"
              mPb="250"
              sImgMt="200"
              sPb="140"
              zoom="1.9"
            >
              <img
                src={require("@app/assets/svgs/new/as_seen_on.svg").default}
                alt="Testimonials"
              />
            </S.Content>
          </S.Container>
          <S.Container ref={faqToRef} background="#BFE1D7" mMt="100">
            {/* <S.Content
              width="50"
              mt="-300"
              padding="50"
              background="#FFFFFF"
              border="1px solid #B9B9B9"
              bRadius="25"
            >
              <S.Title color="#1F1F39">Why BarkrZ?</S.Title>
              <S.Comment>
                We are the only pet identification company with pet tags that
                work and sync with your microchips, providing more opportunities
                and access points for your pet to be identified when lost.
              </S.Comment>
              <S.Content width="100" mt="50" display="flex">
                <S.Content width="33.3" text="center" img="30px" mt="0">
                  <img
                    src={
                      require("@app/assets/svgs/new/settings_black_24dp 1.svg")
                        .default
                    }
                    alt="Easy Manaage"
                  />
                  <S.Title2 margin="30px 0 0 0">Easy Manaage</S.Title2>
                  <S.Comment2>
                    Nullam tincidunt, purus sit amet viverra auctor, quam neque
                    dapibus duieyri.
                  </S.Comment2>
                </S.Content>
                <S.Content width="33.3" text="center" mt="0" img="30px">
                  <img
                    src={
                      require("@app/assets/svgs/new/local_police_black_24dp 1.svg")
                        .default
                    }
                    alt="Security"
                  />
                  <S.Title2 margin="30px 0 0 0">Security</S.Title2>
                  <S.Comment2>
                    Your pet’s infromation is safe with us. We{" "}
                  </S.Comment2>
                </S.Content>
                <S.Content width="33.3" text="center" mt="0" img="30px">
                  <img
                    src={require("@app/assets/svgs/new/Group.svg").default}
                    alt="Clean UI"
                  />
                  <S.Title2 margin="30px 0 0 0">Clean UI</S.Title2>
                  <S.Comment2>
                    Nullam tincidunt, purus sit amet viverra auctor, quam neque
                    dapibus duieyri.
                  </S.Comment2>
                </S.Content>
              </S.Content>
              <S.Content width="100" mt="50" mb="-110" display="flex">
                <S.Content
                  width="33.3"
                  text="center"
                  padding="15px 0 0 0"
                  img="30px"
                  mt="0"
                  ml="10"
                  mr="10"
                  background="#ffffff"
                  border="2px solid #7FC4AF"
                  bRadius="20"
                >
                  <img
                    src={
                      require("@app/assets/svgs/new/download_for_offline_black_24dp 1.svg")
                        .default
                    }
                    alt="Hundreds"
                  />
                  <S.Title2 size="20" margin="10px 0 0 0">
                    Hundreds
                  </S.Title2>
                  <S.Comment2>of great reviews</S.Comment2>
                </S.Content>
                <S.Content
                  width="33.3"
                  text="center"
                  padding="15px 0 0 0"
                  mt="0"
                  ml="10"
                  mr="10"
                  img="30px"
                  background="#ffffff"
                  border="2px solid #7FC4AF"
                  bRadius="20"
                >
                  <img
                    src={
                      require("@app/assets/svgs/new/star_black_24dp 1.svg")
                        .default
                    }
                    alt="Thousands"
                  />
                  <S.Title2 size="20" margin="10px 0 0 0">
                    Thousands
                  </S.Title2>
                  <S.Comment2>of happy pets on BarkrZ</S.Comment2>
                </S.Content>
                <S.Content
                  width="33.3"
                  text="center"
                  padding="15px 0 0 0"
                  mt="0"
                  ml="20"
                  mr="20"
                  img="30px"
                  background="#ffffff"
                  border="2px solid #7FC4AF"
                  bRadius="20"
                >
                  <img
                    src={
                      require("@app/assets/svgs/new/supervisor_account_black_24dp 1.svg")
                        .default
                    }
                    alt="Millions"
                  />
                  <S.Title2 size="20" margin="10px 0 0 0">
                    Millions
                  </S.Title2>
                  <S.Comment2>of pets we can save</S.Comment2>
                </S.Content>
              </S.Content>
            </S.Content> */}
            <div className="reveal">
              <S.Content mt="90">
                <S.Title mt="0" color="#FFFFFF" mSize="30">
                  Frequently Asked Questions
                </S.Title>
              </S.Content>
              <S.Content width="50" display="flex" mMt="20" pPadding="20">
                <S.LeftPartial width="50">
                  <S.Title2 color="#FFFFFF" mColor="#FFFFFF">
                    Can I have more than one Pet registered?
                  </S.Title2>
                </S.LeftPartial>
                <S.RightPartial
                  width="50"
                  img="50"
                  display="flex"
                  mobile="flex"
                  mMt="10"
                >
                  <img
                    src={require("@app/assets/svgs/new/Group 78.svg").default}
                    alt="Answer"
                  />
                  <S.Comment2 size="15" text="left" mText="left">
                    Barkrz allows you to manage all of your pets, now and
                    forever, in one central place. Save a history of their
                    vaccination records, birthdays and more!
                  </S.Comment2>
                </S.RightPartial>
              </S.Content>
              <S.Content
                width="50"
                mt="30"
                display="flex"
                mMt="0"
                pPadding="20"
              >
                <S.LeftPartial width="50">
                  <S.Title2 color="#FFFFFF" mColor="#FFFFFF">
                    Is there a subscription fee?
                  </S.Title2>
                </S.LeftPartial>
                <S.RightPartial
                  width="50"
                  img="50"
                  display="flex"
                  mobile="flex"
                  mMt="10"
                >
                  <img
                    src={require("@app/assets/svgs/new/Group 78.svg").default}
                    alt="Answer"
                  />
                  <S.Comment2 size="15" text="left" mText="left">
                    BarkrZ is 100% free to sign up and make a pet profile and
                    join the community.
                  </S.Comment2>
                </S.RightPartial>
              </S.Content>
              <S.Content
                width="50"
                mt="30"
                display="flex"
                mMt="0"
                pPadding="20"
              >
                <S.LeftPartial width="50">
                  <S.Title2 color="#FFFFFF" mColor="#FFFFFF">
                    Can I update my information anytime?
                  </S.Title2>
                </S.LeftPartial>
                <S.RightPartial
                  width="50"
                  img="50"
                  display="flex"
                  mobile="flex"
                  mMt="10"
                >
                  <img
                    src={require("@app/assets/svgs/new/Group 78.svg").default}
                    alt="Answer"
                  />
                  <S.Comment2 size="15" text="left" mText="left">
                    Yes, by logging into your account you will have the ability
                    to access to your pet profile, make updates or changes, and
                    also add new pets in real time. No need to change your Pet
                    Tag.
                  </S.Comment2>
                </S.RightPartial>
              </S.Content>
              <S.Content
                width="50"
                mt="30"
                display="flex"
                mMt="0"
                pPadding="20"
              >
                <S.LeftPartial width="50">
                  <S.Title2 color="#FFFFFF" mColor="#FFFFFF">
                    What happens if my pet tag gets lost or damaged?
                  </S.Title2>
                </S.LeftPartial>
                <S.RightPartial
                  width="50"
                  img="50"
                  display="flex"
                  mobile="flex"
                  mMt="10"
                >
                  <img
                    src={require("@app/assets/svgs/new/Group 78.svg").default}
                    alt="Answer"
                  />
                  <S.Comment2 size="15" text="left" mText="left">
                    We offer a one year product guarantee on all of our pet
                    tags. Send a photo to our support team if you have any
                    issues and we will replace your pet tag for free. Terms and
                    conditions apply.
                  </S.Comment2>
                </S.RightPartial>
              </S.Content>
              <S.Content
                width="50"
                mt="30"
                pb="200"
                display="flex"
                mMt="0"
                pPadding="20"
              >
                <S.LeftPartial width="50">
                  <S.Title2 color="#FFFFFF" mColor="#FFFFFF">
                    Does it track their location?
                  </S.Title2>
                </S.LeftPartial>
                <S.RightPartial
                  width="50"
                  img="50"
                  display="flex"
                  mobile="flex"
                  mMt="10"
                >
                  <img
                    src={require("@app/assets/svgs/new/Group 78.svg").default}
                    alt="Answer"
                  />
                  <S.Comment2 size="15" text="left" mText="left">
                    Our BarkrZ AirTag tracks your pet's live location through
                    the Apple Find My app much like you would with lost keys or
                    a missing suitcase. Our Pet Tags provide your pet’s location
                    to you only once they are scanned through the QR code by
                    taking the location of the phone that scans the ID.
                  </S.Comment2>
                </S.RightPartial>
              </S.Content>
            </div>
          </S.Container>
          {/* <S.Content
              width="60"
              background="#7FC4AF"
              display="flex"
              mt="-400"
              padding="70"
              bRadius="20"
              text="left"
            > */}
          {/* <S.LeftPartial width="60">
                <S.Title2 color="#FFFFFF" size="35">
                  Lets try out BarkrZ for Free
                </S.Title2>
                <S.Comment2 color="#FFFFFF">
                  Download our latest version and please don’t forget to rate :)
                </S.Comment2>
                <S.Content
                  display="flex"
                  mt="20"
                  justifyContent="space-between"
                >
                  <S.Button width="47">
                    <img
                      src={require("@app/assets/svgs/new/image 3.svg").default}
                      alt="App Store"
                    />
                    App Store
                  </S.Button>
                  <S.Button width="47">
                    <img
                      src={require("@app/assets/svgs/new/image 4.svg").default}
                      alt="Play Store"
                    />
                    Play Store
                  </S.Button>
                </S.Content>
              </S.LeftPartial> */}
          {/* <S.RightPartial width="40" mt="-150" ml="30">
                <img
                  src={
                    require("@app/assets/svgs/new/Mobile Screenshots.svg")
                      .default
                  }
                  alt="Mobile"
                />
              </S.RightPartial> */}
          {/* </S.Content> */}

          <FooterPage contactToRef={contactToRef} reveal={reveal} />
        </S.Container>
        {/* <Row>
            <Col className="testimony-col">
              <section id="testimony-section">
                <h3 className="text-center">Mandatory For All Pet Owners</h3>
                <div className="testimony-cards">
                  <div className="testimony-card px-3">
                    <img
                      alt="..."
                      className="img-circle img-no-padding img-responsive img-size-landing"
                      src={require("@app/assets/img/testimonial1.JPG").default}
                    />
                    <blockquote className="testimony-text">
                      "My dog deserves best"
                      <footer>
                        — <cite className="author">Ryan Hall</cite>
                      </footer>
                    </blockquote>
                    <Stars number={5}></Stars>
                  </div>
                  <div className="testimony-card px-3">
                    <img
                      alt="..."
                      className="img-circle img-no-padding img-responsive img-size-landing"
                      src={"https://randomuser.me/api/portraits/women/75.jpg"}
                    />
                    <blockquote className="testimony-text">
                      "It makes everything so much easier"
                      <footer>
                        — <cite className="author">Lisa Steven</cite>
                      </footer>
                    </blockquote>
                    <Stars number={5} className="stars-landing"></Stars>
                  </div>
                  <div className="testimony-card px-3">
                    <img
                      alt="..."
                      className="img-circle img-no-padding img-responsive img-size-landing"
                      src={require("@app/assets/img/testimonial3.JPG").default}
                    />
                    <blockquote className="testimony-text">
                      "It’ so cool and I love it"
                      <footer>
                        — <cite className="author">Meaghan McCracken</cite>
                      </footer>
                    </blockquote>
                    <Stars number={5}></Stars>
                  </div>
                </div>
              </section>
            </Col>
          </Row> */}
        {/* <Container>
            <Row
              style={{ justifyContent: "center" }}
              className="mt-5"
              id="waitList"
            >
              <div style={{ textAlign: "center" }}>
                <h3 className="text-center" style={{ marginBottom: "5px" }}>
                  BarkrZ Modern Microchips
                </h3>
              </div>
            </Row>
            <Row className="waitlist">
              <Col md="5" lg="5" xs="12" sm="12">
                <img
                  className="illus-pet"
                  src={require("@app/assets/svgs/Barkrz Illus.svg").default}
                  alt="A effect of ellipse bellow the pet"
                />
              </Col>
              <Col md="7" lg="5" xs="12" sm="12" className="waitlist-right">
                <div className="waitlist-right-content">
                  <h5>What's the BarkrZ Smartchip?</h5>
                  <p>
                    The world's first microchip scannable by any smartphone!
                  </p>
                  <p>
                    Our modern microchips link directly to your BarkrZ pet
                    profile.
                    <br></br>
                    <br></br>
                  </p>
                  <p>
                    BarkrZ Smartchips can link to the same profile used by your
                    BarkrZ Pet Tag, giving more access points and opportunities
                    for your pet to be identified when lost.
                    <br></br>
                    <br></br>
                  </p>
                  <p>
                    Join the waitlist to get yours first from a veterinarian
                    near you!
                  </p>
                  <div className="waitlist-join">
                    <Input
                      type="email"
                      className="waitlist-email"
                      onChange={handleWaitlistEmail}
                      value={waitlistEmail}
                      name="waitlist_email"
                      placeholder="Email"
                    />
                    <button onClick={joinWaitlist}>Join Waitlist</button>
                  </div>
                </div>
              </Col>
            </Row>
          </Container> */}
        {/* <div className="paw-wave"></div>
        <Container>
          <Row
            style={{ justifyContent: "center" }}
            className="mt-5"
            id="contactUs"
          >
            <div style={{ textAlign: "center" }}>
              <p
                className="text-center"
                style={{
                  fontSize: "24px",
                  color: "#13bbb4",
                  fontWeight: "bold",
                }}
              >
                Get in Touch
              </p>
              <h3 className="text-center" style={{ marginBottom: "5px" }}>
                Contact Us
              </h3>
            </div>
          </Row>
          <Row className="justify-content-md-center">
            <Col md="6" lg="5" xs="12" sm="12">
              <Card className="card-register margin-card-register">
                <img
                  className="faq-pet-ellipse"
                  src={require("@app/assets/svgs/pet-ellipse.svg").default}
                  alt="A effect of ellipse bellow the pet"
                />
                <img
                  className="faq-pet-img"
                  src={require("@app/assets/svgs/pet-blinking.svg").default}
                  alt="A pet blinking"
                />
                <h6 className="smallest-title">
                  Let us know <br />
                  How can we help you
                </h6>
                <Form onSubmit={OnSendContactMessage}>
                  <Input
                    type="text"
                    className="mb-3"
                    onChange={OnHandleChange}
                    value={contact_name}
                    name="contact_name"
                    placeholder="Name *"
                    required
                  />
                  <Input
                    type="email"
                    className="mb-3"
                    onChange={OnHandleChange}
                    value={contact_email}
                    name="contact_email"
                    placeholder="Email Address *"
                    required
                  />
                  <Input
                    type="text"
                    className="mb-3"
                    onChange={OnHandleChange}
                    value={contact_subject}
                    name="contact_subject"
                    placeholder="Subject *"
                    required
                  />
                  <Input
                    type="textarea"
                    className="mb-3 pl-2"
                    onChange={OnHandleChange}
                    value={contact_message}
                    name="contact_message"
                    placeholder="Message..."
                    style={{ borderColor: "#84f5d2", borderWidth: "1.5px" }}
                    rows="5"
                    required
                  />
                  <Row className="justify-content-center">
                    <Button
                      className="barkrz-btn-round ml-5 mr-5"
                      disabled={inProgress}
                    >
                      {inProgress ? (
                        <>
                          <Spinner size="sm" />
                          <span className="ml-2">Sending...</span>
                        </>
                      ) : (
                        <span>Contact Us</span>
                      )}
                    </Button>
                  </Row>
                </Form>
              </Card>
            </Col>
            <Col md="6" lg="5" xs="12" sm="12" style={{ textAlign: "start" }}>
              <div className="box-faq">
                <h5>
                  <p className="title-faq">FAQ - </p>Common Questions
                </h5>
                <div className="box-faq-text">
                  <img
                    className="faq-arrow"
                    src={require("@app/assets/svgs/arrow-right.svg").default}
                    alt="Incon Arrow Right"
                  />
                  <p className="faq-question">
                    Can I have more than one Pet registered?
                  </p>
                  <p className="faq-answer">
                    Barkrz allows you to manage all of your pets, now and
                    forever, in one central place. Save a history of their
                    vaccination records, birthdays and more!
                  </p>
                  <img
                    className="faq-arrow"
                    src={require("@app/assets/svgs/arrow-right.svg").default}
                    alt="Incon Arrow Right"
                  />
                  <p className="faq-question">
                    Can I update my information anytime?
                  </p>
                  <p className="faq-answer">
                    Yes, by logging into our member portal you will have the
                    ability to access to your pet profile, make updates and
                    changes and add new pets in real time.
                  </p>
                  <img
                    className="faq-arrow"
                    src={require("@app/assets/svgs/arrow-right.svg").default}
                    alt="Incon Arrow Right"
                  />
                  <p className="faq-question">
                    Do you need the mobile app to scan the tag?
                  </p>
                  <p className="faq-answer">
                    Our tags uses QR code technology which can be scanned by any
                    smart phone camera. No downloads are required.{" "}
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container> */}
      </S.MainContainer>
      {/* <div
        style={{
          position: "relative",
          backgroundImage:
            "url(" + require("@app/assets/img/footer-image.png").default + ")",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Container style={{ paddingTop: "10%" }}>
          <Row style={{ justifyContent: "center" }}>
            <Col md="3" lg="3" sm="6" xs="10">
              <img
                src={require("@app/assets/img/logo-blue.png").default}
                style={{ width: "170px" }}
                alt=""
              />
              <p
                style={{ fontSize: "16px", color: "#666", fontWeight: "bold" }}
              >
                <br />
              </p>
            </Col>
            <Col md="3" lg="3" sm="6" xs="10">
              <h4
                style={{
                  fontSize: "30px",
                  color: "#393d72",
                  fontWeight: "bold",
                }}
              >
                Contact Us
              </h4>
              <br />
              <p
                style={{
                  display: "flex",
                  fontSize: "14px",
                  color: "#393d72",
                  fontWeight: "bold",
                }}
              >
                <i
                  className="fa fa-envelope mr-2"
                  style={{ marginTop: "2px" }}
                />{" "}
                support@barkrz.com
              </p>
            </Col>
            <Col md="3" lg="3" sm="6" xs="10">
              <h4
                style={{
                  fontSize: "30px",
                  color: "#393d72",
                  fontWeight: "bold",
                }}
              >
                Working Hours
              </h4>
              <br />
              <p
                style={{ fontSize: "14px", color: "#666", fontWeight: "bold" }}
              >
                Monday to Friday
              </p>
              <p
                style={{ fontSize: "14px", color: "#666", fontWeight: "bold" }}
              >
                Open from 9am – 6pm
              </p>
              <p
                style={{ fontSize: "14px", color: "#666", fontWeight: "bold" }}
              >
                Holidays/Weekends – Closed
              </p>
            </Col>
            <Col md="3" lg="3" sm="6" xs="10">
              <h4
                style={{
                  fontSize: "30px",
                  color: "#393d72",
                  fontWeight: "bold",
                }}
              >
                News Letter
              </h4>
              <br />
              <form onSubmit={subscribe}>
                <Input
                  placeholder=" Your Email..."
                  onChange={OnHandleChange}
                  value={subscribe_email}
                  name="subscribe_email"
                  type="email"
                  required
                />
                <br />
                <button className="barkrz-btn" type="submit">
                  Subscribe
                </button>
              </form>
            </Col>
          </Row>
          <Row
            className="text-center mt-5 pb-3"
            style={{ justifyContent: "center" }}
          >
            <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "black",
                zIndex: "1",
              }}
            />
            <span
              className="mt-3"
              style={{
                fontSize: "14px",
                color: "#666",
                fontWeight: "bold",
                zIndex: "1",
                textAlign: "center",
              }}
            >
              {" "}
              Copyright © 2020. All Rights Reserved. Carefully crafted by{" "}
              <span style={{ color: "#0f8a7f" }}>BarkrZ</span>.
            </span>
          </Row>
        </Container>
      </div> */}
    </>
  );
};

export default LandingPage;
