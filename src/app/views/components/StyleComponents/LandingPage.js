import styled from "styled-components";

export const MainContainer = styled.div`
  font-family: "Roboto";
`;

export const Container = styled.div`
  padding-top: 3rem;
  margin-top: ${(props) => (props.mt ? props.mt : "100")}px;
  background: ${(props) => (props.background ? props.background : "none")};
  position: relative;
  @media (max-width: 768px) {
    padding-top: 1rem;
    margin-top: ${(props) => (props.mMt ? props.mMt : "0")}px;
  }
`;

export const Comment = styled.p`
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  color: rgba(31, 31, 57, 0.5);
  text-align: center;
  @media (max-width: 768px) {
    font-size: 14px;
    display: ${(props) => props.mobile};
  }
`;

export const Title = styled.p`
  font-weight: 700;
  font-size: 45px;
  color: ${(props) => props.color};
  margin-top: ${(props) => (props.mt ? props.mt : "0")}px;
  text-align: center;
  @media (max-width: 768px) {
    width: 90%;
    margin: auto;
    color: ${(props) => (props.mColor ? props.mColor : props.color)};
    font-size: ${(props) => (props.mSize ? props.mSize : "40")}px;
    margin-top: ${(props) => (props.mMt ? props.mMt : "0")}px;
  }
`;

export const Description = styled.p`
  margin-top: 40px;
  width: 50%;
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  color: rgba(31, 31, 57, 0.5);
  text-align: center;
  margin: auto;

  @media (max-width: 768px) {
    font-size: 15px;
    width: 80%;
    margin: auto;
  }
`;

export const TagContainer = styled.div`
  display: flex;
  padding: 10px 20px;
  position: relative;
  flex-wrap: wrap;
  align-items: center;
  margin: 0;
`;

export const Tag = styled.a`
  width: 20%;
  padding: 30px;
  display: block;
  cursor: pointer;
  img {
    width: 100%;
  }
  @media (max-width: 768px) {
    width: 100%;
    display: ${(props) => (props.mobile ? props.mobile : "block")};
  }
`;

export const ImgContent = styled.div`
  padding: 100px;
  padding: 64px;
  margin-top: 30px;
  @media (max-width: 912px) {
    padding: 32px;
    margin-top: 51px;
  }
  @media (max-width: 912px) {
    padding: 60px;
  }
`;

export const TagTitle = styled.a`
  display: block;
  margin-top: -30px;
  font-size: 20px;
  color: #1f1f39;
  font-weight: 700;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 25px;
    margin-top: -50px;
  }
`;

export const TagPrice = styled.p`
  font-weight: 400;
  font-size: 16px;
  color: rgba(31, 31, 57, 0.5);
  text-align: center;
  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

export const Expland = styled.a`
  display: block;
  font-weight: 700;
  font-size: 18px;
  text-align: center;
  text-decoration-line: underline;
  color: #000000;
  text-align: center;
  margin-bottom: 100px;
  @media (max-width: 768px) {
    font-size: 22px;
    margin-top: 30px;
  }
`;

export const TutorContainer = styled.div`
  display: flex;
  width: 80%;
  margin: auto;
  margin-top: 80px;
  @media (max-width: 912px) {
    width: 100%;
  }
  @media (max-width: 768px) {
    display: block;
    background: #bfe1d7;
    width: 90%;
    margin: auto;
    margin-top: 80px;
    padding: 50px 20px 50px 20px;
    border-radius: 25px;
  }
`;

export const SidePartial = styled.div`
  width: 25%;
  margin: 0;
  text-align: ${(props) => (props.side === "left" ? "right" : "left")};
  padding-left: ${(props) => (props.side === "left" ? "0" : "50px")};
  padding-right: ${(props) => (props.side === "left" ? "50px" : "0")};
  @media (max-width: 912px) {
    padding-left: ${(props) => (props.side === "left" ? "0" : "30px")};
    padding-right: ${(props) => (props.side === "left" ? "30px" : "0")};
  }
  @media (max-width: 768px) {
    width: 100%;
    padding: 0;
    text-align: center;
  }
`;

export const CenterPartial = styled.div`
  width: 50%;
  margin: 0;
  display: flex;
  align-items: center;
  background: #bfe1d7;
  border-radius: 50%;
  @media (max-width: 768px) {
    display: ${(props) => props.mobile};
  }
`;

export const InforWrapper = styled.div`
  padding: 15px;
  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

export const InforAvarta = styled.div`
  width: 60px;
  height: 60px;
  background: #7fc4af;
  border-radius: 50%;
  padding: 12px;
  text-align: center;
  margin-left: ${(props) => (props.side === "left" ? "auto" : "unset")};
  @media (max-width: 768px) {
    margin: auto;
  }
`;

