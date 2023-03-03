import { Grid, Paper, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import VuiBox from 'components/VuiBox';
import VuiButton from 'components/VuiButton';
import { List } from '@mui/material';
import { ListItem } from '@mui/material';
import VuiTypography from 'components/VuiTypography';
import { IoIosSend } from 'react-icons/io';
import axios from 'axios';
import ContentStore from "stores/ContentStore";


export const PopupComments = (props) => {
    const colors = ["#E6F2F7", "#007EAE"];
    //const [commands, setCommands] = useState(["Explain more about this", "Show me the references"]);
    const [reference, setReference] = useState(null);
    const [explaining, setExplaining] = useState(false);

    function delay(time)
    {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    const handleExplain = () =>
    {
        //if (command!=="Explain more about this" && command!=="Show me the references") return;

        axios({
            method: 'post',
            url: "https://689e-113-22-113-75.ap.ngrok.io/api/user_interact/",
            data: {
                sentence: props.text,
                prompt: "Explain more about this"
            }
        })
            .then(res => ContentStore.updateContent(JSON.parse(res.data.payload), props.index))
            .catch(err => console.log(err))
        console.log(ContentStore.getContent()[props.index])
        //console.log(props.index)
    }
    const handleReference = () =>
    {
        axios({
            method: 'post',
            url: "https://689e-113-22-113-75.ap.ngrok.io/api/user_interact/",
            data: {
                sentence: props.text,
                prompt: "Show me the references"
            }
        })
            .then(res => setReference(res.data.payload))
            .catch(err => console.log(err))
        //setReference(props.text)
    }
    return (
        <Popup
            trigger={props.triggerButton}
            modal
            nested
        >
            {close => (
                <VuiBox py={3} marginBottom={5} bgColor="#66C4E8" sx={{ zIndex: 8 }} p={2} width={500} borderRadius={20}>
                    <VuiBox width="100%" textAlign="right">
                        <VuiButton color="error" onClick={() => close()}>
                            Close
                        </VuiButton>
                    </VuiBox>
                    <VuiBox sx={{ overflowX: "hidden"}} display="flex" flexDirection="column" gap={2}>
                        <VuiTypography variant="overline" m={2}>
                            {props.text}
                        </VuiTypography>
                        <VuiButton color="info" width="100%" onClick={handleExplain}>
                            Explain more about this
                        </VuiButton>
                        <VuiButton color="info" width="100%" onClick={handleReference}>
                            Show me the references
                        </VuiButton>
                        {/* <List>
                            {commands.map((command, index) => (<ListItem p={3}
                                height="auto"
                                variant="button"
                                onClick={handleFeedback(command)}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: 'lightgreen',

                                    },
                                    backgroundColor: colors[index % 2],
                                    marginBottom: 2.5,
                                    marginTop: 0,
                                    marginLeft: 0,
                                    marginRight: 3,
                                    padding: 1,
                                    zIndex: 5,
                                    borderRadius: 20,
                                }}
                            >
                                <VuiTypography variant="lg" color={(index % 2 == 0) ? "black" : "white"} sx={{
                                    '&:hover': {

                                    },
                                    padding: 1
                                }}>
                                    {command}
                                </VuiTypography>
                            </ListItem>))}
                        </List> */}
                        <VuiTypography variant="caption" m={1}>
                            {reference}
                        </VuiTypography>
                    </VuiBox>
                </VuiBox>
            )}
        </Popup>
    )
}