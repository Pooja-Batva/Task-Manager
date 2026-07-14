import 'dotenv/config';
import app from "./src/app.js";
import connectDB from './src/db/index.js';

const PORT = process.env.PORT || 8080;

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((error) => {
    console.error(`Error: ${error.message}`);
    process.exit(1);
});

