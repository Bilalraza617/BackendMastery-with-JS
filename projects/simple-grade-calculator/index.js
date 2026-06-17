const students = [
  { name: "Ali", roll: 101, section: "A", scores: [85, 92, 78] },
  { name: "Sara", roll: 102, section: "A", scores: [90, 88, 95] },
  { name: "Usman", roll: 103, section: "B", scores: [70, 65, 80] },
  { name: "Hina", roll: 104, section: "B", scores: [55, 60, 62] },
];

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

function printStudentReport(report) {
  console.log(`Name: ${report.name}`);
  console.log(`Roll: ${report.roll}`);
  console.log(`Section: ${report.section}`);
  console.log(`Scores: ${report.scores.join(", ")}`);
  console.log(`Average: ${report.average.toFixed(2)}`);
  console.log(`Grade: ${report.grade}`);
  console.log(`Remark: ${report.remark}`);
  console.log("---");
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
  console.log(`Class Average: ${summary.classAverage.toFixed(2)}`);

  if (summary.topStudent) {
    console.log(
      `Top Student: ${summary.topStudent.name} (Average: ${summary.topStudent.average.toFixed(2)})`,
    );
  }

  console.log(
    `Grade Counts: A: ${summary.gradeCounts.A}, B: ${summary.gradeCounts.B}, C: ${summary.gradeCounts.C}, D: ${summary.gradeCounts.D}, F: ${summary.gradeCounts.F}`,
  );
}

function runGradeReport(studentsList) {
  const reports = [];

  for (let i = 0; i < studentsList.length; i += 1) {
    reports.push(buildStudentReport(studentsList[i]));
  }

  for (let i = 0; i < reports.length; i += 1) {
    printStudentReport(reports[i]);
  }

  const classSummary = getClassSummary(reports);
  printClassSummary(classSummary);
}

runGradeReport(students);
