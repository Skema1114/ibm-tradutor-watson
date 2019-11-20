const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const { IamAuthenticator } = require('ibm-watson/auth');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Busboy = require('busboy');
var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const languageTranslator = new LanguageTranslatorV3({
    authenticator: new IamAuthenticator({ apikey: 'sN4-2u6KfZ-gF0UcXu49pkcU9GCom9SISfG4NNv9-hDC' }),
    url: 'https://gateway.watsonplatform.net/language-translator/api/',
    version: '2019-11-18',
    disableSslVerification: true,
});

app.post('/traduzir', function (req, res, next) {
    console.log('Começou uma requisição');
    let busboy = new Busboy({ headers: req.headers });
    busboy.on('field', function (fieldname, val, fieldnameTruncated,
        valTruncated, encoding, mimetype) {
        languageTranslator.translate(
            {
                text: val,
                source: 'en',
                target: 'pt'
            })
            .then(response => {
                res.json(response.result);
            })
            .catch(err => {
                res.json(response.result);
            });
    });
    req.pipe(busboy);
});

app.listen(process.env.PORT || 8080, function () {
    console.log('CORS-enabled web server listening on port 8080');
});