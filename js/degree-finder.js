const DF_STORAGE_KEY = "aiDegreeFinderPortfolioProject.v1";

const defaultState = {
  user: {
    credits: 24,
    gpa: 2.75,
    mathStatus: "planned",
    csStatus: "none",
    codingComfort: 3,
    weeklyHours: 8,
    desiredTrack: "balanced",
    startTerm: "Fall 2026",
    declarationCourses: 0,
    budgetSensitivity: 4,
    onlineNeed: 5,
    riskTolerance: 3,
    personalNotes: ""
  },
  weights: {
    career: 20,
    builder: 20,
    online: 15,
    transfer: 15,
    completion: 15,
    cost: 10,
    portfolio: 5
  },
  programs: [
    {
      id: "unc-ba-cs-ai-swe",
      include: true,
      name: "UNC Charlotte Online B.A. Computer Science — AI-Assisted Software Engineering",
      shortName: "UNC Charlotte AI SWE",
      track: "builder",
      delivery: "100% online / asynchronous",
      career: 5.0,
      builder: 5.0,
      online: 5.0,
      transfer: 4.0,
      completion: 3.5,
      cost: 4.5,
      portfolio: 5.0,
      aiFit: 5.0,
      businessFit: 3.5,
      managementFit: 3.5,
      difficulty: 4.2,
      notes: "Highest-upside technical builder path. Strong fit for software engineering, AI-assisted development, full-stack projects, databases, software architecture, and portfolio work.",
      roles: ["Software Engineer", "Full-Stack Developer", "AI/ML Developer", "Systems Analyst", "Technology Project Manager"],
      requirements: { minCredits: 24, minGpa: 2.5, algebra: true, csGradeC: true, ecuDeclaration: false },
      careerData: "BLS seed: software developers median $133,080; software developers projected growth 16% from 2024–2034."
    },
    {
      id: "ecu-bsba-mis",
      include: true,
      name: "ECU Online BSBA — Management Information Systems",
      shortName: "ECU MIS",
      track: "business",
      delivery: "Online BSBA concentration",
      career: 4.0,
      builder: 3.0,
      online: 5.0,
      transfer: 4.5,
      completion: 4.5,
      cost: 4.0,
      portfolio: 3.5,
      aiFit: 3.5,
      businessFit: 5.0,
      managementFit: 5.0,
      difficulty: 2.9,
      notes: "Safer business-technology path. Strong fit for systems analysis, business applications, IT project coordination, software project management, and future tech leadership.",
      roles: ["Computer Systems Analyst", "Business Analyst", "IT Project Coordinator", "Technology Consultant", "Future IT Manager"],
      requirements: { minCredits: 24, minGpa: 2.0, declareCredits: 45, declareGpa: 2.5, declareCourses: 8, ecuDeclaration: true },
      careerData: "BLS seed: computer systems analysts median $103,790; projected growth 9% from 2024–2034. IT managers median $171,200; projected growth 15%, typically with experience."
    },
    {
      id: "unc-bs-ai-watchlist",
      include: true,
      name: "UNC Charlotte B.S. Artificial Intelligence — Watchlist",
      shortName: "UNC Charlotte B.S. AI",
      track: "ai",
      delivery: "Verify delivery format",
      career: 5.0,
      builder: 4.5,
      online: 2.5,
      transfer: 3.5,
      completion: 2.8,
      cost: 4.2,
      portfolio: 5.0,
      aiFit: 5.0,
      businessFit: 2.5,
      managementFit: 3.0,
      difficulty: 5.0,
      notes: "High-upside AI/ML path but likely math-heavy. Watchlist option until delivery format and transfer fit are confirmed.",
      roles: ["AI/ML Developer", "Machine Learning Associate", "Data/AI Application Developer", "AI Systems Analyst"],
      requirements: { minCredits: 24, minGpa: 2.5, algebra: true, calculusLikely: true, csGradeC: true, ecuDeclaration: false },
      careerData: "Watchlist seed: AI degree launches Fall 2026; requires 120 credit hours and significant AI/math/computing coursework."
    },
    {
      id: "other-online-option",
      include: true,
      name: "Other Online AI / CS / MIS Option",
      shortName: "Other Option",
      track: "balanced",
      delivery: "To research",
      career: 3.8,
      builder: 3.8,
      online: 3.8,
      transfer: 3.5,
      completion: 3.6,
      cost: 3.5,
      portfolio: 3.8,
      aiFit: 3.5,
      businessFit: 3.5,
      managementFit: 3.5,
      difficulty: 3.5,
      notes: "Placeholder for another online program. Replace with a specific school once found.",
      roles: ["Depends on program"],
      requirements: { minCredits: 24, minGpa: 2.5, generic: true },
      careerData: "Use this row for a future researched option."
    }
  ]
};

