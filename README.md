# Digitize

![alt text](./images/logoicon.png)

<hr>
<h2>Table of Contents</h2>
<ul>
  <li><a href="#built-with--">Built With</a></li>
  <li><a href="#getting-started">Getting Started</a></li>
  <li><a href="#Description">Description</a></li>
  <li><a href="#Documentation">Documentation</a></li>
  <li><a href="#Screenshots">Screenshots</a></li>
  <li><a href="#Contributors">Contributors</a></li>
</ul>

<hr>
<h2 href="#BuiltWith">Built With : </h2>
 <ul>
  <li><a href="https://www.w3schools.com/nodejs/">Node js</a></li>
  <li><a href="https://www.javatpoint.com/expressjs-tutorial">Express js</a></li>
  <li><a href="https://www.w3schools.in/mongodb/tutorials/">MongoDB</a></li>
  <li><a href="http://www.w3schools.me/aspnetcore/implement-jwt">JSON Web Token</a></li>
  <li><a href="https://www.w3schools.com/REACT/DEFAULT.ASP">React js</a></li>
  <li><a href="https://redux.js.org/">Redux</a></li>
  <li><a href="https://mui.com/material-ui/getting-started/templates/">Material UI</a></li>
 </ul>

<hr>
<h2 href="#GettingStarted">Getting Started</h2>
<blockquote>
  <p>This is a list of needed instructions to set up your project locally, to get a local copy up and running follow these instructions.
 </p>
</blockquote>
<ol>
<li>
  <h4>Clone the repository.</h4>
 </li>
 <li>
  <h4>cd into backend folder and create a file named "config.env" and fill it with this fields with your information. <h4>  <br> <blockquote><code> <p> NODE_ENV=development <br>
PORT=[PORT YOU WANT] <br>
DATABASE=[CONNECTION STRING OF YOUR DATABASE] <br>
USER=[DATABASE USER NAME] <br>
DATABASE_PASSWORD=[YOUR DATABASE PASSWORD] <br>
JWT_SECRET=[YOUR JWT SECRET STRING] <br>
JWT_EXPIRES_IN=[DATE example: 1d "for one day"] <br>
JWT_COOKIE_EXPIRES_IN=[Date example: 1 "for one day"] <br>
FILEPATH=https://sites.digitize.org/api # For returning photos in rows data <br>
EMAIL_USERNAME=[EMAIL USERNAME TO SEND MAILS] <br>
EMAIL_PASSWORD=[YOUR EMAIL APP PASSWORD] <br>
EMAIL_FROM=[EMAIL USERNAME TO SEND MAILS] <br>
</p> </code></blockquote>
 </li>
 <li>
  <h4>Follow this article to install node js and npm <a href="https://phoenixnap.com/kb/install-node-js-npm-on-windows">Install Node js and npm</a></h4>
 </li>
 <li>
  <h4><code>cd backend && npm i && npm start</code></h4>
 </li>
 <li>
  <h4><code>cd .. && cd frontend && npm i && npm start</code></h4>
 </li>
 </ol>

<hr>
<h2 href="#Description">Description</h2>
  <p>
  This project was made for <a href="https://digitize.org/">Digitize</a> company.
  <br>
  <br>
Website is in Arabic Language.
<br>
<br>
It is a website that has 2 kinds  of users: 
<ol>
<li>Supervisor, </li>
<li>Website Admin.</li>
</ol>
 Each user has different pages to view. 
 <br>
 <strong>First: Supervisor:</strong>
 <br>
<ol>
<li>First, he logs in with his email and password that the website admin gave it to him.</li>
<li>He can go to the default URL of the  website to submit a survey in which he enters the data in multi steps sequence.</li>  
Required  data:  
<ol>
<li>Choose a Project Code.</li>
<li>Choose a Site Name from list of site names of this project.</li>
<li>Manually enter a Capinet Serial.</li>
<li>Choose an Activity Group Name. </li>
<li>Day Progress & select many squares from project map to mark  them as complete or attach a photo.</li> 
<li>Choose a Delivery Way.</li>
<li>Choose a Delivery Team Name.</li>
<li>Choose a Site Engineer.</li>
<li>Choose a Site Supervisor (Main).</li>
<li>Choose a Site Supervisor  (Assistant).</li></ol></li>
</ol>

