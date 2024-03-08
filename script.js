document.addEventListener('DOMContentLoaded', () => {
    nextButton.classList.add('hide');
});

const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const quizAppElement = document.getElementById('quiz-app');
const resultsElement = document.createElement('div');
resultsElement.setAttribute('id', 'results');
resultsElement.classList.add('results', 'hide');
quizAppElement.appendChild(resultsElement);

let shuffledQuestions, currentQuestionIndex;
let score = 0;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', () => selectAnswer(button));
        answerButtonsElement.appendChild(button);
        button.style.padding = '13px';
        button.style.borderRadius = '5px';
    });
}

function selectAnswer(selectedButton) {
    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
        setStatusClass(button, button.dataset.correct);
    });

    const correct = selectedButton.dataset.correct;
    if (correct) {
        score++;
    }
    setStatusClass(selectedButton, correct);

    setTimeout(() => {
        if (shuffledQuestions.length > currentQuestionIndex + 1) {
            nextButton.classList.remove('hide');
        } else {
            if (allOptionsFalse()) {
                playMusic();
            }
            concludeQuiz();
        }
    }, 1000); // Adjust delay as needed
}



// All options false for current question
function allOptionsFalseForCurrentQuestion() {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    return currentQuestion.answers.every(answer => answer.correct === false);
}


function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function concludeQuiz() {
    questionContainerElement.classList.add('hide');
    nextButton.classList.add('hide');

    resultsElement.classList.remove('hide');
    resultsElement.innerHTML = `
        <h2>Quiz Completed!</h2>
        <p>Your score: ${score} out of ${shuffledQuestions.length}</p>
        <button onclick="restartQuiz()">Restart Quiz</button>
    `;
    quizAppElement.appendChild(resultsElement);

    // Play music if all options for any question are false
    if (allOptionsFalse()) {
        playMusic();
    }
}

function restartQuiz() {
    resultsElement.classList.add('hide');
    score = 0;
    currentQuestionIndex = 0;
    startGame();
}

function allOptionsFalse() {
    for (let i = 0; i < shuffledQuestions.length; i++) {
        const question = shuffledQuestions[i];
        if (question.answers.every(answer => !answer.correct)) {
            return true; // If all options for any question are false, return true
        }
    }
    return false; // If no question has all options false, return false
}


// function to play music

function playMusic() {
    let audio = new Audio('mp3.m4a');
    audio.play();
}


