/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { sizing } from '@mui/system';

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";

import { useState, useEffect } from "react"
import VuiButton from "components/VuiButton";
import { BsArrowRepeat, BsStickies } from "react-icons/bs";
import { MdFolder } from 'react-icons/md';

function Webapp() {

  const [content, useContent] = useState("");
  useEffect(() => {

  }, [])

  return (
    <DashboardLayout>
      {/* <DashboardNavbar /> */}
      <VuiBox py={3} height={"100vh"}>
        <Grid container spacing="3px" height="100%" display="flex" justifyContent="space-between">
          <Grid item xs={12} lg={1.75}>
            <VuiBox bgColor="light" height="100%" width="100%" borderRadius="lg" p={3} >
              <VuiBox display="flex"
                justifyContent="top"
                alignItems="center"
                height="5%"
                flexDirection="column"
                px="25%"
                bgColor="light"
                marginTop={-2}>
                <VuiButton variant="contained" color="info" padding={1}>
                  <MdFolder size="15px" color="inherit" />
                  <VuiTypography variant="lg" color="light" mx={1} >
                    Directory
                  </VuiTypography>
                </VuiButton>
              </VuiBox>
            </VuiBox>
          </Grid>
          <Grid item xs={12} lg={10}>
            <VuiBox
              p={3}
              height={"100%"}
              bgColor="light"
              borderRadius={"lg"}>
              {content != "" ? (
                <VuiBox>
                  breh
                </VuiBox>
              ) : (
                <VuiBox
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  flexDirection="column"
                  gap={3}
                  px="25%">
                  <VuiButton variant="contained" color="info" style={{width: "50%", height: "6%"}}>
                    <BsStickies size="20px" color="inherit" />
                    <VuiTypography variant="lg" color="light" mx={1}>
                      Upload New File...
                    </VuiTypography>
                  </VuiButton>
                  <VuiButton variant="contained" color="info" style={{width: "50%", height: "6%"}}>
                    <BsArrowRepeat size="20px" color="inherit" />
                    <VuiTypography variant="lg" color="light" mx={1}>
                      Resume Learning
                    </VuiTypography>
                  </VuiButton>
                </VuiBox>
              )}
            </VuiBox>
          </Grid>
        </Grid>
      </VuiBox>
    </DashboardLayout >
  );
}

export default Webapp;
