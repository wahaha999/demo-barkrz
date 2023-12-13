import React , { useState } from 'react';
import { useHistory } from "react-router-dom";
import MobileNavbar from "@app/views/components/Navbars/MobileNavbar.js";
import QrScanComponent from "@app/views/components/QrScanComponent/index.js";
import GenderView from "@app/views/components/GenderView/index.js";
import NameProfileView from '@app/views/components/NameProfileView';
import AddressView from '@app/views/components/AddressView';
import BirthWeightView from '@app/views/components/BirthWeightView';
import MedicalView from '@app/views/components/MedicalView';
import OwnerView from '@app/views/components/OwnerView';

const AddPetPage = (props) => {
    const [step, setStep] = useState(1);
    let history = useHistory();

    return(
        <>
            <MobileNavbar />
            {
                step == 1 && 
                <QrScanComponent setStep={setStep(2)} />
            }
            {
                step == 2 && 
                <GenderView setStep={setStep(3)} />
            }
            {
                step == 3 && 
                <NameProfileView setNext={setStep(4)} setPrev={setStep(2)} />
            }
            {
                step == 4 && 
                <AddressView setNext={setStep(5)} setPrev={setStep(3)} />
            }
            {
                step == 5 && 
                <BirthWeightView setNext={setStep(6)} setPrev={setStep(4)} />
            }
            {
                step == 6 && 
                <MedicalView setNext={setStep(7)} setPrev={setStep(5)} />
            }
            {
                step == 7 && 
                <OwnerView setNext={setStep(8)} setPrev={setStep(6)} history={history}/>
            }
        </>
    );
}

export default AddPetPage;
