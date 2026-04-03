# 🔐 CyberShield - Projet JavaScript Cybersécurité

Bienvenue dans CyberShield, une application web pédagogique de sensibilisation à la cybersécurité.

## 📁 Structure du Projet

```
cybershield/
├── index.html              ← Page d'accueil avec navigation
├── password.html           ← Module 1: Analyseur de mot de passe
├── cipher.html             ← Module 2: Chiffrement César & Vigenère
├── phishing.html           ← Module 3: Détecteur de Phishing (placeholder)
├── dashboard.html          ← Module 4: Dashboard de veille (placeholder)
├── quiz.html               ← Module 5: Quiz interactif (placeholder)
├── style.css               ← Feuille de styles globale
└── js/
    ├── password.js         ← Logique du module password
    ├── cipher.js           ← Logique du chiffrement (César & Vigenère)
    ├── cipher-dom.js       ← Gestion des interactions DOM du chiffrement
    ├── app.js              ← Point d'entrée général (à développer)
    ├── phishing.js         ← À développer
    ├── dashboard.js        ← À développer
    └── quiz.js             ← À développer
```

## 🚀 Démarrage du Serveur Local

Le serveur est déjà lancé sur **http://localhost:8000**

### Si vous avez besoin de relancer le serveur :

Depuis le répertoire `cybershield/` :

```bash
python -m http.server 8000
```

Puis accédez à : **http://localhost:8000**

## 🎯 Modules Implémentés

### ✅ Module 1 : Analyseur de Mot de Passe
- Calcul du score en temps réel (max 125 points)
- Préview des critères de robustesse
- Calcul de l'entropie (en bits)
- Vérification contre une liste noire de 20 mots de passe courants
- Barre de progression colorée (rouge → orange → vert)

**Fichiers**: `password.html` + `password.js`

### ✅ Module 2 : Chiffrement César & Vigenère
- **César**: Chiffrement/déchiffrement avec décalage configurable (1-25)
- **Force brute**: Essai automatique des 25 décalages
- **Vigenère**: Chiffrement/déchiffrement avec clé variable
- Interface avec onglets pour passer d'une méthode à l'autre

**Fichiers**: `cipher.html` + `cipher.js` + `cipher-dom.js`

## 🎨 Design & Responsive

- Interface moderne avec gradient purple/violet
- Entièrement responsive (mobile, tablette, bureau)
- Animations fluides et transitions
- Navigation par boutons entre les modules
- Retour à l'accueil depuis chaque page

## 🔧 Technologies Utilisées

- **HTML5** : Structure sémantique
- **CSS3** : Styles modernes avec flexbox et grid
- **JavaScript vanilla** : Logique métier pure (pas de framework)
- **Python** : Serveur HTTP local pour développement

## 📝 Notes de Développement

- Chaque module est une **page HTML indépendante**
- Les fichiers JS sont séparés par fonctionnalité
- Le DOM est mis à jour en temps réel (pas de rechargement de page)
- Les données peuvent être persistées en localStorage si nécessaire

## 👤 Auteur

Projet développé pour le cursus 1ère année informatique - Cybersécurité

---

**🎓 Bon développement !**
