const express = require('express');
const app = express();
const axios = require("axios");
const cheerio = require('cheerio');
const fs = require('file-saver')



const options = (ftype, ytid) => {
    return op = {
        method: 'GET',
        url: `https://api.vevioz.com/api/widget/${ftype}/${ytid}`,
        responseType: 'blob',
    }
};



const getLinks = (ftype, ytid) => {

    return new Promise((resolve, reject) => {
        if (ytid !== undefined) {
            axios.request(options(ftype, ytid))
                .then(function (response) {
                    link = []
                    console.log("Loading...")
                    const $ = cheerio.load(response.data);
                    bresponse = response.data
                    $('a')
                        .each(function () {
                            link.push(($(this).attr('href')))
                        });
                    resolve(link[0])

                }).catch(function (error) {
                    resolve(error);
                    console.log(error)
                });
        } else {
            resolve("No ID")
        }
    });

}

app.get('/', (req, res) => {
    res.send('https://v1tso.github.io/sdownloader/')
}
);


app.get('/api/:format/:id', (req, res) => {
    // Send to the user the format and id they chose
    if (req.params.id !== undefined) {
        ftype = req.params.format
        ytid = req.params.id
        const links = getLinks(ftype, ytid)
            .then((val) => {
                res.redirect(val)
                console.log("Done!")
            })
    }
}
);

app.listen(process.env.PORT || 8080, () => {
    console.log(`Example app listening on port ${process.env.PORT}!`);
}
);
