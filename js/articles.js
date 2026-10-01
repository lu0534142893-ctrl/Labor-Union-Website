/* ============================================================
   js/articles.js — מנוע הצגת הכתבות של איגוד עמלים
   ============================================================
   הקובץ קורא את הנתונים מ-data/articles-data.js (או מגיבוי מקומי
   שנשמר בממשק הניהול), ובונה מהם כרטיסיות בעמוד "כתבות".

   כדי שממשק חיצוני יוכל להשתמש באותו מנוע, כל הפונקציות זמינות
   דרך window.AMALIM — למשל:
       AMALIM.getArticles()          קבלת כל הכתבות
       AMALIM.saveArticles(array)    שמירת כתבות (גיבוי מקומי + רינדור)
       AMALIM.renderCardHtml(item)   יצירת HTML של כרטיסייה בודדת
   ============================================================ */

(function () {
    'use strict';

    // מפתח הגיבוי המקומי — שינויים שנשמרו בממשק הניהול בדפדפן הזה
    var STORAGE_KEY = 'amalim_articles_v1';

    // מזהי הקטגוריות → תיקיות הרשת בעמוד
    var CATEGORY_GRIDS = {
        press: 'press-articles-grid',
        torah: 'torah-articles-grid'
    };

    /* ---------- עזרי טקסט ---------- */

    // בריחת תווים מיוחדים כדי שתגיות בתוכן לא ישברו את הדף
    function esc(str) {
        return String(str == null ? '' : str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    // חיתוך טקסט לתצוגה מקדימה בכרטיסיה
    function excerpt(text, maxLen) {
        var clean = String(text || '').replace(/\s+/g, ' ').trim();
        if (clean.length <= maxLen) return clean;
        return clean.slice(0, maxLen).replace(/\s+\S*$/, '') + '…';
    }

    /* ---------- קריאה ושמירה של נתונים ---------- */

    function getArticles() {
        // קודם כל מנסים את הגיבוי המקומי (מה שנשמר בממשק הניהול),
        // ורק אם אין — קוראים מקובץ הנתונים.
        try {
            var saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                var parsed = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length > 0) return parsed;
            }
        } catch (e) {
            console.warn('articles: קריאת הגיבוי המקומי נכשלה', e);
        }
        return window.AMALIM_ARTICLES || [];
    }

    function saveArticles(articles) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
        } catch (e) {
            console.warn('articles: שמירת הגיבוי המקומי נכשלה', e);
        }
        render();
    }

    /* ---------- בניית HTML ---------- */

    // כרטיסיית כתבה — המחלקות מוגדרות ב-css/site.css
    function renderCardHtml(article) {
        var html = '<article class="article-card" data-article-id="' + esc(article.id) +
                   '" data-category="' + esc(article.category) + '" onclick="AMALIM.openArticle(\'' +
                   esc(article.id) + '\')">';

        // תמונה ראשית (אם הוגדרה)
        if (article.images && article.images.length > 0) {
            html += '<div class="article-card-image"><img src="' + esc(article.images[0]) +
                    '" alt="' + esc(article.title) + '" loading="lazy"></div>';
        }

        html += '<h3 class="article-card-title">' + esc(article.title) + '</h3>';
        html += '<p class="article-card-text">' + esc(excerpt(article.body, 220)) + '</p>';

        // שורת מקור / תאריך
        var metaParts = [];
        if (article.source) metaParts.push(esc(article.source));
        if (article.date) metaParts.push(esc(article.date));
        if (metaParts.length > 0) {
            html += '<p class="article-card-meta">' + metaParts.join(' · ') + '</p>';
        }

        html += '</article>';
        return html;
    }

    /* ---------- רינדור העמוד ---------- */

    function render() {
        var articles = getArticles();

        Object.keys(CATEGORY_GRIDS).forEach(function (category) {
            var grid = document.getElementById(CATEGORY_GRIDS[category]);
            if (!grid) return; // העמוד הזה לא נטען כרגע

            var items = articles.filter(function (a) { return a.category === category; });

            if (items.length === 0) {
                grid.innerHTML = '<div class="article-empty">אין כתבות עדיין — ' +
                                 'ניתן להוסיף דרך ממשק הניהול (admin.html)</div>';
                return;
            }

            grid.innerHTML = items.map(renderCardHtml).join('');
        });
    }

    /* ---------- תצוגת כתבה מלאה ---------- */

    function openArticle(id) {
        var article = getArticles().filter(function (a) { return a.id === id; })[0];
        var fullView = document.getElementById('article-full-view');
        if (!article || !fullView) return;

        var html = '<button class="back-btn" onclick="AMALIM.closeArticle()">→ חזרה לכל הכתבות</button>';
        html += '<h2 class="article-full-title">' + esc(article.title) + '</h2>';

        var metaParts = [];
        if (article.source) metaParts.push(esc(article.source));
        if (article.date) metaParts.push(esc(article.date));
        if (metaParts.length > 0) {
            html += '<p class="article-full-meta">' + metaParts.join(' · ') + '</p>';
        }

        // פסקאות — מופרדות בשורה ריקה
        var paragraphs = String(article.body || '').split(/\n\s*\n/);
        html += '<div class="article-full-body">' +
                paragraphs.map(function (p) { return '<p>' + esc(p.trim()) + '</p>'; }).join('') +
                '</div>';

        // גלריית תמונות נוספות
        if (article.images && article.images.length > 0) {
            html += '<div class="article-full-images">' +
                    article.images.map(function (src) {
                        return '<a href="' + esc(src) + '" target="_blank" rel="noopener">' +
                               '<img src="' + esc(src) + '" alt="' + esc(article.title) + '" loading="lazy"></a>';
                    }).join('') +
                    '</div>';
        }

        fullView.innerHTML = html;
        fullView.style.display = 'block';

        // הסתרת רשתות הכרטיסיות בזמן קריאת הכתבה
        var boxes = document.querySelectorAll('#articles-page .content-box');
        for (var i = 0; i < boxes.length; i++) boxes[i].style.display = 'none';

        fullView.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function closeArticle() {
        var fullView = document.getElementById('article-full-view');
        if (fullView) {
            fullView.style.display = 'none';
            fullView.innerHTML = '';
        }
        var boxes = document.querySelectorAll('#articles-page .content-box');
        for (var i = 0; i < boxes.length; i++) boxes[i].style.display = '';
    }

    /* ---------- חשיפה לשימוש חיצוני ---------- */

    window.AMALIM = {
        STORAGE_KEY: STORAGE_KEY,
        getArticles: getArticles,
        saveArticles: saveArticles,
        renderCardHtml: renderCardHtml,
        render: render,
        openArticle: openArticle,
        closeArticle: closeArticle
    };

    // רינדור ראשוני כשהדף נטען
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', render);
    } else {
        render();
    }
})();
