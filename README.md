# Bookstore 
#### Bookstore Frontend/Backend for CSE3330
#### Created by: [Jake Nissley](https://github.com/jakenissley), [Luke Hardin](https://github.com/lhardin491), and [Andrew Hernandez](https://github.com/dreamlap)
-------------------------------------------------------------------------------------------------------------------------------------------
| Table of Contents               |
|---------------------------------|
| 1. [Introduction](#intro)       |
| 2. [Framework](#information)    |
| 3. [Instructions](#instructions)|

## Introduction <a name="intro"></a>
A frontend/backend web interface designed for a project in CSE330 - Databases. This is designed for a
hypothetical bookstore with the ability to keep track of items, customers, staff, sales, and other needs.

## Framework <a name="information"></a>
* [jQuery](https://jquery.com/)
* [MySQL](https://www.mysql.com/)
* [Bootstrap](https://getbootstrap.com/)
* [node.js](https://nodejs.org/en/)
* [DataTables](https://datatables.net/)

## Instructions <a name="instructions"></a>
To run the program please make sure you have node.js installed and some sort of SQL server (preferably MAMP). 
1. First start up your SQL server and create a database 'BOOKSTORE', then import the database information from 'bookstore.sql' located 
in the main diretory
2. Using node.js, make sure you are in the '/bookstore' directory and run the command: 
```
node ./server.js
```
3. Once all of the backend is up and running, go ahead and open the home.html file with any web browser located in the '/bookstore' 
directory and everything should be running!
