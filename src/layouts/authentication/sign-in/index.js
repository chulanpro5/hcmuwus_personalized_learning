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

import { useState, useEffect } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";
import GradientBorder from "examples/GradientBorder";

// Vision UI Dashboard assets
import radialGradient from "assets/theme/functions/radialGradient";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgSignIn from "assets/images/signInImage.png";
import jwt_decode from "jwt-decode"
//import UserStore from "stores/userInfo";
import { observer } from 'mobx-react';
import store from 'stores/userInfo';

function SignIn() {
  const [user, setUser] = useState({});
  const [rememberMe, setRememberMe] = useState(true);

  const handleCheckUser = (user) => {
    
    // Render user information
  }

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleCallbackResponse = (res) => {
    console.log("Encoded JWT ID Token: " + res.credential);
    var userObject = jwt_decode(res.credential)

    if (store.findUser(userObject.sub)) {
      console.log("User exists");
      setUser(userObject)
      document.getElementById("signinDiv").hidden = true
      document.getElementById("sign-in-button").classList.remove("Mui-disabled");
      document.getElementById("sign-in-button").disabled = false;
      document.getElementById("dont-have-account").hidden = true;
      
    } else {
      console.log("User does not exist");
      document.getElementById("dont-have-account").hidden = true;
      document.getElementById("wrong-email-text").hidden = false;
    }
    console.log(userObject)
  }
  const handleSignOut = () => {
    setUser({});
    document.getElementById("signinDiv").hidden = false;
  }
  useEffect(() => {
    google.accounts.id.initialize({
      client_id: "366197597969-qh86apab0humd4326ooo4pok0aeifrkh.apps.googleusercontent.com",
      callback: handleCallbackResponse
    })

    google.accounts.id.renderButton(
      document.getElementById("signinDiv"),
      { theme: "outline", size: "large"}
    )
  }, [])
  return (
    <CoverLayout
      title="Nice to see you!"
      color="white"
      description=" "
      premotto="PERSONALIZED LEARNING PLATFORM:"
      motto="THE NEW WAY OF LEARNING"
      image={bgSignIn}
    >
      <VuiBox component="form" role="form">
        
          <div id="signinDiv"></div>
          {user && (<p>{user.name}</p>)}
           {/*
        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Email
            </VuiTypography>
          </VuiBox>
          <GradientBorder
            minWidth="100%"
            padding="1px"
            borderRadius={borders.borderRadius.lg}
            backgroundImage={radialGradient(
              palette.gradients.borderLight.main,
              palette.gradients.borderLight.state,
              palette.gradients.borderLight.angle
            )}
          >
            <VuiInput type="email" placeholder="Your email..." fontWeight="500" />
          </GradientBorder>
        </VuiBox>
        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Password
            </VuiTypography>
          </VuiBox>
          <GradientBorder
            minWidth="100%"
            borderRadius={borders.borderRadius.lg}
            padding="1px"
            backgroundImage={radialGradient(
              palette.gradients.borderLight.main,
              palette.gradients.borderLight.state,
              palette.gradients.borderLight.angle
            )}
          >
            <VuiInput
              type="password"
              placeholder="Your password..."
              sx={({ typography: { size } }) => ({
                fontSize: size.sm,
              })}
            />
          </GradientBorder>
        </VuiBox>
      
        <VuiBox display="flex" alignItems="center">
          <VuiSwitch color="info" checked={rememberMe} onChange={handleSetRememberMe} />
          <VuiTypography
            variant="caption"
            color="white"
            fontWeight="medium"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;Remember me
          </VuiTypography>
            </VuiBox> */}
          <VuiTypography id="wrong-email-text" hidden="true" variant="button" color="warning" fontWeight="regular">
            You haven't registed yet! {" "}
            <VuiTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="text"
              fontWeight="medium"
            >
              Sign up
            </VuiTypography>
          </VuiTypography>
        <VuiBox mt={4} mb={1}>

        <a href="/profile">
          <VuiButton id="sign-in-button" disabled={true} color="info" fullWidth onClick={() => handleCheckUser(user)} >
            SIGN IN
          </VuiButton>
          </a>
          </VuiBox>
        <VuiBox mt={3} textAlign="center">
          <VuiTypography id="dont-have-account" variant="button" color="text" fontWeight="regular">
            Don't have an account?{" "}
            <VuiTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="white"
              fontWeight="medium"
            >
              Sign up
            </VuiTypography>
          </VuiTypography>
        </VuiBox>
      </VuiBox>
    </CoverLayout>
  );
}

export default observer(SignIn);
