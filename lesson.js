const subjectSlug = new URLSearchParams(window.location.search).get("subject") || "mathematics";
const topicIndex = Math.max(0, Number.parseInt(new URLSearchParams(window.location.search).get("topic") || "0", 10) || 0);
const subject = subjectData[subjectSlug] || subjectData.mathematics;
const index = Math.min(topicIndex, subject.topics.length - 1);
const topic = subject.topics[index];
const lessons = {
  "mathematics": [
    {
      intro:"Numbers are the building blocks of mathematics. Learning how to compare and operate on them helps you solve everyday and advanced problems.",
      core:`<p><strong>Numbers</strong> represent quantities. Common number groups include whole numbers (0, 1, 2…), integers (…, −2, −1, 0, 1, 2…), fractions, decimals, and percentages.</p><ul><li><strong>Addition</strong> combines quantities.</li><li><strong>Subtraction</strong> finds a difference.</li><li><strong>Multiplication</strong> combines equal groups.</li><li><strong>Division</strong> splits a quantity into equal groups.</li></ul><p>A fraction such as 1/2 means one of two equal parts. A percentage is a fraction out of 100, so 25% = 25/100 = 1/4.</p>`,
      example:`<p>A notebook costs ₹80 and has a 25% discount. First find 25% of 80:</p><div class="formula">25/100 × 80 = 20</div><p>The discount is ₹20, so the new price is ₹80 − ₹20 = <strong>₹60</strong>.</p>`,
      question:"What is 10% of 250?", options:["2.5","25","2500"], answer:1, explanation:"10% means 10 out of 100, or one tenth. 250 ÷ 10 = 25."
    },
    {
      intro:"Algebra uses letters to represent numbers we do not yet know or values that can change. It helps us describe patterns and solve problems.",
      core:`<p>A <strong>variable</strong> is a symbol such as x or y that stands for a number. An <strong>expression</strong> combines numbers, variables, and operations, such as 3x + 2. An <strong>equation</strong> says that two expressions are equal.</p><p>To solve an equation, keep both sides balanced: whatever operation you apply to one side, apply to the other side too.</p><ul><li>Undo addition with subtraction.</li><li>Undo multiplication with division.</li><li>Check your answer by substituting it back into the original equation.</li></ul>`,
      example:`<p>Solve <strong>x + 5 = 12</strong>. Subtract 5 from both sides:</p><div class="formula">x + 5 − 5 = 12 − 5</div><p>So <strong>x = 7</strong>. Check: 7 + 5 = 12, which is true.</p>`,
      question:"Solve: x + 4 = 10", options:["x = 14","x = 6","x = 4"], answer:1, explanation:"Subtract 4 from both sides: x = 10 − 4 = 6."
    },
    {
      intro:"Geometry studies shapes, sizes, angles, and space. It helps us describe objects and calculate measurements.",
      core:`<p>A <strong>perimeter</strong> is the distance around a 2D shape. <strong>Area</strong> measures the space inside a shape. Angles measure turns and are commonly measured in degrees.</p><ul><li>Rectangle area = length × width.</li><li>Rectangle perimeter = 2 × (length + width).</li><li>A right angle is 90°.</li><li>The angles in a triangle add up to 180° in ordinary Euclidean geometry.</li></ul><p>Always include appropriate units: for example, centimetres for perimeter and square centimetres for area.</p>`,
      example:`<p>A rectangle is 8 cm long and 3 cm wide.</p><div class="formula">Area = 8 × 3 = 24 cm²</div><p>Its perimeter is 2 × (8 + 3) = <strong>22 cm</strong>.</p>`,
      question:"A rectangle is 5 cm long and 4 cm wide. What is its area?", options:["9 cm²","18 cm²","20 cm²"], answer:2, explanation:"Area = length × width = 5 × 4 = 20 cm²."
    }
  ],
  "science": [
    {
      intro:"Science is a way to investigate the natural world by asking questions, collecting observations, and checking explanations against evidence.",
      core:`<p>A useful investigation starts with a clear question. You may form a hypothesis—a testable possible explanation—then design a fair test or gather observations.</p><ul><li><strong>Observation:</strong> information gathered with senses or instruments.</li><li><strong>Variable:</strong> a factor that can change.</li><li><strong>Evidence:</strong> information used to evaluate an explanation.</li><li><strong>Conclusion:</strong> what the evidence suggests, including limitations.</li></ul><p>Good science is open to revision when new reliable evidence appears.</p>`,
      example:`<p>Question: Does the amount of light affect plant growth? Grow similar plants under different light levels while keeping water, soil, and pot size as similar as possible. Measure growth regularly and compare results.</p><p>Changing several factors at once would make it harder to tell which factor caused a difference.</p>`,
      question:"Why should a fair test usually change one main variable at a time?", options:["To make the result easier to interpret","To guarantee the hypothesis is correct","To avoid recording results"], answer:0, explanation:"Keeping other conditions similar helps you judge whether the changed variable may explain the result."
    },
    {
      intro:"Physics investigates matter, motion, forces, energy, and how the physical world behaves.",
      core:`<p>A <strong>force</strong> is a push or pull. Forces can change an object's motion or shape. Motion describes how an object's position changes over time.</p><ul><li>Speed = distance ÷ time.</li><li>Balanced forces do not change an object's motion.</li><li>Unbalanced forces can change speed or direction.</li><li>Energy can be transferred or transformed from one form to another.</li></ul><p>In calculations, check that units match the quantities you use.</p>`,
      example:`<p>A cyclist travels 100 metres in 20 seconds.</p><div class="formula">Speed = 100 m ÷ 20 s = 5 m/s</div><p>The cyclist's average speed is <strong>5 metres per second</strong>.</p>`,
      question:"A runner covers 60 metres in 10 seconds. What is the average speed?", options:["6 m/s","10 m/s","600 m/s"], answer:0, explanation:"Speed = distance ÷ time = 60 ÷ 10 = 6 m/s."
    },
    {
      intro:"Chemistry studies matter: what substances are made of, how they behave, and how they change.",
      core:`<p>An <strong>atom</strong> is a basic unit of a chemical element. An element contains one kind of atom. A compound contains atoms of two or more elements chemically bonded in a fixed ratio.</p><ul><li>A mixture combines substances without chemically bonding them together.</li><li>A physical change changes form or state without making a new substance.</li><li>A chemical reaction rearranges atoms into new substances.</li></ul><p>In ordinary chemical reactions, atoms are rearranged; they are not simply created or destroyed.</p>`,
      example:`<p>Water (H₂O) is a compound made from hydrogen and oxygen chemically bonded. Salt water is a mixture because salt is dissolved in water and the components can be separated by suitable physical methods.</p>`,
      question:"Which is a compound?", options:["Oxygen gas (O₂)","Pure water (H₂O)","Air"], answer:1, explanation:"Water contains hydrogen and oxygen chemically bonded in a fixed ratio. Air is a mixture, and O₂ contains only oxygen atoms."
    }
  ],
  "computer-science": [
    {
      intro:"Computational thinking is a structured way to solve problems. You can use it before writing code and even for everyday tasks.",
      core:`<p>Four helpful ideas are <strong>decomposition</strong> (breaking a problem into smaller parts), <strong>pattern recognition</strong> (spotting similarities), <strong>abstraction</strong> (focusing on important details), and <strong>algorithm design</strong> (writing clear steps).</p><p>A good solution should be understandable, testable, and suited to the problem. You can refine it when tests reveal a problem.</p>`,
      example:`<p>To plan a school-day checklist, decompose it into subjects, materials, and deadlines. Spot repeated tasks, keep only the details needed for the checklist, then order the steps so they are easy to follow.</p>`,
      question:"Which action is an example of decomposition?", options:["Breaking a large task into smaller tasks","Ignoring all useful details","Guessing without checking"], answer:0, explanation:"Decomposition means splitting a complex problem into smaller, manageable parts."
    },
    {
      intro:"Programming gives a computer instructions. Most languages provide ways to store information, make decisions, and repeat actions.",
      core:`<p>A <strong>variable</strong> names a value. A <strong>condition</strong> lets a program choose between paths. A <strong>loop</strong> repeats a set of instructions, and a <strong>function</strong> groups reusable steps.</p><p>Programs must follow the syntax of their language. Testing with different inputs helps reveal mistakes and unexpected cases.</p>`,
      example:`<p>Pseudocode for checking whether a number is positive:</p><div class="lesson-example"><code>IF number &gt; 0<br>  DISPLAY "Positive"<br>ELSE<br>  DISPLAY "Zero or negative"</code></div><p>The condition determines which message is displayed.</p>`,
      question:"What is a loop mainly used for?", options:["Repeating instructions","Renaming a computer","Deleting all variables"], answer:0, explanation:"A loop repeats instructions, often until a condition is met or for each item in a collection."
    },
    {
      intro:"Data structures organise information so a program can use it effectively.",
      core:`<p>A <strong>list</strong> stores an ordered collection of items. A <strong>stack</strong> commonly uses last-in, first-out behaviour. A <strong>queue</strong> commonly uses first-in, first-out behaviour. A <strong>map</strong> stores key-value associations.</p><p>The best structure depends on the operations your program needs to perform.</p>`,
      example:`<p>A queue at a service desk is like a first-in, first-out queue: the person who joined first is generally served first. A stack of plates is like last-in, first-out: the top plate is removed first.</p>`,
      question:"Which structure is most like people waiting in a normal line?", options:["Stack","Queue","Tree root only"], answer:1, explanation:"A queue uses first-in, first-out ordering, like a normal line."
    }
  ]
};
const generic = {
  intro:`This lesson introduces ${topic[0].toLowerCase()} as part of ${subject.title}. Use the outline below as a starting point, then connect it to your course or textbook.`,
  core:`<p><strong>Start with the key idea.</strong> Read the topic description and write down the terms that seem important. Try to define each term in your own words before looking up its formal meaning.</p><ul><li>Identify the main question this topic helps answer.</li><li>Break the idea into smaller parts.</li><li>Connect it to an example from class, a textbook, or everyday life.</li><li>Check whether your explanation is supported by reliable learning materials.</li></ul><p>This is a starter outline rather than a complete syllabus-specific lesson. The details can be expanded for your class level and curriculum.</p>`,
  example:`<p>Choose one idea from <strong>${escapeHTML(topic[0])}</strong>. Write a simple example, explain each step or part, then check your explanation against a trusted textbook or teacher's notes.</p>`,
  question:"Which is the best way to check your understanding of a new topic?", options:["Memorise the title only","Explain the idea in your own words and test it with an example","Skip examples and practice"], answer:1, explanation:"Explaining the idea and checking it with an example helps reveal what you understand and what needs more review."
};
const lesson = (lessons[subjectSlug] || [])[index] || generic;
document.title = `${topic[0]} — Edunime`;
document.getElementById("lessonTitle").textContent = topic[0];
document.getElementById("lessonIntro").textContent = lesson.intro;
document.getElementById("lessonCount").textContent = `TOPIC ${String(index + 1).padStart(2,"0")} · ${subject.title.toUpperCase()}`;
document.getElementById("lessonSymbol").textContent = subject.symbol;
document.getElementById("coreContent").innerHTML = lesson.core;
document.getElementById("exampleContent").innerHTML = lesson.example;
document.getElementById("practicePrompt").textContent = lesson.question;
document.getElementById("practiceOptions").innerHTML = lesson.options.map((option, optionIndex) => `<button type="button" class="practice-option" data-option="${optionIndex}">${String.fromCharCode(65 + optionIndex)}. ${escapeHTML(option)}</button>`).join("");
document.getElementById("sidebarSubject").textContent = subject.title;
const subjectUrl = `learning.html?subject=${encodeURIComponent(subjectSlug)}`;
document.getElementById("backToTopics").href = subjectUrl;
document.getElementById("allTopicsLink").href = subjectUrl;
document.getElementById("sidebarTopics").innerHTML = subject.topics.map((item, topicNo) => `<a class="sidebar-topic ${topicNo === index ? "active" : ""}" href="lesson.html?subject=${encodeURIComponent(subjectSlug)}&topic=${topicNo}">${String(topicNo + 1).padStart(2,"0")} · ${escapeHTML(item[0])}</a>`).join("");
const prev = document.getElementById("previousTopic");
const next = document.getElementById("nextTopic");
prev.href = `lesson.html?subject=${encodeURIComponent(subjectSlug)}&topic=${Math.max(0,index-1)}`;
next.href = `lesson.html?subject=${encodeURIComponent(subjectSlug)}&topic=${Math.min(subject.topics.length-1,index+1)}`;
if(index===0) prev.classList.add("disabled");
if(index===subject.topics.length-1) next.classList.add("disabled");
const feedback = document.getElementById("practiceFeedback");
document.querySelectorAll(".practice-option").forEach(button => button.addEventListener("click", () => {
  const selected = Number(button.dataset.option);
  document.querySelectorAll(".practice-option").forEach(item => item.classList.remove("correct","incorrect"));
  const correct = selected === lesson.answer;
  button.classList.add(correct ? "correct" : "incorrect");
  feedback.textContent = (correct ? "Correct! " : "Not quite. ") + lesson.explanation;
  feedback.hidden = false;
}));
const notesKey = `edunime-notes-${subjectSlug}-${index}`;
const notesArea = document.getElementById("studentNotes");
const saveStatus = document.getElementById("saveStatus");
try { notesArea.value = localStorage.getItem(notesKey) || ""; } catch (e) {}
document.getElementById("saveNotes").addEventListener("click", () => {
  try {
    localStorage.setItem(notesKey, notesArea.value);
    saveStatus.textContent = "Saved in this browser on this device.";
  } catch (e) {
    saveStatus.textContent = "Browser storage is unavailable. Copy your notes somewhere safe.";
  }
});
document.getElementById("year").textContent = new Date().getFullYear();
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}
