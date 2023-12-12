import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import dalleRoutes from './dalle.routes.js';

dotenv.config();


const app = express();

app.use(cors());    
app.use(express.json({limit: '50mb'}));
app.use('/dalle', dalleRoutes);

app.get('/', (req, res) => {    
    res.status(200).json({message:"this is server"})

})

app.listen(5000,()=>
    console.log("server is running on port 5000")
)
