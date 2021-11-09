/**
 * External Dependencies
 */
 import "dotenv/config"; // for work with environment variables
 import express_ from "express"; // express server
 import path from 'path';  // path functionalities
 import { fileURLToPath } from 'url';  // get __dirname working
 import {PythonShell} from 'python-shell'; // run pythons scripts
 import multer from "multer";  // middleware for handling file upload
 
 const express = express_; // express server object
 var upload = multer();
 
 /**
  * Own Dependencies
  */
 import { asyncMkdir, asyncRm, asyncSaveFile, asyncRunPython } from "./modules/helperFunctions.js"
 
 /**
  * App, Port
  */
 const app = express();
 const port = process.env.PORT || 8000;
 
 /**
  * Environment
  */
 if (process.env.NODE_ENV === "production") 
 {
   console.log(process.env);
   console.log("production mode");
 }
 else console.log("development mode");
 
 /**
  * Uses
  */
 const __filename = fileURLToPath(import.meta.url);
 const __dirname = path.dirname(__filename);
 app.use(express.static(__dirname + "/"));
 app.use(express.static(__dirname + "../"));
 app.use(express.static(__dirname + 'node_modules/'));
 //app.use(express.static(__dirname + "../frontend/build/"));
 //app.use(express.static(path.resolve(__dirname+"/../frontend/build/")))
 app.use(express.json());
 
 /**
  * Routes
  */
 app.post("/", upload.array("file"), async (req, res) => {
   const ifc_folder = "ifc/";
   const outputJsonFileName = "ifc_file.json";
   const pythonFileName = "python_modules/ifcjson/ifc2json.py";

   const pythonShellOptions = {
    args: [
      "-i",
      req.files[0].originalname,
      "-o",
      outputJsonFileName
      ]
   };
 
   var result1 = await asyncRm(images_folder); console.log(result1);
   var result2 = await asyncMkdir(images_folder); console.log(result2);
 
   /* for(var i = 0; i < req.files.length; i++) {
     await asyncSaveFile(
       images_folder+req.files[i].originalname,
       req.files[i].buffer
     );
   } */

   await asyncSaveFile(
     ifc_folder+req.files[0].originalname, 
     req.files[0].buffer);
 
   const pythonShellResponse = await asyncRunPython(
     pythonFileName, pythonShellOptions
   );
 
   res.status(200).send(
     {
       "Response": "ifc2json successfull",
       "Content": pythonShellResponse
     }
   );
 });
 
 
 /**
  * Server start
  */
 const server = app.listen(port, () => {
   console.log(`Listening to requests on http://localhost:${port}`);
 });