import React, { useEffect, useState } from "react";
import MobileNavbar from "@app/views/components/Navbars/MobileNavbar.js";
import queryString from "query-string";

import { ScanQR } from "@app/views/components/AddPetFlow/ScanQR";
import { Box } from "@material-ui/core";

const UpdatePetID = (props) => {
  const handleUpdate = () => {};
  const [petID, setPetID] = useState(props.petID);

  useEffect(() => {
    let url = props.location.search;
    let params = queryString.parse(url);
    const { id } = params;
    setPetID(id);
  }, []);

  return (
    <>
      <MobileNavbar icon="fa fa-chevron-left" className />
      <Box style={{ height: "100%", paddingTop: "50px" }}>
        <ScanQR handleNextStep={handleUpdate} petID={petID} />
      </Box>
    </>
  );
};

export default UpdatePetID;
