document.getElementById("start-btn").addEventListener("click",async ()=>{
    try{
        const res=await fetch('/api/createAgent',{method:'POST'});
        const data=await res.json();

        if(data.agent && data.agent.agent_id){
            document.getElementById('transcript-box').innerHTML = `<p>Agent created successfully! Agent ID: ${data.agent.agent_id}</p>`;
        }
        else{
            document.getElementById('transcript-box').innerHTML = `Error: ${JSON.stringify(data)}`;
        }
    } catch (error){
        document.getElementById('transcript-box').innerText = `Failed to create agent.`;
        console.error(error);
    }
});