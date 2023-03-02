import { Grid, List } from "@mui/material";
import { ParagraphComponent } from "./ParagraphComponent";

export const DocumentGenerator = (props) => {
    return (
        <Grid sx={{ overflowY: "scroll", overflowX: "hidden", height: "100%" }} >
            <List>
                {props.document.map(paragraph => 
                    <ParagraphComponent paragraph={paragraph} />   
                )}
            </List>
        </Grid>
    );
}