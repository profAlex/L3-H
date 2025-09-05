import express from "express";
import {setupApp} from "./setup-app";

const app = express();
setupApp(app);


const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
   console.log(`Server started on port ${PORT}`);
});

module.exports = app;