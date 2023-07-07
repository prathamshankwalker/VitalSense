
# THE GREAT HACK - Techfluence Hackathon

## Problem Statement

How can we utilize wearable devices and sensors to monitor health indicators like heart rate, blood pressure, and glucose levels, and notify users or caregivers of any abnormalities or emergencies?

### 🔗 Content

- [Problem Statement](#problem-statement)
- [Content](#-content)
- [Team](#-team)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [API Reference](#-api-reference)
- [Environment Variables](#-environment-variables)
- [Run Locally](#-run-locally)
- [Documentation](#-documentation)
- [Screen-Shots](#-screen-shots)

### 👨‍👦‍👦 Team

- `Atharva Parkhe` -  *Python* -   [LinkedIn](https://www.linkedin.com/in/atharva-parkhe-3283b2202/), [GitHub](https://github.com/atharvparkhe), [Instagram](https://www.instagram.com/atharvparkhe/) - Backend Developer

- `Madem Greeshma` -  *JavaScript* - [LinkedIn](https://www.linkedin.com/in/m-greeshma/), [GitHub](https://github.com/Greeshma2903), [Instagram](https://www.instagram.com/prathamshankwalker/)  -  Frontend Developer

- `Pratham Shankhwalker` -  *Python* - [LinkedIn](https://www.linkedin.com/in/pratham-shankwalker-ab2899205/), [GitHub](https://github.com/prathamshankwalker), [Instagram](https://www.instagram.com/prathamshankwalker/)  -  Machine Learning (ML) Developer


### 📋 Features

<!-- - **Resource Projection :** The admin should be able to add hrs for Resources wrt to project - So each resource will have multiple projects assigned to them in a particular week and that will have the hrs - There should be a tracking of which admin has made which changes in the system.

- **Leave Management :** Here the admin should be able to add leaves (half or full day) or holiday for the resources on a day to day basis - Once a leave is marked the capacity of the member should be reduced accordingly - There should be an interface where the admin can visualise the entire team's availability. -->


### 🧰 Tech Stack

- **`BACKEND`** : Django

- **`DATABASE`** : MySQL

- **`FRONTEND`** : React JS

- **`Machine Learning`** : Pandas, Numpy, Tensorflow, Keras, Scikit-Learn


### 🛠 API Reference

- **Endpoints Import Link (POSTMAN)** : https://api.postman.com/collections/21176723-76879caa-3831-4283-83b2-660ba8ae0aef?access_key=PMAT-01GRXDT6WTN828QXB6MHR7GRV8

- **Endpoints Import JSON file** : [here](docs/endpoints.json)


### 🔐 Environment Variables

To run this project, you will need to add the following environment variables to your **.env** file

- `SECRET_KEY`  -  Secret Key for Backend

- `JWT_KEY`  -  JWT Authentication Key

- `EMAIL_HOST_USER`  -  Email ID

- `EMAIL_HOST_PASSWORD`  -  Email Password

- `SOCIAL_SECRET`  -  Default Password for Social Auth

- `GOOGLE_CLIENT_ID`  -  Google Client ID

- `GOOGLE_CLIENT_SECRET`  -  Google Client Secret

- `TWILIO_ACCOUNT_SID`  -  Twilio Account SID

- `TWILIO_AUTH_TOKEN`  -  Twilio Auth Token

<!-- ![ENV file](docs/env.png) -->


### 💻 Run Locally

***Step#1 : Clone Project Repository***

```bash
git clone https://github.com/Intensa-Council-GEC/Team-Delta.git
```
***Step#2 : Go to Project Directory***

```bash
cd Team-Delta
```

***Step#3 : Run Backend Server***

```bash
cd backend
```
- If *virtualenv* is not istalled :
```bash
pip install virtualenv && virtualenv env
```

- Turn On Virtual Environment

- **In Windows :**
```bash
    env/Scripts/activate
```
- **In Linux or MacOS :**
```bash
    source env/bin/activate
```

- Install Dependencies

```bash
pip install --upgrade pip -r requirements.txt
```

- Runserver

```bash
python manage.py runserver
```

***Step#4 : Run Frontend Server***

```bash
cd frontend
```
- Install Dependencies
```bash
npm install
```
- Runserver
```bash
npm run dev
```

*Check the terminal if any error.*

***Step#6 : Open Browser***

- Open `http://127.0.0.1:5173/` or `http://localhost:5173/` on your browser.


### 📄 Documentation

[DOC](Docs/project-report.pdf)
