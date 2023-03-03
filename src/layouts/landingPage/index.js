import Grid from "@mui/material/Grid";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/LandingpageLayout";
import computer from "./assets/computer.svg";
import VuiButton from "components/VuiButton";


function Landing() {
  return (
    <DashboardLayout>
      {/* <Header /> */}
      <VuiBox sx={{
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Grid container sx={{ direction: 'row', width: '90vw', justifyContent: 'flex-end', margin: '0px', paddingTop: '30px' }}>
          <VuiButton variant="outlined" size="medium" color="info" href="/authentication/sign-in">Log in</VuiButton>
          <VuiButton variant="contained" size="medium" color="info" href="/authentication/sign-up" sx={{ marginLeft: 5, marginTop: 0 }}>Sign Up</VuiButton>
        </Grid>
        <Grid
          container
          padding={0}
          sx={{
            padding: '0px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Grid
            container
            item
            direction="column"
            sx={{
              justifyContent: 'center',
              alignItems: 'center'
            }}
            xs={6}
          >
            <Grid sx={{ margin: "10%", padding: 5 }} item>
              <VuiTypography sx={{ marginBottom: 4 }} color={"black"} variant="h1" fontWeight="bold" >
              Revolutionizes Users' Interaction with Documents
              </VuiTypography>
              <hr marginTop="10px" height="2px" borderWidth="0" color="black" backgroundColor="gray" width="50%"></hr>

              <VuiTypography sx={{ marginTop: 7, textAlign: "justify" }} color="dark" variant="h5" fontWeight="regular" >
              This is a revolutionary document interaction app that leverages user behavior to embed vectors and store them in a Redis vector database. This process creates a long-term memory AI that truly understands the user's needs and preferences, leading to a highly efficient reading experience.
                </VuiTypography>
              <VuiButton sx={{
                marginTop: 3, paddingTop: 2, paddingBottom: 2, paddingLeft: 3, paddingRight: 3, width: "40%", height: "13%", borderRadius: 10,}} variant="contained" color="info" href="/authentication/sign-in">
                  <VuiTypography variant='lg' sx={{ fontSize: 20, fontWeight: 'bold'}} color='light'>Explore more</VuiTypography>
                </VuiButton>
            </Grid>
            <Grid item>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <img src={computer} width="90%" height="100%"/>
          </Grid>
        </Grid>
      </VuiBox>
    </DashboardLayout>
  );
}

export default Landing;
