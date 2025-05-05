require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();

app.get("/api/google", async (req, res) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_KEY}&libraries=places&callback=initMap`
    );
    const js = await response.text();
    res.type(".js");
    return res.send(js);
  } catch {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

app.get("/api/unsplash", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?orientation=landscape&query=nature landscape&client_id=${process.env.UNSPLASH_KEY}`
    );
    const results = await response.text();
    return res.send(results);
  } catch {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

app.use(express.static(path.join(__dirname, "/public")));

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
