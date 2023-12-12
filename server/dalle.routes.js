import express, { response } from 'express';
import * as dotenv from 'dotenv';
import {OpenAI} from 'openai';



dotenv.config();

const router = express.Router();

const openai = new OpenAI(process.env.OPENAI_API_KEY);

router.route('/').get((req, res) => {
    res.status(200).json({message:"this is dalle server"})
})

router.route('/').post(async (req, res) => {
    
console.log("prompt")
    try {
        const {prompt} = req.body;
        const response = await openai.images.generate({
            prompt,
            n:1,
            size:'512x512',
            response_format:'b64_json'
        })

        const image = response.data.data[0].b64_json;

        res.status(200).json({photo:image})
    } catch (error) {
        console.error(error)
        res.status(500).json({message:error})
    }
})

export default router;