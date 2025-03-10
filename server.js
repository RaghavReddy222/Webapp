const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

dotenv.config();
app.use(cors());
app.use(express.json()); 
app.use('/uploads', express.static('uploads')); 

const port = process.env.PORT || 8026;

// Connect to MongoDB
mongoose.connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));
  

const PoliticsSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    title: String,
    description: String,
    update: String,
    image: String 
}, { timestamps: true });
const Politics = mongoose.model("Politics", PoliticsSchema);

const BusinessSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    title: String,
    description: String,
    update: String,
    image: String 
}, { timestamps: true });
const Business = mongoose.model("Business", BusinessSchema);

const SportsSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    title: String,
    description: String,
    update: String,
    image: String 
}, { timestamps: true });
const Sports  = mongoose.model("Sports", SportsSchema);

const MoviesSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    title: String,
    description: String,
    update: String,
    image: String 
}, { timestamps: true });
const Movies  = mongoose.model("Movies", MoviesSchema);

const FoodSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    title: String,
    description: String,
    update: String,
    image: String 
}, { timestamps: true });
const Food  = mongoose.model("Food", FoodSchema);



const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

//politics//
app.post("/politics", upload.single("image"), async (req, res) => {
    try {
        const { title, description, update } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        const newPolitics = new Politics({ title, description, update, image });
        await newPolitics.save();

        res.status(201).json({ message: "Politics post added successfully!", post: newPolitics });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.get("/politics", async (req, res) => {
    try {
        const posts = await Politics.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// business//
app.post("/business", upload.single("image"), async (req, res) => {
    try {
        const { title, description, update } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        const newBusiness = new Business({ title, description, update, image });
        await newBusiness.save();

        res.status(201).json({ message: "Business post added successfully!", post: newBusiness });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.get("/business", async (req, res) => {
    try {
        const posts = await Business.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//sports//
app.post("/sports", upload.single("image"), async (req, res) => {
    try {
        const { title, description, update } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        const newSports = new Sports({ title, description, update, image });
        await newSports.save();

        res.status(201).json({ message: "Sports post added successfully!", post: newSports });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.get("/sports", async (req, res) => {
    try {
        const posts = await Sports.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Movies//
app.post("/movies", upload.single("image"), async (req, res) => {
    try {
        const { title, description, update } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        const newMovies = new Movies({ title, description, update, image });
        await newMovies .save();

        res.status(201).json({ message: "Movies  post added successfully!", post:newMovies });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.get("/movies", async (req, res) => {
    try {
        const posts = await Movies.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Food//
app.post("/food", upload.single("image"), async (req, res) => {
    try {
        const { title, description, update } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        const newFood = new Food({ title, description, update, image });
        await newFood .save();

        res.status(201).json({ message: "Movies  post added successfully!", post:newFood});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.get("/food", async (req, res) => {
    try {
        const posts = await Food.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




// Start Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
