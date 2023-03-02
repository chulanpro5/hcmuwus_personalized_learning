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
import Typography from '@mui/material/Typography';
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import Footer from "examples/Footer";
// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/LandingpageLayout";
import WelcomeMark from "layouts/dashboard/components/WelcomeMark";
// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";
import Welcome from "../profile/components/Welcome/index";
import CarInformations from "layouts/profile/components/CarInformations";
import Tables from "../tables/index";
import Paper from '@mui/material/Paper';
import { width } from "@mui/system";
import computer from "./assets/computer.svg";
import VuiButton from "components/VuiButton";
import PageLayout from "examples/LayoutContainers/PageLayout";

function Landing() {
  return (
    <DashboardLayout>
      {/* <Header /> */}
      <VuiBox sx={{height:'100%',
              justifyContent:'center',
              alignItems:'center'}}>
        <Grid container sx={{ direction: 'row', width: '90vw', justifyContent: 'flex-end', margin:'0px', paddingTop:'30px'}}>
          <VuiButton variant="outlined" size="medium" color="info" href="/authentication/sign-in">Log in</VuiButton>
          <VuiButton variant="contained" size="medium" color="info" href="/authentication/sign-up" sx={{marginLeft: 5, marginTop:0}}>Sign Up</VuiButton>
        </Grid>
        <Grid
          container
          padding={0}
          sx={{padding:'0px',
              justifyContent:'center',
              alignItems:'center'}}
          >
          <Grid
            container
            item
            direction="column"
            sx={{
            justifyContent:'center',
            alignItems:'center'}}
            xs={6}
          >
            <Grid sx={{margin:"10%", padding:5}} item>
              <VuiTypography sx={{ marginBottom: 4 }} color={"black"} variant="h1" fontWeight="bold" >
              Personalized learning for everyone
              </VuiTypography>
              <hr marginTop="10px" height="2px" borderWidth="0" color="black" backgroundColor="gray" width="50%"></hr>
          
              <VuiTypography  sx={{ marginTop: 7, textAlign:"justify" }} color="black" variant="h5" fontWeight="regular" >
              Personalized learning is an increasingly popular and important educational approach in modern education. This concept refers to customizing the learning process for each student based on their needs, interests, abilities, and learning styles. The goal of personalized learning is to enhance the effectiveness of learning by tailoring the content to fit each individual.
              </VuiTypography>
              <VuiButton sx={{marginTop: 3, paddingTop: 2, paddingBottom: 2, paddingLeft: 3, paddingRight: 3}} variant="contained" size="large"  color="info" href="/authentication/sign-in">Explore more</VuiButton>
            </Grid>
            <Grid item>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <img src={computer} width={630} height={562} />
          </Grid>
        </Grid>
      </VuiBox>
    </DashboardLayout>
  );
}

export default Landing;
