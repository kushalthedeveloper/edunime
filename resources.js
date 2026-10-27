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
        html += section('Video lessons','<div id="videos"><p>Videos are shown here without navigating away from Edunime. If embedding is blocked by your browser or network, the panel may not load.</p><iframe title="YouTube learning videos about '+esc(subject)+'" width="100%" height="315" src="https://www.youtube-nocookie.com/embed?listType=search&list='+encodeURIComponent(subject+' '+(d.get("classLevel")||'school')+' lesson explained')+'" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe><p class="resource-video-note">Video availability depends on YouTube's embed support. These are search-based suggestions, not Edunime-owned videos.</p></div>');
      } else {
        html += section('Study notes','<div id="actualNotes"><p><strong>There is no verified chapter for this exact selection in Edunime’s built-in library yet.</strong> I won’t show fake notes and pretend they match your syllabus.</p><p>Try one of the currently prepared topics: fractions, algebra, force and motion, photosynthesis, or atoms and atomic structure. More chapters need to be added to the library.</p></div>');
        html += section('Revision notes','<div id="revisionNotes"><p>Topic-specific revision notes will appear here when this chapter is added. Please use your prescribed textbook for syllabus-accurate facts in the meantime.</p></div>');
        html += section('Flashcards','<div id="flashcards"><p>Topic-specific flashcards are not available for this chapter yet.</p></div>');
        html += section('Practice quiz','<div id="quiz"><p>Topic-specific questions and checked answers are not available for this chapter yet.</p></div>');
        html += section('Revision checklist','<ul class="in-site-checklist" id="checklist">'+['Read the prescribed chapter','Write five key ideas from memory','Solve textbook examples','Check answers and correct mistakes','Revise difficult points tomorrow'].map(x=>'<li><label><input type="checkbox"> '+x+'</label></li>').join('')+'</ul>');
        html += section('Video lessons','<div id="videos"><p>No curated video is available for this topic yet. Choose a prepared topic to see the in-page video panel.</p></div>');
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