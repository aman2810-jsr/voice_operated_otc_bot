import { BlandWebClient } from 'bland-client-js-sdk';

let blandClient=null;
let agentId = null;

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
        agentId = data.agentId; // Store the agentId for later use
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
        blandClient = new BlandWebClient(agentId, sessionToken);
        await blandClient.initConversation({ sampleRate: 44100 }); 
        
        console.log("Webcall started successfully!");
        document.getElementById('transcript-box').innerHTML += `
        <p style="color:green;"><strong>✅ Web call started successfully.</strong></p>
        `;
    } catch (error) {
        console.error('❌ Failed to start web call:', error);
        document.getElementById('transcript-box').innerHTML += `
        <p style="color:red;"><strong>❌ Web call failed to start</strong></p>
        <pre>${error.message}</pre>
        `;
    }
}

document.getElementById('stop-btn').addEventListener('click', async () => {
  if (blandClient && agentId) {

    // Stop the local conversation/mic/audio
    await blandClient.stopConversation();

    try {
      const res = await fetch('/api/deleteAgent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ agentId })  // Pass agentId to backend
      });

      const data = await res.json();
      console.log('Agent deleted:', data);

      document.getElementById('transcript-box').innerHTML += `
        <p style="color:green;"><strong>✅ Agent deleted successfully.</strong></p>
      `;

        blandClient = null;
        agentId = null;

    } catch (error) {
      console.error('Error deleting agent:', error);
      document.getElementById('transcript-box').innerHTML += `
        <p style="color:red;"><strong>❌ Failed to delete agent.</strong></p>
        <pre>${error.message}</pre>
      `;
    }
  } else {
    document.getElementById('transcript-box').innerHTML += `
      <p style="color:orange;"><strong>⚠️ No active web call to stop.</strong></p>
    `;
  }
});


