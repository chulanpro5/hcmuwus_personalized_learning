import { ListItem } from '@mui/material';
import { colorChannel } from '@mui/system';
import VuiBox from 'components/VuiBox';
import VuiTypography from 'components/VuiTypography';
import { useState, useEffect } from 'react';
import { PopupComments } from "./PopupComments";


export const ParagraphComponent = (props) => {
    const [pColor, setPColor] = useState('#8dadf7');

    return (
        <VuiBox
            height="auto"
            bgColor="light"
            borderRadius={10}
            // onClick={() => console.log("Clicked")}
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
            // onMouseOver={(event) => {
            //     setPColor('#8dadf7');
            //     event.stopPropagation();
            // }}
        >   <VuiTypography >
                {
                    props.paragraph.map((sentence, index) => (
                        <PopupComments text={sentence} index={index} triggerButton={(<VuiTypography display="inline" onMouseOver={(event) => {
                            //event.stopPropagation();
                            setPColor('light');
                        }} 
                            sx={{
                                '&:hover': {
                                    backgroundColor: '#8dadf7',
                                    borderRadius: 5
                                }
                            }}
                            >
                            {sentence + ". "}
                        </VuiTypography>)} />))
                }
            </VuiTypography>
        </VuiBox>
    )
}