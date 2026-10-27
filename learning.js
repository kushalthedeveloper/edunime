const subjectData = {
  "mathematics": {
    title: "Mathematics", level: "FOUNDATIONS & PROBLEM SOLVING", description: "Build confidence with numbers, patterns, equations, and logical thinking.", symbol: "∑",
    topics: [
      ["Numbers & operations","Understand number systems, fractions, percentages, and the rules behind calculations.","Start with the essentials."],
      ["Algebra & equations","Use variables to describe patterns and solve equations step by step.","Turn unknowns into something you can solve."],
      ["Geometry","Explore shapes, angles, area, perimeter, and spatial reasoning.","See how maths describes space."],
      ["Functions & graphs","Connect equations with visual patterns and relationships.","Learn to read the story in a graph."],
      ["Probability & statistics","Summarise data, explore chance, and make sense of evidence.","Use data to ask better questions."],
      ["Practice & revision","Review what you learned with examples and short practice sessions.","Build a steady practice habit."]
    ]
  },
  "science": {
    title: "Science", level: "OBSERVE, TEST, DISCOVER", description: "Explore living things, matter, energy, and the natural world through questions and evidence.", symbol: "⚛",
    topics: [
      ["Scientific thinking","Ask testable questions, make observations, and understand evidence.","Start with how science works."],
      ["Physics","Explore motion, forces, energy, light, sound, and electricity.","Understand the rules behind physical systems."],
      ["Chemistry","Learn about atoms, elements, compounds, reactions, and materials.","Discover what matter is made of."],
      ["Biology","Study cells, organisms, ecosystems, and how life functions.","Explore life from cells to ecosystems."],
      ["Earth & space","Investigate our planet, weather, the solar system, and the universe.","Look outward and closer to home."],
      ["Practice & revision","Summarise concepts, label diagrams, and explain ideas in your own words.","Make your understanding stick."]
    ]
  },
  "computer-science": {
    title: "Computer Science", level: "LOGIC, CODE & CREATION", description: "Learn how computers solve problems and how to turn ideas into useful programs.", symbol: "</>",
    topics: [
      ["Computational thinking","Break big problems into smaller steps and spot useful patterns.","Learn a problem-solving mindset."],
      ["Programming basics","Explore variables, data types, conditions, loops, and functions.","Build blocks into working programs."],
      ["Data structures","Learn how lists, stacks, queues, and maps organise information.","Choose the right structure for a task."],
      ["Algorithms","Understand step-by-step solutions, searching, sorting, and efficiency.","Make solutions clear and repeatable."],
      ["Web development","Discover how HTML, CSS, and JavaScript work together.","Build interactive experiences for the web."],
      ["Practice projects","Apply what you learn by planning, building, testing, and improving small projects.","Learn by making things."]
    ]
  },
  "engineering": {
    title: "Engineering", level: "DESIGN & BUILD", description: "Connect maths and science to real systems, practical constraints, and creative design.", symbol: "⚙",
    topics: [
      ["Engineering foundations","Explore units, measurement, modelling, and engineering problem-solving.","Build a strong base."],
      ["Mechanical systems","Learn about motion, forces, materials, and mechanisms.","Understand moving parts."],
      ["Electrical & electronics","Explore circuits, voltage, current, components, and signals.","Discover how systems use electricity."],
      ["Civil & structures","Study loads, materials, structures, and the built environment.","See how structures are designed."],
      ["Design process","Define a need, compare ideas, make prototypes, and test improvements.","Turn ideas into workable designs."],
      ["Projects & review","Use a small project to practise documenting decisions and results.","Connect concepts through practice."]
    ]
  },
  "business-economics": {
    title: "Business & Economics", level: "PEOPLE, MARKETS & DECISIONS", description: "Explore how people, organisations, and economies make choices with limited resources.", symbol: "↗",
    topics: [
      ["Economic thinking","Explore needs, scarcity, incentives, and opportunity cost.","Understand the choices behind decisions."],
      ["Markets & prices","Learn about supply, demand, competition, and how prices change.","Explore how markets coordinate choices."],
      ["Money & finance","Build foundations in budgeting, saving, interest, and financial decisions.","Understand everyday financial concepts."],
      ["Business basics","Explore customers, value, operations, teamwork, and business models.","See how organisations create value."],
      ["Data & decisions","Use evidence, charts, and simple metrics to compare options.","Make decisions more thoughtfully."],
      ["Case studies","Practise explaining a real-world business or economic question.","Apply ideas to situations."]
    ]
  },
  "advanced-study": {
    title: "Advanced Study", level: "INQUIRY & RESEARCH", description: "Develop independent learning habits and explore how academic research questions are investigated.", symbol: "✳",
    topics: [
      ["Finding a research question","Narrow a broad interest into a clear, answerable question.","Start with focused curiosity."],
      ["Reading sources critically","Compare claims, evidence, methods, and limitations across sources.","Read beyond the headline."],
      ["Research methods","Understand how questions guide observations, experiments, and analysis.","Match methods to the question."],
      ["Academic writing","Organise arguments, cite sources, and communicate findings clearly.","Explain what you found and why it matters."],
      ["Evidence & ethics","Think about uncertainty, responsible practice, and research integrity.","Build trustworthy work."],
      ["Planning a project","Break an investigation into milestones, reading, analysis, and review.","Turn an idea into a manageable plan."]
    ]
  }
};
const fallback = subjectData.mathematics;
const slug = new URLSearchParams(window.location.search).get("subject") || "mathematics";
const subject = subjectData[slug] || fallback;
document.title = `${subject.title} — Edunime`;
document.getElementById("subjectTitle").textContent = subject.title;
document.getElementById("subjectDescription").textContent = subject.description;
document.getElementById("subjectLevel").textContent = subject.level;
document.getElementById("subjectArt").innerHTML = `<span>${escapeHTML(subject.symbol)}</span>`;
document.getElementById("topicGrid").innerHTML = subject.topics.map((topic, index) => `
  <article class="topic-card">
    <span class="topic-number">${String(index + 1).padStart(2, "0")}</span>
    <h3>${escapeHTML(topic[0])}</h3>
    <p>${escapeHTML(topic[1])}</p>
    <div class="topic-footer"><span>${escapeHTML(topic[2])}</span><span>↗</span></div>
  </article>`).join("");
document.getElementById("year").textContent = new Date().getFullYear();
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}