let state = deepClone(defaultState);

function deepClone(obj) { return JSON.parse(JSON.stringify(obj)); }
function clamp(n, min, max) { return Math.max(min, Math.min(max, Number(n) || 0)); }
function round(n, places = 1) { return Number.parseFloat(n).toFixed(places); }
function formatPct(n) { return `${round(n, 1)}%`; }
function totalWeights() { return Object.values(state.weights).reduce((sum, n) => sum + (Number(n) || 0), 0) || 1; }

function showNotice(message) {
  const notice = document.getElementById("dfNotice");
  notice.textContent = message;
  notice.classList.add("show");
  clearTimeout(showNotice.timer);
  showNotice.timer = setTimeout(() => notice.classList.remove("show"), 1800);
}

function loadState() {
  const saved = localStorage.getItem(DF_STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      state = mergeDefaults(defaultState, parsed);
    } catch (err) {
      console.warn("Could not load saved data", err);
      state = deepClone(defaultState);
    }
  }
  renderAll();
}

function mergeDefaults(base, incoming) {
  const merged = deepClone(base);
  if (!incoming || typeof incoming !== "object") return merged;
  merged.user = { ...merged.user, ...(incoming.user || {}) };
  merged.weights = { ...merged.weights, ...(incoming.weights || {}) };
  if (Array.isArray(incoming.programs) && incoming.programs.length) {
    merged.programs = incoming.programs;
  }
  return merged;
}

function saveState(manual = false) {
  readUserInputs();
  localStorage.setItem(DF_STORAGE_KEY, JSON.stringify(state));
  if (manual) showNotice("Saved locally in this browser.");
}

function resetState() {
  if (!confirm("Reset this project to the original demo data? This clears saved edits in this browser.")) return;
  localStorage.removeItem(DF_STORAGE_KEY);
  state = deepClone(defaultState);
  renderAll();
  showNotice("Reset complete.");
}

