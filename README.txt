This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.0.


INSTALLATION AND STARTUP INSTRUCTIONS
-------------------------------------

1. Run `npm install` in the project directory to install necessary node_modules for the app
2. Run `cd server` to navigate to the server directory
3. Run `npm install` in the server directory to install necessary node_modules for the backend server
4. Run `npm start` to start the backend server on port 1234
5. Run `npm start` for a dev server. Navigate to `http://localhost:4200/` to view.


FOLDER STRUCTURE
----------------

For this project, we will be using the required Angular folder structure.
The `server` folder is where the backend node server for this application is implemented as a subproject with its own `package.json` implementation. It holds a `models` folder for all the models used for the mongoose library for accessing the collections in the Mongo Database. It also holds a `routes` folder for all the routes used for different modules of the application


NECESSARY CONNECTION PARAMETERS TO EXPLORE THE DB USING MONGODB COMPASS
-----------------------------------------------------------------------

Hostname: cluster0-me8ny.mongodb.net
SRV Record: on
Username: epharma_admin
Password: epharma_admin
Authentication Database: admin
SSL: System CA / Atlad Depl
SSH: None


FEATURES WORKED ON
------------------

1. Products Catalog - Samson Maconi (B00801169)
2. Sign in and Registration - Saraiya Smit Ashish (B00811636)
3. Upload-Prescription - Samarth Vyomeshchandra Raval (B00812673)
4. Pharmacist/Admin Panel - dashboard and order management - Navneet Prakash Singh (B00810744)
5.


PRODUCT CATALOG
---------------

The Products Catalog consists of 2 primary components: the `catalog` component (`\src\app\catalog`) and the `product` component (`\src\app\product`).

The catalog component can be navigated to using the `header` category links (in the `nav-category` component, `\src\app\nav-category`),
or by searching for a product using the search component within the `nav` component, `\src\app\nav`.

The `product` component displays information relating to a specific product selected from the catalog.

The catalog component displays all the products under the selected category. It allows sorting, filtering, ang pagination of the result set.

The backend routes for the catalog are all under the `/api/products` access point (see `\server\routes\products.routes.js` for the directives).

** N.B: The PRODUCT CATALOG implements presentation. The SHOPPING CART is a seperate component to be integrated later.


SIGN IN AND REGISTRATION
------------------------

The login and registration components validates the user's authenticity and allows the user to purchase through e-Pharma. There are two seperate components for login and registration. Folder path : E_Pharma -> src -> app -> Login (for login component) and E_Pharma -> src -> app -> Registration (for Registration component). All the Html, scss, and .ts files are found inside the respective components.

For the new user : click new to e_Pharma on Customer sign in page and fill out the registration form. After successful registration and login the user will get access to the secure components of the website (such as Upload Prescription). In order to upload the prescription the user must be logged in into e_Pharma.

To validate the routes, there is Auth-guard under the service folder which blocks the access of secured pages unless the user is authenticated.

