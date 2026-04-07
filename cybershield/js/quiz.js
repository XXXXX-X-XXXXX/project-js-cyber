// On attend que la page soit totalement chargée
window.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            const level = document.getElementById('difficulty-select').value;
            console.log("Bouton cliqué ! Niveau choisi :", level);
            startQuiz(level);
        });
    } else {
        console.error("ERREUR : Le bouton start-btn n'a pas été trouvé dans le HTML");
    }
});

// Vérifie aussi que tes données sont bien chargées
if (typeof quizQuestions === 'undefined') {
    console.error("ERREUR : Les questions du quiz (quizQuestions) ne sont pas chargées. Vérifie l'ordre des scripts dans ton HTML.");
}


/* MODULE 5 : Quiz Interactif CyberShield - VERSION FINALE CERTIFIÉE */

let currentQuestions = [];
let currentIndex = 0;
let score = 0;
let timer;
let streak = 0;
let startTime; // Pour calculer la vitesse de réponse
let stats = { phishing: 0, mdp: 0, technique: 0 }; // Pour les recommandations

function startQuiz(difficultySelected) {
    // 1. UTILISATION DE .FILTER() (Contrainte sujet)
    const filtered = difficultySelected === 'tous' 
        ? quizQuestions 
        : quizQuestions.filter(q => q.difficulty === difficultySelected);

    // Mélange et sélection de 10 questions
    currentQuestions = [...filtered].sort(() => 0.5 - Math.random()).slice(0, 10);
    
    currentIndex = 0;
    score = 0;
    streak = 0;
    stats = { phishing: 0, mdp: 0, technique: 0 }; // Reset des stats

    document.getElementById('quiz-setup').style.display = 'none';
    document.getElementById('quiz-game-area').style.display = 'block';
    document.getElementById('quiz-results').style.display = 'none';
    
    showNextQuestion();
}

function showNextQuestion() {
    if (currentIndex >= currentQuestions.length) return endQuiz();

    // 2. UTILISATION DE .FIND() (Contrainte sujet : retrouver la question par ID)
    const currentID = currentQuestions[currentIndex].id;
    const q = quizQuestions.find(item => item.id === currentID);

    const optionsContainer = document.getElementById('quiz-options');
    document.getElementById('quiz-question').innerText = `Question ${currentIndex + 1} : ${q.question}`;
    
    optionsContainer.innerHTML = '';
    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.onclick = () => handleAnswer(index, q);
        optionsContainer.appendChild(btn);
    });

    startTimer(15);
}

function startTimer(seconds) {
    let timeLeft = seconds;
    startTime = Date.now(); // On note l'heure du début
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer-display').innerText = `Temps : ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            handleAnswer(-1, currentQuestions[currentIndex]);
        }
    }, 1000);
}

function handleAnswer(selectedIndex, questionObj) {
    clearInterval(timer);
    const timeTaken = (Date.now() - startTime) / 1000;

    if (selectedIndex === questionObj.correctAnswer) {
        streak++;
        let pointsGain = 10;
        
        // BONUS RAPIDITÉ : +5 pts si répond en moins de 5s
        if (timeTaken < 5) pointsGain += 5;
        
        // SYSTÈME DE STREAK : +50% si 3 bonnes réponses
        if (streak >= 3) pointsGain *= 1.5;
        
        score += pointsGain;
        alert(`Bravo ! ${questionObj.explanation}`);
    } else {
        streak = 0;
        // On note la catégorie échouée pour les recommandations
        if (stats[questionObj.category] !== undefined) stats[questionObj.category]++;
        alert(`Dommage... La réponse était : ${questionObj.options[questionObj.correctAnswer]}\n${questionObj.explanation}`);
    }

    currentIndex++;
    showNextQuestion();
}

