const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
    res.json({
        message: "Hello world",
    });
});

app.post("/api/wiki_retrieve", (req, res) => {
    fetch("ashgfhjfsad", {
        method: 'POST',
        body: JSON.stringify(req.data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
    })
    .then(data => res.end(data.body.json()))
    .catch(err => res.status(500))
})

app.post("/api/user_interact", (req, res) => {
    fetch("ashgfhjfsad", {
        method: 'POST',
        body: JSON.stringify(req.data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
    })
    .then(data => res.end(data.body.json()))
    .catch(err => res.status(500))
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});