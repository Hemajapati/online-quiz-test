let current = 0;
let time = 300;

const quizData = [
 {question:"HTML stands for?",options:["Hyper Text Markup Language","High Text","Hyperlinks","None"],correctAnswer:0,marks:1,negative:0.25,userAnswer:null},
 {question:"CSS used for?",options:["Logic","Design","DB","None"],correctAnswer:1,marks:1,negative:0.25,userAnswer:null},
 {question:"JS is?",options:["Language","Browser","IDE","None"],correctAnswer:0,marks:1,negative:0.25,userAnswer:null},
 {question:"True/False: HTML is programming?",options:["True","False"],correctAnswer:1,marks:1,negative:0.25,userAnswer:null},
 {question:"<a> tag used for?",options:["Image","Link","Table","Form"],correctAnswer:1,marks:1,negative:0.25,userAnswer:null},
 {question:"CSS stands for?",options:["Creative","Cascading","Colorful","None"],correctAnswer:1,marks:1,negative:0.25,userAnswer:null},
 {question:"Which loop in JS?",options:["for","repeat","loop","all"],correctAnswer:0,marks:1,negative:0.25,userAnswer:null},
 {question:"Backend language?",options:["HTML","CSS","JS","PHP"],correctAnswer:3,marks:1,negative:0.25,userAnswer:null},
 {question:"True/False: CSS animation possible?",options:["True","False"],correctAnswer:0,marks:1,negative:0.25,userAnswer:null},
 {question:"DOM stands for?",options:["Document Object Model","Data Object","None","All"],correctAnswer:0,marks:1,negative:0.25,userAnswer:null}
];

function loadPalette() {
  let list = document.getElementById("questionList");
  quizData.forEach((_, i) => {
    let btn = document.createElement("button");
    btn.innerText = i + 1;
    btn.className = "q-btn";
    btn.onclick = () => loadQuestion(i);
    list.appendChild(btn);
  });
}

function loadQuestion(i) {
  current = i;
  document.getElementById("questionText").innerText = quizData[i].question;
  let options = document.getElementById("options");
  options.innerHTML = "";

  quizData[i].options.forEach((opt, idx) => {
    options.innerHTML += `
      <label class="option">
        <input type="radio" name="opt" onclick="selectAnswer(${idx})"
        ${quizData[i].userAnswer === idx ? "checked" : ""}>
        ${opt}
      </label>`;
  });

  updateStatus();
}

function selectAnswer(ans) {
  quizData[current].userAnswer = ans;
  updateStatus();
}

function updateStatus() {
  document.querySelectorAll(".q-btn").forEach((b, i) => {
    b.classList.remove("answered","skipped");
    if (quizData[i].userAnswer !== null) b.classList.add("answered");
    else if (i === current) b.classList.add("skipped");
  });
}

function submitQuiz() {
  let score = 0;
  quizData.forEach(q => {
    if (q.userAnswer === q.correctAnswer) score += q.marks;
    else if (q.userAnswer !== null) score -= q.negative;
  });

  localStorage.setItem("score", score);
  window.location.href = "result.html";
}

setInterval(() => {
  time--;
  document.getElementById("time").innerText = time;
  if (time === 0) submitQuiz();
}, 1000);

loadPalette();
loadQuestion(0);