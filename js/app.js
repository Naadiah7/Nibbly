// --- Speechify API function ---
/*const apiKey = "PI7OSDM1Aa6mUln9v5VkVbH-XrFlZWERXeGvjgPHG6s="; 
const endpoint = "https://api.sws.speechify.com/v1/speech"; // Replace with your real API endpoint

document.getElementById("speakBtn").addEventListener("click", async () => {
  // Get text from your webpage
  const textToRead = document.getElementById("content").innerText;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "Simba English",
        input: textToRead,
        emotion: "none",
      }),
    });

    if (!response.ok) throw new Error("Failed to fetch speech audio.");

    // Convert audio file from response to playable format
    const blob = await response.blob();
    const audioURL = URL.createObjectURL(blob);
    document.getElementById("audioPlayer").src = audioURL;

  } catch (error) {
    console.error("Speech generation error:", error);
    alert("Error generating speech. Check the console for details.");
  }
});*/



