import React from 'react';
import { PaymentInputsWrapper, usePaymentInputs } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';




export default function PaymentInputs(props) {
  const {
    meta,
    wrapperProps,
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps
  } = usePaymentInputs();


  return (
    <form onSubmit={props.handleSubmit}>
        <div style={{marginTop: '20px',justifyContent: 'space-between',display: 'flex'}}>
            <PaymentInputsWrapper {...wrapperProps}>
            <svg {...getCardImageProps({ images })} />
            <input {...getCardNumberProps({onChange: props.handleChangeCardNumber})} />
            <input {...getExpiryDateProps({onChange: props.handleChangeExpiry})} />
            <input {...getCVCProps({onChange: props.handleChangeCVC})} />
            </PaymentInputsWrapper>
            <i className="fa fa-save mt-1" style={{fontSize: '20px',cursor:'pointer'}} onClick={()=>{props.handleSubmit(meta)}}/>
            <i className="fa fa-times mt-1" style={{fontSize: '20px',cursor:'pointer'}} onClick={()=>{props.handleCancel()}}/>
        </div>        
    </form>
  );
}