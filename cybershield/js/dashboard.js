/**
 * MODULE 4 : DASHBOARD DE VEILLE EN CYBERSÉCURITÉ (AVEC BONUS LOCALSTORAGE)
 */

const API_KEY = 'bf479596962749e3a86c60b389ecea7c';
const API_URL = `https://newsapi.org/v2/everything?q=cybersecurity&sortBy=publishedAt&pageSize=10&apiKey=${API_KEY}`;

const newsContainer = document.getElementById('news-container');
const alertBadge = document.getElementById('alert-badge');
const categoryFilter = document.getElementById('filter-category');
const searchInput = document.getElementById('search-news');

let allArticles = [];

// --- 1. FONCTION ASYNCHRONE & GESTION DU LOCALSTORAGE ---
async function fetchCyberNews() {
    try {
        newsContainer.innerHTML = '<p>Chargement des actualités en cours...</p>';
        
        // BONUS : On récupère la date de dernière visite avant de faire l'appel
        const lastVisitStr = localStorage.getItem('cyberShield_lastVisit');
        const lastVisitDate = lastVisitStr ? new Date(lastVisitStr) : null;

        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);

        const data = await response.json();
        allArticles = data.articles; 

        // BONUS : On sauvegarde les articles hors ligne (au cas où l'API tombe plus tard)
        localStorage.setItem('cyberShield_articlesCache', JSON.stringify(allArticles));
        
        // BONUS : On met à jour la date de visite MAINTENANT pour la prochaine fois
        localStorage.setItem('cyberShield_lastVisit', new Date().toISOString());

        calculateAlertLevel(allArticles);
        populateCategories(allArticles);
        
        // On passe la date de dernière visite à la fonction d'affichage
        displayNews(allArticles, lastVisitDate);

    } catch (error) {
        console.error("Erreur API:", error);
        
        // BONUS : Mode hors ligne ! Si l'API échoue, on tente de charger le cache
        const cachedArticles = JSON.parse(localStorage.getItem('cyberShield_articlesCache'));
        if (cachedArticles) {
            allArticles = cachedArticles;
            calculateAlertLevel(allArticles);
            populateCategories(allArticles);
            displayNews(allArticles, null); // On n'affiche pas de badge en mode hors ligne
            alertBadge.textContent += " (Mode Hors Ligne)";
        } else {
            newsContainer.innerHTML = `<p style="color: red;">Impossible de charger les actualités et aucun cache disponible.</p>`;
            alertBadge.textContent = "Erreur";
            alertBadge.className = "badge bg-red";
        }
    }
}

function calculateAlertLevel(articles) {
    const criticalKeywords = ['hack', 'breach', 'attack', 'vulnerability', 'ransomware', 'malware', 'leak'];
    const criticalArticles = articles.filter(article => {
        const titleLower = (article.title || '').toLowerCase();
        return criticalKeywords.some(keyword => titleLower.includes(keyword));
    });

    const criticalCount = criticalArticles.length;
    alertBadge.className = 'badge'; 
    if (criticalCount >= 4) {
        alertBadge.textContent = "ÉLEVÉ";
        alertBadge.classList.add('bg-red');
    } else if (criticalCount >= 2) {
        alertBadge.textContent = "MOYEN";
        alertBadge.classList.add('bg-orange');
    } else {
        alertBadge.textContent = "FAIBLE";
        alertBadge.classList.add('bg-green');
    }
}

function populateCategories(articles) {
    // On vide d'abord le select (sauf la première option "Toutes les sources")
    categoryFilter.innerHTML = '<option value="all">Toutes les sources</option>';
    
    const sources = articles.map(article => article.source.name);
    const uniqueSources = [...new Set(sources)];

    uniqueSources.forEach(source => {
        if (source) {
            const option = document.createElement('option');
            option.value = source;
            option.textContent = source;
            categoryFilter.appendChild(option);
        }
    });
}

// --- 2. AFFICHAGE AVEC BADGE "NOUVEAU" ---
// On ajoute le paramètre lastVisitDate
function displayNews(articlesToDisplay, lastVisitDate = null) {
    newsContainer.innerHTML = '';

    if (articlesToDisplay.length === 0) {
        newsContainer.innerHTML = '<p>Aucune actualité ne correspond à votre recherche.</p>';
        return;
    }

    articlesToDisplay.forEach(article => {
        const title = article.title || 'Titre indisponible';
        const source = article.source.name || 'Source inconnue';
        
        const articleDate = new Date(article.publishedAt);
        const dateStr = articleDate.toLocaleDateString('fr-FR');
        
        const description = article.description || 'Aucun résumé disponible.';
        const url = article.url || '#';

        // BONUS : Logique du badge "Nouveau"
        // Si on a une date de dernière visite ET que l'article est plus récent, c'est nouveau !
        let badgeHTML = '';
        if (lastVisitDate && articleDate > lastVisitDate) {
            badgeHTML = '<span class="badge-new">Nouveau</span>';
        }

        newsContainer.innerHTML += `
            <div class="news-card">
                <h3>${title} ${badgeHTML}</h3>
                <div class="news-meta">
                    <strong>${source}</strong>
                    <span>${dateStr}</span>
                </div>
                <p>${description}</p>
                <a href="${url}" target="_blank" rel="noopener noreferrer">Lire l'article</a>
            </div>
        `;
    });
}

// --- 3. FILTRES ---
function filterArticles() {
    const searchText = searchInput.value.toLowerCase();
    const selectedSource = categoryFilter.value;

    const filtered = allArticles.filter(article => {
        const matchText = (article.title || '').toLowerCase().includes(searchText) || 
                          (article.description || '').toLowerCase().includes(searchText);
        const matchSource = selectedSource === 'all' || article.source.name === selectedSource;
        
        return matchText && matchSource;
    });

    // On repasse null pour lastVisitDate lors du filtrage pour éviter que les badges ne clignotent/disparaissent bizarrement
    displayNews(filtered, new Date(localStorage.getItem('cyberShield_lastVisit') || 0));
}

searchInput.addEventListener('input', filterArticles);
categoryFilter.addEventListener('change', filterArticles);

fetchCyberNews();
