import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {},
  container1: {
    marginTop: 170,
    justifyContent: "center !important",
    [theme.breakpoints.down("md")]: {
      marginTop: 120,
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: 100,
    },
    [theme.breakpoints.down("xs")]: {
      display: "flex !important",
      marginTop: 47,
    },
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: "10vw",
    paddingRight: "10vw",
    marginBottom: 130,
    [theme.breakpoints.down("md")]: {
      marginBottom: 130,
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: 100,
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: 50,
      background: "#76C2AB",
      display: "block",
      position: "relative",
    },
  },

  mainDescription: {
    width: "43%",
    [theme.breakpoints.down("md")]: {
      marginTop: 0,
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: 0,
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: 75,
      width: "100%",
      textAlign: "center",
    },
  },
  mainDescription1: {
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      margin: "100px 0px",
    },
  },
  background: {
    position: "absolute",
    left: 0,
    width: "100%",
    zIndex: -1,
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  background1: {
    position: "absolute",
    width: "90%",
    top: 0,
    marginTop: -55,
    right: 0,
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: 50,
    },
  },
  animals: {
    width: "34%",
    maxWidth: "50%",
    marginTop: 190,
    marginRight: 60,
    [theme.breakpoints.down("md")]: {
      marginTop: 150,
      marginRight: 60,
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: 120,
      marginRight: 50,
    },
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  mobileAnimals: {
    width: "100%",
    maxWidth: "100%",
    marginTop: 190,
    marginRight: 60,
    display: "none",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
    [theme.breakpoints.down("xs")]: {
      width: "95%",
      margin: "auto",
      margin: "auto",
      marginTop: 90,
      display: "block",
      marginBottom: 30,
    },
  },
  wave: {
    width: "100%",
    height: "7vw",
    marginTop: "-7vw",
  },
  paw: {
    width: "4vw",
    marginLeft: "2vw",
  },
  span1: {
    fontFamily: theme.font.NexaRegular,
    fontSize: 22,
    paddingBottom: 0,
    color: theme.palette.white,
    [theme.breakpoints.down("xs")]: {
      fontSize: 20,
      display: "block",
      paddingTop: 20,
      paddingBottom: 0,
    },
  },
  span01: {
    fontFamily: theme.font.NexaRegular,
    fontSize: 20,
    paddingBottom: 50,
    color: theme.palette.white,
    [theme.breakpoints.down("xs")]: {
      fontSize: 18,
      display: "block",
      paddingTop: 40,
      paddingBottom: 20,
    },
  },
  span2: {
    fontFamily: theme.font.NexaRegular,
    color: theme.palette.white,
    fontSize: 14,
    display: "block",
    marginTop: 30,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  h1: {
    fontFamily: "Roboto",
    fontWeight: 700,
    fontSize: "5.5vw",
    color: theme.palette.white,
    lineHeight: "6vw",
    [theme.breakpoints.down("xs")]: {
      fontSize: 50,
      marginTop: 25,
    },
  },
  h11: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "38px !important",
    },
  },
  btnShop: {
    color: theme.palette.white,
    borderColor: theme.palette.white,
    borderRadius: 10,
    marginTop: 10,
    fontSize: 20,
    marginLeft: 0,
    display: "flex",
    width: "fit-content",
    "&:hover": {
      color: theme.palette.white,
    },
    "&:focus": {
      color: theme.palette.white,
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      marginTop: 50,
      padding: 15,
      border: "2px solid #FFFFFF",
      fontSize: 20,
      textTransform: "none",
      fontWeight: 700,
    },
  },
}));

export default useStyles;
