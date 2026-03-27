/* MODULE 5 : Quiz Interactif CyberShield
   Ce fichier gère la logique du jeu, le score et le timer.
*/

let currentQuestions = []; // Tableau des questions filtrées pour la partie
let currentIndex = 0;      // Index de la question en cours
let score = 0;             // Score actuel
let timer;                 // Référence du setInterval pour le temps
const TIME_PER_QUESTION = 15; // Secondes autorisées par question

// 1. DÉMARRER LE QUIZ
function startQuiz(difficultySelected) {
    // UTILISATION DE .FILTER() : On ne garde que les questions du niveau choisi
    // Si 'tous' est sélectionné, on prend tout le tableau
    const filtered = difficultySelected === 'tous' 
        ? quizQuestions 
        : quizQuestions.filter(q => q.difficulty === difficultySelected);

    // Mélange aléatoire et sélection de 10 questions pour ne pas que ce soit trop long
    currentQuestions = filtered.sort(() => 0.5 - Math.random()).slice(0, 10);
    
    currentIndex = 0;
    score = 0;
    
    document.getElementById('quiz-results').style.display = 'none';
    document.getElementById('quiz-game-area').style.display = 'block';
    
    showNextQuestion();
}

// 2. AFFICHER UNE QUESTION
function showNextQuestion() {
    if (currentIndex >= currentQuestions.length) {
        return endQuiz();
    }

    const q = currentQuestions[currentIndex];
    const questionText = document.getElementById('quiz-question');
    const optionsContainer = document.getElementById('quiz-options');
    const timerDisplay = document.getElementById('timer-display');

    // Affichage du texte
    questionText.innerText = `Question ${currentIndex + 1}/10 : ${q.question}`;
    
    // Génération des boutons de réponse
    optionsContainer.innerHTML = '';
    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.className = 'quiz-btn';
        btn.onclick = () => handleAnswer(index);
        optionsContainer.appendChild(btn);
    });

    // Lancement du Timer
    let timeLeft = TIME_PER_QUESTION;
    timerDisplay.innerText = `Temps restant : ${timeLeft}s`;
    timerDisplay.style.color = "black";
    
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = `Temps restant : ${timeLeft}s`;
        if (timeLeft <= 5) timerDisplay.style.color = "red";
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            handleAnswer(-1); // -1 signifie "temps écoulé"
        }
    }, 1000);
}

// 3. VÉRIFIER LA RÉPONSE
function handleAnswer(selectedIndex) {
    clearInterval(timer);
    const q = currentQuestions[currentIndex];

    if (selectedIndex === q.correctAnswer) {
        score += 10;
        // Optionnel : ajouter un feedback visuel vert
    } else {
        // Optionnel : ajouter un feedback visuel rouge
    }

    currentIndex++;
    showNextQuestion();
}

// 4. FIN DU QUIZ ET SAUVEGARDE (LocalStorage)
function endQuiz() {
    document.getElementById('quiz-game-area').style.display = 'none';
    document.getElementById('quiz-results').style.display = 'block';
    document.getElementById('final-score').innerText = score;

    saveScore(score);
}

function saveScore(newScore) {
    // Récupérer les anciens scores ou un tableau vide
    let history = JSON.parse(localStorage.getItem('cyberShieldScores')) || [];
    
    // Ajouter le nouveau score avec la date
    history.push({ score: newScore, date: new Date().toLocaleDateString() });
    
    // Trier par score décroissant et ne garder que le TOP 5
    history.sort((a, b) => b.score - a.score);
    history = history.slice(0, 5);
    
    // Sauvegarder dans le navigateur
    localStorage.setItem('cyberShieldScores', JSON.stringify(history));
    displayHistory();
}

function displayHistory() {
    const historyList = document.getElementById('score-history');
    const history = JSON.parse(localStorage.getItem('cyberShieldScores')) || [];
    
    historyList.innerHTML = history.map(s => `<li>${s.date} : ${s.score} pts</li>`).join('');
}