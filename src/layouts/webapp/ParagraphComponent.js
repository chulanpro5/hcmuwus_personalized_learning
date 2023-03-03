
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
            sx={{
                marginBottom: '1rem',
                marginTop: '1rem',
                marginLeft: 0,
                marginRight: '1.5rem',
                paddingTop: '1rem',
                paddingLeft: '0.4rem'
            }}
        >   <VuiTypography>
                {
                    props.paragraph.map(sentence => (
                        <PopupComments text={sentence} index={props.index} triggerButton={(<VuiTypography display="inline" onMouseOver={(event) => {
                            //event.stopPropagation();
                            setPColor('light');
                        }} 
                            sx={{
                                '&:hover': {
                                    backgroundColor: '#8dadf7',
                                    borderRadius: 3
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