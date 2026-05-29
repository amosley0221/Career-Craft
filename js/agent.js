document.addEventListener('DOMContentLoaded', () => {
    const setupScreen = document.getElementById('agentSetup');
    const chatScreen = document.getElementById('agentChat');
    const apiKeyInput = document.getElementById('apiKey');
    const proxyUrlInput = document.getElementById('proxyUrl');
    const startBtn = document.getElementById('startAgentBtn');
    const toggleKeyBtn = document.getElementById('toggleKeyBtn');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const fileInput = document.getElementById('fileInput');
    const dropzone = document.getElementById('dropzone');
    const uploadArea = document.getElementById('uploadArea');
    const fileInfo = document.getElementById('fileInfo');
    const fileName = document.getElementById('fileName');
    const removeFileBtn = document.getElementById('removeFile');
    const newUploadBtn = document.getElementById('newUploadBtn');
    const downloadDocxBtn = document.getElementById('downloadDocxBtn');

    if (!setupScreen) return;

    let apiKey = '';
    let apiUrl = '';
    let conversationHistory = [];
    let resumeText = '';
    let fixedResumeContent = '';
    let isProcessing = false;

    const SYSTEM_PROMPT = `You are an expert resume reviewer and career coach. Your job is to:

1. Analyze uploaded resumes thoroughly and provide detailed, constructive feedback
2. Identify strengths and weaknesses in formatting, content, wording, and strategy
3. Ask clarifying questions about the user's target role, industry, and experience level
4. Offer specific, actionable suggestions for improvement
5. When asked to fix the resume, provide a complete improved version

When reviewing a resume, organize your feedback into these categories:
- **Overall Impression**: First impressions and general assessment
- **Content & Impact**: Are achievements quantified? Are bullet points action-oriented?
- **Structure & Formatting**: Is it well-organized and easy to scan?
- **Keywords & ATS**: Will it pass applicant tracking systems?
- **Specific Suggestions**: Line-by-line improvements

Be encouraging but honest. Use a friendly, professional tone.

When the user asks you to fix/rewrite the resume, provide the complete improved resume text clearly formatted. Start the fixed resume with "---FIXED RESUME START---" and end with "---FIXED RESUME END---" so it can be extracted for download.`;

    // Toggle API key visibility
    toggleKeyBtn.addEventListener('click', () => {
        if (apiKeyInput.type === 'password') {
            apiKeyInput.type = 'text';
            toggleKeyBtn.textContent = 'Hide';
        } else {
            apiKeyInput.type = 'password';
            toggleKeyBtn.textContent = 'Show';
        }
    });

    // Enable start button when API key is entered
    apiKeyInput.addEventListener('input', () => {
        startBtn.disabled = !apiKeyInput.value.trim();
    });

    // Start the agent
    startBtn.addEventListener('click', () => {
        apiKey = apiKeyInput.value.trim();
        apiUrl = proxyUrlInput.value.trim() || 'https://api.anthropic.com/v1/messages';
        if (!apiKey) return;
        sessionStorage.setItem('cc_api_key', apiKey);
        setupScreen.classList.add('hidden');
        chatScreen.classList.remove('hidden');
    });

    // Restore API key from session
    const savedKey = sessionStorage.getItem('cc_api_key');
    if (savedKey) {
        apiKeyInput.value = savedKey;
        startBtn.disabled = false;
    }

    // File drag and drop
    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('drag-over');
    });
    dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('drag-over');
    });
    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('drag-over');
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    });

    fileInput.addEventListener('change', () => {
        if (fileInput.files[0]) handleFile(fileInput.files[0]);
    });

    removeFileBtn.addEventListener('click', () => {
        resumeText = '';
        fileInput.value = '';
        fileInfo.classList.add('hidden');
        dropzone.classList.remove('hidden');
    });

    newUploadBtn.addEventListener('click', () => {
        uploadArea.classList.remove('hidden');
        fileInfo.classList.add('hidden');
        dropzone.classList.remove('hidden');
        fileInput.value = '';
    });

    async function handleFile(file) {
        const ext = file.name.split('.').pop().toLowerCase();
        fileName.textContent = file.name;
        dropzone.classList.add('hidden');
        fileInfo.classList.remove('hidden');

        addMessage('user', `Uploaded: ${file.name}`);
        addMessage('agent', 'Reading your resume... one moment.');

        try {
            if (ext === 'txt') {
                resumeText = await file.text();
            } else if (ext === 'pdf') {
                resumeText = await extractPdfText(file);
            } else if (ext === 'docx' || ext === 'doc') {
                resumeText = await extractDocxText(file);
            } else {
                addMessage('agent', 'Sorry, I only support PDF, DOCX, and TXT files. Please try again.');
                return;
            }

            if (!resumeText.trim()) {
                addMessage('agent', 'I couldn\'t extract any text from that file. It may be image-based. Please try a text-based PDF or DOCX file.');
                return;
            }

            chatInput.disabled = false;
            sendBtn.disabled = false;
            uploadArea.classList.add('hidden');

            removeLastAgentMessage();
            await sendToAgent(`Please review the following resume and provide detailed feedback:\n\n${resumeText}`);
        } catch (err) {
            removeLastAgentMessage();
            addMessage('agent', `Error reading file: ${err.message}. Please try a different file.`);
        }
    }

    async function extractPdfText(file) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let text = '';
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            text += content.items.map(item => item.str).join(' ') + '\n';
        }
        return text;
    }

    async function extractDocxText(file) {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        return result.value;
    }

    // Chat functionality
    chatInput.addEventListener('input', () => {
        chatInput.style.height = 'auto';
        chatInput.style.height = Math.min(chatInput.scrollHeight, 120) + 'px';
    });

    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    });

    sendBtn.addEventListener('click', handleSend);

    async function handleSend() {
        const text = chatInput.value.trim();
        if (!text || isProcessing) return;

        addMessage('user', text);
        chatInput.value = '';
        chatInput.style.height = 'auto';

        await sendToAgent(text);
    }

    async function sendToAgent(userMessage) {
        isProcessing = true;
        sendBtn.disabled = true;
        chatInput.disabled = true;

        conversationHistory.push({ role: 'user', content: userMessage });

        const thinkingEl = addThinkingIndicator();

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey,
                    'anthropic-version': '2023-06-01',
                    'anthropic-dangerous-direct-browser-access': 'true'
                },
                body: JSON.stringify({
                    model: 'claude-sonnet-4-20250514',
                    max_tokens: 4096,
                    system: SYSTEM_PROMPT,
                    messages: conversationHistory
                })
            });

            thinkingEl.remove();

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                const errMsg = errData.error?.message || `API error (${response.status})`;
                addMessage('agent', `Error: ${errMsg}. Please check your API key and try again.`);
                conversationHistory.pop();
                return;
            }

            const data = await response.json();
            const assistantText = data.content?.[0]?.text || 'Sorry, I didn\'t get a response. Please try again.';

            conversationHistory.push({ role: 'assistant', content: assistantText });
            addMessage('agent', assistantText);

            // Check if the response contains a fixed resume
            if (assistantText.includes('---FIXED RESUME START---') && assistantText.includes('---FIXED RESUME END---')) {
                const match = assistantText.match(/---FIXED RESUME START---([\s\S]*?)---FIXED RESUME END---/);
                if (match) {
                    fixedResumeContent = match[1].trim();
                    downloadDocxBtn.classList.remove('hidden');
                }
            }
        } catch (err) {
            thinkingEl.remove();
            if (err.message.includes('Failed to fetch') || err.message.includes('CORS')) {
                addMessage('agent', 'Connection error: This is likely a CORS issue. For browser-based access, you need to either:\n\n1. **Set up a proxy** — Deploy a simple server that forwards requests to the Anthropic API\n2. **Use a CORS proxy URL** — Enter your proxy URL in the API Endpoint field on the setup screen\n\nSee the Anthropic docs for details on browser-based access.');
            } else {
                addMessage('agent', `Connection error: ${err.message}. Please check your settings and try again.`);
            }
            conversationHistory.pop();
        } finally {
            isProcessing = false;
            sendBtn.disabled = false;
            chatInput.disabled = false;
            chatInput.focus();
        }
    }

    function addMessage(role, text) {
        const div = document.createElement('div');
        div.className = `chat-message ${role === 'agent' ? 'agent-message' : 'user-message'}`;

        const avatar = role === 'agent'
            ? '<div class="message-avatar agent-avatar">AI</div>'
            : '<div class="message-avatar user-avatar">You</div>';

        div.innerHTML = `${avatar}<div class="message-content">${formatMessage(text)}</div>`;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return div;
    }

    function removeLastAgentMessage() {
        const msgs = chatMessages.querySelectorAll('.agent-message');
        if (msgs.length > 1) msgs[msgs.length - 1].remove();
    }

    function addThinkingIndicator() {
        const div = document.createElement('div');
        div.className = 'chat-message agent-message thinking';
        div.innerHTML = '<div class="message-avatar agent-avatar">AI</div><div class="message-content"><div class="typing-dots"><span></span><span></span><span></span></div></div>';
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return div;
    }

    function formatMessage(text) {
        // Simple Markdown-like formatting
        let html = text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        // Bold
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        // Italic
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
        // Inline code
        html = html.replace(/`(.*?)`/g, '<code>$1</code>');
        // Line breaks
        html = html.replace(/\n/g, '<br>');
        // Lists
        html = html.replace(/^- (.*?)(<br>|$)/gm, '<li>$1</li>');
        html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
        // Numbered lists
        html = html.replace(/^\d+\. (.*?)(<br>|$)/gm, '<li>$1</li>');

        return html;
    }

    // Download as DOCX (Word-compatible HTML)
    downloadDocxBtn.addEventListener('click', () => {
        if (!fixedResumeContent) return;

        const htmlContent = `
<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head><meta charset="UTF-8"><title>Resume</title>
<style>
body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; color: #333; line-height: 1.5; margin: 1in; }
h1 { font-size: 18pt; color: #1a1a2e; margin-bottom: 2pt; }
h2 { font-size: 13pt; color: #2d3436; border-bottom: 1pt solid #667eea; padding-bottom: 3pt; margin-top: 14pt; margin-bottom: 6pt; text-transform: uppercase; letter-spacing: 0.5pt; }
h3 { font-size: 11pt; color: #1a1a2e; margin-bottom: 1pt; margin-top: 8pt; }
p { margin: 3pt 0; }
ul { margin: 3pt 0 3pt 18pt; }
li { margin-bottom: 2pt; }
.contact { color: #666; font-size: 10pt; }
.date { color: #888; font-size: 10pt; float: right; }
.company { color: #555; font-style: italic; }
</style></head>
<body>${convertResumeToHTML(fixedResumeContent)}</body></html>`;

        const blob = new Blob([htmlContent], { type: 'application/vnd.ms-word;charset=utf-8' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'improved_resume.doc';
        a.click();
        URL.revokeObjectURL(a.href);
    });

    function convertResumeToHTML(text) {
        let html = text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        // Convert markdown-style headers
        html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
        html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
        html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');

        // Bold
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        // Italic
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

        // Bullet points
        html = html.replace(/^[•\-] (.*?)$/gm, '<li>$1</li>');
        html = html.replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>');
        html = html.replace(/<\/ul>\s*<ul>/g, '');

        // Paragraphs for remaining lines
        html = html.split('\n').map(line => {
            line = line.trim();
            if (!line) return '<br>';
            if (line.startsWith('<h') || line.startsWith('<ul') || line.startsWith('<li')) return line;
            return `<p>${line}</p>`;
        }).join('\n');

        return html;
    }
});
