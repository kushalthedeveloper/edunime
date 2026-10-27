
(function () {
  "use strict";

  const STORAGE_KEY = "edunime-completed-lessons";

  function getCompleted() {
    try {
      const data = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
      );
      return Array.isArray(data) ? data : [];
    } catch (error) {
      return [];
    }
  }

  function saveCompleted(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (error) {
      return false;
    }
  }

  function getSubject() {
    return new URLSearchParams(location.search)
      .get("subject") || "mathematics";
  }

  function getTopicIndex() {
    const value = parseInt(
      new URLSearchParams(location.search).get("topic") || "0",
      10
    );
    return Number.isFinite(value) && value >= 0 ? value : 0;
  }

  function keyFor(subject, index) {
    return subject + ":" + index;
  }

  function makeProgressBar() {
    const grid = document.getElementById("topicGrid");
    if (!grid) return;

    let panel = document.getElementById("subjectProgress");

    if (!panel) {
      panel = document.createElement("section");
      panel.id = "subjectProgress";
      grid.parentNode.insertBefore(panel, grid);
    }

    panel.style.cssText =
      "display:block;margin:24px 0;padding:22px;" +
      "background:#fff;border:1px solid #e5e7ef;" +
      "border-radius:16px;color:#182033;";

    const subject = getSubject();

    function render() {
      const cards = Array.from(grid.children).filter(function (card) {
        return card.nodeType === 1;
      });

      const completed = getCompleted();
      const total = cards.length;

      const done = cards.filter(function (card, index) {
        return completed.includes(keyFor(subject, index));
      }).length;

      const percent = total
        ? Math.round((done / total) * 100)
        : 0;

      panel.innerHTML = "";

      const heading = document.createElement("div");
      heading.style.cssText =
        "display:flex;justify-content:space-between;" +
        "align-items:center;gap:12px;flex-wrap:wrap;";

      const label = document.createElement("div");
      label.innerHTML =
        '<div style="font-size:11px;font-weight:800;' +
        'letter-spacing:1.5px;color:#7653e8;">YOUR PROGRESS</div>' +
        '<h3 style="margin:8px 0;font-size:19px;">' +
        done + " of " + total + " topics completed</h3>";

      const percentage = document.createElement("strong");
      percentage.textContent = percent + "%";
      percentage.style.cssText =
        "font-size:26px;color:#7653e8;";

      heading.append(label, percentage);

      const track = document.createElement("div");
      track.setAttribute("role", "progressbar");
      track.setAttribute("aria-valuenow", String(percent));
      track.setAttribute("aria-valuemin", "0");
      track.setAttribute("aria-valuemax", "100");
      track.setAttribute("aria-label", "Subject learning progress");
      track.style.cssText =
        "height:10px;background:#eeeafc;border-radius:20px;" +
        "overflow:hidden;margin:14px 0;";

      const fill = document.createElement("div");
      fill.style.cssText =
        "height:100%;width:" + percent + "%;" +
        "background:linear-gradient(90deg,#a18af8,#7653e8);" +
        "border-radius:20px;transition:width .3s;";

      track.appendChild(fill);

      const note = document.createElement("p");
      note.textContent = total === 0
        ? "Your topics are still loading. Refresh the page shortly."
        : done === total
          ? "Excellent work! You completed every topic in this path."
          : "Keep learning one topic at a time. Your progress is saved in this browser.";

      note.style.cssText =
        "font-size:12px;line-height:1.7;color:#72798a;margin:0;";

      panel.append(heading, track, note);

      cards.forEach(function (card, index) {
        const isDone = completed.includes(keyFor(subject, index));
        card.style.borderColor = isDone ? "#9bd8b4" : "";

        let badge = card.querySelector(".progress-completed-label");

        if (isDone && !badge) {
          badge = document.createElement("span");
          badge.className = "progress-completed-label";
          badge.textContent = "✓ Completed";
          badge.style.cssText =
            "display:inline-block;margin:6px;padding:5px 8px;" +
            "border-radius:6px;background:#e8f8ef;color:#21754a;" +
            "font-size:11px;font-weight:700;";

          card.appendChild(badge);
        } else if (!isDone && badge) {
          badge.remove();
        }
      });
    }

    render();

    // Recheck briefly while the subject cards are being created.
    let attempts = 0;
    const refresh = setInterval(function () {
      render();
      attempts++;
      if (attempts >= 10) clearInterval(refresh);
    }, 500);
  }

  function makeCompletionButton() {
    const container = document.getElementById("lessonCompletion");
    if (!container) return;

    const subject = getSubject();
    const index = getTopicIndex();
    const key = keyFor(subject, index);

    container.innerHTML = "";
    container.style.cssText =
      "margin:24px 0;padding:20px;border:1px solid #e5e7ef;" +
      "border-radius:14px;background:#fff;";

    const heading = document.createElement("h3");
    const message = document.createElement("p");
    const button = document.createElement("button");

    button.type = "button";
    button.style.cssText =
      "padding:12px 18px;background:#7653e8;color:white;" +
      "border:0;border-radius:10px;font-weight:bold;cursor:pointer;";

    message.setAttribute("aria-live", "polite");

    function render() {
      const done = getCompleted().includes(key);
      heading.textContent = done ? "Lesson completed!" : "Your lesson progress";
      message.textContent = done
        ? "Your completion is saved in this browser."
        : "Finished this lesson? Mark it complete below.";
      button.textContent = done
        ? "✓ Completed — click to undo"
        : "Mark lesson complete";
    }

    button.addEventListener("click", function () {
      const items = getCompleted();
      const position = items.indexOf(key);

      if (position >= 0) {
        items.splice(position, 1);
      } else {
        items.push(key);
      }

      if (!saveCompleted(items)) {
        message.textContent = "Unable to save progress in this browser.";
        return;
      }

      render();
    });

    container.append(heading, message, button);
    render();
  }

  function start() {
    makeProgressBar();
    makeCompletionButton();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
