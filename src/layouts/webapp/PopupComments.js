import { Grid, Paper, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import VuiBox from 'components/VuiBox';
import VuiButton from 'components/VuiButton';
import { List } from '@mui/material';
import { ListItem } from '@mui/material';
import VuiTypography from 'components/VuiTypography';
import { IoIosSend } from 'react-icons/io';
export const PopupComments = (props) => {
    const colors = ["#E6F2F7", "#007EAE"];
    const [commands, setCommands] = useState(["Explan more about this", "Summarize this paragraph"]);
    const [feedback, setFeedback] = useState('');

    const handleFeedback = (e) => {
        
    }
    return (
        <Popup
            trigger={props.triggerButton}
            modal
            nested
        >
            {close => (
                <VuiBox py={3} height={330} marginBottom={5} bgColor="#66C4E8" sx={{ zIndex: 8 }} paddingTop={1} width={500} borderRadius={20}>
                    <VuiBox variant="button" onClick={() => close()} bgColor="#E6F2F7" sx={{
                        color: "black", '&:hover': {
                            backgroundColor: 'red',
                        },
                        pt: 0,
                        pb: 0,
                        paddingLeft: 5,
                        marginLeft: 41.5,
                        marginBottom: 2,
                        marginTop: 0.5,
                        borderRadius: 20,
                    }} borderRadius={15} end width="30%">
                        <VuiTypography padding={1} variant="lg">Close</VuiTypography>
                    </VuiBox>
                    <Grid sx={{ overflowX: "hidden", height: "61%", margin: 1, padding: 1 }} >
                        <List>
                            {commands.map((command, index) => (<ListItem p={3}
                                height="auto"
                                variant="button"
                                onClick={() => console.log("Clicked")}
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
                        </List>
                    </Grid>
                    <VuiBox margin={2} mt={5} height="35%" >
                        <TextField borderRadius={20} sx={{ width: "80%", borderRadius: 30 , marginBottom: 5}} fullWidth={true} onChange={(e) => setFeedback(e.target.value)}></TextField>
                        <VuiButton sx={{
                            borderRadius: 20, marginLeft: 0.5, width: "19%", height: 20, backgroundColor: "white"
                        }}
                            onClick={handleFeedback}
                        >
                            <VuiTypography variant="lg">Send</VuiTypography>
                        </VuiButton>
                    </VuiBox>
                </VuiBox>
            )}
        </Popup>
    )
}