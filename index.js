if (!localStorage.getItem("quizzes")) {
  const defaultQuizzes = [
    {
      id: "pythonQuiz",
      title: "Python Basics",
      questions: [
        {
          question: "How do you declare a variable in Python?",
          options: ["int x = 5", "x = 5", "var x = 5"],
          answer: "x = 5"
        },
        {
          question: "What keyword is used for a global variable in Python?",
          options: ["global", "Global", "public"],
          answer: "global"
        },
        {
          question: "What is the output of: print(type('hello'))?",
          options: ["<class 'str'>", "string", "text"],
          answer: "<class 'str'>"
        }
      ]
    },
    {
      id: "javaQuiz",
      title: "Java Basics",
      questions: [
        {
          question: "How do you declare an integer variable in Java?",
          options: ["int x = 10;", "x = 10", "declare int x = 10"],
          answer: "int x = 10;"
        },
        {
          question: "Which keyword is used to define a method in Java?",
          options: ["function", "def", "void"],
          answer: "void"
        },
        {
          question: "Which keyword is used for a class-level variable?",
          options: ["static", "global", "final"],
          answer: "static"
        }
      ]
    }
  ];

  localStorage.setItem("quizzes", JSON.stringify(defaultQuizzes));
}

const quizListDiv = document.getElementById("quizList");

const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];

if (quizzes.length === 0) {
  quizListDiv.innerHTML = "<p>No available quizzes...</p>";
} else {
  quizzes.forEach((quiz) => {
    const quizButton = document.createElement("button");
    quizButton.textContent = quiz.title;
    quizButton.classList.add("quiz-button");
    quizButton.addEventListener("click", () => {

      localStorage.setItem("currentQuizId", quiz.id);
      window.location.href = "quiz.html";
    });

    quizListDiv.appendChild(quizButton);
  });
}