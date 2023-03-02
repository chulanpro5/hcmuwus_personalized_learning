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

app.post("/api/wiki_retrieve/", (req, res) => {
    fetch("https://c059-113-22-113-75.ap.ngrok.io/api/wiki_retrieve/", {
        method: 'POST',
        body: JSON.stringify(req.body),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
    })
    .then(response => response.json(), err => res.status(500))
    .then(data => console.log(data), res.end(data))
})

app.post("/api/user_interact/", (req, res) => {
    fetch("tcp://0.tcp.ap.ngrok.io:17530/api/use", {
        method: 'POST',
        body: JSON.stringify(req.body),
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