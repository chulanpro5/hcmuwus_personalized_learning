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
        title: "To Kill a Mockingbird",
        progress: 50,
    },
    {
        title: "One Hundred Years of Solitude",
        progress: 54,
    },
    {
        title: "A Passage to India",
        progress: 100,
    },
    {
        title: "Invisible Man",
        progress: 5,
    },
    {
        title: "Beloved",
        progress: 88,
    },
    {
        title: "Things Fall Apart",
        progress: 99,
    },
]

function MyBookshelf() {
    const store = new CompletionProgressStore();
    books.forEach(book => store.addBook(book));
    return (
        <Paper sx={{ width: 500, height: 780, borderRadius: 10, marginTop: 5 }}>
            <VuiTypography color="black" variant="lg" sx={{ fontSize: 30, fontWeight:"bold", marginLeft: 13, marginBottom: 1 }} overflowX="hidden">
                Completion Progress
            </VuiTypography>
            <Grid sx={{ width: 500, height: 690, padding: 4, marginTop: 0, paddingTop: 0, overflowY: "scroll", overflowX: "hidden" }} >
                {books.map((book) => (
                    <BookItem title={book.title} progress={book.progress} />
                ))}
            </Grid>
        </Paper>
    );
}

export default observer(MyBookshelf);

