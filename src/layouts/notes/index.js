import NotesStore from "stores/NotesStore";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useState } from "react"
import VuiBox from "components/VuiBox";
import { Grid } from "@mui/material";
import { NoteSection } from "./NoteSection";
const Notes = () => {
  const notes = NotesStore.getNotes();
  console.log(notes);

  return (
    <DashboardLayout>
      <VuiBox width='100%' height='50.5rem'>
        <Grid container columns={4} m='1rem' sx={({ breakpoints }) => ({
          [breakpoints.only('sm')]: {
            direction: 'column',
          },
          [breakpoints.up('md')]: {
            direction: 'row',
          }
        })}
        style={{alignItems: 'center'}}>
          <NoteSection backgroundColor="#C9C9C9" title='No status' titleColor='#EEEEEE' books={['Book 1', 'Book 2']}/>
          <NoteSection backgroundColor="#E5D9A5" title='In progress' titleColor='#FDEA9D' books={['Book 1', 'Book 2']}/>
          <NoteSection backgroundColor="#A5DAE5" title='Reviewing' titleColor='#9DEBFD' books={['Book 1', 'Book 2']}/>
          <NoteSection backgroundColor="#A5E5BF" title='Completed' titleColor='#9DFDC3' books={['Book 1', 'Book 2']}/>
        </Grid>
      </VuiBox>
    </DashboardLayout>
  );
}

export default Notes;
