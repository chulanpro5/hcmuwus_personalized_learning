
import VuiBox from 'components/VuiBox';
import VuiTypography from 'components/VuiTypography';
import { useState, useEffect } from 'react';
import { PopupComments } from "./PopupComments";
import { observer } from 'mobx-react';

export const ParagraphComponent = (props) => {
    const [pColor, setPColor] = useState('#8dadf7');

    return (
        <VuiBox
            height="auto"
            bgColor="light"
            sx={{
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
                                    backgroundColor: '#FDE584',
                                    borderRadius: 0
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