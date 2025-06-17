const express=require('express');
const router=express.Router();

router.post('/createAgent',async (req,res)=>{
    let agentId;
    let sessionToken;

    try{
        const ngrokWebhookURL = 'https://b0ab-2401-4900-8834-f859-f06f-6b13-6aca-f059.ngrok-free.app'; //copy from terminal after running npx ngrok http 3000 and copying from after opening the web interface link

        const response=await fetch('https://api.bland.ai/v1/agents',{
            method:'POST',
            headers: {
                authorization: `Bearer ${process.env.BLAND_API_KEY}`, // Ensure you have set this in your environment variables
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: "You are a voice-based crypto OTC bot. Greet the user and ask them to choose from OKX, Binance, Bybit, or Deribit.",
                voice: "Maeve",
                webhook: `${ngrokWebhookURL}/api/blandWebhook`, // webhook URL for handling responses
                analysis_schema: {},
                metadata: {},
                pathway_id: null,
                language: "en",
                model: "gpt-4o",
                first_sentence: "Welcome to the OTC desk. Which exchange would you like to use?",
                tools: [],
                dynamic_data: {},
                interruption_threshold: 100,
                keywords: ["OKX", "Binance", "Bybit", "Deribit"],
                max_duration: 60
            }) 
        });
        const data=await response.json();
        agentId=data.agent.agent_id;        

        if (!agentId) throw new Error('No agent_id returned');
    }   
    catch (error) {
        console.error('Error creating agent:', error);
        return res.status(500).json({ error: 'Failed to create agent' });
    }

    try{
        const response =await fetch(`https://api.bland.ai/v1/agents/${agentId}/authorize`, {
            method: 'POST', 
            headers: {authorization: `Bearer ${process.env.BLAND_API_KEY}`}
        })

        const data=await response.json();
        sessionToken=data.token;

        if (!sessionToken) throw new Error('No token returned');

        return res.json({ agentId, sessionToken });
    }
    catch(error){
        console.error('Error in session authorization:',error);
        return res.status(500).json({ error: 'Failed to authorize session'});
    }
});

module.exports=router;