const express = require('express');
const app = express();
const axios = require("axios");
const cheerio = require('cheerio');
const fs = require('file-saver')

const options = (ftype, ytid) => {
    return {
        method: 'GET',
        url: `https://api.vevioz.com/api/widget/${ftype}/${ytid}`,
    }
};


app.get('/', (req, res) => {
    res.redirect('https://v1tso.github.io/sdownloader/')
}
);

app.get('/:id', (req, res) => {
    axios.request(options("merged", req.params.id))
        .then(function (response) {
            res.send(response.data);
        }).catch(function (error) {
            console.error(error);
        });
});


app.listen(process.env.PORT || 8080, () => {
    console.log(`Example app listening on port ${process.env.PORT}!`);
}
);
