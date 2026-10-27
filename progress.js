
(function () {
  const KEY = "edunime-completed-lessons";

  function getCompleted() {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "[]");
    } catch {
      return [];
    }
  }

  function saveCompleted(items) {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
      return true;
    } catch {
      return false;
    }
  }

  const params = new URLSearchParams(location.search);
  const subject = params.get("subject") || "mathematics";
  const topic = Math.max(0, parseInt(params.get("topic") || "0", 10) || 0);
  const lessonKey = subject + ":" + topic;

  const lessonPage = document.getElementById("lessonCompletion");

  if (lessonPage) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Mark lesson complete";
    button.style.cssText =
      "padding:12px 18px;border:0;border-radius:10px;" +
      "background:#7653e8;color:white;font-weight:bold;cursor:pointer";

    const message = document.createElement("p");
    message.setAttribute("aria-live", "polite");

    lessonPage.append(button, message);

    function render() {
      const done = getCompleted().includes(lessonKey);
      button.textContent = done
        ? "✓ Marked complete — click to undo"
        : "Mark lesson complete";
      message.textContent = done
        ? "Your progress is saved in this browser."
        : "Mark this lesson complete when you finish.";
    }

    button.addEventListener("click", function () {
      const items = getCompleted();
      const index = items.indexOf(lessonKey);

      if (index >= 0) {
        items.splice(index, 1);
      } else {
        items.push(lessonKey);
      }

      if (!saveCompleted(items)) {
        message.textContent = "Progress could not be saved in this browser.";
        return;
      }

      render();
    });

    render();
  }
})();
