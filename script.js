const gradeTableTheory = [
  { min: 51, max: 60, grade: "AA", point: 10 },
  { min: 46, max: 50, grade: "AB", point: 9 },
  { min: 41, max: 45, grade: "BB", point: 8 },
  { min: 36, max: 40, grade: "BC", point: 7 },
  { min: 30, max: 35, grade: "CC", point: 6 },
  { min: 24, max: 29, grade: "CD", point: 5 },
  { min: 0, max: 23, grade: "FF", point: 0 }
];

const gradeTableCat = [
  { min: 34, max: 40, grade: "AA", point: 10 },
  { min: 31, max: 33, grade: "AB", point: 9 },
  { min: 28, max: 30, grade: "BB", point: 8 },
  { min: 25, max: 27, grade: "BC", point: 7 },
  { min: 20, max: 24, grade: "CC", point: 6 },
  { min: 16, max: 19, grade: "CD", point: 5 },
  { min: 0, max: 15, grade: "FF", point: 0 }
];

const gradeTablePractical = [
  { min: 26, max: 30, grade: "AA", point: 10 },
  { min: 23, max: 25, grade: "AB", point: 9 },
  { min: 20, max: 22, grade: "BB", point: 8 },
  { min: 17, max: 19, grade: "BC", point: 7 },
  { min: 14, max: 16, grade: "CC", point: 6 },
  { min: 12, max: 13, grade: "CD", point: 5 },
  { min: 0, max: 11, grade: "FF", point: 0 }
];

const gradeTableCap = [
  { min: 17, max: 20, grade: "AA", point: 10 },
  { min: 15, max: 16, grade: "AB", point: 9 },
  { min: 13, max: 14, grade: "BB", point: 8 },
  { min: 11, max: 12, grade: "BC", point: 7 },
  { min: 9, max: 10, grade: "CC", point: 6 },
  { min: 8, max: 8, grade: "CD", point: 5 },
  { min: 0, max: 7, grade: "FF", point: 0 }
];

const overallGradeTable = [
  { min: 10, grade: "AA", point: 10 },
  { min: 9, grade: "AB", point: 9 },
  { min: 8, grade: "BB", point: 8 },
  { min: 7, grade: "BC", point: 7 },
  { min: 6, grade: "CC", point: 6 },
  { min: 5, grade: "CD", point: 5 },
  { min: 0, grade: "FF", point: 0 }
];

let subjects = [];

function getGradeAndPoint(mark, table) {
  for (let range of table) {
    if (mark >= range.min && mark <= range.max) {
      return { grade: range.grade, point: range.point };
    }
  }
  return { grade: "Invalid", point: 0 };
}

