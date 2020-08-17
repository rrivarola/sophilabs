1. Ejectuar estos comandos para iniciar un server express

        npm init
2. Then, install the Express framework in the folder by typing the following at the prompt:
   
         npm install express@4.16.3 --save

3. Create a file named .gitignore and add the following to it: node_modules
4. Create a file named index.js and add the following code to it:
   {
   "name": "node-express",
   "version": "1.0.0",
   "description": "Node Express Examples",
   "main": "index.js",
   "scripts": {
   "test": "echo \"Error: no test specified\" && exit 1",
   "start": "node index"
   },
   "author": "Jogesh Muppala",
   "license": "ISC"
   }

5. Serving Static Files
Install morgan by typing the following at the prompt. Morgan is used for logging purposes:

         npm install morgan@1.9.0 --save

6. In this exercise, you will develop a web server that exports a REST API. You will use the Express framework, and the Express router to implement the server. At the end of this exercise, you will be able to:

Use application routes in the Express framework to support REST API
Use the Express Router in Express framework to support REST API

     npm install body-parser@1.18.3 --save


7. In this folder, install Mongoose by typing the following at the prompt:
   
        npm install mongoose@5.1.7 mongoose-currency@0.2.0 --save

8. Installing passport-jwt and jsonwebtoken Node Modules
You will continue working with the Express REST API Server in the conFusionServer folder. You will modify this project to set up user authentication support using tokens and Passport.
Install the passport-jwt and the jsonwebtoken modules as follows:

      npm install passport-jwt@4.0.0 jsonwebtoken@8.3.0 --save