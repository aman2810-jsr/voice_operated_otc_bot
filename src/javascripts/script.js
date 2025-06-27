import { BlandWebClient } from 'bland-client-js-sdk';

let blandClient=null;
let agentId = null;

document.getElementById("start-btn").addEventListener("click", async () => {
  try {
    const res = await fetch('/api/createAgent', { method: 'POST' });
    const data = await res.json();

    if (res.ok && data.agentId && data.sessionToken) {
        console.log('Agent created');
        console.log('Session started');
        startWebCall(data.agentId, data.sessionToken);
        agentId = data.agentId; // Store the agentId for later use
    } 

    else if(!data.agentId) {
        alert("Failed to create agent. Please check the server logs for more details.");
    } 

    else {
        alert("Failed to create session. Please check the server logs for more details.");
    }
}  catch (error) {
        console.error(error);
        alert("Failed to connect to server. Please check the server logs for more details.");
    }
});


async function startWebCall(agentId,sessionToken){
    try{
        blandClient = new BlandWebClient(agentId, sessionToken);
        await blandClient.initConversation({ sampleRate: 44100 }); 
        
        console.log("Webcall started successfully!");

    } catch (error) {
        console.error('❌ Failed to start web call:', error);
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
    }
  } else {
    alert("No active web call to stop.");
  }
});


// Add pulse animation to mic icon on start/stop button clicks
const micImg = document.getElementById("mic-img");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");

startBtn.addEventListener("click", () => {
  micImg.classList.add("animate-pulse-mic");
});

stopBtn.addEventListener("click", () => {
  micImg.classList.remove("animate-pulse-mic");
});