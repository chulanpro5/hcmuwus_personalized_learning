import { ListItem } from '@mui/material';
import VuiBox from 'components/VuiBox';
import VuiTypography from 'components/VuiTypography';
import {useState, useEffect} from 'react';
import { PopupComments } from "./PopupComments";


export const ParagraphComponent = (props) => {
    
    
    return (
        <PopupComments triggerButton={(<ListItem p={3}
            height="auto"
            bgColor="light"
            borderRadius={10}
            variant="button"
            // onClick={() => console.log("Clicked")}
            sx={{
                '&:hover': {
                    backgroundColor: '#8dadf7',
                  },
                marginBottom: 2,
                marginTop: 2,
                marginLeft: 0,
                marginRight: 3,
                padding: 1
            }}
            >
                {
                    props.paragraph.map(sentence => (
                        <span>
                            {sentence}
                        </span>
                    ))
                }
                
            </ListItem>)}/>
    )
}