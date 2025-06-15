const express=require('express');
const router=express.Router();

router.post('/createAgent',async (req,res)=>{
    try{
        const response=await fetch('https://api.bland.ai/v1/agents',{
            method:'POST',
            headers: {
            authorization: `Bearer ${process.env.BLAND_API_KEY}`, // Ensure you have set this in your environment variables
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: "You are a voice-based crypto OTC bot. Greet the user and ask them to choose from OKX, Binance, Bybit, or Deribit.",
                voice: "ava",
                //webhook: "https://webhook.site/your-temp-url", // or skip for now
                analysis_schema: {},
                metadata: {},
                pathway_id: null,
                language: "en",
                model: "gpt-4o",
                first_sentence: "Welcome to the OTC desk. Which exchange would you like to use?",
                tools: [],
                dynamic_data: {},
                interruption_threshold: 800,
                keywords: ["OKX", "Binance", "Bybit", "Deribit"],
                max_duration: 60
            })
        });

        const data=await response.json();
        res.json(data);
    }   
    catch (error) {
        console.error('Error creating agent:', error);
        res.status(500).json({ error: 'Failed to create agent' });
    }
});

module.exports=router;