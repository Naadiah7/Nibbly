// ===== TEXT TO SPEECH API FUNCTION =====
const apiKey = 'b1a39bccbc1100d4acab5afebb669c9adc9b01d3ac6527d8f33148c399d2a455';

let currentAudio = null;
let isPlaying = false;

async function textToSpeech(text, voiceId = 'XrExE9yKIg1WjnnlVkGX') {
    try {
        // Show loading state
        const button = document.querySelector('#speech-button');
        if (button) button.textContent = '⏳ Generating...';
        
        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
            method: 'POST',
            headers: {
                'Accept': 'audio/mpeg',
                'Content-Type': 'application/json',
                'xi-api-key': apiKey
            },
            body: JSON.stringify({
                text: text,
                model_id: "eleven_turbo_v2",
                voice_settings: {
                    stability: 0.5,
                    similarity_boost: 0.5
                }
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`API error: ${response.status} - ${errorData.detail?.message || 'Unknown error'}`);
        }
        
        return await response.blob();
    } catch (error) {
        console.error('Text-to-speech error:', error);
        alert('Error generating speech: ' + error.message);
        return null;
    }
}

function getWebsiteText() {
    // Simply get all text content from the entire body
    const text = document.body.innerText;
    
    // Clean up text - remove extra whitespace but keep all content
    return text.replace(/[ \t]+/g, ' ').replace(/\n\s*\n/g, '\n').trim();
}

// ===== AUDIO CONTROLS =====
function stopAudio() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }
    isPlaying = false;
    updateButtonState();
}

function updateButtonState() {
    const button = document.querySelector('#speech-button');
    if (button) {
        if (isPlaying) {
            button.textContent = '⏸️ Stop Reading';
            button.style.background = '#ff7dba';
        } else {
            button.textContent = '🔊 Read Page';
            button.style.background = '#9e53beff';
        }
    }
}

// ===== MAIN SPEECH FUNCTION =====
async function speakWebsiteContent() {
    // If already playing, stop
    if (isPlaying) {
        stopAudio();
        return;
    }
    
    const text = getWebsiteText();
    
    if (!text) {
        alert('No text found to read!');
        return;
    }
    
    console.log('Text to be read:', text); // Debug: see what text is extracted
    
    // Limit text length to avoid very long audio
    const limitedText = text.substring(0, 5000);
    
    const audioBlob = await textToSpeech(limitedText);
    
    if (audioBlob) {
        // Stop any current audio
        stopAudio();
        
        // Create audio URL and play
        const audioUrl = URL.createObjectURL(audioBlob);
        currentAudio = new Audio(audioUrl);
        
        currentAudio.addEventListener('play', () => {
            isPlaying = true;
            updateButtonState();
        });
        
        currentAudio.addEventListener('ended', () => {
            isPlaying = false;
            updateButtonState();
            URL.revokeObjectURL(audioUrl); // Clean up memory
        });
        
        currentAudio.addEventListener('pause', () => {
            isPlaying = false;
            updateButtonState();
        });
        
        await currentAudio.play();
    } else {
        // Reset button if failed
        updateButtonState();
    }
}

// ===== ENHANCED BUTTON CREATION =====
function addSpeechButton() {
    // Remove existing button if any
    const existingButton = document.querySelector('#speech-button');
    if (existingButton) existingButton.remove();
    
    const button = document.createElement('button');
    button.id = 'speech-button';
    button.textContent = '🔊 Read Page';
    button.style.position = 'fixed';
    button.style.bottom = '200px';
    button.style.right = '20px';
    button.style.zIndex = '1000';
    button.style.padding = '15px';
    button.style.background = '#9e53beff';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';
    button.style.fontSize = '16px';
    button.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    button.style.fontFamily = "'Orelega One', Arial";
    
    button.addEventListener('click', speakWebsiteContent);
    document.body.appendChild(button);
}

// ===== TEXT SELECTION FEATURE =====
function addTextSelectionFeature() {
    document.addEventListener('mouseup', function() {
        const selectedText = window.getSelection().toString().trim();
        if (selectedText.length > 0 && selectedText.length < 1000) {
            showSelectionButton(selectedText);
        }
    });
}

function showSelectionButton(text) {
    // Remove existing selection button
    const existingButton = document.querySelector('#selection-speech-button');
    if (existingButton) existingButton.remove();
    
    const button = document.createElement('button');
    button.id = 'selection-speech-button';
    button.textContent = '🔊 Read Selected';
    button.style.position = 'fixed';
    button.style.background = '#28a745';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.padding = '8px 12px';
    button.style.cursor = 'pointer';
    button.style.zIndex = '1001';
    button.style.fontSize = '12px';
    button.style.fontFamily = "'Orelega One', Arial";
    
    // Position near selection
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    
    button.style.top = (rect.top - 40) + 'px';
    button.style.left = (rect.left) + 'px';
    
    button.addEventListener('click', async () => {
        const audioBlob = await textToSpeech(text);
        if (audioBlob) {
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            audio.play();
        }
        button.remove();
    });
    
    document.body.appendChild(button);
    
    // Remove button after click elsewhere
    setTimeout(() => {
        document.addEventListener('click', function removeButton() {
            if (button.parentNode) {
                button.remove();
            }
            document.removeEventListener('click', removeButton);
        }, { once: true });
    }, 100);
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    addSpeechButton();
    addTextSelectionFeature();
    
    // Add keyboard shortcut (Ctrl+Shift+S)
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey && e.key === 'S') {
            e.preventDefault();
            speakWebsiteContent();
        }
    });
});


// ===== SIDEBAR FUNCTION =====
// ===== SIDEBAR FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const sidebar = document.getElementById('sidebar');
    const checkBtn = document.querySelector('.checkbtn');
    const closeBtn = document.getElementById('closeSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    
    // Function to open sidebar
    function openSidebar() {
        sidebar.classList.add('show-sidebar');
        overlay.classList.add('show-overlay');
        document.body.style.overflow = 'hidden';
    }
    
    // Function to close sidebar
    function closeSidebar() {
        sidebar.classList.remove('show-sidebar');
        overlay.classList.remove('show-overlay');
        document.body.style.overflow = '';
    }
    
    // Event listeners
    checkBtn.addEventListener('click', openSidebar);
    closeBtn.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);
    
    // Close sidebar when clicking on links
    sidebarLinks.forEach(link => {
        link.addEventListener('click', closeSidebar);
    });
    
    // Close sidebar with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeSidebar();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 834) {
            closeSidebar();
        }
    });
});