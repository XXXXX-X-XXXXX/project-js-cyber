/**
 * MODULE 1 : ANALYSEUR DE MOT DE PASSE
 * Entreprise : SecureNova - Projet CyberShield [cite: 11, 12]
 */

// 1. Liste noire des 20 mots de passe les plus courants [cite: 52]
const blacklistedPasswords = [
    "123456", "password", "123456789", "12345", "12345678", 
    "qwerty", "1234567", "azerty", "123123", "motdepasse", 
    "admin", "iloveyou", "doudou", "soleil", "chouchou", 
    "marseille", "bonjour", "qwertyuiop", "1234", "password123"
];

// 2. Fonction d'analyse principale [cite: 48]
function analyzePassword(password) {
    let hasLowercase = false;
    let hasUppercase = false;
    let hasNumber = false;
    let hasSymbol = false;
    let score = 0;
    
    // --- VÉRIFICATION LISTE NOIRE & LONGUEUR ---
    const isNotInBlacklist = !blacklistedPasswords.includes(password.toLowerCase());
    if (isNotInBlacklist && password.length > 0) {
        score += 20; // +20 pts si pas dans la liste noire [cite: 53]
    }

    if (password.length > 8) {
        score += (password.length - 8) * 2; // +2 pts par caractère > 8 [cite: 53]
    }

    // --- ANALYSE DES CARACTÈRES (Boucle for...of obligatoire) [cite: 51] ---
    for (const char of password) {
        if (char >= 'a' && char <= 'z') {
            hasLowercase = true;
        } else if (char >= 'A' && char <= 'Z') {
            hasUppercase = true;
        } else if (char >= '0' && char <= '9') {
            hasNumber = true;
        } else if (char !== ' ') {
            hasSymbol = true; // On considère tout ce qui n'est pas alphanumérique ou espace comme symbole
        }
    }

    // Ajout des points par critère [cite: 53]
    if (hasUppercase) score += 15;
    if (hasNumber) score += 15;
    if (hasSymbol) score += 20;

    // --- CALCUL DU BONUS : L'ENTROPIE (E = L * log2(R)) [cite: 57] ---
    let R = 0; // Taille de l'alphabet utilisé
    if (hasLowercase) R += 26;
    if (hasUppercase) R += 26;
    if (hasNumber) R += 10;
    if (hasSymbol) R += 32;

    let entropy = 0;
    if (password.length > 0 && R > 0) {
        entropy = password.length * Math.log2(R);
    }

    // Retour de l'objet de résultats [cite: 49]
    return {
        score: score,
        entropy: Math.round(entropy),
        length: password.length,
        isLongEnough: password.length > 8,
        hasUppercase: hasUppercase,
        hasNumber: hasNumber,
        hasSymbol: hasSymbol,
        isNotInBlacklist: isNotInBlacklist
    };
}

// 3. INTERACTION AVEC LE DOM [cite: 29]

// Sélecteurs
const passwordInput = document.getElementById('password-input');
const progressBar = document.getElementById('password-progress');
const scoreDisplay = document.getElementById('score-display');
const entropyDisplay = document.getElementById('entropy-display');

// Critères visuels
const critLength = document.getElementById('crit-length');
const critUppercase = document.getElementById('crit-uppercase');
const critNumber = document.getElementById('crit-number');
const critSymbol = document.getElementById('crit-symbol');
const critBlacklist = document.getElementById('crit-blacklist');

// Éléments pour le toggle de visibilité
const togglePasswordBtn = document.getElementById('toggle-password');
const iconEyeOpen = document.getElementById('icon-eye-open');
const iconEyeClosed = document.getElementById('icon-eye-closed');

// Mise à jour en temps réel à chaque frappe [cite: 53]
passwordInput.addEventListener('input', function(event) {
    const currentPassword = event.target.value;
    const analysis = analyzePassword(currentPassword);

    // Affichage des valeurs textuelles
    scoreDisplay.textContent = analysis.score;
    entropyDisplay.textContent = analysis.entropy;

    // Gestion de la barre de progression [cite: 54, 56]
    let progressWidth = Math.min(analysis.score, 100);
    progressBar.style.width = progressWidth + '%';

    // Couleurs de la barre (rouge -> orange -> vert) [cite: 54, 56]
    progressBar.classList.remove('bg-red', 'bg-orange', 'bg-green');
    if (currentPassword.length > 0) {
        if (analysis.score < 40) {
            progressBar.classList.add('bg-red');
        } else if (analysis.score < 80) {
            progressBar.classList.add('bg-orange');
        } else {
            progressBar.classList.add('bg-green');
        }
    }

    // Mise à jour de la liste des critères (classe .valid)
    critLength.classList.toggle('valid', analysis.isLongEnough);
    critUppercase.classList.toggle('valid', analysis.hasUppercase);
    critNumber.classList.toggle('valid', analysis.hasNumber);
    critSymbol.classList.toggle('valid', analysis.hasSymbol);
    critBlacklist.classList.toggle('valid', analysis.isNotInBlacklist && currentPassword.length > 0);
});

// 4. FONCTIONNALITÉ AFFICHER/MASQUER AVEC SVG
togglePasswordBtn.addEventListener('click', function() {
    const isPassword = passwordInput.getAttribute('type') === 'password';
    
    // On alterne le type entre 'text' et 'password'
    passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
    
    // On alterne la visibilité des deux icônes SVG
    iconEyeOpen.classList.toggle('hidden');
    iconEyeClosed.classList.toggle('hidden');
});