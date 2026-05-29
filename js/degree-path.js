const STORAGE_KEY = "degreePathDecisionBoardV1";

const defaultAdvisorRows = [
    { question: "How many of my current credits will transfer into the degree?", program: "UNC Charlotte + ECU", status: "Not asked", notes: "Request official or unofficial transfer evaluation." },
    { question: "Does my math satisfy UNC Charlotte's college algebra / MATH 1100 equivalent requirement?", program: "UNC Charlotte", status: "Not asked", notes: "Confirm grade and equivalency." },
    { question: "Which ECU MIS declaration courses do I already have credit for?", program: "ECU MIS", status: "Not asked", notes: "Version 1 notes eight declaration courses with C- or higher." },
    { question: "Are all upper-level requirements available online/asynchronously?", program: "UNC Charlotte + ECU", status: "Not asked", notes: "Verify schedule and synchronous expectations." }
];

const defaultActionRows = [
    { action: "Collect unofficial transcript and current credit list.", due: "", status: "Not started", notes: "Needed for transfer reality and advisor conversations." },
    { action: "Email or schedule advising with UNC Charlotte CS online program contact.", due: "", status: "Not started", notes: "Ask about transfer fit, math, CS courses, and online pacing." },
    { action: "Email or schedule advising with ECU College of Business / MIS contact.", due: "", status: "Not started", notes: "Ask about MIS declaration courses and timeline to completion." },
    { action: "Update this decision board after advisor answers.", due: "", status: "Not started", notes: "Then export a PDF snapshot." }
];

function $all(selector) { return Array.from(document.querySelectorAll(selector)); }
function byId(id) { return document.getElementById(id); }
function num(value) { const p = parseFloat(value); return Number.isFinite(p) ? p : 0; }
function fmt(value) { return (Math.round(value * 10) / 10).toFixed(1); }
function statusClass(el, cls, text) { el.className = "status " + cls; el.textContent = text; }

function calculateScores() {
    let unc = 0, ecu = 0, weightTotal = 0;
    $all("#scoreTable tbody tr").forEach((row) => {
        const weight = num(row.querySelector('[data-score="weight"]').value);
        const uncScore = num(row.querySelector('[data-score="unc"]').value);
        const ecuScore = num(row.querySelector('[data-score="ecu"]').value);
        weightTotal += weight;
        unc += weight * uncScore / 5;
        ecu += weight * ecuScore / 5;
    });
    byId("uncTotal").textContent = fmt(unc);
    byId("ecuTotal").textContent = fmt(ecu);
    byId("uncTotalTable").textContent = fmt(unc);
    byId("ecuTotalTable").textContent = fmt(ecu);
    byId("weightTotal").textContent = fmt(weightTotal).replace(".0", "");
    byId("scoreWarning").style.display = Math.abs(weightTotal - 100) > 0.01 ? "block" : "none";

    if (unc >= ecu) {
        byId("rankOneName").textContent = "UNC Charlotte AI-Assisted Software Engineering";
        byId("rankOneText").textContent = "Best upside path if you are willing to commit to coding. Stronger technical identity: software, AI tools, databases, front end, back end, architecture, capstone, and portfolio potential.";
        byId("rankTwoName").textContent = "ECU Management Information Systems";
        byId("rankTwoText").textContent = "Safer, more business-friendly tech path. Likely higher completion probability and still useful for tech/business roles, but less pure coding strength.";
    } else {
        byId("rankOneName").textContent = "ECU Management Information Systems";
        byId("rankOneText").textContent = "Current scores favor the safer tech-business path. This usually means transfer fit, completion odds, or workload realism are carrying the decision.";
        byId("rankTwoName").textContent = "UNC Charlotte AI-Assisted Software Engineering";
        byId("rankTwoText").textContent = "Still the higher-upside technical-builder path, but your current scores suggest it may need stronger transfer fit, time, or coding confidence to become the top choice.";
    }
}

