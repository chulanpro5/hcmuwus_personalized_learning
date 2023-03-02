const { default: VuiBox } = require("components/VuiBox")
const { useState } = require("react")
import VuiTypography from 'components/VuiTypography';
import { Grid } from '@mui/material';
import { List, ListItem } from '@mui/material';
export const Folder = (props) => {
    const [opened, setOpen] = useState(false);
    const [color, setColor] = useState('light');
    return (
        <Grid columns={1} width={props.width} container={true} pt={1}>
            <VuiBox display='inline' width="100%" bgColor="light" onMouseOver={() => {
                setColor('#8dadf7');
            }}
                onMouseLeave={() => setColor('light')}
                sx={{
                    backgroundColor: color,
                    paddingLeft: 1,
                    borderRadius:5,
                    paddingBottom: 1
                }}
                onClick={() => {
                    setOpen(!opened);
                }}
            >
                <VuiTypography variant='lg' sx={{ fontSize: 13, padding: 1 }}>{(props.name.length > 14) ? props.name.substr(0, 10) + "..." : props.name}</VuiTypography>
            </VuiBox>
            {opened && (
                <List>
                    {props.books.map(book => <ListItem><VuiTypography variant="lg" sx={{ fontSize: 10, paddingLeft: 2, margin: 1 }}>{book}</VuiTypography></ListItem>)}
                </List>
            )}
        </Grid>
    )
}