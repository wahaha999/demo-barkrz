import styled from "styled-components";

export const FormContainer = styled.div`
  background: #ffffff;
  border: 1px solid #fff0e9;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 25px;
  width: 50%;
  margin: auto;
  padding: 30px;
  margin-bottom: 50px;
  @media (max-width: 1024px) {
    width: 80%;
  }
`;

export const Box = styled.div`
  border: 1px solid #1f1f39;
  border-radius: 20px;
  width: 230px;
  height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 10px;
`;

export const ContentInput = styled.input`
  width: 100%;
  background: rgba(31, 31, 57, 0.08);
  box-sizing: border-box;
  border-radius: 15px;
  border: 1px solid rgba(31, 31, 57, 0.19);
  height: 50px;
  padding-left: 10px;
  margin: 20px 0px;
  &::placeholder {
    font-weight: 500;
    color: #1f1f39;
  }
`;

export const ContentArea = styled.textarea`
  width: 100%;
  background: rgba(31, 31, 57, 0.08);
  box-sizing: border-box;
  border-radius: 15px;
  border: none;
  margin: 20px 0px;
  padding: 10px;
  &::placeholder {
    font-weight: 500;
    color: #1f1f39;
  }
`;

export const Comment1 = styled.p`
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  color: #1f1f39;
  text-align: start;
  @media (max-width: 768px) {
    font-size: 14px;
    display: ${(props) => props.mobile};
  }
`;

export const OurContainer = styled.div`
  width: 50%;
  margin: auto;
  margin-bottom: 50px;
  @media (max-width: 1024px) {
    width: 80%;
  }
`;

export const OurStory = styled.h4`
  color: #1f1f39 !important;
  font-weight: 700 !important;
`;
