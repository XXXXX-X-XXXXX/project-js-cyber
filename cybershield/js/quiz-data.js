/* FICHIER : js/quiz-data.js
   CONTENU : Base de données des 25 questions pour le Module 5
*/

const quizQuestions = [
    // --- NIVEAU FACILE (10 questions) ---
    {
        id: 1,
        question: "Que signifie le 'S' dans HTTPS ?",
        options: ["Système", "Sécurisé", "Standard"],
        correctAnswer: 1,
        difficulty: "facile",
        explanation: "Le S signifie 'Secure'. Il indique que la connexion entre votre navigateur et le serveur est chiffrée."
    },
    {
        id: 2,
        question: "Un mot de passe robuste doit idéalement contenir :",
        options: ["Seulement des lettres", "Votre date de naissance", "Majuscules, minuscules, chiffres et symboles"],
        correctAnswer: 2,
        difficulty: "facile",
        explanation: "La complexité et la variété des caractères rendent le mot de passe plus difficile à deviner par brute-force."
    },
    {
        id: 3,
        question: "Si vous recevez un email suspect d'une banque vous demandant votre code, que faites-vous ?",
        options: ["Je réponds poliment", "Je clique sur le lien pour voir", "Je le supprime ou je le signale"],
        correctAnswer: 2,
        difficulty: "facile",
        explanation: "Une banque ne demandera jamais vos codes confidentiels par email."
    },
    {
        id: 4,
        question: "Le 'Phishing' (Hameçonnage) se transmet principalement par :",
        options: ["La poste", "Email ou SMS", "Le téléphone fixe uniquement"],
        correctAnswer: 1,
        difficulty: "facile",
        explanation: "Le phishing utilise principalement des moyens numériques pour tromper les victimes."
    },
    {
        id: 5,
        question: "Verrouiller sa session d'ordinateur en partant en pause est :",
        options: ["Inutile au bureau", "Obligatoire pour la sécurité", "Uniquement pour les chefs"],
        correctAnswer: 1,
        difficulty: "facile",
        explanation: "Cela empêche une personne physique d'accéder à vos données en votre absence."
    },
    {
        id: 6,
        question: "Un antivirus sert principalement à :",
        options: ["Nettoyer l'écran", "Détecter et bloquer des logiciels malveillants", "Accélérer internet"],
        correctAnswer: 1,
        difficulty: "facile",
        explanation: "L'antivirus analyse les fichiers pour trouver des signatures de virus connus."
    },
    {
        id: 7,
        question: "Le RGPD concerne la protection de quoi ?",
        options: ["Des ordinateurs", "Des données personnelles", "Des logiciels piratés"],
        correctAnswer: 1,
        difficulty: "facile",
        explanation: "Le Règlement Général sur la Protection des Données protège la vie privée des citoyens européens."
    },
    {
        id: 8,
        question: "Quelle est la meilleure façon de gérer ses nombreux mots de passe ?",
        options: ["Un post-it sur l'écran", "Utiliser le même partout", "Utiliser un gestionnaire de mots de passe"],
        correctAnswer: 2,
        difficulty: "facile",
        explanation: "Un gestionnaire permet de stocker des mots de passe complexes de façon sécurisée."
    },
    {
        id: 9,
        question: "Que risque-t-on en se connectant à un Wi-Fi public ouvert ?",
        options: ["Rien, c'est gratuit", "L'interception de ses données", "Une amende"],
        correctAnswer: 1,
        difficulty: "facile",
        explanation: "Les Wi-Fi publics peuvent être espionnés par des pirates connectés au même réseau."
    },
    {
        id: 10,
        question: "Qu'est-ce qu'une mise à jour logicielle ?",
        options: ["Une publicité", "Une correction de bugs et de failles de sécurité", "Un nouveau fond d'écran"],
        correctAnswer: 1,
        difficulty: "facile",
        explanation: "Les mises à jour corrigent souvent des failles critiques exploitées par les hackers."
    },

    // --- NIVEAU MOYEN (10 questions) ---
    {
        id: 11,
        question: "Qu'est-ce que l'authentification à deux facteurs (2FA) ?",
        options: ["Taper son mot de passe deux fois", "Combiner deux preuves d'identité (ex: MDP + SMS)", "Avoir deux comptes différents"],
        correctAnswer: 1,
        difficulty: "moyen",
        explanation: "Le 2FA ajoute une couche de sécurité : même avec votre MDP, le pirate ne peut pas entrer sans le 2ème code."
    },
    {
        id: 12,
        question: "Un Ransomware (Rançongiciel) a pour but de :",
        options: ["Afficher des pubs", "Chiffrer vos fichiers et demander de l'argent", "Espionner votre webcam"],
        correctAnswer: 1,
        difficulty: "moyen",
        explanation: "Il prend vos données en otage en échange d'une rançon, souvent en Bitcoin."
    },
    {
        id: 13,
        question: "En cryptographie, qu'est-ce qu'une 'Clé' ?",
        options: ["Un mot de passe physique", "Un paramètre utilisé pour chiffrer ou déchiffrer", "L'adresse du serveur"],
        correctAnswer: 1,
        difficulty: "moyen",
        explanation: "La clé est l'élément mathématique qui permet de transformer le texte clair en texte chiffré."
    },
    {
        id: 14,
        question: "Qu'est-ce que le 'Smishing' ?",
        options: ["Du phishing par SMS", "Un virus sur smartphone", "Une attaque par Bluetooth"],
        correctAnswer: 0,
        difficulty: "moyen",
        explanation: "C'est la contraction de SMS et Phishing."
    },
    {
        id: 15,
        question: "Pourquoi ne faut-il pas brancher une clé USB trouvée dans la rue ?",
        options: ["Elle peut être cassée", "Elle peut contenir un cheval de Troie", "C'est illégal"],
        correctAnswer: 1,
        difficulty: "moyen",
        explanation: "Une clé USB peut exécuter des scripts malveillants dès qu'elle est insérée."
    },
    {
        id: 16,
        question: "Le chiffrement de César est un chiffrement par :",
        options: ["Blocs", "Substitution", "Asymétrie"],
        correctAnswer: 1,
        difficulty: "moyen",
        explanation: "On remplace chaque lettre par une autre située plus loin dans l'alphabet."
    },
    {
        id: 17,
        question: "Que vérifie-t-on en premier sur un certificat SSL ?",
        options: ["La couleur", "L'autorité de certification et la date de validité", "Le prix"],
        correctAnswer: 1,
        difficulty: "moyen",
        explanation: "Un certificat invalide ou expiré signifie que la connexion n'est plus garantie sécurisée."
    },
    {
        id: 18,
        question: "Dans une entreprise, qui est responsable de la sécurité ?",
        options: ["Uniquement le service informatique", "Le patron", "Tous les employés"],
        correctAnswer: 2,
        difficulty: "moyen",
        explanation: "La sécurité est l'affaire de tous ; une seule erreur humaine peut compromettre tout le réseau."
    },
    {
        id: 19,
        question: "Quel protocole est le plus sécurisé pour le Wi-Fi ?",
        options: ["WEP", "WPA3", "WPA"],
        correctAnswer: 1,
        difficulty: "moyen",
        explanation: "WPA3 est la norme la plus récente et la plus robuste contre les attaques actuelles."
    },
    {
        id: 20,
        question: "Qu'est-ce qu'un 'Keylogger' ?",
        options: ["Un logiciel qui enregistre les touches du clavier", "Un gestionnaire de clés", "Un mot de passe très long"],
        correctAnswer: 0,
        difficulty: "moyen",
        explanation: "C'est un espion qui vole tout ce que vous tapez, y compris vos identifiants."
    },

    // --- NIVEAU DIFFICILE (5 questions) ---
    {
        id: 21,
        question: "Quelle est la principale différence entre chiffrement symétrique et asymétrique ?",
        options: ["La vitesse", "Le nombre de clés (1 seule vs une paire publique/privée)", "La taille du texte"],
        correctAnswer: 1,
        difficulty: "difficile",
        explanation: "L'asymétrique utilise une clé publique pour chiffrer et une clé privée pour déchiffrer."
    },
    {
        id: 22,
        question: "Qu'est-ce qu'une attaque 'Man-in-the-Middle' (MITM) ?",
        options: ["Un virus sur serveur", "Une interception de communication entre deux parties", "Une attaque par déni de service"],
        correctAnswer: 1,
        difficulty: "difficile",
        explanation: "L'attaquant s'insère au milieu de la conversation pour lire ou modifier les messages."
    },
    {
        id: 23,
        question: "Que signifie le principe du 'Moindre Privilège' ?",
        options: ["Donner peu de salaire", "Donner uniquement les accès nécessaires à un utilisateur", "Interdire l'usage d'internet"],
        correctAnswer: 1,
        difficulty: "difficile",
        explanation: "Cela limite les dégâts si un compte utilisateur est compromis."
    },
    {
        id: 24,
        question: "Dans le cadre de l'OWASP, qu'est-ce qu'une 'Injection SQL' ?",
        options: ["Un virus par email", "L'insertion de code malveillant dans une requête de base de données", "Un bug d'affichage"],
        correctAnswer: 1,
        difficulty: "difficile",
        explanation: "Cela permet à un attaquant de lire ou supprimer des données dans la base de données du site."
    },
    {
        id: 25,
        question: "Qu'est-ce qu'un 'Zero-Day' ?",
        options: ["Un virus qui dure 24h", "Une faille de sécurité non encore découverte par l'éditeur", "Le premier jour d'un hackathon"],
        correctAnswer: 1,
        difficulty: "difficile",
        explanation: "C'est une faille critique pour laquelle il n'existe pas encore de correctif."
    }
]