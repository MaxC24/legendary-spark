## HUNGRY PETS

A small pet store.

`server` directory:

- hr_project: the project folder which includes the settings.py.
- frontend: django app that serves the index.html file when hitting the root url path.
- hungry_pets: django API app, takes care of every api endpoint.

`js` directory:

- app.js: entry point for the React application.
- src: React components, context and util files.

`styles`:

- Stylus css preprocessors files.

#### To run the app locally:

- Pull the repo from github.
- Create a virtual env in the repo folder for example: `virtualenv .` 
- run the following commands:

  `pip install -r requirements.txt`

  `python server/manage.py runserver`