(() => {
  const accordion = document.getElementById("faqAccordion");
  if (!accordion) return;

  const triggers = Array.from(accordion.querySelectorAll(".acc-trigger"));

  function setExpanded(trigger, expanded) {
    const panelId = trigger.getAttribute("aria-controls");
    const panel = panelId ? document.getElementById(panelId) : null;

    trigger.setAttribute("aria-expanded", String(expanded));
    if (panel) panel.hidden = !expanded;
  }

  function closeAll(exceptTrigger) {
    triggers.forEach((t) => {
      if (t === exceptTrigger) return;
      setExpanded(t, false);
    });
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const isOpen = trigger.getAttribute("aria-expanded") === "true";

      if (isOpen) {
        // 開いているものを押したら閉じる
        setExpanded(trigger, false);
      } else {
        // 開くときは他を閉じてから開く（同時に1つだけ）
        closeAll(trigger);
        setExpanded(trigger, true);
      }
    });

    // ESCで閉じる（任意）
    trigger.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setExpanded(trigger, false);
        trigger.focus();
      }
    });
  });

  // 初期状態の整合
  triggers.forEach((t) => setExpanded(t, t.getAttribute("aria-expanded") === "true"));
})();
