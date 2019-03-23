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


FEATURES WORKED ON
------------------

1. Products Catalog - Samson Maconi (B00801169)
2. Sign in and Registration - Saraiya Smit Ashish (B00811636)
3.
4.
5.


PRODUCT CATALOG
---------------

The Products Catalog consists of 2 main components: the `catalog` component and the `product` component. The catalog component can be navigated to using the `header` category links (in the `nav-category` component), or by searching for a product using the search component within the `nav` component. The `product` component displays information relating to a specific product selected from the catalog. The catalog component displays all the products under the selected category


Sign In and Registration
------------------------

The login and registration components validates the user's authenticity and allows the user to purchase through e-Pharma. There are two seperate components for login and registration. Folder path : E_Pharma -> src -> app -> Login (for login component) and E_Pharma -> src -> app -> Registration (for Registration component). All the Html, scss, and .ts files are found inside the respective components. 

For the new user : click new to e_Pharma on Customer sign in page and fill out the registration form. After successful registration and login the user will get access to the secure components of the website (such as Upload Prescription). In order to upload the prescription the user must be logged in into e_Pharma.

To validate the routes, there is Auth-guard under the service folder which blocks the access of secured pages unless the user is authenticated.

To test the auth guard (type: http://localhost:4200/upload-prescription), if the user is logged in then it will allow to upload the prescription image and will not allow otherwise.

To test login and registration:
After successful registration and login (type: http://localhost:4200/registration) or (type: http://localhost:4200/login) the user will be redirected to the home page only.

Session handling is done with the help of JWT(jsonwebtoken)[1]. With each api request the token will be passed to the front end and will get stored in the local storage. After successful login the token will remain in the local storage for 1 hour, so if the user wish to refresh the page then also the token will still remain in the storage and after one hour the user will be automatically logged out.

**NOTE**
If any npm modules are not working (irrespective of the directories : app or server) : run npm install command once again to install all the dependancies.

-- Run npm start for the backend server first on port 1234.
-- Run npm start in main project folder (http://localhost:4200/).

** Additional Information:
The UI of Manage profile is ready with all the validations.
The forgot password link will be redirected to the blank html page (which will be fixed later).

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

THE W3C FRONT-END VALIDATION TESTS
----------------------------------

The validation tests only spotted angular directives which cannot be avoided with the Angular Front-End framework.
