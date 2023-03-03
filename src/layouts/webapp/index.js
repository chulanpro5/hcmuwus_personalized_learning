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
import { BsPencil, BsStickies } from "react-icons/bs";
import { DocumentGenerator } from "./DocumentGenerator";
import PopUp from "./components/popUpBox";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

import NotesStore from "stores/NotesStore";

import ContentStore from "stores/ContentStore";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { SideBar } from "./SideBar.js";


import { FormControl, FormLabel } from "@mui/material";
import LoadingSpin from "react-loading-spin";


const testData = [[`MobX is an open source state management tool. When creating a web application, developers often seek an effective way of managing state within their applications. One solution is to use a unidirectional data flow pattern named Flux, introduced by the React team, and later implemented in a package called React-Redux, which made the use of the Flux pattern even easier`,
  `MobX, a simple, scalable, and standalone state management library, follows functional reactive programming (FRP) implementation and prevents inconsistent state by ensuring that all derivations are performed automatically. According to the MobX getting started page, “MobX makes state management simple again by addressing the root issue: it makes it impossible to produce an inconsistent state”`,
  `MobX is standalone and does not depend on any frontend library or framework to work. There are implementations of the MobX in popular front-end frameworks like React, Vue, and Angular`],
[`In this tutorial, we will discuss how to use MobX with React, but first, we will begin by getting to understand MobX a little better`,
  `In addition to being a library, MobX also introduces a few concepts: state, actions, and derivations (including reactions and computed values)`,
  `Application state refers to the entire model of an application, and can contain different data types including array, numbers, and objects. In MobX, actions are methods that manipulate and update the state. These methods can be bound to a JavaScript event handler to ensure a UI event triggers them`,
  `Anything (not just a value) that is derived from the application state without further interaction is referred to as a derivation. Derivations will listen to any particular state and then perform some computation to produce a distinct value from that state. A derivation can return any data type, including objects. In MobX, the two types of derivations are reactions and computed values`]]
const testDataAPI = '[["AI is used to show intelligence in activities such as speech recognition, computer vision, and language translation","2nd sentence", "3rd sentence"], ["Examples of AI applications include web search engines (Google Search), recommendation systems (YouTube, Amazon, Netflix), understanding human speech (Siri, Alexa), self-driving cars (Waymo), generative or creative tools (ChatGPT, AI art), automated decision-making and strategic game systems (chess, Go)"], ["AI is used in a wide range of topics and activities"]]'

const folderData = [{ name: 'Computer Hardware', books: ['Book 1', 'Book 2'] },
{ name: 'Programming', books: ['Book 1', 'Book 2'] },
{ name: 'Mathematics', books: ['Book 1', 'Book 2'] },
{ name: 'Novel', books: ['Book 3.1', 'Book 3'] },
{ name: 'Marvel', books: ['Book 4', 'Book 6'] },
{ name: 'Sciences', books: ['Book 1.1', 'Book 2.2'] },
{ name: 'Literature', books: ['Book 1.2', 'Book 2.2'] },
{ name: 'History', books: ['Book 1.2', 'Book 2.1'] }];

function Webapp() {
  //const store = new ContentStore();
  const [url, setUrl] = useState("https://en.wikipedia.org/wiki/GPT-3")
  const [key, setKey] = useState("");
  const [openai, setOpenai] = useState(null);
  const [content, useContent] = useState(null);
  const [loading, setLoading] = useState(false);
  

  const handleSubmit = (e) => {
    setLoading(true);
    axios({
      method: 'post',
      url: "https://689e-113-22-113-75.ap.ngrok.io/api/wiki_retrieve/",
      data:{
        url: url,
        apiKey: key
      }
    })
      .then(res => {
        useContent(JSON.parse(res.data.payload))
        ContentStore.fetchData(JSON.parse(res.data.payload))
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }

  const handleAddNote = () => {
    const note = {
      "content": content,
      "id": uuidv4()
    }
    NotesStore.addNote(note);
    console.log(NotesStore.getNotes());
  }

  return (
    <DashboardLayout>
      {/* <DashboardNavbar /> */}
      <VuiBox py={3} height={810} marginBottom={5}>
        <Grid container={true} spacing="3px" height="100%" display="flex" justifyContent="space-between">
          <SideBar folders={folderData} />
          <Grid item xs={12} lg={10} maxHeight='48rem'>
            <VuiBox
              p={3}
              height="100%"
              borderRadius={"lg"}>
              {content ? (
                <VuiBox height="34.5rem">
                  <VuiTypography opacity={0.5} pb='2rem'  maxHeight="1rem">
                    {url + `: ` + content[0][0].slice(0, 75) + `...`}
                  </VuiTypography>

                  <VuiBox borderRadius="1.5rem" border="1px solid" height="100%" padding="2rem" pr="0rem" sx={{ backgroundColor: 'white'}}>
                  <DocumentGenerator document={ContentStore.getContent()} />
                  </VuiBox>

                  <VuiBox display="flex" gap='3rem' justifyContent="flex-end" m='1rem'>
                    
                    <VuiButton color="info" onClick={handleAddNote} href="/notes" sx={{ width: '8rem', '&:hover': { backgroundColor: 'green'} }}>
                      Save
                    </VuiButton>
                    <VuiButton color="info" sx={{ width: '8rem', '&:hover': { backgroundColor: 'darkred'}}} onClick={() => {
                      useContent(null)
                    }}>
                      Cancel
                    </VuiButton>
                  </VuiBox>
                </VuiBox>
              ) : (
                <VuiBox
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  flexDirection="column"
                  gap={3}
                  px="25%"
                  sx={{ backgroundColor: 'lightgrey', borderRadius: '1.5rem' }}>
                  {loading && <LoadingSpin/>}
                  <FormControl style={{ width: "100%", textAlign: "center" }}>
                    <FormLabel color='info' for="openai-api-key" sx={{ fontSize: "1.5rem", fontWeight: 'bold', margin: '0.8rem' }}>
                      OpenAI API Key
                    </FormLabel >
                    <VuiInput type="text" id="openai-api-key" placeholder="Enter OpenAI API Key" onChange={e => setKey(e.target.value)} sx={{ fontSize: 20, height: '1rem' }} />
                    <FormLabel for="wiki-url" color='info' sx={{ fontSize: "1.5rem", fontWeight: 'bold', margin: '0.8rem' }}>
                      Wikipedia URL
                    </FormLabel >
                    <VuiInput type="url" id="wiki-url" placeholder="Enter a Wikipedia URL here" value={url} sx={{ fontSize: 20, height: '1rem' }} onChange={e => setUrl(e.target.value)} />
                    <VuiButton variant="contained" color="info" sx={{
                      '&:hover': {
                        backgroundColor: 'green'
                      }, height: "3.2rem", width: "50%", marginLeft: "7.4rem", marginTop: '3rem', borderRadius: '1.5rem'
                    }} onClick={handleSubmit} disabled={loading}>
                      <BsStickies size="20px" color="inherit" />
                      <VuiTypography variant="lg" color="light" mx='0.5rem'>
                        Upload New Link
                      </VuiTypography>
                    </VuiButton>
                  </FormControl>
                  <VuiButton variant="contained" color="info" sx={{
                    '&:hover': {
                      backgroundColor: 'green'
                    }, width: "50%", height: "3.2rem", borderRadius: "2rem", padding: '1rem'
                  }}
                    onClick={() => {
                      useContent(testData)
                      ContentStore.fetchData(testData)
                    }} disabled={loading}>
                    <BsPencil size="20px" color="inherit" />
                    <VuiTypography variant="lg" color="light" m='1rem'>
                      Testing
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
