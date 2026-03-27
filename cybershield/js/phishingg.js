/* MODULE 3 : Détecteur de Phishing
*/

const phishingRules = {
    urgency: ['urgent', 'immédiatement', 'action requise', 'suspension', 'définitivement', 'huissier'],
    financialBait: ['remboursement', 'trop-perçu', 'facture impayée', 'gagné', 'chèque'],
    securityMimicry: ['connexion sécurisée', 'vérifier votre identité', 'double authentification', 'activite inhabituelle'],
    dangerousTLDs: ['.tk', '.ml', '.ga', '.cf', '.gq', '.xyz', '.zip', '.click'],
    suspiciousDomains: ['paypal-security.com', 'amazon-france.net', 'netflix-log.in', 'ameli-virement.fr'],
    legitimateDomains: ['@impots.gouv.fr', '@pole-emploi.fr', '@ameli.fr', '@caf.fr']
};

function analyzeEmail(emailObject) {
    let score = 0;
    let reasons = [];
    
    const subject = (emailObject.subject || "").toLowerCase();
    const body = (emailObject.body || "").toLowerCase();
    const fullText = subject + " " + body;
    const sender = (emailObject.sender || "").toLowerCase();

    // 1. .some() -> Urgence ou Argent
    if ([...phishingRules.urgency, ...phishingRules.financialBait].some(word => fullText.includes(word))) {
        score += 25;
        reasons.push("Contenu incitatif (urgence ou appât financier).");
    }

    // 2. .filter() -> Termes de sécurité suspects
    const securityFlags = phishingRules.securityMimicry.filter(term => fullText.includes(term));
    if (securityFlags.length > 0) {
        score += (securityFlags.length * 15);
        reasons.push(`${securityFlags.length} terme(s) de mimétisme de sécurité détecté(s).`);
    }

    // 3. .find() -> Domaines sur liste noire
    const badDomain = phishingRules.suspiciousDomains.find(domain => sender.includes(domain));
    if (badDomain) {
        score += 50;
        reasons.push(`ALERTE : L'expéditeur imite le domaine : ${badDomain}.`);
    }

    // 4. .every() -> Vérification de la propreté de l'extension 
    // On vérifie que TOUTES les extensions dangereuses sont ABSENTES de l'adresse de l'expéditeur
    const isCleanExtension = phishingRules.dangerousTLDs.every(tld => !sender.endsWith(tld));
    if (!isCleanExtension) {
        score += 20;
        reasons.push("L'extension du domaine (.tk, .xyz, etc.) est statistiquement liée à des fraudes.");
    }

    // 5. Bonus cohérence (Utilisation de .some pour croiser les infos)
    const mentionsOfficial = ["impot", "ameli", "caf"].some(org => fullText.includes(org));
    const isFromOfficial = phishingRules.legitimateDomains.some(legit => sender.includes(legit));
    if (mentionsOfficial && !isFromOfficial) {
        score += 30;
        reasons.push("Incohérence : Le mail parle d'un organisme officiel mais l'expéditeur n'est pas certifié.");
    }

    score = Math.min(score, 100);
    return { score, reasons };
}

// --- GESTION DU DOM (L'interaction avec ton bouton) ---
document.getElementById('btn-analyze-phishing').addEventListener('click', () => {
    const emailData = {
        sender: document.getElementById('email-sender').value,
        subject: document.getElementById('email-subject').value,
        body: document.getElementById('email-body').value
    };

    const result = analyzeEmail(emailData);

    // Mise à jour visuelle
    const scoreDisplay = document.getElementById('phishing-score-display');
    const scoreBar = document.getElementById('phishing-score-bar');
    
    scoreDisplay.innerText = result.score;
    scoreBar.style.width = result.score + "%";

    // Couleurs
    if (result.score < 30) scoreBar.style.backgroundColor = "green";
    else if (result.score < 70) scoreBar.style.backgroundColor = "orange";
    else scoreBar.style.backgroundColor = "red";

    // Liste des raisons
    const list = document.getElementById('phishing-reasons-list');
    list.innerHTML = ""; 
    if (result.reasons.length === 0) {
        list.innerHTML = "<li>Aucun indicateur de phishing détecté.</li>";
    } else {
        result.reasons.forEach(reason => {
            const li = document.createElement('li');
            li.innerText = reason;
            list.appendChild(li);
        });
    }
});