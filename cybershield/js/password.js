const blacklistedPasswords = [
    "123456", "password", "123456789", "12345", "12345678", 
    "qwerty", "1234567", "azerty", "123123", "motdepasse", 
    "admin", "iloveyou", "doudou", "soleil", "chouchou", 
    "marseille", "bonjour", "qwertyuiop", "1234", "password123"
];

function analyzePassword(password) {
    let hasLowercase = false;
    let hasUppercase = false;
    let hasNumber = false;
    let hasSymbol = false;
    let score = 0;
    
    // --- 1. VÉRIFICATION LISTE NOIRE & LONGUEUR ---
    const isNotInBlacklist = !blacklistedPasswords.includes(password.toLowerCase());
    if (isNotInBlacklist && password.length > 0) {
        score += 20; 
    }

    if (password.length > 8) {
        score += (password.length - 8) * 2;
    }

    // --- 2. ANALYSE DES CARACTÈRES (Boucle for...of imposée) ---
    for (const char of password) {
        if (char >= 'a' && char <= 'z') {
            hasLowercase = true;
        } else if (char >= 'A' && char <= 'Z') {
            hasUppercase = true;
        } else if (char >= '0' && char <= '9') {
            hasNumber = true;
        } else if (char !== ' ') {
            hasSymbol = true;
        }
    }

    if (hasUppercase) score += 15;
    if (hasNumber) score += 15;
    if (hasSymbol) score += 20;

    // --- 3. CALCUL DU BONUS : L'ENTROPIE ---
    let R = 0; // Taille de l'alphabet (pool de caractères)
    if (hasLowercase) R += 26;
    if (hasUppercase) R += 26;
    if (hasNumber) R += 10;
    if (hasSymbol) R += 32;

    // E = L * log2(R)
    let entropy = 0;
    if (password.length > 0 && R > 0) {
        entropy = password.length * Math.log2(R);
    }

    // --- 4. RETOUR DE L'OBJET COMPLET ---
    return {
        score: score,
        entropy: Math.round(entropy), // On arrondit pour avoir un affichage propre en bits
        length: password.length,
        isLongEnough: password.length > 8,
        hasUppercase: hasUppercase,
        hasNumber: hasNumber,
        hasSymbol: hasSymbol,
        isNotInBlacklist: isNotInBlacklist
    };
}

// --- 5. INTERACTION AVEC LE DOM ---

// Récupération des éléments de l'interface
const passwordInput = document.getElementById('password-input');
const progressBar = document.getElementById('password-progress');
const scoreDisplay = document.getElementById('score-display');
const entropyDisplay = document.getElementById('entropy-display');

// Récupération des éléments de la liste des critères
const critLength = document.getElementById('crit-length');
const critUppercase = document.getElementById('crit-uppercase');
const critNumber = document.getElementById('crit-number');
const critSymbol = document.getElementById('crit-symbol');
const critBlacklist = document.getElementById('crit-blacklist');

// Écouteur d'événement : se déclenche à chaque frappe
passwordInput.addEventListener('input', function(event) {
    const currentPassword = event.target.value;
    
    // 1. On lance l'analyse
    const analysis = analyzePassword(currentPassword);

    // 2. Mise à jour des textes (Score et Entropie)
    scoreDisplay.textContent = analysis.score;
    entropyDisplay.textContent = analysis.entropy;

    // 3. Mise à jour de la barre de progression (largeur max à 100%)
    let progressWidth = analysis.score;
    if (progressWidth > 100) progressWidth = 100;
    progressBar.style.width = progressWidth + '%';

    // 4. Gestion des couleurs de la barre (rouge -> orange -> vert)
    // On retire d'abord toutes les couleurs
    progressBar.classList.remove('bg-red', 'bg-orange', 'bg-green');
    
    // On applique la bonne couleur selon le score
    if (currentPassword.length === 0) {
        progressBar.style.width = '0%';
    } else if (analysis.score < 40) {
        progressBar.classList.add('bg-red');
    } else if (analysis.score < 80) {
        progressBar.classList.add('bg-orange');
    } else {
        progressBar.classList.add('bg-green');
    }

    // 5. Mise à jour visuelle des critères (ajout/retrait de la classe 'valid')
    // classList.toggle(classe, condition) ajoute la classe si la condition est vraie, l'enlève sinon
    critLength.classList.toggle('valid', analysis.isLongEnough);
    critUppercase.classList.toggle('valid', analysis.hasUppercase);
    critNumber.classList.toggle('valid', analysis.hasNumber);
    critSymbol.classList.toggle('valid', analysis.hasSymbol);
    critBlacklist.classList.toggle('valid', analysis.isNotInBlacklist && currentPassword.length > 0);
});