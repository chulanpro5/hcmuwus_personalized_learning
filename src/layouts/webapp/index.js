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
import Grid from "@mui/material/Grid";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";



import { useState, useEffect, ChangeEvent } from "react"
import VuiButton from "components/VuiButton";
import VuiInput from "components/VuiInput";
import { BsArrowRepeat, BsStickies } from "react-icons/bs";
import { MdFolder } from 'react-icons/md';
import { DocumentGenerator } from "./DocumentGenerator";

const testData = [`MobX is an open source state management tool. When creating a web application, developers often seek an effective way of managing state within their applications. One solution is to use a unidirectional data flow pattern named Flux, introduced by the React team, and later implemented in a package called React-Redux, which made the use of the Flux pattern even easier.`,
`MobX, a simple, scalable, and standalone state management library, follows functional reactive programming (FRP) implementation and prevents inconsistent state by ensuring that all derivations are performed automatically. According to the MobX getting started page, “MobX makes state management simple again by addressing the root issue: it makes it impossible to produce an inconsistent state.”`,
`MobX is standalone and does not depend on any frontend library or framework to work. There are implementations of the MobX in popular front-end frameworks like React, Vue, and Angular.`,
`In this tutorial, we will discuss how to use MobX with React, but first, we will begin by getting to understand MobX a little better.`,
`In addition to being a library, MobX also introduces a few concepts: state, actions, and derivations (including reactions and computed values).`,
`Application state refers to the entire model of an application, and can contain different data types including array, numbers, and objects. In MobX, actions are methods that manipulate and update the state. These methods can be bound to a JavaScript event handler to ensure a UI event triggers them.`,
`Anything (not just a value) that is derived from the application state without further interaction is referred to as a derivation. Derivations will listen to any particular state and then perform some computation to produce a distinct value from that state. A derivation can return any data type, including objects. In MobX, the two types of derivations are reactions and computed values.`]
function Webapp() {

  const [content, useContent] = useState(testData);
  const [resume, setResume] = useState(false);
  const [file, setFile] = useState([]);


  useEffect(() => {

  }, [])

  const handleFileChange = (e => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: file,
      // 👇 Set headers manually for single file upload
      headers: {
        'content-type': file.type,
        'content-length': `${file.size}`, // 👈 Headers need to be a string
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  });



  return (
    <DashboardLayout>
      {/* <DashboardNavbar /> */}
      <VuiBox py={3} height={810} marginBottom={5}>
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
              height={810}
              bgColor="light"
              borderRadius={"lg"}>
              {content !== null && resume? (
                <DocumentGenerator document={content}/>
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
                    <VuiTypography variant="lg" color="light" mx={1} type="input" >
                      <input type="file" id="file-upload" onChange={handleFileChange} hidden/>
                      <label for="file-upload">Upload New File...</label>
                    </VuiTypography>
                  </VuiButton>
                  <VuiButton variant="contained" color="info" style={{width: "50%", height: "6%"}} onClick={() => setResume(true)}>
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
