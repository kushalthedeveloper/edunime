(function () {
  "use strict";
  const KEYS = { profile: "edunime-student-profile", completed: "edunime-completed-lessons", quizzes: "edunime-quiz-history" };
  const subjects = [
    { slug: "mathematics", name: "Mathematics", topics: 6, symbol: "∑" },
    { slug: "science", name: "Science", topics: 6, symbol: "⚛" },
    { slug: "computer-science", name: "Computer Science", topics: 6, symbol: "</>" },
    { slug: "engineering", name: "Engineering", topics: 6, symbol: "⚙" },
    { slug: "business-economics", name: "Business & Economics", topics: 6, symbol: "↗" },
    { slug: "advanced-study", name: "Advanced Study", topics: 6, symbol: "✳" }
  ];
  function read(key, fallback) { try { const v = JSON.parse(localStorage.getItem(key)); return v == null ? fallback : v; } catch (e) { return fallback; } }
  function write(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch (e) { return false; } }
  function esc(value) { return String(value == null ? "" : value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
  function completed() { return read(KEYS.completed, []).filter(x => typeof x === "string"); }
  function quizzes() { return read(KEYS.quizzes, []).filter(x => x && typeof x === "object"); }
  function profile() { return Object.assign({ name: "", goal: "Build a steady learning habit", joined: new Date().toISOString() }, read(KEYS.profile, {})); }
  function renderDashboard() {
    const root = document.getElementById("dashboardApp");
    if (!root) return;
    const done = completed(), history = quizzes().slice().reverse(), total = subjects.reduce((sum, s) => sum + s.topics, 0);
    const percent = Math.round(done.length / total * 100), p = profile(), name = p.name.trim() || "Learner";
    const accuracy = history.length ? Math.round(history.filter(x => x.correct).length / history.length * 100) : 0;
    const achieved = [
      { title: "First step", detail: "Complete your first lesson", yes: done.length >= 1, icon: "✦" },
      { title: "Curious mind", detail: "Complete 5 lessons", yes: done.length >= 5, icon: "✧" },
      { title: "Learning explorer", detail: "Complete lessons in 3 subjects", yes: new Set(done.map(x => x.split(":")[0])).size >= 3, icon: "◎" },
      { title: "Quiz starter", detail: "Answer your first practice question", yes: history.length >= 1, icon: "✓" },
      { title: "Quiz champion", detail: "Get 5 answers correct", yes: history.filter(x => x.correct).length >= 5, icon: "★" },
      { title: "Consistent learner", detail: "Complete 10 lessons", yes: done.length >= 10, icon: "↗" }
    ];
    let html = '<section class="dash-welcome"><div><div class="dash-kicker">YOUR LEARNING SPACE</div><h1>Welcome' + (p.name.trim() ? ", " + esc(name) : ", learner") + '.</h1><p>Goal: ' + esc(p.goal || "Build a steady learning habit") + '</p></div><div class="dash-avatar">' + esc(name[0].toUpperCase()) + '</div></section>';
    html += '<section class="dash-stats"><article class="dash-stat"><span>LESSONS COMPLETED</span><strong>' + done.length + '</strong><small>out of ' + total + ' topics</small></article><article class="dash-stat"><span>OVERALL PROGRESS</span><strong>' + percent + '%</strong><div class="dash-mini-track"><i style="width:' + percent + '%"></i></div></article><article class="dash-stat"><span>QUIZ ACCURACY</span><strong>' + (history.length ? accuracy + "%" : "—") + '</strong><small>' + history.length + ' answers recorded</small></article><article class="dash-stat"><span>ACHIEVEMENTS</span><strong>' + achieved.filter(a => a.yes).length + '/' + achieved.length + '</strong><small>Keep exploring to unlock more</small></article></section>';
    html += '<section class="dash-section"><div class="dash-section-head"><div><div class="dash-kicker">KEEP MOVING</div><h2>Subject progress</h2></div><span>All learning paths</span></div><div class="dash-subjects">';
    html += subjects.map(s => { const n = done.filter(key => key.startsWith(s.slug + ":")).length, pct = Math.round(n / s.topics * 100); return '<article class="dash-subject"><div class="dash-subject-symbol">' + s.symbol + '</div><div class="dash-subject-main"><div class="dash-subject-title"><strong>' + s.name + '</strong><span>' + n + '/' + s.topics + '</span></div><div class="dash-mini-track"><i style="width:' + pct + '%"></i></div><small>' + pct + '% complete</small></div><a href="learning.html?subject=' + encodeURIComponent(s.slug) + '" aria-label="Open ' + s.name + '">↗</a></article>'; }).join("") + '</div></section>';
    html += '<section class="dash-columns"><div class="dash-section"><div class="dash-section-head"><div><div class="dash-kicker">CELEBRATE PROGRESS</div><h2>Achievements</h2></div></div><div class="dash-achievements">';
    html += achieved.map(a => '<article class="dash-achievement ' + (a.yes ? "unlocked" : "") + '"><span>' + a.icon + '</span><div><strong>' + a.title + '</strong><small>' + a.detail + '</small></div><b>' + (a.yes ? "UNLOCKED" : "LOCKED") + '</b></article>').join("") + '</div></div><div class="dash-section"><div class="dash-section-head"><div><div class="dash-kicker">PRACTICE HISTORY</div><h2>Recent answers</h2></div></div>';
    if (history.length) {
      html += '<div class="dash-history">' + history.slice(0, 8).map(item => '<div class="dash-history-row"><span class="' + (item.correct ? "answer-good" : "answer-retry") + '">' + (item.correct ? "✓" : "↻") + '</span><div><strong>' + esc(item.topic || "Practice question") + '</strong><small>' + esc(item.subjectName || "Edunime") + ' · ' + new Date(item.date).toLocaleDateString() + '</small></div><b>' + (item.correct ? "Correct" : "Review") + '</b></div>').join("") + '</div>';
    } else {
      html += '<div class="dash-empty"><span>✧</span><strong>Your quiz history starts here</strong><p>Answer practice questions in any lesson to see your results here.</p><a class="dash-button" href="learning.html?subject=mathematics">Start a lesson →</a></div>';
    }
    root.innerHTML = html + '</div></section>';
    const form = document.getElementById("profileForm");
    if (form) {
      form.elements.studentName.value = p.name || "";
      form.elements.studentGoal.value = p.goal || "";
      form.onsubmit = function (event) {
        event.preventDefault();
        const next = Object.assign({}, profile(), { name: form.elements.studentName.value.trim().slice(0, 40), goal: form.elements.studentGoal.value.trim().slice(0, 100) });
        const status = document.getElementById("profileStatus");
        if (write(KEYS.profile, next)) { status.textContent = "Profile saved on this device."; renderDashboard(); }
        else status.textContent = "Could not save. Check your browser storage settings.";
      };
    }
  }
  function addLessonStudyGuide() {
    const core = document.getElementById("coreContent");
    if (!core || document.getElementById("studyGuide")) return;
    const title = document.getElementById("lessonTitle")?.textContent || "this topic";
    const guide = document.createElement("section");
    guide.className = "lesson-block study-guide"; guide.id = "studyGuide";
    guide.innerHTML = '<div class="lesson-block-label">STUDY SMARTER</div><h2>Make this lesson stick</h2><div class="study-guide-grid"><div><span>01</span><strong>Explain it simply</strong><p>Describe “' + esc(title) + '” in your own words without looking at the lesson.</p></div><div><span>02</span><strong>Recall key ideas</strong><p>Close your notes and write down three important facts or steps you remember.</p></div><div><span>03</span><strong>Apply and review</strong><p>Try the practice question, check the explanation, and revisit anything unclear.</p></div></div>';
    const example = document.querySelector(".example-block");
    if (example) example.insertAdjacentElement("afterend", guide); else core.closest(".lesson-block")?.insertAdjacentElement("afterend", guide);
  }
  function trackQuizAnswers() {
    const options = document.getElementById("practiceOptions");
    if (!options || options.dataset.historyTracking === "true") return;
    options.dataset.historyTracking = "true";
    options.addEventListener("click", function (event) {
      const button = event.target.closest(".practice-option"); if (!button) return;
      const correct = button.classList.contains("correct"), params = new URLSearchParams(location.search);
      const slug = params.get("subject") || "mathematics", topicIndex = Number.parseInt(params.get("topic") || "0", 10) || 0;
      const title = document.getElementById("lessonTitle")?.textContent || "Practice question";
      const subject = subjects.find(s => s.slug === slug), history = quizzes();
      history.push({ subject: slug, subjectName: subject ? subject.name : slug, topic: title, topicIndex, correct, date: new Date().toISOString() });
      write(KEYS.quizzes, history.slice(-100));
    });
  }
  function enhanceNavigation() {
    document.querySelectorAll(".nav, .learning-nav").forEach(nav => {
      if (!nav.querySelector('[href="dashboard.html"]')) {
        const link = document.createElement("a");
        link.href = "dashboard.html";
        link.textContent = "My progress";
        nav.appendChild(link);
      }
    });
    const toggle = document.getElementById("menuToggle");
    const nav = document.getElementById("nav");
    if (document.body.classList.contains("dashboard-page") && toggle && nav && !toggle.dataset.menuReady) {
      toggle.dataset.menuReady = "true";
      toggle.addEventListener("click", function () {
        const open = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(open));
        toggle.textContent = open ? "×" : "☰";
      });
    }
  }
  function init() { enhanceNavigation(); addLessonStudyGuide(); trackQuizAnswers(); renderDashboard(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
  window.addEventListener("storage", function (event) { if ([KEYS.completed, KEYS.quizzes, KEYS.profile].includes(event.key)) renderDashboard(); });
})();