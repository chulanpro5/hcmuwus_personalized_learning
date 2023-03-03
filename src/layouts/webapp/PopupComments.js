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
import LoadingSpin from "react-loading-spin";
import CloseIcon from '@mui/icons-material/Close';


export const PopupComments = (props) => {
    const colors = ["#E6F2F7", "#007EAE"];
    //const [commands, setCommands] = useState(["Explain more about this", "Show me the references"]);
    const [reference, setReference] = useState(null);
    const [explain, setExplain] = useState(false);

    function delay(time)
    {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    const handleExplain = () =>
    {
        //if (command!=="Explain more about this" && command!=="Show me the references") return;
        setExplain(true)
        axios({
            method: 'post',
            url: "https://9437-113-22-113-75.ap.ngrok.io/api/user_interact/",
            data: {
                sentence: props.text,
                prompt: "Explain more about this"
            }
        })
            .then(res => {
                ContentStore.updateContent(JSON.parse(res.data.payload), props.index)
                setExplain(false)})
            .catch(err => {
                console.log(err)
                setExplain(false)
            })
        //console.log(props.index)
    }
    const handleReference = () =>
    {
        axios({
            method: 'post',
            url: "https://9437-113-22-113-75.ap.ngrok.io/api/user_interact/",
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
                <VuiBox py={3} marginBottom={5} bgColor="#fff" sx={{ zIndex: 8 }} p={2} width={500} borderRadius={20}>
                    <VuiBox width="100%" display="flex" justifyContent="flex-end" alignItems="center" gap={1}>
                        {explain && <LoadingSpin size="3rem"/>}
                        <VuiButton color="error" onClick={() => close()}  mx={1} disabled={explain} style={{ borderRadius: '50rem', }}>
                            <CloseIcon />
                        </VuiButton>
                    </VuiBox>
                    <VuiBox sx={{ overflowX: "hidden"}} display="flex" flexDirection="column" gap={2}>
                        <VuiTypography variant="overline" m={2} style={{fontSize: '1rem'}}>
                            {props.text}
                        </VuiTypography>
                        <VuiButton color="info" width="100%" onClick={handleExplain} disabled={explain}>
                            Explain more about this
                        </VuiButton>
                        <VuiButton color="info" width="100%" onClick={handleReference} disabled={explain}>
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