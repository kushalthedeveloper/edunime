(function () {
  "use strict";
  const form = document.getElementById("resourceForm");
  const results = document.getElementById("resourceResults");
  const year = document.getElementById("year");
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");

  if (year) year.textContent = new Date().getFullYear();
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "×" : "☰";
    });
  }

  if (!form || !results) {
    console.error("Edunime resources: form or results section was not found.");
    return;
  }

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    try {
      const data = new FormData(form);
      const level = data.get("level") || "school";
      const board = data.get("board") || "";
      const classLevel = data.get("classLevel") || "";
      const stream = data.get("stream") || "";
      const selected = String(data.get("subjectPreset") || "").trim();
      const typed = String(data.get("subjectInput") || "").trim();
      const exam = data.get("exam") || "";
      const depth = data.get("depth") || "detailed";
      const subject = typed ? (selected && selected !== "Other / exact topic" ? selected + " — " + typed : typed) : selected;

      if (!subject) {
        results.innerHTML = '<div class="resource-results-empty"><span>!</span><h2>Choose a subject or enter a topic.</h2><p>Select a subject in the form, or type a chapter/topic, then press the button again.</p></div>';
        document.getElementById("subjectPreset").focus();
        results.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      const identity = [board !== "Not applicable" ? board : "", classLevel, subject].filter(Boolean).join(" ");
      const prompt = "Act as a careful subject tutor. Create original study notes for: " + identity +
        (exam ? "; competitive exam: " + exam : "") + ". Explanation level: " + depth +
        ". Include learning objectives, key terms, clear explanations, worked examples, common mistakes, a revision summary and practice questions with explained answers. Match the current official syllabus where possible. Do not invent syllabus facts, exam dates, citations or source links; clearly identify anything that needs verification.";
      const checklist = [
        "Write what I already know about " + subject + ".",
        "Read the matching section in my prescribed textbook or class notes.",
        "List important definitions, formulas or dates, as relevant.",
        "Work through one example without looking at the answer.",
        "Answer the practice questions below from memory.",
        "Review mistakes and revisit anything I could not explain."
      ];
      const questions = [
        "Explain the main idea of " + subject + " in your own words.",
        "List three important terms or facts related to " + subject + " and define them.",
        "Give one worked example or real-world application of " + subject + ".",
        "What is a common mistake learners make with " + subject + ", and how can it be avoided?",
        "Write a short exam-style answer about " + subject + " and check it against your textbook."
      ];
      const terms = subject.split(/[—–,:;]/).map(function (x) { return x.trim(); }).filter(Boolean).slice(0, 5);
      const words = subject.split(/\s+/).filter(Boolean).slice(0, 5);
      const officialUrls = {
        "CBSE": ["CBSE Academic", "https://cbseacademic.nic.in/"],
        "ICSE/ISC": ["CISCE official website", "https://cisce.org/"],
        "Andhra Pradesh State Board": ["AP SCERT official site", "https://scert.ap.gov.in/"],
        "Telangana State Board": ["Telangana SCERT official site", "https://scert.telangana.gov.in/"]
      };
      const official = officialUrls[board];
      let html = '<div class="resource-result-head"><div><div class="eyebrow dark-eyebrow"><span class="eyebrow-dot"></span> YOUR IN-EDUNIME STUDY SPACE</div><h2>' + esc(subject) + '</h2><p>' + esc([classLevel, board, stream, exam].filter(Boolean).join(" · ")) + '</p></div></div>';
      html += '<div class="resource-card-grid">';
      html += '<article class="resource-card"><span class="resource-card-icon">📘</span><h3>Study guide</h3><p>A focused learning structure for this topic, with a clear order to follow.</p><a href="#inSiteStudy">Open study guide ↓</a></article>';
      html += '<article class="resource-card"><span class="resource-card-icon">✓</span><h3>Revision checklist</h3><p>Tick off each step as you study, without leaving Edunime.</p><a href="#revisionChecklist">Start revision ↓</a></article>';
      html += '<article class="resource-card"><span class="resource-card-icon">✎</span><h3>Practice questions</h3><p>Try short self-check questions and verify answers with your textbook or teacher.</p><a href="#practiceQuestions">Practice here ↓</a></article>';
      html += '<article class="resource-card"><span class="resource-card-icon">▤</span><h3>Flashcard starter</h3><p>Open each card to write a definition and example.</p><a href="#flashcards">Open flashcards ↓</a></article>';
      html += '<article class="resource-card"><span class="resource-card-icon">▶</span><h3>Video learning</h3><p>Video search is not opened automatically. In-site video lessons can be added when Edunime has approved video sources.</p></article>';
      html += official ? '<article class="resource-card"><span class="resource-card-icon">✓</span><h3>' + esc(official[0]) + '</h3><p>Check official curriculum documents and updates here.</p><a href="' + esc(official[1]) + '" target="_blank" rel="noopener noreferrer">Open official portal ↗</a></article>' : '<article class="resource-card"><span class="resource-card-icon">✓</span><h3>Official syllabus</h3><p>Check your board, university or exam authority website for the current syllabus.</p></article>';
      html += '</div>';
      html += '<section class="resource-prompt in-site-study" id="inSiteStudy"><h3>Study guide — inside Edunime</h3><p>This is a study framework, not a fetched or verified textbook chapter.</p><h4>1. Learning focus</h4><p>Topic: <strong>' + esc(subject) + '</strong></p><p>Level: ' + esc(level) + ' · Explanation style: ' + esc(depth) + '</p><h4>2. Key terms to investigate</h4><ul>' + (terms.length ? terms : [subject]).map(function (x) { return '<li>' + esc(x) + '</li>'; }).join("") + '</ul><h4 id="revisionChecklist">3. Revision checklist</h4><ul class="in-site-checklist">' + checklist.map(function (x) { return '<li><label><input type="checkbox"> ' + esc(x) + '</label></li>'; }).join("") + '</ul><h4 id="practiceQuestions">4. Practice questions</h4><ol>' + questions.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join("") + '</ol><h4 id="flashcards">5. Flashcard starter</h4><div class="in-site-flashcards">' + words.map(function (word, i) { return '<details><summary>Card ' + (i + 1) + ': What should I know about “' + esc(word) + '”?</summary><p>Write a one- or two-sentence definition, then add an example from your textbook or class notes.</p></details>'; }).join("") + '</div><h4>6. Notes prompt</h4><p>Copy this prompt into an AI assistant for a longer draft, then verify it against trusted course materials.</p><pre id="notesPrompt">' + esc(prompt) + '</pre><button type="button" id="copyPrompt">Copy notes prompt</button> <span id="copyStatus" role="status"></span></section>';
      results.innerHTML = html;
      const copyButton = document.getElementById("copyPrompt");
      copyButton.addEventListener("click", async function () {
        const status = document.getElementById("copyStatus");
        try {
          await navigator.clipboard.writeText(prompt);
          status.textContent = "Copied.";
        } catch (error) {
          status.textContent = "Clipboard unavailable. Select the prompt text above and copy it.";
        }
      });
      results.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (error) {
      console.error("Edunime resources error:", error);
      results.innerHTML = '<div class="resource-results-empty"><span>!</span><h2>We could not build your study space.</h2><p>Please refresh the page and try again. If it still fails, the page script needs another fix.</p></div>';
      results.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
})();