const ICON = (name) => `<svg aria-hidden="true"><use href="#i-${name}"/></svg>`;
const STORE = {
  get(key, fallback) { try { const value = localStorage.getItem(`datafield:${key}`); return value === null ? fallback : JSON.parse(value); } catch { return fallback; } },
  set(key, value) { try { localStorage.setItem(`datafield:${key}`, JSON.stringify(value)); } catch { /* storage can be disabled */ } },
  getProfile(profileId, key, fallback) { try { const value = localStorage.getItem(`datafield:profile:${profileId}:${key}`); return value === null ? fallback : JSON.parse(value); } catch { return fallback; } },
  setProfile(profileId, key, value) { try { localStorage.setItem(`datafield:profile:${profileId}:${key}`, JSON.stringify(value)); } catch { /* storage can be disabled */ } },
};
const modules = [
  { title: "A way of thinking", desc: "Meet the data science process and turn curiosity into a clear question.", time: "25 min", lessons: 3, state: "done", color: "mint" },
  { title: "Python, your new toolkit", desc: "Variables, lists and the small building blocks that make code useful.", time: "55 min", lessons: 5, state: "current", color: "yellow" },
  { title: "Tidy data, happy data", desc: "Read, inspect and clean a dataset with pandas.", time: "45 min", lessons: 4, state: "up next", color: "blue" },
  { title: "See the story in a chart", desc: "Build clear visualizations that answer real questions.", time: "40 min", lessons: 4, state: "up next", color: "lavender" },
  { title: "Ask better questions", desc: "Use statistics to find patterns and check your assumptions.", time: "60 min", lessons: 6, state: "up next", color: "mint" },
  { title: "A project of your own", desc: "Bring the pieces together in a research project you can share.", time: "90 min", lessons: 5, state: "up next", color: "yellow" },
];
const lessonPlans = [
  { intro: "Data science is a way to answer real questions with evidence. You start by getting curious, then decide what information could help. After that, you inspect and explore the data, check your interpretation, and share what you learned.", concept: "A good analysis is a loop: ask → collect → check → explore → explain. New evidence can send you back to refine the question.", example: "Instead of asking “Are students good at math?”, try “In this class, do students who practice more often tend to score higher on the quiz?” The second question is focused and suggests what you might measure.", exercise: "Write one question you have about your school, neighborhood or daily routine. Name one kind of information you would need to investigate it.", snippets: [] },
  { intro: "Python is a language for giving a computer clear, repeatable instructions. A variable is a name for a value, like putting a label on a jar. A list groups related values so you can work with them together.", concept: "`hours = 2.5` stores one number. `scores = [72, 85, 91]` stores a list. `print()` shows a result. A name should tell you what its value means.", example: "`hours_studied = 3`<br>`exam_score = 78`<br>`score_per_hour = exam_score / hours_studied`<br>`print(score_per_hour)`<br><br>The output is `26.0`. The computer has followed the calculation exactly as written.", exercise: "Open the workspace and change the code to calculate the average exam score. Try `df[\"exam_score\"].mean()`.", snippets: ["hours_studied = 3\nexam_score = 78\nscore_per_hour = exam_score / hours_studied\nprint(score_per_hour)"] },
  { intro: "Most real-world data is a table. Each row describes one observation, and each column describes one feature of that observation. pandas gives Python a set of friendly tools for exploring and tidying these tables.", concept: "Start with `df.head()` to look at a few rows and `df.info()` to see column types and missing values. Clean data makes it easier to spot mistakes before they affect a result.", example: "If the `age` column has an empty cell, don't silently replace it with zero. First ask why it is missing. The right choice depends on how the data was collected and what you are trying to learn.", exercise: "In the workspace, run `df.shape` and `df.describe()`. How many rows and columns do you have? Which number helps you describe the spread?", snippets: ["print(df.shape)\nprint(df.describe())"] },
  { intro: "A chart can make a pattern easier to notice, but the chart type should match the question. Clear labels and an honest scale help other people understand what they are seeing.", concept: "Use a bar chart to compare categories, a line chart to show change over time, and a scatter plot to explore a relationship between two numeric features.", example: "For study time and exam score, a scatter plot puts hours on one axis and score on the other. A rising cloud of points suggests a positive relationship, but it does not prove study time caused the scores to rise.", exercise: "Before making a chart, write down the one comparison or pattern you want someone to notice. Choose the simplest chart that makes it visible.", snippets: [] },
  { intro: "Statistics helps us describe what we see and think carefully about what could explain it. A summary number can be useful, but it never tells the entire story by itself.", concept: "The mean is an average and can shift when a value is unusually high or low. The median is the middle value and can be more representative for skewed data. Always look at the observations too.", example: "If four delivery times are 10, 11, 12 and 47 minutes, the mean is 20 minutes while the median is 11.5. The very long delivery affects the average, so report what makes sense for your question.", exercise: "Compare `df[\"exam_score\"].mean()` and `df[\"exam_score\"].median()` in the workspace. Which summary would you use for this small sample, and why?", snippets: [] },
  { intro: "A small project brings your curiosity, data and analysis together. It doesn't need a dramatic discovery. A clear question, a careful method and an honest explanation make a useful project.", concept: "A readable project explains the question, where the data came from, what you did, what you found and what the analysis cannot tell us.", example: "A useful conclusion can sound like: “In this sample, people who studied longer tended to score higher. The sample is small and observational, so it cannot show that study time alone caused the difference.”", exercise: "Draft a short research brief in the Research Studio, add a source and export it when you are ready to share.", snippets: [] },
];
const datasets = {
  scores: {
    label: "Student study habits", file: "student_scores.csv",
    csv: "hours_studied,sleep_hours,exam_score\n1.5,8,52\n2.0,7.5,61\n2.5,8.2,68\n3.0,7,73\n4.0,8.5,84\n5.0,7.8,91",
    rows: [["1.5", "8.0", "52"], ["2.0", "7.5", "61"], ["2.5", "8.2", "68"], ["3.0", "7.0", "73"]],
    headers: ["hours_studied", "sleep_hours", "exam_score"],
    code: `import pandas as pd\n\n# Your data is ready in the DataFrame called df\nprint(df.head())\n\n# What is the average exam score?\nprint("\\nAverage exam score:", round(df["exam_score"].mean(), 1))\n\n# Try sorting by the score\n# df.sort_values("exam_score", ascending=False)`
  },
  climate: {
    label: "Monthly rainfall", file: "monthly_rainfall.csv",
    csv: "month,rainfall_mm,avg_temp_c\nJan,42,24.1\nFeb,35,25.0\nMar,88,24.6\nApr,162,22.8\nMay,118,21.7\nJun,46,20.9",
    rows: [["Jan", "42", "24.1"], ["Feb", "35", "25.0"], ["Mar", "88", "24.6"], ["Apr", "162", "22.8"]],
    headers: ["month", "rainfall_mm", "avg_temp_c"],
    code: `import pandas as pd\n\n# Take a first look at the rainfall data\nprint(df.head())\n\n# Which month had the most rain?\nwettest = df.loc[df["rainfall_mm"].idxmax()]\nprint("\\nWettest month:", wettest["month"])\nprint("Rainfall:", wettest["rainfall_mm"], "mm")\n\n# Your turn: calculate the average temperature`
  },
  trips: {
    label: "City bike trips", file: "bike_trips.csv",
    csv: "day,trips,avg_minutes\nMon,124,18.2\nTue,142,17.5\nWed,167,19.1\nThu,153,18.4\nFri,218,22.6\nSat,306,28.2",
    rows: [["Mon", "124", "18.2"], ["Tue", "142", "17.5"], ["Wed", "167", "19.1"], ["Thu", "153", "18.4"]],
    headers: ["day", "trips", "avg_minutes"],
    code: `import pandas as pd\n\n# Explore the bike trip data\nprint(df.describe())\n\n# Find the busiest day\nbusiest = df.loc[df["trips"].idxmax()]\nprint("\\nBusiest day:", busiest["day"])\nprint("Trips:", busiest["trips"])\n\n# Try comparing weekday and weekend totals`
  },
};
const lessonSearch = [
  ...modules.map((m, i) => ({ title: m.title, detail: `Module ${String(i + 1).padStart(2, "0")} · ${m.time}`, page: "learning" })),
  { title: "Run your first Python analysis", detail: "Workspace · Python", page: "workspace" },
  { title: "Start a guided research project", detail: "Research studio · Project", page: "research" },
  { title: "Write a research question", detail: "Field note · Research", page: "research" },
  { title: "Explore your dataset", detail: "Workspace · pandas", page: "workspace" },
];
let currentPage = "dashboard";
const storedProfiles = STORE.get("profiles", null);
const defaultProfile = { id: "learner-jordan", name: "Jordan Davis", color: 0 };
let profiles = Array.isArray(storedProfiles) ? storedProfiles.filter((profile) => profile && typeof profile.id === "string" && typeof profile.name === "string" && profile.name.trim()) : [];
if (!profiles.length) {
  profiles = [defaultProfile];
  STORE.set("profiles", profiles);
  if (!Array.isArray(storedProfiles)) {
    for (const key of ["dataset", "code", "research", "tasks", "completed", "activity"]) {
      const oldValue = STORE.get(key, null);
      if (oldValue !== null) STORE.setProfile(defaultProfile.id, key, oldValue);
    }
  }
}
let activeProfileId = STORE.get("activeProfileId", profiles[0].id);
if (!profiles.some((profile) => profile.id === activeProfileId)) {
  activeProfileId = profiles[0].id;
  STORE.set("activeProfileId", activeProfileId);
}
function profileRead(key, fallback) { return STORE.getProfile(activeProfileId, key, fallback); }
function profileSave(key, value) { STORE.setProfile(activeProfileId, key, value); }
function activeProfile() { return profiles.find((profile) => profile.id === activeProfileId) || profiles[0]; }
let currentDataset = profileRead("dataset", "scores");
let codeText = profileRead("code", datasets[currentDataset]?.code || datasets.scores.code);
let pyWorker = null;
let workerReady = false;
let workerBusy = false;
let runTimeout = null;
let toastTimer = null;
let research = profileRead("research", { title: "", question: "", hypothesis: "", audience: "", approach: "", dataPlan: "", reflection: "", sources: [] });
if (!Array.isArray(research.sources)) research.sources = [];
let tasks = profileRead("tasks", [false, false, false]);
let completed = profileRead("completed", [true, false, false, false, false, false]);
let activity = profileRead("activity", []);
if (!Array.isArray(activity)) activity = [];

function localDateKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function recordProgress() {
  const today = localDateKey();
  if (!activity.includes(today)) {
    activity = [...activity, today];
    profileSave("activity", activity);
    updateProfileLabels();
  }
}
function getWeekActivity() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    return { date, active: activity.includes(localDateKey(date)) };
  });
}
function getCurrentStreak() {
  const days = new Set(activity);
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  if (!days.has(localDateKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (days.has(localDateKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function esc(value = "") { return String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }
function toast(message) {
  const node = document.getElementById("toast"); node.textContent = message; node.classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => node.classList.remove("show"), 2300);
}
function setPage(page) {
  currentPage = page;
  updateProfileLabels();
  document.querySelectorAll("[data-page]").forEach((el) => el.classList.toggle("active", el.dataset.page === page));
  const names = { dashboard: "Overview", learning: "Learning path", workspace: "Code workspace", research: "Research studio", resources: "Field notes" };
  document.getElementById("page-crumb").textContent = names[page] || "Overview";
  document.getElementById("main-view").innerHTML = renderPage(page);
  document.getElementById("main-view").focus({ preventScroll: true });
  document.getElementById("sidebar").classList.remove("open");
  document.querySelector(".mobile-overlay")?.classList.remove("show");
  if (page === "workspace") { syncEditor(); initKernel(); }
  if (page === "research") { bindResearchInputs(); updateResearchProgress(); }
  if (location.hash !== `#${page}`) history.replaceState(null, "", `#${page}`);
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function renderPage(page) {
  if (page === "learning") return renderLearning();
  if (page === "workspace") return renderWorkspace();
  if (page === "research") return renderResearch();
  if (page === "resources") return renderResources();
  return renderDashboard();
}
function dateLabel() { return new Intl.DateTimeFormat(undefined, { weekday: "long", month: "short", day: "numeric" }).format(new Date()); }
function profileInitials(name) { return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase(); }
function updateProfileLabels() {
  const profile = activeProfile();
  const initials = profileInitials(profile.name);
  const name = document.getElementById("profile-name");
  const sideAvatar = document.getElementById("profile-avatar");
  const topAvatar = document.getElementById("top-profile-button");
  const streakLabel = document.getElementById("sidebar-streak");
  const streak = getCurrentStreak();
  if (name) name.textContent = profile.name;
  if (sideAvatar) sideAvatar.textContent = initials;
  if (topAvatar) { topAvatar.textContent = initials; topAvatar.setAttribute("aria-label", `Open profiles · ${profile.name}`); }
  if (streakLabel) streakLabel.textContent = `${streak} day${streak === 1 ? "" : "s"} streak`;
}
function renderDashboard() {
  const doneCount = completed.filter(Boolean).length;
  const progress = Math.round(doneCount / modules.length * 100);
  const totalLessons = modules.reduce((sum, module) => sum + module.lessons, 0);
  const completedLessons = modules.reduce((sum, module, index) => sum + (completed[index] ? module.lessons : 0), 0);
  const nextIndex = completed.findIndex((isDone) => !isDone);
  const selectedIndex = nextIndex === -1 ? modules.length - 1 : nextIndex;
  const nextModule = modules[selectedIndex];
  const streak = getCurrentStreak();
  const week = getWeekActivity();
  const activeDays = week.filter((day) => day.active).length;
  const firstName = activeProfile().name.trim().split(/\s+/)[0];
  const moduleProgress = completed[selectedIndex] ? 100 : 0;
  const weekBars = week.map((day, index) => {
    const label = new Intl.DateTimeFormat(undefined, { weekday: "short" }).format(day.date);
    const height = day.active ? 42 + ((index * 17) % 45) : 14;
    return `<div class="day-bar" title="${label}: ${day.active ? "progress logged" : "no progress yet"}" aria-label="${label}: ${day.active ? "progress logged" : "no progress yet"}"><i class="bar" style="height:${height}%;background:${day.active ? "#64bd81" : "#e9eee8"}"></i></div>`;
  }).join("");
  const weekLabels = week.map((day) => `<span>${esc(new Intl.DateTimeFormat(undefined, { weekday: "short" }).format(day.date).slice(0, 1))}</span>`).join("");
  return `
    <div class="greeting-row"><div><div class="eyebrow">YOUR LEARNING, AT A GLANCE</div><h1>Good morning, ${esc(firstName)} <span aria-hidden="true">☀</span></h1><p>Small steps make for a very good data scientist.</p></div><div class="date-pill">${ICON("clock")}<span>${esc(dateLabel())}</span></div></div>
    <section class="dashboard-hero"><div class="hero-copy"><div class="hero-kicker"><span></span>YOUR NEXT LITTLE WIN</div><h2>${doneCount === modules.length ? "You made it through the learning path." : "Curiosity is a great place to start."}</h2><p>${doneCount === modules.length ? "Your six modules are complete. Keep exploring in the workspace or research studio." : `Your next module is ${esc(nextModule.title)}. Pick up whenever you’re ready.`}</p><button class="button-primary" data-go="learning">${doneCount === modules.length ? "Review your learning" : "Continue your learning"} ${ICON("arrow")}</button></div><div class="hero-art" aria-hidden="true"><div class="hero-orbit"></div><span class="hero-spark spark-one">✳</span><span class="hero-spark spark-two">✦</span><div class="hero-chip chip-top">↗ finding patterns</div><div class="chart-card"><div class="chart-label"><span>YOUR PRACTICE</span><span>${progress}%</span></div><svg class="chart-svg" viewBox="0 0 190 80" preserveAspectRatio="none"><defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#afe6bb" stop-opacity=".32"/><stop offset="1" stop-color="#afe6bb" stop-opacity="0"/></linearGradient></defs><path class="chart-grid" d="M0 18H190M0 43H190M0 68H190"/><path class="chart-fill" d="M0 66 C23 63 26 54 45 57 S71 46 89 49 S116 23 131 32 S159 16 190 7V80H0Z"/><path class="chart-line" d="M0 66 C23 63 26 54 45 57 S71 46 89 49 S116 23 131 32 S159 16 190 7"/><circle class="chart-node" cx="131" cy="32" r="3.6"/><circle class="chart-node" cx="190" cy="7" r="3.6"/></svg></div><div class="hero-chip chip-bottom"><b>✳</b> one question at a time</div></div></section>
    <section class="metrics-row"><div class="metric-card"><span class="metric-icon mint">${ICON("trend")}</span><span class="metric-copy"><small>Learning path</small><b>${progress}% <em>${doneCount} of ${modules.length} modules</em></b></span></div><div class="metric-card"><span class="metric-icon yellow">✳</span><span class="metric-copy"><small>Day streak</small><b>${streak} day${streak === 1 ? "" : "s"} <em>${streak ? "nice rhythm" : "start today"}</em></b></span></div><div class="metric-card"><span class="metric-icon lavender">${ICON("clock")}</span><span class="metric-copy"><small>Modules complete</small><b>${doneCount} <em>of ${modules.length}</em></b></span></div><div class="metric-card"><span class="metric-icon blue">${ICON("target")}</span><span class="metric-copy"><small>Lessons complete</small><b>${completedLessons} <em>of ${totalLessons}</em></b></span></div></section>
    <div class="dashboard-grid"><section><div class="section-heading"><h2>Pick up where you left off</h2><button data-go="learning">See your path ${ICON("arrow")}</button></div><article class="continue-card"><div class="course-art"><svg viewBox="0 0 48 48"><path d="M9 36h29M13 35V17l9-6 10 6v18M17 22h10M17 27h10M19 35v-4h7v4M9 17l13-9 16 9"/><circle cx="33" cy="13" r="3"/></svg></div><div class="course-info"><span class="course-tag">${doneCount === modules.length ? "ALL MODULES COMPLETE" : `MODULE ${String(selectedIndex + 1).padStart(2, "0")} · ${nextModule.lessons} LESSONS`}</span><h3>${esc(nextModule.title)}</h3><p>${doneCount === modules.length ? "Choose another topic to keep exploring." : esc(nextModule.desc)}</p><div class="progress-line"><span style="width:${moduleProgress}%"></span></div><div class="course-progress-meta"><span>${completed[selectedIndex] ? `${nextModule.lessons} of ${nextModule.lessons} lessons` : `0 of ${nextModule.lessons} lessons`}</span><span>${moduleProgress}%</span></div></div><button class="icon-button" data-go="learning" aria-label="Continue learning">${ICON("arrow")}</button></article>
      <div class="section-heading"><h2>A learning path that feels doable</h2><button data-go="learning">All modules ${ICON("arrow")}</button></div><div class="mini-course-grid">${modules.slice(1, 5).map((m, i) => `<article class="mini-course" data-go="learning"><span class="mini-color ${m.color}" style="background:${{ mint: "#e7f5e8", yellow: "#faf2d5", blue: "#e4f2f8", lavender: "#efedfc" }[m.color]}">${["⌘", "▤", "◫", "⌁"][i]}</span><span><b>${esc(m.title)}</b><small>${m.lessons} bite-sized lessons · ${m.time}</small></span></article>`).join("")}</div>
    </section><aside><div class="section-heading"><h2>Your week, gently</h2><button class="text-link" data-go="learning">This week</button></div><div class="week-card"><div class="week-header"><strong>Learning days</strong><span>${activeDays} / 7 days</span></div><div class="week-bars">${weekBars}</div><div class="day-labels">${weekLabels}</div></div><div class="section-heading"><h2>Today’s small plan</h2><span class="eyebrow">15 MIN</span></div><div class="side-card plan-list">${["Meet your first variable", "Explore the student scores", "Write one curious question"].map((label, i) => `<div class="plan-item ${tasks[i] ? "is-done" : ""}"><button class="plan-checkbox ${tasks[i] ? "checked" : ""}" data-task="${i}" aria-label="${tasks[i] ? "Mark incomplete" : "Mark complete"}">${tasks[i] ? ICON("check") : ""}</button><span><b>${label}</b><small>${["5 min · Lesson", "7 min · Practice", "3 min · Research"][i]}</small></span></div>`).join("")}</div><article class="insight-card"><span>A NOTE TO KEEP</span><h3>Start with a question you actually want answered.</h3><button data-go="research">Try the research studio →</button></article></aside></div>`;
}
function renderLearning() {
  const doneCount = completed.filter(Boolean).length;
  const nextIndex = completed.findIndex((isDone) => !isDone);
  return `<div class="page-head"><div><div class="eyebrow">A FRIENDLY ROADMAP</div><h1 class="page-title">Your learning path</h1><p class="page-subtitle">One idea, one small exercise, one step at a time.</p></div><button class="button-primary" data-go="workspace">Open your workspace ${ICON("code")}</button></div>
    <section class="learning-banner"><div><div class="eyebrow">THE FOUNDATIONS</div><h2>A little knowledge goes a long way.</h2><p>Learn at your own pace. Everything you need is right here.</p></div><div class="banner-progress"><div><span>Your progress</span><b>${doneCount} / ${modules.length} modules</b></div><div class="progress-line"><span style="width:${Math.round(doneCount / modules.length * 100)}%"></span></div></div></section>
    <div class="path-layout"><section class="module-list">${modules.map((m, i) => `<article class="module-card ${!completed[i] && nextIndex === i ? "current" : ""} ${completed[i] ? "done" : ""}" data-module="${i}"><div class="module-number">${completed[i] ? ICON("check") : String(i + 1).padStart(2, "0")}</div><div><h3>${esc(m.title)}</h3><p>${esc(m.desc)}</p><div class="module-meta"><span>${ICON("play")}${m.lessons} lessons</span><span>${ICON("clock")}${m.time}</span></div></div><span class="module-status">${completed[i] ? "Complete" : nextIndex === i ? "In progress" : "Up next"}</span></article>`).join("")}</section>
    <aside class="module-side"><div class="side-card"><span class="eyebrow">A SMALL REMINDER</span><h3>You don’t have to know it all yet.</h3><p>Data science is a practice. Every question, wrong turn and “aha!” moment is part of the work.</p></div><div class="side-card"><h3>Your learning rhythm</h3><p style="margin-bottom:12px">Short sessions beat perfect plans. Pick what feels right today.</p><div class="course-stat-row"><span>About this path</span><b>6 modules</b></div><div class="course-stat-row"><span>Time to explore</span><b>~6 hours</b></div><div class="course-stat-row"><span>Your pace</span><b>All yours</b></div></div><div class="side-card"><h3>Try it as you learn</h3><p style="margin-bottom:12px">A real Python workspace is just a click away.</p><button class="button-quiet" data-go="workspace">Go to the code lab ${ICON("arrow")}</button></div></aside></div>`;
}
function tableHtml(data) { return `<div class="table-overflow"><table class="dataset-table"><thead><tr>${data.headers.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${data.rows.map((row) => `<tr>${row.map((cell) => `<td>${esc(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table></div><div class="dataset-note">Showing 4 of 6 rows · ${esc(data.file)}</div>`; }
function renderWorkspace() {
  const data = datasets[currentDataset] || datasets.scores;
  const lines = codeText.split("\n").length;
  return `<div class="page-head"><div><div class="eyebrow">YOUR PLACE TO EXPERIMENT</div><h1 class="page-title">Code workspace</h1><p class="page-subtitle">A real Python sandbox in your browser. Try things, break them, try again.</p></div></div>
    <div class="workspace-toolbar"><select id="dataset-select" aria-label="Choose a sample dataset">${Object.entries(datasets).map(([id, d]) => `<option value="${id}" ${id === currentDataset ? "selected" : ""}>${esc(d.label)}</option>`).join("")}</select><button class="button-outline" id="reset-code">Reset example</button><button class="button-outline" id="download-csv">${ICON("download")} Download CSV</button><span class="kernel-state" id="kernel-state"><i></i><span>Python kernel is sleeping</span></span></div>
    <div class="workspace-layout"><section><div class="editor-card"><div class="editor-top"><span class="file-tab"><span>●</span> analysis.py</span><div class="editor-buttons"><button id="format-code" title="Reset example">Reset</button><button class="button-quiet" id="run-code">${ICON("play")} Run code <span>⌘ ↵</span></button></div></div><div class="editor-body"><div class="line-numbers" id="line-numbers">${Array.from({ length: lines }, (_, i) => i + 1).join("\n")}</div><textarea id="code-editor" class="code-editor" aria-label="Python code editor" spellcheck="false" autocapitalize="off" autocomplete="off">${esc(codeText)}</textarea></div><div class="editor-bottom"><span>Python · pandas ready to explore</span><span id="cursor-position">Ln 1, Col 1</span></div></div>
      <div class="output-card" style="margin-top:12px"><div class="output-header"><strong>▸ &nbsp;OUTPUT</strong><button id="clear-output">Clear output</button></div><div class="output-body" id="output-body"><div class="output-empty">Your results will show up here. Press <b>Run code</b> when you’re ready.</div></div></div></section>
      <aside class="workspace-sidebar"><div class="guide-card"><div class="guide-card-head"><span class="metric-icon mint">${ICON("target")}</span><h3>Your tiny challenge</h3></div><p>Look for a pattern. Does study time seem connected to exam scores? Use the data to support your guess.</p>${["Peek at the first few rows with <code>df.head()</code>", "Find the average with <code>df[\"exam_score\"].mean()</code>", "Describe one thing that surprised you"].map((t, i) => `<div class="task-step"><b>${i + 1}</b><span>${t}</span></div>`).join("")}<button class="button-quiet" style="margin-top:7px" data-go="research">Turn this into a question ${ICON("arrow")}</button></div>
      <div class="guide-card"><div class="guide-card-head"><span class="metric-icon blue">${ICON("database")}</span><h3>Your dataset</h3></div><p>${esc(data.label)} · a small, friendly sample to explore.</p>${tableHtml(data)}</div><div class="callout"><strong>Curiosity over correctness.</strong><span>Make a guess before you run the code. There’s no wrong first step.</span></div></aside></div>`;
}
function renderResearch() {
  const sourceRows = research.sources.map((src, i) => `<div class="source-row"><span class="source-icon">${ICON("link")}</span><span class="source-detail"><b>${esc(src.title)}</b><small>${esc(src.kind)}${src.url ? ` · ${esc(src.url)}` : ""}</small></span><button class="source-remove" data-remove-source="${i}" aria-label="Remove source">×</button></div>`).join("");
  return `<div class="page-head"><div><div class="eyebrow">FROM “I WONDER...” TO “HERE’S WHAT I FOUND”</div><h1 class="page-title">Research studio</h1><p class="page-subtitle">A gentle guide for asking, exploring and explaining.</p></div><button class="button-outline" id="export-research">${ICON("download")} Export brief</button></div>
    <div class="research-layout"><section class="research-main"><article class="research-card" id="research-question-card"><div class="research-section-head"><span class="research-step-num">01</span><div><h2>Start with a question you care about</h2><p>Good questions are curious, focused and answerable with evidence.</p></div></div><div class="form-field"><label for="research-title">Give your project a working title</label><input id="research-title" data-research="title" placeholder="e.g. A good night's sleep and student focus" value="${esc(research.title)}" /></div><div class="form-field"><label for="research-question">What do you want to find out?</label><textarea id="research-question" data-research="question" placeholder="I want to understand whether...">${esc(research.question)}</textarea><span class="field-hint">Try to ask one clear question. You can always change it later.</span><div class="question-examples"><button class="example-chip" data-example="Do students who sleep more tend to score better on exams?">Sleep & study</button><button class="example-chip" data-example="How does rainfall change through the year in my region?">Rain & seasons</button><button class="example-chip" data-example="What makes people choose one route over another?">Travel & choices</button></div></div></article>
      <article class="research-card" id="research-hypothesis-card"><div class="research-section-head"><span class="research-step-num">02</span><div><h2>Write down your first hunch</h2><p>A hypothesis is a testable prediction, not a promise that you’re right.</p></div></div><div class="form-field"><label for="research-hypothesis">What do you think you’ll find?</label><textarea id="research-hypothesis" data-research="hypothesis" placeholder="My guess is that... because...">${esc(research.hypothesis)}</textarea><span class="field-hint">Later, your analysis will help you see whether the evidence agrees.</span></div></article>
      <article class="research-card" id="research-evidence-card"><div class="research-section-head"><span class="research-step-num">03</span><div><h2>Gather a little trustworthy evidence</h2><p>Look for sources that explain where their numbers came from and when they were collected.</p></div></div><div class="source-list" id="source-list">${sourceRows || `<span class="field-hint">No sources yet. Add a dataset, article or report you want to explore.</span>`}</div><div class="source-add-row"><input id="source-title" placeholder="Source or dataset name" aria-label="Source or dataset name" /><input id="source-url" placeholder="Link or DOI (optional)" aria-label="Link or DOI" /><button id="add-source">${ICON("plus")} Add</button></div></article>
      <article class="research-card" id="research-plan-card"><div class="research-section-head"><span class="research-step-num">04</span><div><h2>Make a simple plan</h2><p>Decide what you’ll look at and how you’ll make sense of it.</p></div></div><div class="field-row"><div class="form-field"><label for="research-approach">What kind of analysis might help?</label><select id="research-approach" data-research="approach"><option value="" ${!research.approach ? "selected" : ""}>Choose an approach...</option><option ${research.approach === "Compare groups" ? "selected" : ""}>Compare groups</option><option ${research.approach === "Look for a relationship" ? "selected" : ""}>Look for a relationship</option><option ${research.approach === "Track change over time" ? "selected" : ""}>Track change over time</option><option ${research.approach === "Describe what is happening" ? "selected" : ""}>Describe what is happening</option></select></div><div class="form-field"><label for="research-audience">Who might find this useful?</label><input id="research-audience" data-research="audience" placeholder="e.g. students, local planners" value="${esc(research.audience)}" /></div></div><div class="form-field"><label for="research-data">What data would help answer your question?</label><textarea id="research-data" data-research="dataPlan" placeholder="I’ll need information about... collected from..."></textarea><span class="field-hint">Think about what each row represents and what might be missing.</span></div></article>
      <article class="research-card" id="research-reflection-card"><div class="research-section-head"><span class="research-step-num">05</span><div><h2>Leave room for a thoughtful answer</h2><p>Notice uncertainty, limitations and who your conclusion applies to.</p></div></div><div class="form-field"><label for="research-reflection">What could make your findings incomplete or surprising?</label><textarea id="research-reflection" data-research="reflection" placeholder="One thing I’ll keep in mind is..."></textarea></div></article></section>
    <aside class="research-aside"><div class="research-progress-card"><span class="eyebrow">YOUR RESEARCH FIELD NOTES</span><h3>A good question takes shape.</h3><p>Your progress saves on this device as you go.</p><div class="research-progress-track"><span id="research-progress-bar"></span></div><div class="research-progress-meta"><span id="research-progress-label">A few small steps</span><span id="research-progress-percent">0%</span></div><div class="research-steps-list" id="research-steps"></div></div><div class="side-card"><h3>What makes a source useful?</h3><p><b style="color:#435248">It’s clear.</b> You can tell who collected the data, when and how.</p><p style="margin-top:9px"><b style="color:#435248">It fits.</b> It can help answer your question, even if it isn’t perfect.</p><p style="margin-top:9px"><b style="color:#435248">It has limits.</b> Good research says what the data can’t tell us, too.</p></div><div class="side-card"><h3>Need a first step?</h3><p>Try exploring a small example dataset in your Python workspace.</p><button class="button-quiet" data-go="workspace">Open the workspace ${ICON("arrow")}</button></div></aside></div>`;
}
function renderResources() {
  const cards = [
    ["01 · THE PROCESS", "What is data science?", "A friendly tour of the loop: ask, collect, explore, learn and share.", "Start at the beginning", "learning"],
    ["02 · PYTHON", "Python, one small step at a time", "Variables, lists, functions and readable code for real questions.", "Try the code lab", "workspace"],
    ["03 · GOOD QUESTIONS", "A question worth answering", "Scope, curiosity and the difference between a question and a guess.", "Open research studio", "research"],
    ["04 · DATA", "Get to know your data", "Rows, columns, missing values and what your dataset can tell you.", "Inspect a dataset", "workspace"],
    ["05 · VISUALS", "Show, don’t just tell", "A quick guide to choosing a clear chart for the thing you found.", "Continue learning", "learning"],
    ["06 · CARE", "Ethics and everyday data", "Privacy, representation and asking who is missing from the picture.", "Keep exploring", "learning"],
  ];
  return `<div class="page-head"><div><div class="eyebrow">A POCKETFUL OF GOOD STARTING POINTS</div><h1 class="page-title">Field notes</h1><p class="page-subtitle">Helpful concepts, tools and gentle reminders for the journey.</p></div><button class="button-outline" id="open-search">${ICON("search")} Find a topic</button></div><div class="resource-note"><b>Keep it useful.</b> Pick a note that answers the question you have right now. There’s no need to read everything before you begin.</div><div class="resource-grid">${cards.map(([tag, title, desc, action, page], i) => `<article class="resource-card"><span class="resource-tag"><i style="background:${["#9fcba7", "#e2bf71", "#da9b89", "#83b5c2", "#aaa0db", "#8bbfa1"][i]}"></i>${tag}</span><h3>${title}</h3><p>${desc}</p><a href="#${page}" data-go="${page}">${action} →</a></article>`).join("")}</div>`;
}
function syncEditor() {
  const editor = document.getElementById("code-editor"); if (!editor) return;
  const data = datasets[currentDataset] || datasets.scores;
  if (profileRead("code", null) === null) codeText = data.code;
  editor.value = codeText;
  updateLineNumbers();
}
function updateLineNumbers() {
  const editor = document.getElementById("code-editor"); const lines = document.getElementById("line-numbers");
  if (!editor || !lines) return;
  lines.textContent = Array.from({ length: Math.max(1, editor.value.split("\n").length) }, (_, i) => i + 1).join("\n");
  const before = editor.value.slice(0, editor.selectionStart); const row = before.split("\n").length; const col = before.length - before.lastIndexOf("\n");
  const pos = document.getElementById("cursor-position"); if (pos) pos.textContent = `Ln ${row}, Col ${col}`;
}
function setKernelState(text, state = "") { const node = document.getElementById("kernel-state"); if (!node) return; node.className = `kernel-state ${state}`; node.innerHTML = `<i></i><span>${esc(text)}</span>`; }
function ensureWorker() {
  if (pyWorker) return pyWorker;
  pyWorker = new Worker("python.worker.js"); workerReady = false;
  pyWorker.onmessage = (event) => {
    const msg = event.data;
    if (msg.type === "ready") { workerReady = true; setKernelState("Python is ready", "ready"); if (workerBusy) { workerBusy = false; runCode(); } }
    if (msg.type === "output") { clearTimeout(runTimeout); workerBusy = false; document.getElementById("run-code")?.removeAttribute("disabled"); renderOutput(msg.output || "Code ran successfully. No output yet — try adding a print() statement.", false); recordProgress(); }
    if (msg.type === "error") { clearTimeout(runTimeout); workerBusy = false; document.getElementById("run-code")?.removeAttribute("disabled"); setKernelState("Kernel needs a restart"); renderOutput(msg.message || "Something went wrong. Check your code and try again.", true); }
  };
  pyWorker.onerror = () => { workerBusy = false; workerReady = false; setKernelState("Couldn’t load Python"); renderOutput("The Python kernel could not load. Check your internet connection, then press Run code to try again.", true); };
  return pyWorker;
}
function initKernel() {
  if (workerReady) { setKernelState("Python is ready", "ready"); return; }
  if (pyWorker) { setKernelState("Loading Python...", "loading"); return; }
  setKernelState("Loading Python...", "loading");
  ensureWorker().postMessage({ type: "init", csv: (datasets[currentDataset] || datasets.scores).csv });
  renderOutput("Starting a Python environment in your browser. This may take a moment the first time.", false);
}
function runCode() {
  if (workerBusy) return;
  if (!workerReady) { workerBusy = true; document.getElementById("run-code")?.setAttribute("disabled", "disabled"); initKernel(); return; }
  const editor = document.getElementById("code-editor"); if (!editor) return;
  codeText = editor.value; profileSave("code", codeText); workerBusy = true;
  document.getElementById("run-code")?.setAttribute("disabled", "disabled");
  setKernelState("Running your code...", "loading"); renderOutput("Running your code…", false);
  pyWorker.postMessage({ type: "run", code: codeText });
  runTimeout = setTimeout(() => {
    pyWorker?.terminate(); pyWorker = null; workerReady = false; workerBusy = false;
    document.getElementById("run-code")?.removeAttribute("disabled"); setKernelState("Run stopped · restart to continue");
    renderOutput("This run took too long, so the Python kernel was restarted. Check for a loop that never ends, then press Run code again.", true);
  }, 12000);
}
function renderOutput(value, isError) { const out = document.getElementById("output-body"); if (out) out.innerHTML = `<pre class="${isError ? "output-error" : ""}">${esc(value)}</pre>`; }
function stopKernel() { if (!pyWorker) return; pyWorker.terminate(); pyWorker = null; workerReady = false; workerBusy = false; clearTimeout(runTimeout); setKernelState("Python kernel stopped"); toast("Python kernel stopped"); }
function bindResearchInputs() {
  document.querySelectorAll("[data-research]").forEach((el) => {
    const key = el.dataset.research;
    if (key === "dataPlan" || key === "reflection") el.value = research[key] || "";
    el.addEventListener("input", () => { research[key] = el.value; profileSave("research", research); updateResearchProgress(); if (el.value.trim()) recordProgress(); });
    el.addEventListener("change", () => { research[key] = el.value; profileSave("research", research); updateResearchProgress(); if (el.value.trim()) recordProgress(); });
  });
  document.getElementById("add-source")?.addEventListener("click", addSource);
  document.getElementById("source-url")?.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); addSource(); } });
  document.getElementById("export-research")?.addEventListener("click", exportResearch);
  document.querySelectorAll("[data-example]").forEach((button) => button.addEventListener("click", () => {
    research.question = button.dataset.example; const field = document.getElementById("research-question"); if (field) field.value = research.question; profileSave("research", research); updateResearchProgress(); recordProgress();
  }));
  document.querySelectorAll("[data-remove-source]").forEach((button) => button.addEventListener("click", () => { research.sources.splice(Number(button.dataset.removeSource), 1); profileSave("research", research); setPage("research"); }));
}
function updateResearchProgress() {
  const done = [Boolean(research.title.trim() && research.question.trim()), Boolean(research.hypothesis.trim()), Boolean(research.sources.length), Boolean(research.approach && research.dataPlan.trim()), Boolean(research.reflection?.trim())];
  const percent = Math.round(done.filter(Boolean).length / done.length * 100);
  const bar = document.getElementById("research-progress-bar"); const label = document.getElementById("research-progress-label"); const pct = document.getElementById("research-progress-percent"); const list = document.getElementById("research-steps");
  if (!bar) return;
  bar.style.width = `${percent}%`; pct.textContent = `${percent}%`; label.textContent = percent === 100 ? "A thoughtful plan" : done.filter(Boolean).length ? `${done.filter(Boolean).length} of 5 little steps` : "A few small steps";
  list.innerHTML = ["Frame a question", "Write a hunch", "Find a source", "Plan an analysis", "Name a limitation"].map((name, i) => `<span class="research-step-link ${done[i] ? "done" : ""}"><i>${done[i] ? "✓" : i + 1}</i>${name}</span>`).join("");
}
function addSource() {
  const titleEl = document.getElementById("source-title"); const urlEl = document.getElementById("source-url");
  const title = titleEl.value.trim(); if (!title) { titleEl.focus(); toast("Give this source a name first"); return; }
  research.sources.push({ title, url: urlEl.value.trim(), kind: /\.csv($|\?)|dataset|data/i.test(`${title} ${urlEl.value}`) ? "Dataset / data" : "Article / reference" });
  profileSave("research", research); recordProgress(); setPage("research"); toast("Source added to your field notes");
}
function exportResearch() {
  const lines = [`# ${research.title || "My research field notes"}`, "", `**Research question:** ${research.question || "_To be decided_"}`, "", `**My first hunch:** ${research.hypothesis || "_To be decided_"}`, "", `**Approach:** ${research.approach || "_To be decided_"}`, "", `**Useful for:** ${research.audience || "_To be decided_"}`, "", `**Data I need:** ${research.dataPlan || "_To be decided_"}`, "", `**A limitation to keep in mind:** ${research.reflection || "_To be decided_"}`, "", "## Sources", ...(research.sources.length ? research.sources.map((s) => `- ${s.title}${s.url ? ` — ${s.url}` : ""}`) : ["- Add a dataset or reference when you find one."]), "", "---", "Drafted in Datafield · Keep asking good questions."];
  const blob = new Blob([lines.join("\n")], { type: "text/markdown;charset=utf-8" }); const url = URL.createObjectURL(blob); const link = document.createElement("a"); link.href = url; link.download = `${(research.title || "research-field-notes").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}.md`; link.click(); URL.revokeObjectURL(url); toast("Research brief downloaded");
}
function openLesson(index) {
  const m = modules[index]; const lesson = lessonPlans[index];
  const panel = document.createElement("div"); panel.className = "lesson-modal"; panel.setAttribute("role", "dialog"); panel.setAttribute("aria-modal", "true");
  panel.innerHTML = `<article class="lesson-panel"><button class="icon-button small lesson-close" aria-label="Close lesson">${ICON("x")}</button><div class="eyebrow">MODULE ${String(index + 1).padStart(2, "0")} · ${esc(m.time)} · A FIELD NOTE</div><h2>${esc(m.title)}</h2><p>${lesson.intro}</p><div class="lesson-callout"><span class="eyebrow">THE IDEA</span><p>${lesson.concept}</p></div><div class="lesson-example"><span class="eyebrow">A SMALL EXAMPLE</span><p>${lesson.example}</p></div><div class="lesson-practice"><span class="eyebrow">YOUR TURN</span><p>${lesson.exercise}</p></div><div class="lesson-actions"><button class="button-primary" id="practice-module">${index === 1 || index === 2 ? "Try it in the workspace" : index === 5 ? "Open the research studio" : "I’m ready to explore"} ${ICON("arrow")}</button><button class="button-outline" id="complete-module">${completed[index] ? "Mark as in progress" : "Mark this module complete"}</button></div></article>`;
  document.body.appendChild(panel); panel.querySelectorAll(".lesson-close").forEach((b) => b.addEventListener("click", () => panel.remove())); panel.addEventListener("click", (e) => { if (e.target === panel) panel.remove(); });
  panel.querySelector("#practice-module").addEventListener("click", () => { panel.remove(); setPage(index === 5 ? "research" : (index === 1 || index === 2 ? "workspace" : "learning")); });
  panel.querySelector("#complete-module").addEventListener("click", () => { completed[index] = !completed[index]; profileSave("completed", completed); if (completed[index]) recordProgress(); panel.remove(); setPage("learning"); toast(completed[index] ? "Module marked complete — lovely work" : "Module back in progress"); });
}
function updateSearch(query) {
  const host = document.getElementById("search-results"); if (!host) return;
  const normalized = query.trim().toLowerCase(); const found = lessonSearch.filter((item) => !normalized || `${item.title} ${item.detail}`.toLowerCase().includes(normalized));
  host.innerHTML = found.length ? found.map((item) => `<button class="search-result" data-search-page="${item.page}">${ICON(item.page === "workspace" ? "code" : item.page === "research" ? "flask" : "book")}<span><b>${esc(item.title)}</b><small>${esc(item.detail)}</small></span>${ICON("arrow")}</button>`).join("") : `<div class="search-empty">No matches yet. Try “Python” or “research”.</div>`;
}
function showSearch() { const dialog = document.getElementById("search-dialog"); dialog.showModal(); updateSearch(""); setTimeout(() => document.getElementById("search-input").focus(), 40); }
const profileColors = ["#e3f1e5", "#fbf1d3", "#e9e6fb", "#e1f0f5", "#f9e7df", "#e9eee0"];
function profileColor(index) { return profileColors[index % profileColors.length]; }
function renderProfileList() {
  const list = document.getElementById("profile-list");
  list.innerHTML = profiles.map((profile) => {
    const selected = profile.id === activeProfileId;
    return `<button class="profile-card ${selected ? "selected" : ""}" type="button" data-profile-id="${esc(profile.id)}"><span class="profile-list-avatar" style="--profile-color:${profileColor(profile.color || 0)}">${esc(profileInitials(profile.name))}</span><span class="profile-card-copy"><b>${esc(profile.name)}</b><small>${selected ? "Currently active" : "Local learner profile"}</small></span><span class="profile-card-check">${selected ? ICON("check") : ICON("arrow")}</span></button>`;
  }).join("");
}
function showProfileMenu() {
  renderProfileList();
  document.getElementById("create-profile-form").hidden = true;
  document.getElementById("show-create-profile").hidden = false;
  document.getElementById("profile-dialog").showModal();
}
function loadProfileData() {
  currentDataset = profileRead("dataset", "scores");
  if (!datasets[currentDataset]) currentDataset = "scores";
  codeText = profileRead("code", datasets[currentDataset].code);
  research = profileRead("research", { title: "", question: "", hypothesis: "", audience: "", approach: "", dataPlan: "", reflection: "", sources: [] });
  if (!Array.isArray(research.sources)) research.sources = [];
  tasks = profileRead("tasks", [false, false, false]);
  completed = profileRead("completed", [false, false, false, false, false, false]);
  activity = profileRead("activity", []);
  if (!Array.isArray(activity)) activity = [];
}
function switchProfile(profileId) {
  if (!profiles.some((profile) => profile.id === profileId)) return;
  if (pyWorker) { pyWorker.terminate(); pyWorker = null; workerReady = false; workerBusy = false; clearTimeout(runTimeout); }
  activeProfileId = profileId;
  STORE.set("activeProfileId", activeProfileId);
  loadProfileData();
  document.getElementById("profile-dialog").close();
  setPage(currentPage);
  toast(`Switched to ${activeProfile().name}`);
}
function createProfile(name) {
  const cleanName = name.trim().replace(/\s+/g, " ");
  if (!cleanName) return;
  const id = `learner-${globalThis.crypto?.randomUUID?.() || Date.now().toString(36)}`;
  const profile = { id, name: cleanName, color: profiles.length % profileColors.length };
  profiles.push(profile);
  STORE.set("profiles", profiles);
  STORE.setProfile(id, "tasks", [false, false, false]);
  STORE.setProfile(id, "completed", [false, false, false, false, false, false]);
  STORE.setProfile(id, "activity", []);
  switchProfile(id);
}
document.getElementById("profile-button").addEventListener("click", showProfileMenu);
document.getElementById("top-profile-button").addEventListener("click", showProfileMenu);
document.getElementById("show-create-profile").addEventListener("click", () => {
  document.getElementById("show-create-profile").hidden = true;
  document.getElementById("create-profile-form").hidden = false;
  document.getElementById("new-profile-name").focus();
});
document.getElementById("cancel-create-profile").addEventListener("click", () => {
  document.getElementById("create-profile-form").hidden = true;
  document.getElementById("show-create-profile").hidden = false;
  document.getElementById("new-profile-name").value = "";
});
document.getElementById("create-profile-form").addEventListener("submit", (event) => {
  event.preventDefault();
  createProfile(document.getElementById("new-profile-name").value);
});
document.getElementById("profile-list").addEventListener("click", (event) => {
  const choice = event.target.closest("[data-profile-id]");
  if (!choice) return;
  if (choice.dataset.profileId === activeProfileId) document.getElementById("profile-dialog").close();
  else switchProfile(choice.dataset.profileId);
});
document.getElementById("close-profile-menu").addEventListener("click", () => document.getElementById("profile-dialog").close());
document.getElementById("profile-dialog").addEventListener("click", (event) => { if (event.target.id === "profile-dialog") event.target.close(); });

document.addEventListener("click", (event) => {
  if (event.target.closest("#open-search")) { showSearch(); return; }
  if (event.target.id === "run-code") runCode();
  if (event.target.id === "clear-output") renderOutput("Output cleared. Your next result will appear here.", false);
  if (event.target.id === "reset-code" || event.target.id === "format-code") { const editor = document.getElementById("code-editor"); if (editor) { codeText = datasets[currentDataset].code; editor.value = codeText; profileSave("code", codeText); updateLineNumbers(); toast("Example restored"); } }
  if (event.target.id === "download-csv") { const data = datasets[currentDataset]; const link = document.createElement("a"); link.href = URL.createObjectURL(new Blob([data.csv], { type: "text/csv" })); link.download = data.file; link.click(); URL.revokeObjectURL(link.href); }
  if (event.target.id === "stop-kernel") stopKernel();
  const nav = event.target.closest("[data-page]"); if (nav) { event.preventDefault(); setPage(nav.dataset.page); return; }
  const go = event.target.closest("[data-go]"); if (go) { event.preventDefault(); setPage(go.dataset.go); return; }
  const task = event.target.closest("[data-task]"); if (task) { const index = Number(task.dataset.task); tasks[index] = !tasks[index]; profileSave("tasks", tasks); if (tasks[index]) recordProgress(); setPage("dashboard"); return; }
  const module = event.target.closest("[data-module]"); if (module) { openLesson(Number(module.dataset.module)); return; }
  const result = event.target.closest("[data-search-page]"); if (result) { document.getElementById("search-dialog").close(); setPage(result.dataset.searchPage); }
});
document.addEventListener("input", (event) => {
  if (event.target.id === "code-editor") { codeText = event.target.value; profileSave("code", codeText); updateLineNumbers(); }
  if (event.target.id === "search-input") updateSearch(event.target.value);
});
document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); showSearch(); }
  if ((event.metaKey || event.ctrlKey) && event.key === "Enter" && currentPage === "workspace") { event.preventDefault(); runCode(); }
  if (event.target.id === "code-editor" && event.key === "Tab") { event.preventDefault(); const el = event.target; const start = el.selectionStart; const end = el.selectionEnd; el.setRangeText("    ", start, end, "end"); codeText = el.value; profileSave("code", codeText); updateLineNumbers(); }
});
document.getElementById("mobile-menu").addEventListener("click", () => {
  const sidebar = document.getElementById("sidebar"); sidebar.classList.toggle("open");
  let overlay = document.querySelector(".mobile-overlay"); if (!overlay) { overlay = document.createElement("div"); overlay.className = "mobile-overlay"; document.body.appendChild(overlay); overlay.addEventListener("click", () => { sidebar.classList.remove("open"); overlay.classList.remove("show"); }); }
  overlay.classList.toggle("show", sidebar.classList.contains("open"));
});
document.getElementById("open-search").addEventListener("click", showSearch);
document.getElementById("notifications").addEventListener("click", () => toast("You’re all caught up. Take a breath 🌿"));
document.getElementById("new-project").addEventListener("click", () => { setPage("research"); if (!research.title) { research.title = "My new research project"; const field = document.getElementById("research-title"); field.value = research.title; profileSave("research", research); updateResearchProgress(); } document.getElementById("research-title")?.focus(); });
document.getElementById("search-dialog").addEventListener("click", (e) => { if (e.target.id === "search-dialog") e.target.close(); });
document.addEventListener("click", (event) => {
  if (event.target.id === "run-code") runCode();
});
document.addEventListener("change", (event) => {
  if (event.target.id === "dataset-select") {
    currentDataset = event.target.value; profileSave("dataset", currentDataset); codeText = datasets[currentDataset].code; profileSave("code", codeText);
    const editor = document.getElementById("code-editor"); if (editor) { editor.value = codeText; updateLineNumbers(); }
    const table = document.querySelector(".workspace-sidebar .dataset-table")?.closest(".guide-card"); if (table) { const p = table.querySelector("p"); p.textContent = `${datasets[currentDataset].label} · a small, friendly sample to explore.`; table.querySelector(".table-overflow").outerHTML = tableHtml(datasets[currentDataset]); }
    pyWorker?.postMessage({ type: "dataset", csv: datasets[currentDataset].csv });
  }
});
document.addEventListener("focusin", (event) => { if (event.target.id === "code-editor") updateLineNumbers(); });
document.addEventListener("selectionchange", () => { if (document.activeElement?.id === "code-editor") updateLineNumbers(); });
const pageFromHash = location.hash.replace(/^#/, "");
setPage(["dashboard", "learning", "workspace", "research", "resources"].includes(pageFromHash) ? pageFromHash : "dashboard");