To test the auth guard (type: http://localhost:4200/upload-prescription), if the user is logged in then it will allow to upload the prescription image and will not allow otherwise.

To test login and registration:
After successful registration and login (type: http://localhost:4200/registration) or (type: http://localhost:4200/login) the user will be redirected to the home page only.

Session handling is done with the help of JWT(jsonwebtoken)[1]. With each api request the token will be passed to the front end and will get stored in the local storage. After successful login the token will remain in the local storage for 1 hour, so if the user wish to refresh the page then also the token will still remain in the storage and after one hour the user will be automatically logged out.

** Additional Information:
The UI of Manage profile is ready with all the validations.
The forgot password link will be redirected to the blank html page (which will be fixed later).


UPLOAD PRESCRIPTION
-------------------

http://localhost:4200/upload-prescription
Upload Prescription is an essential part of the website, it is used when the user wants to buy a drug which needs a doctor’s prescription.

Files which shows Upload Prescription part are below:
  \src\app\upload-prescription (HTML,ts,scss) [3]
  \src\app\prescription.model.ts
  \server\routes\prescription.routes.js
  \server\models\prescription.js
  \server\images

This feature helps user to upload prescription in the form of .jpeg .jpg or .png
After adding all details data will be stored in collections named epharma/prescriptions. We used MEAN stack for our website development.
Prescription images will be stored in a folder named server/images and the image name is the "_id number" which is unique every time. In the database, the location of the image will be stored, this technique is used to save the space in the database.
All fields are mandatory in upload-prescription.
  Order Number, Name, Email Address, Phone Number and upload-prescription are mandatory [2].
  Validation on email will match a regular expression with incoming email. If both matches, then only it will allow submitting the prescription.
  The user will able to see the preview of prescription after uploading it. It is mandatory to upload the image to complete the prescription form.

To run the Upload-prescription feature user can simply click on Upload Prescription button on home page. It will redirect the user to login page.
After login into system user will able to see the upload-prescription page.
To use upload-prescription user needs to register first if they don't have a username and password.
Dummy email address and password can be: samraval11@yahoo.com , samarth123


PHARMACIST/ADMIN PANEL - DASHBOARD AND ORDER MANAGEMENT
----------------
Admin panel is the portal which would be available only to the pharmacist and is designed by keeping the mindset of pharmacist in mind. We wanted to display the important information directly infront of the pharmacist, therefore using a side nav bar, thereby, adhering to the usability of the application.
When the pharmacist navigates to the dashboard page, certain information like pending orders, revenue generated, completed orders, thus displaying the vital information that the pharmacist needs.
Pharmacist panel is available at 'localhost:<port number>/admin/dashboard' page of the application.

Another important feature for the pharmacist is the orders management, where the pharmacist is able to view the items related to the order, change the status related to the order.
When the pharmacist would navigate to the orders page, they can view the orders along with their status, and by clicking the view order, they can view the items related to the order and update the status of the item accordingly.
Pharmacist order panel is available at 'localhost:<port number>/admin/order' page of the application.

Files covered under this module include:
/src/app/admin/admin-main/ : Files related to the main UI, routes of the admin Panel
/src/app/admin/adminlogin/ : Files related to the login UI, routes of the admin Panel
/src/app/admin/adminnavbar/: Files related to the navbar UI, routes of the admin Panel
/src/app/admin/dashboard/ : Files related to the dashboard UI, routes of the admin Panel
/src/app/admin/orderitems/ : Files related to the order items UI, routes of the admin Panel
/src/app/admin/orders/ : Files related to the order UI, routes of the admin Panel
/src/app/admin/sidebar/: Files related to the sidebar UI, routes of the admin Panel
/routes/admin.js: Files related to the backend node logic of the admin Panel



IMAGE REFERENCES
----------------

ePharma Logo - The Logo was designed using Hatchful ('https://hatchful.shopify.com')
Product Image Placeholders - Source: ('http://dummyimage.com')
Pills in grey Background (Signin and Signup pages) - Source: ('https://images.unsplash.com/photo-1521453510357-5c7a77db7074?ixlib=rb-1.2.1&auto=format&fit=crop&w=2175&q=80')
Vitamins Banner (Home Page Single Slider Component) - Source: ('https://www.m-medix.com/modules/homeslider/images/84e5d282edcd5febda7d5e46cfadce1f91724100_Vitamin%20C2.jpg')
Gaviscon Med Banner (Home Page Single Slider Component) - Source: ('https://www.m-medix.com/modules/homeslider/images/5b13b9c3158712bb4b3dd30ba56fe02264f142a3_GAVISCON%20PEPPERMINT.png')


REFERENCES
----------

[1]"JWT.IO", Jwt.io, 2019. [Online]. Available: https://jwt.io/. [Accessed: 23- Mar- 2019].
[2]"Upload Prescription - Pet Prescriptions", Petprescription.co.uk, 2019. [Online].
Available: https://www.petprescription.co.uk/upload_prescription/. [Accessed: 23- Mar- 2019].
[3]Image preview before upload in angular 5. [online] Stack Overflow.
 Available at: https://stackoverflow.com/questions/50482814/image-preview-before-upload-in-angular-5 [Accessed 23 Mar. 2019].


THE W3C FRONT-END VALIDATION TESTS
----------------------------------

The validation tests only spotted angular directives which cannot be avoided with the Angular Front-End framework.
