import { Grid, List } from "@mui/material";
import { ParagraphComponent } from "./ParagraphComponent";
import { observable } from "mobx";
import { observer } from "mobx-react";

export const DocumentGenerator = observer((props) => {
    return (
        <Grid sx={{ overflowY: "scroll", overflowX: "hidden", height: "100%"}} >
            <List style={{marginRight: '1rem'}}>
                {props.document.map((paragraph, index) => 
                    <ParagraphComponent paragraph={paragraph} index={index}/>   
                )}
            </List>
        </Grid>
    );
})