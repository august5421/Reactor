import express from "express";
import multer from "multer";
import firebaseAdmin from "firebase-admin";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import cors from "cors"; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

const upload = multer({ dest: "uploads/" });

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  next();
});

app.post("/api/create-users", upload.single("serviceAccount"), async (req, res) => {
  try {
    console.log("Received request to create users...");
    
    if (!req.file) {
      console.error("No service account file provided.");
      return res.status(400).json({ message: "Service account JSON is required." });
    }

    console.log("Uploaded service account file:", req.file.path);
    const serviceAccountPath = req.file.path;
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

    if (!firebaseAdmin.apps.length) {
      console.log("Initializing Firebase Admin SDK...");
      firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(serviceAccount),
      });
    }

    const db = firebaseAdmin.firestore();
    console.log("Connected to Firestore.");

    if (!req.body.admins) {
      console.error("No admin data received.");
      return res.status(400).json({ message: "Admin data is required." });
    }

    const admins = JSON.parse(req.body.admins);
    console.log(`Received ${admins.length} admin(s) to create.`);

    for (const admin of admins) {
      console.log(`Creating Firebase user: ${admin.email}`);

      const userRecord = await firebaseAdmin.auth().createUser({
        email: admin.email,
        password: admin.password,
      });

      console.log(`User created: ${userRecord.uid} (${userRecord.email})`);

      await db.collection("Users").doc(userRecord.uid).set({
        email: userRecord.email,
        firstName: "Admin",
        lastName: "",
        role: "admin",
        createdAt: firebaseAdmin.firestore.FieldValue.serverTimestamp(),
      });

      console.log(`User ${userRecord.email} added to Firestore.`);
    }

    fs.unlinkSync(serviceAccountPath);
    console.log("Service account file deleted.");

    res.status(201).json({ message: "Users created successfully!" });
  } catch (error) {
    console.error("Error in /api/create-users:", error);
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/create-blog-posts", async (req, res) => {
    try {
      const blogFilePath = path.join(__dirname, "blogBackup.json");
      if (!fs.existsSync(blogFilePath)) {
        return res.status(400).json({ message: "blogBackup.json file not found." });
      }
  
      const blogData = JSON.parse(fs.readFileSync(blogFilePath, "utf8"));
      console.log("Blog data loaded from blogBackup.json.");
  
      const db = firebaseAdmin.firestore();
      
      const blogCollection = db.collection("Blog");
  
      for (const post of blogData) {
        await blogCollection.add(post);
        console.log(`Blog post titled "${post.title}" added to Firestore.`);
      }
  
      res.status(201).json({ message: "Blog posts table created successfully!" });
    } catch (error) {
      console.error("Error in /api/create-blog-posts:", error);
      res.status(500).json({ message: error.message });
    }
});

app.post("/api/create-colors", async (req, res) => {
  try {
    const colorsFilePath = path.join(__dirname, "colorsBackup.JSON");
    if (!fs.existsSync(colorsFilePath)) {
      return res.status(400).json({ message: "colorsBackup.JSON file not found." });
    }

    const colorsData = JSON.parse(fs.readFileSync(colorsFilePath, "utf8"));
    console.log("Colors data loaded from colorsBackup.JSON.");

    const db = firebaseAdmin.firestore();
    
    const colorsCollection = db.collection("Colors");

    for (const color of colorsData) {
      await colorsCollection.add(color);
      console.log(`${color.key} Color added to Firestore.`);
    }

    res.status(201).json({ message: "Colors table created successfully!" });
  } catch (error) {
    console.error("Error in /api/create-colors:", error);
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/create-configurations", async (req, res) => {
  try {
    const configFilePath = path.join(__dirname, "configBackup.JSON");
    if (!fs.existsSync(configFilePath)) {
      return res.status(400).json({ message: "configBackup.JSON file not found." });
    }

    const configData = JSON.parse(fs.readFileSync(configFilePath, "utf8"));
    console.log("Configurations data loaded from configBackup.JSON.");

    const db = firebaseAdmin.firestore();
    
    const configurationsCollection = db.collection("Configurations");

    for (const config of configData) {
      await configurationsCollection.add(config);
      console.log(`${config.key} Configuration added to Firestore.`);
    }

    res.status(201).json({ message: "Configurations table created successfully!" });
  } catch (error) {
    console.error("Error in /api/create-configurations:", error);
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.post("/api/update-env", async (req, res) => {
    try {
      const {
        apiKey,
        authDomain,
        projectId,
        storageBucket,
        messagingSenderId,
        appId,
        measurementId
      } = req.body;
  
      if (!apiKey || !authDomain || !projectId || !storageBucket || !messagingSenderId || !appId || !measurementId) {
        return res.status(400).json({ message: "Missing required Firebase configuration values." });
      }
  
      const envFilePath = path.join(__dirname, '.env'); 
      
      const envContent = fs.readFileSync(envFilePath, 'utf8');
      
      const updatedEnvContent = envContent
        .replace(/VITE_FIREBASE_API_KEY=.*/g, `VITE_FIREBASE_API_KEY=${apiKey}`)
        .replace(/VITE_FIREBASE_AUTH_DOMAIN=.*/g, `VITE_FIREBASE_AUTH_DOMAIN=${authDomain}`)
        .replace(/VITE_FIREBASE_PROJECT_ID=.*/g, `VITE_FIREBASE_PROJECT_ID=${projectId}`)
        .replace(/VITE_FIREBASE_STORAGE_BUCKET=.*/g, `VITE_FIREBASE_STORAGE_BUCKET=${storageBucket}`)
        .replace(/VITE_FIREBASE_MESSAGING_SENDER_ID=.*/g, `VITE_FIREBASE_MESSAGING_SENDER_ID=${messagingSenderId}`)
        .replace(/VITE_FIREBASE_APP_ID=.*/g, `VITE_FIREBASE_APP_ID=${appId}`)
        .replace(/VITE_FIREBASE_MEASUREMENT_ID=.*/g, `VITE_FIREBASE_MEASUREMENT_ID=${measurementId}`)
        .replace(/VITE_REACTOR_DB_EXISTS=.*/g, `VITE_REACTOR_DB_EXISTS=true`); 
  
      fs.writeFileSync(envFilePath, updatedEnvContent);
      console.log('Firebase configuration updated in .env file.');
  
      res.status(200).json({ message: "Firebase configuration and environment updated successfully!" });
    } catch (error) {
      console.error("Error updating Firebase config:", error);
      res.status(500).json({ message: "Error updating Firebase configuration." });
    }
  });
  

