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
// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import team1 from "assets/images/avatar1.png";
import team2 from "assets/images/avatar2.png";
import team3 from "assets/images/avatar3.png";
import team4 from "assets/images/avatar4.png";
// Images
import profile1 from "assets/images/profile-1.png";
import profile2 from "assets/images/profile-2.png";
import profile3 from "assets/images/profile-3.png";
// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import Footer from "examples/Footer";
// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import WelcomeMark from "layouts/dashboard/components/WelcomeMark";
// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";
import Welcome from "../profile/components/Welcome/index";
import CarInformations from "./components/CarInformations";
import Tables from "../tables/index";
import PerformanceChart from "./components/PerformChart/PerformChart";
import MyCalendar from "./components/Calendar/Calendar";
import MyBookshelf from "./components/Bookshelf/bookshelf";
import Paper from '@mui/material/Paper';

function Overview() {
  return (
    <DashboardLayout>
      {/* <Header /> */}
      <VuiBox>
        <Grid container marginLeft={6} columns={24} sx={({ breakpoints }) => ({
          [breakpoints.only('sm')]: {
            direction: 'column',
          },
          [breakpoints.up('md')]: {
            direction: 'row',
          }
        })}>
          <WelcomeMark />
        </Grid>
        <Grid
          container
          columns={12}
          sx={({ breakpoints }) => ({
            [breakpoints.only('sm')]: {
              direction: 'column',
            },
            [breakpoints.up('md')]: {
              direction: 'row',
            }
          })}>
          <Grid
            container
            item
            direction="column"
            justifyContent="center"
            alignItems="center"
            xs={6}
          >
            <Grid item xs={12} md={6} xl={3}>
              <PerformanceChart />
            </Grid>
            <Grid item>
              <Paper sx={{ width: 500, height: 380, borderRadius: 10, padding: 4 }}>
                <MyCalendar />
              </Paper>
            </Grid>
          </Grid>

          <Grid container item xs={6}>
            <MyBookshelf />
          </Grid>
        </Grid>
      </VuiBox>
    </DashboardLayout>
  );
}

export default Overview;