<strong>Second: Website  Admin:</strong>
<br>

<ol> 
<li>First, he logs in with his email and password, and will be authorized as an admin, so he can see a different page.</li>
<li>He can ask for data, he can  export and download all data that the supervisors added  as an  excel file,  or select a certain project to just  export the data of this project.</li>
<li>
He can have another tab to create a supervisor account, he enters a new  name, email, and password for the new supervisor, then submits and gives  these information to the supervisor.</li>
<li>
He have another  tabs for:
<ol>
<li>Create/  Delete project/s.</li>
<li>Create/  Delete site  name/s of a  certain project.</li>
<li>Create/  Delete activity group/s.</li>
<li>Create/  Delete activity type/s. </li>
<li>Create/  Delete site  engineer/s.</li>
<li>Create/  Delete site  supervisor  (main).</li>
<li>Create/  Delete site  supervisor  (assistant).</li>
<li>Create/  Delete delivery way/s.</li>
<li>Create/  Delete delivery team/s.</li>
<li>Upload a project map. </li>
</ol>
</li>
</ol>
 </p>
<hr>
<h2 href="#Documentation">Documentation</h2>
  <p>
  You can look on the API documentation at <a href="https://documenter.getpostman.com/view/22736405/2s93mAVL7z">API Documentation</a>
  </p>

<hr>
<h2 href="#Screenshots">Screenshots</h2>
<ol>
    <li>
    <img src="./images/1.png">
    </li>
    <li>
    <img src="./images/2.png">
    </li>
    <li>
    <img src="./images/3.png">
    </li>
    <li>
    <img src="./images/4.png">
    </li>
    <li>
    <img src="./images/5.png">
    </li>
    <li>
    <img src="./images/6.png">
    </li>
    <li>
    <img src="./images/7.png">
    </li>
    <li>
    <img src="./images/8.png">
    </li>
    <li>
    <img src="./images/9.png">
    </li>
    <li>
    <img src="./images/10.png">
    </li>
    <li>
    <img src="./images/11.png">
    </li>
    <li>
    <img src="./images/12.png">
    </li>
    <li>
    <img src="./images/13.png">
    </li>
    <li>
    <img src="./images/14.png">
    </li>
    <li>
    <img src="./images/15.png">
    </li>
    <li>
    <img src="./images/16.png">
    </li>
    <li>
    <img src="./images/17.png">
    </li>
    <li>
    <img src="./images/18.png">
    </li>
    <li>
    <img src="./images/19.png">
    </li>
    <li>
    <img src="./images/20.png">
    </li>
    <li>
    <img src="./images/21.png">
    </li>
    <li>
    <img src="./images/22.png">
    </li>
    <li>
    <img src="./images/23.png">
    </li>
    <li>
    <img src="./images/24.png">
    </li>
    <li>
    <img src="./images/25.png">
    </li>
</ol>

<hr>
<h2 href="#Contributors">Contributors</h2>
<h3>Frontend & DevOps</h3>
<table> 
  <tbody>
    <tr>
      <td align="center">
        <img src="https://avatars.githubusercontent.com/u/70758177?v=4" alt="Yousef Khaled" width="150px">
        <br>
        <a href="https://github.com/Waer1">Yousef Khaled</a>
      </td>
    </tr>
  </tbody>
</table>
<h3>Backend</h3>
<table> 
  <tbody>
    <tr>
      <td align="center">
        <img src="https://avatars.githubusercontent.com/u/87096647?v=4" alt="Moaz Mohammed" width="150px">
        <br>
        <a href="https://github.com/MoazHassan2022">Moaz Mohammed</a>
      </td>
    </tr>
  </tbody>
</table>
