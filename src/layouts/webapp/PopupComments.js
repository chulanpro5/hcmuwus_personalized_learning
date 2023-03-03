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
    const [feedback, setFeedback] = useState(false);
    const [clicked, setClicked] = useState(false);
    
    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    const handleFeedback = (command) => {
        if (command !== "Explain more about this" && command !== "Show me the references") return;

        axios({
            method: 'post',
            url: "http://localhost:4000/api/user_interact/",
            data: {
                sentence: props.text,
                prompt: command
            }
        })
            .then(res => ContentStore.updateContent(JSON.parse(res.data.payload), props.index))
            .catch(err => console.log(err))
    }
    return (
        <Popup
            trigger={props.triggerButton}
            modal
            nested
        >
            {close => (
                <VuiBox py={3} marginBottom='1rem' bgColor="#66C4E8" paddingTop='1rem' width='30rem' height='30rem' borderRadius='2rem'>
                    <VuiBox variant="button" onClick={() => close()} bgColor="#E6F2F7" sx={{
                        color: "black", '&:hover': {
                            backgroundColor: 'darkred',
                        },
                        marginLeft: '20rem',
                        marginTop: '0.5rem',
                        padding: '0.1rem',
                        borderRadius: 20,
                    }} borderRadius={15} end width="30%">
                        <VuiTypography padding='3rem' variant="lg">Close</VuiTypography>
                    </VuiBox>
                    <VuiBox m='0.8rem' sx={{ alignContent: 'justify', borderRadius: '1rem' }} p='auto' height='16rem'>
                        <VuiTypography variant="xs" mx={2} sx={{ alignContent: 'justify' }} display='inline'>
                            {props.text.slice(0, 300) + (props.text.length <= 300 ? "." : "...")}
                        </VuiTypography>
                    </VuiBox>
                    <VuiBox sx={{ overflowX: "hidden", margin: '0.8rem', padding: '0.3rem' }} display="flex" flexDirection="column" gap={2}>
                        <VuiButton color="info" width="100%" sx={{ borderRadius: '2rem', '&:hover': { backgroundColor: 'green' } }} onClick={() => {
                            handleFeedback("Explain more about this");
                            setClicked(true);
                            
                        }} disabled={clicked}>
                            <VuiTypography variant='lg' color='light'>Explain more about this</VuiTypography>
                        </VuiButton>
                        <VuiButton color="info" width="100%" sx={{ borderRadius: '2rem', '&:hover': { backgroundColor: 'green' } }} onClick={() => {
                            handleFeedback("Show me the references");
                            setClicked(true);
                            
                        }} disabled={clicked}>
                            <VuiTypography variant='lg' color='light'>Show me the references</VuiTypography>
                        </VuiButton>
                    </VuiBox>
                </VuiBox>
            )}
        </Popup>
    )
}