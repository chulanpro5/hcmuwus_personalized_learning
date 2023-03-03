import VuiBox from "components/VuiBox"
import VuiTypography from "components/VuiTypography"
import { Grid } from "@mui/material";
import { Divider } from "@mui/material";
import { HiOutlineTrash } from 'react-icons/hi';
import { MdOutlineModeEditOutline } from 'react-icons/md';
export const NoteSection = (props) => {
    
    return (
        <Grid columns={1} width='15rem' height='45rem' style={{ backgroundColor: props.backgroundColor, margin: '1.5rem', borderRadius: '2rem', padding: '1rem' }}>
            <VuiBox width='13rem' height='3rem' style={{ backgroundColor: props.titleColor, borderRadius: '1.5rem' }}>
                <VuiTypography variant='h2' style={{ fontSize: '1.5rem', paddingTop: '0.4rem', paddingLeft: '2.6rem' }}>{props.title}</VuiTypography>
            </VuiBox>
            <Divider light />
            {props.books.map((book) => <VuiBox width='13rem' height='1.9rem' marginTop='1rem' style={{ backgroundColor: props.titleColor, borderRadius: '1.5rem', paddingBottom: '1.5rem' }}>
                <VuiTypography variant='lg' style={{ fontSize: '1rem', paddingLeft: '0.8rem', marginRight: 0 }}>{book}</VuiTypography>
                <HiOutlineTrash color="black" style={{ marginLeft: '6rem' }} onClick={(event) => {

                }} />
                <MdOutlineModeEditOutline color="black" style={{ marginLeft: "0.1rem" }} onClick={(event) => {

                }} />
            </VuiBox>)}
        </Grid>
    )
}