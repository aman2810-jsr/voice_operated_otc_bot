const express=require('express');
const app=express();
const path=require('path');
const dotenv=require('dotenv');
dotenv.config();
const port=3000;

const createAgentRouter=require('./routes/createAgent');

app.use(express.static(path.join(__dirname,'..')));
app.use('/api',createAgentRouter);

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'index.html'));
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
