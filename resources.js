(function () {
  "use strict";
  const form = document.getElementById("resourceForm");
  const results = document.getElementById("resourceResults");
  const official = {
    "CBSE": { name: "CBSE Academic", url: "https://cbseacademic.nic.in/" },
    "ICSE/ISC": { name: "CISCE official website", url: "https://cisce.org/" },
    "Andhra Pradesh State Board": { name: "AP SCERT — official site", url: "https://scert.ap.gov.in/" },
    "Telangana State Board": { name: "Telangana SCERT — official site", url: "https://scert.telangana.gov.in/" },
    "Not applicable": { name: "University / exam authority search", url: "" }
  };
  const examSources = {
    "JEE Main / Advanced": ["https://jeemain.nta.nic.in/", "https://jeeadv.ac.in/"],
    "NEET UG": ["https://exams.nta.ac.in/NEET/"],
    "CUET UG / PG": ["https://exams.nta.ac.in/"],
    "UPSC Civil Services": ["https://upsc.gov.in/"],
    "SSC CGL / CHSL": ["https://ssc.gov.in/"],
    "Banking exams (IBPS / SBI)": ["https://www.ibps.in/", "https://sbi.co.in/web/careers"],
    "GATE": [],
    "CAT": ["https://iimcat.ac.in/"],
    "CLAT": ["https://consortiumofnlus.ac.in/"],
    "CTET / TET": ["https://ctet.nic.in/"],
    "NDA": ["https://upsc.gov.in/"],
    "CA Foundation / Intermediate / Final": ["https://www.icai.org/"],
    "CMA": ["https://icmai.in/"],
    "CS Executive / Professional": ["https://www.icsi.edu/"],
    "UGC NET": ["https://ugcnet.nta.ac.in/"],
    "State PSC": ["https://www.upsc.gov.in/"]
  };
  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function searchUrl(query) { return "https://www.google.com/search?q=" + encodeURIComponent(query); }
  function videoUrl(query) { return "https://www.youtube.com/results?search_query=" + encodeURIComponent(query); }
  function card(icon, title, description, url, label, secondaryUrl, secondaryLabel) {
    return '<article class="resource-card"><span class="resource-card-icon">' + icon + '</span><h3>' + esc(title) + '</h3><p>' + esc(description) + '</p><a href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">' + esc(label || "Open resources") + ' ↗</a>' +
      (secondaryUrl ? '<a class="secondary-link" href="' + esc(secondaryUrl) + '" target="_blank" rel="noopener noreferrer">' + esc(secondaryLabel || "More resources") + ' ↗</a>' : "") + '</article>';
  }
  function build(event) {
    event.preventDefault();
    const data = new FormData(form);
    const level = data.get("level"), board = data.get("board"), classLevel = data.get("classLevel");
    const stream = data.get("stream"), subject = String(data.get("subjectInput") || "").trim(), exam = data.get("exam");
    const depth = data.get("depth");
    if (!subject) return;
    const identity = [board !== "Not applicable" ? board : "", classLevel, stream !== "General" ? stream : "", subject].filter(Boolean).join(" ");
    const source = official[board] || null;
    const prompt = "Act as a careful subject tutor. Create original study notes for: " + identity + (exam ? "; competitive exam: " + exam : "") + ". Explanation level: " + depth + ". Include learning objectives, key terms, clear explanations, worked examples, common mistakes, a revision summary and practice questions with explained answers. Match the current official syllabus where possible. Do not invent syllabus facts, exam dates, citations or source links; clearly identify anything that needs verification.";
    const officialCard = source && source.url
      ? '<article class="resource-card"><span class="resource-card-icon">✓</span><h3>' + esc(source.name) + '</h3><p>Official source for checking curriculum documents. This is the only card that opens an external website.</p><a href="' + esc(source.url) + '" target="_blank" rel="noopener noreferrer">Open official portal ↗</a></article>'
      : '<article class="resource-card"><span class="resource-card-icon">✓</span><h3>Official syllabus</h3><p>Check your board, university or exam authority's official website for the current syllabus. Official documents may be hosted outside Edunime.</p></article>';
    const keyTerms = subject.split(/[—–,:;]/).map(x => x.trim()).filter(Boolean).slice(0, 5);
    const topicWords = subject.split(/\s+/).filter(Boolean).slice(0, 5);
    const questions = [
      "Explain the main idea of " + subject + " in your own words.",
      "List three important terms or facts related to " + subject + " and define them.",
      "Give one worked example or real-world application of " + subject + ".",
      "What is a common mistake learners make with " + subject + ", and how can it be avoided?",
      "Write a short exam-style answer about " + subject + " and check it against your textbook."
    ];
    const checklist = [
      "Write what I already know about " + subject + ".",
      "Read the matching section in my prescribed textbook or class notes.",
      "Make a list of key definitions, formulas or dates, as relevant.",
      "Work through one example without looking at the answer.",
      "Answer the practice questions below from memory.",
      "Review mistakes and revisit anything I could not explain."
    ];
    let html = '<div class="resource-result-head"><div><div class="eyebrow dark-eyebrow"><span class="eyebrow-dot"></span> YOUR IN-EDUNIME STUDY SPACE</div><h2>' + esc(subject) + '</h2><p>' + esc([classLevel, board, stream, exam].filter(Boolean).join(" · ")) + '</p></div></div>';
    html += '<div class="resource-card-grid">';
    html += '<article class="resource-card"><span class="resource-card-icon">📘</span><h3>Study guide</h3><p>A focused learning structure for your topic, with a clear order to follow and a checklist to track your study session.</p><a href="#inSiteStudy">Open study guide ↓</a></article>';
    html += '<article class="resource-card"><span class="resource-card-icon">✎</span><h3>Revision checklist</h3><p>Use the checklist on this page to organise your revision without leaving Edunime.</p><a href="#inSiteStudy">Start revision ↓</a></article>';
    html += '<article class="resource-card"><span class="resource-card-icon">◎</span><h3>Practice questions</h3><p>Try short self-check questions for your topic. Use your textbook or teacher’s notes to verify subject-specific answers.</p><a href="#inSiteStudy">Practice here ↓</a></article>';
    html += '<article class="resource-card"><span class="resource-card-icon">▤</span><h3>Flashcard starter</h3><p>Create a quick recall set from the topic words you entered. Edit the prompts as you learn more.</p><a href="#inSiteStudy">Open flashcards ↓</a></article>';
    html += '<article class="resource-card"><span class="resource-card-icon">▶</span><h3>Video learning</h3><p>Video search results cannot reliably be shown inside another page without a specific embeddable video. Edunime will not redirect you automatically.</p></article>';
    html += officialCard;
    html += '</div>';
    html += '<section class="resource-prompt in-site-study" id="inSiteStudy"><h3>Study guide — inside Edunime</h3><p>This is an in-site study framework tailored to your topic, not a claim that Edunime has fetched or verified a complete textbook chapter.</p><h4>1. Learning focus</h4><p>Topic: <strong>' + esc(subject) + '</strong></p><p>Level: ' + esc(level) + ' · Explanation style: ' + esc(depth) + '</p><h4>2. Key terms to investigate</h4><ul>' + (keyTerms.length ? keyTerms : [subject]).map(x => '<li>' + esc(x) + '</li>').join("") + '</ul><h4>3. Revision checklist</h4><ul class="in-site-checklist">' + checklist.map((x, i) => '<li><label><input type="checkbox"> ' + esc(x) + '</label></li>').join("") + '</ul><h4>4. Practice questions</h4><ol>' + questions.map(x => '<li>' + esc(x) + '</li>').join("") + '</ol><h4>5. Flashcard starter</h4><div class="in-site-flashcards">' + topicWords.map((word, i) => '<details><summary>Card ' + (i + 1) + ': What should I know about “' + esc(word) + '”?</summary><p>Write a one- or two-sentence definition, then add an example from your textbook or class notes.</p></details>').join("") + '</div><h4>6. Notes prompt</h4><p>Copy this prompt into an AI assistant if you want a longer draft. Review it against trusted course materials before using it.</p><pre id="notesPrompt">' + esc(prompt) + '</pre><button type="button" id="copyPrompt">Copy notes prompt</button> <span id="copyStatus" role="status"></span></section>';
    results.innerHTML = html;
    document.getElementById("copyPrompt").addEventListener("click", async function () {
      const status = document.getElementById("copyStatus");
      try {
        await navigator.clipboard.writeText(prompt);
        status.textContent = "Copied.";
      } catch (error) {
        const range = document.createRange(), pre = document.getElementById("notesPrompt");
        range.selectNodeContents(pre);
        const selection = window.getSelection();
        selection.removeAllRanges(); selection.addRange(range);
        status.textContent = "Select the highlighted text and copy it.";
      }
    });
    results.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  form.addEventListener("submit", build);
  const toggle = document.getElementById("menuToggle"), nav = document.getElementById("nav");
  if (toggle && nav) toggle.addEventListener("click", function () {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "×" : "☰";
  });
  document.getElementById("year").textContent = new Date().getFullYear();
})();