(function () {
  "use strict";
  const form = document.getElementById("resourceForm");
  const results = document.getElementById("resourceResults");
  const year = document.getElementById("year");
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");
  if (year) year.textContent = new Date().getFullYear();
  if (toggle && nav) toggle.addEventListener("click", function () {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "×" : "☰";
  });
  if (!form || !results) { console.error("Edunime resources: required page elements missing."); return; }

  const lessons = {
    "mathematics|fractions": {
      title:"Fractions: meaning, types and operations",
      notes:[
        ["What is a fraction?","A fraction represents equal parts of a whole. In 3/4, 3 is the numerator (parts considered) and 4 is the denominator (equal parts in the whole). The denominator cannot be zero."],
        ["Equivalent fractions","Fractions are equivalent when they represent the same value. Multiply or divide both numerator and denominator by the same non-zero number: 1/2 = 2/4 = 3/6."],
        ["Adding and subtracting","With the same denominator, add or subtract the numerators and keep the denominator. With different denominators, first find a common denominator. Example: 1/2 + 1/4 = 2/4 + 1/4 = 3/4."],
        ["Multiplying and dividing","Multiply fractions by multiplying numerators together and denominators together. To divide by a fraction, multiply by its reciprocal: 2/3 ÷ 1/4 = 2/3 × 4/1 = 8/3."],
        ["Common mistakes","Do not add denominators when adding fractions. Always simplify the final fraction when possible, and check whether the answer is reasonable."]
      ],
      cards:[["What is the numerator?","The top number; it tells how many parts are being considered."],["What is the denominator?","The bottom number; it tells how many equal parts make the whole."],["How do you add unlike fractions?","Convert them to a common denominator, then add the numerators."],["How do you divide by a fraction?","Multiply by its reciprocal."]],
      quiz:[["1/3 + 1/6 = ?","1/2","Use denominator 6: 2/6 + 1/6 = 3/6 = 1/2."],["Which is equivalent to 2/3?","4/6","Multiply the numerator and denominator by 2."],["2/5 × 3/4 = ?","3/10","Multiply across: 6/20, then simplify to 3/10."]]
    },
    "mathematics|algebra": {
      title:"Algebra basics: expressions and equations",
      notes:[
        ["Variables and expressions","A variable is a symbol, often x or y, that represents a number. An expression such as 3x + 2 combines numbers, variables and operations; it has no equals sign."],
        ["Like terms","Terms with the same variable part can be combined. 3x + 2x = 5x, but 3x + 2y cannot be combined into one term."],
        ["Solving equations","An equation says two expressions are equal. Keep the equation balanced by doing the same operation to both sides. Example: x + 5 = 12, so subtract 5 from both sides and x = 7."],
        ["Expanding brackets","Use the distributive property: a(b + c) = ab + ac. For example, 2(x + 3) = 2x + 6."],
        ["Check your answer","Substitute the value back into the original equation. If both sides match, the solution works."]
      ],
      cards:[["What is a variable?","A symbol representing a number."],["Simplify 4x + 3x.","7x"],["Solve x − 4 = 9.","Add 4 to both sides: x = 13."],["Expand 3(a + 2).","3a + 6."]],
      quiz:[["Solve x + 8 = 15.","7","Subtract 8 from both sides."],["Simplify 5a − 2a + 4.","3a + 4","Combine only the like terms 5a and −2a."],["Expand 2(y + 5).","2y + 10","Multiply 2 by each term inside the brackets."]]
    },
    "physics|force": {
      title:"Force and motion: core revision notes",
      notes:[
        ["What is a force?","A force is a push or pull that can change an object's motion, direction or shape. Its SI unit is the newton (N). Force is a vector, so it has magnitude and direction."],
        ["Balanced and unbalanced forces","Balanced forces have zero resultant force and do not change an object's velocity. An unbalanced resultant force causes acceleration."],
        ["Newton's first law","An object remains at rest or moves with constant velocity unless acted on by a non-zero resultant external force. This tendency is called inertia."],
        ["Newton's second law","For constant mass, resultant force equals mass times acceleration: F = ma. If mass is in kilograms and acceleration in m/s², force is in newtons."],
        ["Newton's third law","When object A exerts a force on object B, B exerts an equal-magnitude, opposite-direction force on A. The pair acts on different objects."],
        ["Worked example","A 2 kg object accelerates at 3 m/s². F = ma = 2 × 3 = 6 N."]
      ],
      cards:[["SI unit of force?","Newton (N)."],["Formula for resultant force (constant mass)?","F = ma."],["What is inertia?","The tendency of an object to resist changes in its state of motion."],["Do action and reaction forces act on the same object?","No, they act on different objects."]],
      quiz:[["A 4 kg mass accelerates at 2 m/s². Resultant force?","8 N","F = ma = 4 × 2 = 8 N."],["What happens when resultant force is zero?","Velocity remains constant","There is no acceleration; the object may be at rest or move at constant velocity."],["Action-reaction forces act on…","Different objects","That is why they do not cancel each other on one free-body diagram."]]
    },
    "biology|photosynthesis": {
      title:"Photosynthesis: notes and revision",
      notes:[
        ["Definition","Photosynthesis is the process by which green plants use light energy to make glucose from carbon dioxide and water, releasing oxygen."],
        ["Word equation","Carbon dioxide + water —(light and chlorophyll)→ glucose + oxygen."],
        ["Where it happens","Photosynthesis takes place in chloroplasts. Chlorophyll absorbs light energy. Leaves are adapted with a broad surface and stomata for gas exchange."],
        ["What plants need","Light, water, carbon dioxide and chlorophyll are essential. The rate can be limited by light intensity, carbon dioxide concentration or temperature."],
        ["Why it matters","Glucose can be used in respiration, stored as starch, or converted into materials for growth. Photosynthesis also releases oxygen into the atmosphere."],
        ["Common misconception","Plants respire too. Photosynthesis stores energy in chemical form; cellular respiration releases usable energy from food."]
      ],
      cards:[["What gas is taken in for photosynthesis?","Carbon dioxide."],["What pigment absorbs light?","Chlorophyll."],["What is the main sugar product?","Glucose."],["Where does photosynthesis occur?","In chloroplasts."]],
      quiz:[["Name two raw materials for photosynthesis.","Carbon dioxide and water","Light supplies energy but is not a raw material in the word equation."],["Which organelle carries out photosynthesis?","Chloroplast","Chloroplasts contain chlorophyll."],["Why is glucose useful to a plant?","Respiration, storage and growth","It can be used in respiration, stored as starch, or made into other compounds."]]
    },
    "chemistry|atoms": {
      title:"Atoms and elements: revision notes",
      notes:[
        ["Structure of an atom","An atom has a tiny nucleus containing protons and usually neutrons, with electrons occupying regions around the nucleus."],
        ["Relative charges","Protons have charge +1, electrons −1 and neutrons 0. A neutral atom has equal numbers of protons and electrons."],
        ["Atomic and mass numbers","Atomic number equals the number of protons. Mass number equals protons plus neutrons. Neutrons = mass number − atomic number."],
        ["Isotopes","Isotopes are atoms of the same element with the same number of protons but different numbers of neutrons."],
        ["Ions","An ion forms when an atom or group gains or loses electrons. Losing electrons forms a positive ion; gaining electrons forms a negative ion."]
      ],
      cards:[["What determines an element's identity?","Its number of protons (atomic number)."],["How do you calculate neutrons?","Mass number minus atomic number."],["What is an isotope?","Atoms of the same element with different numbers of neutrons."],["How does a positive ion form?","By losing electrons."]],
      quiz:[["Atomic number 8, mass number 16: neutrons?","8","16 − 8 = 8 neutrons."],["A neutral atom has 11 protons. How many electrons?","11","Neutral atoms have equal proton and electron counts."],["An atom gains electrons. What ion charge does it tend to have?","Negative","Electrons carry negative charge."]]
    }
  };

  function esc(v) { return String(v == null ? "" : v).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
  function chooseLesson(subject, typed) {
    const s = (subject + " " + typed).toLowerCase();
    if (/fraction|ratio|percentage/.test(s) || /mathematics/.test(subject.toLowerCase()) && /fraction/.test(typed.toLowerCase())) return lessons["mathematics|fractions"];
    if (/algebra|equation|linear equation/.test(s)) return lessons["mathematics|algebra"];
    if (/force|motion|newton/.test(s)) return lessons["physics|force"];
    if (/photosynthesis|plant nutrition/.test(s)) return lessons["biology|photosynthesis"];
    if (/atom|atomic structure|isotope|ion/.test(s)) return lessons["chemistry|atoms"];
    return null;
  }
  function section(title, body) { return '<section class="resource-prompt in-site-study"><h3>'+title+'</h3>'+body+'</section>'; }
  async function generateAiWorkspace(subject, context) {
    results.innerHTML = '<div class="resource-results-empty"><span>✦</span><h2>Generating topic-specific notes…</h2><p>Edunime is preparing explanations, examples, flashcards and a quiz for your selected topic. This may take a moment.</p></div>';
    results.scrollIntoView({behavior:"smooth",block:"start"});
    try {
      const cfg = await import("./firebase-config.js");
      const appSdk = await import("https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js");
      const aiSdk = await import("https://www.gstatic.com/firebasejs/11.10.0/firebase-ai.js");
      const app = appSdk.getApps().length ? appSdk.getApp() : appSdk.initializeApp(cfg.firebaseConfig);
      const ai = aiSdk.getAI(app, {backend: new aiSdk.GoogleAIBackend()});
      const model = aiSdk.getGenerativeModel(ai, {model:"gemini-3.8-flash"});
      const prompt = `You are Edunime, an accurate educational tutor. Create original, topic-specific study material for this learner. Context: ${JSON.stringify(context)}. Exact topic: "${subject}". Tailor content to the selected curriculum and level; if exact syllabus details are uncertain, clearly flag that and teach the core subject accurately rather than inventing syllabus claims. Return ONLY valid JSON with this schema: {"title":"...","intro":"...","notes":[{"heading":"...","body":"Detailed explanation with examples; use plain text and newline for equations"}],"keyPoints":["..."],"flashcards":[{"q":"...","a":"..."}],"quiz":[{"q":"...","options":["A ...","B ...","C ...","D ..."],"answer":"exact option text","explanation":"..."}],"studyTips":["..."]}. Provide 6-10 substantial notes, 6-10 key points, 6-10 flashcards and 5 multiple-choice questions with correct answers and explanations. Include formulas and worked examples when appropriate; for non-mathematical topics use relevant concepts, timelines, processes, evidence or examples. Avoid generic filler. Do not claim to quote textbooks. `;
      const response = await model.generateContent(prompt);
      let raw = response.response.text().trim().replace(/^```(?:json)?\s*/i,"").replace(/\s*```$/,"");
      const data = JSON.parse(raw);
      const title = esc(data.title || subject + " — Study Notes");
      let html = '<div class="resource-result-head"><div><div class="eyebrow dark-eyebrow">✦ AI-GENERATED STUDY MATERIALS</div><h2>'+title+'</h2><p>'+esc([context.classLevel,context.board,context.exam].filter(Boolean).join(" · "))+'</p></div></div>';
      html += section('Topic overview','<p>'+esc(data.intro || "Topic-specific study notes generated for your selection.")+'</p>');
      html += section('Detailed study notes','<div id="actualNotes">'+(data.notes||[]).map((n,i)=>'<h4>'+(i+1)+'. '+esc(n.heading||"Key concept")+'</h4><p>'+esc(n.body||"")+'</p>').join('')+'</div>');
      html += section('Quick revision','<div id="revisionNotes"><ul>'+(data.keyPoints||[]).map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul><button type="button" id="printNotes">Print / save notes as PDF</button></div>');
      html += section('Flashcards','<div id="flashcards">'+(data.flashcards||[]).map((c,i)=>'<details><summary>Card '+(i+1)+': '+esc(c.q||"Question")+'</summary><p>'+esc(c.a||"")+'</p></details>').join('')+'</div>');
      html += section('Practice quiz','<div id="quiz">'+(data.quiz||[]).map((q,i)=>'<div class="resource-quiz-item"><p><strong>Q'+(i+1)+'. '+esc(q.q||"")+'</strong></p>'+(q.options||[]).map(opt=>'<p>'+esc(opt)+'</p>').join('')+'<button type="button" class="answer-toggle" aria-expanded="false">Show answer and explanation</button><div class="answer-content" hidden><p><strong>Answer: </strong>'+esc(q.answer||"")+'</p><p>'+esc(q.explanation||"")+'</p></div></div>').join('')+'</div>');
      html += section('Study tips','<ul>'+(data.studyTips||[]).map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>');
      html += section('Revision checklist','<ul class="in-site-checklist" id="checklist">'+['Read the notes','Explain key ideas without looking','Review flashcards','Attempt the quiz before revealing answers','Check uncertain facts against your prescribed textbook'].map(x=>'<li><label><input type="checkbox"> '+esc(x)+'</label></li>').join('')+'</ul>');
      html += section('Accuracy note','<p>These notes were generated by AI and may contain mistakes. Check important facts, formulas and syllabus coverage against your prescribed textbook or official curriculum.</p>');
      results.innerHTML = html;
      results.querySelectorAll(".answer-toggle").forEach(button=>button.addEventListener("click",function(){const panel=this.nextElementSibling;const open=panel.hidden;panel.hidden=!open;this.setAttribute("aria-expanded",String(open));this.textContent=open?"Hide answer and explanation":"Show answer and explanation";}));
      const print=document.getElementById("printNotes"); if(print) print.addEventListener("click",()=>window.print());
      results.scrollIntoView({behavior:"smooth",block:"start"});
    } catch (error) {
      console.error("Edunime AI notes error:", error);
      results.innerHTML = '<div class="resource-results-empty"><h2>AI note generation failed</h2><p>Firebase AI Logic must be enabled for this project before Edunime can generate notes for any topic. In Firebase Console, open <strong>AI Services → AI Logic → Get started</strong>, choose the Gemini Developer API, and complete setup. If AI Logic is already enabled, the error may be caused by App Check, API setup, or model availability. Open the browser console for the exact error.</p><p>No generic notes are being presented as topic-specific material.</p></div>';
    }
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    try {
      const d = new FormData(form);
      const selected = String(d.get("subjectPreset") || "").trim();
      const typed = String(d.get("subjectInput") || "").trim();
      const subject = typed ? (selected && selected !== "Other / exact topic" ? selected + " — " + typed : typed) : selected;
      if (!subject) {
        results.innerHTML = '<div class="resource-results-empty"><span>!</span><h2>Choose a subject or topic first.</h2><p>Pick a subject and enter a chapter to load matching materials.</p></div>';
        document.getElementById("subjectPreset").focus(); return;
      }
      const context = {level:String(d.get("level")||""),board:String(d.get("board")||""),classLevel:String(d.get("classLevel")||""),stream:String(d.get("stream")||""),exam:String(d.get("exam")||""),depth:String(d.get("depth")||"detailed")};
      generateAiWorkspace(subject, context);
      return;
      const lesson = chooseLesson(selected || subject, typed);
      const label = lesson ? lesson.title : subject + ": study workspace";
      let html = '<div class="resource-result-head"><div><div class="eyebrow dark-eyebrow"><span class="eyebrow-dot"></span> STUDY MATERIALS</div><h2>'+esc(label)+'</h2><p>'+esc([d.get("classLevel"),d.get("board"),d.get("exam")].filter(Boolean).join(" · "))+'</p></div></div>';
      html += '<div class="resource-card-grid">';
      html += '<article class="resource-card"><span class="resource-card-icon">📘</span><h3>Study notes</h3><p>'+(lesson ? 'Open the complete topic notes below.' : 'No prepared chapter exists for this exact topic yet.')+'</p><a href="#actualNotes">Read notes ↓</a></article>';
      html += '<article class="resource-card"><span class="resource-card-icon">✦</span><h3>Revision notes</h3><p>Short key points and formulas from the lesson.</p><a href="#revisionNotes">Revise ↓</a></article>';
      html += '<article class="resource-card"><span class="resource-card-icon">▤</span><h3>Flashcards</h3><p>Tap each card to reveal its answer.</p><a href="#flashcards">Practice recall ↓</a></article>';
      html += '<article class="resource-card"><span class="resource-card-icon">✓</span><h3>Quiz with answers</h3><p>Answer questions and check explanations.</p><a href="#quiz">Start quiz ↓</a></article>';
      html += '<article class="resource-card"><span class="resource-card-icon">▶</span><h3>Video lessons</h3><p>'+(lesson ? 'Search suggestions are shown in an embedded YouTube panel when supported by your browser.' : 'No topic-specific video has been curated for this topic yet.')+'</p><a href="#videos">Video section ↓</a></article>';
      html += '<article class="resource-card"><span class="resource-card-icon">☑</span><h3>Revision checklist</h3><p>Track the steps you complete in this session.</p><a href="#checklist">Open checklist ↓</a></article></div>';
      if (lesson) {
        html += section('Study notes — '+esc(lesson.title),'<div id="actualNotes">'+lesson.notes.map((n,i)=>'<h4>'+(i+1)+'. '+esc(n[0])+'</h4><p>'+esc(n[1])+'</p>').join('')+'</div>');
        html += section('Revision notes','<div id="revisionNotes"><ul>'+lesson.notes.map(n=>'<li><strong>'+esc(n[0])+':</strong> '+esc(n[1])+'</li>').join('')+'</ul><button type="button" id="printNotes">Print / save notes as PDF</button></div>');
        html += section('Flashcards','<div class="in-site-flashcards" id="flashcards">'+lesson.cards.map((c,i)=>'<details><summary>Card '+(i+1)+': '+esc(c[0])+'</summary><p>'+esc(c[1])+'</p></details>').join('')+'</div>');
        html += section('Practice quiz','<div id="quiz">'+lesson.quiz.map((q,i)=>'<div class="resource-quiz-item"><p><strong>Q'+(i+1)+'. '+esc(q[0])+'</strong></p><button type="button" class="answer-toggle" aria-expanded="false">Show answer and explanation</button><div class="answer-content" hidden><p><strong>Answer: </strong>'+esc(q[1])+'</p><p>'+esc(q[2])+'</p></div></div>').join('')+'</div>');
        html += section('Revision checklist','<ul class="in-site-checklist" id="checklist">'+['Read the notes carefully','Explain each key idea without looking','Review all flashcards','Attempt the quiz before revealing answers','Revisit mistakes and check your textbook'].map(x=>'<li><label><input type="checkbox"> '+esc(x)+'</label></li>').join('')+'</ul>');
        html += section('Video lessons','<div id="videos"><p>Open targeted video lessons for this exact subject and level. Public YouTube search embeds are unreliable on static websites, so these links avoid a broken blank player.</p><p><a class="resource-video-link" target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/results?search_query='+encodeURIComponent(subject+' '+(d.get("classLevel")||'school')+' '+(d.get("exam")||'explained lesson'))+'">▶ Search video lessons on YouTube ↗</a></p><p><a class="resource-video-link secondary-link" target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/results?search_query='+encodeURIComponent(subject+' '+(d.get("exam")||'competitive exam')+' solved questions')+'">▶ Find solved questions and exam lectures ↗</a></p><p>Choose a trusted educator/channel and check that the video matches your board or exam syllabus.</p></div>');
      } else {
        const exam = String(d.get("exam") || "").trim();
        const level = String(d.get("classLevel") || "").trim();
        const board = String(d.get("board") || "").trim();
        const depth = String(d.get("depth") || "detailed");
        const focus = depth === "simple" ? "Begin with definitions, everyday examples and prerequisites." : depth === "advanced" ? "Include assumptions, derivations, edge cases, applications and limitations." : depth === "exam" ? "Prioritise syllabus keywords, formulas, common traps, timed practice and previous-paper patterns." : "Explain each sub-concept, why it matters, worked examples, common errors and applications.";
        html += section('Detailed study guide — '+esc(subject),'<div id="actualNotes"><p><strong>Learning context:</strong> '+esc(level)+' · '+esc(board)+' · '+esc(exam || 'General study')+'</p><p><strong>Study depth:</strong> '+esc(focus)+'</p><h4>1. Start with the exact syllabus</h4><p>Write the official chapter title, learning outcomes and every subheading from your textbook or exam syllabus. Treat each subheading as a separate mini-topic so the chapter is not reduced to a few bullets.</p><h4>2. Build understanding in layers</h4><ol><li><strong>Prerequisites:</strong> list the terms and skills needed before starting; review gaps first.</li><li><strong>Core idea:</strong> explain the concept in your own words, then write a precise definition.</li><li><strong>Step-by-step explanation:</strong> break each process, rule, theorem or mechanism into ordered steps and explain why each step follows.</li><li><strong>Worked examples:</strong> solve a basic example, a typical syllabus example and an application problem. Show all steps and units where relevant.</li><li><strong>Visual model:</strong> draw a labelled diagram, flowchart, timeline, graph, table or concept map when useful.</li><li><strong>Applications:</strong> connect the idea to real situations, other chapters and practical uses.</li></ol><h4>3. Make complete chapter notes</h4><p>Create a separate heading for every textbook subtopic. Under each, record definitions, principles, formulas or dates, explanations, labelled diagrams, exceptions, examples and a short recap. Define every formula symbol and unit. For proof-based topics, write assumptions and each reasoning step.</p><h4>4. Check understanding</h4><p>Close the source and explain the topic aloud. Ask: What is it? Why does it work? When can it be used? What are its limits? Which similar concept could be confused with it? Reopen the source and correct gaps.</p><h4>5. Practice from easy to hard</h4><p>Attempt a recall question, a direct application, a multi-step problem and an unfamiliar transfer question. Keep a mistake log with the error type, corrected method and a date to retry it.</p><h4>6. Topic-specific content status</h4><p>This exact chapter has not yet been authored and checked in Edunime’s built-in content library. This is a detailed study method, not a claim that chapter facts have been verified. Use the links below to locate the matching syllabus and source material.</p></div>');
        html += section('Revision notes & quick recall','<div id="revisionNotes"><ul><li>Write a one-sentence definition without looking.</li><li>List every key term, symbol, rule, date or process in the chapter.</li><li>Explain the reason behind each formula or step instead of memorising it alone.</li><li>Summarise each subheading in 2–4 lines and include one example.</li><li>Record exceptions, easily confused ideas and personal mistakes.</li><li>Make a one-page recap and revisit it after 1 day, 1 week and 1 month.</li></ul><button type="button" id="printNotes">Print / save notes as PDF</button></div>');
        html += section('Flashcard builder','<div id="flashcards"><p>Create one card for every subtopic. Write your answer before checking the source.</p><ul><li>What is the exact definition of '+esc(subject)+'?</li><li>Which prerequisite idea does it depend on?</li><li>What are its steps, rules or components?</li><li>What is a worked example and why does each step work?</li><li>What is a common misconception or exception?</li><li>How could this idea appear in an exam question?</li></ul></div>');
        html += section('Practice & self-check','<div id="quiz"><p>These are self-check prompts, not a verified answer-key quiz for this chapter. Use the official source to check your answers.</p><ol><li>Define '+esc(subject)+' precisely and give an example.</li><li>Explain one key process or rule step by step.</li><li>Solve one standard problem without notes and show your reasoning.</li><li>Compare two easily confused concepts from this chapter.</li><li>Apply the concept to an unfamiliar situation and justify your answer.</li></ol></div>');
        html += section('Competitive exam preparation','<div><p><strong>Selected exam:</strong> '+esc(exam || 'Not selected')+'</p><p>Match every subtopic to the official syllabus, then practise previous-year questions, timed mixed sets and full-length mocks. Review incorrect answers and classify each error as a concept gap, calculation error, misread question or time-management issue.</p><p><a class="resource-video-link" target="_blank" rel="noopener noreferrer" href="https://www.google.com/search?q='+encodeURIComponent((exam || 'competitive exam')+' official syllabus '+subject)+'">Find official syllabus ↗</a> <a class="resource-video-link secondary-link" target="_blank" rel="noopener noreferrer" href="https://www.google.com/search?q='+encodeURIComponent((exam || 'competitive exam')+' previous year question papers official '+subject)+'">Find previous-year papers ↗</a></p><p>Prefer official exam-body notices and original question papers; coaching summaries can omit changes.</p></div>');
        html += section('Reliable source finder','<div><p>Search official syllabus and reference material for your chosen board, course and topic.</p><p><a class="resource-video-link" target="_blank" rel="noopener noreferrer" href="https://www.google.com/search?q='+encodeURIComponent(board+' official syllabus '+level+' '+subject)+'">Find board / course syllabus ↗</a> <a class="resource-video-link secondary-link" target="_blank" rel="noopener noreferrer" href="https://www.google.com/search?q='+encodeURIComponent(subject+' detailed notes '+level+' '+board)+'">Find detailed topic references ↗</a></p></div>');
        html += section('Revision checklist','<ul class="in-site-checklist" id="checklist">'+['Read every syllabus subheading','Write definitions and key principles from memory','Work through examples step by step','Draw diagrams / graphs / process maps where useful','Attempt practice questions without notes','Review mistakes and schedule spaced revision'].map(x=>'<li><label><input type="checkbox"> '+esc(x)+'</label></li>').join('')+'</ul>');
        html += section('Video lessons','<div id="videos"><p>Open targeted video lessons in a new tab so the Edunime study workspace stays available.</p><p><a class="resource-video-link" target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/results?search_query='+encodeURIComponent(subject+' '+level+' '+exam+' full chapter explained')+'">▶ Full chapter video lessons ↗</a></p><p><a class="resource-video-link secondary-link" target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/results?search_query='+encodeURIComponent(subject+' '+exam+' solved problems previous year questions')+'">▶ Solved problems and exam practice ↗</a></p></div>');
      }
      results.innerHTML = html;
      results.querySelectorAll(".answer-toggle").forEach(button=>button.addEventListener("click",function(){const panel=this.nextElementSibling;const open=panel.hidden;panel.hidden=!open;this.setAttribute("aria-expanded",String(open));this.textContent=open?"Hide answer and explanation":"Show answer and explanation";}));
      const print=document.getElementById("printNotes"); if(print) print.addEventListener("click",()=>window.print());
      results.scrollIntoView({behavior:"smooth",block:"start"});
    } catch (error) {
      console.error("Edunime resources error:",error);
      results.innerHTML='<div class="resource-results-empty"><h2>Could not load study materials</h2><p>Refresh the page and try again.</p></div>';
    }
  });
})();