function addSubject() {
  const subjectNameInput = document.getElementById("subject");
  const subjectName = subjectNameInput.value.trim();
  if (!subjectName) {
    alert("Please select a subject.");
    return;
  }

  // Check if subject already added (case-insensitive)
  const subjectExists = subjects.some(
    (s) => s.subjectName.toLowerCase() === subjectName.toLowerCase()
  );
  if (subjectExists) {
    alert(`Subject "${subjectName}" has already been added.`);
    return;
  }

  // parseInt with base 10, and fallback to NaN if invalid
  const teeRaw = document.getElementById("tee").value.trim();
  const catRaw = document.getElementById("cat").value.trim();
  const tepRaw = document.getElementById("tep").value.trim();
  const capRaw = document.getElementById("cap").value.trim();

  const tee = teeRaw === "" ? NaN : parseInt(teeRaw, 10);
  const cat = catRaw === "" ? NaN : parseInt(catRaw, 10);
  const tep = tepRaw === "" ? NaN : parseInt(tepRaw, 10);
  const cap = capRaw === "" ? NaN : parseInt(capRaw, 10);

  // Validation
  if (isNaN(tee) || tee < 0 || tee > 60) {
    alert("Enter valid TEE marks (0-60).");
    return;
  }
  if (isNaN(cat) || cat < 0 || cat > 40) {
    alert("Enter valid CA1 + CA2 marks (0-40).");
    return;
  }

  const isEntrepreneurship = subjectName.toLowerCase() === "entrepreneurship and startup";

  if (!isEntrepreneurship) {
    if (isNaN(tep) || tep < 0 || tep > 30) {
      alert("Enter valid TEP marks (0-30).");
      return;
    }
    if (isNaN(cap) || cap < 0 || cap > 20) {
      alert("Enter valid CA3 marks (0-20).");
      return;
    }
  }

  // Calculate grades
  const teeGrade = getGradeAndPoint(tee, gradeTableTheory);
  const catGrade = getGradeAndPoint(cat, gradeTableCat);
  let tepGrade = { grade: "-", point: 0 };
  let capGrade = { grade: "-", point: 0 };

  if (!isEntrepreneurship) {
    tepGrade = getGradeAndPoint(tep, gradeTablePractical);
    capGrade = getGradeAndPoint(cap, gradeTableCap);
  }

  /// Check if any component is fail
const isAnyComponentFail =
  teeGrade.grade === "FF" ||
  catGrade.grade === "FF" ||
  (!isEntrepreneurship && (tepGrade.grade === "FF" || capGrade.grade === "FF"));

let overallGradeObj;
let overallPoint;

if (isAnyComponentFail) {
  // If fail in any component, overall grade is FF and point 0
  overallGradeObj = { grade: "FF", point: 0 };
  overallPoint = 0;
} else {
  // Calculate overall point normally
  if (isEntrepreneurship) {
    overallPoint = (teeGrade.point * 60 + catGrade.point * 40) / 100;
  } else {
    overallPoint = (teeGrade.point * 60 + catGrade.point * 40 + capGrade.point * 20 + tepGrade.point * 30) / 150;
  }
  overallPoint = Math.ceil(overallPoint);
  overallGradeObj = overallGradeTable.find((r) => overallPoint >= r.min);
  if (!overallGradeObj) overallGradeObj = { grade: "FF", point: 0 };
}

  // Add subject data
  subjects.push({
    subjectName,
    tee,
    teeGrade: teeGrade.grade,
    cat,
    catGrade: catGrade.grade,
    tep: isEntrepreneurship ? "-" : tep,
    tepGrade: isEntrepreneurship ? "-" : tepGrade.grade,
    cap: isEntrepreneurship ? "-" : cap,
    capGrade: isEntrepreneurship ? "-" : capGrade.grade,
    overallGrade: overallGradeObj.grade,
    overallPoint: overallGradeObj.point
  });

  // Clear inputs after adding
  subjectNameInput.value = "";
  document.getElementById("tee").value = "";
  document.getElementById("cat").value = "";
  document.getElementById("tep").value = "";
  document.getElementById("cap").value = "";

  // Update practical inputs visibility for Entrepreneurship
  document.getElementById("practicalInputs").style.display = "inline-block";

  // Update table and SPI
  updateResultTable();
  updateSPI();
}

function updateResultTable() {
  const tbody = document.querySelector("#resultTable tbody");
  tbody.innerHTML = "";

  subjects.forEach((s) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${s.subjectName}</td>
      <td>${s.tee}</td>
      <td>${s.teeGrade}</td>
      <td>${s.cat}</td>
      <td>${s.catGrade}</td>
      <td>${s.tep}</td>
      <td>${s.tepGrade}</td>
      <td>${s.cap}</td>
      <td>${s.capGrade}</td>
      <td>${s.overallGrade}</td>
      <td>${s.overallPoint}</td>
    `;
    tbody.appendChild(row);
  });
}

function updateSPI() {
  // Define subject credits here (adjust as needed)
  const creditsMap = {
    "vlsi design": 4,
    "computer communication and networking": 4,
    "analog electronics": 4,
    "signals and systems": 4,
    "microprocessor and microcontroller": 4,
    "entrepreneurship and startup": 2
  };

  let totalCreditPoints = 0;
  let totalCredits = 0;

  subjects.forEach((s) => {
    const credit = creditsMap[s.subjectName.toLowerCase()] || 4;
    totalCreditPoints += s.overallPoint * credit;
    totalCredits += credit;
  });

  if (totalCredits === 0) {
    document.getElementById("spi").textContent = "";
    return;
  }

  const spiValue = (totalCreditPoints / totalCredits).toFixed(2);
  document.getElementById("spi").textContent = `Your SPI is: ${spiValue}`;
}


// Hide/show practical inputs based on subject selection
document.getElementById("subject").addEventListener("change", function () {
  const practicalInputs = document.getElementById("practicalInputs");
  if (this.value.trim().toLowerCase() === "entrepreneurship and startup") {
    practicalInputs.style.display = "none";
  } else {
    practicalInputs.style.display = "inline-block";
  }
});
