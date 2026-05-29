const CC_STORAGE_KEY = 'where_i_am_ai_cs_mis_command_center_v1';
const ccDynamicTables = ['courseTable', 'questionTable', 'logTable'];

const ccStarterRows = {
  courseTable: [
    ['College Algebra / Precalculus', '3', '', 'Math', 'UNC + ECU', 'Need to verify', 'Key requirement for both paths.'],
    ['Intro to Computers / CIS 110', '3', '', 'Computing', 'ECU MIS', 'Need to verify', 'May satisfy MIS 2223 equivalent.'],
    ['Intro Programming / CS I', '4', '', 'Computer Science', 'UNC', 'Need to verify', 'Important for CS sequence placement.']
  ],
  questionTable: [
    ['Which of my completed courses transfer into the major requirements versus general electives?', 'UNC Charlotte advisor', '', 'Open', ''],
    ['Which of the eight ECU MIS declaration courses have I already completed or satisfied?', 'ECU COB advising', '', 'Open', ''],
    ['What is the realistic time-to-degree for each path after transfer credit evaluation?', 'Both schools', '', 'Open', '']
  ],
  logTable: [
    ['2026-05-29', 'Created master organizer command center.', 'Planning conversation + official source check', 'Centralized all planning tools.']
  ]
};

function ccTodayISO() {
  var d = new Date();
  var off = d.getTimezoneOffset();
  var local = new Date(d.getTime() - off * 60000);
  return local.toISOString().slice(0, 10);
}

function ccQs(sel, root) { return (root || document).querySelector(sel); }
function ccQsa(sel, root) { return Array.from((root || document).querySelectorAll(sel)); }

function ccBadgeClass(el, status) {
  el.classList.remove('good', 'warn', 'danger', 'purple');
  if (status === 'good') el.classList.add('good');
  if (status === 'warn') el.classList.add('warn');
  if (status === 'danger') el.classList.add('danger');
  if (status === 'purple') el.classList.add('purple');
}

function ccGetVal(id) {
  var el = document.getElementById(id);
  if (!el) return '';
  if (el.type === 'checkbox') return el.checked;
  return el.value;
}

function ccSetVal(id, value) {
  var el = document.getElementById(id);
  if (!el) return;
  if (el.type === 'checkbox') el.checked = !!value;
  else el.value = value != null ? value : '';
}

function ccEscapeHTML(str) {
  return String(str != null ? str : '').replace(/[&<>"]/g, function(ch) {
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch];
  });
}

