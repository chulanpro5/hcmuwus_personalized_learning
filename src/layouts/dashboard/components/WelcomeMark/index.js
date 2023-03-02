import React from "react";

import { Card, Icon } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import { ImageList } from "@mui/material";
import { ImageListItem } from "@mui/material";
import { Grid } from "@mui/material";
import gif from "assets/images/welcome-profile.png";

const WelcomeMark = () => {
  return (
    <Card sx={() => ({
      height: "300px",
      width: "1050px",
      py: "32px",
      backgroundColor: "#66C4E8",
      backgroundSize: "cover",
      backgroundPosition: "50%",
      
    })}>
      <VuiBox height="100%" display="flex" flexDirection="column" justifyContent="space-between">
        <Grid container direction="row" columns={16} width={1000}>
          <Grid item width={650}>
            <VuiBox >
              <VuiTypography color="text" fontWeight="bold">
              <h1 style={{fontSize: 50, margin: 5, marginBottom: 30}}>Welcome back, Ayo</h1>
              </VuiTypography>
            </VuiBox>
            <VuiTypography color="text" fontWeight="regular">
              <p style={{fontSize: 20, margin: 5, marginBottom: 7}}>You've spent <b>70%</b> more time learning than last week! <br /></p>
            </VuiTypography>
            <VuiTypography color="text" fontWeight="regular">
              <p style={{fontSize: 20, margin: 5, marginBottom: 7}}>Keep up the great work!</p>
            </VuiTypography>
          </Grid>
          <Grid item width={350} paddingLeft={13} height={250}>
            <img src={gif} width={230} height={230} />
          </Grid>
        </Grid>
      </VuiBox>
    </Card>
  );
};

export default WelcomeMark;
