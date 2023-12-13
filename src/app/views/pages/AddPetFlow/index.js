import React, { useEffect, useState } from "react";
import MobileNavbar from "@app/views/components/Navbars/MobileNavbar.js";

import { ScanQR } from "@app/views/components/AddPetFlow/ScanQR";
import { Information } from "@app/views/components/AddPetFlow/Information";
import { Gender } from "@app/views/components/AddPetFlow/Gender";
import { Health } from "@app/views/components/AddPetFlow/Health";
import { Personality } from "@app/views/components/AddPetFlow/Personality";
import { Box } from "@material-ui/core";
import Contact from "@app/views/components/AddPetFlow/Contact";

const AddPetFlow = (props) => {
  const [step, setStep] = useState(1);

  const handleNextStep = (stepC) => {
    setStep(stepC);
  };

  const handlePreStep = (stepC) => {
    setStep(stepC);
  };

  return (
    <>
      <MobileNavbar icon="fa fa-chevron-left" className />
      <Box style={{ height: "100%", paddingTop: "50px" }}>
        {step == 1 && <ScanQR handleNextStep={handleNextStep} />}
        {step == 2 && <Information handleNextStep={handleNextStep} handlePreStep={handlePreStep} />}
        {step == 3 && (
          <Gender
            handleNextStep={handleNextStep}
            handlePreStep={handlePreStep}
          />
        )}
        {step == 4 && (
          <Health
            handleNextStep={handleNextStep}
            handlePreStep={handlePreStep}
          />
        )}
        {step == 5 && (
          <Personality
            handleNextStep={handleNextStep}
            handlePreStep={handlePreStep}
          />
        )}
        {step == 6 && <Contact handlePreStep={handlePreStep} />}
      </Box>
    </>
  );
};

export default AddPetFlow;
