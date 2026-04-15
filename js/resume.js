document.addEventListener('DOMContentLoaded', () => {
    const resumePage = document.getElementById('resumePage');
    if (!resumePage) return;

    const fields = ['fullName', 'jobTitle', 'email', 'phone', 'location', 'website', 'summary', 'skills'];
    let currentTemplate = 'modern';

    // Template selection
    document.querySelectorAll('.template-option').forEach(opt => {
        opt.addEventListener('click', () => {
            document.querySelectorAll('.template-option').forEach(o => o.classList.remove('active'));
            opt.classList.add('active');
            currentTemplate = opt.querySelector('input').value;
            updatePreview();
        });
    });

    // Add experience
    document.getElementById('addExperience').addEventListener('click', () => {
        const list = document.getElementById('experienceList');
        const idx = list.children.length;
        const entry = document.createElement('div');
        entry.className = 'experience-entry';
        entry.dataset.index = idx;
        entry.innerHTML = `
            <div class="form-grid">
                <div class="form-group"><label>Job Title *</label><input type="text" class="exp-title" placeholder="e.g. Senior Developer"></div>
                <div class="form-group"><label>Company *</label><input type="text" class="exp-company" placeholder="e.g. Acme Corp"></div>
                <div class="form-group"><label>Start Date</label><input type="text" class="exp-start" placeholder="e.g. Jan 2020"></div>
                <div class="form-group"><label>End Date</label><input type="text" class="exp-end" placeholder="e.g. Present"></div>
            </div>
            <div class="form-group full-width"><label>Key Achievements (one per line)</label><textarea class="exp-achievements" rows="3" placeholder="e.g. Led team of 5 engineers..."></textarea></div>`;
        list.appendChild(entry);
        bindInputListeners(entry);
    });

    // Add education
    document.getElementById('addEducation').addEventListener('click', () => {
        const list = document.getElementById('educationList');
        const idx = list.children.length;
        const entry = document.createElement('div');
        entry.className = 'education-entry';
        entry.dataset.index = idx;
        entry.innerHTML = `
            <div class="form-grid">
                <div class="form-group"><label>Degree *</label><input type="text" class="edu-degree" placeholder="e.g. B.S. Computer Science"></div>
                <div class="form-group"><label>School *</label><input type="text" class="edu-school" placeholder="e.g. State University"></div>
                <div class="form-group"><label>Year</label><input type="text" class="edu-year" placeholder="e.g. 2018"></div>
                <div class="form-group"><label>Details (optional)</label><input type="text" class="edu-details" placeholder="e.g. GPA: 3.8, Dean's List"></div>
            </div>`;
        list.appendChild(entry);
        bindInputListeners(entry);
    });

    function getVal(id) {
        const el = document.getElementById(id);
        return el ? el.value.trim() : '';
    }

    function getExperiences() {
        return Array.from(document.querySelectorAll('.experience-entry')).map(entry => ({
            title: entry.querySelector('.exp-title')?.value.trim() || '',
            company: entry.querySelector('.exp-company')?.value.trim() || '',
            start: entry.querySelector('.exp-start')?.value.trim() || '',
            end: entry.querySelector('.exp-end')?.value.trim() || '',
            achievements: (entry.querySelector('.exp-achievements')?.value || '').split('\n').filter(a => a.trim())
        })).filter(e => e.title || e.company);
    }

    function getEducation() {
        return Array.from(document.querySelectorAll('.education-entry')).map(entry => ({
            degree: entry.querySelector('.edu-degree')?.value.trim() || '',
            school: entry.querySelector('.edu-school')?.value.trim() || '',
            year: entry.querySelector('.edu-year')?.value.trim() || '',
            details: entry.querySelector('.edu-details')?.value.trim() || ''
        })).filter(e => e.degree || e.school);
    }

    function getSkills() {
        return getVal('skills').split(',').map(s => s.trim()).filter(Boolean);
    }

    function hasContent() {
        return getVal('fullName') || getVal('jobTitle') || getVal('email') || getVal('summary') || getExperiences().length || getEducation().length || getSkills().length;
    }

    function buildContactHTML(data) {
        const items = [];
        if (data.email) items.push(`<span>${data.email}</span>`);
        if (data.phone) items.push(`<span>${data.phone}</span>`);
        if (data.location) items.push(`<span>${data.location}</span>`);
        if (data.website) items.push(`<span>${data.website}</span>`);
        return items.join('');
    }

    function buildExpHTML(experiences) {
        return experiences.map(exp => {
            const dates = [exp.start, exp.end].filter(Boolean).join(' - ');
            const achievements = exp.achievements.length ? `<ul class="exp-achievements">${exp.achievements.map(a => `<li>${escapeHTML(a)}</li>`).join('')}</ul>` : '';
            return `<div class="exp-item"><div class="exp-header"><span class="exp-role">${escapeHTML(exp.title)}</span><span class="exp-dates">${escapeHTML(dates)}</span></div><div class="exp-company-name">${escapeHTML(exp.company)}</div>${achievements}</div>`;
        }).join('');
    }

    function buildEduHTML(education) {
        return education.map(edu => {
            const details = edu.details ? `<div class="edu-details">${escapeHTML(edu.details)}</div>` : '';
            return `<div class="edu-item"><span class="edu-degree">${escapeHTML(edu.degree)}</span> <span class="edu-year">${escapeHTML(edu.year)}</span><div class="edu-school-name">${escapeHTML(edu.school)}</div>${details}</div>`;
        }).join('');
    }

    function buildSkillsHTML(skills) {
        return `<div class="skills-list">${skills.map(s => `<span>${escapeHTML(s)}</span>`).join('')}</div>`;
    }

    function escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function updatePreview() {
        if (!hasContent()) {
            resumePage.className = 'resume-page';
            resumePage.innerHTML = '<div class="resume-placeholder"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" stroke-width="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg><p>Start filling in your details to see your resume come to life!</p></div>';
            return;
        }

        const data = {
            name: getVal('fullName') || 'Your Name',
            title: getVal('jobTitle'),
            email: getVal('email'),
            phone: getVal('phone'),
            location: getVal('location'),
            website: getVal('website'),
            summary: getVal('summary')
        };
        const experiences = getExperiences();
        const education = getEducation();
        const skills = getSkills();

        const contactHTML = buildContactHTML(data);
        const summarySection = data.summary ? `<div class="section-title">Summary</div><div class="resume-summary">${escapeHTML(data.summary)}</div>` : '';
        const expSection = experiences.length ? `<div class="section-title">Experience</div>${buildExpHTML(experiences)}` : '';
        const eduSection = education.length ? `<div class="section-title">Education</div>${buildEduHTML(education)}` : '';
        const skillsSection = skills.length ? `<div class="section-title">Skills</div>${buildSkillsHTML(skills)}` : '';

        if (currentTemplate === 'bold') {
            resumePage.className = 'resume-page bold';
            resumePage.innerHTML = `
                <div class="resume-sidebar">
                    <div class="resume-top"><div class="resume-name">${escapeHTML(data.name)}</div>${data.title ? `<div class="resume-title">${escapeHTML(data.title)}</div>` : ''}</div>
                    <div class="section-title">Contact</div><div class="resume-contact">${contactHTML}</div>
                    ${eduSection}${skillsSection}
                </div>
                <div class="resume-main">${summarySection}${expSection}</div>`;
        } else {
            resumePage.className = `resume-page ${currentTemplate}`;
            const titleHTML = data.title ? `<div class="resume-title">${escapeHTML(data.title)}</div>` : '';
            resumePage.innerHTML = `
                <div class="resume-top"><div class="resume-name">${escapeHTML(data.name)}</div>${titleHTML}<div class="resume-contact">${contactHTML}</div></div>
                ${summarySection}${expSection}${eduSection}${skillsSection}`;
        }
    }

    function bindInputListeners(container) {
        container.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', updatePreview);
        });
    }

    // Bind all initial inputs
    fields.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', updatePreview);
    });
    document.querySelectorAll('.experience-entry, .education-entry').forEach(bindInputListeners);

    // Download as HTML file
    document.getElementById('downloadBtn').addEventListener('click', () => {
        if (!hasContent()) { alert('Please fill in some details first!'); return; }
        updatePreview();
        const htmlContent = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Resume - ${escapeHTML(getVal('fullName') || 'Resume')}</title><style>body{font-family:'Segoe UI',Arial,sans-serif;max-width:800px;margin:0 auto;padding:40px;color:#1e293b;line-height:1.5;font-size:11pt}${getDownloadCSS()}</style></head><body>${resumePage.innerHTML}</body></html>`;
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `${(getVal('fullName') || 'resume').replace(/\s+/g, '_')}_resume.html`;
        a.click();
        URL.revokeObjectURL(a.href);
    });

    function getDownloadCSS() {
        return `.resume-name{font-size:24pt;font-weight:800;margin:0}.resume-title{font-size:11pt;color:#667eea;font-weight:600;margin:2px 0 6px}.resume-contact{font-size:9pt;color:#64748b;display:flex;flex-wrap:wrap;gap:8px}.resume-contact span::before{content:'';display:inline-block;width:4px;height:4px;border-radius:50%;background:#cbd5e1;margin-right:8px;vertical-align:middle}.resume-contact span:first-child::before{display:none}.resume-top{border-bottom:3px solid #667eea;padding-bottom:12px;margin-bottom:16px}.section-title{font-size:10pt;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#667eea;border-bottom:1px solid #e2e8f0;padding-bottom:4px;margin:16px 0 8px}.resume-summary{font-size:10pt;color:#475569}.exp-item{margin-bottom:12px}.exp-header{display:flex;justify-content:space-between}.exp-role{font-weight:700;font-size:10.5pt}.exp-dates{font-size:9pt;color:#94a3b8}.exp-company-name{font-size:10pt;color:#64748b;font-style:italic}.exp-achievements{padding-left:18px;margin-top:4px}.exp-achievements li{font-size:9.5pt;color:#475569;margin-bottom:2px}.edu-item{margin-bottom:6px}.edu-degree{font-weight:700}.edu-school-name{font-size:10pt;color:#64748b}.edu-year{font-size:9pt;color:#94a3b8}.edu-details{font-size:9pt;color:#64748b}.skills-list{display:flex;flex-wrap:wrap;gap:6px}.skills-list span{padding:3px 12px;background:#eef2ff;border-radius:50px;font-size:9pt;color:#667eea}@media print{body{padding:0.5in}}`;
    }

    // Print
    document.getElementById('printBtn').addEventListener('click', () => {
        if (!hasContent()) { alert('Please fill in some details first!'); return; }
        window.print();
    });
});
