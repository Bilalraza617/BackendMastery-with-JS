const studentForm = document.getElementById("student-form");
const studentListElement = document.getElementById("student-list");
const reportOutput = document.getElementById("report-output");
const generateReportButton = document.getElementById("generate-report");

const students = [];

function calculateAverage(scores) {
  let total = 0;
  for (let i = 0; i < scores.length; i += 1) {
    total += scores[i];
  }
  return total / scores.length;
}

function getGrade(average) {
  if (average >= 90) {
    return "A";
  }
  if (average >= 80) {
    return "B";
  }
  if (average >= 70) {
    return "C";
  }
  if (average >= 60) {
    return "D";
  }
  return "F";
}

function getRemark(grade) {
  if (grade === "A") {
    return "Excellent work";
  }
  if (grade === "B") {
    return "Good job";
  }
  if (grade === "C") {
    return "You can improve";
  }
  if (grade === "D") {
    return "Need more practice";
  }
  return "Try harder next time";
}

function buildStudentReport(student) {
  const average = calculateAverage(student.scores);
  const grade = getGrade(average);
  const remark = getRemark(grade);

  return {
    name: student.name,
    roll: student.roll,
    section: student.section,
    scores: student.scores,
    average: Number(average.toFixed(2)),
    grade,
    remark,
  };
}

function updateStudentList() {
  studentListElement.innerHTML = "";

  if (students.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty";
    empty.textContent = "No students added yet.";
    studentListElement.appendChild(empty);
    return;
  }

  for (let i = 0; i < students.length; i += 1) {
    const item = document.createElement("li");
    const current = students[i];
    item.textContent = `${current.name} (Roll ${current.roll}, Section ${current.section})`;
    studentListElement.appendChild(item);
  }
}

function renderReport(reports) {
  if (reports.length === 0) {
    reportOutput.innerHTML = "<p>No report available. Add students first.</p>";
    return;
  }

  let output = "";

  for (let i = 0; i < reports.length; i += 1) {
    const report = reports[i];
    output += "<div class='report-item'>";
    output += `<p><strong>Name:</strong> ${report.name}</p>`;
    output += `<p><strong>Roll:</strong> ${report.roll}</p>`;
    output += `<p><strong>Section:</strong> ${report.section}</p>`;
    output += `<p><strong>Scores:</strong> ${report.scores.join(", ")}</p>`;
    output += `<p><strong>Average:</strong> ${report.average.toFixed(2)}</p>`;
    output += `<p><strong>Grade:</strong> ${report.grade}</p>`;
    output += `<p><strong>Remark:</strong> ${report.remark}</p>`;
    output += "</div>";
  }

  const summary = getClassSummary(reports);
  output += "<div class='report-summary'>";
  output += `<p><strong>Class Average:</strong> ${summary.classAverage.toFixed(2)}</p>`;

  if (summary.topStudent) {
    output += `<p><strong>Top Student:</strong> ${summary.topStudent.name} (Average: ${summary.topStudent.average.toFixed(2)})</p>`;
  }

  output += `<p><strong>Grade Counts:</strong> A: ${summary.gradeCounts.A}, B: ${summary.gradeCounts.B}, C: ${summary.gradeCounts.C}, D: ${summary.gradeCounts.D}, F: ${summary.gradeCounts.F}</p>`;
  output += "</div>";

  reportOutput.innerHTML = output;
}

function getClassSummary(reports) {
  const summary = {
    totalAverage: 0,
    gradeCounts: { A: 0, B: 0, C: 0, D: 0, F: 0 },
    topStudent: null,
  };

  for (let i = 0; i < reports.length; i += 1) {
    const student = reports[i];
    summary.totalAverage += student.average;
    summary.gradeCounts[student.grade] += 1;

    if (
      summary.topStudent === null ||
      student.average > summary.topStudent.average
    ) {
      summary.topStudent = student;
    }
  }

  summary.classAverage = Number(
    (summary.totalAverage / reports.length).toFixed(2),
  );
  return summary;
}

function printClassSummary(summary) {
  let result = "<div class='report-summary'>";
  result += `<p><strong>Class Average:</strong> ${summary.classAverage.toFixed(2)}</p>`;

  if (summary.topStudent) {
    result += `<p><strong>Top Student:</strong> ${summary.topStudent.name} (Average: ${summary.topStudent.average.toFixed(2)})</p>`;
  }

  result += `<p><strong>Grade Counts:</strong> A: ${summary.gradeCounts.A}, B: ${summary.gradeCounts.B}, C: ${summary.gradeCounts.C}, D: ${summary.gradeCounts.D}, F: ${summary.gradeCounts.F}</p>`;
  result += "</div>";

  reportOutput.innerHTML += result;
}

studentForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const roll = Number(document.getElementById("roll").value);
  const section = document.getElementById("section").value.trim();
  const score1 = Number(document.getElementById("score1").value);
  const score2 = Number(document.getElementById("score2").value);
  const score3 = Number(document.getElementById("score3").value);

  if (
    !name ||
    !section ||
    Number.isNaN(roll) ||
    Number.isNaN(score1) ||
    Number.isNaN(score2) ||
    Number.isNaN(score3)
  ) {
    alert("Please fill all fields with valid values.");
    return;
  }

  const student = {
    name,
    roll,
    section,
    scores: [score1, score2, score3],
  };

  students.push(student);
  updateStudentList();
  studentForm.reset();
  document.getElementById("name").focus();
});

generateReportButton.addEventListener("click", function () {
  const reports = [];

  for (let i = 0; i < students.length; i += 1) {
    reports.push(buildStudentReport(students[i]));
  }

  renderReport(reports);

  if (reports.length > 0) {
    const summary = getClassSummary(reports);
    printClassSummary(summary);
  }
});

updateStudentList();