export const Title2 = styled.p`
  font-weight: 700;
  margin: ${(props) => (props.margin ? props.margin : "unset")};
  margin-bottom: ${(props) => (props.mb ? props.mb : "0")}px;
  font-size: ${(props) => props.size}px;
  color: ${(props) => (props.color ? props.color : "#1f1f39")};
  letter-spacing: ${(props) => props.space}em;
  opacity: ${(props) => props.alpha};
  @media (max-width: 912px) {
    font-size: ${(props) => (props.mSize ? props.mSize : props.size)}px;
    margin: ${(props) => (props.mMargin ? props.mMargin : "unset")};
  }
  @media (max-width: 768px) {
    font-size: ${(props) => (props.smSize ? props.smSize : props.mSize)}px;
    color: ${(props) => (props.mColor ? props.mColor : "#1f1f39")};
    text-align: ${(props) => (props.mText ? props.mText : "left")};
    display: ${(props) => (props.display ? props.display : "block")};
  }
`;

export const Comment2 = styled.p`
  font-size: ${(props) => props.size}px;
  color: ${(props) => (props.color ? props.color : "#1f1f39")};
  margin-left: 16px;
  margin-right: 16px;
  text-align: ${(props) => (props.text ? props.text : "right")};
  margin-top: ${(props) => (props.mt ? props.mt : "10")}px;
  margin-bottom: ${(props) => (props.mb ? props.mb : "0")}px;
  font-weight: 400;
  @media (max-width: 912px) {
    font-size: ${(props) => (props.mSize ? props.mSize : props.size)}px;
  }
  @media (max-width: 768px) {
    color: ${(props) => (props.mColor ? props.mColor : "#1f1f39")};
    text-align: ${(props) => (props.mText ? props.mText : "center")};
    margin-top: ${(props) => (props.mMt ? props.mMt : "0")}px;
    margin-bottom: ${(props) => (props.mMb ? props.mMb : "0")}px;
    font-size: 14px;
  }
`;

export const SolutionContainer = styled.div`
  margin-top: 120px;
  background: #bfe1d7;
  padding: 100px;
  @media (max-width: 768px) {
    padding: 0;
    width: 80%;
    margin: auto;
    margin-top: 100px;
    background: none;
    border-top: 1px solid rgba(31, 31, 57, 0.1);
  }
`;

export const Content = styled.div`
  width: ${(props) => props.width}%;
  display: ${(props) => (props.display ? props.display : "block")};
  margin: auto;
  margin-top: ${(props) => (props.mt ? props.mt : "100")}px;
  margin-bottom: ${(props) => (props.mb ? props.mb : "0")}px;
  margin-left: ${(props) => (props.ml ? props.ml + "px" : "auto")};
  margin-right: ${(props) => (props.mr ? props.mr + "px" : "auto")};
  padding: ${(props) => (props.padding ? props.padding : "0")}px;
  padding-bottom: ${(props) =>
    props.pb ? props.pb : props.padding ? props.padding : "0"}px;
  background: ${(props) => (props.background ? props.background : "none")};
  border: ${(props) => (props.border ? props.border : "unset")};
  border-radius: ${(props) => (props.bRadius ? props.bRadius : "0")}px;
  text-align: ${(props) => (props.text ? props.text : "left")};
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "unset"};
  @media (max-width: 912px) {
    width: ${(props) => (props.mWidth ? props.mWidth : props.width)}%;
  }
  @media (max-width: 768px) {
    display: ${(props) => (props.mobile ? props.mobile : "block")};
    margin-top: ${(props) => (props.mMt ? props.mMt : "100")}px;
    padding: ${(props) => (props.pPadding ? props.pPadding : "0")}px;

    width: ${(props) => (props.mWidth ? props.mWidth : "100")}%;
    flex-direction: ${(props) => (props.flexDir ? props.flexDir : "unset")};
    overflow: hidden;
  }
  img {
    width: ${(props) => (props.img ? props.img : "100%")};
  }
`;

export const LeftPartial = styled.div`
  width: ${(props) => props.width}%;
  padding: ${(props) => (props.padding ? props.padding : "unset")};
  img {
    width: 100%;
  }
  @media (max-width: 912px) {
    width: ${(props) => (props.mWidth ? props.mWidth : props.width)}%;
    padding: ${(props) => (props.mPadding ? props.mPadding : "unset")};
  }
  @media (max-width: 768px) {
    display: ${(props) => (props.mobile ? props.mobile : "block")};
    margin-top: ${(props) => (props.mMt ? props.mMt : "0")}px;
    width: 100%;
    padding: 0;
    img {
      margin-left: ${(props) => (props.ml ? props.ml : props.ml)}px;
    }
  }
`;

export const RightPartial = styled.div`
  width: ${(props) => props.width}%;
  padding: ${(props) => (props.padding ? props.padding : "unset")};
  display: ${(props) => (props.display ? props.display : "block")};
  margin-top: ${(props) => (props.mt ? props.mt + "px" : "0")};
  margin-left: ${(props) => (props.mt ? props.ml + "px" : "0")};
  align-items: start;
  img {
    width: ${(props) => (props.img ? props.img + "px" : "100%")};
    margin-top: 5px;
    margin-right: 20px;
  }
  @media (max-width: 912px) {
    width: ${(props) => (props.mWidth ? props.mWidth : props.width)}%;
    padding: ${(props) => (props.mPadding ? props.mPadding : "unset")};
  }
  @media (max-width: 768px) {
    width: 100%;
    display: ${(props) => (props.mobile ? props.mobile : "block")};
    padding: ${(props) => (props.smPadding ? props.smPadding : "0")};
    margin-top: ${(props) => (props.mMt ? props.mMt : props.mt)}px;
    img {
      margin-right: 10px;
    }
  }
`;

