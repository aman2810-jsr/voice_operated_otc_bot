import { BlandWebClient } from 'bland-client-js-sdk';

document.getElementById("start-btn").addEventListener("click", async () => {
  try {
    const res = await fetch('/api/createAgent', { method: 'POST' });
    const data = await res.json();

    if (res.ok && data.agentId && data.sessionToken) {
        document.getElementById('transcript-box').innerHTML = `
            <p style="color:green;"><strong>✅ Agent created and session authorized!</strong></p>
            <p> Webcall is starting..</p>
        `;
        startWebCall(data.agentId, data.sessionToken);
    } 

    else if(!data.agentId) {
        document.getElementById('transcript-box').innerHTML = `
            <p style="color:red;"><strong>❌ Failed to create agent.</strong></p>
            <pre>${JSON.stringify(data, null, 2)}</pre>
        `;
    } 

    else {
            document.getElementById('transcript-box').innerHTML = `
            <p style="color:red;"><strong>❌ Failed to create session.</strong></p>
            <pre>${JSON.stringify(data, null, 2)}</pre>
        `;
    }
}  catch (error) {
        console.error(error);
        document.getElementById('transcript-box').innerHTML = `
        <p style="color:red;"><strong>❌ Failed to connect to server.</strong></p>
        <pre>${error.message}</pre>
        `;
    }
});



async function startWebCall(agentId,sessionToken){
    try{
        const blandClient = new BlandWebClient(agentId, sessionToken);
        await blandClient.initConversation({ sampleRate: 44100 });  

        console.log("Webcall started successfully!");
    } catch (error) {
        console.error('❌ Failed to start web call:', error);
        document.getElementById('transcript-box').innerHTML += `
        <p style="color:red;"><strong>❌ Web call failed to start</strong></p>
        <pre>${error.message}</pre>
        `;
    }
}