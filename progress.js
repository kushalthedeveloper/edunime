(function () {
  "use strict";

  const STORAGE_KEY = "edunime-completed-lessons";

  function readCompleted() {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      return Array.isArray(value) ? value : [];
    } catch (error) {
      return [];
    }
  }

  function writeCompleted(value) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
      return true;
    } catch (error) {
      return false;
    }
  }

  function params() {
    return new URLSearchParams(window.location.search);
  }

  function subjectSlug() {
    return params().get("subject") || "mathematics";
  }

  function topicNumber() {
    const n = Number.parseInt(params().get("topic") || "0", 10);
    return Number.isFinite(n) && n >= 0 ? n : 0;
  }

  function lessonKey(subject, topic) {
    return subject + ":" + topic;
  }

  function renderSubjectProgress() {
    const grid = document.getElementById("topicGrid");
    const panel = document.getElementById("subjectProgress");
    if (!grid || !panel) return;

    const cards = Array.from(grid.querySelectorAll(".topic-card"));
    const subject = subjectSlug();
    const completed = readCompleted();
    const total = cards.length;
    const done = cards.filter(function (_card, index) {
      return completed.includes(lessonKey(subject, index));
    }).length;
    const percent = total ? Math.round(done / total * 100) : 0;

    panel.className = "progress-panel";
    panel.style.cssText = "display:block!important;visibility:visible!important;opacity:1!important;width:100%;box-sizing:border-box;margin:24px 0;padding:22px;background:#fff;border:1px solid #e7e9f0;border-radius:16px;color:#182033;";

    panel.innerHTML = "";

    const top = document.createElement("div");
    top.className = "progress-panel-top";
    const label = document.createElement("div");
    const kicker = document.createElement("div");
    kicker.className = "progress-kicker";
    kicker.textContent = "YOUR PROGRESS";
    const heading = document.createElement("h3");
    heading.textContent = done + " of " + total + " topics completed";
    label.append(kicker, heading);

    const percentage = document.createElement("strong");
    percentage.textContent = percent + "%";
    top.append(label, percentage);

    const track = document.createElement("div");
    track.className = "progress-track-new";
    track.setAttribute("role", "progressbar");
    track.setAttribute("aria-label", "Subject learning progress");
    track.setAttribute("aria-valuemin", "0");
    track.setAttribute("aria-valuemax", "100");
    track.setAttribute("aria-valuenow", String(percent));

    const fill = document.createElement("span");
    fill.style.width = percent + "%";
    track.appendChild(fill);

    const note = document.createElement("p");
    note.textContent = total === 0
      ? "Topics are loading. Please refresh the page in a moment."
      : done === total
        ? "Great work! You have completed every topic in this subject."
        : "Complete a lesson and mark it complete to update this progress bar. Progress is saved in this browser.";

    panel.append(top, track, note);

    cards.forEach(function (card, index) {
      const isDone = completed.includes(lessonKey(subject, index));
      card.classList.toggle("topic-completed", isDone);
      let badge = card.querySelector(".completion-badge");
      if (isDone && !badge) {
        badge = document.createElement("span");
        badge.className = "completion-badge";
        badge.textContent = "✓ Completed";
        card.appendChild(badge);
      } else if (!isDone && badge) {
        badge.remove();
      }
    });
  }

  function renderLessonCompletion() {
    const container = document.getElementById("lessonCompletion");
    if (!container) return;

    const subject = subjectSlug();
    const topic = topicNumber();
    const key = lessonKey(subject, topic);

    container.className = "progress-completion";
    container.innerHTML = "";

    const heading = document.createElement("h3");
    const message = document.createElement("p");
    message.setAttribute("aria-live", "polite");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "completion-button";

    function refresh() {
      const done = readCompleted().includes(key);
      heading.textContent = done ? "Lesson completed!" : "Your lesson progress";
      message.textContent = done
        ? "Your completion is saved in this browser."
        : "Finished this lesson? Mark it complete below.";
      button.textContent = done ? "✓ Completed — click to undo" : "Mark lesson complete";
      button.classList.toggle("completion-done", done);
    }

    button.addEventListener("click", function () {
      const items = readCompleted();
      const index = items.indexOf(key);
      if (index >= 0) items.splice(index, 1);
      else items.push(key);

      if (!writeCompleted(items)) {
        message.textContent = "Progress could not be saved in this browser.";
        return;
      }

      refresh();
    });

    container.append(heading, message, button);
    refresh();
  }

  function start() {
    renderSubjectProgress();
    renderLessonCompletion();

    // Re-render after topic cards are inserted or progress changes in another tab.
    const grid = document.getElementById("topicGrid");
    if (grid && window.MutationObserver) {
      const observer = new MutationObserver(renderSubjectProgress);
      observer.observe(grid, { childList: true, subtree: true });
    }
    window.addEventListener("pageshow", renderSubjectProgress);
    window.addEventListener("storage", renderSubjectProgress);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();