function ccEscapeAttr(str) {
  return ccEscapeHTML(str).replace(/'/g, '&#39;');
}

function ccAddCourseRow(values) {
  if (!values) values = ['', '', '', 'General education', 'Need to map', 'Need to verify', ''];
  var tbody = ccQs('#courseTable tbody');
  var tr = document.createElement('tr');
  tr.innerHTML =
    '<td><input type="text" value="' + ccEscapeAttr(values[0]) + '" /></td>' +
    '<td><input type="number" min="0" step="0.5" value="' + ccEscapeAttr(values[1]) + '" /></td>' +
    '<td><input type="text" value="' + ccEscapeAttr(values[2]) + '" /></td>' +
    '<td><select><option>General education</option><option>Math</option><option>Statistics</option><option>Computer Science</option><option>Business</option><option>Economics</option><option>Accounting</option><option>MIS / Computing</option><option>Elective</option><option>Unknown</option></select></td>' +
    '<td><input type="text" value="' + ccEscapeAttr(values[4]) + '" /></td>' +
    '<td><select><option>Need to verify</option><option>Likely transfers</option><option>Confirmed transfers</option><option>Does not transfer</option><option>In progress</option></select></td>' +
    '<td><textarea>' + ccEscapeHTML(values[6]) + '</textarea></td>' +
    '<td class="no-print"><button type="button" class="cc-btn cc-danger cc-small remove-row">Remove</button></td>';
  tbody.appendChild(tr);
  ccQsa('select', tr)[0].value = values[3] || 'General education';
  ccQsa('select', tr)[1].value = values[5] || 'Need to verify';
  ccAttachTableListeners(tr);
  ccCalculateAll();
  ccSaveState();
}

function ccAddQuestionRow(values) {
  if (!values) values = ['', '', '', 'Open', ''];
  var tbody = ccQs('#questionTable tbody');
  var tr = document.createElement('tr');
  tr.innerHTML =
    '<td><textarea>' + ccEscapeHTML(values[0]) + '</textarea></td>' +
    '<td><input type="text" value="' + ccEscapeAttr(values[1]) + '" /></td>' +
    '<td><input type="date" value="' + ccEscapeAttr(values[2]) + '" /></td>' +
    '<td><select><option>Open</option><option>Asked</option><option>Answered</option><option>Blocked</option><option>Closed</option></select></td>' +
    '<td><textarea>' + ccEscapeHTML(values[4]) + '</textarea></td>' +
    '<td class="no-print"><button type="button" class="cc-btn cc-danger cc-small remove-row">Remove</button></td>';
  tbody.appendChild(tr);
  ccQsa('select', tr)[0].value = values[3] || 'Open';
  ccAttachTableListeners(tr);
  ccSaveState();
}

function ccAddLogRow(values) {
  if (!values) values = [ccTodayISO(), '', '', ''];
  var tbody = ccQs('#logTable tbody');
  var tr = document.createElement('tr');
  tr.innerHTML =
    '<td><input type="date" value="' + ccEscapeAttr(values[0]) + '" /></td>' +
    '<td><textarea>' + ccEscapeHTML(values[1]) + '</textarea></td>' +
    '<td><textarea>' + ccEscapeHTML(values[2]) + '</textarea></td>' +
    '<td><textarea>' + ccEscapeHTML(values[3]) + '</textarea></td>' +
    '<td class="no-print"><button type="button" class="cc-btn cc-danger cc-small remove-row">Remove</button></td>';
  tbody.appendChild(tr);
  ccAttachTableListeners(tr);
  ccSaveState();
}

function ccAttachTableListeners(root) {
  if (!root) root = document;
  ccQsa('input, textarea, select', root).forEach(function(el) {
    el.addEventListener('input', function() { ccCalculateAll(); ccSaveState(); });
    el.addEventListener('change', function() { ccCalculateAll(); ccSaveState(); });
  });
  ccQsa('.remove-row', root).forEach(function(btn) {
    btn.addEventListener('click', function() { btn.closest('tr').remove(); ccCalculateAll(); ccSaveState(); });
  });
}

function ccCollectTable(id) {
  return ccQsa('#' + id + ' tbody tr').map(function(tr) {
    return ccQsa('input, textarea, select', tr).map(function(el) { return el.value; });
  });
}

function ccLoadTable(id, rows) {
  ccQs('#' + id + ' tbody').innerHTML = '';
  rows = rows && rows.length ? rows : ccStarterRows[id];
  rows.forEach(function(row) {
    if (id === 'courseTable') ccAddCourseRow(row);
    if (id === 'questionTable') ccAddQuestionRow(row);
    if (id === 'logTable') ccAddLogRow(row);
  });
}

function ccCollectState() {
  var state = { fields: {}, tables: {} };
  ccQsa('[data-save="true"]').forEach(function(el) {
    if (!el.id) return;
    state.fields[el.id] = el.type === 'checkbox' ? el.checked : el.value;
  });
  ccDynamicTables.forEach(function(id) { state.tables[id] = ccCollectTable(id); });
  return state;
}

function ccApplyState(state) {
  if (!state) return;
  Object.entries(state.fields || {}).forEach(function(entry) { ccSetVal(entry[0], entry[1]); });
  ccDynamicTables.forEach(function(id) { ccLoadTable(id, state.tables && state.tables[id] ? state.tables[id] : ccStarterRows[id]); });
  ccCalculateAll();
}

function ccSaveState() {
  try {
    localStorage.setItem(CC_STORAGE_KEY, JSON.stringify(ccCollectState()));
  } catch (e) { console.warn('Could not save state', e); }
}

function ccLoadState() {
  var raw = localStorage.getItem(CC_STORAGE_KEY);
  if (raw) {
    try { ccApplyState(JSON.parse(raw)); return; } catch(e) { console.warn('Could not parse saved state', e); }
  }
  ccInitializeDefaults();
}

function ccInitializeDefaults() {
  if (!ccGetVal('lastUpdated')) ccSetVal('lastUpdated', ccTodayISO());
  ccLoadTable('courseTable', ccStarterRows.courseTable);
  ccLoadTable('questionTable', ccStarterRows.questionTable);
  ccLoadTable('logTable', ccStarterRows.logTable);
  ccCalculateAll();
  ccSaveState();
}

function ccEcuDeclarationCompletedCount() {
  var ids = ['ecu_acct2401','ecu_acct2521','ecu_econ2113','ecu_econ2133','ecu_fina2244','ecu_math1065','ecu_stats','ecu_mis2223'];
  return ids.filter(function(id) { return ccGetVal(id) === 'Completed'; }).length;
}

function ccCalculateReadiness() {
  var credits = parseFloat(ccGetVal('currentCredits')) || 0;
  var gpa = parseFloat(ccGetVal('currentGpa'));
  var algebra = ccGetVal('algebraStatus');
  var cs = ccGetVal('csStatus');
  var ecuDecl = ccEcuDeclarationCompletedCount();

  var unc = 0;
  if (credits >= 24) unc += 25; else unc += Math.min(25, (credits / 24) * 25);
  if (!isNaN(gpa)) unc += gpa >= 2.5 ? 25 : Math.max(0, (gpa / 2.5) * 25);
  if (algebra === 'completed_c_or_better') unc += 25; else if (algebra === 'in_progress') unc += 12;
  if (cs === 'none' || cs === 'all_c_or_better') unc += 25; else if (cs === 'unknown') unc += 10;
  unc = Math.round(Math.min(100, unc));

  var ecu = 0;
  if (credits >= 24) ecu += 20; else ecu += Math.min(20, (credits / 24) * 20);
  if (!isNaN(gpa)) ecu += gpa >= 2.0 ? 20 : Math.max(0, (gpa / 2.0) * 20);
  if (credits >= 45) ecu += 20; else ecu += Math.min(20, (credits / 45) * 20);
  if (!isNaN(gpa)) ecu += gpa >= 2.5 ? 20 : Math.max(0, (gpa / 2.5) * 20);
  ecu += (ecuDecl / 8) * 20;
  ecu = Math.round(Math.min(100, ecu));

  return { unc: unc, ecu: ecu, credits: credits, gpa: gpa, ecuDecl: ecuDecl };
}

function ccSetReadinessUI() {
  var r = ccCalculateReadiness();
  ccQs('#heroUncReadiness').textContent = r.unc;
  ccQs('#heroEcuReadiness').textContent = r.ecu;
  ccQs('#uncMeter').style.width = r.unc + '%';
  ccQs('#ecuMeter').style.width = r.ecu + '%';
  ccQs('#creditsDisplay').textContent = r.credits || 0;
  ccQs('#gpaDisplay').textContent = isNaN(r.gpa) ? '—' : r.gpa.toFixed(2);
  ccQs('#confidenceDisplay').textContent = ccGetVal('decisionConfidence') || '0';
  ccQs('#nextReviewDisplay').textContent = ccGetVal('nextReviewDate') || '—';

  var uncBadge = ccQs('#uncBadge');
  var ecuBadge = ccQs('#ecuBadge');
  if (r.unc >= 85) { uncBadge.textContent = 'Looks ready'; ccBadgeClass(uncBadge, 'good'); }
  else if (r.unc >= 60) { uncBadge.textContent = 'Close / verify'; ccBadgeClass(uncBadge, 'warn'); }
  else { uncBadge.textContent = 'Needs work'; ccBadgeClass(uncBadge, 'danger'); }

  if (r.ecu >= 85) { ecuBadge.textContent = 'Strong fit'; ccBadgeClass(ecuBadge, 'good'); }
  else if (r.ecu >= 60) { ecuBadge.textContent = 'Close / verify'; ccBadgeClass(ecuBadge, 'warn'); }
  else { ecuBadge.textContent = 'Needs work'; ccBadgeClass(ecuBadge, 'danger'); }

  var gpaText = isNaN(r.gpa) ? 'GPA not entered' : 'GPA ' + r.gpa.toFixed(2);
  ccQs('#uncReadinessText').textContent = 'Credits: ' + r.credits + '. ' + gpaText + '. Algebra: ' + (ccGetVal('algebraStatus') || 'unknown') + '. Prior CS: ' + (ccGetVal('csStatus') || 'unknown') + '.';
  ccQs('#ecuReadinessText').textContent = 'Credits: ' + r.credits + '. ' + gpaText + '. Declaration courses marked complete: ' + r.ecuDecl + '/8.';

  var preferred = ccGetVal('preferredPath');
  ccQs('#heroRecommendation').textContent = preferred || 'UNC Charlotte first';
}

function ccActionCompletion() {
  var checks = ccQsa('input[type="checkbox"][data-save="true"]');
  if (!checks.length) return 0;
  var done = checks.filter(function(c) { return c.checked; }).length;
  return Math.round((done / checks.length) * 100);
}

function ccListedCredits() {
  var total = 0;
  ccQsa('#courseTable tbody tr').forEach(function(tr) {
    var val = parseFloat((ccQsa('input', tr)[1] || {}).value || '0');
    if (!isNaN(val)) total += val;
  });
  return Math.round(total * 10) / 10;
}

function ccCalculateAll() {
  ccSetReadinessUI();
  ccQs('#heroActionCompletion').textContent = ccActionCompletion();
  ccQs('#listedCredits').textContent = ccListedCredits();
}

function ccExportJSON() {
  var blob = new Blob([JSON.stringify(ccCollectState(), null, 2)], {type: 'application/json'});
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'where_i_am_command_center_' + ccTodayISO() + '.json';
  a.click();
  URL.revokeObjectURL(a.href);
}

function ccImportJSON(file) {
  var reader = new FileReader();
  reader.onload = function() {
    try {
      var data = JSON.parse(reader.result);
      ccApplyState(data);
      ccSaveState();
      alert('Imported successfully.');
    } catch (e) {
      alert('That JSON file could not be imported.');
    }
  };
  reader.readAsText(file);
}

document.addEventListener('DOMContentLoaded', function() {
  ccQsa('[data-save="true"]').forEach(function(el) {
    el.addEventListener('input', function() { ccCalculateAll(); ccSaveState(); });
    el.addEventListener('change', function() { ccCalculateAll(); ccSaveState(); });
  });
  ccQs('#saveBtn').addEventListener('click', function() { ccCalculateAll(); ccSaveState(); alert('Saved in this browser.'); });
  ccQs('#exportJsonBtn').addEventListener('click', ccExportJSON);
  ccQs('#importJsonBtn').addEventListener('click', function() { ccQs('#jsonFile').click(); });
  ccQs('#jsonFile').addEventListener('change', function(e) { if (e.target.files && e.target.files[0]) ccImportJSON(e.target.files[0]); });
  ccQs('#printBtn').addEventListener('click', function() { ccCalculateAll(); ccSaveState(); window.print(); });
  ccQs('#resetBtn').addEventListener('click', function() {
    if (confirm('Reset this command center in this browser? Export JSON first if you want a backup.')) {
      localStorage.removeItem(CC_STORAGE_KEY);
      location.reload();
    }
  });
  ccQs('#addCourseBtn').addEventListener('click', function() { ccAddCourseRow(); });
  ccQs('#addQuestionBtn').addEventListener('click', function() { ccAddQuestionRow(); });
  ccQs('#addLogBtn').addEventListener('click', function() { ccAddLogRow(); });
  if (!ccQs('#lastUpdated').value) ccQs('#lastUpdated').value = ccTodayISO();
  ccLoadState();
  ccCalculateAll();
});
