const STORAGE_KEY = "careerLaunch90DayPlan.v1";

const phases = [
  {
    id: "phase1",
    label: "Phase 1",
    title: "Get the facts and define transfer reality",
    days: "Days 1-14",
    dates: "",
    summary: "Confirm credits, GPA, math, prior CS coursework, online fit, and the true requirements for both target paths.",
    weeks: [
      {
        title: "Week 1 - Baseline and document gathering",
        objective: "Create your clean transfer baseline so every future decision is grounded in facts.",
        tasks: [
          "Gather unofficial transcripts from every college attended.",
          "Enter current credits, GPA, math status, and CS/programming status in this planner and the decision board.",
          "Create a folder for transcripts, program pages, advisor emails, and application notes.",
          "List every course that might count toward general education, math, business, CS, MIS, or electives.",
          "Write a one-paragraph career direction statement: software builder, tech-business analyst, or still deciding."
        ],
        deliverable: "Personal transfer reality baseline completed."
      },
      {
        title: "Week 2 - Program and requirement mapping",
        objective: "Translate UNC Charlotte and ECU requirements into a practical checklist.",
        tasks: [
          "Map UNC Charlotte transfer requirements: 24+ transferable credits, 2.5+ GPA, C or higher in attempted CS courses, and college algebra equivalent with C or better.",
          "Map ECU transfer requirements: 24 transferable hours and 2.0+ GPA to apply.",
          "Map ECU MIS declaration requirements: 45 hours, 2.5 overall GPA, and required declaration courses with C- or higher.",
          "Mark requirements as met, not met, in progress, or advisor-confirmation needed.",
          "Update the decision board scores for transfer/admission practicality and completion probability."
        ],
        deliverable: "Transfer requirement map for UNC Charlotte and ECU."
      }
    ]
  },
  {
    id: "phase2",
    label: "Phase 2",
    title: "Advisor outreach, applications, and decision pressure test",
    days: "Days 15-28",
    summary: "Use school contact, transcript review, and deadlines to make the plan real rather than theoretical.",
    weeks: [
      {
        title: "Week 3 - Advisor contact and credit questions",
        objective: "Get human confirmation on the questions that determine whether each path is realistic.",
        tasks: [
          "Send UNC Charlotte questions about transfer fit, online format, math readiness, CS course expectations, and likely remaining requirements.",
          "Send ECU questions about MIS online completion, declaration courses, advisor review, and transfer evaluation process.",
          "Use UNC Charlotte transfer tools or advisor guidance to estimate course transfer outcomes.",
          "Create a question log with answer, source, date, and confidence level.",
          "Update the decision board after each advisor answer."
        ],
        deliverable: "Advisor question log started with at least two outreach attempts."
      },
      {
        title: "Week 4 - Application packet and path ranking",
        objective: "Prepare to apply or decide whether Spring 2027 is the smarter target.",
        tasks: [
          "If targeting Fall 2026, submit or finish UNC Charlotte application before July 1 and request documents before July 15.",
          "If keeping ECU MIS active, submit or finish ECU transfer application before July 6.",
          "Prepare a simple resume focused on work, school, technology exposure, and transferable skills.",
          "Choose current ranking: primary target, backup path, and delay/fallback path.",
          "Write a brief decision memo explaining why your ranking changed or stayed the same."
        ],
        deliverable: "Application packet prepared and current top-two degree path ranking documented."
      }
    ]
  },
  {
    id: "phase3",
    label: "Phase 3",
    title: "Technical skill sprint",
    days: "Days 29-56",
    summary: "Build enough hands-on ability to make a portfolio project and test whether software, MIS, or a bridge path fits you best.",
    weeks: [
      {
        title: "Week 5 - Setup and fundamentals",
        objective: "Create the basic technical workspace and refresh fundamentals.",
        tasks: [
          "Choose Track A, B, or C from the skill sprint menu.",
          "Create or clean up a GitHub account and project folder structure.",
          "Practice basic HTML/CSS/JavaScript or SQL for at least three short sessions.",
          "Use AI as a tutor: ask for explanations, examples, and debugging help, but write notes in your own words.",
          "Start a learning log with what you practiced, what confused you, and what clicked."
        ],
        deliverable: "Technical workspace ready and learning log started."
      },
      {
        title: "Week 6 - Small build or analysis exercise",
        objective: "Create a tiny working artifact rather than only watching tutorials.",
        tasks: [
          "Build a one-page web layout or small SQL/spreadsheet analysis related to degree comparison.",
          "Practice turning a vague user need into 5-8 concrete requirements.",
          "Document the requirements for the AI Degree Finder MVP.",
          "Identify the data fields your project needs: program, cost, credits, GPA, deadlines, fit scores, notes.",
          "Update your degree-path decision board based on what the project reveals."
        ],
        deliverable: "Tiny prototype or analysis exercise completed."
      },
      {
        title: "Week 7 - Data, scoring, and requirements",
        objective: "Design the logic behind the portfolio project.",
        tasks: [
          "Create the scoring categories and weights for the AI Degree Finder.",
          "Create sample program records for UNC Charlotte, ECU MIS, and one other option.",
          "Build or sketch the ranking formula.",
          "Create a list of input fields for personal transfer reality.",
          "Write a short explanation of why each scoring category matters."
        ],
        deliverable: "Project data model and scoring logic drafted."
      },
      {
        title: "Week 8 - MVP build sprint",
        objective: "Turn the project design into a simple working version.",
        tasks: [
          "Build the first version of the AI Degree Finder as a spreadsheet or HTML tool.",
          "Make scores editable and make the ranking update automatically.",
          "Add fields for credits, GPA, math, CS status, and target term.",
          "Add a notes section for advisor answers and unresolved questions.",
          "Save screenshots or notes showing progress."
        ],
        deliverable: "AI Degree Finder MVP version 0.1 created."
      }
    ]
  },
  {
    id: "phase4",
    label: "Phase 4",
    title: "Portfolio, advising follow-up, and final decision",
    days: "Days 57-90",
    summary: "Polish the project, close open school questions, and convert the decision into next-term action.",
    weeks: [
      {
        title: "Week 9 - Portfolio project structure",
        objective: "Make the project understandable to someone besides you.",
        tasks: [
          "Write the project purpose: who it helps, what decision it supports, and what data it uses.",
          "Organize the project into sections: inputs, program cards, scoring, ranking, notes, export/print.",
          "Add a clear README outline or project summary.",
          "Make a list of bugs, missing features, and nice-to-have features.",
          "Choose what will count as done for version 1."
        ],
        deliverable: "Portfolio project structure and README outline."
      },
      {
        title: "Week 10 - Project polish and proof",
        objective: "Improve the MVP enough that it can be shown as evidence of initiative.",
        tasks: [
          "Polish layout, labels, and instructions so the tool is easy to understand.",
          "Add local saving, JSON export/import, or a print-to-PDF view if feasible.",
          "Test the tool by entering your real or placeholder transfer reality.",
          "Write a short case-study paragraph about the problem and solution.",
          "Capture screenshots or a short demo walkthrough."
        ],
        deliverable: "Portfolio project version 1 close to showable."
      },
      {
        title: "Week 11 - Advising follow-up and financial reality",
        objective: "Close the remaining school, cost, and schedule gaps.",
        tasks: [
          "Follow up with advisors on any unanswered transfer or program-fit questions.",
          "Confirm tuition/fee assumptions, financial aid tasks, and residency questions.",
          "Estimate remaining credits and likely graduation timeline for each top path.",
          "Update degree-path scorecard with final transfer, cost, and completion information.",
          "Create a one-page summary of your top path and backup."
        ],
        deliverable: "Updated cost/timeline/advising summary."
      },
      {
        title: "Week 12 - Final decision rehearsal",
        objective: "Make the decision before the final week so the final week can become execution.",
        tasks: [
          "Run the decision rules: builder path, MIS path, other option, or delayed start.",
          "Compare your actual behavior: which tasks gave energy and which drained energy?",
          "Choose the most realistic next academic action for the coming term.",
          "Choose the next skill habit to maintain after the 90 days.",
          "Prepare a final 90-day review note for yourself."
        ],
        deliverable: "Final decision rehearsal completed."
      },
      {
        title: "Final days - Commit and set the next 30 days",
        objective: "Turn the 90-day plan into the next concrete plan.",
        tasks: [
          "Export the decision board and this plan to PDF as snapshots.",
          "Save JSON backups of both living files.",
          "Write the final decision: primary path, backup path, next school action, next skill action.",
          "Schedule the next advisor/application/registration task.",
          "Create a simple 30-day continuation plan."
        ],
        deliverable: "Final 90-day snapshot and next 30-day continuation plan."
      }
    ]
  }
];