function endQuiz() {
    document.getElementById('quiz-game-area').style.display = 'none';
    document.getElementById('quiz-results').style.display = 'block';
    document.getElementById('final-score').innerText = score;

    // GÉNÉRATION DES RECOMMANDATIONS (Basé sur les erreurs)
    const recContainer = document.getElementById('recommendations');
    let recs = [];
    if (score < 50) recs.push("Révisez les bases avec le Module 1 (Mots de passe).");
    if (stats.phishing > 1) recs.push("Attention aux e-mails ! Refaites une passe sur le Module 3.");
    recContainer.innerText = recs.length > 0 ? recs.join(' ') : "Excellent niveau, continuez votre veille !";

    saveAndDisplayScores(score);
}

function saveAndDisplayScores(newScore) {
    // 3. UTILISATION DE JSON.PARSE / STRINGIFY (Contrainte sujet)
    let history = JSON.parse(localStorage.getItem('cyberShieldScores')) || [];
    history.push({ score: newScore, date: new Date().toLocaleTimeString() });

    // 4. UTILISATION DE .SORT() (Contrainte sujet : classer les scores)
    history.sort((a, b) => b.score - a.score);
    history = history.slice(0, 5);

    localStorage.setItem('cyberShieldScores', JSON.stringify(history));

    // 5. UTILISATION DE .MAP() (Contrainte sujet : transformer pour affichage)
    const historyHTML = history.map(s => `<li>${s.date} - ${s.score} pts</li>`).join('');
    document.getElementById('score-history').innerHTML = historyHTML;
}

let isDuel = false;
let currentPlayer = 1;
let scores = { player1: 0, player2: 0 };
let duelTurn = 0; // Pour savoir combien de questions ont été posées au total

function startDuel(difficultySelected) {
    isDuel = true;
    currentPlayer = 1;
    scores = { player1: 0, player2: 0 };
    duelTurn = 0;

    // On filtre et on prend 10 questions (5 chacun)
    const filtered = difficultySelected === 'tous' 
        ? quizQuestions 
        : quizQuestions.filter(q => q.difficulty === difficultySelected);
    
    currentQuestions = [...filtered].sort(() => 0.5 - Math.random()).slice(0, 10);

    document.getElementById('quiz-setup').style.display = 'none';
    document.getElementById('quiz-game-area').style.display = 'block';
    
    updateDuelUI();
    showNextQuestion();
}

function updateDuelUI() {
    const timerDisp = document.getElementById('timer-display');
    timerDisp.innerHTML = `
        <div style="display:flex; justify-content:space-around; width:100%">
            <span style="color: ${currentPlayer === 1 ? 'red' : 'black'}">J1: ${scores.player1} pts</span>
            <span id="countdown">15s</span>
            <span style="color: ${currentPlayer === 2 ? 'blue' : 'black'}">J2: ${scores.player2} pts</span>
        </div>
        <center><h3>Tour du Joueur ${currentPlayer}</h3></center>
    `;
}

// Modifie ta fonction handleAnswer existante pour inclure ceci :
function handleAnswer(selectedIndex, questionObj) {
    clearInterval(timer);
    
    if (selectedIndex === questionObj.correctAnswer) {
        let points = 10; // On simplifie un peu pour le duel
        if (isDuel) {
            if (currentPlayer === 1) scores.player1 += points;
            else scores.player2 += points;
        } else {
            score += points;
        }
    }

    if (isDuel) {
        // Alterne le joueur
        currentPlayer = (currentPlayer === 1) ? 2 : 1;
        currentIndex++;
        if (currentIndex < currentQuestions.length) {
            updateDuelUI();
            showNextQuestion();
        } else {
            endDuel();
        }
    } else {
        currentIndex++;
        showNextQuestion();
    }
}

function endDuel() {
    document.getElementById('quiz-game-area').style.display = 'none';
    document.getElementById('quiz-results').style.display = 'block';
    
    let winnerText = "";
    if (scores.player1 > scores.player2) winnerText = "🏆 Victoire du Joueur 1 !";
    else if (scores.player2 > scores.player1) winnerText = "🏆 Victoire du Joueur 2 !";
    else winnerText = "🤝 Égalité !";

    document.getElementById('final-score').innerHTML = `
        ${winnerText} <br>
        Score J1 : ${scores.player1} | Score J2 : ${scores.player2}
    `;
}