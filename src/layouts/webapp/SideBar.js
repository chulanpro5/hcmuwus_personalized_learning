import { Grid } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiButton from "components/VuiButton";
import { MdFolder } from "react-icons/md";
import VuiTypography from "components/VuiTypography";
import { Folder } from './Folder';
import { useState } from "react";
export const SideBar = (props) => {
    const [opened, setOpen] = useState(false);
    return (
        <Grid item xs={12} lg={1.75} maxHeight='47.5rem'>
            <VuiBox bgColor="#CCEBF7" height="100%" width="100%" borderRadius="lg" p={1} pt={3} >
                <VuiBox display="flex"
                    justifyContent="top"
                    alignItems="center"
                    height="5%"
                    flexDirection="column"
                    px="25%"
                    bgColor="light"
                    marginTop={-2}>
                    <VuiButton variant="contained" color="info" padding='0.5rem' sx={{'&:hover': {
                        backgroundColor: 'green'
                    }}}onClick={() => setOpen(!opened)}>
                        <MdFolder size="15px" color="inherit" />
                        <VuiTypography variant="lg" color="light" mx={1} >
                            Directory
                        </VuiTypography>
                    </VuiButton>
                </VuiBox>
                {opened && ( <VuiBox sx={{ overflowY: "scroll", overflowX: "hidden" }} height="95%">
                    {props.folders.map(folder => <Folder name={folder.name} books={folder.books} />)}
                </VuiBox>)}
            </VuiBox>
        </Grid>
    )
}