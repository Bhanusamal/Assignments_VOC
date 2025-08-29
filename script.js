// Listen for input changes
document.getElementById("resume-form").addEventListener("input", () => {
  updateResume();
  updateProgress();
});

// PDF button listener
document.getElementById("download-btn").addEventListener("click", downloadPDF);

// Update resume preview
function updateResume() {
  document.getElementById("r-name").innerText = document.getElementById("name").value || "Your Name";
  document.getElementById("r-email").innerText = document.getElementById("email").value || "your.email@example.com";
  document.getElementById("r-phone").innerText = document.getElementById("phone").value || "123-456-7890";
  document.getElementById("r-summary").innerText = document.getElementById("summary").value || "Write something about yourself...";

  // Skills
  const skills = document.getElementById("skills").value.split(",");
  document.getElementById("r-skills").innerHTML = skills.filter(s => s.trim() !== "")
    .map(s => `<li>${s.trim()}</li>`).join("");
}

// Add Education
function addEducation() {
  const div = document.createElement("div");
  div.innerHTML = `<input type="text" placeholder="Degree, School, Year" oninput="renderEducation(); updateProgress();">`;
  document.getElementById("education-section").appendChild(div);
}

function renderEducation() {
  const inputs = document.querySelectorAll("#education-section input");
  const list = document.getElementById("r-education");
  list.innerHTML = "";
  inputs.forEach(input => {
    if (input.value.trim() !== "") {
      list.innerHTML += `<li>${input.value}</li>`;
    }
  });
}

// Add Experience
function addExperience() {
  const div = document.createElement("div");
  div.innerHTML = `<input type="text" placeholder="Job Title, Company, Year" oninput="renderExperience(); updateProgress();">`;
  document.getElementById("experience-section").appendChild(div);
}

function renderExperience() {
  const inputs = document.querySelectorAll("#experience-section input");
  const list = document.getElementById("r-experience");
  list.innerHTML = "";
  inputs.forEach(input => {
    if (input.value.trim() !== "") {
      list.innerHTML += `<li>${input.value}</li>`;
    }
  });
}

// Clear resume
function clearResume() {
  document.getElementById("resume-preview").innerHTML = `
    <h1 id="r-name">Your Name</h1>
    <p id="r-email">your.email@example.com | <span id="r-phone">123-456-7890</span></p>
    <h3>Profile Summary</h3>
    <p id="r-summary">Write something about yourself...</p>
    <h3>Education</h3>
    <ul id="r-education"></ul>
    <h3>Skills</h3>
    <ul id="r-skills"></ul>
    <h3>Experience</h3>
    <ul id="r-experience"></ul>
  `;
  document.getElementById("education-section").innerHTML = "";
  document.getElementById("experience-section").innerHTML = "";
  updateProgress();
}

// ✅ Working Download PDF
function downloadPDF() {
  const resume = document.getElementById("resume-preview");
  const options = {
    margin: 0.3,
    filename: "My_Resume.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
  };
  html2pdf().set(options).from(resume).save();
}

// ✅ Accurate Progress Bar
function updateProgress() {
  const allFields = document.querySelectorAll("#resume-form input, #resume-form textarea");
  let filled = 0;

  allFields.forEach(field => {
    if (field.value.trim() !== "") filled++;
  });

  const progress = Math.round((filled / allFields.length) * 100);

  const bar = document.getElementById("progress-bar");
  const text = document.getElementById("progress-text");

  bar.style.width = progress + "%";
  text.innerText = progress + "%";
}
