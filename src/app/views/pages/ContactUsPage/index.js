import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import CustomNavbar from "@app/views/components/Navbars/CustomNavbar.js";
import ButtonMailto from "@app/views/components/ButtonMailTo/index.js";

import * as S from "@app/views/components/StyleComponents";
import FooterPage from "../FooterPage";
import PageHeader from "@app/views/components/Headers/PageHeader";
import { Box, Grid, makeStyles, Paper } from "@material-ui/core";
import { Img } from "react-image";
import { Alert, Button } from "reactstrap";
import { CreateContact } from "@app/actions/regsiterPet";
import "./style.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "start",
    color: theme.palette.text.secondary,
  },
  background: {
    zIndex: "-1",
    borderRadius: "20px",
  },
}));

const ContactUsPage = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const contactToRef = useRef();
  const [contact, setContact] = useState();
  const [uploadingError, setUploadingError] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const reveal = () => {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!contact?.email || !contact?.name || !contact?.message) {
      setUploadingError(true);
      setMessage("Please complete all required fields.");
      setSuccess(false);
      return;
    }
    const data = {
      email: contact?.email,
      name: contact?.name,
      subject: "Support Contact",
      message: contact?.message,
    };
    dispatch(
      CreateContact(data, (option, message) => {
        if (option) {
          history.push("/");
          setMessage("Message sent successfully!");
        } else {
          setUploadingError(true);
          setSuccess(option);
          setMessage(message);
        }
      })
    );
  };
  const onDismiss = () => {
    setTimeout(() => {
      setUploadingError(false);
    }, 8000);
  };
  useEffect(() => {
    onDismiss();
  });

  return (
    <>
      <CustomNavbar />
      <S.MainContainer>
        <PageHeader
          reveal={reveal}
          title={"Contact Us"}
          decs={"Get in touch!"}
        />
        <S.Container>
          <S.FormContainer className="reveal">
            <S.Comment1>
              Complete the form below & our team will get back to you ASAP.
            </S.Comment1>
            <S.Content className="reveal">
              <div className="boxMain">
                <Grid container>
                  <Grid item sm={12} md={6} lg={6}>
                    <S.Box>
                      <i className="fa fa-map-marker-alt" />
                      <S.Comment1>Miami, FL</S.Comment1>
                    </S.Box>
                  </Grid>
                  <Grid item sm={12} md={6} lg={6}>
                    <S.Box>
                      <i class="fa fa-envelope" />
                      <ButtonMailto
                        label="support@barkrz.com"
                        mailto="mailto:support@barkrz.com"
                      />
                    </S.Box>
                  </Grid>
                </Grid>
              </div>
              {uploadingError && (
                <div
                  style={{
                    backgroundColor: "#f8d7da",
                    borderColor: "#f5c2c7",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                >
                  {message}
                </div>
              )}
              <form method="post" onSubmit={handleSubmit}>
                <div>
                  <S.ContentInput
                    type="text"
                    placeholder="Name"
                    name="name"
                    onChange={(e) =>
                      setContact({
                        ...contact,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <S.ContentInput
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={(e) =>
                      setContact({
                        ...contact,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <S.ContentInput
                    type="number"
                    placeholder="Phone (optional)"
                    name="phone"
                    onChange={(e) =>
                      setContact({
                        ...contact,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <S.ContentArea
                    rows={5}
                    type="text"
                    placeholder="Your message"
                    name="message"
                    onChange={(e) =>
                      setContact({
                        ...contact,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Button type="submit" className="btn-primary contact-btn">
                    Submit
                  </Button>
                </div>
              </form>
            </S.Content>
          </S.FormContainer>

          {/* <S.OurContainer className="reveal">
            <Grid container>
              <Grid item md={12} lg={6}>
                <div className={classes.paper}>
                  <S.OurStory>Our Team & Story</S.OurStory>
                  <S.Comment style={{ textAlign: "start", fontSize: "14px" }}>
                    BarkrZ was started after our founders, Alex & Heloisa,
                    adopted their deaf Dalmation, Sophie, and realized how
                    overwhelming it was to be a new pet parent and keep track of
                    all her information and documents as well as keep her safe
                    and healthy.
                  </S.Comment>
                  <Img
                    className={classes.background}
                    src={require("@app/assets/svgs/new/ourTeam.svg").default}
                  />
                </div>
              </Grid>
              <Grid item md={12} lg={6}>
                <div className={classes.paper}>
                  <Img
                    className={classes.background}
                    src={require("@app/assets/svgs/new/ourTeam.svg").default}
                  />
                </div>
              </Grid>
            </Grid>
          </S.OurContainer> */}

          <FooterPage contactToRef={contactToRef} reveal={reveal} />
        </S.Container>
      </S.MainContainer>
    </>
  );
};

export default ContactUsPage;
