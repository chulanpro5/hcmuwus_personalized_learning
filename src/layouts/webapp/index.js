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
import { BsArrowRepeat, BsPencil, BsStickies } from "react-icons/bs";
import { DocumentGenerator } from "./DocumentGenerator";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

import NotesStore from "stores/NotesStore";

import { Configuration, OpenAIApi } from "openai";
import ContentStore from "stores/ContentStore";
import {parse, stringify, toJSON, fromJSON} from 'flatted';
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { SideBar } from "./SideBar.js";


import { FormControl, FormLabel } from "@mui/material";


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
  const [file, setFile] = useState([]);

  useEffect(() => {

  }, [])

  const handleFileChange = (e => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      useContent(reader.result.split('\n'))
      //fileContents.textContent = reader.result;
    };

    reader.readAsText(file);
  });

  const handleSubmit = (e) => {
    axios({
      method: 'post',
      url: "http://localhost:4000/api/wiki_retrieve/",
      data: {
        url: url,
        apiKey: key
      }
    })
      .then(res => {
        useContent(JSON.parse(res.data.payload))
        ContentStore.fetchData(JSON.parse(res.data.payload))
      })
      .catch(err => console.log(err))


    setOpenai(new OpenAIApi(new Configuration({ apiKey: key })))
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
          <Grid item xs={12} lg={10} maxHeight='47.5rem'>
            <VuiBox
              p={3}
              height="100%"
              bgColor="light"
              borderRadius={"lg"}>
              {content !== null ? (
                <VuiBox>
                  <VuiTypography opacity={0.5}>
                    {url + `: ` + content[0].slice(0, 200) + `...`}
                  </VuiTypography>
                  <DocumentGenerator document={ContentStore.getContent()} />
                  <VuiBox display="flex" gap={3} justifyContent="flex-end" m={3}>
                    <VuiButton color="info" onClick={handleAddNote} href="/notes">
                      Save
                    </VuiButton>
                    <VuiButton color="dark" onClick={() => {
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
                  sx={{backgroundColor: 'lightgrey', borderRadius: '1.5rem'}}>
                  <FormControl style={{ width: "100%", textAlign: "center" }}>
                    <FormLabel color='info' for="openai-api-key" sx={{ fontSize: "1.5rem", fontWeight: 'bold', margin: '0.8rem'}}>
                      OpenAI API Key
                    </FormLabel >
                    <VuiInput type="text" id="openai-api-key" placeholder="Enter OpenAI API Key" onChange={e => setKey(e.target.value)} sx={{ fontSize: 20, height: '1rem'}} />
                    <FormLabel for="wiki-url" color='info' sx={{ fontSize: "1.5rem", fontWeight: 'bold', margin: '0.8rem'}}>
                      Wikipedia URL
                    </FormLabel >
                    <VuiInput type="url" id="wiki-url" placeholder="Enter a Wikipedia URL here" value={url} sx={{ fontSize: 20, height: '1rem'}} onChange={e => setUrl(e.target.value)} />
                    <VuiButton variant="contained" color="info" sx={{ '&:hover': {
  backgroundColor: 'green'                     }, height: "3.2rem", width: "50%", marginLeft: "7.4rem", marginTop: '3rem', borderRadius: '1.5rem'}} onClick={handleSubmit}>
                      <BsStickies size="20px" color="inherit" />
                      <VuiTypography variant="lg" color="light" mx='0.5rem'>
                        Upload New Link
                      </VuiTypography>
                    </VuiButton>
                  </FormControl>
                  <VuiButton variant="contained" color="info" sx={{ '&:hover': { backgroundColor: 'green'
                    }, width: "50%", height: "3.2rem", borderRadius: "2rem", padding: '1rem' }}
                    onClick={() => {
                      useContent(testData)
                      ContentStore.fetchData(testData)
                    }}>
                    <BsPencil size="20px" color="inherit" />
                    <VuiTypography variant="lg" color="light" m='1rem'>
                      Testing
                    </VuiTypography>
                  </VuiButton>

                  {/* <VuiButton variant="contained" color="info" sx={{ '&:hover': { backgroundColor: 'green'
                    }, width: "50%", height: "3.2rem", borderRadius: "2rem", padding: '1rem' }}
                    href="/dashboard">
                    <BsArrowRepeat size="20px" color="inherit" />
                    <VuiTypography variant="lg" color="light" m='1rem'>
                      Resume Learning
                    </VuiTypography>
                  </VuiButton> */}
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
