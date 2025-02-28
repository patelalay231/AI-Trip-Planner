import express, { Request, Response } from "express";
const cors = require("cors");
import dotenv from "dotenv";
import { chatSession } from "./services/generate-response";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());


// Routes
app.post("/api/trip/generate-trip", async (req: Request, res: Response) => {
    const body = req.body;
    const prompt = `Generating trip for ${body.place.value.description} for ${body.days} days with a budget of ${body.budgetData.title} for ${body.travelersData.title}.Give me hotel options list with hotelName, hotel address, gro cordinates ,price with currency sign, hotel image url, rating, description, abd suggest iliternary with placename, placedatils, place image url, gro cordinates, ticket pricing, rating, time travel each of the location for 3 days with each day plan with best time to visist in json format.\n`;
    const response = await chatSession.sendMessage(prompt);
    const result = response.response.candidates[0].content.parts[0].text;
    res.json({ result });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