function fmtDate(date) {
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

function addDays(date, days) {
  const d = new Date(date.getTime());
  d.setDate(d.getDate() + days);
  return d;
}

function parseStartDate() {
  const raw = document.getElementById('startDate').value || '2026-05-29';
  const [y,m,d] = raw.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function buildTimeline() {
  const timeline = document.getElementById('timeline');
  timeline.innerHTML = '';
  let weekIndex = 0;
  phases.forEach((phase, phaseIndex) => {
    const phaseDiv = document.createElement('section');
    phaseDiv.className = 'lp-phase-band';
    phaseDiv.id = phase.id;
    if (phaseIndex === 2) phaseDiv.classList.add('page-break');

    phaseDiv.innerHTML = `
      <div class="lp-phase-head">
        <div class="phase-title">
          <span>${phase.label} - ${phase.days}</span>
          <h3>${phase.title}</h3>
          <p class="lp-muted">${phase.summary}</p>
        </div>
        <div class="lp-badge-row"><span class="lp-badge accent" data-phase-date="${phase.id}"></span><span class="lp-badge" data-phase-progress="${phase.id}">0%</span></div>
      </div>
      <div class="lp-week-grid"></div>
    `;
    const grid = phaseDiv.querySelector('.lp-week-grid');
    phase.weeks.forEach((week, localIndex) => {
      const currentWeek = weekIndex;
      const card = document.createElement('article');
      card.className = 'lp-week-card';
      card.dataset.week = currentWeek;
      const taskRows = week.tasks.map((task, taskIndex) => {
        const id = `week-${currentWeek}-task-${taskIndex}`;
        return `<li class="lp-task-row"><input type="checkbox" data-week-task="${id}" aria-label="Complete task" /><span class="lp-task-text" data-edit="${id}" contenteditable="true">${task}</span></li>`;
      }).join('');
      card.innerHTML = `
        <div class="lp-week-top">
          <div class="lp-week-title-block">
            <h3 data-edit="week-${currentWeek}-title" contenteditable="true">${week.title}</h3>
            <div class="lp-week-dates" data-week-date="${currentWeek}"></div>
          </div>
          <select data-save="week-${currentWeek}-status" aria-label="Week status">
            <option>Not started</option>
            <option>In progress</option>
            <option>Complete</option>
            <option>Blocked</option>
            <option>Skipped / revised</option>
          </select>
        </div>
        <div class="lp-week-body">
          <div class="lp-objective" data-edit="week-${currentWeek}-objective" contenteditable="true">${week.objective}</div>
          <ul class="lp-tasks">${taskRows}</ul>
          <div class="lp-deliverable"><strong>Deliverable</strong><div class="lp-editable-box" data-edit="week-${currentWeek}-deliverable" contenteditable="true">${week.deliverable}</div></div>
          <div>
            <label for="week-${currentWeek}-notes">Notes / evidence / links</label>
            <textarea id="week-${currentWeek}-notes" class="lp-notes-area" data-save="week-${currentWeek}-notes" placeholder="Add what you did, what you learned, advisor answers, blockers, or links."></textarea>
          </div>
          <button class="lp-small-btn no-print" type="button" data-add-task="${currentWeek}">Add custom task</button>
        </div>
      `;
      grid.appendChild(card);
      weekIndex++;
    });
    timeline.appendChild(phaseDiv);
  });
}

function getStored() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
  catch { return {}; }
}

function setStored(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  const status = document.getElementById('savedStatus');
  if (status) status.textContent = 'Saved ' + new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  const badge = document.getElementById('savedBadge');
  if (badge) badge.textContent = 'Saved ' + new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

function saveField(key, value) {
  const data = getStored();
  data[key] = value;
  setStored(data);
}

function loadAll() {
  const data = getStored();
  document.querySelectorAll('[data-save]').forEach(el => {
    const key = el.dataset.save;
    if (data[key] !== undefined) el.value = data[key];
  });
  document.querySelectorAll('[data-task]').forEach(el => {
    const key = 'task:' + el.dataset.task;
    if (data[key] !== undefined) el.checked = !!data[key];
  });
  document.querySelectorAll('[data-week-task]').forEach(el => {
    const key = 'task:' + el.dataset.weekTask;
    if (data[key] !== undefined) el.checked = !!data[key];
  });
  document.querySelectorAll('[data-edit]').forEach(el => {
    const key = 'edit:' + el.dataset.edit;
    if (data[key] !== undefined) el.innerHTML = data[key];
  });
  Object.keys(data).filter(k => k.startsWith('customTasks:')).forEach(key => {
    const week = key.split(':')[1];
    const tasks = Array.isArray(data[key]) ? data[key] : [];
    tasks.forEach(task => addTaskToWeek(week, task.id, task.text, !!task.checked, false));
  });
  refreshEverything();
}

function saveAllEdits() {
  document.querySelectorAll('[data-edit]').forEach(el => saveField('edit:' + el.dataset.edit, el.innerHTML));
}

function addTaskToWeek(week, id, text, checked=false, persist=true) {
  const card = document.querySelector(`.lp-week-card[data-week="${week}"]`);
  if (!card) return;
  const list = card.querySelector('.lp-tasks');
  const li = document.createElement('li');
  li.className = 'lp-task-row custom-task';
  li.innerHTML = `<input type="checkbox" data-week-task="${id}" aria-label="Complete custom task" ${checked ? 'checked' : ''}/><span class="lp-task-text" data-edit="${id}" contenteditable="true">${text}</span>`;
  list.appendChild(li);
  attachDynamicListeners(li);
  if (persist) {
    const data = getStored();
    const key = 'customTasks:' + week;
    data[key] = Array.isArray(data[key]) ? data[key] : [];
    data[key].push({ id, text, checked });
    setStored(data);
  }
  refreshProgress();
}

function updateCustomTaskStore() {
  const data = getStored();
  Object.keys(data).filter(k => k.startsWith('customTasks:')).forEach(k => delete data[k]);
  document.querySelectorAll('.lp-week-card').forEach(card => {
    const week = card.dataset.week;
    const custom = Array.from(card.querySelectorAll('.custom-task')).map(li => {
      const cb = li.querySelector('[data-week-task]');
      const text = li.querySelector('[data-edit]');
      return { id: cb.dataset.weekTask, text: text.innerHTML, checked: cb.checked };
    });
    if (custom.length) data['customTasks:' + week] = custom;
  });
  setStored(data);
}

function attachDynamicListeners(root=document) {
  root.querySelectorAll('[data-save]').forEach(el => {
    if (el.dataset.bound) return;
    el.dataset.bound = '1';
    el.addEventListener('input', () => { saveField(el.dataset.save, el.value); refreshEverything(); });
    el.addEventListener('change', () => { saveField(el.dataset.save, el.value); refreshEverything(); });
  });
  root.querySelectorAll('[data-task]').forEach(el => {
    if (el.dataset.bound) return;
    el.dataset.bound = '1';
    el.addEventListener('change', () => { saveField('task:' + el.dataset.task, el.checked); refreshProgress(); });
  });
  root.querySelectorAll('[data-week-task]').forEach(el => {
    if (el.dataset.bound) return;
    el.dataset.bound = '1';
    el.addEventListener('change', () => {
      saveField('task:' + el.dataset.weekTask, el.checked);
      const row = el.closest('.lp-task-row');
      if (row) row.classList.toggle('done', el.checked);
      updateCustomTaskStore();
      refreshProgress();
    });
  });
  root.querySelectorAll('[data-edit]').forEach(el => {
    if (el.dataset.bound) return;
    el.dataset.bound = '1';
    el.addEventListener('input', () => {
      saveField('edit:' + el.dataset.edit, el.innerHTML);
      if (el.closest('.custom-task')) updateCustomTaskStore();
    });
  });
  root.querySelectorAll('[data-add-task]').forEach(btn => {
    if (btn.dataset.bound) return;
    btn.dataset.bound = '1';
    btn.addEventListener('click', () => {
      const week = btn.dataset.addTask;
      const text = window.prompt('Add a custom task for this week:');
      if (text && text.trim()) {
        const id = `custom-week-${week}-${Date.now()}`;
        addTaskToWeek(week, id, text.trim(), false, true);
      }
    });
  });
}

function updateDates() {
  const start = parseStartDate();
  const end = addDays(start, 89);
  document.getElementById('startDisplay').textContent = fmtDate(start);
  document.getElementById('endDisplay').textContent = fmtDate(end);
  let weekIndex = 0;
  phases.forEach((phase, phaseIndex) => {
    const phaseStartWeek = weekIndex;
    phase.weeks.forEach(() => {
      const ws = addDays(start, weekIndex * 7);
      const we = addDays(ws, weekIndex === 12 ? 5 : 6);
      const el = document.querySelector(`[data-week-date="${weekIndex}"]`);
      if (el) el.textContent = `${fmtDate(ws)} - ${fmtDate(we)}`;
      weekIndex++;
    });
    const phaseEndWeek = weekIndex - 1;
    const ps = addDays(start, phaseStartWeek * 7);
    const pe = addDays(start, phaseEndWeek * 7 + (phaseEndWeek === 12 ? 5 : 6));
    const phaseEl = document.querySelector(`[data-phase-date="${phase.id}"]`);
    if (phaseEl) phaseEl.textContent = `${fmtDate(ps)} - ${fmtDate(pe)}`;
  });
}

function readinessItem(label, state) {
  const cls = state === true ? 'done' : state === false ? 'not' : 'unknown';
  const icon = state === true ? '✓' : state === false ? '!' : '?';
  return `<li class="${cls}"><span class="dot">${icon}</span><span>${label}</span></li>`;
}

function updateReadiness() {
  const creditsRaw = document.getElementById('currentCredits').value;
  const gpaRaw = document.getElementById('currentGpa').value;
  const credits = creditsRaw === '' ? null : Number(creditsRaw);
  const gpa = gpaRaw === '' ? null : Number(gpaRaw);
  const math = document.getElementById('mathStatus').value;
  const cs = document.getElementById('csStatus').value;

  const credit24 = credits === null ? null : credits >= 24;
  const credit45 = credits === null ? null : credits >= 45;
  const gpa25 = gpa === null ? null : gpa >= 2.5;
  const gpa20 = gpa === null ? null : gpa >= 2.0;
  const mathDone = math === 'Completed college algebra or higher with C or better' ? true : (math === 'Unknown' || math === 'Need advisor review' ? null : false);
  const csGood = cs === 'All attempted CS courses C or higher' || cs === 'Unknown / none attempted' ? true : (cs === 'Unknown / none attempted' ? null : (cs === 'Need advisor review' || cs === 'Currently enrolled' ? null : false));

  document.getElementById('unccCriteria').innerHTML = [
    readinessItem('24+ transferable credit hours for transfer consideration.', credit24),
    readinessItem('2.5+ cumulative GPA for B.A. Computer Science transfer requirement.', gpa25),
    readinessItem('College-level algebra equivalent completed with C or better.', mathDone),
    readinessItem('C or higher in all previously attempted CS courses, or none attempted yet.', csGood),
  ].join('');

  document.getElementById('ecuCriteria').innerHTML = [
    readinessItem('24 transferable hours and 2.0+ GPA to apply as an ECU transfer student.', credit24 && gpa20),
    readinessItem('45 semester hours for MIS major declaration.', credit45),
    readinessItem('2.5 overall GPA for MIS declaration.', gpa25),
    readinessItem('Declaration courses still need individual tracking: ACCT, ECON, FINA, math/stat, and MIS requirements.', null),
  ].join('');

  function setBadge(id, states) {
    const known = states.filter(v => v !== null);
    const ok = known.filter(Boolean).length;
    const badge = document.getElementById(id);
    badge.className = 'lp-badge';
    if (known.length === 0) {
      badge.textContent = 'Unknown';
    } else if (ok === states.length) {
      badge.textContent = 'Looks ready';
      badge.classList.add('good');
    } else if (ok >= Math.ceil(states.length / 2)) {
      badge.textContent = 'Partly ready';
      badge.classList.add('warning');
    } else {
      badge.textContent = 'Needs work';
      badge.classList.add('danger');
    }
  }
  setBadge('unccBadge', [credit24, gpa25, mathDone, csGood]);
  setBadge('ecuBadge', [credit24, gpa20, credit45, gpa25]);
}

function refreshProgress() {
  document.querySelectorAll('[data-week-task]').forEach(cb => {
    const row = cb.closest('.lp-task-row');
    if (row) row.classList.toggle('done', cb.checked);
  });
  const all = Array.from(document.querySelectorAll('[data-week-task], [data-task]'));
  const done = all.filter(el => el.checked).length;
  const percent = all.length ? Math.round(done / all.length * 100) : 0;
  document.getElementById('progressText').textContent = percent + '%';
  document.getElementById('progressFill').style.width = percent + '%';
  document.getElementById('taskDoneText').textContent = `${done} of ${all.length} tasks complete`;
  document.getElementById('roadmapCount').textContent = `${done} tasks complete`;

  phases.forEach(phase => {
    const card = document.getElementById(phase.id);
    if (!card) return;
    const tasks = Array.from(card.querySelectorAll('[data-week-task]'));
    const complete = tasks.filter(el => el.checked).length;
    const p = tasks.length ? Math.round(complete / tasks.length * 100) : 0;
    const el = document.querySelector(`[data-phase-progress="${phase.id}"]`);
    if (el) el.textContent = `${p}% complete`;
  });

  const start = parseStartDate();
  const today = new Date();
  today.setHours(0,0,0,0);
  const daysElapsed = Math.max(0, Math.floor((today - start) / (1000*60*60*24)) + 1);
  let phaseText = 'Phase 1';
  if (daysElapsed > 56) phaseText = 'Phase 4';
  else if (daysElapsed > 28) phaseText = 'Phase 3';
  else if (daysElapsed > 14) phaseText = 'Phase 2';
  document.getElementById('activePhaseText').textContent = phaseText;
}

function refreshEverything() {
  updateDates();
  updateReadiness();
  refreshProgress();
  document.getElementById('primaryGoalDisplay').textContent = document.getElementById('primaryPath').value || 'Choose and prepare';
}

function exportJson() {
  saveAllEdits();
  updateCustomTaskStore();
  const data = getStored();
  data._exportedAt = new Date().toISOString();
  data._planner = '90-Day Career Launch Plan';
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = '90_day_career_launch_plan_backup.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function importJson(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      location.reload();
    } catch (e) {
      alert('That JSON file could not be imported.');
    }
  };
  reader.readAsText(file);
}

document.addEventListener('DOMContentLoaded', () => {
  buildTimeline();
  attachDynamicListeners(document);
  loadAll();
  document.getElementById('printBtn').addEventListener('click', () => { saveAllEdits(); updateCustomTaskStore(); window.print(); });
  document.getElementById('exportBtn').addEventListener('click', exportJson);
  document.getElementById('importFile').addEventListener('change', e => { if (e.target.files[0]) importJson(e.target.files[0]); });
  document.getElementById('resetBtn').addEventListener('click', () => {
    if (confirm('Reset this planner in this browser? Export JSON first if you want a backup.')) {
      localStorage.removeItem(STORAGE_KEY);
      location.reload();
    }
  });
  refreshEverything();
});
