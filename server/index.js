const express=require('express');
const app=express();
const path=require('path');
const dotenv=require('dotenv');
dotenv.config();
const port=3000;


app.use(express.json());

const createAgentRouter=require('./routes/createAgent');
const deleteAgentRouter=require('./routes/deleteAgent');
const blandWebhookRouter=require('./routes/blandWebhook');


app.use('/api',createAgentRouter);
app.use('/api',deleteAgentRouter);
app.use('/api',blandWebhookRouter);
app.use(express.static(path.join(__dirname,'..')));

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'index.html'));
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
