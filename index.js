/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const express = require("express");
const msal = require('@azure/msal-node');
const { urlencoded } = require("express");

const SERVER_PORT = 8080;

// Before running the sample, you will need to replace the values in the config, 
// including the clientSecret
const config = {
    auth: {
        clientId: "8981ef68-7c59-42c5-90ba-398006130d1d",
        authority: "https://login.microsoftonline.com/ae6627ad-4b20-466d-821c-fd9ee7a25a55",
        clientSecret: "vnML~DoB91W8x.Vl.zk.23B~etdI_603yX"
    },
    system: {
        loggerOptions: {
            loggerCallback(loglevel, message, containsPii) {
                console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: msal.LogLevel.Verbose,
        }
    }
};

// Create msal application object
const pca = new msal.ConfidentialClientApplication(config);

// Create Express App and Routes
const app = express();

app.get('/', (req, res) => {
    const authCodeUrlParameters = {
        scopes: ["User.Read.All"],
        redirectUri: "https://msal-authentication-dot-buma-pdm-image-recognition.et.r.appspot.com/callback",
    };

    // get url to sign user in and consent to scopes needed for application
    pca.getAuthCodeUrl(authCodeUrlParameters).then((response) => {
        res.redirect(response);
    }).catch((error) => console.log(JSON.stringify(error)));
});

app.get('/callback', (req, res) => {
    const tokenRequest = {
        code: req.query.code,
        scopes: ["User.Read.All"],
        redirectUri: "https://msal-authentication-dot-buma-pdm-image-recognition.et.r.appspot.com/callback",
    };

    pca.acquireTokenByCode(tokenRequest).then((response) => {

        console.log("\nResponse: \n:", response);
        response = JSON.stringify(response);
        var html = "<HTML><BODY><DIV style='display: none' id='code'>" + response + "</DIV></BODY><SCRIPT>var code = document.getElementById('code').innerHTML; window.ReactNativeWebView.postMessage(code);</SCRIPT></HTML>"
        res.send(html);
        //res.sendStatus(200);
    }).catch((error) => {
        console.log("error")
        console.log(error);
        res.status(500).send(error);
    });
});

app.get('/logout', (req, res) => {
    var html = "<HTML><BODY><DIV id='code' style='display: none'>done</DIV></BODY><SCRIPT>var code = document.getElementById('code').innerHTML; window.ReactNativeWebView.postMessage(code);</SCRIPT></HTML>"
    res.send(html);  
});


app.listen(SERVER_PORT, () => console.log(`Msal Node Auth Code Sample app listening on port ${SERVER_PORT}!`))
