document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            text: "What type of work environment energizes you most?",
            options: [
                { text: "A quiet space where I can focus deeply on problems", tags: ["analytical", "tech", "research"] },
                { text: "A buzzing, collaborative team environment", tags: ["social", "business", "creative"] },
                { text: "Hands-on work where I build or fix things", tags: ["practical", "trades", "healthcare"] },
                { text: "A flexible setup where every day is different", tags: ["creative", "entrepreneurial", "social"] }
            ]
        },
        {
            text: "Which school subject did you enjoy the most?",
            options: [
                { text: "Math or Computer Science", tags: ["analytical", "tech"] },
                { text: "English, Art, or Music", tags: ["creative", "social"] },
                { text: "Science or Biology", tags: ["research", "healthcare"] },
                { text: "Business or Social Studies", tags: ["business", "entrepreneurial"] }
            ]
        },
        {
            text: "How do you prefer to solve problems?",
            options: [
                { text: "Analyze data and find patterns", tags: ["analytical", "tech", "research"] },
                { text: "Brainstorm creative solutions with others", tags: ["creative", "social", "business"] },
                { text: "Get hands-on and experiment", tags: ["practical", "trades", "healthcare"] },
                { text: "Research thoroughly, then create a plan", tags: ["research", "business", "analytical"] }
            ]
        },
        {
            text: "What matters most to you in a career?",
            options: [
                { text: "High earning potential and financial security", tags: ["tech", "business", "analytical"] },
                { text: "Making a positive impact on people's lives", tags: ["healthcare", "social", "education"] },
                { text: "Creative freedom and self-expression", tags: ["creative", "entrepreneurial"] },
                { text: "Job stability and work-life balance", tags: ["trades", "education", "practical"] }
            ]
        },
        {
            text: "Which activity sounds most fun to you?",
            options: [
                { text: "Building an app or website from scratch", tags: ["tech", "analytical", "creative"] },
                { text: "Coaching someone to reach their goals", tags: ["social", "education", "healthcare"] },
                { text: "Designing a brand identity or marketing campaign", tags: ["creative", "business"] },
                { text: "Managing a project from idea to completion", tags: ["business", "entrepreneurial", "practical"] }
            ]
        },
        {
            text: "How would your friends describe you?",
            options: [
                { text: "The logical problem-solver", tags: ["analytical", "tech", "research"] },
                { text: "The people person who brings everyone together", tags: ["social", "business", "education"] },
                { text: "The creative one with big ideas", tags: ["creative", "entrepreneurial"] },
                { text: "The reliable one who gets things done", tags: ["practical", "trades", "business"] }
            ]
        },
        {
            text: "What would you binge-watch or read about?",
            options: [
                { text: "Tech documentaries, sci-fi, or futurism", tags: ["tech", "analytical", "research"] },
                { text: "True crime, psychology, or medical dramas", tags: ["healthcare", "research", "social"] },
                { text: "Design, architecture, or creative process stories", tags: ["creative", "practical"] },
                { text: "Business, entrepreneurship, or finance content", tags: ["business", "entrepreneurial"] }
            ]
        }
    ];

    const careers = {
        tech: [
            { title: "Software Engineer", salary: "$85K - $165K+", desc: "Design, build, and maintain software applications and systems. High demand across every industry.", skills: ["Programming", "Problem Solving", "System Design"] },
            { title: "Data Scientist", salary: "$90K - $155K+", desc: "Extract insights from complex datasets to drive business decisions using statistics and machine learning.", skills: ["Python/R", "Statistics", "Machine Learning"] },
            { title: "Cybersecurity Analyst", salary: "$75K - $140K+", desc: "Protect organizations from digital threats and ensure data security in an increasingly connected world.", skills: ["Network Security", "Risk Analysis", "Compliance"] }
        ],
        creative: [
            { title: "UX/UI Designer", salary: "$70K - $130K+", desc: "Create intuitive, beautiful digital experiences that delight users and solve real problems.", skills: ["Figma/Sketch", "User Research", "Prototyping"] },
            { title: "Content Strategist", salary: "$60K - $110K+", desc: "Plan and create compelling content that engages audiences and drives business growth.", skills: ["Writing", "SEO", "Analytics"] },
            { title: "Video Producer", salary: "$50K - $100K+", desc: "Create engaging video content for brands, media companies, and digital platforms.", skills: ["Video Editing", "Storytelling", "Direction"] }
        ],
        business: [
            { title: "Product Manager", salary: "$90K - $160K+", desc: "Lead product strategy and work with engineers and designers to build products users love.", skills: ["Strategy", "Communication", "Analytics"] },
            { title: "Management Consultant", salary: "$80K - $150K+", desc: "Help organizations solve complex business challenges and improve performance.", skills: ["Analysis", "Presentation", "Problem Solving"] },
            { title: "Marketing Manager", salary: "$65K - $120K+", desc: "Develop and execute marketing strategies that build brands and drive revenue growth.", skills: ["Digital Marketing", "Analytics", "Leadership"] }
        ],
        healthcare: [
            { title: "Registered Nurse", salary: "$60K - $110K+", desc: "Provide direct patient care and make a tangible difference in people's lives every day.", skills: ["Patient Care", "Critical Thinking", "Empathy"] },
            { title: "Physical Therapist", salary: "$70K - $100K+", desc: "Help patients recover mobility and manage pain through personalized treatment plans.", skills: ["Anatomy", "Exercise Science", "Communication"] },
            { title: "Health Informatics Specialist", salary: "$65K - $120K+", desc: "Bridge healthcare and technology to improve patient outcomes through data systems.", skills: ["Data Management", "Healthcare IT", "Analytics"] }
        ],
        analytical: [
            { title: "Financial Analyst", salary: "$65K - $120K+", desc: "Evaluate financial data and trends to guide investment decisions and business strategy.", skills: ["Financial Modeling", "Excel", "Analysis"] },
            { title: "Research Scientist", salary: "$70K - $130K+", desc: "Conduct experiments and analyze results to advance knowledge in your chosen field.", skills: ["Research Methods", "Data Analysis", "Writing"] },
            { title: "Actuary", salary: "$75K - $150K+", desc: "Use mathematics and statistics to assess risk and help businesses make informed decisions.", skills: ["Statistics", "Risk Analysis", "Modeling"] }
        ],
        social: [
            { title: "Human Resources Manager", salary: "$65K - $120K+", desc: "Shape company culture, attract talent, and support employee development and well-being.", skills: ["Communication", "Conflict Resolution", "Strategy"] },
            { title: "School Counselor", salary: "$50K - $80K+", desc: "Guide students through academic and personal challenges to help them reach their potential.", skills: ["Counseling", "Empathy", "Communication"] },
            { title: "Public Relations Specialist", salary: "$55K - $100K+", desc: "Manage public perception and communications for organizations and public figures.", skills: ["Writing", "Media Relations", "Crisis Management"] }
        ],
        entrepreneurial: [
            { title: "Startup Founder", salary: "Variable", desc: "Turn innovative ideas into businesses. High risk but potentially high reward for self-starters.", skills: ["Leadership", "Fundraising", "Adaptability"] },
            { title: "Freelance Consultant", salary: "$50K - $200K+", desc: "Leverage your expertise to help multiple clients while enjoying flexibility and autonomy.", skills: ["Expertise", "Networking", "Self-Management"] },
            { title: "E-Commerce Entrepreneur", salary: "Variable", desc: "Build and scale online businesses selling products or services to a global audience.", skills: ["Digital Marketing", "Operations", "Analytics"] }
        ],
        trades: [
            { title: "Electrician", salary: "$45K - $95K+", desc: "Install and maintain electrical systems in residential, commercial, and industrial settings.", skills: ["Electrical Systems", "Problem Solving", "Safety"] },
            { title: "HVAC Technician", salary: "$40K - $80K+", desc: "Install, repair, and maintain heating, ventilation, and cooling systems.", skills: ["Mechanical Skills", "Troubleshooting", "Customer Service"] },
            { title: "Construction Manager", salary: "$70K - $120K+", desc: "Oversee construction projects from planning to completion, managing teams and budgets.", skills: ["Project Management", "Leadership", "Budgeting"] }
        ],
        practical: [
            { title: "Civil Engineer", salary: "$65K - $120K+", desc: "Design and oversee construction of infrastructure like bridges, roads, and buildings.", skills: ["Engineering", "CAD", "Project Management"] },
            { title: "Dental Hygienist", salary: "$55K - $85K+", desc: "Provide preventive dental care and educate patients on oral health with great work-life balance.", skills: ["Clinical Skills", "Patient Care", "Detail-Oriented"] },
            { title: "Logistics Coordinator", salary: "$45K - $75K+", desc: "Manage supply chains and ensure goods move efficiently from point A to point B.", skills: ["Organization", "Problem Solving", "Communication"] }
        ],
        research: [
            { title: "Biomedical Researcher", salary: "$65K - $120K+", desc: "Conduct research to develop new treatments, drugs, and medical technologies.", skills: ["Lab Techniques", "Analysis", "Scientific Writing"] },
            { title: "Environmental Scientist", salary: "$55K - $100K+", desc: "Study the environment and develop solutions to ecological challenges and climate issues.", skills: ["Field Research", "Data Analysis", "GIS"] },
            { title: "Market Research Analyst", salary: "$55K - $95K+", desc: "Analyze market conditions to help companies understand demand and competitive landscapes.", skills: ["Survey Design", "Statistics", "Reporting"] }
        ],
        education: [
            { title: "Instructional Designer", salary: "$55K - $95K+", desc: "Create engaging learning experiences and curricula for schools, companies, and online platforms.", skills: ["Curriculum Design", "EdTech", "Communication"] },
            { title: "Corporate Trainer", salary: "$50K - $85K+", desc: "Develop and deliver training programs that help employees build new skills and grow.", skills: ["Presentation", "Facilitation", "Learning Design"] },
            { title: "University Professor", salary: "$60K - $130K+", desc: "Teach, mentor students, and contribute to knowledge through research and publication.", skills: ["Expertise", "Research", "Communication"] }
        ]
    };

    let currentQuestion = 0;
    let answers = [];
    const quizContainer = document.getElementById('quizContainer');
    const resultsContainer = document.getElementById('resultsContainer');

    if (!quizContainer) return;

    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const questionDiv = document.getElementById('quizQuestion');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const resultsGrid = document.getElementById('resultsGrid');
    const retakeBtn = document.getElementById('retakeBtn');

    function renderQuestion() {
        const q = questions[currentQuestion];
        const pct = ((currentQuestion + 1) / questions.length) * 100;
        progressFill.style.width = pct + '%';
        progressText.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;

        let html = `<h2>${q.text}</h2><div class="quiz-options">`;
        q.options.forEach((opt, i) => {
            const selected = answers[currentQuestion] === i ? 'selected' : '';
            html += `<button class="quiz-option ${selected}" data-index="${i}">${opt.text}</button>`;
        });
        html += '</div>';
        questionDiv.innerHTML = html;

        questionDiv.querySelectorAll('.quiz-option').forEach(btn => {
            btn.addEventListener('click', () => {
                answers[currentQuestion] = parseInt(btn.dataset.index);
                questionDiv.querySelectorAll('.quiz-option').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                nextBtn.disabled = false;
            });
        });

        prevBtn.disabled = currentQuestion === 0;
        nextBtn.disabled = answers[currentQuestion] === undefined;

        if (currentQuestion === questions.length - 1) {
            nextBtn.innerHTML = '<span>See Results</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
        } else {
            nextBtn.innerHTML = '<span>Next</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
        }
    }

    function calculateResults() {
        const tagCounts = {};
        answers.forEach((ansIdx, qIdx) => {
            const tags = questions[qIdx].options[ansIdx].tags;
            tags.forEach(tag => { tagCounts[tag] = (tagCounts[tag] || 0) + 1; });
        });

        const sorted = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);
        const topCategories = sorted.slice(0, 3).map(e => e[0]);

        const results = [];
        const seen = new Set();
        topCategories.forEach((cat, catIdx) => {
            if (careers[cat]) {
                careers[cat].forEach(career => {
                    if (!seen.has(career.title)) {
                        seen.add(career.title);
                        const matchPct = Math.max(92 - catIdx * 8 - results.length * 2, 70);
                        results.push({ ...career, match: matchPct, category: cat });
                    }
                });
            }
        });

        return results.slice(0, 6);
    }

    function showResults() {
        const results = calculateResults();
        const colors = ['#667eea', '#f5576c', '#43e97b', '#4facfe', '#fa709a', '#a18cd1'];

        resultsGrid.innerHTML = results.map((r, i) => `
            <div class="result-card">
                <span class="match-badge" style="background: ${colors[i % colors.length]}20; color: ${colors[i % colors.length]}">${r.match}% Match</span>
                <h3>${r.title}</h3>
                <div class="career-salary">${r.salary}</div>
                <p>${r.desc}</p>
                <div class="career-skills">${r.skills.map(s => `<span>${s}</span>`).join('')}</div>
            </div>
        `).join('');

        quizContainer.classList.add('hidden');
        resultsContainer.classList.remove('hidden');
        window.scrollTo({ top: resultsContainer.offsetTop - 100, behavior: 'smooth' });
    }

    nextBtn.addEventListener('click', () => {
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            renderQuestion();
        } else {
            showResults();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentQuestion > 0) {
            currentQuestion--;
            renderQuestion();
        }
    });

    retakeBtn.addEventListener('click', () => {
        currentQuestion = 0;
        answers = [];
        resultsContainer.classList.add('hidden');
        quizContainer.classList.remove('hidden');
        renderQuestion();
        window.scrollTo({ top: quizContainer.offsetTop - 100, behavior: 'smooth' });
    });

    renderQuestion();
});
