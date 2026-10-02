/* ============================================================
   js/galleries.js — מנוע הצגת הגלריה של איגוד עמלים
   ============================================================
   הקובץ קורא את הנתונים מ-data/galleries-data.js (או מגיבוי מקומי
   שנשמר בממשק הניהול), ובונה מהם כרטיסי אירועים במדור "גלריה".

   כל הפונקציות זמינות דרך window.AMALIM_GALLERY כדי שממשק חיצוני
   (למשל admin.html) יוכל להשתמש באותו מנוע:
       AMALIM_GALLERY.getGalleries()          קבלת כל האירועים
       AMALIM_GALLERY.saveGalleries(array)    שמירה (גיבוי מקומי + רינדור)
       AMALIM_GALLERY.renderCardHtml(item)    HTML של כרטיסייה
       AMALIM_GALLERY.renderFullHtml(item)    HTML של תצוגת אירוע מלאה
   ============================================================ */

(function () {
    'use strict';

    // מפתח הגיבוי המקומי — שינויים שנשמרו בממשק הניהול בדפדפן הזה
    var STORAGE_KEY = 'amalim_galleries_v1';

    /* ---------- עזרי טקסט ---------- */

    function esc(str) {
        return String(str == null ? '' : str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    /* ---------- קריאה ושמירה של נתונים ---------- */

    function getGalleries() {
        try {
            var saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                var parsed = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length > 0) return parsed;
            }
        } catch (e) {
            console.warn('galleries: קריאת הגיבוי המקומי נכשלה', e);
        }
        return window.AMALIM_GALLERIES || [];
    }

    function saveGalleries(galleries) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(galleries));
        } catch (e) {
            console.warn('galleries: שמירת הגיבוי המקומי נכשלה', e);
        }
        render();
    }

    /* ---------- בניית HTML ---------- */

    // כרטיסיית אירוע — המחלקות מוגדרות ב-css/site.css
    function renderCardHtml(gallery) {
        var html = '<div class="gallery-card" data-gallery-id="' + esc(gallery.id) +
                   '" onclick="AMALIM_GALLERY.openGallery(\'' + esc(gallery.id) + '\')">';

        if (gallery.images && gallery.images.length > 0) {
            html += '<div class="gallery-card-image"><img src="' + esc(gallery.images[0]) +
                    '" alt="' + esc(gallery.title) + '" loading="lazy"></div>';
        }

        html += '<h3 class="gallery-card-title">' + esc(gallery.title) + '</h3>';

        if (gallery.date) {
            html += '<p class="gallery-card-date">' + esc(gallery.date) + '</p>';
        }

        if (gallery.teaser) {
            html += '<p class="gallery-card-teaser">' + esc(gallery.teaser) + '</p>';
        }

        html += '<div class="gallery-card-btn">פרטים נוספים</div>';
        html += '</div>';
        return html;
    }

    // תצוגת אירוע מלאה — כותרת כבדה, מלל, סרטון וגלריית תמונות
    function renderFullHtml(gallery, options) {
        options = options || {};
        var html = '<div class="gallery-full-view">';

        if (options.withBackButton !== false) {
            html += '<button class="back-btn" onclick="AMALIM_GALLERY.closeGallery()">→ חזרה לכל האירועים</button>';
        }

        html += '<h2 class="gallery-full-title">' + esc(gallery.title) + '</h2>';

        if (gallery.date) {
            html += '<p class="gallery-full-date">' + esc(gallery.date) + '</p>';
        }

        // כפתור קישור למקור הכתבה
        if (gallery.sourceUrl) {
            var label = gallery.sourceName ?
                ('מקור: ' + esc(gallery.sourceName) + ' | לחץ כאן לקריאת הכתבה המלאה') :
                'לחץ כאן לקריאת הכתבה המלאה';
            html += '<a class="gallery-full-source" href="' + esc(gallery.sourceUrl) +
                    '" target="_blank" rel="noopener">' + label + '</a>';
        }

        // פסקאות — מופרדות בשורה ריקה                // מבנה כתבת חדשות: מלל פתיחה ← תמונת שער ← שאר המלל ← כל התמונות ברוחב מלא
                var paragraphs = String(gallery.body || '').split(/\n\s*\n/)
                    .map(function (p) { return p.trim(); })
                    .filter(function (p) { return p.length > 0; });

                var lead = [];
                var rest = [];
                var leadChars = 0;
                for (var i = 0; i < paragraphs.length; i++) {
                    // פסקאות הפתיחה: עד 2 פסקאות או ~350 תווים
                    if (lead.length < 2 && leadChars < 350) {
                        lead.push(paragraphs[i]);
                        leadChars += paragraphs[i].length;
                    } else {
                        rest.push(paragraphs[i]);
                    }
                }

                var cover = (gallery.images && gallery.images.length > 0) ? gallery.images[0] : null;

                if (lead.length > 0) {
                    html += '<div class="gallery-full-body gallery-full-lead">' +
                            lead.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') +
                            '</div>';
                }

                if (cover) {
                    html += '<img class="gallery-full-image" src="' + esc(cover) + '" alt="' + esc(gallery.title) +
                            '" loading="lazy" onclick="AMALIM_GALLERY.openLightbox(\'' + esc(cover) + '\')">';
                }

                if (rest.length > 0) {
                    html += '<div class="gallery-full-body">' +
                            rest.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') +
                            '</div>';
                }

                // סרטון מוטמע
                if (gallery.videoUrl) {
                    html += '<div class="gallery-video"><iframe src="' + esc(gallery.videoUrl) +
                            '" title="' + esc(gallery.title) +
                            '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>';
                }

                // כל התמונות של האירוע — כל אחת ברוחב העמוד, ללא מסגרת
                if (gallery.images && gallery.images.length > 1) {
                    html += gallery.images.slice(1).map(function (src) {
                        return '<img class="gallery-full-image" src="' + esc(src) + '" alt="' + esc(gallery.title) +
                               '" loading="lazy" onclick="AMALIM_GALLERY.openLightbox(\'' + esc(src) + '\')">';
                    }).join('');
                }

                html += '</div>';
                return html;
    }

    /* ---------- רינדור המדור ---------- */

    function render() {
        var grid = document.getElementById('gallery-grid');
        if (!grid) return; // המדור לא נטען כרגע

        var galleries = getGalleries();

        if (galleries.length === 0) {
            grid.innerHTML = '<div class="gallery-empty">אין אירועים עדיין — ' +
                             'ניתן להוסיף דרך ממשק הניהול (admin.html)</div>';
            return;
        }

        grid.innerHTML = galleries.map(renderCardHtml).join('');
    }

    /* ---------- פתיחה וסגירה של אירוע ---------- */

    function openGallery(id) {
        var gallery = getGalleries().filter(function (g) { return g.id === id; })[0];
        var fullView = document.getElementById('gallery-full-view');
        var grid = document.getElementById('gallery-grid');
        if (!gallery || !fullView) return;

        fullView.innerHTML = renderFullHtml(gallery);
        fullView.style.display = 'block';
        if (grid) grid.style.display = 'none';

        fullView.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function closeGallery() {
        var fullView = document.getElementById('gallery-full-view');
        var grid = document.getElementById('gallery-grid');

        if (fullView) {
            fullView.style.display = 'none';
            fullView.innerHTML = '';
        }
        if (grid) grid.style.display = '';
    }

    /* ---------- לייטבוקס (הגדלת תמונה) ---------- */

    function openLightbox(src) {
        var box = document.createElement('div');
        box.className = 'gallery-lightbox';
        box.innerHTML = '<img src="' + src + '" alt="">';
        box.addEventListener('click', function () { box.remove(); });
        document.body.appendChild(box);
    }

    // סגירת לייטבוקס במקש Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            var box = document.querySelector('.gallery-lightbox');
            if (box) box.remove();
        }
    });

    /* ---------- חשיפה לשימוש חיצוני ---------- */

    window.AMALIM_GALLERY = {
        STORAGE_KEY: STORAGE_KEY,
        getGalleries: getGalleries,
        saveGalleries: saveGalleries,
        renderCardHtml: renderCardHtml,
        renderFullHtml: renderFullHtml,
        render: render,
        openGallery: openGallery,
        closeGallery: closeGallery,
        openLightbox: openLightbox
    };

    // רינדור ראשוני כשהדף נטען
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', render);
    } else {
        render();
    }
})();