function exportState() {
  readUserInputs();
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const stamp = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `ai-degree-finder-backup-${stamp}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  showNotice("JSON backup exported.");
}

function importState(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const imported = JSON.parse(e.target.result);
      state = mergeDefaults(defaultState, imported);
      saveState(false);
      renderAll();
      showNotice("Imported JSON backup.");
    } catch (err) {
      alert("That file could not be imported. Make sure it is a valid AI Degree Finder JSON backup.");
    }
  };
  reader.readAsText(file);
  event.target.value = "";
}

function bindUserInputs() {
  const map = Object.keys(state.user);
  map.forEach(function(key) {
    const el = document.getElementById(key);
    if (!el) return;
    el.addEventListener("input", function() { readUserInputs(); updateCalculatedViews(); persistSoon(); });
    el.addEventListener("change", function() { readUserInputs(); updateCalculatedViews(); persistSoon(); });
  });
}

let persistTimer;
function persistSoon() {
  clearTimeout(persistTimer);
  persistTimer = setTimeout(function() {
    localStorage.setItem(DF_STORAGE_KEY, JSON.stringify(state));
  }, 250);
}

function populateUserInputs() {
  Object.entries(state.user).forEach(function([key, val]) {
    const el = document.getElementById(key);
    if (!el) return;
    el.value = val;
  });
}

function readUserInputs() {
  const numKeys = new Set(["credits", "gpa", "codingComfort", "weeklyHours", "declarationCourses", "budgetSensitivity", "onlineNeed", "riskTolerance"]);
  Object.keys(state.user).forEach(function(key) {
    const el = document.getElementById(key);
    if (!el) return;
    state.user[key] = numKeys.has(key) ? Number(el.value) : el.value;
  });
}

function renderWeights() {
  const labels = {
    career: "Career ceiling",
    builder: "Builder skill",
    online: "Online / life fit",
    transfer: "Transfer path",
    completion: "Completion odds",
    cost: "Cost / value",
    portfolio: "Portfolio value"
  };
  const grid = document.getElementById("weightsGrid");
  grid.innerHTML = Object.entries(state.weights).map(function([key, value]) {
    return `
      <div class="df-mini-card">
        <label for="weight-${key}">${labels[key] || key}</label>
        <input class="df-weight-input" id="weight-${key}" type="number" min="0" max="100" step="1" value="${value}" onchange="updateWeight('${key}', this.value)" oninput="updateWeight('${key}', this.value)">
      </div>
    `;
  }).join("");
}

function updateWeight(key, value) {
  state.weights[key] = Number(value) || 0;
  updateCalculatedViews();
  persistSoon();
}

function normalizeWeights() {
  const sum = totalWeights();
  Object.keys(state.weights).forEach(function(k) { state.weights[k] = Math.round((state.weights[k] / sum) * 100); });
  const diff = 100 - Object.values(state.weights).reduce(function(a, b) { return a + b; }, 0);
  state.weights.career += diff;
  renderWeights();
  updateCalculatedViews();
  persistSoon();
  showNotice("Weights normalized to 100.");
}

function renderProgramTable() {
  const body = document.getElementById("programTableBody");
  body.innerHTML = state.programs.map(function(p, idx) {
    return `
      <tr>
        <td><input type="checkbox" ${p.include ? "checked" : ""} onchange="updateProgram(${idx}, 'include', this.checked)"></td>
        <td><input value="${escapeAttr(p.name)}" onchange="updateProgram(${idx}, 'name', this.value)" oninput="updateProgram(${idx}, 'name', this.value, true)"></td>
        <td>
          <select onchange="updateProgram(${idx}, 'track', this.value)">
            ${["builder","business","ai","management","balanced"].map(function(t) { return `<option value="${t}" ${p.track === t ? "selected" : ""}>${titleCase(t)}</option>`; }).join("")}
          </select>
        </td>
        <td><input value="${escapeAttr(p.delivery)}" onchange="updateProgram(${idx}, 'delivery', this.value)" oninput="updateProgram(${idx}, 'delivery', this.value, true)"></td>
        ${["career","builder","online","transfer","completion","cost","portfolio","aiFit","businessFit","difficulty"].map(function(key) {
          return `<td><input class="df-score-input" type="number" min="1" max="5" step="0.1" value="${p[key]}" onchange="updateProgram(${idx}, '${key}', this.value)" oninput="updateProgram(${idx}, '${key}', this.value, true)"></td>`;
        }).join("")}
        <td><textarea onchange="updateProgram(${idx}, 'notes', this.value)" oninput="updateProgram(${idx}, 'notes', this.value, true)">${escapeHtml(p.notes || "")}</textarea></td>
        <td class="no-print"><button class="df-btn df-danger df-small" onclick="deleteProgram(${idx})" type="button">Delete</button></td>
      </tr>
    `;
  }).join("");
}

function updateProgram(idx, key, value, quiet) {
  quiet = quiet || false;
  var numericKeys = new Set(["career","builder","online","transfer","completion","cost","portfolio","aiFit","businessFit","managementFit","difficulty"]);
  if (numericKeys.has(key)) state.programs[idx][key] = clamp(value, 1, 5);
  else state.programs[idx][key] = value;
  if (!quiet) updateCalculatedViews();
  else updateCalculatedViews(false);
  persistSoon();
}

function addProgram() {
  var id = "custom-" + Date.now();
  state.programs.push({
    id: id,
    include: true,
    name: "New Online Program",
    shortName: "New Option",
    track: "balanced",
    delivery: "To research",
    career: 3, builder: 3, online: 3, transfer: 3, completion: 3, cost: 3, portfolio: 3,
    aiFit: 3, businessFit: 3, managementFit: 3, difficulty: 3,
    notes: "Add program notes, admissions requirements, source URLs, career role fit, and risks.",
    roles: ["To research"],
    requirements: { generic: true, minCredits: 24, minGpa: 2.5 },
    careerData: "Add career data."
  });
  renderProgramTable();
  updateCalculatedViews();
  persistSoon();
  showNotice("Program added.");
}

function deleteProgram(idx) {
  if (state.programs.length <= 1) return alert("Keep at least one program in the app.");
  if (!confirm("Delete this program row?")) return;
  state.programs.splice(idx, 1);
  renderProgramTable();
  updateCalculatedViews();
  persistSoon();
}

function titleCase(text) { return String(text).slice(0,1).toUpperCase() + String(text).slice(1); }
function escapeHtml(str) { return String(str).replace(/[&<>'"]/g, function(c) { return {'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]; }); }
function escapeAttr(str) { return escapeHtml(str).replace(/\n/g, " "); }

function calculateBaseScore(program) {
  var w = state.weights;
  var sum = totalWeights();
  var weighted = (program.career * w.career) + (program.builder * w.builder) + (program.online * w.online) + (program.transfer * w.transfer) + (program.completion * w.completion) + (program.cost * w.cost) + (program.portfolio * w.portfolio);
  return (weighted / (sum * 5)) * 100;
}

function calculatePreferenceFit(program) {
  var u = state.user;
  var fit = 70;
  if (u.desiredTrack === "builder") fit = (program.builder * 12) + (program.portfolio * 5) + (program.aiFit * 3);
  if (u.desiredTrack === "business") fit = (program.businessFit * 13) + (program.completion * 5) + (program.managementFit || 3) * 2;
  if (u.desiredTrack === "ai") fit = (program.aiFit * 14) + (program.builder * 5) + (program.portfolio * 1);
  if (u.desiredTrack === "management") fit = ((program.managementFit || 3) * 13) + (program.businessFit * 4) + (program.career * 3);
  if (u.desiredTrack === "balanced") fit = (program.career * 5) + (program.completion * 5) + (program.transfer * 4) + (program.online * 4) + (program.portfolio * 2);
  var onlineAdjustment = ((program.online - 3) * (u.onlineNeed || 3)) * 1.3;
  var budgetAdjustment = ((program.cost - 3) * (u.budgetSensitivity || 3)) * 1.0;
  var codingMismatch = (u.codingComfort <= 2 && program.builder >= 4.5) ? -8 : 0;
  var highRiskMismatch = ((program.difficulty || 3) >= 4.5 && (u.riskTolerance || 3) <= 2) ? -8 : 0;
  return clamp(fit + onlineAdjustment + budgetAdjustment + codingMismatch + highRiskMismatch, 0, 100);
}

function calculateReadiness(program) {
  var u = state.user;
  var req = program.requirements || {};
  var flags = [];
  var score = 0;

  if (program.id === "unc-ba-cs-ai-swe") {
    score += Math.min((u.credits || 0) / 24, 1) * 24;
    score += Math.min((u.gpa || 0) / 2.5, 1) * 24;
    score += mathPoints(u.mathStatus, 18);
    score += csPoints(u.csStatus, 14);
    score += Math.min((u.codingComfort || 1) / 5, 1) * 12;
    score += Math.min((u.weeklyHours || 0) / 10, 1) * 8;
    if ((u.credits || 0) < 24) flags.push("Needs 24+ transferable credits for transfer consideration.");
    if ((u.gpa || 0) < 2.5) flags.push("Needs 2.5+ cumulative GPA for the B.A. Computer Science path.");
    if (!["completed", "inprogress"].includes(u.mathStatus)) flags.push("Confirm college-level algebra equivalent to MATH 1100 with C or better.");
    if (u.csStatus === "belowc") flags.push("Any previously attempted CS course needs C or higher.");
  } else if (program.id === "ecu-bsba-mis") {
    score += Math.min((u.credits || 0) / 24, 1) * 18;
    score += Math.min((u.gpa || 0) / 2.0, 1) * 18;
    score += Math.min((u.credits || 0) / 45, 1) * 16;
    score += Math.min((u.gpa || 0) / 2.5, 1) * 16;
    score += Math.min((u.declarationCourses || 0) / 8, 1) * 22;
    score += Math.min((u.weeklyHours || 0) / 8, 1) * 10;
    if ((u.credits || 0) < 24) flags.push("Needs 24 transferable hours to apply as a transfer student.");
    if ((u.gpa || 0) < 2.0) flags.push("Needs 2.0+ cumulative GPA to apply as transfer.");
    if ((u.credits || 0) < 45) flags.push("MIS declaration requires 45 semester hours.");
    if ((u.gpa || 0) < 2.5) flags.push("MIS major declaration requires 2.5 overall GPA.");
    if ((u.declarationCourses || 0) < 8) flags.push("Track the 8 required declaration courses and C- or higher grades.");
  } else if (program.id === "unc-bs-ai-watchlist") {
    score += Math.min((u.credits || 0) / 24, 1) * 22;
    score += Math.min((u.gpa || 0) / 2.5, 1) * 22;
    score += mathPoints(u.mathStatus, 16);
    score += csPoints(u.csStatus, 12);
    score += Math.min((u.codingComfort || 1) / 5, 1) * 12;
    score += Math.min((u.weeklyHours || 0) / 12, 1) * 8;
    score += Math.min((u.riskTolerance || 1) / 5, 1) * 8;
    flags.push("Watchlist: verify delivery format and whether it fits your online flexibility needs.");
    if (!["completed", "inprogress"].includes(u.mathStatus)) flags.push("AI B.S. path likely needs stronger math readiness, including calculus planning.");
    if ((u.gpa || 0) < 2.5) flags.push("Minimum transfer GPA listed as 2.5.");
  } else {
    score += Math.min((u.credits || 0) / (req.minCredits || 24), 1) * 25;
    score += Math.min((u.gpa || 0) / (req.minGpa || 2.5), 1) * 25;
    score += Math.min((u.weeklyHours || 0) / 8, 1) * 15;
    score += Math.min((u.codingComfort || 1) / 5, 1) * 15;
    score += Math.min((u.onlineNeed || 1) / 5, 1) * 10;
    score += Math.min((u.riskTolerance || 1) / 5, 1) * 10;
    flags.push("Custom option: replace generic assumptions with official admissions and curriculum details.");
  }

  return { score: clamp(score, 0, 100), flags: flags };
}

function mathPoints(status, max) {
  if (status === "completed") return max;
  if (status === "inprogress") return max * 0.75;
  if (status === "planned") return max * 0.35;
  return 0;
}

function csPoints(status, max) {
  if (status === "none") return max * 0.75;
  if (status === "cplus") return max;
  if (status === "unknown") return max * 0.45;
  return 0;
}

function scoreAllPrograms() {
  return state.programs
    .filter(function(p) { return p.include; })
    .map(function(program) {
      var base = calculateBaseScore(program);
      var readiness = calculateReadiness(program);
      var fit = calculatePreferenceFit(program);
      var difficultyPenalty = Math.max(0, ((program.difficulty || 3) - 3.2) * 3.2);
      var total = clamp((base * 0.58) + (readiness.score * 0.25) + (fit * 0.17) - difficultyPenalty, 0, 100);
      return { program: program, base: base, readiness: readiness, fit: fit, total: total, difficultyPenalty: difficultyPenalty };
    })
    .sort(function(a, b) { return b.total - a.total; });
}

function updateCalculatedViews(rerenderTable) {
  if (rerenderTable === undefined) rerenderTable = true;
  if (rerenderTable) renderWeights();
  renderRankings();
  renderReadinessSnapshot();
  renderAdvisorQuestions();
  renderReadme();
}

function renderRankings() {
  var scored = scoreAllPrograms();
  var top = scored[0];
  var box = document.getElementById("recommendationBox");
  if (!top) {
    box.innerHTML = "<strong>No active programs.</strong> Add or enable a program to generate a recommendation.";
    document.getElementById("rankingCards").innerHTML = "";
    return;
  }
  var topName = top.program.shortName || top.program.name;
  var riskText = top.readiness.flags.length ? '<p><strong>Main gaps to verify:</strong> ' + top.readiness.flags.slice(0, 2).join(" ") + '</p>' : '<p><strong>Main gaps to verify:</strong> No major readiness gaps detected from the current inputs.</p>';
  var recommendationType = top.total >= 85 ? "strong match" : top.total >= 72 ? "good match" : top.total >= 60 ? "promising but needs verification" : "research further before committing";
  box.innerHTML = '<h3>Current recommendation: ' + escapeHtml(topName) + '</h3>' +
    '<p>This is a <strong>' + recommendationType + '</strong> based on your inputs, program scoring, and readiness snapshot.</p>' +
    riskText +
    '<p><strong>Best next move:</strong> ' + escapeHtml(nextMove(top.program)) + '</p>';

  document.getElementById("topMatch").textContent = topName.replace("UNC Charlotte ", "UNC ").replace("Online B.A. Computer Science — ", "");
  var readyTop = scored.slice().sort(function(a, b) { return b.readiness.score - a.readiness.score; })[0];
  document.getElementById("highestReadiness").textContent = (readyTop.program.shortName || readyTop.program.name).replace("UNC Charlotte ", "UNC ");
  var portfolioTop = scored.slice().sort(function(a, b) { return b.program.portfolio - a.program.portfolio; })[0];
  document.getElementById("portfolioBest").textContent = (portfolioTop.program.shortName || portfolioTop.program.name).replace("UNC Charlotte ", "UNC ");

  document.getElementById("rankingCards").innerHTML = scored.map(function(item, idx) {
    var p = item.program;
    return '<div class="df-ranking-card">' +
      '<div class="df-rank-badge">#' + (idx + 1) + '</div>' +
      '<div>' +
        '<h3>' + escapeHtml(p.shortName || p.name) + '</h3>' +
        '<p class="df-muted">' + escapeHtml(p.notes || "") + '</p>' +
        '<div class="df-progress-list">' +
          barLine("Overall match", item.total) +
          barLine("Program strength", item.base) +
          barLine("Personal readiness", item.readiness.score) +
          barLine("Preference fit", item.fit) +
        '</div>' +
      '</div>' +
      '<div>' +
        '<span class="df-pill ' + pillClass(item.total) + '">' + formatPct(item.total) + '</span>' +
        '<p class="df-muted" style="margin-top: 10px;"><strong>Roles:</strong> ' + (p.roles || []).join(", ") + '</p>' +
        '<p class="df-muted"><strong>Career seed:</strong> ' + escapeHtml(p.careerData || "Add career data.") + '</p>' +
      '</div>' +
    '</div>';
  }).join("");
}

function barLine(label, pct) {
  return '<div class="df-progress-line">' +
    '<strong>' + label + '</strong>' +
    '<div class="df-bar"><span style="width:' + clamp(pct, 0, 100) + '%"></span></div>' +
    '<span>' + formatPct(pct) + '</span>' +
  '</div>';
}

function pillClass(score) {
  if (score >= 80) return "good";
  if (score >= 62) return "warn";
  return "bad";
}

function nextMove(program) {
  if (program.id === "unc-ba-cs-ai-swe") return "Confirm transfer-credit fit and math requirement, then begin a small JavaScript/Python project that supports the software-builder story.";
  if (program.id === "ecu-bsba-mis") return "Map the eight MIS declaration courses against your transcript and begin a small SQL/business-dashboard project.";
  if (program.id === "unc-bs-ai-watchlist") return "Verify delivery format, map math readiness, and decide whether the harder AI path fits your schedule and risk tolerance.";
  return "Replace placeholder assumptions with official program requirements, cost, modality, and career outcomes.";
}

function renderReadinessSnapshot() {
  var scored = scoreAllPrograms();
  var container = document.getElementById("readinessSnapshot");
  container.innerHTML = scored.map(function(item) {
    var flags = item.readiness.flags.length ? item.readiness.flags : ["No major flags detected from current inputs."];
    return '<div class="df-mini-card">' +
      '<h3>' + escapeHtml(item.program.shortName || item.program.name) + '</h3>' +
      '<div class="df-bar" style="margin: 10px 0 8px;"><span style="width:' + item.readiness.score + '%"></span></div>' +
      '<p><span class="df-pill ' + pillClass(item.readiness.score) + '">Readiness ' + formatPct(item.readiness.score) + '</span></p>' +
      '<ul>' + flags.map(function(f) { return '<li>' + escapeHtml(f) + '</li>'; }).join("") + '</ul>' +
    '</div>';
  }).join("");
}

function renderAdvisorQuestions() {
  var top = scoreAllPrograms()[0];
  if (!top) return;
  var p = top.program;
  var gaps = top.readiness.flags;
  var standard = [
    "Which of my completed courses will transfer directly into this degree plan?",
    "Which requirements should I complete before applying or before enrolling?",
    "Are there any course sequencing issues that could delay graduation?",
    "What is the realistic timeline if I start in my target term?"
  ];
  var specific = [];
  if (p.id === "unc-ba-cs-ai-swe") {
    specific = [
      "Does my math course satisfy the college-level algebra requirement equivalent to MATH 1100?",
      "How will previously attempted CS courses be evaluated for the C-or-higher requirement?",
      "Which courses should I take first to prepare for data structures, databases, and web development?",
      "Can the Project Management Certificate fit into the outside-elective requirement?"
    ];
  } else if (p.id === "ecu-bsba-mis") {
    specific = [
      "Which of the eight MIS declaration courses are already satisfied by my transcript?",
      "How should I sequence remaining declaration courses with the BSBA business core?",
      "Which MIS electives best support systems analysis, analytics, or IT project management?",
      "How do online proctoring and technology requirements affect the program?"
    ];
  } else if (p.id === "unc-bs-ai-watchlist") {
    specific = [
      "Is the B.S. in AI available in a format that fits my online/flexible schedule?",
      "What math sequence should I complete before transferring?",
      "How does the AI B.S. compare to the online B.A. CS concentration for employment outcomes?",
      "Which prerequisites are most likely to delay progress?"
    ];
  } else {
    specific = [
      "What are the official transfer requirements for this program?",
      "What is the online delivery format and how many synchronous meetings are required?",
      "What is the total estimated cost after transfer credits?",
      "What roles do graduates commonly pursue?"
    ];
  }
  var htmlCard = function(title, items) {
    return '<div class="df-mini-card"><h3>' + title + '</h3><ol>' + items.map(function(q) { return '<li>' + escapeHtml(q) + '</li>'; }).join("") + '</ol></div>';
  };
  var gapQuestions = gaps.map(function(g) { return "How should I address this gap: " + g; }).slice(0, 4);
  document.getElementById("advisorQuestions").innerHTML = htmlCard("Core advisor questions", standard) + htmlCard("Program-specific questions", specific) + (gapQuestions.length ? htmlCard("Questions from current readiness gaps", gapQuestions) : "");
}

function renderReadme() {
  var top = scoreAllPrograms()[0];
  var topName = top ? (top.program.shortName || top.program.name) : "the top-ranked program";
  var readme = '# AI Degree Finder\n\n' +
    'AI Degree Finder is a browser-based decision-support app for comparing online AI, Computer Science, and Management Information Systems degree paths.\n\n' +
    '## Problem\n' +
    'Degree decisions are hard because program requirements, transfer-readiness rules, online flexibility, costs, and career outcomes are scattered across multiple sources.\n\n' +
    '## Solution\n' +
    'This app brings the decision into one place. Users can enter their transfer credits, GPA, math status, coding comfort, preferred career direction, and weekly availability. The app then ranks degree options using:\n\n' +
    '- weighted program scoring\n' +
    '- personal readiness checks\n' +
    '- preference-fit scoring\n' +
    '- visible risk flags\n' +
    '- advisor-question generation\n\n' +
    '## Current Demo Recommendation\n' +
    'Based on the current local inputs, the app recommends: ' + topName + '.\n\n' +
    '## Features\n' +
    '- Editable program data table\n' +
    '- Weighted scoring model\n' +
    '- Transfer-readiness snapshots\n' +
    '- Personalized recommendation summary\n' +
    '- Advisor question generator\n' +
    '- Browser localStorage saving\n' +
    '- JSON backup/import\n' +
    '- Print-to-PDF export\n' +
    '- Source tracker for official school and labor-market references\n\n' +
    '## Tech Stack\n' +
    '- HTML\n' +
    '- CSS\n' +
    '- JavaScript\n' +
    '- localStorage\n' +
    '- JSON\n\n' +
    '## What I Learned / Demonstrated\n' +
    '- Building a single-page client-side app\n' +
    '- Modeling real-world decision data\n' +
    '- Creating explainable recommendation logic\n' +
    '- Designing accessible forms and dynamic UI updates\n' +
    '- Turning a personal planning problem into a portfolio-ready software project\n\n' +
    '## Future Improvements\n' +
    '- Add charts for category-by-category comparison\n' +
    '- Move program seed data into a separate JSON file\n' +
    '- Add transcript parsing\n' +
    '- Add an AI assistant layer for natural-language explanations\n' +
    '- Deploy publicly with a GitHub Pages demo\n';
  document.getElementById("readmeText").textContent = readme;
}

function renderAll() {
  populateUserInputs();
  bindUserInputs();
  renderWeights();
  renderProgramTable();
  updateCalculatedViews(false);
}

window.addEventListener("load", loadState);
