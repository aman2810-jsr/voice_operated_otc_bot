const express=require('express');
const router=express.Router();

router.post('/deleteAgent',async (req,res)=>{
    const agentId=req.body.agentId;

    if(!agentId){
        return res.status(400).json({ error: 'Agent ID is required' });
    }
    try{
        const response=await fetch(`https://api.bland.ai/v1/agents/${agentId}/delete`,{
                    method: 'POST', headers: {
                        authorization: `Bearer ${process.env.BLAND_API_KEY}`,
                        'Content-Type': 'application/json'
                    }
                });


        const data = await response.json();

        if (!response.ok) {
        return res.status(response.status).json(data);
        }

        res.json({ success: true, data });
    } catch (error) {
        console.error('Error deleting agent:', error);
        res.status(500).json({ error: 'Server error deleting agent', details: error.message });
    }
});

module.exports=router;