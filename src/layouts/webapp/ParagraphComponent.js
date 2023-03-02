import { ListItem } from '@mui/material';
import { colorChannel } from '@mui/system';
import VuiBox from 'components/VuiBox';
import VuiTypography from 'components/VuiTypography';
import { useState, useEffect } from 'react';
import { PopupComments } from "./PopupComments";

export const ParagraphComponent = (props) => {
    const [pColor, setPColor] = useState('#8dadf7');


    return (
        <PopupComments triggerButton={(<ListItem p={3}
            height="auto"
            bgColor="light"
            borderRadius={10}
            variant="button"
            sx={{
                '&:hover': {
                    backgroundColor: pColor,
                },
                marginBottom: 2,
                marginTop: 2,
                marginLeft: 0,
                marginRight: 3,
                padding: 1
            }}
            onMouseOver={(event) => {
                setPColor('#8dadf7');
                event.stopPropagation();
            }}
        >   <VuiTypography >
                {
                    props.paragraph.map(sentence => (
                        <PopupComments triggerButton={(<VuiTypography display="inline" onMouseOver={(event) => {
                            event.stopPropagation();
                            setPColor('light');
                        }} onClick={(event) => { event.stopPropagation(); }}
                            sx={{
                                '&:hover': {
                                    backgroundColor: '#8dadf7',
                                    borderRadius: 5
                                }
                            }}>
                            {sentence + ". "}
                        </VuiTypography>)} />))
                }
            </VuiTypography>
        </ListItem>)} />
    )
}