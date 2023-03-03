import React from "react";

import { Card, Icon } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import { ImageList } from "@mui/material";
import { ImageListItem } from "@mui/material";
import { Grid } from "@mui/material";
import gif from "assets/images/welcome-profile.png";
import wave from "assets/images/wave.png";

const WelcomeMark = () => {
  return (
    <Card sx={() => ({
      height: "300px",
      width: "1050px",
      //py: "32px",
      backgroundColor: "#66C4E8",
      backgroundSize: "cover",
      backgroundPosition: "50%",
      marginTop:0,
       paddingTop:0
      
    })}>
      <VuiBox height="100%" display="flex" flexDirection="column" justifyContent="space-between">
        <Grid container direction="row" columns={16} width={1000}>
          <Grid item xs={10} sx={{marginTop:2}}>
            <VuiBox >
              <VuiTypography sx={{margin: 5}} color="white" fontWeight="bold" variant="h1">
              Welcome back, Ayo {" "}
              <img src={wave} width={38} height={38} />
              </VuiTypography>
            </VuiBox>
            <VuiTypography sx={{margin: 5}} color="white" fontWeight="regular" variant="p">
              You've spent <b>70%</b> more time learning than last week! <br />
            </VuiTypography>
            <VuiTypography sx={{margin: 5}} color="white" fontWeight="regular" variant="p">
              Keep up the great work!
            </VuiTypography>
          </Grid>
          <Grid item xs={6} width="100%" paddingLeft={6} sx={{marginTop:0, paddingTop:0}}>
            <img src={gif} width={350} height={350} />
          </Grid>
        </Grid>
      </VuiBox>
    </Card>
  );
};

export default WelcomeMark;