export const List = styled.ul`
  margin-top: 20px;
  padding-inline-start: 22px;
  list-style-type: circle;
`;

export const Li = styled.li`
  color: #ffffff;
  font-size: 18px;
  padding: 10px 0;
  @media (max-width: 768px) {
    color: #1f1f39;
  }
`;

export const ShopButton = styled.div`
  margin-top: ${(props) => (props.margin ? props.margin : "30px")};
  width: ${(props) => props.width}%;
  border-radius: 15px;
  border: ${(props) => (props.border ? props.border : "2px solid #FFFFFF")};
  color: ${(props) => (props.color ? props.color : "#FFFFFF")};
  font-size: 22px;
  cursor: pointer;
  text-align: center;
  padding: ${(props) => (props.joinBtn ? "15px 10px" : "13px 0")};
  @media (max-width: 768px) {
    font-size: 18px;
    width: ${(props) => (props.mWidth ? props.mWidth : props.width)}%;
    margin: auto;
    margin-top: ${(props) => (props.mMt ? props.mMt : "20px")};
    border: ${(props) =>
      props.mColor
        ? `2px solid ${props.mColor}`
        : props.color
        ? props.color
        : "2px solid #FFFFFF"};
    color: ${(props) =>
      props.mColor ? props.mColor : props.color ? props.color : "#FFFFFF"};
  }
`;

export const Button = styled.div`
  margin-top: ${(props) => (props.margin ? props.margin : "30px")};
  width: ${(props) => props.width}%;
  background: ${(props) => (props.background ? props.background : "none")};
  cursor: pointer;
  border-radius: 25px;
  border: ${(props) => (props.border ? props.border : "2px solid #FFFFFF")};
  color: ${(props) => (props.color ? props.color : "#FFFFFF")};
  font-size: 18px;
  padding: ${(props) => (props.joinBtn ? "15px 0" : "13px 0")};
  text-align: center;
  img {
    width: 35px;
    height: 35px;
    margin-right: 10px;
  }
  @media (max-width: 768px) {
    font-size: 16px;
    width: ${(props) => (props.mWidth ? props.mWidth : props.width)}%;
    margin: auto;
    margin-top: ${(props) => (props.mMt ? props.mMt : "20px")};
  }
`;

export const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${(props) => (props.mt ? props.mt : "0")}px;
`;

export const Input = styled.input`
  width: ${(props) => (props.width ? props.width : "60")}%;
  border: 2px solid #7fc4af;
  border-radius: 17px;
  padding: 15px;
  font-weight: 400;
  font-size: 16px;
  color: rgba(48, 139, 123, 0.5);
  text-align: center;
  background: ${(props) => (props.background ? props.background : "#ffffff")};
  @media (max-width: 768px) {
    padding: 10px;
    width: ${(props) => (props.mWidth ? props.mWidth : "65")}%;
  }
`;

export const PositionContent = styled.div`
  position: absolute;
  top: ${(props) => (props.top ? props.top : "0")};
  left: ${(props) => (props.left ? props.left : "0")};
  img {
    width: ${(props) => (props.img ? props.img : "100%")};
  }
  @media (max-width: 912px) {
    left: 7%;
    img {
      width: 88%;
    }
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

export const Form = styled.form`
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    display: block;
  }
`;

export const Footer = styled.div`
  width: 80%;
  display: flex;
  margin: auto;
  margin-top: 100px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 100px;
  @media (max-width: 768px) {
    display: block;
  }
`;

export const Column = styled.div`
  width: ${(props) => (props.width ? props.width : "25")}%;
  margin-top: ${(props) => (props.mt ? props.mt : "0")}px;
  @media (max-width: 768px) {
    width: 100%;
    text-align: ${(props) => (props.mText ? props.mText : "left")};
    margin-top: ${(props) => (props.mMt ? props.mMt : props.mt)}px;
  }
`;

export const Link = styled.a`
  display: block;
  margin-top: ${(props) => (props.mt ? props.mt : "0")}px;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  @media (max-width: 768px) {
    text-align: ${(props) => (props.mText ? props.mText : "left")};
  }
`;

export const ScrollContent = styled.div`
  position: absolute;
  right: ${(props) => (props.right ? props.right : "unset")};
  left: ${(props) => (props.left ? props.left : "unset")};
  top: ${(props) => props.top};
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

export const Icon = styled.i`
  margin-top: ${(props) => (props.mt ? props.mt : "0")}px;
  margin-left: ${(props) => (props.ml ? props.ml : "0")}px;
  font-size: 22px;
  color: ${(props) => (props.color ? props.color : "#ffffff")};
`;

export const DeskImg = styled.img`
  display: block;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const MobileImg = styled.img`
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;
