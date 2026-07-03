const problemData = {
  otp: {
    title: "OTP Service Delay",
    summary: "OTP complaints increased by 48% within one day, affecting transfer verification.",
    rootCause: "SMS Gateway Latency",
    confidence: "96%",
    priority: "High",
    service: "OTP / Transfers",
    badge: "High Priority",
    actions: [
      "Switch OTP messages to backup SMS provider.",
      "Test OTP gateway response time.",
      "Notify affected customers.",
      "Monitor complaints for 24 hours."
    ],
    impact: ["Complaints -35%", "Success Rate +18%", "Response Time Faster"]
  },
  transfer: {
    title: "Transfer Success Rate Dropped",
    summary: "Successful transfers decreased by 18% compared to the previous day.",
    rootCause: "Verification Failure",
    confidence: "89%",
    priority: "Medium",
    service: "Money Transfers",
    badge: "Medium Priority",
    actions: [
      "Review transfer verification logs.",
      "Check OTP dependency with transfer confirmation.",
      "Run test transactions across channels.",
      "Escalate to operations team if failure continues."
    ],
    impact: ["Complaints -22%", "Success Rate +12%", "Response Time Improved"]
  },
  login: {
    title: "Login Timeout Increase",
    summary: "Login timeout cases increased during peak usage hours.",
    rootCause: "Authentication Server Load",
    confidence: "84%",
    priority: "Medium",
    service: "Mobile Banking Login",
    badge: "Medium Priority",
    actions: [
      "Scale authentication server resources.",
      "Review login traffic during peak hours.",
      "Optimize session handling.",
      "Monitor timeout rate after changes."
    ],
    impact: ["Complaints -18%", "Success Rate +9%", "Response Time Better"]
  },
  cards: {
    title: "Card Transaction Slowdown",
    summary: "Card transaction response time increased during peak hours.",
    rootCause: "Peak-Time Processing Delay",
    confidence: "78%",
    priority: "Low",
    service: "Card Payments",
    badge: "Low Priority",
    actions: [
      "Monitor card processing time.",
      "Check payment gateway performance.",
      "Review peak-hour capacity.",
      "Prioritize high-value transaction routing."
    ],
    impact: ["Complaints -10%", "Success Rate +6%", "Response Time Stable"]
  }
};

function loadAnalysis() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") || "otp";
  const p = problemData[id] || problemData.otp;

  document.getElementById("analysisTitle").textContent = p.title;
  document.getElementById("analysisSummary").textContent = p.summary;
  document.getElementById("rootCause").textContent = p.rootCause;
  document.getElementById("confidence").textContent = p.confidence;
  document.getElementById("priority").textContent = p.priority;
  document.getElementById("affectedService").textContent = p.service;
  document.getElementById("analysisBadge").textContent = p.badge;

  const actionPlan = document.getElementById("actionPlan");
  actionPlan.innerHTML = "";
  p.actions.forEach(action => {
    actionPlan.innerHTML += `<li>${action}</li>`;
  });

  document.getElementById("impactBox").innerHTML = `
    <div class="impact-item red-soft"><span> ${p.impact[0]}</span></div>
    <div class="impact-item green-soft"><span> ${p.impact[1]}</span></div>
    <div class="impact-item blue-soft"><span> ${p.impact[2]}</span></div>
  `;
}

function quickAsk(question) {
  document.getElementById("userQuestion").value = question;
  askAI();
}

function askAI() {
  const input = document.getElementById("userQuestion");
  const chatBox = document.getElementById("chatBox");
  const question = input.value.trim();

  if (!question) return;

  chatBox.innerHTML += `<div class="message user">${question}</div>`;

  let answer = "";

  if (question.toLowerCase().includes("why")) {
    answer = `
      Complaints increased because OTP messages were delayed.
      The most likely reason is high latency in the SMS gateway,
      which affected transfer verification.
    `;
  } else if (question.toLowerCase().includes("best")) {
    answer = `
      The best decision is to switch OTP messages to the backup SMS provider,
      test the OTP gateway, and monitor complaints for the next 24 hours.
    `;
  } else if (question.toLowerCase().includes("delay")) {
    answer = `
      If the issue is delayed, complaints may continue to rise,
      customer satisfaction may drop, and transfer success rate may decrease.
    `;
  } else {
    answer = `
      Based on the current data, PulseBank AI recommends prioritizing
      OTP service recovery because it has the highest impact on banking operations.
    `;
  }

  chatBox.innerHTML += `<div class="message ai">${answer}</div>`;
  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;
}