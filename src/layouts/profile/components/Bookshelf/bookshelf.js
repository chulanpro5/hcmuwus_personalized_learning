import React from 'react';
import { Card, Hidden, Icon } from "@mui/material";
import welcome from "assets/images/welcome-profile.png";
import VuiTypography from "components/VuiTypography/index";
import VuiBox from "components/VuiBox/index";
import './bookshelf.css';
import BookItem from "components/ComplexGrid/ComplexGrid";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { observer } from 'mobx-react-lite';
import CompletionProgressStore from 'stores/CompletionProgressStore';
const books = [
    {
        title: "The Alchemist",
        progress: 10,
    },
    {
        title: "Harry Potter",
        progress: 20,
    },
    {
        title: "The Alchemist",
        progress: 10,
    },
    {
        title: "Harry Potter",
        progress: 20,
    },
    {
        title: "The Alchemist",
        progress: 10,
    },
    {
        title: "Harry Potter",
        progress: 20,
    },
    {
        title: "The Alchemist",
        progress: 10,
    },
    {
        title: "Harry Potter",
        progress: 20,
    },
]

function MyBookshelf() {
    const store = new CompletionProgressStore();
    books.forEach(book => store.addBook(book));
    return (
    <Paper sx={{width: 500, height: 780, borderRadius: 10, marginTop:5}}>      
        <VuiTypography color="black" variant="h3" fontWeight="bold" margin={5} marginBottom={1} overflowX="hidden" marginLeft={6}>
            Completion Progress
        </VuiTypography>
        <Grid sx={{width: 500, height: 650, padding:4, marginTop:0, paddingTop:0,overflowY:"scroll",overflowX:"hidden"}} >
            {books.map((book) => (
            <BookItem title={book.title} progress={book.progress} />
            ))} 
        </Grid>
    </Paper>
);
}

export default observer(MyBookshelf);

