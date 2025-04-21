const quizId = localStorage.getItem("currentQuizId");
const quizzes = JSON.parse(localStorage.getItem("quizzes"));

const selectedQuiz = quizzes.find(quiz => quiz.id === quizId);

const quizTitleElement = document.getElementById("quizTitle");
quizTitleElement.textContent = selectedQuiz ? selectedQuiz.title : "Quiz not found";

const questionsContainer = document.getElementById("questionsContainer");

if (!selectedQuiz) {
  questionsContainer.innerHTML = "<p>Quiz not found.</p>";
} else {
  selectedQuiz.questions.forEach((question, index) => {
    const questionElement = document.createElement("div");
    questionElement.classList.add("question");

    const questionTitle = document.createElement("h3");
    questionTitle.textContent = question.question;
    questionElement.appendChild(questionTitle);

    const optionsWrapper = document.createElement("div");
    optionsWrapper.classList.add("options-wrapper");

    question.options.forEach(option => {
      const optionLabel = document.createElement("label");
      optionLabel.classList.add("option-label");

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question${index}`;
      input.value = option;

      optionLabel.appendChild(input);
      optionLabel.appendChild(document.createTextNode(option));
      optionsWrapper.appendChild(optionLabel);
    });

    questionElement.appendChild(optionsWrapper);
    questionsContainer.appendChild(questionElement);
  });
}

function submitQuiz() {
  let score = 0;

  selectedQuiz.questions.forEach((question, index) => {
    const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
    if (selectedOption && selectedOption.value === question.answer) {
      score++;
    }
  });

  document.getElementById("userScore").textContent = score;
  document.getElementById("scoreContainer").style.display = "block";
  document.getElementById("submitBtn").style.display = "none";

  const loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser) {
    let userScores = JSON.parse(localStorage.getItem("userScores")) || {};
    userScores[loggedInUser] = userScores[loggedInUser] || [];

    userScores[loggedInUser].push({
      quizTitle: selectedQuiz.title,
      score: score
    });

    localStorage.setItem("userScores", JSON.stringify(userScores));
  }
}