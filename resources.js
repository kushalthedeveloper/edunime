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
    "GATE": ["https://gate2026.iisc.ac.in/"],
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
    const detailed = depth === "simple" ? "beginner friendly step by step explanation" : depth === "advanced" ? "advanced rigorous explanation research references" : depth === "exam" ? "exam focused revision important questions previous year questions" : "detailed chapter notes concepts definitions worked examples diagrams common mistakes";
    const boardQuery = board !== "Not applicable" ? board : "";
    const examQuery = exam ? exam + " official syllabus latest notification" : "";
    const syllabusSearch = searchUrl([boardQuery, classLevel, subject, "official syllabus current academic year"].filter(Boolean).join(" "));
    const handwrittenSearch = searchUrl([identity, "handwritten notes PDF"].filter(Boolean).join(" "));
    const noteSearch = searchUrl([identity, detailed, "study notes"].filter(Boolean).join(" "));
    const animationSearch = videoUrl([identity, "animated explanation visual lesson"].filter(Boolean).join(" "));
    const lessonSearch = videoUrl([identity, "full chapter explanation"].filter(Boolean).join(" "));
    const practiceSearch = searchUrl([identity, "practice questions solved examples worksheet"].filter(Boolean).join(" "));
    const source = official[board] || null;
    const generalOfficial = source && source.url ? card("✓", source.name, "Start with this official portal. Confirm the exact class, subject and current academic-year document there.", source.url, "Open official portal") : card("✓", "Find the official syllabus", "Search for the current syllabus from your selected board, university or awarding authority. Verify the year and document before studying.", syllabusSearch, "Search syllabus");
    let html = '<div class="resource-result-head"><div><div class="eyebrow dark-eyebrow"><span class="eyebrow-dot"></span> YOUR RESOURCE SHORTLIST</div><h2>' + esc(subject) + '</h2><p>' + esc([classLevel, board, stream, exam].filter(Boolean).join(" · ")) + '</p></div></div><div class="resource-card-grid">';
    html += generalOfficial;
    html += card("✎", "Detailed chapter notes", "Find structured explanations, key definitions, formulas, solved examples and revision points. Check the source quality and syllabus match.", noteSearch, "Search detailed notes");
    html += card("📝", "Handwritten notes & PDFs", "Search for publicly available handwritten notes and PDFs. Respect copyright, creator terms and any access restrictions.", handwrittenSearch, "Find handwritten notes");
    html += card("▶", "Animation & visual videos", "Find animations and visual explainers for concepts that are easier to understand by watching them unfold.", animationSearch, "Find animated videos", lessonSearch, "Full chapter videos");
    html += card("◎", "Practice & solved examples", "Build understanding with worksheets, worked examples and practice questions matched to your topic.", practiceSearch, "Find practice questions");
    html += card("▣", "Textbook and learning material", "Look for official textbooks, open educational material and chapter PDFs where available.", searchUrl([boardQuery, classLevel, subject, "official textbook chapter PDF"].filter(Boolean).join(" ")), "Find textbooks");
    if (exam) {
      const urls = examSources[exam] || [];
      html += card("★", "Competitive exam syllabus & notices", "Use the exam authority's official site for dates, eligibility, syllabus, application notices and updates. Dates can change.", urls[0] || searchUrl(examQuery), urls.length ? "Open official authority" : "Search official notices", urls[1] || searchUrl(examQuery), urls.length > 1 ? "Second official site" : "Search latest updates");
      html += card("◷", "Exam-focused revision", "Search for topic-wise preparation, previous-year questions and revision plans. Check that material matches the current exam pattern.", searchUrl(exam + " " + subject + " topic wise previous year questions current syllabus"), "Find exam practice");
    } else {
      html += card("◷", "Syllabus and exam updates", "Search for current official notifications for the selected curriculum. Always confirm changes on the issuing authority's own site.", syllabusSearch, "Check current syllabus", searchUrl([boardQuery, classLevel, "official exam circular syllabus changes current year"].filter(Boolean).join(" ")), "Search official notices");
    }
    html += '</div>';
    const depthText = depth === "simple" ? "Start with intuitive explanations, everyday examples, vocabulary and short checks for understanding." : depth === "advanced" ? "Include formal definitions, assumptions, derivations, limitations, research context, competing interpretations and references." : depth === "exam" ? "Prioritise syllabus mapping, high-yield concepts, formula sheets, common mistakes, timed practice and answer strategy." : "Include learning objectives, prerequisites, detailed concept-by-concept explanations, definitions, derivations, worked examples, diagrams to draw, real-world applications, misconceptions, summary tables and practice questions with explanations.";
    const prompt = "Act as a careful subject tutor. Create original study notes for: " + identity + (exam ? "; competitive exam: " + exam : "") + ". Explanation level: " + depth + ". " + depthText + " Map each section to the official syllabus if available. State assumptions and the academic year. Do not invent syllabus facts, exam dates, citations, or source links. Separate verified facts from explanations and tell me what to confirm from the official authority. End with a glossary, a concise revision sheet, 10 practice questions of varied difficulty, and fully explained answers. If a topic is too broad, split it into chapters and teach one chapter at a time.";
    html += '<section class="resource-prompt"><h3>Detailed-notes prompt</h3><p>This creates a reusable prompt for an AI assistant; this static website does not itself call an AI model or generate live notes.</p><pre id="notesPrompt">' + esc(prompt) + '</pre><button type="button" id="copyPrompt">Copy notes prompt</button> <span id="copyStatus" role="status"></span></section>';
    results.innerHTML = html;
    const copy = document.getElementById("copyPrompt");
    copy.addEventListener("click", async function () {
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