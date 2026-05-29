# Career Craft - Project Notes

## Overview
Career Craft is a multi-page static website that helps users research and enhance their careers. It offers career exploration, expert advice, and a resume builder.

## Tech Stack
- Plain HTML, CSS, JavaScript (no frameworks or build tools)
- Google Fonts: Inter + Space Grotesk
- Deployed as a static site

## Pages & Features

### 1. Landing Page (`index.html`)
- Hero section with animated background shapes
- 3 feature cards linking to each tool
- "How It Works" 3-step guide
- Testimonials section
- Call-to-action footer

### 2. Career Explorer (`explore.html`)
- Interactive 7-question personality quiz
- Matches users to careers across 11 categories (tech, healthcare, creative, business, trades, education, analytical, social, entrepreneurial, practical, research)
- Shows top 6 career matches with salary ranges, descriptions, and required skills
- Browse-by-industry section with 6 career category cards

### 3. Career Advice (`advice.html`)
- 6 in-depth articles: choosing careers, networking, interviews, salary negotiation, growth, career changes
- Filterable by topic tabs (All, Getting Started, Networking, Interviews, Salary, Growth)
- Expandable click-to-read cards
- 6 bite-sized quick tips section

### 4. Resume Builder (`resume.html`)
- 3 templates: Modern, Classic, Bold (sidebar layout)
- Form sections: personal info, summary, work experience, education, skills
- Dynamically add multiple experience/education entries
- Live preview updates as user types
- Download resume as HTML file
- Print support

## File Structure
```
Career-Craft/
├── index.html          # Landing page
├── explore.html        # Career explorer with quiz
├── advice.html         # Career advice articles
├── resume.html         # Resume builder
├── css/
│   └── styles.css      # All styles (responsive, print)
├── js/
│   ├── main.js         # Shared: mobile nav, scroll animations
│   ├── explore.js      # Career quiz logic and results
│   ├── advice.js       # Filter tabs, expand/collapse cards
│   └── resume.js       # Resume builder, live preview, download
└── images/             # (empty, using inline SVGs)
```

## Design
- Color palette: deep purple/blue primary (#667eea, #764ba2), coral/pink accents (#f5576c, #f093fb), teal (#4facfe, #00f2fe), green (#43e97b)
- Modern gradient aesthetic with rounded cards
- Fully responsive (desktop, tablet, mobile)
- Scroll-triggered fade-in animations
- Mobile hamburger navigation

## Deployment
- Repository: `amosley0221/Career-Craft`
- Branch: `claude/career-craft-website-XWTyC`
- Can be deployed on Render as a Static Site with publish directory `.` and no build command

### 5. AI Resume Agent (`agent.html`)
- Chat-based AI agent powered by Claude API (user provides their own API key)
- File upload: supports PDF (via pdf.js), DOCX (via mammoth.js), and TXT
- Extracts text from uploaded resumes and sends to Claude for detailed review
- Interactive chat: users can ask follow-up questions and request changes
- Agent provides feedback organized by: Overall Impression, Content & Impact, Structure, ATS Keywords, Specific Suggestions
- When user asks for a fix, agent provides improved resume with download capability
- Download fixed resume as Word (.doc) file
- Typing indicator animation during AI responses
- Drag-and-drop file upload with visual feedback
- API key stored in sessionStorage only (never persisted)
- Configurable API endpoint for CORS proxy support

## External Dependencies (CDN)
- Google Fonts: Inter, Space Grotesk
- pdf.js 3.11.174 (PDF text extraction)
- mammoth.js 1.8.0 (DOCX text extraction)
