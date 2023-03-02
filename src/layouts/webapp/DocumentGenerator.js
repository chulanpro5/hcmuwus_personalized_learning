import { Grid, List } from "@mui/material";
import { ParagraphComponent } from "./ParagraphComponent";
import { observable } from "mobx";
import { observer } from "mobx-react";

export const DocumentGenerator = observer((props) => {
    return (
        <Grid sx={{ overflowY: "scroll", overflowX: "hidden", height: "100%" }} >
            <List>
                {props.document.map(paragraph => 
                    <ParagraphComponent paragraph={paragraph} />   
                )}
            </List>
        </Grid>
    );
})