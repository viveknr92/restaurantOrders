# restaurantOrders

=================================================================================================
Improvizations during COVID-19 quarantine:

- Dockerized and Restructured with dockerfile's for frontend and backend
- Created and uploaded docker images to dockerhub: karthikreddyvkr1794/mean_stack_with_dockers
- To run: pull the images from the above repo and also a mongo image and docker run with appropriate commands to expose ports     and also --net=host
OR
- There is docker-compose.yml file which runs the dockerfile's for us.
- docker-compose build          #builds the docker images
- docker-compose up             #starts the containers and application is ready to use.

(pre-req: install docker and docker-compose)
sudo apt install docker
sudo apt install docker-compose

=================================================================================================

Install node_modules 
For server: root > npm install
For client: root/client > npm install

MongoDB: > mongod.exe
Run Server: > node app.js
Run Client: > npm start

	User signup: Register a new user to the system. 
o	Check the new username or email address if it’s already registered to the system using AJAX. 
o	Form validation: Check if all mandatory fields are filled out. (JQuery)
o	Check if password is strong enough. Define the rules of having a strong password. (JQuery). User passwords should be hashed and hashed version of passwords should be stored in the database.
	User login
	List available products/services in the system. User should be able to filter the results based on at least one criterion (i.e. category). Also, should be able to “Search” for a specific item.  Search and filtering should be integrated together.
	You will have paging functionality for listing products/services.
	Add item(s) to the cart and checkout. For the online shopping sites, pricing will be included but payment functionality doesn’t need to be implemented. However, you will keep track of inventory. For websites where a shopping cart does not exist, you can implement Wish list or Favorites and save those listings.
	For the websites where shopping cart is implemented, user should be able to update items in the cart (remove items from the cart, update their quantity)
	Show the history of purchases or saved lists for the user.
	For Admin user(s):
o	List all items
o	Add new item
o	Delete item
o	Update item

Admin user will have the same interface with regular users, except that he/she will be provided extra features (buttons/links) for update and deletion of products/services.

While adding items to the system, admin user should be able to upload pictures for the items and while updating items, should be able to change pictures.
For delete, soft-delete should be implemented.

Front-end design
You can use Bootstrap and Bootstrap templates for user interface design. You can also use design tools (i.e. FrontPage, Dream Weaver). You are flexible for page designs but it is important to have a professional look for all pages (i.e. the same menu or navigation bar appears on top of every page etc.). 
You can also use frameworks (i.e. Angular JS) for client-side scripting.

Back-end design
You can use relational databases or MongoDB for database component. In case a relational database system is used, tables should be normalized to Third Normal Form.
For server side scripting, you can use PHP, Ruby on Rails and Node.JS You are also allowed to use PHP frameworks such as Laravel, CodeIgniter, CakePHP, etc. 

Project Report

Project Report should include following items:

	Project Title 
	Name for the Website
	Project Description: a brief description of the website. If you make any assumptions, make sure to include those assumptions.
	Database Design: Database structure including the tables and primary and foreign key definitions on tables.  Alternatively, you can include your “Create Table” statements for this. In case you use MongoDB, provide information about your data model.
	Languages/frameworks used for implementation
	Screenshots for main functionalities (5-6 screenshots will be sufficient)
	Team Members: Names and Net-IDs for team members
	Work division among team members: who has completed which part (be specific and try to give page names). Please note that every team member should be actively involved in every step of the project development (database design, client-side and server side scripting) and work should be equally divided between team members.

Deliverables:

You will show a live demo of your project in the classroom. Presentations will be done on November 28, December 3 and December 5, 2018 during regular class time.
Each team is also responsible for sending following items for final project:
o	Project report (File name should be Coursenumber-Teamnumber-ProjectTitle.pdf.  Example: CS6314.001-Team4-OnlinePizzaOrders.pdf)
o	Source files (zip your home directory for your project)
o	Sql dump file for your database if you are using a relational database. JSON files if you are using MongoDB.