const questions = [
    {
        question: "Which of the following is not a part of the MERN stack?",
        answers: [
            { text: "MongoDB", correct: false },
            { text: "Express.js", correct: false },
            { text: "AngularJS", correct: true },
            { text: "React.js", correct: false }
        ]
    },
    {
        question: "Which component of the MERN stack is responsible for handling server-side logic and routing?",
        answers: [
            { text: "MongoDB", correct: false },
            { text: "Express.js", correct: true },
            { text: "React.js", correct: false },
            { text: "Node.js", correct: false }
        ]
    },
    {
        question: "Which database is commonly used with the MERN stack for handling data storage?",
        answers: [
            { text: "MySQL", correct: false },
            { text: "MongoDB", correct: true },
            { text: "PostgreSQL", correct: false },
            { text: "SQLite", correct: false }
        ]
    },
    {
        question: "In the MERN stack, which framework is used for building user interfaces?",
        answers: [
            { text: "AngularJS", correct: false },
            { text: "Vue.js", correct: false },
            { text: "React.js", correct: true },
            { text: "Ember.js", correct: false }
        ]
    },
    {
        question: "Which of the following is used as the runtime environment for JavaScript in the MERN stack?",
        answers: [
            { text: "Browser", correct: false },
            { text: "Node.js", correct: true },
            { text: "React.js", correct: false },
            { text: "Express.js", correct: false }
        ]
    },
    {
        question: "What role does Express.js play in the MERN stack?",
        answers: [
            { text: "Frontend framework", correct: false },
            { text: "Database management system", correct: false },
            { text: "Backend web application framework", correct: true },
            { text: "State management library", correct: false }
        ]
    },
    {
        question: "Which component of the MERN stack allows JavaScript code to run on the server-side?",
        answers: [
            { text: "MongoDB", correct: false },
            { text: "Express.js", correct: false },
            { text: "React.js", correct: false },
            { text: "Node.js", correct: true }
        ]
    },
    {
        question: "Which of the following is true about React.js in the MERN stack?",
        answers: [
            { text: "It's a server-side framework.", correct: false },
            { text: "It's used for handling backend logic.", correct: false },
            { text: "It's a JavaScript library for building user interfaces.", correct: true },
            { text: "It's primarily used for database management.", correct: false }
        ]
    },
    {
        question: "Which part of the MERN stack is responsible for handling asynchronous operations on the server-side?",
        answers: [
            { text: "MongoDB", correct: false },
            { text: "Express.js", correct: false },
            { text: "React.js", correct: false },
            { text: "Node.js", correct: true }
        ]
    },
    {
        question: "What does MERN stand for?",
        answers: [
            { text: "Mean, Express, React, Node.js", correct: false },
            { text: "MongoDB, Express, React.js, Node.js", correct: true },
            { text: "Mongoose, Ember.js, React, Node.js", correct: false },
            { text: "Markdown, Elm, Redux, NestJS", correct: false }
        ]
    },
    {
        question: "Which of the following is a NoSQL database used in the MERN stack?",
        answers: [
            { text: "MySQL", correct: false },
            { text: "PostgreSQL", correct: false },
            { text: "MongoDB", correct: true },
            { text: "SQLite", correct: false }
        ]
    },
    {
        question: "Which component of the MERN stack is used for creating RESTful APIs?",
        answers: [
            { text: "MongoDB", correct: false },
            { text: "Express.js", correct: true },
            { text: "React.js", correct: false },
            { text: "Node.js", correct: false }
        ]
    },
    {
        question: "In the MERN stack, what is used for client-side routing?",
        answers: [
            { text: "MongoDB", correct: false },
            { text: "Express.js", correct: false },
            { text: "React Router", correct: true },
            { text: "Node.js", correct: false }
        ]
    },
    {
        question: "Which programming language is primarily used for server-side scripting in the MERN stack?",
        answers: [
            { text: "Python", correct: false },
            { text: "JavaScript", correct: true },
            { text: "Ruby", correct: false },
            { text: "Java", correct: false }
        ]
    },
    {
        question: "Which tool is commonly used for managing packages and dependencies in a MERN stack project?",
        answers: [
            { text: "npm", correct: true },
            { text: "yarn", correct: false },
            { text: "pip", correct: false },
            { text: "composer", correct: false }
        ]
    },
    {
        question: "In the MERN stack, what is used for handling HTTP requests and responses on the server-side?",
        answers: [
            { text: "MongoDB", correct: false },
            { text: "Express.js", correct: true },
            { text: "React.js", correct: false },
            { text: "Node.js", correct: false }
        ]
    },
    {
        question: "Which of the following is not a valid HTTP request method?",
        answers: [
            { text: "GET", correct: false },
            { text: "POST", correct: false },
            { text: "PUSH", correct: true },
            { text: "DELETE", correct: false }
        ]
    },
    {
        question: "Which command is used to create a new React.js application using create-react-app?",
        answers: [
            { text: "npm new react-app my-app", correct: false },
            { text: "create-react-app my-app", correct: true },
            { text: "npm create react-app my-app", correct: false },
            { text: "new-react my-app", correct: false }
        ]
    },
    {
        question: "Which command is used to start the development server in a MERN stack project?",
        answers: [
            { text: "npm start", correct: true },
            { text: "npm run dev", correct: false },
            { text: "npm run server", correct: false },
            { text: "npm run start", correct: false }
        ]
    },
    {
        question: "In React.js, what is used for managing component state?",
        answers: [
            { text: "props", correct: false },
            { text: "state", correct: true },
            { text: "setState()", correct: false },
            { text: "this.state()", correct: false }
        ]
    },
    {
        question: "In the MERN stack, what is used for defining the structure of data in MongoDB?",
        answers: [
            { text: "JSON", correct: false },
            { text: "Schema", correct: true },
            { text: "Document", correct: false },
            { text: "Collection", correct: false }
        ]
    },
    {
        question: "Which of the following is a frontend framework/library commonly used with the MERN stack?",
        answers: [
            { text: "AngularJS", correct: false },
            { text: "Vue.js", correct: false },
            { text: "jQuery", correct: false },
            { text: "Ember.js", correct: true }
        ]
    },
    {
        question: "Which npm package is commonly used for interacting with MongoDB in a Node.js application?",
        answers: [
            { text: "mongoose", correct: true },
            { text: "mongo-client", correct: false },
            { text: "mongodb", correct: false },
            { text: "mongoose-client", correct: false }
        ]
    },
    {
        question: "Which npm package is commonly used for creating RESTful APIs in an Express.js application?",
        answers: [
            { text: "express-router", correct: false },
            { text: "express-rest", correct: false },
            { text: "express-api", correct: false },
            { text: "express", correct: true }
        ]
    },
    {
        question: "Which npm package is commonly used for server-side rendering in a React.js application?",
        answers: [
            { text: "react-server", correct: true },
            { text: "react-render", correct: false },
            { text: "react-dom", correct: false },
            { text: "react-ssr", correct: false }
        ]
    },
    {
        question: "Which command is used to install dependencies listed in package.json in a MERN stack project?",
        answers: [
            { text: "npm install", correct: true },
            { text: "npm add", correct: false },
            { text: "npm update", correct: false },
            { text: "npm upgrade", correct: false }
        ]
    },
    {
        question: "Which method is used for making AJAX requests in React.js?",
        answers: [
            { text: "fetch()", correct: true },
            { text: "axios()", correct: false },
            { text: "ajax()", correct: false },
            { text: "request()", correct: false }
        ]
    },
    {
        question: "In the MERN stack, what is used for handling middleware functions in Express.js?",
        answers: [
            { text: "app.use()", correct: true },
            { text: "app.get()", correct: false },
            { text: "app.post()", correct: false },
            { text: "app.listen()", correct: false }
        ]
    },
    {
        question: "Which npm package is commonly used for handling authentication in a MERN stack application?",
        answers: [
            { text: "passport", correct: true },
            { text: "auth", correct: false },
            { text: "jwt", correct: false },
            { text: "auth0", correct: false }
        ]
    },
    {
        question: "Which of the following is true about JSX in React.js?",
        answers: [
            { text: "It stands for JavaScript XML.", correct: true },
            { text: "It's a templating language.", correct: false },
            { text: "It's a separate syntax from JavaScript.", correct: false },
            { text: "It's not supported in React.js.", correct: false }
        ]
    },
    {
        question: "In the MERN stack, what is used for handling routing on the client-side in a React.js application?",
        answers: [
            { text: "React Router", correct: true },
            { text: "Express.js", correct: false },
            { text: "Node.js", correct: false },
            { text: "MongoDB", correct: false }
        ]
    },
    {
        question: "Which of the following is not a valid HTTP response status code?",
        answers: [
            { text: "200 OK", correct: false },
            { text: "404 Not Found", correct: false },
            { text: "503 Service Unavailable", correct: false },
            { text: "300 Redirection", correct: true }
        ]
    },
    {
        question: "Which npm package is commonly used for handling form data in an Express.js application?",
        answers: [
            { text: "body-parser", correct: true },
            { text: "express-form", correct: false },
            { text: "form-handler", correct: false },
            { text: "express-body", correct: false }
        ]
    },
    {
        question: "Which npm package is commonly used for state management in a React.js application?",
        answers: [
            { text: "redux", correct: true },
            { text: "react-state", correct: false },
            { text: "flux", correct: false },
            { text: "context-api", correct: false }
        ]
    },
    {
        question: "In the MERN stack, what is used for interacting with the DOM in a React.js application?",
        answers: [
            { text: "ReactDOM", correct: false },
            { text: "react-dom", correct: true },
            { text: "DOM.js", correct: false },
            { text: "react-renderer", correct: false }
        ]
    },
    {
        question: "Which npm package is commonly used for handling HTTP requests in a Node.js application?",
        answers: [
            { text: "http", correct: false },
            { text: "axios", correct: true },
            { text: "fetch", correct: false },
            { text: "request", correct: false }
        ]
    },
    {
        question: "Which command is used to initialize a new Node.js project with a package.json file?",
        answers: [
            { text: "npm init", correct: true },
            { text: "npm start", correct: false },
            { text: "node init", correct: false },
            { text: "node start", correct: false }
        ]
    },
    {
        question: "Which of the following is not a valid way to define a React component?",
        answers: [
            { text: "Function component", correct: false },
            { text: "Class component", correct: false },
            { text: "Arrow component", correct: true },
            { text: "Higher-order component", correct: false }
        ]
    },
    {
        question: "In the MERN stack, what is used for defining routes in an Express.js application?",
        answers: [
            { text: "app.route()", correct: false },
            { text: "app.get()", correct: false },
            { text: "app.post()", correct: false },
            { text: "app.use()", correct: true }
        ]
    },
    {
        question: "Which npm package is commonly used for handling sessions in an Express.js application?",
        answers: [
            { text: "express-session", correct: true },
            { text: "session-handler", correct: false },
            { text: "express-auth", correct: false },
            { text: "passport-session", correct: false }
        ]
    },
    {
        question: "Which of the following is not a valid HTTP request header?",
        answers: [
            { text: "Content-Type", correct: false },
            { text: "Accept", correct: false },
            { text: "Authorization", correct: false },
            { text: "Request-Type", correct: true }
        ]
    },
    {
        question: "Which npm package is commonly used for validation in an Express.js application?",
        answers: [
            { text: "express-validator", correct: true },
            { text: "validator.js", correct: false },
            { text: "express-validation", correct: false },
            { text: "validation-handler", correct: false }
        ]
    },
    {
        question: "In the MERN stack, what is used for handling events in a React.js application?",
        answers: [
            { text: "React Events", correct: false },
            { text: "DOM Events", correct: false },
            { text: "Event Handlers", correct: false },
            { text: "Synthetic Events", correct: true }
        ]
    },
    {
        question: "Which npm package is commonly used for handling file uploads in an Express.js application?",
        answers: [
            { text: "multer", correct: true },
            { text: "express-file-upload", correct: false },
            { text: "file-uploader", correct: false },
            { text: "express-upload", correct: false }
        ]
    },
    {
        question: "Which of the following is not a valid HTTP response header?",
        answers: [
            { text: "Content-Type", correct: false },
            { text: "Content-Length", correct: false },
            { text: "Status-Code", correct: true },
            { text: "Set-Cookie", correct: false }
        ]
    },
    {
        question: "Which npm package is commonly used for handling cookies in an Express.js application?",
        answers: [
            { text: "cookie-parser", correct: true },
            { text: "express-cookies", correct: false },
            { text: "cookies", correct: false },
            { text: "cookie-handler", correct: false }
        ]
    },
    {
        question: "In the MERN stack, what is used for defining the structure of data in an Express.js application?",
        answers: [
            { text: "JSON", correct: false },
            { text: "Schema", correct: true },
            { text: "Document", correct: false },
            { text: "Collection", correct: false }
        ]
    },
    {
        question: "Which npm package is commonly used for logging in a Node.js application?",
        answers: [
            { text: "winston", correct: true },
            { text: "logger", correct: false },
            { text: "node-log", correct: false },
            { text: "log-handler", correct: false }
        ]
    },
    {
        question: "In the MERN stack, what is used for handling authentication in a React.js application?",
        answers: [
            { text: "React Auth", correct: false },
            { text: "React Authentication", correct: false },
            { text: "Authentication Handlers", correct: false },
            { text: "JWT", correct: true }
        ]
    },
    {
        question: "Which npm package is commonly used for testing in a Node.js application?",
        answers: [
            { text: "mocha", correct: false },
            { text: "jest", correct: true },
            { text: "jasmine", correct: false },
            { text: "chai", correct: false }
        ]
    },
    {
        question: "Which of the following is not a valid HTTP request header method?",
        answers: [
            { text: "GET", correct: false },
            { text: "POST", correct: false },
            { text: "PUT", correct: false },
            { text: "DELETE", correct: true }
        ]
    },
    {
        question: "Which npm package is commonly used for handling dates and times in a Node.js application?",
        answers: [
            { text: "moment", correct: true },
            { text: "time", correct: false },
            { text: "date", correct: false },
            { text: "time-handler", correct: false }
        ]
    },
    {
        question: "In the MERN stack, what is used for handling state in a React.js application?",
        answers: [
            { text: "State Handler", correct: false },
            { text: "React State", correct: false },
            { text: "Redux", correct: true },
            { text: "Context API", correct: false }
        ]
    },
    {
        question: "Which npm package is commonly used for handling environment variables in a Node.js application?",
        answers: [
            { text: "dotenv", correct: true },
            { text: "env-handler", correct: false },
            { text: "config", correct: false },
            { text: "environment", correct: false }
        ]
    },
    {
        question: "In the MERN stack, what is used for defining the structure of data in a React.js application?",
        answers: [
            { text: "JSON", correct: false },
            { text: "Schema", correct: false },
            { text: "Props", correct: false },
            { text: "State", correct: true }
        ]
    },
    {
        question: "Which npm package is commonly used for handling websockets in a Node.js application?",
        answers: [
            { text: "socket.io", correct: true },
            { text: "websocket", correct: false },
            { text: "ws", correct: false },
            { text: "socket-handler", correct: false }
        ]
    },
    {
        question: "In the MERN stack, what is used for handling global state in a React.js application?",
        answers: [
            { text: "State Handler", correct: false },
            { text: "Redux", correct: true },
            { text: "Context API", correct: false },
            { text: "React State", correct: false }
        ]
    },
    {
        question: "Which npm package is commonly used for handling encryption in a Node.js application?",
        answers: [
            { text: "bcrypt", correct: true },
            { text: "encryption", correct: false },
            { text: "crypto", correct: false },
            { text: "security", correct: false }
        ]
    },
    {
        question: "In the MERN stack, what is used for handling animations in a React.js application?",
        answers: [
            { text: "React Animations", correct: false },
            { text: "CSS Animations", correct: false },
            { text: "React Transition Group", correct: true },
            { text: "Animation Handlers", correct: false }
        ]
    },
    {
        question: "Which npm package is commonly used for handling pagination in a Node.js application?",
        answers: [
            { text: "pagination", correct: false },
            { text: "paginate", correct: false },
            { text: "mongoose-paginate", correct: true },
            { text: "express-pagination", correct: false }
        ]
    }
];