function updateEligibility() {
    const creditsVal = byId("credits").value;
    const gpaVal = byId("gpa").value;
    const credits = num(creditsVal);
    const gpa = num(gpaVal);
    const hasCredits = creditsVal !== "";
    const hasGpa = gpaVal !== "";
    const mathStatus = byId("math1100").value;
    const declaration = byId("ecuDeclaration").value;

    const uncEl = byId("uncEligibility");
    const ecuApplyEl = byId("ecuApplyEligibility");
    const ecuDeclareEl = byId("ecuDeclareEligibility");

    if (!hasCredits || !hasGpa) {
        statusClass(uncEl, "maybe", "Add credits and GPA");
        statusClass(ecuApplyEl, "maybe", "Add credits and GPA");
        statusClass(ecuDeclareEl, "maybe", "Add credits, GPA, and declaration courses");
        return;
    }

    if (credits >= 24 && gpa >= 2.5 && mathStatus === "completeC") {
        statusClass(uncEl, "yes", "Baseline appears met");
    } else if (credits >= 24 && gpa >= 2.5 && (mathStatus === "unknown" || mathStatus === "inProgress")) {
        statusClass(uncEl, "maybe", "Math needs verification");
    } else {
        statusClass(uncEl, "no", "Baseline not met yet");
    }

    if (credits >= 24 && gpa >= 2.0) {
        statusClass(ecuApplyEl, "yes", "Baseline appears met");
    } else {
        statusClass(ecuApplyEl, "no", "Baseline not met yet");
    }

    if (credits >= 45 && gpa >= 2.5 && declaration === "complete") {
        statusClass(ecuDeclareEl, "yes", "Declaration baseline appears met");
    } else if (credits >= 45 && gpa >= 2.5 && (declaration === "unknown" || declaration === "partial")) {
        statusClass(ecuDeclareEl, "maybe", "Declaration courses need verification");
    } else {
        statusClass(ecuDeclareEl, "no", "Declaration baseline not met yet");
    }
}

function renderDynamicRows(tableId, rows, fields, removeHandlerName) {
    const tbody = byId(tableId);
    tbody.innerHTML = "";
    rows.forEach((row, idx) => {
        const tr = document.createElement("tr");
        fields.forEach((field) => {
            const td = document.createElement("td");
            if (field.type === "select") {
                const select = document.createElement("select");
                select.dataset.dynamic = tableId;
                select.dataset.index = idx;
                select.dataset.field = field.key;
                field.options.forEach((option) => {
                    const opt = document.createElement("option");
                    opt.value = option; opt.textContent = option;
                    if (row[field.key] === option) opt.selected = true;
                    select.appendChild(opt);
                });
                td.appendChild(select);
            } else if (field.type === "date") {
                const input = document.createElement("input");
                input.type = "date"; input.value = row[field.key] || "";
                input.dataset.dynamic = tableId; input.dataset.index = idx; input.dataset.field = field.key;
                td.appendChild(input);
            } else {
                const textarea = document.createElement("textarea");
                textarea.value = row[field.key] || "";
                textarea.dataset.dynamic = tableId; textarea.dataset.index = idx; textarea.dataset.field = field.key;
                td.appendChild(textarea);
            }
            tr.appendChild(td);
        });
        const actionTd = document.createElement("td");
        actionTd.className = "no-print";
        const btn = document.createElement("button");
        btn.type = "button"; btn.className = "small-button danger"; btn.textContent = "Remove";
        btn.addEventListener("click", () => {
            if (removeHandlerName === "advisor") { appState.advisorRows.splice(idx, 1); renderAdvisorRows(); }
            else { appState.actionRows.splice(idx, 1); renderActionRows(); }
            saveToLocal(false);
        });
        actionTd.appendChild(btn);
        tr.appendChild(actionTd);
        tbody.appendChild(tr);
    });
}

function renderAdvisorRows() {
    renderDynamicRows("advisorRows", appState.advisorRows, [
        { key: "question" }, { key: "program" },
        { key: "status", type: "select", options: ["Not asked", "Asked", "Answered", "Waiting", "Follow up", "Resolved"] },
        { key: "notes" }
    ], "advisor");
}

function renderActionRows() {
    renderDynamicRows("actionRows", appState.actionRows, [
        { key: "action" }, { key: "due", type: "date" },
        { key: "status", type: "select", options: ["Not started", "In progress", "Waiting", "Done", "Blocked"] },
        { key: "notes" }
    ], "action");
}

function collectState() {
    const fields = {};
    $all("[data-key]").forEach((el) => { fields[el.dataset.key] = el.value; });
    const scores = [];
    $all("#scoreTable tbody tr").forEach((row, idx) => {
        scores.push({
            row: idx,
            weight: row.querySelector('[data-score="weight"]').value,
            unc: row.querySelector('[data-score="unc"]').value,
            ecu: row.querySelector('[data-score="ecu"]').value
        });
    });
    return { version: "1.0", savedAt: new Date().toISOString(), fields, scores, advisorRows: appState.advisorRows, actionRows: appState.actionRows };
}

