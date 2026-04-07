// ===== GESTION DES ONGLETS =====
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', function() {
        const tabName = this.getAttribute('data-tab');
        
        // Retirer la classe active de tous les boutons et contenus
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Ajouter la classe active au bouton et contenu cliqué
        this.classList.add('active');
        document.getElementById(tabName + '-tab').classList.add('active');
    });
});

// ===== CAESAR ENCRYPT/DECRYPT =====
const caesarMessageInput = document.getElementById('caesar-message');
const caesarShiftInput = document.getElementById('caesar-shift');
const caesarEncryptBtn = document.getElementById('caesar-encrypt-btn');
const caesarDecryptBtn = document.getElementById('caesar-decrypt-btn');
const caesarOutput = document.getElementById('caesar-output');
const caesarBruteforceBtn = document.getElementById('caesar-bruteforce-btn');
const caesarBruteforceResults = document.getElementById('caesar-bruteforce-results');

caesarEncryptBtn.addEventListener('click', function() {
    const message = caesarMessageInput.value;
    const shift = parseInt(caesarShiftInput.value);
    
    if (message === '') {
        caesarOutput.textContent = 'Veuillez entrer un message';
        return;
    }
    
    const result = ceaserEncrypt(message, shift);
    caesarOutput.textContent = result;
});

caesarDecryptBtn.addEventListener('click', function() {
    const message = caesarMessageInput.value;
    const shift = parseInt(caesarShiftInput.value);
    
    if (message === '') {
        caesarOutput.textContent = 'Veuillez entrer un message';
        return;
    }
    
    const result = ceaserDecrypt(message, shift);
    caesarOutput.textContent = result;
});

caesarBruteforceBtn.addEventListener('click', function() {
    const message = caesarMessageInput.value;
    
    if (message === '') {
        caesarBruteforceResults.innerHTML = '<p style="color: red;">Veuillez entrer un message</p>';
        return;
    }
    
    caesarBruteforceResults.innerHTML = '';
    
    for (let shift = 1; shift <= 25; shift++) {
        const result = ceaserDecrypt(message, shift);
        const resultElement = document.createElement('div');
        resultElement.className = 'bruteforce-item';
        resultElement.innerHTML = `<strong>Décalage ${shift}:</strong><code>${result}</code>`;
        caesarBruteforceResults.appendChild(resultElement);
    }
});

// ===== VIGENERE ENCRYPT/DECRYPT =====
const vigenereMessageInput = document.getElementById('vigenere-message');
const vigenereKeyInput = document.getElementById('vigenere-key');
const vigenereEncryptBtn = document.getElementById('vigenere-encrypt-btn');
const vigenereDecryptBtn = document.getElementById('vigenere-decrypt-btn');
const vigenereOutput = document.getElementById('vigenere-output');

vigenereEncryptBtn.addEventListener('click', function() {
    const message = vigenereMessageInput.value;
    const key = vigenereKeyInput.value;
    
    if (message === '' || key === '') {
        vigenereOutput.textContent = 'Veuillez entrer un message et une clé';
        return;
    }
    
    const result = vigenereEncrypt(message, key);
    vigenereOutput.textContent = result;
});

vigenereDecryptBtn.addEventListener('click', function() {
    const message = vigenereMessageInput.value;
    const key = vigenereKeyInput.value;
    
    if (message === '' || key === '') {
        vigenereOutput.textContent = 'Veuillez entrer un message et une clé';
        return;
    }
    
    const result = vigenereDecrypt(message, key);
    vigenereOutput.textContent = result;
});
