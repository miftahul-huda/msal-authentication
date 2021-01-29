
## msal-authentication


This is the web flow for MS authentication used by BUMA Component Rating mobile application

**Prerequisite**

Install Node JS and NPM

**Download**

You can download using git:

    git clone https://github.com/miftahul-huda/msal-authentication.git

**Install**

Go to "msal-authentication" folder. Run:

    npm install

**Run Locally**

To run locally, just type in the console in the root folder of this application:
```
node app.js
```

**Deploy in App Engine**

To deploy to App Engine first you have to login first to GCP using command:

```
gcloud auth login
```

Make sure you logged in using username who can access the GCP environment.

After login, deploy the application in app engine:

```
gcloud app deploy
```
