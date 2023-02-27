import React from "react";

import { Card, Icon } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

import gif from "assets/images/cardimgfree.png";

const WelcomeMark = () => {
  return (
    <Card sx={() => ({
      height: "175px",
      width: "736px",
      py: "32px",
      backgroundColor: "#66C4E8",
      backgroundSize: "cover",
      backgroundPosition: "50%"
    })}>
      <VuiBox height="100%" display="flex" flexDirection="column" justifyContent="space-between">
        <VuiBox>
          <VuiTypography color="text" variant="button" fontWeight="bold" mb="20px">
            Welcome back, Ayo 
          </VuiTypography>
        </VuiBox>
        <VuiTypography color="text" variant="button" fontWeight="regular" mb="12px">
            You've spent 70% more time learning than last week!
        </VuiTypography>
        <VuiTypography color="text" variant="button" fontWeight="regular" mb="12px">
            Keep up the great work!
        </VuiTypography>
      </VuiBox>
    </Card>
  );
};

export default WelcomeMark;