function applyState(state) {
    if (!state) return;
    if (state.fields) {
        $all("[data-key]").forEach((el) => {
            if (Object.prototype.hasOwnProperty.call(state.fields, el.dataset.key)) el.value = state.fields[el.dataset.key];
        });
    }
    if (Array.isArray(state.scores)) {
        state.scores.forEach((score) => {
            const row = $all("#scoreTable tbody tr")[score.row];
            if (!row) return;
            row.querySelector('[data-score="weight"]').value = score.weight;
            row.querySelector('[data-score="unc"]').value = score.unc;
            row.querySelector('[data-score="ecu"]').value = score.ecu;
        });
    }
    appState.advisorRows = Array.isArray(state.advisorRows) ? state.advisorRows : JSON.parse(JSON.stringify(defaultAdvisorRows));
    appState.actionRows = Array.isArray(state.actionRows) ? state.actionRows : JSON.parse(JSON.stringify(defaultActionRows));
    renderAdvisorRows();
    renderActionRows();
    calculateScores();
    updateEligibility();
    byId("saveState").textContent = state.savedAt ? "Loaded: " + new Date(state.savedAt).toLocaleString() : "Loaded saved state";
}

function saveToLocal(showMessage = true) {
    const state = collectState();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    if (showMessage) byId("saveState").textContent = "Saved: " + new Date().toLocaleString();
}

function loadFromLocal() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    try { applyState(JSON.parse(raw)); return true; }
    catch (err) { console.error(err); byId("saveState").textContent = "Could not load saved state"; return false; }
}

function resetToDefaults() {
    localStorage.removeItem(STORAGE_KEY);
    $all("[data-key]").forEach((el) => {
        if (el.defaultValue !== undefined) el.value = el.defaultValue;
        if (el.tagName === "SELECT") el.selectedIndex = 0;
    });
    $all("#scoreTable input[data-score]").forEach((el) => { el.value = el.defaultValue; });
    appState.advisorRows = JSON.parse(JSON.stringify(defaultAdvisorRows));
    appState.actionRows = JSON.parse(JSON.stringify(defaultActionRows));
    renderAdvisorRows(); renderActionRows(); calculateScores(); updateEligibility();
    byId("saveState").textContent = "Reset to Version 1";
}

function exportJson() {
    const state = collectState();
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `degree-path-decision-board-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
}

function importJson(file) {
    const reader = new FileReader();
    reader.onload = () => {
        try { applyState(JSON.parse(reader.result)); saveToLocal(true); }
        catch (err) { console.error(err); alert("Could not import JSON backup. Please check the file and try again."); }
    };
    reader.readAsText(file);
}

const appState = {
    advisorRows: JSON.parse(JSON.stringify(defaultAdvisorRows)),
    actionRows: JSON.parse(JSON.stringify(defaultActionRows))
};

document.addEventListener("input", (event) => {
    const el = event.target;
    if (el.matches("[data-score]")) calculateScores();
    if (el.matches("#credits, #gpa, #math1100, #ecuDeclaration")) updateEligibility();
    if (el.dataset && el.dataset.dynamic) {
        const arr = el.dataset.dynamic === "advisorRows" ? appState.advisorRows : appState.actionRows;
        const item = arr[parseInt(el.dataset.index, 10)];
        if (item) item[el.dataset.field] = el.value;
    }
});

document.addEventListener("change", (event) => {
    const el = event.target;
    if (el.matches("#credits, #gpa, #math1100, #ecuDeclaration")) updateEligibility();
    if (el.dataset && el.dataset.dynamic) {
        const arr = el.dataset.dynamic === "advisorRows" ? appState.advisorRows : appState.actionRows;
        const item = arr[parseInt(el.dataset.index, 10)];
        if (item) item[el.dataset.field] = el.value;
    }
});

byId("printBtn").addEventListener("click", () => { saveToLocal(false); window.print(); });
byId("saveBtn").addEventListener("click", () => saveToLocal(true));
byId("exportJsonBtn").addEventListener("click", exportJson);
byId("importJson").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) importJson(file);
    event.target.value = "";
});
byId("resetBtn").addEventListener("click", () => {
    if (confirm("Reset this dashboard to the original Version 1 baseline? Saved local updates will be removed.")) resetToDefaults();
});
byId("addAdvisorRow").addEventListener("click", () => {
    appState.advisorRows.push({ question: "", program: "", status: "Not asked", notes: "" });
    renderAdvisorRows(); saveToLocal(false);
});
byId("addActionRow").addEventListener("click", () => {
    appState.actionRows.push({ action: "", due: "", status: "Not started", notes: "" });
    renderActionRows(); saveToLocal(false);
});

renderAdvisorRows();
renderActionRows();
calculateScores();
updateEligibility();
loadFromLocal();
