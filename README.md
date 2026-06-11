<!DOCTYPE html> <!-- הגדרת סוג המסמך - זהו מסמך HTML5 -->
<html lang="he" dir="rtl"> <!-- תג HTML עם שפה עברית וכיוון מימין לשמאל -->

<head> <!-- ראש המסמך - מכיל מידע על הדף -->
    <meta charset="UTF-8" /> <!-- קידוד תווים - תומך בעברית -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- התאמה למובייל - הדף יתאים את עצמו למסך -->
    <title>איגוד עמלים</title> <!-- כותרת הדף - יופיע בטאב הדפדפן -->
    <link rel="icon" type="image/jpeg" href="https://images.matara.pro/ClientsImages/7013662.jpg?1"> <!-- favicon - העיגול הקטן בטאב הדפדפן -->
    <link href="https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@400;500;700;900&display=swap" rel="stylesheet">

    <style>


        /* עיצוב לכרטיסיות אירועים - כפתור בגובה קבוע */
        .event-card {
            min-height: 300px; /* גובה קבוע */
            display: flex;
            flex-direction: column;
        }

        .event-card-special {
            min-height: 300px; /* גובה קבוע */
            display: flex;
            flex-direction: column;
        }

        .event-card .details-btn,
        .event-card-special .details-btn {
            margin-top: auto; /* דוחף את הכפתור לתחתית */
        }

        /* הודעה קופצת לחזרה */
        .back-notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, #FFD700, #FFA500);
            color: #8B7355;
            padding: 20px 30px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(255, 215, 0, 0.5);
            font-size: 22px;
            font-weight: 900;
            text-align: center;
            z-index: 10000;
            animation: slideInRight 0.5s ease-out;
            border: 3px solid #FFA500;
            display: none; /* מוסתר בהתחלה */
            text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
        }

        @keyframes slideInRight {
            from {
                transform: translateY(100%);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }

        .back-notification.fade-out {
            animation: fadeOut 0.5s ease-in forwards;
        }

        @keyframes fadeOut {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(100%);
            }
        }

        /* תיקון לכרטיסיה הקטועה - הבטחת תצוגה מלאה */
        .anniversary-card {
            width: 100% !important;
            max-width: 100% !important;
            overflow: visible !important;
            height: auto !important;
            min-height: fit-content !important;
            max-height: none !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 20px !important;
            padding: 30px !important;
            margin: 20px auto !important;
            box-sizing: border-box !important;
        }

        .anniversary-card .leader-text {
            width: 100% !important;
            max-width: 100% !important;
            overflow: visible !important;
            height: auto !important;
            min-height: fit-content !important;
        }

        .anniversary-card .leader-image {
            width: 100% !important;
            max-width: 100% !important;
            overflow: visible !important;
            height: auto !important;
            min-height: fit-content !important;
        }

        /* אנימציה של אפקט הקפיצה לכותרות - הכותרת "קופצת" כשנכנסת */
        @keyframes titlePop {
            0% { transform: scale(0.8); opacity: 0; } /* התחלה: כותרת קטנה ב-20% ושקופה לחלוטין */
            50% { transform: scale(1.05); } /* אמצע: כותרת גדולה ב-5% מדי - אפקט "קפיצה" */
            100% { transform: scale(1); opacity: 1; } /* סוף: כותרת בגודל הנכון ונראית לחלוטין */
        }

        /* אנימציה של אפקט הזום והסיבוב לתמונות - התמונה "מתעוררת" עם סיבוב */
        @keyframes imageZoomRotate {
            0% { 
                transform: scale(0.8) rotate(-3deg); /* התחלה: תמונה קטנה ב-20% וסובבת 3 מעלות שמאלה */
                opacity: 0; /* שקופה לחלוטין - לא נראית */
            }
            50% { 
                transform: scale(1.02) rotate(1deg); /* אמצע: תמונה גדולה ב-2% וסובבת 1 מעלה ימינה */
            }
            100% { 
                transform: scale(1) rotate(0deg); /* סוף: תמונה בגודל הנכון וישרה לחלוטין */
                opacity: 1; /* נראית לחלוטין - השקיפות נעלמה */
            }
        }

        @font-face {
            font-family: 'EFT_Atara';
            src: url('EFT_Atara.woff') format('woff');
        }

        @font-face {
            font-family: 'EFT_Aderet';
            src: url('EFT_Aderet.woff') format('woff');
        }

        @font-face {
            font-family: 'EFT_Devash_Heavy';
            src: url('EFT_Devash_Heavy.woff') format('woff');
            font-weight: normal;
            font-style: normal;
        }

        /* הסתרת מסגרת שחורה מה-PDF של Google Drive */
        iframe[src*="drive.google.com"] {
            border: none !important;
            outline: none !important;
        }

        /* שיפור עיצוב כרטיסיות חדשות - אפקטים מושכים */
        .news-card {
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            position: relative;
            overflow: hidden;
        }

        .news-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.1), transparent);
            transition: left 0.5s;
        }

        .news-card:hover::before {
            left: 100%;
        }

        .news-card:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 20px 40px rgba(212, 175, 55, 0.4), 0 10px 20px rgba(0, 0, 0, 0.2);
            border-color: #FFD700;
        }

        .news-card h3 {
            transition: all 0.3s ease;
        }

        .news-card:hover h3 {
            color: #B8860B;
            transform: scale(1.05);
        }

        /* שיפור עיצוב כרטיסיות מכתבים */
        .content-box > div[style*="background: linear-gradient"] {
            transition: all 0.2s ease;
            position: relative;
            overflow: hidden;
        }

        .content-box > div[style*="background: linear-gradient"]:hover {
            transform: translateY(-2px);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        /* שיפור עיצוב כפתורים */
        .details-btn {
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            position: relative;
            overflow: hidden;
        }

        .details-btn::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: translate(-50%, -50%);
            transition: width 0.6s, height 0.6s;
        }

        .details-btn:hover::after {
            width: 300px;
            height: 300px;
        }

        .details-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(139, 115, 85, 0.5);
        }

        /* אנימציה לכרטיסיות כשנכנסות למסך */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* אנימציה של טקסט שיורד מלמעלה - אפקט יפה */
        @keyframes slideDownFromTop {
            from {
                opacity: 0;
                transform: translateY(-50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* אנימציה של כותרת שיורדת מלמעלה עם אפקט בולט */
        @keyframes titleSlideDown {
            0% {
                opacity: 0;
                transform: translateY(-80px) scale(0.9);
            }
            50% {
                opacity: 0.7;
                transform: translateY(-10px) scale(1.02);
            }
            100% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }

        /* אנימציה של כרטיסיות הסכמות שיורדות מלמעלה */
        @keyframes cardSlideDown {
            from {
                opacity: 0;
                transform: translateY(-60px) scale(0.95);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }

        /* אנימציה לכרטיסיה מלאת רוחב קופצת מימין */
        @keyframes slideInFromRight {
            from {
                opacity: 0;
                transform: translateX(100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        /* אנימציה לכרטיסיה מלאת רוחב קופצת משמאל */
        @keyframes slideInFromLeft {
            from {
                opacity: 0;
                transform: translateX(-100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        /* עיצוב כרטיסיות קטנות לראשי האיגוד - תמונה ברקע עם גרדיאנט */
        /* קונטיינר חיצוני - 3 כרטיסיות במרכז */
        .full-width-leader-card-container {
            width: 100%;
            padding: 60px 0;
            margin: 0;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            gap: 2%;
            background-color: #F5F5DC;
            position: relative;
        }
        
        /* כרטיסיה כהה עם unfold-box */
        .full-width-leader-card {
            position: relative;
            width: 20%;
            background-color: #1a1a1a;
            border-radius: 12px;
            padding: 20px;
            box-sizing: border-box;
            overflow: hidden;
        }
        
        /* תמונה קטנה של המנהיג */
        .full-width-leader-card .leader-image {
            width: 90px;
            height: 90px;
            border-radius: 50%;
            object-fit: cover;
            object-position: center;
            margin: 0 auto 12px;
            display: block;
            border: 3px solid rgba(255, 255, 255, 0.3);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .full-width-leader-card .leader-image:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.7);
        }
        
        .full-width-leader-card.open {
            /* אין צורך בשינוי - הטקסט מתרחב אוטומטית */
        }

        /* תוכן הכרטיסיה */
        .full-width-leader-card .leader-content-section {
            position: relative;
            width: 100%;
        }
        
        .full-width-leader-card .leader-title-bar {
            background: rgba(255, 255, 255, 0.2);
            color: #ffffff;
            padding: 6px 12px;
            text-align: center;
            font-size: 0.85em;
            font-weight: 600;
            font-family: Arial, Helvetica, sans-serif;
            border-radius: 6px;
            margin-bottom: 10px;
            display: inline-block;
        }
        
        .full-width-leader-card .leader-name {
            font-size: 1.15em;
            font-weight: 700;
            color: #ffffff;
            font-family: Arial, Helvetica, sans-serif;
            margin-bottom: 5px;
            text-align: right;
            line-height: 1.3;
        }

        .full-width-leader-card .leader-location {
            font-size: 0.85em;
            color: #e0e0e0;
            font-weight: 500;
            margin-bottom: 12px;
            text-align: right;
        }

        /* unfold-content - התוכן שמתקפל - אותו קצב לפתיחה וסגירה */
        .full-width-leader-card .leader-description {
            max-height: 140px;
            overflow: hidden;
            transition: max-height 0.7s ease-in-out;
            position: relative;
            color: #ffffff;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 0.9em;
            line-height: 1.6;
            text-align: right;
        }
        
        .full-width-leader-card.open .leader-description {
            max-height: 2000px;
            transition: max-height 0.7s ease-in-out;
        }
        
        /* fade-mask - מסכה כהה בקצה - אותו קצב */
        .full-width-leader-card .fade-mask {
            position: absolute;
            bottom: 45px;
            left: 0;
            right: 0;
            height: 50px;
            background: linear-gradient(to bottom, transparent, #1a1a1a);
            transition: opacity 0.7s ease-in-out;
            pointer-events: none;
            z-index: 1;
        }
        
        .full-width-leader-card.open .fade-mask {
            opacity: 0;
            transition: opacity 0.7s ease-in-out;
        }
        
        .full-width-leader-card .leader-description p {
            margin-bottom: 8px;
        }
        
        /* כפתור קרא עוד */
        .read-more-btn {
            display: block;
            margin: 8px auto 0;
            padding: 8px 18px;
            background: #333;
            color: white;
            border: none;
            cursor: pointer;
            border-radius: 6px;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 0.85em;
            transition: background 0.3s ease;
        }
        
        .read-more-btn:hover {
            background: #444;
        }

        .full-width-leader-card .leader-description p:last-child {
            margin-bottom: 0;
        }

        /* עיצוב רספונסיבי לכרטיסיות מלאות רוחב */
        @media (max-width: 768px) {
            .full-width-leader-card-container {
                grid-template-columns: 1fr !important;
                padding: 40px 15px !important;
                gap: 25px !important;
            }
            
            .full-width-leader-card {
                min-width: 100% !important;
                height: 400px !important;
            }
            
            .full-width-leader-card.expanded {
                height: auto !important;
                min-height: 400px !important;
            }
            
            .full-width-leader-card .card-background-image {
                width: 100% !important;
                height: 100% !important;
            }
            
            .full-width-leader-card .leader-title-bar {
                top: 15px !important;
                right: 15px !important;
                font-size: 0.85em !important;
                padding: 7px 12px !important;
                min-width: 120px !important;
            }

            .full-width-leader-card .leader-content-section {
                padding: 25px 18px !important;
            }
            
            .full-width-leader-card .leader-name {
                font-size: 1.3em !important;
                margin-top: 12px !important;
            }
            
            .full-width-leader-card .leader-location {
                font-size: 0.9em !important;
                margin-bottom: 12px !important;
            }
            
            .full-width-leader-card .leader-description {
                font-size: 0.85em !important;
                font-family: Arial, Helvetica, sans-serif !important;
                max-height: 180px !important;
            }
            
            .full-width-leader-card.expanded .leader-description {
                max-height: 2000px !important;
            }
            
            .full-width-leader-card .leader-description:not(.expanded)::after {
                height: 55px !important;
            }
            
            .read-more-btn {
                font-size: 0.85em !important;
                padding: 9px 22px !important;
                margin-top: auto !important;
            }
        }

        .news-card {
            animation: fadeInUp 0.6s ease-out;
        }

        .news-card:nth-child(1) { animation-delay: 0.1s; }
        .news-card:nth-child(2) { animation-delay: 0.2s; }
        .news-card:nth-child(3) { animation-delay: 0.3s; }
        .news-card:nth-child(4) { animation-delay: 0.4s; }
        .news-card:nth-child(5) { animation-delay: 0.5s; }
        .news-card:nth-child(6) { animation-delay: 0.6s; }

        /* אנימציה לכותרת הסכמות - יורדת מלמעלה */
        .agreements-title {
            animation: titleSlideDown 1s ease-out;
            animation-fill-mode: both;
        }

        /* אנימציה לכרטיסיות הסכמות - יורדות מלמעלה עם עיכובים */
        .agreement-card {
            animation: cardSlideDown 0.8s ease-out;
            animation-fill-mode: both;
        }

        .agreement-card:nth-child(1) { 
            animation-delay: 0.2s; 
        }
        .agreement-card:nth-child(2) { 
            animation-delay: 0.4s; 
        }
        .agreement-card:nth-child(3) { 
            animation-delay: 0.6s; 
        }
        .agreement-card:nth-child(4) { 
            animation-delay: 0.8s; 
        }
        .agreement-card:nth-child(5) { 
            animation-delay: 1s; 
        }
        .agreement-card:nth-child(6) { 
            animation-delay: 1.2s; 
        }

        /* אנימציה לכל הכותרות - יורדות מלמעלה */
        .page-content h1,
        .page-content h2 {
            animation: slideDownFromTop 0.8s ease-out;
            animation-fill-mode: both;
        }

        .page-content h3 {
            animation: slideDownFromTop 0.7s ease-out;
            animation-delay: 0.2s;
            animation-fill-mode: both;
        }

        /* אנימציה לטקסטים - יורדים מלמעלה */
        .page-content p {
            animation: slideDownFromTop 0.6s ease-out;
            animation-fill-mode: both;
        }

        .page-content p:nth-of-type(1) { animation-delay: 0.1s; }
        .page-content p:nth-of-type(2) { animation-delay: 0.2s; }
        .page-content p:nth-of-type(3) { animation-delay: 0.3s; }
        .page-content p:nth-of-type(4) { animation-delay: 0.4s; }
        .page-content p:nth-of-type(5) { animation-delay: 0.5s; }
        .page-content p:nth-of-type(6) { animation-delay: 0.6s; }

        /* אנימציה לכרטיסיות מידע - יורדות מלמעלה */
        .info-card,
        .contact-card {
            animation: cardSlideDown 0.8s ease-out;
            animation-fill-mode: both;
        }

        .info-card:nth-child(1),
        .contact-card:nth-child(1) { 
            animation-delay: 0.2s; 
        }
        .info-card:nth-child(2),
        .contact-card:nth-child(2) { 
            animation-delay: 0.4s; 
        }
        .info-card:nth-child(3),
        .contact-card:nth-child(3) { 
            animation-delay: 0.6s; 
        }


        html,
        body { /* עיצוב בסיסי לכל הדף - רקע ופונטים */
            margin: 0; /* ביטול רווחים חיצוניים - הדף יתחיל מהקצה */
            padding: 0; /* ביטול רווחים פנימיים - תוכן הדף יתחיל מהקצה */
            font-family: 'Frank Ruhl Libre', serif; /* פונט עברי יפה */
            background-color: #F0F0E6; /* רקע לבן-קרם - צבע הדף */
            color: #8B7355; /* צבע טקסט חום כהה */
            overflow-x: hidden;  /* מונע גלילה אופקית */
            max-width: 100vw; /* רוחב מקסימלי - לא יעבור את רוחב המסך */
            box-sizing: border-box; /* חישוב גודל כולל padding - מונע בעיות גודל */
            touch-action: pan-y; /* גלילה אנכית בלבד במובייל - לא גלילה לצדדים */
            scroll-behavior: smooth; /* גלילה חלקה - אפקט נעים כשגוללים */
            z-index: 0; /* שכבה נמוכה - מתחת לתמונה */
            position: relative; /* מיקום יחסי */
        }

        .navigation { /* תפריט ניווט קבוע - תמיד נראה בראש הדף */
            position: fixed; /* קבוע במקום - לא זז כשגוללים */
            top: 0; /* בראש הדף - בחלק העליון */
            left: 0; /* מתחיל מהצד שמאל */
            width: 100%; /* רוחב מלא - תופס את כל הרוחב */
            height: 8vh; /* גובה קטן יותר - רק 8% מגובה המסך */
            background-color: #F5F5DC; /* רקע לבן-קרם */
            backdrop-filter: blur(10px); /* אפקט טשטוש - נותן מראה זכוכית */
            z-index: 1000; /* שכבה גבוהה - תמיד מעל התוכן */
            display: flex; /* סידור גמיש - הכפתורים יסתדרו יפה */
            align-items: center; /* מרכוז אנכי - הכפתורים במרכז הגובה */
            justify-content: center; /* מרכוז אופקי - הכפתורים במרכז הרוחב */
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* צל עדין */
            max-width: 100vw; /* רוחב מקסימלי - לא יעבור את רוחב המסך */
            box-sizing: border-box; /* כולל padding ו-border בגודל */
            overflow-x: hidden; /* מניעת גלילה אופקית */
        }

        /* הסתרת אלמנטי דפדוף מיותרים */
        .navigation *[class*="scroll"], 
        .navigation *[class*="arrow"], 
        .navigation *[class*="nav-scroll"],
        .navigation *[id*="scroll"],
        .navigation *[id*="arrow"] {
            display: none !important;
        }

        #home-page { /* דף הבית - הדף הראשי של האתר */
            padding-top: 0; /* ביטול רווח עליון - התמונות יתחילו מתחת לניווט */
            min-height: 100vh; /* גובה מינימלי מלא */
            overflow-y: auto; /* גלילה אנכית מותרת */
            z-index: 0; /* שכבה נמוכה - מתחת לתמונה */
            position: relative; /* מיקום יחסי */
            background-color: #F5F5DC; /* צבע אחיד כמו וילון הניווט */
        }

        body.home-active { /* כשדף הבית פעיל - ביטול גלילה בכל הדף */
            overflow: hidden; /* ביטול גלילה - מונע גלילה כשדף הבית פעיל */
        }

        .nav-container { /* מיכל הניווט - סידור הלוגו והתפריט */
            display: flex; /* סידור גמיש - הלוגו והתפריט יסתדרו יפה */
            justify-content: center; /* מרכוז - התפריט במרכז */
            align-items: center; /* מרכוז אנכי - הכל במרכז הגובה */
            width: 96%; /* רוחב 96% - משאיר קצת רווח מהצדדים */
            height: 100%; /* גובה מלא - תופס את כל הגובה הזמין */
            padding: 0 2%; /* רווח של 2% מהצדדים */
            position: relative; /* מיקום יחסי - לאפשר מיקום הלוגו */
            max-width: 100vw; /* רוחב מקסימלי - לא יעבור את רוחב המסך */
            box-sizing: border-box; /* כולל padding ו-border בגודל */
            overflow-x: hidden; /* מניעת גלילה אופקית */
        }

        .nav-logo { /* לוגו האיגוד */
            flex-shrink: 0; /* לא יתכווץ */
            position: absolute; /* מיקום מוחלט */
            right: 2%; /* בצד ימין */
            top: 50%; /* במרכז הגובה */
            transform: translateY(-50%); /* מרכוז אנכי */
            cursor: pointer; /* סמן עכבר - הופך לכף יד כשעוברים מעל */
        }

        .nav-logo img { /* תמונת הלוגו */
            height: 100%; /* גובה מלא - תופס את כל גובה הניווט */
            width: auto; /* רוחב אוטומטי - שומר על הפרופורציות */
            max-height: 4vh; /* גובה מקסימלי קטן מאוד - 4vh */
            min-height: 30px; /* גובה מינימלי של 30 פיקסלים */
        }

        .nav-menu { /* תפריט הניווט - פשוט */
            display: flex; /* סידור גמיש - הקישורים יסתדרו יפה */
            gap: 15px; /* רווח קטן יותר בין הקישורים */
            align-items: center; /* מרכוז אנכי */
            background: transparent; /* רקע שקוף - ללא וילון */
            border-radius: 0; /* ללא פינות מעוגלות */
            padding: 0; /* ללא רווח פנימי */
        }

        /* אייקון חיפוש */
        .search-icon {
            cursor: pointer;
            font-size: 16px;
            color: #8B7355;
            padding: 8px;
            border-radius: 50%;
            position: relative;
            border: none; /* ללא מסגרת על האייקון */
            flex-shrink: 0; /* לא מתכווץ */
        }

        .search-icon:hover {
            background-color: rgba(139, 115, 85, 0.1);
        }


        /* מצב פעיל של האייקון */
        .search-icon.active {
            background-color: rgba(212, 175, 55, 0.1); /* רקע זהב קל */
            color: #B8860B; /* צבע זהב כהה */
        }

        .search-icon.active:hover {
            background-color: rgba(212, 175, 55, 0.2);
        }

        /* שורת חיפוש */
        .search-bar {
            position: absolute;
            left: 10px; /* פינה שמאלית של הוילון */
            top: 50%;
            transform: translateY(-50%);
            width: 40px; /* רוחב קבוע לאייקון */
            opacity: 1; /* תמיד נראה */
            overflow: visible; /* שינוי ל-visible כדי לראות את הרשימה */
            display: flex;
            align-items: center; /* חזרה לסידור אופקי */
            border: 2px solid transparent; /* מסגרת שקופה בהתחלה */
            border-radius: 20px;
            z-index: 1000; /* הבטחת שהחיפוש יהיה מעל כל השאר */
        }

        .search-bar.active {
            width: 250px; /* הגדלת הרוחב */
            opacity: 1;
            border: 2px solid #D4AF37; /* מסגרת זהב כשהחיפוש פעיל */
            background-color: white; /* רקע לבן */
        }

        .search-bar.active input {
            opacity: 1; /* נראה כשהחיפוש פעיל */
            transform: scaleX(1); /* נראה כשהחיפוש פעיל */
        }

        .search-bar input {
            width: 100%;
            padding: 8px 12px;
            border: none; /* ללא מסגרת - המסגרת על הקונטיינר */
            border-radius: 0; /* ללא פינות מעוגלות - הפינות על הקונטיינר */
            font-size: 14px;
            background-color: transparent; /* רקע שקוף */
            color: #8B7355;
            outline: none;
            transition: all 0.3s ease;
            opacity: 0; /* מוסתר בהתחלה */
            transform: scaleX(0); /* מוסתר בהתחלה */
            transform-origin: left; /* מתחיל משמאל */
        }

        .search-bar input:focus {
            border-color: #B8860B;
            box-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
        }

        /* רשימת אפשרויות חיפוש */
        .search-suggestions {
            position: fixed !important; /* שינוי ל-fixed כדי להיות מעל הכל */
            top: 8vh !important; /* מתחת לניווט */
            left: 10px !important; /* באותו מקום כמו שדה החיפוש */
            right: auto !important;
            width: 250px !important; /* רוחב קבוע כמו שדה החיפוש */
            background: white !important; /* רקע לבן */
            border: 2px solid #D4AF37 !important; /* מסגרת זהב */
            border-radius: 15px !important;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15) !important;
            max-height: 200px !important;
            overflow-y: auto !important;
            z-index: 99999 !important; /* השכבה הגבוהה ביותר - מעל הכל */
            display: none !important;
        }

        .search-suggestions.show {
            display: block !important;
            position: fixed !important;
            z-index: 99999 !important;
        }

        .search-suggestion {
            padding: 12px 15px;
            cursor: pointer;
            border-bottom: 1px solid #f0f0f0; /* קו מפריד אפור בהיר */
            font-size: 14px;
            color: #2C1810; /* טקסט כהה וברור */
            background: white; /* רקע לבן */
        }

        .search-suggestion:hover {
            background: linear-gradient(135deg, #F5F5DC 0%, #E6E6D4 100%); /* רקע קרם רק ב-hover */
            color: #1A0F08; /* טקסט עוד יותר כהה */
        }

        .search-suggestion.highlighted {
            background: linear-gradient(135deg, #F5F5DC 0%, #E6E6D4 100%); /* רקע קרם גם במצב מודגש */
            color: #1A0F08; /* טקסט כהה */
        }

        .search-suggestion:last-child {
            border-bottom: none;
        }

        /* כאשר החיפוש פתוח - הזזת התפריט */
        .nav-menu.search-open {
            margin-left: 270px; /* הזזת התפריט ימינה יותר */
        }

        .nav-link { /* קישורי הניווט - פשוטים */
            color: #8B7355; /* צבע טקסט חום כהה */
            text-decoration: none; /* ביטול קו תחתון - לא יהיה קו תחתון */
            font-size: 1.2rem; /* גודל אותיות כמו באתר הדוגמה - 1.2rem */
            font-family: 'Frank Ruhl Libre', serif; /* גופן נפוץ ומודרני */
            cursor: pointer; /* סמן עכבר - הופך לכף יד כשעוברים מעל */
            font-weight: 500; /* משקל בינוני - לא כבד מדי */
            padding: 8px 15px; /* רווח פנימי קטן */
            background: transparent; /* רקע שקוף - לא יהיה רקע */
            border: none; /* ביטול מסגרת - לא יהיה מסגרת */
            position: relative; /* מיקום יחסי - לאפקטים */
        }

        .nav-link:hover { /* אפקט כשעוברים מעל הקישור */
            color: #B8860B; /* צבע זהב כהה */
        }

        .nav-link.active { /* קישור פעיל - הדף הנוכחי */
            color: #B8860B; /* צבע זהב כהה */
            text-decoration: none; /* ביטול קו תחתון רגיל */
            background-color: white; /* רקע לבן */
            border-radius: 0; /* פינות ישרות - 90 מעלות */
            padding: 6px 15px; /* רווח פנימי קטן יותר */
            height: 100%; /* גובה מלא של הוילון */
            min-height: 8vh; /* גובה מינימלי קטן יותר - לפי גובה הוילון החדש */
            width: auto; /* רוחב אוטומטי לפי התוכן */
            display: flex; /* סידור גמיש */
            align-items: center; /* מרכוז אנכי */
            justify-content: center; /* מרכוז אופקי */
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* צל יפה לכפתור */
            border-top: 2px solid #B8860B; /* מסגרת זהב למעלה */
            border-bottom: 2px solid #B8860B; /* מסגרת זהב למטה */
            border-left: none; /* ללא מסגרת בצד שמאל */
            border-right: none; /* ללא מסגרת בצד ימין */
            font-weight: 600; /* משקל אותיות בינוני-כבד */
            box-sizing: border-box; /* כולל padding ו-border בגודל */
        }

        .nav-link.active:hover { /* אפקט כשעוברים מעל הכפתור הפעיל */
            transform: none; /* ללא הרמה */
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* צל קבוע */
            background-color: white; /* רקע לבן קבוע */
        }

        .page { /* כל הדפים באתר - דפים נסתרים בהתחלה */
            display: none; /* נסתר בהתחלה - לא נראה עד שמפעילים */
            min-height: auto; /* גובה אוטומטי - יתאים את עצמו לתוכן */
            padding-top: calc(8vh + 2px); /* רווח עליון מינימלי - רק גובה הניווט + 2px */
            width: 100%; /* רוחב מלא */
            max-width: 100%; /* רוחב מקסימלי מלא */
            overflow-x: hidden; /* מניעת גלילה אופקית */
            box-sizing: border-box; /* כולל padding ו-border בגודל */
        }

        .page.active-page { /* דף פעיל - הדף שנראה כרגע */
            display: block; /* נראה - הדף מוצג */
        }

        #home-page { /* דף הבית - חריגה מהכלל */
            padding-top: 0; /* ביטול רווח עליון - דף הבית מתחיל מהקצה */
        }

        #home-page.active-page { /* דף הבית פעיל */
            display: block; /* נראה - הדף מוצג */
        }

        .page-content { /* תוכן הדפים - הקופסאות הלבנות עם התוכן */
            max-width: 94%; /* רוחב מקסימלי - לא יעבור את רוחב המסך */
            margin: 12px auto; /* רווח של 12 פיקסלים למעלה ולמטה, מרכוז אופקי */
            padding: 20px; /* רווח פנימי - 20 פיקסלים מכל הצדדים */
            background-color: #F5F5DC; /* רקע לבן-קרם כמו הניווט */
            border-radius: 15px; /* פינות מעוגלות - נותן מראה רך */
            box-shadow: 0 12px 25px rgba(0, 0, 0, 1.0), 0 6px 12px rgba(0, 0, 0, 0.9); /* צל כפול - נותן עומק */
            border: 2px solid #D4AF37; /* מסגרת זהב */
            width: 94%; /* רוחב 94% - תופס 94% מהרוחב הזמין */
            box-sizing: border-box; /* כולל padding ו-border בגודל */
            overflow-x: hidden; /* מניעת גלילה אופקית */
        }

        .page-content h1 {
            color: #D4AF37; /* צבע זהב */
            text-align: center;
            font-size: 3rem;
            margin-bottom: 15px;
            font-weight: bold;
            font-family: 'Frank Ruhl Libre', serif;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            opacity: 0; /* התחלה שקופה לאנימציה */
            transform: translateY(-50px); /* התחלה מלמעלה */
        }

        .page-content h2 {
            color: #D4AF37; /* צבע זהב */
            text-align: center;
            font-size: 3rem;
            margin-bottom: 15px;
            font-weight: bold;
            font-family: 'Frank Ruhl Libre', serif;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            opacity: 0; /* התחלה שקופה לאנימציה */
            transform: translateY(-50px); /* התחלה מלמעלה */
        }

        .page-content h3 {
            color: #B8860B; /* צבע זהב כהה יותר */
            font-size: 2.5rem;
            font-weight: bold;
            font-family: 'Frank Ruhl Libre', serif;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
            opacity: 0; /* התחלה שקופה לאנימציה */
            transform: translateY(-40px); /* התחלה מלמעלה */
        }

        .page-content p {
            font-size: 1.2rem;
            line-height: 1.35;
            color: #8B7355;
            text-align: right;
            font-weight: bold;
            font-family: 'Frank Ruhl Libre', serif;
            margin: 6px 0;
            opacity: 0; /* התחלה שקופה לאנימציה */
            transform: translateY(-30px); /* התחלה מלמעלה */
        }

        .info-grid,
        .contact-info {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            margin: 20px auto;
            padding: 0 40px;
            gap: 40px;
        }

        .contact-info {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            margin: 20px auto;
            padding: 0 20px;
            gap: 15px;
        }

        .info-card,
        .contact-card {
            background-color: #F5F5DC; /* רקע לבן-קרם כמו הניווט */
            padding: 25px;
            border-radius: 15px;
            color: #8B7355;
            text-align: center;
            flex: 1;
            height: 380px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            box-shadow: 0 12px 25px rgba(0, 0, 0, 1.0), 0 6px 12px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.2);
            box-sizing: border-box;
            flex-shrink: 0;
            margin: 0;
            border: 2px solid #D4AF37; /* מסגרת זהב */
            opacity: 0; /* התחלה שקופה לאנימציה */
            transform: translateY(-60px) scale(0.95); /* התחלה מלמעלה */
        }

        /* עיצוב מיוחד להסכמות - כרטיסיות מעוגלות עם צל יפה */
        .agreements-section {
            background-color: #F0F0E6; /* רקע קרם בהיר כמו בתמונה */
            padding: 40px 20px;
            margin: 30px auto;
            max-width: 95%;
            overflow: hidden; /* מונע גלילה אופקית */
        }

        .agreements-title {
            color: #2C1810; /* צבע כהה מאוד כמו בתמונה */
            font-family: 'Frank Ruhl Libre', serif;
            font-size: 2.5rem;
            font-weight: 700;
            text-align: center;
            margin-bottom: 40px;
            text-shadow: none;
            opacity: 0; /* התחלה שקופה לאנימציה */
            transform: translateY(-80px); /* התחלה מלמעלה */
        }

        .agreements-grid {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: flex-start;
            gap: 30px;
            padding: 20px 0;
        }

        .agreement-card {
            background-color: #F5F5DC; /* רקע קרם בהיר */
            border-radius: 12px; /* פינות מעוגלות יפות */
            padding: 15px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(0, 0, 0, 0.1); /* צל יפה שמעלה את הכרטיסיה */
            border: 1px solid rgba(212, 175, 55, 0.2); /* מסגרת עדינה */
            transition: all 0.3s ease;
            max-width: 350px;
            flex: 0 1 auto;
            position: relative;
            overflow: hidden;
            opacity: 0; /* התחלה שקופה לאנימציה */
            transform: translateY(-60px) scale(0.95); /* התחלה מלמעלה */
        }

        .agreement-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2), 0 6px 16px rgba(0, 0, 0, 0.15);
        }

        .agreement-card img {
            width: 100%;
            height: auto;
            display: block;
            border-radius: 8px;
            background-color: #ffffff;
        }

        /* עיצוב רספונסיבי להסכמות */
        @media (max-width: 768px) {
            .agreements-grid {
                flex-direction: column;
                align-items: center;
            }

            .agreement-card {
                max-width: 100%;
                width: 100%;
            }

            .agreements-title {
                font-size: 2rem;
            }
        }

        .info-card h3,
        .contact-card h3 {
            font-size: 40px; /* הקטנה מ-50px */
            margin-bottom: 10px;
            color: #D4AF37; /* צבע זהב */
            font-family: 'Frank Ruhl Libre', serif;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .info-card h2,
        .contact-card h2 {
            font-size: 40px; /* הקטנה מ-50px */
            margin-bottom: 10px;
            color: #D4AF37; /* צבע זהב */
            font-family: 'Frank Ruhl Libre', serif;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .info-card p,
        .contact-card p {
            font-size: 28px; /* הקטנה מ-35px */
            color: #8B7355;
            text-align: center;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
            line-height: 1.3;
            margin: 5px 0;
            font-family: 'Frank Ruhl Libre', serif;
        }

        .Quote-1 {
            background-color: #D4AF37;
            padding: 25px;
            border-radius: 15px;
            color: #8B7355;
            text-align: center;
            width: 380px;
            height: 380px;
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            box-shadow: 0 12px 25px rgba(0, 0, 0, 1.0), 0 6px 12px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.2);
            box-sizing: border-box;
            flex-shrink: 0;
            margin: 0;
        }

        .contact-card h4 {
            font-size: 20px; /* הקטנה מ-24px */
            margin: 8px 0;
            color: #8B7355;
            line-height: 1.2;
        }

        .contact-card p[onclick] {
            font-size: 24px !important; /* הקטנה מ-28px */
            margin: 8px 0;
        }

        .schedule {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }

        .day-schedule {
            background-color: #B8860B;
            padding: 20px;
            border-radius: 15px;
            color: #F5F5DC;
            box-shadow: 0 12px 25px rgba(0, 0, 0, 1.0), 0 6px 12px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .day-schedule h3 {
            color: #F5F5DC;
            text-align: center;
            margin-bottom: 10px;
            font-size: 36px; /* הקטנה מ-45px */
            font-family: 'Frank Ruhl Libre', serif;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .day-schedule ul {
            list-style: none;
            padding: 0;
        }

        .day-schedule li {
            padding: 8px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.4);
            text-align: right;
            font-size: 36px; /* הקטנה מ-45px */
            font-weight: bold;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        }

        .opening-hours {
            background-color: #D4AF37;
            padding: 20px;
            border-radius: 15px;
            color: #8B7355;
            text-align: center;
            margin-top: 20px;
            box-shadow: 0 12px 25px rgba(0, 0, 0, 1.0), 0 6px 12px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .opening-hours h1 {
            font-size: 32px; /* הקטנה מ-50px */
            margin-bottom: 10px;
            color: #8B7355;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .opening-hours h3 {
            font-size: 32px; /* הקטנה מ-50px */
            margin-bottom: 10px;
            color: #8B7355;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .opening-hours p {
            font-size: 27px; /* הקטנה מ-40px */
            color: #8B7355;
            text-align: center;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        }

        /* עיצוב מיוחד לכרטיסיה של מדיניות ופרטיות */
        .privacy-policy-card {
            background: #ffffff !important;
            border: 2px solid #D4AF37 !important;
            border-radius: 15px !important;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1) !important;
            padding: 40px !important;
            margin: 30px auto !important;
            max-width: 95% !important;
            color: #333333 !important;
        }

        .privacy-policy-card h2 {
            color: #D4AF37 !important;
            font-size: 32px !important;
            text-align: center !important;
            margin-bottom: 15px !important;
            font-weight: 700 !important;
            border-bottom: 3px solid #D4AF37 !important;
            padding-bottom: 15px !important;
        }

        .privacy-policy-card .subtitle {
            text-align: center !important;
            color: #666666 !important;
            font-size: 18px !important;
            margin: 0 0 25px 0 !important;
            font-weight: 400 !important;
        }

        .privacy-policy-card .content-inner {
            line-height: 1.8 !important;
            color: #333333 !important;
            font-size: 1rem !important;
            background: #fafafa !important;
            padding: 30px !important;
            border-radius: 10px !important;
            border: 1px solid #e0e0e0 !important;
        }

        .privacy-policy-card h4 {
            color: #ffffff !important;
            margin: 25px 0 15px 0 !important;
            font-size: 20px !important;
            font-weight: 700 !important;
            padding: 12px 20px !important;
            background: linear-gradient(135deg, #D4AF37, #B8860B) !important;
            border: none !important;
            border-radius: 8px !important;
            text-align: right !important;
            box-shadow: 0 4px 10px rgba(212, 175, 55, 0.3) !important;
        }

        .privacy-policy-card .intro h4 {
            background: linear-gradient(135deg, #D4AF37, #B8860B) !important;
            border: none !important;
            box-shadow: 0 4px 10px rgba(212, 175, 55, 0.3) !important;
            margin: 15px 0 10px 0 !important;
        }

        .privacy-policy-card p {
            margin: 10px 0 !important;
            color: #444444 !important;
            text-align: right !important;
            font-size: 16px !important;
            line-height: 1.7 !important;
        }

        .privacy-policy-card ul {
            margin: 15px 0 !important;
            padding-right: 20px !important;
            list-style: none !important;
        }

        .privacy-policy-card li {
            margin: 10px 0 !important;
            padding: 12px 18px !important;
            background: #f5f5f5 !important;
            border-right: 4px solid #D4AF37 !important;
            border-radius: 8px !important;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05) !important;
            text-align: right !important;
            color: #8B7355 !important;
            font-size: 16px !important;
            line-height: 1.2 !important;
        }

        .privacy-policy-card .contact-box {
            background: linear-gradient(135deg, #B8860B, #D4AF37) !important;
            padding: 25px !important;
            border-radius: 15px !important;
            margin-top: 25px !important;
            box-shadow: 0 10px 25px rgba(184, 134, 11, 0.3) !important;
            border: 2px solid #ffffff !important;
        }

        .privacy-policy-card .contact-box p {
            margin: 0 !important;
            color: white !important;
            font-weight: 700 !important;
            font-size: 1.1rem !important;
            text-align: center !important;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.3) !important;
        }

                    .content-box {
                background-color: #F0F0E6;
                padding: 30px;
                border-radius: 15px;
                color: #333333;
                text-align: right;
                width: 95% !important;
                max-width: 95% !important;
                overflow: visible !important;
                height: auto !important;
                min-height: fit-content !important;
                max-height: none !important;
                display: flex !important;
                flex-direction: column !important;
                gap: 20px !important;
                margin: 20px auto !important;
                box-sizing: border-box !important;
                box-shadow: 0 12px 25px rgba(0, 0, 0, 1.0), 0 6px 12px rgba(0, 0, 0, 0.9);
            }

        .content-box p {
            font-size: 25px;
            line-height: 1.3;
            font-weight: bold;
            font-family: 'Frank Ruhl Libre', serif;
            color: #333333;
            margin: 5px 0;
        }

        /* עיצוב בסיסי לכל הכותרות */
        .content-box p.title {
            text-align: center; /* מרכוז הטקסט במרכז הכרטיסיה */
            font-size: 35px; /* גודל האותיות - גדול וברור */
            margin-bottom: 8px; /* רווח של 8 פיקסלים מתחת לכותרת */
            font-weight: bold; /* אותיות מודגשות וחזקות */
            font-family: 'Frank Ruhl Libre', serif; /* פונט עברי יפה */
            position: relative; /* מיקום יחסי - הכותרת יכולה לזוז */
            padding: 10px 5px; /* רווח פנימי - 10 פיקסלים למעלה ולמטה, 5 מהצדדים */
            text-align: center; /* מרכוז נוסף - וידוא שהטקסט במרכז */
            border-radius: 5px; /* פינות מעוגלות - נותן מראה רך */
            width: 100%; /* רוחב מלא - הכותרת תופסת את כל הרוחב */
            box-sizing: border-box; /* חישוב גודל כולל padding - מונע בעיות גודל */
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); /* צל לטקסט - נותן עומק */
        }

        /* אפקטים מיוחדים רק לכותרות הראשיות - כמו "הגר"א סאלים" */
        .content-box p.title:first-of-type {
            background: linear-gradient(90deg, #D4AF37, #B8860B, #8B7355); /* גרדיאנט זהוב יפה על הטקסט עצמו */
            -webkit-background-clip: text; /* הגבלת הגרדיאנט לטקסט בלבד - תאימות לדפדפנים ישנים */
            -webkit-text-fill-color: transparent; /* הטקסט שקוף כדי שהגרדיאנט הזהוב ייראה */
            background-clip: text; /* הגבלת הגרדיאנט לטקסט בלבד - תאימות לכל הדפדפנים */
            color: transparent; /* צבע הטקסט שקוף - הגרדיאנט ייראה במקום הצבע הרגיל */
            opacity: 0; /* הכותרת שקופה בהתחלה - לא נראית עד שמגיעים אליה */
            transform: translateX(-100px); /* הכותרת מחוץ למסך משמאל - נכנסת מהצד */
            transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94); /* אנימציה חלקה ונעימה של 0.8 שניות */
        }

        /* כשהכותרת נראית במסך - המשתמש גלל אליה */
        .content-box p.title:first-of-type.text-visible {
            opacity: 1; /* הכותרת נראית - השקיפות נעלמת */
            transform: translateX(0); /* הכותרת במקומה הנכון - לא מחוץ למסך */
            /* animation: titlePop 0.6s ease 0.2s both; */ /* אפקט קפיצה - הוסר */
        }

        .title-box {
            background-color: #8B7355;
            padding: 15px;
            border-radius: 15px;
            color: white;
            text-align: center;
            margin: 20px auto;
            max-width: 90%;
            box-shadow: 0 12px 25px rgba(0, 0, 0, 1.0), 0 6px 12px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .title-box h2 {
            font-size: 50px; /* הקטנה מ-62px */
            font-weight: bold;
            margin: 0;
            color: white;
            font-family: 'Frank Ruhl Libre', serif;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .hero-section {
            position: relative;
            width: 100vw;  /* רוחב מלא של המסך */
            max-width: 100%;
            height: calc(100vh - 8vh);
            margin: 0;
            padding: 0;
            margin-top: 0; /* ללא רווח עליון */
            overflow: hidden;  /* מונע יציאה מהצדדים */
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            z-index: 100; /* מעל כל השכבות */
            top: 0;
            left: 0;
        }


        .background-images {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: 10; /* מעל השכבות התחתונות */
            overflow: hidden;  /* מונע יציאה מהצדדים */
            background: transparent;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        /* המצגת תהיה רק בדף הבית */
        .page:not(#home-page) .background-images {
            display: none; /* הסתרת המצגת בדפים אחרים */
        }

        .page:not(#home-page) .hero-section {
            display: none; /* הסתרת ה-hero-section בדפים אחרים */
        }

        /* כרטיסיה אלכסונית מעל המצגת */
        .diagonal-card {
            position: absolute;
            top: 8.5vh;
            left: 50vw;
            width: 10vw;
            height: 80vh;
            z-index: 1002; /* מעל הכרטיסיה הקרם */
            overflow: hidden;
            pointer-events: none; /* לא יפריע לאינטראקציה עם המצגת */
            opacity: 1; /* שקיפות מלאה */
        }

        .diagonal-left-section {
            position: absolute;
            width: 100%;
            height: 100%;
            background: transparent;
            clip-path: polygon(0 0, 70% 0, 20% 100%, 0 100%);
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .diagonal-right-section {
            position: absolute;
            width: 100%;
            height: 100%;
            background: #F5F5DC;
            clip-path: polygon(70% 0, 100% 0, 100% 100%, 20% 100%);
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .diagonal-text {
            font-size: 2em;
            font-weight: bold;
            text-align: center;
            margin: 0;
            padding: 0;
        }

        .diagonal-left-section .diagonal-text {
            color: white;
        }

        .diagonal-right-section .diagonal-text {
            color: black;
        }

        /* למסגרת */
        .slideshow-container {
            position: absolute;
            width: 60vw;  /* רוחב יותר רחב */
            max-width: 60vw;
            height: 80vh; /* גובה יותר גבוה */
            top: 8vh; /* ממש מתחת לוילון הניווט */
            left: -20px; /* התמונות יכנסו שמאלה מתחת לשולי האתר */
            margin: 0;
            padding: 0; /* ללא רווח פנימי */
            overflow: hidden;  /* מונע יציאה מהצדדים */
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
            border: none; /* ללא מסגרת */
            border-radius: 20px; /* פינות מעוגלות יותר */
            box-shadow: none; /* ללא צל */
            z-index: 999; /* מתחת לקונטינר האלכסוני אבל מעל שאר השכבות */
            /* מסכה מהצדדים */
            mask: radial-gradient(ellipse 80% 100% at center, black 50%, transparent 75%);
            -webkit-mask: radial-gradient(ellipse 80% 100% at center, black 50%, transparent 75%);
        }

        .slide {
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0;
            transform: translateX(-100%); /* התמונות מתחילות משמאל */
            transition: transform 0.6s ease-in-out, opacity 0.3s ease-in-out;
            display: flex;
            align-items: center;
            justify-content: center;
            top: 0;
            left: 0;
        }

        .slide.active {
            opacity: 1;
            transform: translateX(0); /* התמונה הפעילה במרכז */
        }

        .slide.prev {
            opacity: 1;
            transform: translateX(100%); /* התמונה הקודמת נדחפת ימינה */
        }

        .slide.next {
            opacity: 0;
            transform: translateX(-100%); /* התמונה הבאה משמאל (מוסתרת) */
        }

        /* לתמונות */
        .slide img {
            width: 100%;
            height: 100%;
            object-fit: cover;  /* התמונה תתאים למסגרת עם חיתוך */
            display: block;  /* מונע רווח מתחת לתמונה */
            object-position: center left; /* התמונה תתחיל מהצד השמאלי */
            border-radius: 0;
            box-shadow: none;
            transform: scale(1);
            transition: none;
        }

        /* הסרת אנימציות מיותרות */

        .full-width-card {
            width: 100%;
            height: 100vh;
            background: linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #B8860B 100%);
            padding: 0;
            margin: 0;
            display: flex;
            align-items: center;
            position: relative;
            overflow: hidden;
        }

        .card-content {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            position: relative;
        }

        .left-section {
            flex: 1;
            padding: 60px;
            z-index: 2;
        }

        .right-section {
            flex: 1;
            position: relative;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .orange-blob {
            width: 400px;
            height: 400px;
            background: linear-gradient(135deg, #F97316 0%, #EA580C 50%, #DC2626 100%);
            border-radius: 50%;
            position: absolute;
            right: -100px;
            top: 50%;
            transform: translateY(-50%);
            z-index: 1;
            box-shadow: 0 20px 40px rgba(249, 115, 22, 0.3);
        }

        .card-content h2 {
            font-size: 4em;
            color: white;
            margin-bottom: 30px;
            font-family: 'Frank Ruhl Libre', serif;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
            line-height: 1.2;
        }

        .card-content p {
            font-size: 1.8em;
            color: white;
            line-height: 1.6;
            margin-bottom: 40px;
            font-family: 'Frank Ruhl Libre', serif;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
        }

        .cta-button {
            background: linear-gradient(45deg, #D4AF37, #8B7355);
            color: white;
            padding: 20px 40px;
            border: none;
            border-radius: 50px;
            font-size: 1.5em;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
            transition: all 0.3s ease;
            font-family: 'Frank Ruhl Libre', serif;
        }

        .cta-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 30px rgba(59, 130, 246, 0.4);
        }


        .right-text {
            position: absolute;
            top: 50%;
            right: 20%;
            transform: translate(50%, -50%);
            color: #8B7355;
            font-size: 3em;
            font-weight: bold;
            text-align: center;
            z-index: 2;
            font-family: 'Frank Ruhl Libre', serif;
        }

        /* הסרת מסכה מיותרת נוספת */

        .grid-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center center;
            border: none;
            border-radius: 0;
            box-sizing: border-box;
        }

        /* כרטיסיה לרוחב כל המסך */
        .full-width-card {
            width: 100vw;
            margin-left: calc(-50vw + 50%);
            background: linear-gradient(135deg, #D4AF37 0%, #B8860B 50%, #8B7355 100%);
            padding: 60px 0;
            margin: 0;
            display: flex;
            align-items: center;
            position: relative;
            overflow: hidden;
            box-sizing: border-box;
        }

        .card-content {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 40px;
            display: flex;
            align-items: center;
            position: relative;
            z-index: 2;
        }

        .left-section {
            flex: 1;
            padding-right: 40px;
        }

        .right-section {
            flex: 1;
            position: relative;
            height: 400px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .card-content h2 {
            font-size: 3.5em;
            color: white;
            margin-bottom: 30px;
            font-family: 'Frank Ruhl Libre', serif;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
            line-height: 1.2;
        }

        .card-content p {
            font-size: 1.6em;
            color: white;
            line-height: 1.6;
            margin-bottom: 40px;
            font-family: 'Frank Ruhl Libre', serif;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
        }

        .cta-button {
            background: linear-gradient(45deg, #D4AF37, #B8860B);
            color: white;
            padding: 20px 40px;
            border: none;
            border-radius: 50px;
            font-size: 1.5em;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 10px 20px rgba(212, 175, 55, 0.3);
            transition: all 0.3s ease;
            font-family: 'Frank Ruhl Libre', serif;
        }

        .cta-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 30px rgba(212, 175, 55, 0.4);
        }

        /* כרטיסיה לרוחב כל המסך בצבע הבסיס */
        .top-full-width-card {
            width: 100vw;
            margin-left: calc(-50vw + 50%);
            background-color: #F0F0E6; /* צבע הבסיס של האתר */
            padding: 0;
            margin: 0;
            height: 20px; /* גובה נמוך מאוד */
            display: flex;
            align-items: center;
            position: relative;
            overflow: visible; /* כדי שהצל יהיה נראה */
            box-sizing: border-box;
            z-index: 10; /* מעל המצגת */
            border-bottom: 3px solid rgba(240, 240, 230, 0.9); /* מסגרת רכה */
            filter: drop-shadow(0 20px 40px rgba(240, 240, 230, 0.8)) drop-shadow(0 10px 20px rgba(240, 240, 230, 0.6)); /* צל עם filter */
        }

        .top-card-content {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 40px;
            display: flex;
            align-items: center;
            position: relative;
            z-index: 2;
        }

        .top-left-section {
            flex: 1;
            padding-right: 40px;
        }

        .top-right-section {
            flex: 1;
            position: relative;
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .top-card-content h2 {
            font-size: 2em;
            color: #333333;
            margin-bottom: 10px;
            font-family: 'Frank Ruhl Libre', serif;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
            line-height: 1.2;
        }

        .top-card-content p {
            font-size: 1.1em;
            color: #8B7355;
            line-height: 1.4;
            margin-bottom: 15px;
            font-family: 'Frank Ruhl Libre', serif;
        }

        .top-cta-button {
            background: linear-gradient(45deg, #D4AF37, #B8860B);
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 50px;
            font-size: 1em;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 6px 12px rgba(212, 175, 55, 0.3);
            transition: all 0.3s ease;
            font-family: 'Frank Ruhl Libre', serif;
        }

        .top-cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 24px rgba(212, 175, 55, 0.4);
        }

        .hero-title {
            position: absolute;
            top: 40%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 20vw;
            font-family: 'Frank Ruhl Libre', serif;
            background: linear-gradient(45deg, #D4AF37, #B8860B, #8B7355, #D4AF37);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            color: transparent;
            text-shadow: 0 0 30px rgba(212, 175, 55, 0.9), 0 0 50px rgba(184, 134, 11, 0.8), 0 0 70px rgba(139, 115, 85, 0.6);
            margin: 0;
            z-index: 2;
            font-weight: normal;
            white-space: nowrap;
            filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3));
        }

        /* אנימציה למילה המעלים בצד ימין */
        .hero-text-title {
            animation: fadeInUp 1.5s ease-out;
            animation-delay: 0.5s;
            animation-fill-mode: both;
        }

        .hero-text-subtitle {
            animation: fadeInUp 1.5s ease-out;
            animation-delay: 1s;
            animation-fill-mode: both;
        }

        .hero-text-description {
            animation: fadeInUp 1.5s ease-out;
            animation-delay: 1.5s;
            animation-fill-mode: both;
        }

        .hero-text-button {
            animation: fadeInUp 1.5s ease-out;
            animation-delay: 2s;
            animation-fill-mode: both;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* הסרת מסכה מיותרת */

        .cream-box-2 {
            position: relative;
            top: 0;
            left: 0;
            width: 100%;
            background-color: rgba(59, 130, 246, 0.95);
            border-radius: 20px 20px 20px 20px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding: 5px 5px 5px 5px;
            min-height: 450px;
            z-index: 4;
            box-sizing: border-box;
            backdrop-filter: blur(5px);
            box-shadow: 0 12px 25px rgba(0, 0, 0, 1.0), 0 6px 12px rgba(0, 0, 0, 0.9);
        }

        .leadership-section {
            width: 100%;
            margin-top: 12px;
        }

        .leadership-title {
            text-align: center;
            font-size: 64px; /* הקטנה מ-80px */
            font-weight: bold;
            color: white;
            margin-bottom: 20px;
            margin-top: 5px;
            text-shadow: 0 3px 6px rgba(0, 0, 0, 0.6);
            font-family: 'Frank Ruhl Libre', serif;
        }

        .leader-card {
            width: 97.5%;
            max-width: none;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            gap: 25px;
            background-color: #F0F0E6;
            border-radius: 15px;
            padding: 20px;
            margin: 0 auto 20px auto;
            box-shadow: 0 18px 35px rgba(0, 0, 0, 0.9), 0 10px 18px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.3);
            backdrop-filter: blur(10px);
        }

        .project-card {
            display: flex;
            align-items: center;
            gap: 25px;
            background-color: #F0F0E6;
            border-radius: 15px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.7), 0 8px 15px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3);
            backdrop-filter: blur(10px);
        }

        .project-image {
            flex: 0 0 450px;
            height: 450px;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
        }

        .project-image img {
            width: 400px;
            height: 400px;
            object-fit: cover;
            border-radius: 0px;
            border: 8px solid white;
            position: relative;
            z-index: 2;
            box-shadow: 0 18px 35px rgba(0, 0, 0, 0.6);
            mask: radial-gradient(circle at center, black 30%, rgba(0, 0, 0, 0.9) 40%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 0.6) 60%, rgba(0, 0, 0, 0.4) 70%, rgba(0, 0, 0, 0.2) 80%, transparent 90%);
            -webkit-mask: radial-gradient(circle at center, black 30%, rgba(0, 0, 0, 0.9) 40%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 0.6) 60%, rgba(0, 0, 0, 0.4) 70%, rgba(0, 0, 0, 0.2) 80%, transparent 90%);
        }

        .project-text {
            flex: 1;
            text-align: center;
            padding: 5px;
            margin-top: -15px;
        }

        .project-text h3 {
            font-size: 40px;
            color: white;
            margin: 0 0 8px 0;
            font-weight: bold;
            font-family: 'Frank Ruhl Libre', serif;
            position: relative;
            background: linear-gradient(90deg, #D4AF37, #B8860B, #8B7355);
            padding: 10px 5px;
            text-align: center;
            border-radius: 5px;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.5);
            width: 100%;
            box-sizing: border-box;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .project-text h4 {
            font-size: 36px;
            color: #B8860B;
            margin: 0 0 10px 0;
            font-weight: bold;
            text-align: center;
            font-family: 'Frank Ruhl Libre', serif;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        .project-text p {
            font-size: 20px;
            color: #333333;
            line-height: 1.35;
            margin: 4px 0;
            font-weight: bold;
            text-align: center;
            font-family: 'Frank Ruhl Libre', serif;
        }

        .project-text p.short-info {
            font-size: 28px;
            color: #333333;
            line-height: 1.5;
            margin: 0;
            font-weight: bold;
            text-align: center;
        }

        /* מיוחד לחלק "ותלמוד בידו" - נשאיר את הגדלים המקוריים */
        .project-text h3:has(+ div[style*="background-image"]) {
            font-size: 50px !important; /* נשאיר את הגודל המקורי */
        }

        .project-text div[style*="background-image"] h4 {
            font-size: 45px !important; /* נשאיר את הגודל המקורי */
        }

        .project-text div[style*="background-image"] p {
            font-size: 30px !important; /* נשאיר את הגודל המקורי */
        }

        .leader-text {
            flex: 1;
            text-align: center;
            padding: 5px;
            margin-top: -15px;
        }

        .leader-text h3 {
            font-size: 40px;
            color: white;
            margin: 0 0 8px 0;
            font-weight: bold;
            font-family: 'Frank Ruhl Libre', serif;
            position: relative;
            background: linear-gradient(90deg, #D4AF37, #B8860B, #8B7355);
            padding: 10px 5px;
            text-align: center;
            border-radius: 5px;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.5);
            width: 100%;
            box-sizing: border-box;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .leader-text h4 {
            font-size: 36px;
            color: #B8860B;
            margin: 0 0 10px 0;
            font-weight: bold;
            text-align: center;
            font-family: 'Frank Ruhl Libre', serif;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        .leader-text p {
            font-size: 20px;
            color: #333333;
            line-height: 1.35;
            margin: 4px 0;
            font-weight: bold;
            text-align: center;
            font-family: 'Frank Ruhl Libre', serif;
        }

        .leader-text p.short-info {
            font-size: 28px;
            color: #333333;
            line-height: 1.5;
            margin: 0;
            font-weight: bold;
            text-align: center;
        }

        .leader-image {
            flex: 0 0 450px;
            height: 450px;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
        }

        .leader-image img {
            width: 400px;
            height: 400px;
            object-fit: cover;
            border-radius: 0px;
            position: relative;
            z-index: 2;
            box-shadow: 0 18px 35px rgba(0, 0, 0, 0.6);
            mask: radial-gradient(circle at center, black 30%, rgba(0, 0, 0, 0.9) 40%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 0.6) 60%, rgba(0, 0, 0, 0.4) 70%, rgba(0, 0, 0, 0.2) 80%, transparent 90%);
            -webkit-mask: radial-gradient(circle at center, black 30%, rgba(0, 0, 0, 0.9) 40%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 0.6) 60%, rgba(0, 0, 0, 0.4) 70%, rgba(0, 0, 0, 0.2) 80%, transparent 90%);
        }

        .leader-image::before {
            content: '';
            position: absolute;
            width: 300px;
            height: 300px;
            background: transparent;
            z-index: 1;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        .leader-image::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            background: transparent;
            z-index: 3;
        }

        .riboim-wrapper div {
            width: 225px;
            height: 225px;
            border-radius: 15px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-size: 44px;
            font-weight: bold;
            color: white;
            background-color: rgba(59, 130, 246, 0.95);
            transition: all 0.3s ease;
            text-align: center;
            line-height: 0.9;
            padding: 5px;
            box-sizing: border-box;
            box-shadow: 0 12px 25px rgba(0, 0, 0, 1.0), 0 6px 12px rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(10px);
            cursor: pointer;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .riboim-wrapper div {
            position: relative;
            overflow: hidden;
            cursor: pointer;
        }

        .riboim-wrapper div:hover {
            background-color: #B8860B;
            color: white;
            transform: translateY(-4px) scale(1.05);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.8);
        }

        .riboim-wrapper div.flipped {
            background-color: #B8860B !important;
            color: white !important;
            transform: rotateY(180deg) scale(1.1);
            animation: flipToWhite 0.6s ease-in-out;
        }

        @keyframes flipToWhite {
            0% {
                transform: rotateY(0deg) scale(1);
                background-color: rgba(168, 48, 31, 0.95);
                color: white;
            }

            50% {
                transform: rotateY(90deg) scale(1.05);
            }

            100% {
                transform: rotateY(180deg) scale(1.1);
                background-color: white;
                color: #A8301F;
            }
        }

        .events-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }

        /* עיצוב מיוחד לכרטיסיות הקטנות בלבד */
        .events-grid .event-card {
            min-height: 450px;
            display: flex;
            flex-direction: column;
            position: relative;
            overflow: hidden;
        }

        /* התאמות מיוחדות לתמונות בדף האירועים - סידור יפה של תמונות האירועים */
        .events-page .leader-image div { /* מיכל התמונות בדף האירועים - סידור אנכי של התמונות */
            display: flex; /* סידור גמיש - התמונות יסתדרו יפה */
            flex-direction: column; /* סידור אנכי - תמונה אחת מתחת לשנייה */
            gap: 10px; /* רווח של 10 פיקסלים בין התמונות */
            height: 100%; /* גובה מלא - תופס את כל הגובה הזמין */
            justify-content: center; /* מרכוז אנכי - התמונות במרכז הגובה */
            align-items: center; /* מרכוז אופקי - התמונות במרכז הרוחב */
        }

        .events-page .leader-image div img { /* התמונות עצמן בדף האירועים - גודל וסגנון */
            width: 350px; /* רוחב קבוע - 350 פיקסלים */
            height: 175px; /* גובה קבוע - 175 פיקסלים - יחס של 2:1 */
            object-fit: cover; /* התאמת התמונה - התמונה תכסה את כל השטח בלי עיוות */
            border-radius: 5px; /* פינות מעוגלות - נותן מראה רך לתמונות */
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.4); /* צל - נותן עומק לתמונות */
        }









        /* תיקון רווחים במדור האירועים */
        .events-page {
            padding-top: 17vh !important;
            min-height: auto !important;
            height: auto !important;
        }

        .events-page .page-content {
            margin-top: 0 !important;
            margin-bottom: 20px !important;
        }

        .events-page .events-grid {
            margin-top: 20px !important;
            margin-bottom: 20px !important;
        }

        .full-event-card {
            padding-top: 20px !important;
            margin-top: 0 !important;
        }

        /* עיצוב לכרטיסיות אירועים - כפתור בגובה קבוע - הוסר כפילות */

        /* עיצוב כפתורים לכרטיסיות רגילות */


        /* הגבלת הצגת כרטיסיות מלאות רק למדור האירועים */
        .full-event-card {
            display: none;
        }

        /* כרטיסיות מלאות יוצגו רק במדור האירועים כשהן פעילות */
        .events-page.active-page .full-event-card[style*="display: block"] {
            display: block !important;
            position: relative !important;
            z-index: 10 !important;
            opacity: 1 !important;
            visibility: visible !important;
        }

        .full-event-card[style*="display: block"] {
            display: block !important;
            position: relative !important;
            z-index: 10 !important;
            opacity: 1 !important;
            visibility: visible !important;
        }

        /* תיקון נוסף לכרטיסיות מלאות */
        .full-event-card {
            background-color: rgba(219, 234, 254, 0.95);
            border-radius: 15px;
            box-shadow: 0 12px 25px rgba(0, 0, 0, 1.0), 0 6px 12px rgba(0, 0, 0, 0.9);
            margin: 20px auto;
            padding: 25px;
            max-width: 95%;
            width: 95%;
            height: auto;
            overflow: visible;
            position: relative;
            z-index: 10;
            display: block;
            box-sizing: border-box;
        }

        /* תיקון לתוכן הכרטיסיות המלאות */
        .full-event-card .leader-text {
            width: 100%;
            max-width: 100%;
            height: auto;
            overflow: visible;
            display: block;
            margin: 0;
            padding: 0;
        }

        /* וידוא שכרטיסיות מלאות לא יוצגו במדורים אחרים */
        .page:not(.events-page) .full-event-card,
        .page:not(.active-page) .full-event-card {
            display: none !important;
        }

        /* תיקון נוסף למניעת רווחים מיותרים */
        .full-event-card[style*="display: none"] {
            height: 0 !important;
            overflow: hidden !important;
            margin: 0 !important;
            padding: 0 !important;
            display: none !important;
        }

        /* מניעת רווחים מיותרים בכרטיסיות פעילות */
        .full-event-card:not([style*="display: none"]) {
            margin-bottom: 0 !important;
            padding-bottom: 30px !important;
        }

        /* תיקון למיכל האירועים */
        .events-page {
            padding-bottom: 0 !important;
        }

        /* אנימציות חלקות וזורמות */
        @keyframes smoothFadeIn {
            0% {
                opacity: 0;
                transform: translateY(30px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes smoothSlideIn {
            0% {
                opacity: 0;
                transform: translateX(50px);
            }
            100% {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes gentleGlow {
            0%, 100% {
                text-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            }
            50% {
                text-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
            }
        }

        /* אפקט חלק לכותרת הראשית */
        #amalim-title {
            animation: smoothFadeIn 1.5s ease-out 0.3s forwards, gentleGlow 3s ease-in-out 2s infinite;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* אפקט חלק לכותרת המשנה */
        #subtitle1 {
            animation: smoothSlideIn 1.2s ease-out 1s forwards;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        #subtitle2 {
            animation: smoothSlideIn 1.2s ease-out 1.3s forwards;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* אפקט hover חלק */
        #amalim-title:hover {
            transform: scale(1.02);
            text-shadow: 0 0 25px rgba(0, 0, 0, 0.5);
        }

        #subtitle1:hover, #subtitle2:hover {
            transform: translateX(-5px);
            text-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
        }

        /* עיצוב מדור מכתבים - סגנון כרטיסיות כמו הגמח המרכזי, בצבעי האתר */
        .letters-section-wrapper {
            background-color: #ffffff;
            border: 1px solid rgba(212, 175, 55, 0.3);
            border-radius: 12px;
            box-shadow: 0 0 12px rgba(139, 115, 85, 0.18);
            max-width: 1206px;
            margin: 30px auto 50px;
            padding: 40px;
        }

        .letters-grid {
           display: grid;
           grid-template-columns: repeat(3, 1fr); /* 3 עמודות */
           gap: 40px; /* הגדלתי את המרווח בין הכרטיסיות מ-30px ל-40px */
           padding: 0 50px; /* מרווח של 50 פיקסלים מהצדדים של המסך */
           margin-top: 30px; /* מרווח מהכותרת שמעל */
           margin-bottom: 50px; /* מרווח מהפוטר שמתחת */
        }

        .letter-card {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
            min-height: 349px;
            text-decoration: none;
            color: inherit;
            cursor: pointer;
            transition: transform 0.3s ease;
        }

        .letter-card:hover {
            transform: translateY(-3px);
        }

        .letter-card-preview {
            position: relative;
            min-height: 280px;
            border: 1px solid rgba(212, 175, 55, 0.45);
            border-radius: 12px;
            overflow: hidden;
            background-color: #ffffff;
            padding: 5px;
            transition: box-shadow 0.3s ease;
        }

        .letter-card-preview img {
            width: 100%;
            height: 280px;
            object-fit: cover;
            object-position: top center;
            border-radius: 8px;
            display: block;
            background-color: #F5F5DC;
        }

        .letter-card-preview-link {
            text-decoration: none;
            display: block;
        }

        .letter-card-preview iframe {
            width: 100%;
            height: 280px;
            border: none;
            display: block;
            border-radius: 8px;
            background-color: #F5F5DC;
            pointer-events: none;
        }

        .letter-card-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 8px 20px;
            justify-content: flex-end;
        }

        .letter-card-download {
            font-size: 16px;
            font-weight: 400;
            font-family: 'Frank Ruhl Libre', serif;
            color: #8B7355;
            text-decoration: underline;
            line-height: 1.4;
        }

        .letter-card-download:hover {
            color: #B8860B;
        }

        .letter-card:hover .letter-card-preview {
            box-shadow: 0 4px 16px rgba(212, 175, 55, 0.28);
        }

        .letter-card:hover .letter-card-preview::after {
            content: '';
            position: absolute;
            inset: 0;
            background-color: rgba(139, 115, 85, 0.12);
            border-radius: 12px;
            pointer-events: none;
        }

        .letter-card-title {
            font-size: 20px;
            font-weight: 700;
            font-family: 'Frank Ruhl Libre', serif;
            color: #2C1810;
            line-height: 1.4;
            text-align: right;
            margin: 0;
        }

        .letter-card-subtitle {
            font-size: 14px;
            font-weight: 400;
            font-family: 'Frank Ruhl Libre', serif;
            color: #8B7355;
            line-height: 1.3;
            margin: 0;
            text-align: right;
        }

        .letter-card-view {
            font-size: 16px;
            font-weight: 400;
            font-family: 'Frank Ruhl Libre', serif;
            color: #B8860B;
            text-decoration: underline;
            line-height: 1.4;
            text-align: right;
        }

        .letter-card:hover .letter-card-view {
            color: #8B7355;
        }

        @media (max-width: 1024px) {
            .letters-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        @media (max-width: 768px) {
            .letters-section-wrapper {
                padding: 15px;
                margin: 15px 10px 40px;
            }

            .letters-grid {
                grid-template-columns: 1fr;
                gap: 24px;
            }

            .letter-card {
                min-height: 310px;
            }

            .letter-card-preview {
                min-height: 241px;
            }

            .letter-card-preview img {
                height: 241px;
            }

            .letter-card-preview iframe {
                height: 241px;
            }

            .letter-card-title {
                font-size: 18px;
            }

            .letter-card-subtitle {
                font-size: 13px;
            }

            .letter-card-view {
                font-size: 15px;
            }
        }

        /* וידוא שה-footer יופיע בכל הדפים */
        footer.footer {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            position: relative !important;
            z-index: 1 !important;
            order: 9999; /* יופיע בסוף */
        }

        /* Footer מקצועי */
        .footer {
            background: linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%);
            color: #D4AF37;
            font-family: 'Frank Ruhl Libre', serif;
            padding: 25px 0;
            position: relative;
            z-index: 1;
            display: block !important;
            visibility: visible !important;
            margin-top: auto;
            border-radius: 0;
            overflow: hidden;
            clear: both;
            width: 100%;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        .footer-content {
            display: flex;
            justify-content: center;
            gap: 80px;
            margin-bottom: 20px;
        }

        .footer-section h3 {
            color: #D4AF37;
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 12px;
            text-align: center;
        }
        
        .footer-section p {
            font-size: 1.2rem;
            line-height: 1.4;
            margin-bottom: 8px;
        }
        
        .contact-item {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 6px;
            font-size: 1.2rem;
        }
        
        .contact-item span:first-child {
            font-size: 1.3rem;
        }
        
        .email-link {
            color: #D4AF37;
            text-decoration: none;
            transition: color 0.3s ease;
        }
        
        .email-link:hover {
            color: #FFD700;
            text-shadow: 0 0 5px rgba(255, 215, 0, 0.5);
        }

        .footer-section p {
            color: #F5DEB3;
            font-size: 14px;
            line-height: 1.4;
            text-align: center;
            margin-bottom: 8px;
        }

        .contact-item {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 6px;
            color: #F5DEB3;
            font-size: 14px;
            justify-content: flex-start;
            padding: 8px 12px;
            border-radius: 8px;
            transition: all 0.3s ease;
            cursor: pointer;
        }

        .contact-item:hover {
            background-color: rgba(212, 175, 55, 0.2);
            border: 2px solid #D4AF37;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
        }

        .contact-item span:last-child {
            font-weight: 500;
        }

        .contact-item span:first-child {
            font-size: 16px;
            width: 18px;
            text-align: center;
            transition: all 0.3s ease;
        }

        .contact-item:hover span:first-child {
            transform: scale(1.2);
            filter: brightness(1.3);
        }

        .email-link {
            color: #D4AF37;
            text-decoration: none;
            transition: all 0.3s ease;
            font-weight: 500;
        }

        .email-link:hover {
            color: #FFD700;
            text-shadow: 0 0 8px rgba(255, 215, 0, 0.6);
            transform: scale(1.05);
        }

        .footer-bottom {
            border-top: 1px solid #D4AF37;
            padding: 15px 0;
            text-align: center;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .footer-bottom p {
            color: #D4AF37;
            font-size: 1rem;
            margin: 0;
        }

        .footer-bottom a {
            color: #D4AF37;
            text-decoration: none;
            font-size: 1rem;
            transition: color 0.3s ease;
            transition: color 0.3s ease;
            margin-top: 15px;
            display: block;
        }

        .footer-bottom a:hover {
            color: #F5DEB3;
        }

        /* Responsive Footer */
        @media screen and (max-width: 768px) {
            .footer-content {
                grid-template-columns: 1fr;
                gap: 30px;
            }
            
            .footer-section h3 {
                font-size: 18px;
            }
            
            .footer-section p {
                font-size: 14px;
            }
            
            .contact-item {
                font-size: 14px;
            }
        }

        /* Responsive Design - התאמה למסכים שונים */
        
        /* מסכים קטנים (טאבלטים וטלפונים) */
        @media screen and (max-width: 768px) {
            /* ניווט */
            .navigation {
                height: 6vh;
                padding: 0 10px;
            }
            
            .nav-menu {
                gap: 8px;
                flex-wrap: wrap;
            }
            
            .nav-link {
                font-size: 14px;
                padding: 5px 8px;
            }
            
            .nav-logo img {
                max-height: 3vh;
                min-height: 20px;
            }
            
            /* כותרת ראשית */
            .hero-section h1 {
                font-size: 6em !important;
                right: 2% !important;
                top: 20% !important;
            }
            
            .hero-section p {
                font-size: 1.5em !important;
            }
            
            /* קונטיינר עם כרטיסיות מלאות רוחב לראשי האיגוד */
            .hero-section + div[style*="background-color: #F5F5DC"] {
                padding: 40px 10px !important;
            }
            
            .full-width-leader-card {
                width: 95% !important;
                max-width: 95% !important;
                margin: 25px auto !important;
                max-height: none !important;
            }
            
            .full-width-leader-card .leader-image-section {
                flex: 0 0 auto !important;
                min-width: 200px !important;
                max-width: 260px !important;
                padding: 0 !important;
            }
            
            .full-width-leader-card .leader-title-bar {
                top: 18px !important;
                font-size: 0.95em !important;
                padding: 9px 16px !important;
                min-width: 160px !important;
            }
            
            .full-width-leader-card .leader-image-wrapper {
                padding: 65px 25px 25px 25px !important;
            }
            
            .full-width-leader-card .leader-image-circle {
                max-width: calc(100% - 15px) !important;
                max-height: calc(100% - 15px) !important;
            }
            
            .full-width-leader-card .leader-image-section img {
                object-fit: cover !important;
            }
            
            .full-width-leader-card .leader-image-circle:hover img {
                transform: scale(1.18) !important;
            }
            
            .full-width-leader-card .leader-content-section {
                padding: 25px 20px !important;
            }
            
            .full-width-leader-card .leader-name {
                font-size: 1.5em !important;
            }
            
            .full-width-leader-card .leader-description {
                font-size: 0.88em !important;
            }
            
            /* כותרות דפים */
            h2[style*="font-size: 4em"] {
                font-size: 2.5em !important;
                margin: 15px 0 !important;
            }
            
            /* כרטיסיות תוכן */
            .content-box {
                margin: 15px 10px !important;
                padding: 20px 15px !important;
            }
            
            .content-box h2 {
                font-size: 1.5em !important;
            }
            
            .content-box p {
                font-size: 1em !important;
            }
            
            /* גריד אירועים */
            .events-grid {
                grid-template-columns: 1fr !important;
                gap: 15px !important;
                margin: 15px 10px !important;
            }
            
            /* כרטיסיות אירועים */
            .event-card {
                min-height: 250px !important;
            }
            
            .event-card h3 {
                font-size: 1.2em !important;
            }
            
            .event-card p {
                font-size: 0.9em !important;
            }
        }
        
        /* מסכים בינוניים (טאבלטים גדולים) */
        @media screen and (min-width: 769px) and (max-width: 1024px) {
            /* ניווט */
            .navigation {
                height: 7vh;
            }
            
            .nav-link {
                font-size: 16px;
                padding: 8px 12px;
            }
            
            /* כותרת ראשית */
            .hero-section h1 {
                font-size: 8em !important;
                right: 3% !important;
            }
            
            .hero-section p {
                font-size: 2em !important;
            }
            
            /* קונטיינר עם כרטיסיות מלאות רוחב לראשי האיגוד */
            .hero-section + div[style*="background-color: #F5F5DC"] {
                padding: 50px 15px !important;
            }
            
            .full-width-leader-card {
                width: 90% !important;
                max-width: 90% !important;
            }
            
            .full-width-leader-card .leader-content-section {
                padding: 32px 35px !important;
            }
            
            /* כותרות דפים */
            h2[style*="font-size: 4em"] {
                font-size: 3em !important;
            }
            
            /* גריד אירועים */
            .events-grid {
                grid-template-columns: repeat(2, 1fr) !important;
                gap: 20px !important;
            }
        }
        .letter-card-preview {
           width: 100%;
           height: 200px; /* קבע גובה קבוע לכל התמונות כדי שיהיו אחידות */
           overflow: hidden; /* חותך את מה שחורג מהמסגרת */
           display: flex;
           justify-content: center; /* מרכז אופקית */
           align-items: center; /* מרכז אנכית */
          background-color: #f0f0f0; /* צבע רקע למקרה שהתמונה לא ממלאת הכל */
        }

        .letter-card-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover; /* גורם לתמונה למלא את הריבוע בלי להתעוות */
         object-position: center; /* מוודא שהחלק המרכזי של התמונה הוא זה שמוצג */
        }
        /* מסכים גדולים (דסקטופ) */
        @media screen and (min-width: 1200px) {
            /* ניווט */
            .navigation {
                height: 8vh;
            }
            
            .nav-link {
                font-size: 18px;
                padding: 10px 15px;
            }
            
            /* כותרת ראשית */
            .hero-section h1 {
                font-size: 12em !important;
                right: 5% !important;
            }
            
            .hero-section p {
                font-size: 3em !important;
            }
            
            /* קונטיינר עם כרטיסיות מלאות רוחב לראשי האיגוד */
            .hero-section + div[style*="background-color: #F5F5DC"] {
                padding: 60px 30px !important;
            }
            
            /* כותרות דפים */
            h2[style*="font-size: 4em"] {
                font-size: 4em !important;
            }
            
            /* גריד אירועים */
            .events-grid {
                grid-template-columns: repeat(3, 1fr) !important;
                gap: 25px !important;
            }
        }
        
        /* מסכים קטנים מאוד (טלפונים) */
        @media screen and (max-width: 480px) {
            /* ניווט */
            .navigation {
                height: 5vh;
                padding: 0 5px;
            }
            
            .nav-menu {
                gap: 5px;
            }
            
            .nav-link {
                font-size: 12px;
                padding: 3px 5px;
            }
            
            .nav-logo img {
                max-height: 2.5vh;
                min-height: 15px;
            }
            
            /* כותרת ראשית */
            .hero-section h1 {
                font-size: 4em !important;
                right: 1% !important;
                top: 15% !important;
            }
            
            .hero-section p {
                font-size: 1.2em !important;
            }
            
            /* קונטיינר עם כרטיסיות מלאות רוחב לראשי האיגוד */
            .hero-section + div[style*="background-color: #F5F5DC"] {
                padding: 30px 5px !important;
            }
            
            .full-width-leader-card {
                width: 95% !important;
                max-width: 95% !important;
                margin: 20px auto !important;
                border-width: 2px !important;
            }
            
            .full-width-leader-card .leader-image-section {
                flex: 0 0 auto !important;
                min-width: 180px !important;
                padding: 0 !important;
            }
            
            .full-width-leader-card .leader-title-bar {
                top: 12px !important;
                font-size: 0.85em !important;
                padding: 7px 12px !important;
                min-width: 140px !important;
            }
            
            .full-width-leader-card .leader-image-wrapper {
                padding: 55px 20px 20px 20px !important;
            }
            
            .full-width-leader-card .leader-image-circle {
                max-width: calc(100% - 10px) !important;
                max-height: calc(100% - 10px) !important;
            }
            
            .full-width-leader-card .leader-image-section img {
                object-fit: cover !important;
            }
            
            .full-width-leader-card .leader-image-circle:hover img {
                transform: scale(1.12) !important;
            }
            
            .full-width-leader-card .leader-content-section {
                padding: 20px 15px !important;
            }
            
            .full-width-leader-card .leader-title-bar {
                font-size: 0.85em !important;
                padding: 6px 10px !important;
            }
            
            .full-width-leader-card .leader-name {
                font-size: 1.3em !important;
            }
            
            .full-width-leader-card .leader-location {
                font-size: 0.85em !important;
            }
            
            .full-width-leader-card .leader-description {
                font-size: 0.82em !important;
            }
            
            /* כותרות דפים */
            h2[style*="font-size: 4em"] {
                font-size: 2em !important;
                margin: 10px 0 !important;
            }
            
            /* כרטיסיות תוכן */
            .content-box {
                margin: 10px 5px !important;
                padding: 15px 10px !important;
            }
            
            .content-box h2 {
                font-size: 1.3em !important;
            }
            
            .content-box p {
                font-size: 0.9em !important;
            }
            
            /* גריד אירועים */
            .events-grid {
                grid-template-columns: 1fr !important;
                gap: 10px !important;
                margin: 10px 5px !important;
            }
            
            /* כרטיסיות אירועים */
            .event-card {
                min-height: 200px !important;
            }
            
            .event-card h3 {
                font-size: 1.1em !important;
            }
            
            .event-card p {
                font-size: 0.8em !important;
            }
        }

        /* אפקט הקלדה עם cursor מהבהב */
        .typewriter-text {
            overflow: hidden;
            white-space: pre-wrap;
            word-wrap: break-word;
            position: relative;
            transition: opacity 0.2s ease;
        }
        
        .typewriter-text.typing::after {
            content: '▊';
            display: inline-block;
            width: auto;
            margin-right: 8px;
            margin-left: 4px;
            animation: blink 0.5s infinite;
            color: #8B4513;
            font-weight: 900;
            font-size: 1.3em;
            vertical-align: middle;
            line-height: 1.8;
            opacity: 1;
        }
        
        @keyframes blink {
            0% { opacity: 1; }
            50% { opacity: 0.2; }
            100% { opacity: 1; }
        }
        
        /* אפקט חלק לטקסט שנכתב */
        .hero-text-description {
            transition: none;
        }
        
        /* עיצוב רספונסיבי לטקסט על כל רוחב המסך */
        @media (max-width: 768px) {
            .hero-text-description {
                padding: 0 15px !important;
                min-height: 380px !important;
                height: 380px !important;
            }
            
            .typewriter-text {
                font-size: 1.2em !important;
                line-height: 1.6 !important;
                min-height: 130px !important;
            }
            
            .hero-text-subtitle {
                font-size: 1.8em !important;
                margin-bottom: 30px !important;
            }
        }
        
        @media (max-width: 480px) {
            .hero-text-description {
                padding: 0 10px !important;
                min-height: 340px !important;
                height: 340px !important;
            }
            
            .typewriter-text {
                font-size: 1em !important;
                line-height: 1.5 !important;
                min-height: 120px !important;
            }
            
            .hero-text-subtitle {
                font-size: 1.5em !important;
                margin-bottom: 25px !important;
            }
            
            .full-width-leader-card-container {
                grid-template-columns: 1fr !important;
                padding: 30px 10px !important;
                gap: 20px !important;
            }
            
            .full-width-leader-card {
                height: 380px !important;
                min-width: 100% !important;
            }
            
            .full-width-leader-card.expanded {
                height: auto !important;
                min-height: 380px !important;
            }
            
            .full-width-leader-card .leader-content-section {
                padding: 20px 15px !important;
            }

            .full-width-leader-card .leader-title-bar {
                font-size: 0.8em !important;
                padding: 6px 10px !important;
                top: 12px !important;
                right: 12px !important;
                min-width: 100px !important;
            }

            .full-width-leader-card .leader-name {
                font-size: 1.2em !important;
                margin-top: 10px !important;
            }

            .full-width-leader-card .leader-location {
                font-size: 0.85em !important;
                margin-bottom: 10px !important;
            }

            .full-width-leader-card .leader-description {
                font-size: 0.8em !important;
                font-family: Arial, Helvetica, sans-serif !important;
                max-height: 61px !important;
                transition: max-height 750ms linear !important;
            }
            
            .full-width-leader-card.expanded .leader-description {
                max-height: 2000px !important;
                transition: max-height 750ms ease-out !important;
            }
            
            .full-width-leader-card .leader-description:not(.expanded)::after {
                height: 40px !important;
            }
            
            .read-more-btn {
                font-size: 0.8em !important;
                padding: 8px 20px !important;
                margin-top: auto !important;
            }
        }

    </style>
</head>

<body>


    <nav class="navigation">
        <div class="nav-container">
            <div class="search-bar" id="searchBar">
                <div class="search-icon" onclick="toggleSearch()">🔍</div>
                <input type="text" placeholder="חיפוש באתר..." onkeyup="handleSearch(event)" onkeydown="handleKeyDown(event)" />
            </div>
            <div class="nav-logo" onclick="goToHomePage()">
                <img src="https://i.postimg.cc/DzBk9Ydd/lwgw-mlym-bly-rq.png" alt="לוגו איגוד עמלים" />
            </div>
            <div class="nav-menu">
                <a href="javascript:void(0)" class="nav-link active" onclick="goToHomePage()">עמוד ראשי</a>
                <a href="javascript:void(0)" class="nav-link" onclick="showPage('about')">אודות</a>
                <a href="javascript:void(0)" class="nav-link" onclick="showPage('letters')">מכתבי גדולי ישראל</a>
                <a href="javascript:void(0)" class="nav-link" onclick="showPage('galeinot')">גלינות</a>
                <a href="javascript:void(0)" class="nav-link" onclick="showPage('news')">חדשות</a>
                <a href="javascript:void(0)" class="nav-link" onclick="showPage('gallery')">גלריות</a>
                <a href="javascript:void(0)" class="nav-link" onclick="showPage('articles')">כתבות</a>
                <a href="javascript:void(0)" class="nav-link" onclick="showPage('contact')">לתרומות</a>
            </div>
        </div>
    </nav>

    <!-- תוצאות חיפוש מחוץ לכל הקונטיינרים -->
    <div class="search-suggestions" id="searchSuggestions"></div>

    <div id="home-page" class="page active-page">
        
        <div class="hero-section">
            <!-- כרטיסיה אלכסונית מעל המצגת -->
            <div class="diagonal-card">
                <div class="diagonal-left-section">
                </div>
                <div class="diagonal-right-section">
                </div>
            </div>
            
            <!-- המילה עמלים בצד ימין של המצגת -->
            <div style="position: absolute; top: 25%; right: 5%; z-index: 9999; text-align: right; background-color: #F5F5DC; padding: 30px 40px; border-radius: 0;">
                <h1 id="amalim-title" style="font-size: 12em; font-weight: normal; margin: 0; font-family: 'EFT_Devash_Heavy', serif; color: black; line-height: 1; transform: scaleY(1.2); opacity: 0;">
                    עמלים
                </h1>
                <p id="subtitle1" style="font-size: 3em; font-weight: normal; margin: 0; font-family: 'EFT_Devash_Heavy', serif; color: black; line-height: 1; opacity: 0;">
                    איגוד בני התורה
                </p>
                <p id="subtitle2" style="font-size: 3em; font-weight: normal; margin: 0; font-family: 'EFT_Devash_Heavy', serif; color: black; line-height: 1; opacity: 0;">
                    יוצאי אתיופיה
                </p>
            </div>
            
            <div class="background-images">
                <div class="slideshow-container">
                    <div class="slide active">
                        <img src="https://mizrach.co.il/wp-content/uploads/2025/01/%D7%A6%D7%99%D7%95%D7%9F-%D7%A9%D7%A0%D7%94-%D7%9C%D7%94%D7%A7%D7%9E%D7%AA-%D7%90%D7%99%D7%92%D7%95%D7%93-%D7%A2%D7%9E%D7%9C%D7%99%D7%9D-%D7%99%D7%95%D7%A6%D7%90%D7%99-%D7%90%D7%AA%D7%99%D7%95%D7%A4%D7%99%D7%94-36-scaled.jpg" alt="ציון שנה לאיגוד עמלים" />
            </div>
                    <div class="slide">
                        <img src="https://hm-news.co.il/wp-content/uploads/2024/09/WhatsApp-Image-2024-09-03-at-19.11.28.jpeg" alt="סיכום עונת רישום ראשונה ומוצלחת" />
                    </div>
                    <div class="slide">
                        <img src="https://storage.bhol.co.il/media/lt/1657699/gallery/811284_tumb_800Xauto.jpg" alt="כינוס הכנה לקבלת התורה" />
                    </div>
                    <div class="slide">
                        <img src="https://mizrach.co.il/wp-content/uploads/2025/01/%D7%A6%D7%99%D7%95%D7%9F-%D7%A9%D7%A0%D7%94-%D7%9C%D7%94%D7%A7%D7%9E%D7%AA-%D7%90%D7%99%D7%92%D7%95%D7%93-%D7%A2%D7%9E%D7%9C%D7%99%D7%9D-%D7%99%D7%95%D7%A6%D7%90%D7%99-%D7%90%D7%AA%D7%99%D7%95%D7%A4%D7%99%D7%94-35-scaled.jpg" alt="ציון שנה לאיגוד עמלים" />
                    </div>
                    <div class="slide">
                        <img src="https://mizrach.co.il/wp-content/uploads/2025/01/%D7%A6%D7%99%D7%95%D7%9F-%D7%A9%D7%A0%D7%94-%D7%9C%D7%94%D7%A7%D7%9E%D7%AA-%D7%90%D7%99%D7%92%D7%95%D7%93-%D7%A2%D7%9E%D7%9C%D7%99%D7%9D-%D7%99%D7%95%D7%A6%D7%90%D7%99-%D7%90%D7%AA%D7%99%D7%95%D7%A4%D7%99%D7%94-34-scaled.jpg" alt="ציון שנה לאיגוד עמלים" />
                    </div>
                    <div class="slide">
                        <img src="https://mizrach.co.il/wp-content/uploads/2025/01/%D7%A6%D7%99%D7%95%D7%9F-%D7%A9%D7%A0%D7%94-%D7%9C%D7%94%D7%A7%D7%9E%D7%AA-%D7%90%D7%99%D7%92%D7%95%D7%93-%D7%A2%D7%9E%D7%9C%D7%99%D7%9D-%D7%99%D7%95%D7%A6%D7%90%D7%99-%D7%90%D7%AA%D7%99%D7%95%D7%A4%D7%99%D7%94-33-scaled.jpg" alt="ציון שנה לאיגוד עמלים" />
                    </div>
                    <div class="slide">
                        <img src="https://mizrach.co.il/wp-content/uploads/2025/01/%D7%A6%D7%99%D7%95%D7%9F-%D7%A9%D7%A0%D7%94-%D7%9C%D7%94%D7%A7%D7%9E%D7%AA-%D7%90%D7%99%D7%92%D7%95%D7%93-%D7%A2%D7%9E%D7%9C%D7%99%D7%9D-%D7%99%D7%95%D7%A6%D7%90%D7%99-%D7%90%D7%AA%D7%99%D7%95%D7%A4%D7%99%D7%94-32-scaled.jpg" alt="ציון שנה לאיגוד עמלים" />
                    </div>
                </div>
            </div>
        </div>
        
        <!-- כרטיסיה בהירה מתחת למצגת -->
        <div style="width: 100%; background-color: #F5F5DC; padding: 60px 40px; margin: 0; margin-top: -50px; position: relative; z-index: 998; transition: transform 0.1s ease-out;">
            <!-- תת-כותרת -->
            <h2 class="hero-text-subtitle" style="font-size: 2.2em; font-weight: bold; margin-bottom: 40px; font-family: 'Frank Ruhl Libre', serif; color: #333333; text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1); text-align: center; width: 100%;">
                איגוד עמלים
            </h2>
            
            <!-- טקסט תיאור עם אפקט הקלדה על כל רוחב המסך - גובה קבוע -->
            <div class="hero-text-description" style="width: 100%; max-width: 100%; text-align: center; padding: 0 20px; box-sizing: border-box; min-height: 420px; height: 420px; position: relative; overflow: hidden;">
                <p id="typewriter-text-1" class="typewriter-text" style="font-size: 1.6em; line-height: 1.8; margin-bottom: 30px; font-family: 'Frank Ruhl Libre', serif; font-weight: normal; color: black; text-align: right; direction: rtl; width: 100%; max-width: 100%; min-height: 150px; position: relative; padding-top: 0;"></p>
                
                <p id="typewriter-text-2" class="typewriter-text" style="font-size: 1.6em; line-height: 1.8; margin-bottom: 20px; font-family: 'Frank Ruhl Libre', serif; font-weight: normal; color: black; text-align: right; direction: rtl; width: 100%; max-width: 100%; min-height: 150px; position: relative; padding-top: 0;"></p>
            </div>
        </div>
        
        <!-- קונטיינר עם כרטיסיות כההות לראשי האיגוד -->
        <div class="full-width-leader-card-container">
            <!-- כרטיסיה ראשונה - הרב נתנאל פרץ -->
            <div class="full-width-leader-card">
                <img src="https://i.postimg.cc/dV8R5bmG/msywn-ltmwnwt-prwpyl-sl-prz.png" alt="הרב נתנאל פרץ שליטא" class="leader-image">
                <div class="leader-content-section">
                    <div class="leader-title-bar">יו"ר האיגוד</div>
                    <div class="leader-name">הרב נתנאל פרץ שליט"א</div>
                    <div class="leader-location">ירושלים.</div>
                    <div class="leader-description">
                        <p>בוגר ישיבת תורת זאב (סולבייצי'ק) וכולל שע"י ישיבת 'עטרת ישראל', מרבני הישיבה הגדולה 'כתר תורה', ומלפנים בישיבת 'רכסים' לצעירים בירושלים ואיש חינוך ותיק.</p>
                        <p>משמש גם כמנהל אזורי מטעם איגודי בני ישיבות רבים ברחבי ירושלים, ובעיקר האיש שמאחורי התנופה והמהפכה הגדולה בקרב בני הישיבות מהקהילה האתיופית, היוזם ומארגן את כל אשר תחת יד האיגוד ואיש הקשר בבתי גדולי ישראל וראשי הישיבות שליט"א.</p>
                    </div>
                    <div class="fade-mask"></div>
                    <button class="read-more-btn" data-card="1">קרא עוד</button>
                </div>
            </div>
            
            <!-- כרטיסיה שנייה - הרב ניסים יברקן -->
            <div class="full-width-leader-card">
                <img src="https://i.postimg.cc/Cxyd6dmc/nsywn-ltmwnwt-prwpyl-sl-nysym.png" alt="הרב ניסים יברקן שליטא" class="leader-image">
                <div class="leader-content-section">
                    <div class="leader-title-bar">מנהל האיגוד</div>
                    <div class="leader-name">הרב ניסים יברקן שליט"א</div>
                    <div class="leader-location">נתיבות.</div>
                    <div class="leader-description">
                        <p>בוגר ישיבת 'אמיתה של תורה' בראשות רה"י הגר"י עיני שליט"א. אברך כולל בנתיבות, שותף בהקמת פרויקטים ומיזמים חינוכיים רבים.</p>
                        <p>במסגרת האיגוד - יזם וחיבר בין בני הישיבות מכל חלקי הארץ, ומיסד יחד עם הרב עודד תמנה את הקמת האיגוד בעבודה איטית ומחושבת, כיום משמש כמנהל ראשי באיגוד ואחראי על תכלול התחומים, תכנון והפקת אירועים, כתיבת התכנים, שיווק תקשורתי וניהול מרכז ההכוון והייעוץ, כאשר בתחום זה עשה שימוש וצבר ניסיון רב במסגרת לימודיו אצל הג"ר משה בויאר שליט"א במרכז ההכשרה ליועצים "ויועצינו כבתחילה".</p>
                    </div>
                    <div class="fade-mask"></div>
                    <button class="read-more-btn" data-card="2">קרא עוד</button>
                </div>
            </div>
            
            <!-- כרטיסיה שלישית - הרב עודד תמנה -->
            <div class="full-width-leader-card">
                <img src="https://i.postimg.cc/x8bjdX1v/nsywn-ltmwnwt-prwpyl-sl-'wdd-tmnh.png" alt="הרב עודד תמנה שליטא" class="leader-image">
                <div class="leader-content-section">
                    <div class="leader-title-bar">מנהל האיגוד</div>
                    <div class="leader-name">הרב עודד תמנה שליט"א</div>
                    <div class="leader-location">קריית גת - ירושלים.</div>
                    <div class="leader-description">
                        <p>בוגר ישיבות 'תורת משה' ו'באר התלמוד' (יקירי ירושלים), המקורב לרה"י הגאון הגדול רבי חנוך כהן שליט"א. ת"ח עצום המונח היטב בעומקן של המסכתות והסוגיות הישיבתיות.</p>
                        <p>מחלוצי בני הישיבות מהקהילה האתיופית, מי שמיסד את הקמת האיגוד ומי שאחראי על מערך הקשר מול כל הבחורים ברחבי הארץ, בני הישיבות הקטנות והגדולות, איש הקשר והשטח - 'הפנים של האיגוד' בעולם הישיבות. כמו כן אחראי על הכנת הבחורים והכשרתם לקראת המבחנים המקיפים אצל ראשי הישיבות.</p>
                    </div>
                    <div class="fade-mask"></div>
                    <button class="read-more-btn" data-card="3">קרא עוד</button>
                </div>
            </div>
        </div>
        
        <!-- Footer -->
        <footer class="footer">
            <div class="container">
                <div class="footer-content" style="justify-content: center; gap: 100px;">
                    <div class="footer-section" style="flex: 0 0 auto; max-width: 400px;">
                        <h3>אודותינו</h3>
                        <p>איגוד עמלים נוסד בשנת תשפ"ד מתוך תחושת שליחות עמוקה להעניק לבני התורה יוצאי אתיופיה את ההזדמנות והליווי והמסגרת הרוחנית הראויה.</p>
                        <p>האיגוד פועל תחת נשיאותו של חבר מועצת חכמי התורה מרן ראש הישיבה הגאון הגדול רבי אברהם סאלים שליט"א ובהכוונתם הצמודה של מרנן ורבנן ראשי הישיבות שליט"א ועוסק בשיבוץ תלמידים יוצאי אתיופיה בישיבות מובחרות ומספק הכוונה אישית ורוחנית לכל תלמיד</p>
      </div>

                    <div class="footer-section" style="flex: 0 0 auto; max-width: 300px;">
                        <h3>פרטי התקשרות</h3>
                        <div style="display: flex; flex-direction: column; gap: 10px;">
                            <div class="contact-item">
                                <span>📞</span>
                                <span>050-1234567</span>
                            </div>
                            <div class="contact-item">
                                <span>📧</span>
                                <a href="mailto:info@amalim.org.il" class="email-link">info@amalim.org.il</a>
                            </div>
                            <div class="contact-item">
                                <span>📍</span>
                                <span>ירושלים, ישראל</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="footer-bottom">
                    <p>© 2025 איגוד עמלים - כל הזכויות שמורות</p>
                    <a href="#" onclick="showPage('terms'); return false;">תנאי שימוש ומדיניות פרטיות</a>
                </div>
            </div>
        </footer>
    </div>

    <div id="about-page" class="page">
        <h2 style="color: black; text-align: center; margin: 20px 0; font-size: 4em; font-weight: bold; font-family: 'Frank Ruhl Libre', serif; letter-spacing: 3px;">
            <div style="display: inline-block; vertical-align: middle; margin-right: 0px;">
                <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #D4AF37, #B8860B); margin-bottom: 3px;"></div>
                <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #B8860B, #8B7355); margin-bottom: 3px;"></div>
                <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #8B7355, #B8860B);"></div>
            </div>אודות<div style="display: inline-block; vertical-align: middle; margin-left: 0px;">
                <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #B8860B, #8B7355); margin-bottom: 3px;"></div>
                <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #8B7355, #B8860B); margin-bottom: 3px;"></div>
                <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #B8860B, #D4AF37);"></div>
            </div>
        </h2>
        
        <!-- כפתור הורדת תקנון -->
        <div style="text-align: center; margin: 20px 0;">
            <a href="https://drive.google.com/uc?export=download&id=1PcVmC25qjp4hH0vGGI-cWpzDFSiZ5sva" target="_blank" style="
                display: inline-flex;
                align-items: center;
                gap: 10px;
                background: linear-gradient(135deg, #8B7355, #6B5344);
                color: white;
                padding: 15px 30px;
                border-radius: 12px;
                text-decoration: none;
                font-weight: bold;
                font-size: 18px;
                box-shadow: 0 4px 15px rgba(139, 115, 85, 0.4);
                transition: all 0.3s ease;
            " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(139, 115, 85, 0.5)';" 
               onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(139, 115, 85, 0.4)';">
                📄 הורדת תקנון האיגוד
            </a>
        </div>
        
        <div class="page-content">
            <p>איגוד "עמלים" נוסד בשנת תשפ"ד מתוך תחושת שליחות עמוקה: להעניק לבני התורה יוצאי אתיופיה את ההזדמנות, הליווי והמסגרת הרוחנית הראויה, כדי שיוכלו לגדול ולהתעלות בעולמה של תורה, ולהשתלב בעולם הישיבות הספרדי והחרדי מתוך כבוד, שייכות וגדלות.</p>
        </div>

        <div class="content-box">
            <p class="title">הנהגה רוחנית</p>
            <p style="color: #333333;">האיגוד פועל תחת נשיאותו של חבר מועצת חכמי התורה, מרן ראש הישיבה הגאון הגדול רבי אברהם סאלים שליט"א, ובהכוונתם הצמודה של מרנן ורבנן ראשי הישיבות שליט"א.</p>
            
            <p class="title">ההנהלה הפעילה</p>
            <p style="color: #333333;">• הרב נתנאל פרץ שליט"א – יו"ר האיגוד</p>
            <p style="color: #333333;">• הרב ניסים יברקן שליט"א</p>
            <p style="color: #333333;">• הרב עודד תמנה שליט"א</p>
            <p style="color: #333333;">• הרב אברהם עידן שליט"א – ראש ישיבת "עטרת הלוי"</p>
            <p style="color: #333333;">• הרב דוד רביבו – מנהל מרכז ההכוון לבני ישיבות</p>

            <div class="leadership-section">
                <p style="color: #333333; border-bottom: 8px double #D4AF37; padding-bottom: 30px;">
                <p class="title">מטרות ופעילות</p>
                <p style="color: #333333;">• שיבוץ תלמידים יוצאי אתיופיה בישיבות מובחרות כגון: "ברית יעקב", "מאור התורה", "דעת חיים", "אש התלמוד", "באר התלמוד", "תורת אברהם", "אוהל תורה", "תפארת הלוי", "יסודות", "אוהל יוסף" ועוד</p>
                <p style="color: #333333;">• הכוונה אישית ורוחנית לכל תלמיד, כולל קשר ישיר עם ראשי ישיבות ומשגיחים</p>
                <p style="color: #333333;">• מבחני סיכום תובעניים לתלמידים המסיימים ישיבות קטנות, שנערכים ע"י גדולי ראשי הישיבות בירושלים</p>
                <p style="color: #333333;">• כינוסים תורניים ומעמדים מרוממים כמו מעמד ההכנה לחג מתן תורה, בהשתתפות מאות בני תורה יוצאי אתיופיה</p>
                <p style="color: #333333;">• קשר עם גדולי ישראל – כולל ביקורים במעונם של מרן הגרמ"ה הירש שליט"א, הגר"י טולדאנו שליט"א, הגר"ש כהן שליט"א, הגר"י סויסה שליט"א ועוד</p>
            </div>
        </div>



           <!-- כרטיסיה של מדיניות ופרטיות -->
           <div class="privacy-policy-card">
                        <!-- כותרת ראשית בתוך הכרטיסיה -->
               <h2>תנאי שימוש ומדיניות פרטיות - איגוד עמלים</h2>
               <p class="subtitle">מידע חשוב על השימוש באתר והגנה על פרטיותכם</p>
               
               <div class="content-inner">
                   
                            <!-- מבוא -->
                   <div class="intro">
                       <h4>מבוא</h4>
                   </div>
                   <p><strong>ברוכים הבאים לאתר איגוד עמלים</strong> המופעל על ידי <strong>איגוד עמלים, ע.ר.</strong> מכתובת <strong>רחוב העליה 22, נתיבות</strong></p>
                   <p>כל שימוש באתר מהווה הסכמה לתקנון זה, על התנאים וההגבלות הכלולים בו.</p>
                   <p>התקנון עלול להשתנות מעת לעת, ועל המשתמש להתעדכן בתקנון בכל כניסה לאתר. גלישה באתר ו/או שימוש בו מכל סוג, כמוהם כהסכמה לתנאי התקנון והתחייבות לפעול על פיהם. מובהר כי התקנון מהווה הסכם משפטי מחייב לכל דבר ועניין ומחייב את המשתמש על כל שימושיו באתר.</p>
                   <p>האמור בתקנון זה בלשון זכר הוא לשם הנוחות בלבד והתקנון מתייחס לבני שני המינים באופן שווה.</p>
                   <p>יצירת קשר עם האיגוד תהווה הצהרה מצד הפונה כי קרא את הוראות תקנון זה, הבין אותן והסכים להן. התקנון מהווה הסכם מחייב בין המשתמש לבין האיגוד.</p>

                            <!-- אודות האיגוד והאתר -->
                            <h4 style="color: #B8860B; margin: 20px 0 10px 0; font-size: 18px; font-weight: 700; padding: 10px 15px; background: linear-gradient(90deg, #f8fafc, #e2e8f0); border: 2px solid #B8860B; border-radius: 10px; text-align: center; box-shadow: 0 4px 8px rgba(184, 134, 11, 0.2);">אודות האיגוד והאתר</h4>
                   <p>איגוד עמלים הוא ארגון רשום שנוסד בשנת תשפ"ד (2024) המתמחה ב:</p>
                   <ul>
                       <li>• ליווי וייעוץ לבני ישיבות יוצאי אתיופיה</li>
                       <li>• שיבוץ בני ישיבות בישיבות מובחרות</li>
                       <li>• ארגון כינוסים ומעמדים תורניים</li>
                       <li>• הכנה למבחני סיכום לישיבות גדולות</li>
                       <li>• סיוע רוחני וכלכלי לבני ישיבות</li>
                            </ul>
                   <p>האתר משמש כאתר מידע ויצירת קשר בלבד ואינו מהווה חנות מקוונת או מערכת מכירות.</p>

                            <!-- מטרת האתר -->
                   <h4>מטרת האתר</h4>
                   <p>האתר מיועד לצרכים הבאים בלבד:</p>
                   <ul>
                       <li>• הצגת מידע אודות פעילויות האיגוד</li>
                       <li>• פרסום אירועים וכינוסים</li>
                       <li>• יצירת קשר עם האיגוד</li>
                       <li>• קבלת תרומות לפעילות האיגוד (באמצעות מערכות חיצוניות)</li>
                            </ul>
                   <p>האתר אינו מוכר מוצרים או שירותים ואין בו מערכת הזמנות או תשלומים ישירה.</p>

                            <!-- התחייבויות ופעילויות -->
                   <h4>התחייבויות ופעילויות</h4>
                   <p>האיגוד פועל תחת נשיאותו של מרן ראש הישיבה הגאון הגדול רבי אברהם סאלים שליט"א חבר מועצת חכמי התורה.</p>
                   <p>התשלום עבור שירותי האיגוד (כגון השתתפות בכינוסים או תרומות) מתבצע באמצעות:</p>
                   <ul>
                       <li>• תרומות דרך מערכת "נדרים פלוס" החיצונית</li>
                       <li>• העברות בנקאיות ישירות</li>
                       <li>• מזומן בפגישות אישיות</li>
                            </ul>
                   <p>כל ההתקשרויות הפיננסיות מתבצעות בתיאום ישיר עם הנהלת האיגוד.</p>
                   <p>האיגוד שומר לעצמו את הזכות להפסיק את פעילותו או להגביל את שירותיו בכל עת.</p>
                   <p>השימוש באתר מותר לכל אזרח אשר מלאו לו 18 שנים. יצירת קשר תתאפשר לכל בעל תיבת דואר אלקטרוני תקפה. קטין המבצע פעולות ייחשב כקטין אשר קיבל את רשות הוריו/אפוטרופוסיו לביצוע הפנייה.</p>

                            <!-- תרומות ותמיכה -->
                   <h4>תרומות ותמיכה</h4>
                   <p>מדיניות תרומות והתחייבויות, בהתאם לדיני העמותות הישראליים ותקנות הפטור ממס.</p>
                   <p>ניתן לתרום לאיגוד בכל עת, והתרומות מיועדות למימון פעילויות האיגוד.</p>
                   <p><strong>לא ניתן לקבל החזר כספי עבור תרומות שבוצעו</strong> או כספים שהועברו לטובת פעילויות האיגוד.</p>
                   <p>האיגוד יהא רשאי לסיים מערכת יחסים עם תורם וזאת בהתראה מראש סבירה. במקרה כזה לא יעמוד לתורם כל טענה כלפי האיגוד.</p>
                   <p>הודעה על הפסקת פעילות או ביטול אירוע מצד האיגוד תימסר לנוגעים בדבר בהתראה מראש סבירה.</p>

                            <!-- זמינות ופעילות -->
                   <h4>זמינות ופעילות</h4>
                   <p>זמינות הפעילויות כפופה למועדים אשר נקבעים עם הנהלת האיגוד.</p>
                   <p>בכל שאלה או בירור לגבי פעילויות האיגוד ניתן לפנות למייל <strong>s0534142893@gmail.com</strong>.</p>

                            <!-- אחריות ושירות -->
                   <h4>אחריות ושירות</h4>
                   <p>הפעילויות ינתנו בהתאם לתכניות אשר יוצעו ע"י הנהלת האיגוד בהתאם לזמינות ולאפשרויות.</p>
                   <p>משך הפעילויות הינו ע"פ התכניות והמועדים אשר נקבעו מראש.</p>
                   <p><strong>האיגוד אינו אחראי על נזקים פיזיים או כספיים או כל נזק אחר שעלולים להיגרם במהלך הפעילויות או בעקבות השימוש באתר</strong>.</p>
                   <p>האיגוד מסיר מעליו כל אחריות מהתכנים הנכתבים באתר או מהשימוש בהם והשלכותיהם.</p>

                            <!-- אבטחת מידע ופרטיות -->
                   <h4>אבטחת מידע ופרטיות</h4>
                   <p>האיגוד רשאי להשתמש במידע המופיע בפניות יצירת קשר על מנת להביא לפונה את המידע והשירותים המבוקשים. מידע אישי זה לא ייחשף ולא ייעשה בו שימוש נוסף למטרות שיווקיות ללא רשות ולא יועבר לצד שלישי ללא אישור מפורש מהפונה.</p>
                   <p>פרטי המתקשרים עם האיגוד, לעולם לא ייחשפו לאדם אחר או כל גורם ללא אישור בכתב מהפונה. האיגוד מחויב לפרטיות הפונה ופרטיות זו הינה בראש סדר העדיפויות.</p>
                   <p>האיגוד מתחייב שלא לעשות שימוש במידע המסופק לו ע"י הפונים אלא על מנת לאפשר את מתן המידע והשירותים ובהתאם לכל דין.</p>
                   <p>באמצעות יצירת קשר עם האיגוד אני מאשר את הטופס ואת תנאיו.</p>
                   <p>האתר מאובטח באמצעות שימוש באמצעי אבטחה מתקדמים אשר מטרתם להבטיח שימוש תקין וגלילה בטוחה באתר וכן על מנת לשמור על פרטיות המשתמשים. כל המשתמש באתר ובשירותיו מתחייב כי לא יעשה כל פעילות שיש בה כדי לשבש את פעילות האתר, גניבת מידע על משתמשים ופריצה של מנגנוני האבטחה של האתר.</p>
                   <p>במקרה של שימוש לרעה, האיגוד יפעל נגד כל פעילות בכל דרך חוקית אשר תעמוד לרשותו לרבות חסימת המשתמש מגישה לאתר ונקיטת הליכים משפטיים נגד המשתמש באם יפעל כאמור.</p>

                            <!-- קניין רוחני -->
                   <h4>קניין רוחני</h4>
                   <p>כל זכויות הקניין הרוחני באתר זה הכוללים זכויות יוצרים, זכויות הפצה, סודות מסחריים, סימני המסחר וכל הקניין הרוחני מכל סוג שהוא, הן בנוגע לעיצוב האתר, הן באשר לתכנים המופיעים בו הינן רכושו הבלעדי של האיגוד.</p>
                   <p><strong>אין להעתיק, לשכפל, להפיץ, לפרסם או להשתמש בכל דרך אחרת במידע כלשהו מן האתר ו/או מהאתר, אלא אם ניתנה הסכמה לכך מראש ובכתב מטעם האיגוד</strong>.</p>

                            <!-- דין וסמכות שיפוט -->
                   <h4>דין וסמכות שיפוט</h4>
                   <p>פרשנותו ואכיפתו של תקנון זה ו/או כל פעולה או סכסוך הנובע ממנו יעשו בהתאם לדין הישראלי בלבד ולבית המשפט המוסמך ב<strong>נתיבות</strong> תהא מסורה סמכות השיפוט הבלעדית.</p>

                            <!-- יצירת קשר -->
                   <h4>יצירת קשר</h4>
                   <p>לכל שאלה ופנייה ניתן ליצור קשר עם האיגוד במייל <strong>s0534142893@gmail.com</strong> או בכתובת <strong>רחוב העליה 22, נתיבות</strong> בשעות הפעילות של האיגוד.</p>
                            
                            <!-- מידע נוסף -->
                   <h4>מידע נוסף</h4>
                   <p><strong>תאריך עדכון אחרון:</strong> ינואר 2025 | <strong>הסכמה:</strong> השימוש באתר ובשירותים מהווה הסכמה מלאה לתנאים ולמדיניות הפרטיות המפורטים לעיל.</p>
                            
                   <div class="contact-box">
                       <p>
                                    <strong>מייל:</strong> s0534142893@gmail.com | <strong>כתובת:</strong> רחוב העליה 22, נתיבות | <strong>סוג ארגון:</strong> עמותה רשומה
                                </p>
                   </div>
                            </div>
              </div>


        <!-- Footer -->
        <footer class="footer">
            <div class="container">
                <div class="footer-content" style="justify-content: center; gap: 100px;">
                    <div class="footer-section" style="flex: 0 0 auto; max-width: 400px;">
                        <h3>אודותינו</h3>
                        <p>איגוד עמלים נוסד בשנת תשפ"ד מתוך תחושת שליחות עמוקה להעניק לבני התורה יוצאי אתיופיה את ההזדמנות והליווי והמסגרת הרוחנית הראויה.</p>
                    </div>

                    <div class="footer-section" style="flex: 0 0 auto; max-width: 300px;">
                        <h3>פרטי התקשרות</h3>
                        <div style="display: flex; flex-direction: column; gap: 10px;">
                            <div class="contact-item">
                                <span>📞</span>
                                <span>050-1234567</span>
                            </div>
                            <div class="contact-item">
                                <span>📧</span>
                                <a href="mailto:info@amalim.org.il" class="email-link">info@amalim.org.il</a>
                            </div>
                            <div class="contact-item">
                                <span>📍</span>
                                <span>ירושלים, ישראל</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="footer-bottom">
                    <p>© 2025 איגוד עמלים - כל הזכויות שמורות</p>
                    <a href="#" onclick="showPage('terms'); return false;">תנאי שימוש ומדיניות פרטיות</a>
                </div>
            </div>
        </footer>
    </div>

    <div id="shiurim-page" class="page">
        <h2 style="color: black; text-align: center; margin: 20px 0; font-size: 4em; font-weight: bold; font-family: 'Frank Ruhl Libre', serif; letter-spacing: 3px;">
            <div style="display: inline-block; vertical-align: middle; margin-right: 0px;">
                <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #D4AF37, #B8860B); margin-bottom: 3px;"></div>
                <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #B8860B, #8B7355); margin-bottom: 3px;"></div>
                <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #8B7355, #B8860B);"></div>
            </div>פעילויות<div style="display: inline-block; vertical-align: middle; margin-left: 0px;">
                <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #B8860B, #8B7355); margin-bottom: 3px;"></div>
                <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #8B7355, #B8860B); margin-bottom: 3px;"></div>
                <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #B8860B, #D4AF37);"></div>
            </div>
        </h2>
        <div class="page-content">
        </div>
        
        
        
        <!-- כרטיסיה שלמה למפעל כתיבת חבורה -->
        <div class="content-box" style="background: linear-gradient(135deg, #F0F0E6 0%, #E8E8D8 50%, #E0E0D0 100%); border: 3px solid #D4AF37; box-shadow: 0 20px 40px rgba(212, 175, 55, 0.3), 0 10px 20px rgba(0, 0, 0, 0.2); transform: translateY(0); transition: all 0.3s ease; position: relative; overflow: hidden;">
            <div style="position: absolute; top: 0; left: 0; right: 0; height: 5px; background: linear-gradient(90deg, #D4AF37, #B8860B, #DAA520);"></div>
            <p class="title" style="color: #D4AF37; font-size: 3.2em; font-weight: 900; margin-bottom: 2px; text-shadow: 2px 2px 4px rgba(212, 175, 55, 0.3); background: linear-gradient(45deg, #D4AF37, #B8860B); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; filter: drop-shadow(1px 1px 2px rgba(0,0,0,0.1));">מפעל כתיבת חבורה</p>
            <p class="title" style="color: #B8860B; font-size: 1.5em; font-weight: bold; margin-bottom: 25px; text-shadow: 1px 1px 2px rgba(184, 134, 11, 0.3);">קונטרס תורני ייחודי</p>
            <p style="color: #8B7355; font-size: 1.8em; line-height: 1.3; margin-bottom: 0px; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">מפעל ייחודי בו הבחורים כותבים חידושי תורה, דרשות ומאמרים תורניים ברמה גבוהה.</p>
            <p style="color: #8B7355; font-size: 1.8em; line-height: 1.3; margin-bottom: 0px; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">מדי סוף זמן יוצא קונטרס ובו כל הסגולות שבחורים כתבו, מהווה תיעוד של התקדמותם הרוחנית והלימודית.</p>
            <p style="color: #8B7355; font-size: 1.8em; line-height: 1.3; margin-bottom: 0px; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">הקונטרס כולל חידושי תורה, דרשות, מאמרים תורניים וסגולות שכתבו הבחורים במהלך הזמן.</p>
            <p style="color: #8B7355; font-size: 1.8em; line-height: 1.3; margin-bottom: 0px; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">המפעל מעודד את הבחורים לפתח את כישורי הכתיבה התורנית שלהם ולשתף את חידושיהם עם הקהילה.</p>
        </div>
        <!-- Footer -->
        <footer class="footer">
            <div class="container">
                <div class="footer-content" style="justify-content: center; gap: 100px;">
                    <div class="footer-section" style="flex: 0 0 auto; max-width: 400px;">
                        <h3>אודותינו</h3>
                        <p>איגוד עמלים נוסד בשנת תשפ"ד מתוך תחושת שליחות עמוקה להעניק לבני התורה יוצאי אתיופיה את ההזדמנות והליווי והמסגרת הרוחנית הראויה.</p>
                    </div>

                    <div class="footer-section" style="flex: 0 0 auto; max-width: 300px;">
                        <h3>פרטי התקשרות</h3>
                        <div style="display: flex; flex-direction: column; gap: 10px;">
                            <div class="contact-item">
                                <span>📞</span>
                                <span>050-1234567</span>
                            </div>
                            <div class="contact-item">
                                <span>📧</span>
                                <a href="mailto:info@amalim.org.il" class="email-link">info@amalim.org.il</a>
                            </div>
                            <div class="contact-item">
                                <span>📍</span>
                                <span>ירושלים, ישראל</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="footer-bottom">
                    <p>© 2025 איגוד עמלים - כל הזכויות שמורות</p>
                    <a href="#" onclick="showPage('terms'); return false;">תנאי שימוש ומדיניות פרטיות</a>
                </div>
            </div>
        </footer>
    </div>

    <div id="events-page" class="page events-page">
        <div class="page-content">
            <div class="title-box" style="margin-top: 0;">
                <h2>אירועים הנעשים על ידי האיגוד</h2>
            </div>
        </div>
        
        <!-- כרטיסיות אירועים עם קישורים לפרטים נוספים -->
        <div class="events-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 25px; margin: 20px auto; max-width: 95%;">
            <!-- כרטיסיה 1: ציון שנה לאיגוד עמלים -->
            <div class="event-card" style="position: relative; background: #F5F5DC; border: none; border-radius: 0px; padding: 20px; box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2); transition: all 0.3s ease; cursor: pointer; text-align: center;" onclick="showEventDetails('event1')" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                <div style="text-align: center; margin-bottom: 15px;">
                    <img src="https://mizrach.co.il/wp-content/uploads/2025/01/%D7%A6%D7%99%D7%95%D7%9F-%D7%A9%D7%A0%D7%94-%D7%9C%D7%94%D7%A7%D7%9E%D7%AA-%D7%90%D7%99%D7%92%D7%95%D7%93-%D7%A2%D7%9E%D7%9C%D7%99%D7%9D-%D7%99%D7%95%D7%A6%D7%90%D7%99-%D7%90%D7%AA%D7%99%D7%95%D7%A4%D7%99%D7%94-36-scaled.jpg" alt="ציון שנה לאיגוד עמלים" style="width: 100%; height: 180px; object-fit: cover; border-radius: 0px; border: 3px solid #D4AF37; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);" />
                </div>
                <h3 style="color: #8B7355; font-size: 28px; margin-bottom: 12px; text-align: center; font-weight: bold;">ציון שנה לאיגוד עמלים</h3>
                <p class="event-date" style="color: #B8860B; font-size: 22px; margin-bottom: 12px; text-align: center; font-weight: bold;">מוצאי זאת חנוכה תשפ"ד</p>
                <p style="color: #333333; font-size: 18px; line-height: 1.4; text-align: center; margin-bottom: 15px;">מעמד היסטורי מרגש ומרומם בהשתתפות מאות בני תורה יוצאי אתיופיה מכל קצוות הארץ</p>
                <div class="details-btn" style="background: linear-gradient(135deg, #8B7355, #6B5344); color: #F5F5DC; border: none; padding: 12px 25px; border-radius: 0px; font-size: 18px; font-weight: bold; text-align: center; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);">פרטים נוספים</div>
            </div>

            <!-- כרטיסיה 2: סיכום עונת רישום ראשונה ומוצלחת -->
            <div class="event-card" style="position: relative; background: #F5F5DC; border: none; border-radius: 0px; padding: 20px; box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2); transition: all 0.3s ease; cursor: pointer; text-align: center;" onclick="showEventDetails('event2')" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                <div style="text-align: center; margin-bottom: 15px;">
                    <img src="https://hm-news.co.il/wp-content/uploads/2024/09/WhatsApp-Image-2024-09-03-at-19.11.28.jpeg" alt="סיכום עונת רישום ראשונה ומוצלחת" style="width: 100%; height: 180px; object-fit: cover; border-radius: 0px; border: 3px solid #D4AF37; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);" />
                </div>
                <h3 style="color: #8B7355; font-size: 28px; margin-bottom: 12px; text-align: center; font-weight: bold;">האיגוד מסכם בסיפוק עונת רישום ראשונה ומוצלחת</h3>
                <p class="event-date" style="color: #B8860B; font-size: 22px; margin-bottom: 12px; text-align: center; font-weight: bold;">תשפ"ה-אייר</p>
                <p style="color: #333333; font-size: 18px; line-height: 1.4; text-align: center; margin-bottom: 15px;">עונת רישום ראשונה ומוצלחת של בני ישיבות יוצאי אתיופיה לישיבות המובילות</p>
                <div class="details-btn" style="background: linear-gradient(135deg, #8B7355, #6B5344); color: #F5F5DC; border: none; padding: 12px 25px; border-radius: 0px; font-size: 18px; font-weight: bold; text-align: center; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);">פרטים נוספים</div>
            </div>

            <!-- כרטיסיה 3: כינוס הכנה לקבלת התורה -->
            <div class="event-card" style="position: relative; background: #F5F5DC; border: none; border-radius: 0px; padding: 20px; box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2); transition: all 0.3s ease; cursor: pointer; text-align: center;" onclick="showEventDetails('event3')" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                <div style="text-align: center; margin-bottom: 15px;">
                    <img src="https://storage.bhol.co.il/media/lt/1657699/gallery/811284_tumb_800Xauto.jpg" alt="כינוס הכנה לקבלת התורה" style="width: 100%; height: 180px; object-fit: cover; border-radius: 0px; border: 3px solid #D4AF37; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;" />
                </div>
                <h3 style="color: #8B7355; font-size: 28px; margin-bottom: 12px; text-align: center; font-weight: bold;">כינוס הכנה לקבלת התורה</h3>
                <p class="event-date" style="color: #B8860B; font-size: 22px; margin-bottom: 12px; text-align: center; font-weight: bold;">ערב שבעות-ה' סיון תשפ"ה</p>
                <p style="color: #333333; font-size: 18px; line-height: 1.4; text-align: center; margin-bottom: 15px;">כינוס מיוחד להכנה רוחנית לקראת חג מתן תורה בהשתתפות מרנן ורבנן גדולי ומאורי הדור שליט"א</p>
                <div class="details-btn" style="background: linear-gradient(135deg, #8B7355, #6B5344); color: #F5F5DC; border: none; padding: 12px 25px; border-radius: 0px; font-size: 18px; font-weight: bold; text-align: center; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);">פרטים נוספים</div>
            </div>
        </div>

        <!-- כרטיסיות מלאות של האירועים -->
        <!-- כרטיסיה מלאה 1: ציון שנה לאיגוד עמלים -->
        <div id="full-event1" class="full-event-card" style="display: none; position: relative; padding-top: 0; margin-bottom: 0;">
            <div class="back-notification" id="notification1">
                כדי לחזור אחורה, לחץ על "אירועים" בתפריט!
            </div>
            <div class="leader-text" style="width: 100%; max-width: 100%; text-align: center;">
                <h3>ציון שנה לאיגוד עמלים</h3>
                
                <!-- קרדיט למקור הכתבה -->
                <div style="width: 100%; text-align: center; margin: 30px 0 40px 0; padding: 20px; position: relative; overflow: hidden;">
                    <!-- כפתור מגניב עם כל המידע -->
                    <a href="https://mizrach.co.il/13718/" target="_blank" style="display: inline-block; background: linear-gradient(45deg, #B8860B, #D4AF37, #B8860B); color: white; padding: 25px 40px; border-radius: 15px; text-decoration: none; font-weight: bold; font-size: 22px; transition: all 0.4s ease; box-shadow: 0 8px 20px rgba(184, 134, 11, 0.4), inset 0 2px 5px rgba(255, 255, 255, 0.3); border: 2px solid #ffffff; text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3); position: relative; overflow: hidden;" onmouseover="this.style.transform='scale(1.05) translateY(-3px)'; this.style.boxShadow='0 12px 25px rgba(184, 134, 11, 0.5), inset 0 2px 5px rgba(255, 255, 255, 0.3)'" onmouseout="this.style.transform='scale(1) translateY(0)'; this.style.boxShadow='0 8px 20px rgba(184, 134, 11, 0.4), inset 0 2px 5px rgba(255, 255, 255, 0.3)'">
                        <span style="position: relative; z-index: 2; font-size: 26px; font-weight: 900;">
                            מקור: כותל המזרח | לחץ כאן לקריאת הכתבה המלאה
                        </span>
                        <!-- אפקט זוהר -->
                        <div style="position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent); transform: rotate(45deg); transition: all 0.4s ease; opacity: 0;" onmouseover="this.style.opacity='1'; this.style.transform='rotate(45deg) translateX(100%)'" onmouseout="this.style.opacity='0'; this.style.transform='rotate(45deg)'"></div>
                    </a>
                </div>
                
                <h4>מעמד היסטורי מרגש</h4>
                <p style="width: 100%; max-width: 100%; text-align: right; line-height: 1.8; font-size: 24px; color: #2c3e50; font-weight: 600; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">
                    במוצאי 'זאת חנוכה' נערך בבית שמש מעמד היסטורי מרגש ומרומם שבו התכנסו מאות בני תורה יוצאי אתיופיה מכל קצוות הארץ למעמד 'להודות ולהלל' לרגל שנה ליסוד איגוד 'עמלים'. במעמד השתתפו נשיא האיגוד מרן ראש הישיבה הגר"א סאלים חבר מועצת חכמי התורה, מרן הראשל"צ הגר"ד יוסף שליט"א, גדולי ראשי הישיבות שליט"א, רבני בני התורה יוצאי אתיופיה, יו"ר תנועת ש"ס הרב אריה דרעי השר לשירותי דת הרב מיכאל מלכיאלי ראש העיר בית שמש הרב גרינברג ועוד.<br><br>
                </p>

                <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                    <img src="https://mizrach.co.il/wp-content/uploads/2025/01/%D7%A6%D7%99%D7%95%D7%9F-%D7%A9%D7%A0%D7%94-%D7%9C%D7%94%D7%A7%D7%9E%D7%AA-%D7%90%D7%99%D7%92%D7%95%D7%93-%D7%A2%D7%9E%D7%9C%D7%99%D7%9D-%D7%99%D7%95%D7%A6%D7%90%D7%99-%D7%90%D7%AA%D7%99%D7%95%D7%A4%D7%99%D7%94-36-scaled.jpg" alt="ציון שנה לאיגוד עמלים" style="width: 100%; max-width: 100%; height: auto; object-fit: cover;" />
                </div>

                <p style="width: 100%; max-width: 100%; text-align: right; line-height: 1.8; font-size: 24px; color: #2c3e50; font-weight: 600; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">
                    איגוד 'עמלים' המהווה בית לכל בני התורה יוצאי אתיופיה בארה"ק ועוסק בשיבוץ והכוונה לבני הישיבות יוצאי אתיופיה, ציין במוצאי 'זאת חנוכה' שנה ליסוד האיגוד, כשלמעמד שנערך בבית שמש עלו ובאו כל גדולי ראשי הישיבות שליט"א.<br><br>
                </p>

                <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                    <img src="https://mizrach.co.il/wp-content/uploads/2025/01/%D7%A6%D7%99%D7%95%D7%9F-%D7%A9%D7%A0%D7%94-%D7%9C%D7%94%D7%A7%D7%9E%D7%AA-%D7%90%D7%99%D7%92%D7%95%D7%93-%D7%A2%D7%9E%D7%9C%D7%99%D7%9D-%D7%99%D7%95%D7%A6%D7%90%D7%99-%D7%90%D7%AA%D7%99%D7%95%D7%A4%D7%99%D7%94-35-scaled.jpg" alt="ציון שנה לאיגוד עמלים" style="width: 100%; max-width: 100%; height: auto; object-fit: cover;" />
                </div>

                <p style="width: 100%; max-width: 100%; text-align: right; line-height: 1.8; font-size: 24px; color: #2c3e50; font-weight: 600; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">
                    את המעמד פתח הרב דרעי שסקר בדבריו את כל ההשתלשלות מאז הפסק של מרן הגר"ע יוסף על יהדותם של בני העדה והבאתם ארצה והביע את התרגשותו הרבה לראות דור חדש מבני התורה יוצאי אתיופיה שהינם בני תורה. בסיום דבריו שיבח הרב דרעי את פעולותיהם העקביות והנחושות של ראשי האיגוד, ושיבח בדבריו את פעולותיהם העקביות והנחושות של ראשי האיגוד. היו"ר פנה מעל הבמה וביקש להעביר את המסר לשרים ולכל נציגי ש"ס ברשויות במקומיות להיות לעזר ואחיסמך ולהירתם בכל הכוח לכל צרכי האיגוד בכל דבר ועניין, לדברים הצטרף השר לשירותי דת חה"כ מיכאל מלכיאלי שסיפר על היכרותו הארוכה עם פעילות האיגוד, ועל חשיבות שימור הדרך כבני ישיבות דווקא.<br><br>
                </p>

                <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                    <img src="https://mizrach.co.il/wp-content/uploads/2025/01/%D7%A6%D7%99%D7%95%D7%9F-%D7%A9%D7%A0%D7%94-%D7%9C%D7%94%D7%A7%D7%9E%D7%AA-%D7%90%D7%99%D7%92%D7%95%D7%93-%D7%A2%D7%9E%D7%9C%D7%99%D7%9D-%D7%99%D7%95%D7%A6%D7%90%D7%99-%D7%90%D7%AA%D7%99%D7%95%D7%A4%D7%99%D7%94-34-scaled.jpg" alt="ציון שנה לאיגוד עמלים" style="width: 100%; max-width: 100%; height: auto; object-fit: cover;" />
                </div>

                <p style="width: 100%; max-width: 100%; text-align: right; line-height: 1.8; font-size: 24px; color: #2c3e50; font-weight: 600; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">
                    רגע השיא במעמד היה עת נשא מרן רה"י נשיא האיגוד הגר"א סאלים שליט"א את דבריו בנוכחותו של מרן הראש"L הגר"ד יוסף שליט"א וציין בדבריו את השלימות של עמ"י כאשר יש מקום לכל בני התורה ולכל עדה בהיכלי הישיבות.<br><br>
                </p>

                <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                    <img src="https://mizrach.co.il/wp-content/uploads/2025/01/%D7%A6%D7%99%D7%95%D7%9F-%D7%A9%D7%A0%D7%94-%D7%9C%D7%94%D7%A7%D7%9E%D7%AA-%D7%90%D7%99%D7%92%D7%95%D7%93-%D7%A2%D7%9E%D7%9C%D7%99%D7%9D-%D7%99%D7%95%D7%A6%D7%90%D7%99-%D7%90%D7%AA%D7%99%D7%95%D7%A4%D7%99%D7%94-31-scaled.jpg" alt="ציון שנה לאיגוד עמלים" style="width: 100%; max-width: 100%; height: auto; object-fit: cover;" />
                </div>

                <p style="width: 100%; max-width: 100%; text-align: right; line-height: 1.8; font-size: 24px; color: #2c3e50; font-weight: 600; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">
                    התרגשות עצומה נרשמה בקהל עת הקריא הגרי"ח ברכץ את מכתבו המיוחד של מרן ראש הישיבה הגרמ"ה הירש שליט"א למעמד, במכתב יצא רה"י מגדרו וכתב "ומה מאוד שמחתי לשמוע שהנכם מתאספים יראי ה' לחזק את לומדי ועמלי התורה יוצאי אתיופיה, וחפץ ה' בידכם יצליח לרומם ולעודד את כל לומדי התורה". במעמד נשאו דברים מרנן ורבנן ראשי הישיבות הגר"י שרבאני מראשי ישיבת 'מאור התורה', הגר"ח כהן ראש ישיבות 'באר התלמוד', הגר"י לסרי ראש ישיבת 'אש התלמוד', הגר"ש ביטאן ראש ישיבת 'דעת חיים', הגר"ד זאדה ראש ישיבת 'תורת אברהם', הרה"ג רבי אברהם עידן ראש ישיבת 'עטרת הלוי', ועוד.<br><br>
                </p>

                <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                    <img src="https://mizrach.co.il/wp-content/uploads/2025/01/%D7%A6%D7%99%D7%95%D7%9F-%D7%A9%D7%A0%D7%94-%D7%9C%D7%94%D7%A7%D7%9E%D7%AA-%D7%90%D7%99%D7%92%D7%95%D7%93-%D7%A2%D7%9E%D7%9C%D7%99%D7%9D-%D7%99%D7%95%D7%A6%D7%90%D7%99-%D7%90%D7%AA%D7%99%D7%95%D7%A4%D7%99%D7%94-27-scaled.jpg" alt="ציון שנה לאיגוד עמלים" style="width: 100%; max-width: 100%; height: auto; object-fit: cover;" />
                </div>

                <p style="width: 100%; max-width: 100%; text-align: right; line-height: 1.8; font-size: 24px; color: #2c3e50; font-weight: 600; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">
                    ראשי הישיבות כולם ציינו בדבריהם את הצלחתם המשגשגת של בני התורה יוצאי אתיופיה בהיכלי הישיבות, את מידותיהם התרומיות והנעלות, ואת נחישותם הרבה. כמו כן נשאו דברים רבני בני התורה יוצאי אתיופיה ובראשם הגר"י הדנה רבה הראשי של בני התורה יוצאי אתיופיה לשעבר, והגר"ר וובשת רבה הראשי הנוכחי של בני התורה יוצאי אתיופיה, הגר"י בלאצ'ו רב בני התורה יוצאי אתיופיה בתל-ציון ועוד. יו"ר האיגוד הרב נתנאל פרץ ומנהלי האיגוד הרב ניסים יברקן והרב עודד תמנה הודו לרה"ג אברהם עידן ראש ישיבת 'עטרת הלוי' על מסירותו ועזרתו הרבה להצלחת האיגוד בכל עת ובכל שעה ולמנהל מרכז ההכוון ושיבוץ של 'בקר בהיכלו' ושל 'איגוד 'עמלים' הרב דוד רביבו על עזרתו הרבה בשיבוץ הבחורים.<br><br>
                </p>

                <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                    <img src="https://mizrach.co.il/wp-content/uploads/2025/01/%D7%A6%D7%99%D7%95%D7%9F-%D7%A9%D7%A0%D7%94-%D7%9C%D7%94%D7%A7%D7%9E%D7%AA-%D7%90%D7%99%D7%92%D7%95%D7%93-%D7%A2%D7%9E%D7%9C%D7%99%D7%9D-%D7%99%D7%95%D7%A6%D7%90%D7%99-%D7%90%D7%AA%D7%99%D7%95%D7%A4%D7%99%D7%94-22-scaled.jpg" alt="ציון שנה לאיגוד עמלים" style="width: 100%; max-width: 100%; height: auto; object-fit: cover;" />
                </div>

                <p style="width: 100%; max-width: 100%; text-align: right; line-height: 1.8; font-size: 24px; color: #2c3e50; font-weight: 600; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">
                    ולחבר מועצת העיר ומחזיק תיק בני התורה הרב שמואל חזן על עשייתו הברוכה למען כלל בני התורה בעיר בית שמש ובני התורה יוצאי אתיופיה בפרט, ועל הירתמותו הרבה להצלחת הכינוס יחד עם הרב חננאל עזרי יו"ר איגוד בני התורה יוצאי אתיופיה והרב אריאל מלכה מנהל תלמוד תורה 'תורת השם'  , לרה"ע הרב שמוליק גרינברג, לממ"ק ראש העיר אשדוד אבי אמסלם, וסגן ראש העיר נתיבות יגאל פרץ על הירתמותם לעניין.<br><br>
                </p>

                <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                    <img src="https://mizrach.co.il/wp-content/uploads/2025/01/%D7%A6%D7%99%D7%95%D7%9F-%D7%A9%D7%A0%D7%94-%D7%9C%D7%94%D7%A7%D7%9E%D7%AA-%D7%90%D7%99%D7%92%D7%95%D7%93-%D7%A2%D7%9E%D7%9C%D7%99%D7%9D-%D7%99%D7%95%D7%A6%D7%90%D7%99-%D7%90%D7%AA%D7%99%D7%95%D7%A4%D7%99%D7%94-17-scaled.jpg" alt="ציון שנה לאיגוד עמלים" style="width: 100%; max-width: 100%; height: auto; object-fit: cover;" />
                </div>

                <p style="width: 100%; max-width: 100%; text-align: right; line-height: 1.8; font-size: 24px; color: #2c3e50; font-weight: 600; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">
                    בסיום המעמד המרגש קיבלו הנוכחים ביטאון מיוחד הנקרא 'לאור עולם' אשר יצא לאור לרגל הכינוס, ובו סיקור מקיף על פעילות האיגוד, פרקי דעת ומאמרים מגדולי ראשי הישיבות ורבני בני התורה יוצאי אתיופיה, ועוד.
                </p>

                <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                    <img src="https://mizrach.co.il/wp-content/uploads/2025/01/%D7%A6%D7%99%D7%95%D7%9F-%D7%A9%D7%A0%D7%94-%D7%9C%D7%94%D7%A7%D7%9E%D7%AA-%D7%90%D7%99%D7%92%D7%95%D7%93-%D7%A2%D7%9E%D7%9C%D7%99%D7%9D-%D7%99%D7%95%D7%A6%D7%90%D7%99-%D7%90%D7%AA%D7%99%D7%95%D7%A4%D7%99%D7%94-14-scaled.jpg" alt="ציון שנה לאיגוד עמלים" style="width: 100%; max-width: 100%; height: auto; object-fit: cover;" />
                </div>
                
                <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                    <iframe width="100%" height="600" src="https://www.youtube.com/embed/MDI4atxGplI" title="ציון שנה לאיגוד עמלים" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                    <img src="https://mizrach.co.il/wp-content/uploads/2025/01/%D7%A6%D7%99%D7%95%D7%9F-%D7%A9%D7%A0%D7%94-%D7%9C%D7%94%D7%A7%D7%9E%D7%AA-%D7%90%D7%99%D7%92%D7%95%D7%93-%D7%A2%D7%9E%D7%9C%D7%99%D7%9D-%D7%99%D7%95%D7%A6%D7%90%D7%99-%D7%90%D7%AA%D7%99%D7%95%D7%A4%D7%99%D7%94-29-scaled.jpg" alt="ציון שנה לאיגוד עמלים" style="width: 100%; max-width: 100%; height: auto; object-fit: cover;" />
                </div>
            </div>
        </div>


        <!-- כרטיסיות מלאות של האירועים -->
        <!-- כרטיסיה מלאה 2: סיכום עונת רישום ראשונה ומוצלחת -->
        <div id="full-event2" class="full-event-card" style="display: none; position: relative;">
            <div class="back-notification" id="notification2">
                 כדי לחזור אחורה, לחץ על "אירועים" בתפריט!
            </div>
            <div class="leader-text" style="width: 100%; max-width: 100%; text-align: center;">
                <h3>האיגוד מסכם בסיפוק עונת רישום ראשונה ומוצלחת</h3>
                
                <!-- קרדיט למקור הכתבה -->
                <div style="width: 100%; text-align: center; margin: 30px 0 40px 0; padding: 20px; position: relative; overflow: hidden;">
                    <!-- כפתור מגניב עם כל המידע -->
                    <a href="https://mizrach.co.il/10159/" target="_blank" style="display: inline-block; background: linear-gradient(45deg, #B8860B, #D4AF37, #B8860B); color: white; padding: 25px 40px; border-radius: 15px; text-decoration: none; font-weight: bold; font-size: 22px; transition: all 0.4s ease; box-shadow: 0 8px 20px rgba(184, 134, 11, 0.4), inset 0 2px 5px rgba(255, 255, 255, 0.3); border: 2px solid #ffffff; text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3); position: relative; overflow: hidden;" onmouseover="this.style.transform='scale(1.05) translateY(-3px)'; this.style.boxShadow='0 12px 25px rgba(184, 134, 11, 0.5), inset 0 2px 5px rgba(255, 255, 255, 0.3)'" onmouseout="this.style.transform='scale(1) translateY(0)'; this.style.boxShadow='0 8px 20px rgba(184, 134, 11, 0.4), inset 0 2px 5px rgba(255, 255, 255, 0.3)'">
                        <span style="position: relative; z-index: 2; font-size: 26px; font-weight: 900;">
                            מקור: כותל המזרח | לחץ כאן לקריאת הכתבה המלאה
                        </span>
                        <!-- אפקט זוהר -->
                        <div style="position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent); transform: rotate(45deg); transition: all 0.4s ease; opacity: 0;" onmouseover="this.style.opacity='1'; this.style.transform='rotate(45deg) translateX(100%)'" onmouseout="this.style.opacity='0'; this.style.transform='rotate(45deg)'"></div>
                    </a>
                </div>
                
                <h4>סיכום תקופת הרישום</h4>
                <p style="width: 100%; max-width: 100%; text-align: right; line-height: 1.8; font-size: 24px; color: #2c3e50; font-weight: 600; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">
                    אחר תקופת רישום מוצלחת, התקבלו בני ישיבות החברים באיגוד 'עמלים' שע"י יוצאי אתיופיה, לישיבות 'מאור התורה', 'דעת חיים', 'יסודות', 'ברית יעקב', 'אש התלמוד', 'באר התלמוד ירושלים', 'אוהל יוסף ב"ב', 'רכסים', 'תורת אברהם', 'אוהל תורה', 'תפארת הלוי', ועוד.<br><br>
                </p>

                <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                    <img src="https://hm-news.co.il/wp-content/uploads/2024/09/WhatsApp-Image-2024-09-03-at-19.11.28.jpeg" alt="סיכום עונת רישום ראשונה ומוצלחת" style="width: 100%; max-width: 100%; height: auto; object-fit: cover;" />
                </div>

                <p style="width: 100%; max-width: 100%; text-align: right; line-height: 1.8; font-size: 24px; color: #2c3e50; font-weight: 600; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">
                    בתקופה האחרונה פעל האיגוד באינטנסיביות במטרה לרשום לכל הישיבות הגדולות המובילות, בחורים מצוינים מהטובים ביותר בישיבות הקטנות ברחבי הארץ, זאת יחד עם מנהל מרכז ההכוון לבני ישיבות הרב דוד רביבו שליט"א.<br><br>
                </p>

                 <p style="width: 100%; max-width: 100%; text-align: right; line-height: 1.8; font-size: 24px; color: #2c3e50; font-weight: 600; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">
                   עם תחילת זמן קיץ התקיים מעמד היסטורי של כלל בני הישיבות ואברכי הכוללים יוצאי אתיופיה לחיזוק והכנה לקראת חג מתן תורה כאשר לפני הכינוס נכנסו ראשי האיגוד עם הגאון הרב יוסף חיים סויסה שליט"א ר"י תורה ודעת, הרב יעקב מויאל מנהל מרכז ליווי והכוונה לבני הישיבות בקרן ההסעות ופרויקט החונכים ברשת 'בני יוסף' והרב יוסף ברכץ –משגיח ישיבת דבר אברהם ב"ב, למעונו של מרן ראש הישיבה הגאון הגדול רבי משה הלל הירש שליט"א. הגרמ"ה קבלם בהתלהבות רבה והתפעל עד מאוד מעוצמת הפעילות, ומרמתם של בני הישיבות החברים באיגוד, ובסיום השיחה קיבלו את ברכתו כאשר מרן רבנו רה"י שליט"א יצא מגדרו במכתב מיוחד שהכה הדים רבים.<br><br>
                </p>

                <p style="width: 100%; max-width: 100%; text-align: right; line-height: 1.8; font-size: 24px; color: #2c3e50; font-weight: 600; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">
                   בתחילת חודש תמוז עלו תלמידי האיגוד המסיימים ישיבות קטנות לירושלים לצורך מבחן תובעני ומפרך אשר נערך במשותף על ידי ראשי הישיבות בירושלים, ביניהם הגאון הגדול רבי ישי טולדאנו שליט"א, הגאון רבי שלמה כהן שליט"א, הגאון רבי משה הראל שליט"א והגאון רבי יוסף חיים סויסה שליט"א. ראשי הישיבות אשר בחנו את הבחורים כמצרף כסף והעמיקו עמם בנבכי הסוגיות הביעו את התפעלותם הרבה מכישורי הנבחנים ושליטתם ב'רייד' הישיבתי לעומקו ומנועם הליכותיהם.<br><br>
                </p>

                <p style="width: 100%; max-width: 100%; text-align: right; line-height: 1.8; font-size: 24px; color: #2c3e50; font-weight: 600; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">
                   עוד הוסיפו ראשי הישיבות כי ימליצו בחום לראשי ישיבות נוספים ללקט לישיבותיהם את המיוחדים מבני האיגוד האיכותיים, אשר כל ישיבה יכולה להתפאר בהם.<br><br>
                </p>

                <p style="width: 100%; max-width: 100%; text-align: right; line-height: 1.8; font-size: 24px; color: #2c3e50; font-weight: 600; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">
                   כעת, עם תום עונת הרישום מסכמים ראשי האיגוד בסיפוק רב את הצלחתם הגדולה של הבחורים היקרים שיחיו, ומציינים כי הבחורים זכו להתקבל לישיבות הגדולות המובחרות מהמזרח של עולם התורה הספרדי.
                </p>
            </div>
        </div>

                <!-- כרטיסיה מלאה 3: כינוס הכנה לקבלת התורה -->
        <div id="full-event3" class="full-event-card" style="display: none; position: relative; padding-top: 20px;">
            <div class="back-notification" id="notification3">
                        כדי לחזור אחורה, לחץ על "אירועים" בתפריט!
                </div>
                <div class="leader-text" style="width: 100%; max-width: 100%; text-align: center;">
                    <h3>כך התכוננו בני האיגוד לקבלת התורה בערב החג</h3>
                    
                    <!-- קרדיט למקור הכתבה -->
                    <div style="width: 100%; text-align: center; margin: 30px 0 40px 0; padding: 20px; position: relative; overflow: hidden;">
                        <!-- כפתור מגניב עם כל המידע -->
                        <a href="https://www.bhol.co.il/news/1695666" target="_blank" style="display: inline-block; background: linear-gradient(45deg, #B8860B, #D4AF37, #B8860B); color: white; padding: 25px 40px; border-radius: 15px; text-decoration: none; font-weight: bold; font-size: 22px; transition: all 0.4s ease; box-shadow: 0 8px 20px rgba(184, 134, 11, 0.4), inset 0 2px 5px rgba(255, 255, 255, 0.3); border: 2px solid #ffffff; text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3); position: relative; overflow: hidden;" onmouseover="this.style.transform='scale(1.05) translateY(-3px)'; this.style.boxShadow='0 12px 25px rgba(184, 134, 11, 0.5), inset 0 2px 5px rgba(255, 255, 255, 0.3)'" onmouseout="this.style.transform='scale(1) translateY(0)'; this.style.boxShadow='0 8px 20px rgba(184, 134, 11, 0.4), inset 0 2px 5px rgba(255, 255, 255, 0.3)'">
                            <span style="position: relative; z-index: 2; font-size: 26px; font-weight: 900;">
                                מקור: מחדרי חדרים | לחץ כאן לקריאת הכתבה המלאה
                            </span>
                            <!-- אפקט זוהר -->
                            <div style="position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent); transform: rotate(45deg); transition: all 0.4s ease; opacity: 0;" onmouseover="this.style.opacity='1'; this.style.transform='rotate(45deg) translateX(100%)'" onmouseout="this.style.opacity='0'; this.style.transform='rotate(45deg)'"></div>
                        </a>
                    </div>
                    
                    <h4>בני התורה מסלתה ומשמנה של הקהילה האתיופית התכנסו לכינוס הכנה לקבלת התורה היסטורי ומרומם. המעמד בראשות מנהיג עולם הישיבות הגרמ"ה הירש וראשי הישיבות.</h4>
                    <p style="width: 100%; max-width: 100%; text-align: right; line-height: 1.8; font-size: 24px; color: #2c3e50; font-weight: 600; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">
                        מאות בני תורה מסלתה ומשמנה של הקהילה האתיופית גדשו בהמוניהם את אולמי 'היכלי מלכות' במעמד הכנה לקבלת התורה היסטורי ומרומם שנערך בחסות עיריית ב"ב ע"י איגוד 'עמלים' המאגד תחתיו את בני התורה מהקהילה האתיופית מכל רחבי הארץ.<br><br>
                    </p>

                    <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                        <img src="https://storage.bhol.co.il/media/lt/1657699/gallery/811317_tumb_800X480.jpg" alt="כינוס הכנה לקבלת התורה" style="width: 100%; max-width: 100%; height: auto; object-fit: cover; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;" />
                    </div>

                    <p style="width: 100%; max-width: 100%; text-align: right; line-height: 1.8; font-size: 24px; color: #2c3e50; font-weight: 600; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">
                        למעמד הגדול עלו ובאו מרנן ורבנן גדולי התורה וראשי הישיבות ובראשם מנהיג עולם הישיבות הגרמ"ה הירש.<br><br>
                    </p>

                    <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                        <img src="https://storage.bhol.co.il/media/lt/1657699/gallery/811287_tumb_800Xauto.jpg" alt="כינוס הכנה לקבלת התורה" style="width: 100%; max-width: 100%; height: auto; object-fit: cover; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;" />
                    </div>

                    <p style="width: 100%; max-width: 100%; text-align: right; line-height: 1.8; font-size: 24px; color: #2c3e50; font-weight: 600; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">
                        עוד השתתפו, הגר"א סאלים ר"י מאור התורה, הגר"מ בן שמעון ראש ישיבת 'אור אליצור', הגר"מ תופיק-אביעזרי ראש ישיבת 'באר יצחק', הגר"י לסרי ראש ישיבת 'אש התלמוד', הגר"ש טולדאנו ראש ישיבת 'ברית יעקב', הגר"ד זאדה ראש ישיבת 'תורת אברהם', הגר"י טולדאנו מראשי ישיבת 'דעת חיים' וראש הישיבה לצעירים - ירושלים. הגר"מ הראל ראש רשת הכוללים 'תפארת שמואל', הגר"ש מועלם ראש ישיבת 'אוהל תורה'. הרב אליאב כהן ראש ישיבת 'נועם התלמוד', הגר"א אלחדד ראש ישיבת 'תורה ודעת'. הגר"א בן-נאים משגיח ישיבת 'ברכת אפרים', הגר"א חורי מרבני ישיבת 'אור אברהם' בב"ב, הגר"י ברכץ מרבני ישיבת דבר אברהם והגר"א עידן ראש ישיבת 'עטרת הלוי', ועוד.<br><br>
                    </p>

                    <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                        <img src="https://storage.bhol.co.il/media/lt/1657699/gallery/811274_tumb_800Xauto.jpg" alt="כינוס הכנה לקבלת התורה" style="width: 100%; max-width: 100%; height: auto; object-fit: cover; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;" />
                    </div>

                    <p style="width: 100%; max-width: 100%; text-align: right; line-height: 1.8; font-size: 24px; color: #2c3e50; font-weight: 600; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">
                        כמו"כ הגיעו למעמד הגדול כל רבני הקהילה מרחבי הארץ ובראשם הגר"ר וובשת רבה הראשי הנוכחי של הקהילה, הגר"י בלאצ'ו רב הקהילה בתל-ציון ועוד.<br><br>
                    </p>

                    <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                        <img src="https://storage.bhol.co.il/media/lt/1657699/gallery/811318_tumb_800Xauto.jpg" alt="כינוס הכנה לקבלת התורה" style="width: 100%; max-width: 100%; height: auto; object-fit: cover; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;" />
                    </div>

                    <p style="width: 100%; max-width: 100%; text-align: right; line-height: 1.8; font-size: 24px; color: #2c3e50; font-weight: 600; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">
                        הגר"א סאלים אמר בדבריו כי שלימות קבלת התורה מגיעה ע"י "וזוכר חסדי אבות" -זיכרון מסירות נפשם של ראשונים, מכל תפוצות ישראל ובפרט אבותיהם של כל בני התורה יוצאי אתיופיה.<br><br>
                    </p>

                    <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                        <img src="https://storage.bhol.co.il/media/lt/1657699/gallery/811295_tumb_800Xauto.jpg" alt="כינוס הכנה לקבלת התורה" style="width: 100%; max-width: 100%; height: auto; object-fit: cover; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;" />
                    </div>

                    <p style="width: 100%; max-width: 100%; text-align: right; line-height: 1.8; font-size: 24px; color: #2c3e50; font-weight: 600; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">
                        שיאו של המעמד היה, עת כניסתו ונאומו של מנהיג עולם התורה הגרמ"ה הירש.<br><br>
                    </p>

                    <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                        <img src="https://storage.bhol.co.il/media/lt/1657699/gallery/811293_tumb_800Xauto.jpg" alt="כינוס הכנה לקבלת התורה" style="width: 100%; max-width: 100%; height: auto; object-fit: cover; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;" />
                    </div>

                    <p style="width: 100%; max-width: 100%; text-align: right; line-height: 1.8; font-size: 24px; color: #2c3e50; font-weight: 600; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">
                        בדברים שנשא עמד על דברי הרמח"ל בדרך ה' על הדרך לדבקות הבורא, כאשר בסיומם של הדברים אמר רה"י בנוגע ל'בעיית הגיוס', כלשונו: "אני יודע את הבעיה הזאת. והקב"ה ייתן שלא יהיה שום בעיה מזה. אנחנו דואגים בשבילכם ומאת ה' זה יצא בסדר. אך אתם אל תדאגו. המשיכו בעבודת ה' שלכם. בלימוד תורה שלכם ובזכות זה יהיה לכם רק טוב".<br><br>
                    </p>

                    <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                        <img src="https://storage.bhol.co.il/media/lt/1657699/gallery/811307_tumb_800Xauto.jpg" alt="כינוס הכנה לקבלת התורה" style="width: 100%; max-width: 100%; height: auto; object-fit: cover; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;" />
                    </div>

                    <p style="width: 100%; max-width: 100%; text-align: right; line-height: 1.8; font-size: 24px; color: #2c3e50; font-weight: 600; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">
                        לאחר מכן הוקרא מכתבו של ראש ישיבת 'חברון' הגר"ד כהן ובו כתב בין היתר "לבני התורה יוצאי אתיופיה, אשריכם בני תורה יקרים כאשר זכיתם להיות בני ישיבה לתפארת, ובני תורה מובהקים, ולזכות לחיים של רוממות התורה וקרבת א-לוקים", והוסיף להאריך בדברי חיזוק כנגד גזירות הזמן.<br><br>
                    </p>

                    <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                        <img src="https://storage.bhol.co.il/media/lt/1657699/gallery/811294_tumb_800Xauto.jpg" alt="כינוס הכנה לקבלת התורה" style="width: 100%; max-width: 100%; height: auto; object-fit: cover; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;" />
                    </div>

                    <p style="width: 100%; max-width: 100%; text-align: right; line-height: 1.8; font-size: 24px; color: #2c3e50; font-weight: 600; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">
                        ראשי הישיבות בדבריהם ציינו את התרגשותם מיכולותיהם ומהצלחתם המשגשגת של בני הקהילה בהיכלי הישיבות, את מידותיהם התרומיות והנעלות, ואת נחישותם הרבה.<br><br>
                    </p>

                    <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                        <img src="https://storage.bhol.co.il/media/lt/1657699/gallery/811277_tumb_800Xauto.jpg" alt="כינוס הכנה לקבלת התורה" style="width: 100%; max-width: 100%; height: auto; object-fit: cover; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;" />
                    </div>

                    <p style="width: 100%; max-width: 100%; text-align: right; line-height: 1.8; font-size: 24px; color: #2c3e50; font-weight: 600; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">
                        יו"ר ש"ס אריה דרעי, לא הסתיר את התרגשותו מהציבור העצום שגדשו את האולם, ואמר כי אין ספק שזהו חזון אחרית הימים לראות את המראה הזה.<br><br>
                    </p>

                    <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                        <img src="https://storage.bhol.co.il/media/lt/1657699/gallery/811310_tumb_800Xauto.jpg" alt="כינוס הכנה לקבלת התורה" style="width: 100%; max-width: 100%; height: auto; object-fit: cover; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;" />
                    </div>

                    <p style="width: 100%; max-width: 100%; text-align: right; line-height: 1.8; font-size: 24px; color: #2c3e50; font-weight: 600; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">
                        יו"ר האיגוד הרב נתנאל פרץ ומנהליו הרב ניסים יברקן והרב עודד תמנה הודו בדבריהם בראשונה לסגני רה"ע הרב שלמה אלחרר והרב אליהו שושן ולמשנה לרה"ע הרב יוסף תורג'מן שנרתמו ככל יכולתם להצלחת המעמדת וכן לראש עיריית ב"ב הרב חנוך זייברט שאף השתתף בכינוס והביע את התפעלותו הרבה ממראה עיניו. וכן לרב יוסף ברכץ על הייעוץ והכוונה, לרב דוד רביבו והרב אברהם עידן על העזרה והסיוע בשיבוץ בני הישיבות.<br><br>
                    </p>

                    <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                        <img src="https://storage.bhol.co.il/media/lt/1657699/gallery/811299_tumb_800Xauto.jpg" alt="כינוס הכנה לקבלת התורה" style="width: 100%; max-width: 100%; height: auto; object-fit: cover; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;" />
                    </div>

                    <p style="width: 100%; max-width: 100%; text-align: right; line-height: 1.8; font-size: 24px; color: #2c3e50; font-weight: 600; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">
                        בסיום המעמד המרגש קיבלו המשתתפים שובר מיוחד מתנת 'פרסטר' וקובץ הגות ומחשבה 'בעמלה של תורה' ח"ב ובו מאמרי מוסר ומחשבה מגדולי ראשי הישיבו. ונוספו לזה - חבורות מבני התורה מקרב הקהילה, כאשר כל כותבי החבורות זכו למענק מיוחד שניתן להם בסיום המעמד.
                    </p>

                    <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                        <img src="https://storage.bhol.co.il/media/lt/1657699/gallery/811280_tumb_800Xauto.jpg" alt="כינוס הכנה לקבלת התורה" style="width: 100%; max-width: 100%; height: auto; object-fit: cover; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;" />
                    </div>

                    <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                        <img src="https://storage.bhol.co.il/media/lt/1657699/gallery/811306_tumb_800Xauto.jpg" alt="כינוס הכנה לקבלת התורה" style="width: 100%; max-width: 100%; height: auto; object-fit: cover; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;" />
                    </div>

                    <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                        <img src="https://storage.bhol.co.il/media/lt/1657699/gallery/811303_tumb_800Xauto.jpg" alt="כינוס הכנה לקבלת התורה" style="width: 100%; max-width: 100%; height: auto; object-fit: cover; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;" />
                    </div>

                    <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                        <img src="https://storage.bhol.co.il/media/lt/1657699/gallery/811290_tumb_800Xauto.jpg" alt="כינוס הכנה לקבלת התורה" style="width: 100%; max-width: 100%; height: auto; object-fit: cover; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;" />
                    </div>

                    <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                        <img src="https://storage.bhol.co.il/media/lt/1657699/gallery/811285_tumb_800Xauto.jpg" alt="כינוס הכנה לקבלת התורה" style="width: 100%; max-width: 100%; height: auto; object-fit: cover; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;" />
                    </div>

                    <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                        <img src="https://storage.bhol.co.il/media/lt/1657699/gallery/811272_tumb_800Xauto.jpg" alt="כינוס הכנה לקבלת התורה" style="width: 100%; max-width: 100%; height: auto; object-fit: cover; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;" />
                    </div>
                    </div>
                </div>


    </div>

    <div id="gallery-page" class="page">
        <h2 style="color: black; text-align: center; margin: 20px 0; font-size: 4em; font-weight: bold; font-family: 'Frank Ruhl Libre', serif; letter-spacing: 3px;">
            <div style="display: inline-block; vertical-align: middle; margin-right: 0px;">
                <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #D4AF37, #B8860B); margin-bottom: 3px;"></div>
                <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #B8860B, #8B7355); margin-bottom: 3px;"></div>
                <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #8B7355, #B8860B);"></div>
            </div>גלריה<div style="display: inline-block; vertical-align: middle; margin-left: 0px;">
                <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #B8860B, #8B7355); margin-bottom: 3px;"></div>
                <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #8B7355, #B8860B); margin-bottom: 3px;"></div>
                <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #B8860B, #D4AF37);"></div>
            </div>
        </h2>
        
        <!-- כרטיסיות אירועים עם קישורים לפרטים נוספים -->
        <div class="events-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 25px; margin: 20px auto; max-width: 95%;">
            <!-- כרטיסיה 1: ציון שנה לאיגוד עמלים -->
            <div class="event-card" style="position: relative; background: #F5F5DC; border: none; border-radius: 0px; padding: 20px; box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2); transition: all 0.3s ease; cursor: pointer; text-align: center;" onclick="showEventDetails('event1')" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                <div style="text-align: center; margin-bottom: 15px;">
                    <img src="https://mizrach.co.il/wp-content/uploads/2025/01/%D7%A6%D7%99%D7%95%D7%9F-%D7%A9%D7%A0%D7%94-%D7%9C%D7%94%D7%A7%D7%9E%D7%AA-%D7%90%D7%99%D7%92%D7%95%D7%93-%D7%A2%D7%9E%D7%9C%D7%99%D7%9D-%D7%99%D7%95%D7%A6%D7%90%D7%99-%D7%90%D7%AA%D7%99%D7%95%D7%A4%D7%99%D7%94-36-scaled.jpg" alt="ציון שנה לאיגוד עמלים" style="width: 100%; height: 180px; object-fit: cover; border-radius: 0px; border: 3px solid #D4AF37; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);" />
                </div>
                <h3 style="color: #8B7355; font-size: 28px; margin-bottom: 12px; text-align: center; font-weight: bold;">ציון שנה לאיגוד עמלים</h3>
                <p class="event-date" style="color: #B8860B; font-size: 22px; margin-bottom: 12px; text-align: center; font-weight: bold;">מוצאי זאת חנוכה תשפ"ד</p>
                <p style="color: #333333; font-size: 18px; line-height: 1.4; text-align: center; margin-bottom: 15px;">מעמד היסטורי מרגש ומרומם בהשתתפות מאות בני תורה יוצאי אתיופיה מכל קצוות הארץ</p>
                <div class="details-btn" style="background: linear-gradient(135deg, #8B7355, #6B5344); color: #F5F5DC; border: none; padding: 12px 25px; border-radius: 0px; font-size: 18px; font-weight: bold; text-align: center; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);">פרטים נוספים</div>
            </div>

            <!-- כרטיסיה 2: סיכום עונת רישום ראשונה ומוצלחת -->
            <div class="event-card" style="position: relative; background: #F5F5DC; border: none; border-radius: 0px; padding: 20px; box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2); transition: all 0.3s ease; cursor: pointer; text-align: center;" onclick="showEventDetails('event2')" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                <div style="text-align: center; margin-bottom: 15px;">
                    <img src="https://hm-news.co.il/wp-content/uploads/2024/09/WhatsApp-Image-2024-09-03-at-19.11.28.jpeg" alt="סיכום עונת רישום ראשונה ומוצלחת" style="width: 100%; height: 180px; object-fit: cover; border-radius: 0px; border: 3px solid #D4AF37; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);" />
                </div>
                <h3 style="color: #8B7355; font-size: 28px; margin-bottom: 12px; text-align: center; font-weight: bold;">האיגוד מסכם בסיפוק עונת רישום ראשונה ומוצלחת</h3>
                <p class="event-date" style="color: #B8860B; font-size: 22px; margin-bottom: 12px; text-align: center; font-weight: bold;">תשפ"ה-אייר</p>
                <p style="color: #333333; font-size: 18px; line-height: 1.4; text-align: center; margin-bottom: 15px;">עונת רישום ראשונה ומוצלחת של בני ישיבות יוצאי אתיופיה לישיבות המובילות</p>
                <div class="details-btn" style="background: linear-gradient(135deg, #8B7355, #6B5344); color: #F5F5DC; border: none; padding: 12px 25px; border-radius: 0px; font-size: 18px; font-weight: bold; text-align: center; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);">פרטים נוספים</div>
            </div>

            <!-- כרטיסיה 3: כינוס הכנה לקבלת התורה -->
            <div class="event-card" style="position: relative; background: #F5F5DC; border: none; border-radius: 0px; padding: 20px; box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2); transition: all 0.3s ease; cursor: pointer; text-align: center;" onclick="showEventDetails('event3')" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                <div style="text-align: center; margin-bottom: 15px;">
                    <img src="https://storage.bhol.co.il/media/lt/1657699/gallery/811284_tumb_800Xauto.jpg" alt="כינוס הכנה לקבלת התורה" style="width: 100%; height: 180px; object-fit: cover; border-radius: 0px; border: 3px solid #D4AF37; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;" />
                </div>
                <h3 style="color: #8B7355; font-size: 28px; margin-bottom: 12px; text-align: center; font-weight: bold;">כינוס הכנה לקבלת התורה</h3>
                <p class="event-date" style="color: #B8860B; font-size: 22px; margin-bottom: 12px; text-align: center; font-weight: bold;">ערב שבעות-ה' סיון תשפ"ה</p>
                <p style="color: #333333; font-size: 18px; line-height: 1.4; text-align: center; margin-bottom: 15px;">כינוס מיוחד להכנה רוחנית לקראת חג מתן תורה בהשתתפות מרנן ורבנן גדולי ומאורי הדור שליט"א</p>
                <div class="details-btn" style="background: linear-gradient(135deg, #8B7355, #6B5344); color: #F5F5DC; border: none; padding: 12px 25px; border-radius: 0px; font-size: 18px; font-weight: bold; text-align: center; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);">פרטים נוספים</div>
            </div>
        </div>

        <!-- כרטיסיות מלאות של האירועים -->
        <!-- כרטיסיה מלאה 1: ציון שנה לאיגוד עמלים -->
        <div id="full-event1" class="full-event-card" style="display: none; position: relative; padding-top: 0; margin-bottom: 0;">
            <div class="back-notification" id="notification1">
                כדי לחזור אחורה, לחץ על "גלריות" בתפריט!
            </div>
            <div class="leader-text" style="width: 100%; max-width: 100%; text-align: center;">
                <h3>ציון שנה לאיגוד עמלים</h3>
                
                <!-- קרדיט למקור הכתבה -->
                <div style="width: 100%; text-align: center; margin: 30px 0 40px 0; padding: 20px; position: relative; overflow: hidden;">
                    <!-- כפתור מגניב עם כל המידע -->
                    <a href="https://mizrach.co.il/13718/" target="_blank" style="display: inline-block; background: linear-gradient(45deg, #B8860B, #D4AF37, #B8860B); color: white; padding: 25px 40px; border-radius: 15px; text-decoration: none; font-weight: bold; font-size: 22px; transition: all 0.4s ease; box-shadow: 0 8px 20px rgba(184, 134, 11, 0.4), inset 0 2px 5px rgba(255, 255, 255, 0.3); border: 2px solid #ffffff; text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3); position: relative; overflow: hidden;" onmouseover="this.style.transform='scale(1.05) translateY(-3px)'; this.style.boxShadow='0 12px 25px rgba(184, 134, 11, 0.5), inset 0 2px 5px rgba(255, 255, 255, 0.3)'" onmouseout="this.style.transform='scale(1) translateY(0)'; this.style.boxShadow='0 8px 20px rgba(184, 134, 11, 0.4), inset 0 2px 5px rgba(255, 255, 255, 0.3)'">
                        <span style="position: relative; z-index: 2; font-size: 26px; font-weight: 900;">
                            מקור: כותל המזרח | לחץ כאן לקריאת הכתבה המלאה
                        </span>
                        <!-- אפקט זוהר -->
                        <div style="position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent); transform: rotate(45deg); transition: all 0.4s ease; opacity: 0;" onmouseover="this.style.opacity='1'; this.style.transform='rotate(45deg) translateX(100%)'" onmouseout="this.style.opacity='0'; this.style.transform='rotate(45deg)'"></div>
                    </a>
                </div>
                
                <h4>מעמד היסטורי מרגש</h4>
                <p style="width: 100%; max-width: 100%; text-align: right; line-height: 1.8; font-size: 24px; color: #2c3e50; font-weight: 600; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">
                    במוצאי 'זאת חנוכה' נערך בבית שמש מעמד היסטורי מרגש ומרומם שבו התכנסו מאות בני תורה יוצאי אתיופיה מכל קצוות הארץ למעמד 'להודות ולהלל' לרגל שנה ליסוד איגוד 'עמלים'. במעמד השתתפו נשיא האיגוד מרן ראש הישיבה הגר"א סאלים חבר מועצת חכמי התורה, מרן הראשל"צ הגר"ד יוסף שליט"א, גדולי ראשי הישיבות שליט"א, רבני בני התורה יוצאי אתיופיה, יו"ר תנועת ש"ס הרב אריה דרעי השר לשירותי דת הרב מיכאל מלכיאלי ראש העיר בית שמש הרב גרינברג ועוד.<br><br>
                </p>

                <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                    <img src="https://mizrach.co.il/wp-content/uploads/2025/01/%D7%A6%D7%99%D7%95%D7%9F-%D7%A9%D7%A0%D7%94-%D7%9C%D7%94%D7%A7%D7%9E%D7%AA-%D7%90%D7%99%D7%92%D7%95%D7%93-%D7%A2%D7%9E%D7%9C%D7%99%D7%9D-%D7%99%D7%95%D7%A6%D7%90%D7%99-%D7%90%D7%AA%D7%99%D7%95%D7%A4%D7%99%D7%94-36-scaled.jpg" alt="ציון שנה לאיגוד עמלים" style="width: 100%; max-width: 100%; height: auto; object-fit: cover;" />
                </div>

                <p style="width: 100%; max-width: 100%; text-align: right; line-height: 1.8; font-size: 24px; color: #2c3e50; font-weight: 600; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">
                    איגוד 'עמלים' המהווה בית לכל בני התורה יוצאי אתיופיה בארה"ק ועוסק בשיבוץ והכוונה לבני הישיבות יוצאי אתיופיה, ציין במוצאי 'זאת חנוכה' שנה ליסוד האיגוד, כשלמעמד שנערך בבית שמש עלו ובאו כל גדולי ראשי הישיבות שליט"א.<br><br>
                </p>

                <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                    <img src="https://mizrach.co.il/wp-content/uploads/2025/01/%D7%A6%D7%99%D7%95%D7%9F-%D7%A9%D7%A0%D7%94-%D7%9C%D7%94%D7%A7%D7%9E%D7%AA-%D7%90%D7%99%D7%92%D7%95%D7%93-%D7%A2%D7%9E%D7%9C%D7%99%D7%9D-%D7%99%D7%95%D7%A6%D7%90%D7%99-%D7%90%D7%AA%D7%99%D7%95%D7%A4%D7%99%D7%94-35-scaled.jpg" alt="ציון שנה לאיגוד עמלים" style="width: 100%; max-width: 100%; height: auto; object-fit: cover;" />
                </div>

                <p style="width: 100%; max-width: 100%; text-align: right; line-height: 1.8; font-size: 24px; color: #2c3e50; font-weight: 600; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">
                    את המעמד פתח הרב דרעי שסקר בדבריו את כל ההשתלשלות מאז הפסק של מרן הגר"ע יוסף על יהדותם של בני העדה והבאתם ארצה והביע את התרגשותו הרבה לראות דור חדש מבני התורה יוצאי אתיופיה שהינם בני תורה. בסיום דבריו שיבח הרב דרעי את פעולותיהם העקביות והנחושות של ראשי האיגוד, ושיבח בדבריו את פעולותיהם העקביות והנחושות של ראשי האיגוד. היו"ר פנה מעל הבמה וביקש להעביר את המסר לשרים ולכל נציגי ש"ס ברשויות במקומיות להיות לעזר ואחיסמך ולהירתם בכל הכוח לכל צרכי האיגוד בכל דבר ועניין, לדברים הצטרף השר לשירותי דת חה"כ מיכאל מלכיאלי שסיפר על היכרותו הארוכה עם פעילות האיגוד, ועל חשיבות שימור הדרך כבני ישיבות דווקא.<br><br>
                </p>

                <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                    <img src="https://mizrach.co.il/wp-content/uploads/2025/01/%D7%A6%D7%99%D7%95%D7%9F-%D7%A9%D7%A0%D7%94-%D7%9C%D7%94%D7%A7%D7%9E%D7%AA-%D7%90%D7%99%D7%92%D7%95%D7%93-%D7%A2%D7%9E%D7%9C%D7%99%D7%9D-%D7%99%D7%95%D7%A6%D7%90%D7%99-%D7%90%D7%AA%D7%99%D7%95%D7%A4%D7%99%D7%94-34-scaled.jpg" alt="ציון שנה לאיגוד עמלים" style="width: 100%; max-width: 100%; height: auto; object-fit: cover;" />
                </div>

                <p style="width: 100%; max-width: 100%; text-align: right; line-height: 1.8; font-size: 24px; color: #2c3e50; font-weight: 600; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">
                    רגע השיא במעמד היה עת נשא מרן רה"י נשיא האיגוד הגר"א סאלים שליט"א את דבריו בנוכחותו של מרן הראש"L הגר"ד יוסף שליט"א וציין בדבריו את השלימות של עמ"י כאשר יש מקום לכל בני התורה ולכל עדה בהיכלי הישיבות.<br><br>
                </p>

                <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                    <img src="https://mizrach.co.il/wp-content/uploads/2025/01/%D7%A6%D7%99%D7%95%D7%9F-%D7%A9%D7%A0%D7%94-%D7%9C%D7%94%D7%A7%D7%9E%D7%AA-%D7%90%D7%99%D7%92%D7%95%D7%93-%D7%A2%D7%9E%D7%9C%D7%99%D7%9D-%D7%99%D7%95%D7%A6%D7%90%D7%99-%D7%90%D7%AA%D7%99%D7%95%D7%A4%D7%99%D7%94-31-scaled.jpg" alt="ציון שנה לאיגוד עמלים" style="width: 100%; max-width: 100%; height: auto; object-fit: cover;" />
                </div>

                <p style="width: 100%; max-width: 100%; text-align: right; line-height: 1.8; font-size: 24px; color: #2c3e50; font-weight: 600; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">
                    התרגשות עצומה נרשמה בקהל עת הקריא הגרי"ח ברכץ את מכתבו המיוחד של מרן ראש הישיבה הגרמ"ה הירש שליט"א למעמד, במכתב יצא רה"י מגדרו וכתב "ומה מאוד שמחתי לשמוע שהנכם מתאספים יראי ה' לחזק את לומדי ועמלי התורה יוצאי אתיופיה, וחפץ ה' בידכם יצליח לרומם ולעודד את כל לומדי התורה". במעמד נשאו דברים מרנן ורבנן ראשי הישיבות הגר"י שרבאני מראשי ישיבת 'מאור התורה', הגר"ח כהן ראש ישיבות 'באר התלמוד', הגר"י לסרי ראש ישיבת 'אש התלמוד', הגר"ש ביטאן ראש ישיבת 'דעת חיים', הגר"ד זאדה ראש ישיבת 'תורת אברהם', הרה"ג רבי אברהם עידן ראש ישיבת 'עטרת הלוי', ועוד.<br><br>
                </p>

                <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                    <img src="https://mizrach.co.il/wp-content/uploads/2025/01/%D7%A6%D7%99%D7%95%D7%9F-%D7%A9%D7%A0%D7%94-%D7%9C%D7%94%D7%A7%D7%9E%D7%AA-%D7%90%D7%99%D7%92%D7%95%D7%93-%D7%A2%D7%9E%D7%9C%D7%99%D7%9D-%D7%99%D7%95%D7%A6%D7%90%D7%99-%D7%90%D7%AA%D7%99%D7%95%D7%A4%D7%99%D7%94-27-scaled.jpg" alt="ציון שנה לאיגוד עמלים" style="width: 100%; max-width: 100%; height: auto; object-fit: cover;" />
                </div>

                <p style="width: 100%; max-width: 100%; text-align: right; line-height: 1.8; font-size: 24px; color: #2c3e50; font-weight: 600; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">
                    ראשי הישיבות כולם ציינו בדבריהם את הצלחתם המשגשגת של בני התורה יוצאי אתיופיה בהיכלי הישיבות, את מידותיהם התרומיות והנעלות, ואת נחישותם הרבה. כמו כן נשאו דברים רבני בני התורה יוצאי אתיופיה ובראשם הגר"י הדנה רבה הראשי של בני התורה יוצאי אתיופיה לשעבר, והגר"ר וובשת רבה הראשי הנוכחי של בני התורה יוצאי אתיופיה, הגר"י בלאצ'ו רב בני התורה יוצאי אתיופיה בתל-ציון ועוד. יו"ר האיגוד הרב נתנאל פרץ ומנהלי האיגוד הרב ניסים יברקן והרב עודד תמנה הודו לרה"ג אברהם עידן ראש ישיבת 'עטרת הלוי' על מסירותו ועזרתו הרבה להצלחת האיגוד בכל עת ובכל שעה ולמנהל מרכז ההכוון ושיבוץ של 'בקר בהיכלו' ושל 'איגוד 'עמלים' הרב דוד רביבו על עזרתו הרבה בשיבוץ הבחורים.<br><br>
                </p>

                <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                    <img src="https://mizrach.co.il/wp-content/uploads/2025/01/%D7%A6%D7%99%D7%95%D7%9F-%D7%A9%D7%A0%D7%94-%D7%9C%D7%94%D7%A7%D7%9E%D7%AA-%D7%90%D7%99%D7%92%D7%95%D7%93-%D7%A2%D7%9E%D7%9C%D7%99%D7%9D-%D7%99%D7%95%D7%A6%D7%90%D7%99-%D7%90%D7%AA%D7%99%D7%95%D7%A4%D7%99%D7%94-22-scaled.jpg" alt="ציון שנה לאיגוד עמלים" style="width: 100%; max-width: 100%; height: auto; object-fit: cover;" />
                </div>

                <p style="width: 100%; max-width: 100%; text-align: right; line-height: 1.8; font-size: 24px; color: #2c3e50; font-weight: 600; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">
                    ולחבר מועצת העיר ומחזיק תיק בני התורה הרב שמואל חזן על עשייתו הברוכה למען כלל בני התורה בעיר בית שמש ובני התורה יוצאי אתיופיה בפרט, ועל הירתמותו הרבה להצלחת הכינוס יחד עם הרב חננאל עזרי יו"ר איגוד בני התורה יוצאי אתיופיה והרב אריאל מלכה מנהל תלמוד תורה 'תורת השם'  , לרה"ע הרב שמוליק גרינברג, לממ"ק ראש העיר אשדוד אבי אמסלם, וסגן ראש העיר נתיבות יגאל פרץ על הירתמותם לעניין.<br><br>
                </p>

                <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                    <img src="https://mizrach.co.il/wp-content/uploads/2025/01/%D7%A6%D7%99%D7%95%D7%9F-%D7%A9%D7%A0%D7%94-%D7%9C%D7%94%D7%A7%D7%9E%D7%AA-%D7%90%D7%99%D7%92%D7%95%D7%93-%D7%A2%D7%9E%D7%9C%D7%99%D7%9D-%D7%99%D7%95%D7%A6%D7%90%D7%99-%D7%90%D7%AA%D7%99%D7%95%D7%A4%D7%99%D7%94-17-scaled.jpg" alt="ציון שנה לאיגוד עמלים" style="width: 100%; max-width: 100%; height: auto; object-fit: cover;" />
                </div>

                <p style="width: 100%; max-width: 100%; text-align: right; line-height: 1.8; font-size: 24px; color: #2c3e50; font-weight: 600; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">
                    בסיום המעמד המרגש קיבלו הנוכחים ביטאון מיוחד הנקרא 'לאור עולם' אשר יצא לאור לרגל הכינוס, ובו סיקור מקיף על פעילות האיגוד, פרקי דעת ומאמרים מגדולי ראשי הישיבות ורבני בני התורה יוצאי אתיופיה, ועוד.
                </p>

                <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                    <img src="https://mizrach.co.il/wp-content/uploads/2025/01/%D7%A6%D7%99%D7%95%D7%9F-%D7%A9%D7%A0%D7%94-%D7%9C%D7%94%D7%A7%D7%9E%D7%AA-%D7%90%D7%99%D7%92%D7%95%D7%93-%D7%A2%D7%9E%D7%9C%D7%99%D7%9D-%D7%99%D7%95%D7%A6%D7%90%D7%99-%D7%90%D7%AA%D7%99%D7%95%D7%A4%D7%99%D7%94-14-scaled.jpg" alt="ציון שנה לאיגוד עמלים" style="width: 100%; max-width: 100%; height: auto; object-fit: cover;" />
                </div>
                
                <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                    <iframe width="100%" height="600" src="https://www.youtube.com/embed/MDI4atxGplI" title="ציון שנה לאיגוד עמלים" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                    <img src="https://mizrach.co.il/wp-content/uploads/2025/01/%D7%A6%D7%99%D7%95%D7%9F-%D7%A9%D7%A0%D7%94-%D7%9C%D7%94%D7%A7%D7%9E%D7%AA-%D7%90%D7%99%D7%92%D7%95%D7%93-%D7%A2%D7%9E%D7%9C%D7%99%D7%9D-%D7%99%D7%95%D7%A6%D7%90%D7%99-%D7%90%D7%AA%D7%99%D7%95%D7%A4%D7%99%D7%94-29-scaled.jpg" alt="ציון שנה לאיגוד עמלים" style="width: 100%; max-width: 100%; height: auto; object-fit: cover;" />
                </div>
            </div>
        </div>

        <!-- כרטיסיה מלאה 2: סיכום עונת רישום ראשונה ומוצלחת -->
        <div id="full-event2" class="full-event-card" style="display: none; position: relative;">
            <div class="back-notification" id="notification2">
                 כדי לחזור אחורה, לחץ על "גלריות" בתפריט!
            </div>
            <div class="leader-text" style="width: 100%; max-width: 100%; text-align: center;">
                <h3>האיגוד מסכם בסיפוק עונת רישום ראשונה ומוצלחת</h3>
                
                <!-- קרדיט למקור הכתבה -->
                <div style="width: 100%; text-align: center; margin: 30px 0 40px 0; padding: 20px; position: relative; overflow: hidden;">
                    <!-- כפתור מגניב עם כל המידע -->
                    <a href="https://mizrach.co.il/10159/" target="_blank" style="display: inline-block; background: linear-gradient(45deg, #B8860B, #D4AF37, #B8860B); color: white; padding: 25px 40px; border-radius: 15px; text-decoration: none; font-weight: bold; font-size: 22px; transition: all 0.4s ease; box-shadow: 0 8px 20px rgba(184, 134, 11, 0.4), inset 0 2px 5px rgba(255, 255, 255, 0.3); border: 2px solid #ffffff; text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3); position: relative; overflow: hidden;" onmouseover="this.style.transform='scale(1.05) translateY(-3px)'; this.style.boxShadow='0 12px 25px rgba(184, 134, 11, 0.5), inset 0 2px 5px rgba(255, 255, 255, 0.3)'" onmouseout="this.style.transform='scale(1) translateY(0)'; this.style.boxShadow='0 8px 20px rgba(184, 134, 11, 0.4), inset 0 2px 5px rgba(255, 255, 255, 0.3)'">
                        <span style="position: relative; z-index: 2; font-size: 26px; font-weight: 900;">
                            מקור: כותל המזרח | לחץ כאן לקריאת הכתבה המלאה
                        </span>
                        <!-- אפקט זוהר -->
                        <div style="position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent); transform: rotate(45deg); transition: all 0.4s ease; opacity: 0;" onmouseover="this.style.opacity='1'; this.style.transform='rotate(45deg) translateX(100%)'" onmouseout="this.style.opacity='0'; this.style.transform='rotate(45deg)'"></div>
                    </a>
                </div>
                
                <h4>סיכום תקופת הרישום</h4>
                <p style="width: 100%; max-width: 100%; text-align: right; line-height: 1.8; font-size: 24px; color: #2c3e50; font-weight: 600; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">
                    אחר תקופת רישום מוצלחת, התקבלו בני ישיבות החברים באיגוד 'עמלים' שע"י יוצאי אתיופיה, לישיבות 'מאור התורה', 'דעת חיים', 'יסודות', 'ברית יעקב', 'אש התלמוד', 'באר התלמוד ירושלים', 'אוהל יוסף ב"ב', 'רכסים', 'תורת אברהם', 'אוהל תורה', 'תפארת הלוי', ועוד.<br><br>
                </p>

                <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                    <img src="https://hm-news.co.il/wp-content/uploads/2024/09/WhatsApp-Image-2024-09-03-at-19.11.28.jpeg" alt="סיכום עונת רישום ראשונה ומוצלחת" style="width: 100%; max-width: 100%; height: auto; object-fit: cover;" />
                </div>

                <p style="width: 100%; max-width: 100%; text-align: right; line-height: 1.8; font-size: 24px; color: #2c3e50; font-weight: 600; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">
                    בתקופה האחרונה פעל האיגוד באינטנסיביות במטרה לרשום לכל הישיבות הגדולות המובילות, בחורים מצוינים מהטובים ביותר בישיבות הקטנות ברחבי הארץ, זאת יחד עם מנהל מרכז ההכוון לבני ישיבות הרב דוד רביבו שליט"א.<br><br>
                </p>

                 <p style="width: 100%; max-width: 100%; text-align: right; line-height: 1.8; font-size: 24px; color: #2c3e50; font-weight: 600; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">
                   עם תחילת זמן קיץ התקיים מעמד היסטורי של כלל בני הישיבות ואברכי הכוללים יוצאי אתיופיה לחיזוק והכנה לקראת חג מתן תורה כאשר לפני הכינוס נכנסו ראשי האיגוד עם הגאון הרב יוסף חיים סויסה שליט"א ר"י תורה ודעת, הרב יעקב מויאל מנהל מרכז ליווי והכוונה לבני הישיבות בקרן ההסעות ופרויקט החונכים ברשת 'בני יוסף' והרב יוסף ברכץ –משגיח ישיבת דבר אברהם ב"ב, למעונו של מרן ראש הישיבה הגאון הגדול רבי משה הלל הירש שליט"א. הגרמ"ה קבלם בהתלהבות רבה והתפעל עד מאוד מעוצמת הפעילות, ומרמתם של בני הישיבות החברים באיגוד, ובסיום השיחה קיבלו את ברכתו כאשר מרן רבנו רה"י שליט"א יצא מגדרו במכתב מיוחד שהכה הדים רבים.<br><br>
                </p>

                <p style="width: 100%; max-width: 100%; text-align: right; line-height: 1.8; font-size: 24px; color: #2c3e50; font-weight: 600; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">
                   בתחילת חודש תמוז עלו תלמידי האיגוד המסיימים ישיבות קטנות לירושלים לצורך מבחן תובעני ומפרך אשר נערך במשותף על ידי ראשי הישיבות בירושלים, ביניהם הגאון הגדול רבי ישי טולדאנו שליט"א, הגאון רבי שלמה כהן שליט"א, הגאון רבי משה הראל שליט"א והגאון רבי יוסף חיים סויסה שליט"א. ראשי הישיבות אשר בחנו את הבחורים כמצרף כסף והעמיקו עמם בנבכי הסוגיות הביעו את התפעלותם הרבה מכישורי הנבחנים ושליטתם ב'רייד' הישיבתי לעומקו ומנועם הליכותיהם.<br><br>
                </p>

                <p style="width: 100%; max-width: 100%; text-align: right; line-height: 1.8; font-size: 24px; color: #2c3e50; font-weight: 600; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">
                   עוד הוסיפו ראשי הישיבות כי ימליצו בחום לראשי ישיבות נוספים ללקט לישיבותיהם את המיוחדים מבני האיגוד האיכותיים, אשר כל ישיבה יכולה להתפאר בהם.<br><br>
                </p>

                <p style="width: 100%; max-width: 100%; text-align: right; line-height: 1.8; font-size: 24px; color: #2c3e50; font-weight: 600; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">
                   כעת, עם תום עונת הרישום מסכמים ראשי האיגוד בסיפוק רב את הצלחתם הגדולה של הבחורים היקרים שיחיו, ומציינים כי הבחורים זכו להתקבל לישיבות הגדולות המובחרות מהמזרח של עולם התורה הספרדי.
                </p>
            </div>
        </div>

        <!-- כרטיסיה מלאה 3: כינוס הכנה לקבלת התורה -->
        <div id="full-event3" class="full-event-card" style="display: none; position: relative; padding-top: 20px;">
            <div class="back-notification" id="notification3">
                        כדי לחזור אחורה, לחץ על "גלריות" בתפריט!
                </div>
                <div class="leader-text" style="width: 100%; max-width: 100%; text-align: center;">
                    <h3>כך התכוננו בני האיגוד לקבלת התורה בערב החג</h3>
                    
                    <!-- קרדיט למקור הכתבה -->
                    <div style="width: 100%; text-align: center; margin: 30px 0 40px 0; padding: 20px; position: relative; overflow: hidden;">
                        <!-- כפתור מגניב עם כל המידע -->
                        <a href="https://www.bhol.co.il/news/1695666" target="_blank" style="display: inline-block; background: linear-gradient(45deg, #B8860B, #D4AF37, #B8860B); color: white; padding: 25px 40px; border-radius: 15px; text-decoration: none; font-weight: bold; font-size: 22px; transition: all 0.4s ease; box-shadow: 0 8px 20px rgba(184, 134, 11, 0.4), inset 0 2px 5px rgba(255, 255, 255, 0.3); border: 2px solid #ffffff; text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3); position: relative; overflow: hidden;" onmouseover="this.style.transform='scale(1.05) translateY(-3px)'; this.style.boxShadow='0 12px 25px rgba(184, 134, 11, 0.5), inset 0 2px 5px rgba(255, 255, 255, 0.3)'" onmouseout="this.style.transform='scale(1) translateY(0)'; this.style.boxShadow='0 8px 20px rgba(184, 134, 11, 0.4), inset 0 2px 5px rgba(255, 255, 255, 0.3)'">
                            <span style="position: relative; z-index: 2; font-size: 26px; font-weight: 900;">
                                מקור: מחדרי חדרים | לחץ כאן לקריאת הכתבה המלאה
                            </span>
                            <!-- אפקט זוהר -->
                            <div style="position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent); transform: rotate(45deg); transition: all 0.4s ease; opacity: 0;" onmouseover="this.style.opacity='1'; this.style.transform='rotate(45deg) translateX(100%)'" onmouseout="this.style.opacity='0'; this.style.transform='rotate(45deg)'"></div>
                        </a>
                    </div>
                    
                    <h4>בני התורה מסלתה ומשמנה של הקהילה האתיופית התכנסו לכינוס הכנה לקבלת התורה היסטורי ומרומם. המעמד בראשות מנהיג עולם הישיבות הגרמ"ה הירש וראשי הישיבות.</h4>
                    <p style="width: 100%; max-width: 100%; text-align: right; line-height: 1.8; font-size: 24px; color: #2c3e50; font-weight: 600; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">
                        מאות בני תורה מסלתה ומשמנה של הקהילה האתיופית גדשו בהמוניהם את אולמי 'היכלי מלכות' במעמד הכנה לקבלת התורה היסטורי ומרומם שנערך בחסות עיריית ב"ב ע"י איגוד 'עמלים' המאגד תחתיו את בני התורה מהקהילה האתיופית מכל רחבי הארץ.<br><br>
                    </p>

                    <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                        <img src="https://storage.bhol.co.il/media/lt/1657699/gallery/811317_tumb_800X480.jpg" alt="כינוס הכנה לקבלת התורה" style="width: 100%; max-width: 100%; height: auto; object-fit: cover; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;" />
                    </div>

                    <p style="width: 100%; max-width: 100%; text-align: right; line-height: 1.8; font-size: 24px; color: #2c3e50; font-weight: 600; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">
                        למעמד הגדול עלו ובאו מרנן ורבנן גדולי התורה וראשי הישיבות ובראשם מנהיג עולם הישיבות הגרמ"ה הירש.<br><br>
                    </p>

                    <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                        <img src="https://storage.bhol.co.il/media/lt/1657699/gallery/811287_tumb_800Xauto.jpg" alt="כינוס הכנה לקבלת התורה" style="width: 100%; max-width: 100%; height: auto; object-fit: cover; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;" />
                    </div>

                    <p style="width: 100%; max-width: 100%; text-align: right; line-height: 1.8; font-size: 24px; color: #2c3e50; font-weight: 600; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">
                        עוד השתתפו, הגר"א סאלים ר"י מאור התורה, הגר"מ בן שמעון ראש ישיבת 'אור אליצור', הגר"מ תופיק-אביעזרי ראש ישיבת 'באר יצחק', הגר"י לסרי ראש ישיבת 'אש התלמוד', הגר"ש טולדאנו ראש ישיבת 'ברית יעקב', הגר"ד זאדה ראש ישיבת 'תורת אברהם', הגר"י טולדאנו מראשי ישיבת 'דעת חיים' וראש הישיבה לצעירים - ירושלים. הגר"מ הראל ראש רשת הכוללים 'תפארת שמואל', הגר"ש מועלם ראש ישיבת 'אוהל תורה'. הרב אליאב כהן ראש ישיבת 'נועם התלמוד', הגר"א אלחדד ראש ישיבת 'תורה ודעת'. הגר"א בן-נאים משגיח ישיבת 'ברכת אפרים', הגר"א חורי מרבני ישיבת 'אור אברהם' בב"ב, הגר"י ברכץ מרבני ישיבת דבר אברהם והגר"א עידן ראש ישיבת 'עטרת הלוי', ועוד.<br><br>
                    </p>

                    <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                        <img src="https://storage.bhol.co.il/media/lt/1657699/gallery/811274_tumb_800Xauto.jpg" alt="כינוס הכנה לקבלת התורה" style="width: 100%; max-width: 100%; height: auto; object-fit: cover; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;" />
                    </div>

                    <p style="width: 100%; max-width: 100%; text-align: right; line-height: 1.8; font-size: 24px; color: #2c3e50; font-weight: 600; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">
                        כמו"כ הגיעו למעמד הגדול כל רבני הקהילה מרחבי הארץ ובראשם הגר"ר וובשת רבה הראשי הנוכחי של הקהילה, הגר"י בלאצ'ו רב הקהילה בתל-ציון ועוד.<br><br>
                    </p>

                    <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                        <img src="https://storage.bhol.co.il/media/lt/1657699/gallery/811318_tumb_800Xauto.jpg" alt="כינוס הכנה לקבלת התורה" style="width: 100%; max-width: 100%; height: auto; object-fit: cover; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;" />
                    </div>

                    <p style="width: 100%; max-width: 100%; text-align: right; line-height: 1.8; font-size: 24px; color: #2c3e50; font-weight: 600; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">
                        הגר"א סאלים אמר בדבריו כי שלימות קבלת התורה מגיעה ע"י "וזוכר חסדי אבות" -זיכרון מסירות נפשם של ראשונים, מכל תפוצות ישראל ובפרט אבותיהם של כל בני התורה יוצאי אתיופיה.<br><br>
                    </p>

                    <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                        <img src="https://storage.bhol.co.il/media/lt/1657699/gallery/811295_tumb_800Xauto.jpg" alt="כינוס הכנה לקבלת התורה" style="width: 100%; max-width: 100%; height: auto; object-fit: cover; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;" />
                    </div>

                    <p style="width: 100%; max-width: 100%; text-align: right; line-height: 1.8; font-size: 24px; color: #2c3e50; font-weight: 600; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">
                        שיאו של המעמד היה, עת כניסתו ונאומו של מנהיג עולם התורה הגרמ"ה הירש.<br><br>
                    </p>

                    <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                        <img src="https://storage.bhol.co.il/media/lt/1657699/gallery/811293_tumb_800Xauto.jpg" alt="כינוס הכנה לקבלת התורה" style="width: 100%; max-width: 100%; height: auto; object-fit: cover; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;" />
                    </div>

                    <p style="width: 100%; max-width: 100%; text-align: right; line-height: 1.8; font-size: 24px; color: #2c3e50; font-weight: 600; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">
                        בדברים שנשא עמד על דברי הרמח"ל בדרך ה' על הדרך לדבקות הבורא, כאשר בסיומם של הדברים אמר רה"י בנוגע ל'בעיית הגיוס', כלשונו: "אני יודע את הבעיה הזאת. והקב"ה ייתן שלא יהיה שום בעיה מזה. אנחנו דואגים בשבילכם ומאת ה' זה יצא בסדר. אך אתם אל תדאגו. המשיכו בעבודת ה' שלכם. בלימוד תורה שלכם ובזכות זה יהיה לכם רק טוב".<br><br>
                    </p>

                    <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                        <img src="https://storage.bhol.co.il/media/lt/1657699/gallery/811307_tumb_800Xauto.jpg" alt="כינוס הכנה לקבלת התורה" style="width: 100%; max-width: 100%; height: auto; object-fit: cover; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;" />
                    </div>

                    <p style="width: 100%; max-width: 100%; text-align: right; line-height: 1.8; font-size: 24px; color: #2c3e50; font-weight: 600; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">
                        לאחר מכן הוקרא מכתבו של ראש ישיבת 'חברון' הגר"ד כהן ובו כתב בין היתר "לבני התורה יוצאי אתיופיה, אשריכם בני תורה יקרים כאשר זכיתם להיות בני ישיבה לתפארת, ובני תורה מובהקים, ולזכות לחיים של רוממות התורה וקרבת א-לוקים", והוסיף להאריך בדברי חיזוק כנגד גזירות הזמן.<br><br>
                    </p>

                    <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                        <img src="https://storage.bhol.co.il/media/lt/1657699/gallery/811294_tumb_800Xauto.jpg" alt="כינוס הכנה לקבלת התורה" style="width: 100%; max-width: 100%; height: auto; object-fit: cover; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;" />
                    </div>

                    <p style="width: 100%; max-width: 100%; text-align: right; line-height: 1.8; font-size: 24px; color: #2c3e50; font-weight: 600; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">
                        ראשי הישיבות בדבריהם ציינו את התרגשותם מיכולותיהם ומהצלחתם המשגשגת של בני הקהילה בהיכלי הישיבות, את מידותיהם התרומיות והנעלות, ואת נחישותם הרבה.<br><br>
                    </p>

                    <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                        <img src="https://storage.bhol.co.il/media/lt/1657699/gallery/811277_tumb_800Xauto.jpg" alt="כינוס הכנה לקבלת התורה" style="width: 100%; max-width: 100%; height: auto; object-fit: cover; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;" />
                    </div>

                    <p style="width: 100%; max-width: 100%; text-align: right; line-height: 1.8; font-size: 24px; color: #2c3e50; font-weight: 600; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">
                        יו"ר ש"ס אריה דרעי, לא הסתיר את התרגשותו מהציבור העצום שגדשו את האולם, ואמר כי אין ספק שזהו חזון אחרית הימים לראות את המראה הזה.<br><br>
                    </p>

                    <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                        <img src="https://storage.bhol.co.il/media/lt/1657699/gallery/811310_tumb_800Xauto.jpg" alt="כינוס הכנה לקבלת התורה" style="width: 100%; max-width: 100%; height: auto; object-fit: cover; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;" />
                    </div>

                    <p style="width: 100%; max-width: 100%; text-align: right; line-height: 1.8; font-size: 24px; color: #2c3e50; font-weight: 600; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">
                        יו"ר האיגוד הרב נתנאל פרץ ומנהליו הרב ניסים יברקן והרב עודד תמנה הודו בדבריהם בראשונה לסגני רה"ע הרב שלמה אלחרר והרב אליהו שושן ולמשנה לרה"ע הרב יוסף תורג'מן שנרתמו ככל יכולתם להצלחת המעמדת וכן לראש עיריית ב"ב הרב חנוך זייברט שאף השתתף בכינוס והביע את התפעלותו הרבה ממראה עיניו. וכן לרב יוסף ברכץ על הייעוץ והכוונה, לרב דוד רביבו והרב אברהם עידן על העזרה והסיוע בשיבוץ בני הישיבות.<br><br>
                    </p>

                    <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                        <img src="https://storage.bhol.co.il/media/lt/1657699/gallery/811299_tumb_800Xauto.jpg" alt="כינוס הכנה לקבלת התורה" style="width: 100%; max-width: 100%; height: auto; object-fit: cover; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;" />
                    </div>

                    <p style="width: 100%; max-width: 100%; text-align: right; line-height: 1.8; font-size: 24px; color: #2c3e50; font-weight: 600; text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.05);">
                        בסיום המעמד המרגש קיבלו המשתתפים שובר מיוחד מתנת 'פרסטר' וקובץ הגות ומחשבה 'בעמלה של תורה' ח"ב ובו מאמרי מוסר ומחשבה מגדולי ראשי הישיבו. ונוספו לזה - חבורות מבני התורה מקרב הקהילה, כאשר כל כותבי החבורות זכו למענק מיוחד שניתן להם בסיום המעמד.
                    </p>

                    <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                        <img src="https://storage.bhol.co.il/media/lt/1657699/gallery/811280_tumb_800Xauto.jpg" alt="כינוס הכנה לקבלת התורה" style="width: 100%; max-width: 100%; height: auto; object-fit: cover; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;" />
                    </div>

                    <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                        <img src="https://storage.bhol.co.il/media/lt/1657699/gallery/811306_tumb_800Xauto.jpg" alt="כינוס הכנה לקבלת התורה" style="width: 100%; max-width: 100%; height: auto; object-fit: cover; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;" />
                    </div>

                    <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                        <img src="https://storage.bhol.co.il/media/lt/1657699/gallery/811303_tumb_800Xauto.jpg" alt="כינוס הכנה לקבלת התורה" style="width: 100%; max-width: 100%; height: auto; object-fit: cover; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;" />
                    </div>

                    <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                        <img src="https://storage.bhol.co.il/media/lt/1657699/gallery/811290_tumb_800Xauto.jpg" alt="כינוס הכנה לקבלת התורה" style="width: 100%; max-width: 100%; height: auto; object-fit: cover; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;" />
                    </div>

                    <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                        <img src="https://storage.bhol.co.il/media/lt/1657699/gallery/811285_tumb_800Xauto.jpg" alt="כינוס הכנה לקבלת התורה" style="width: 100%; max-width: 100%; height: auto; object-fit: cover; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;" />
                    </div>

                    <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0;">
                        <img src="https://storage.bhol.co.il/media/lt/1657699/gallery/811272_tumb_800Xauto.jpg" alt="כינוס הכנה לקבלת התורה" style="width: 100%; max-width: 100%; height: auto; object-fit: cover; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;" />
                    </div>
                    </div>
                </div>
            </div>
    </div>

    <div id="news-page" class="page">
        <h2 style="color: black; text-align: center; margin: 0; font-size: 4em; font-weight: bold; font-family: 'Frank Ruhl Libre', serif; letter-spacing: 3px;">
            <div style="display: inline-block; vertical-align: middle; margin-right: 0px;">
                <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #D4AF37, #B8860B); margin-bottom: 3px;"></div>
                <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #B8860B, #8B7355); margin-bottom: 3px;"></div>
                <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #8B7355, #B8860B);"></div>
            </div>חדשות<div style="display: inline-block; vertical-align: middle; margin-left: 0px;">
                <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #B8860B, #8B7355); margin-bottom: 3px;"></div>
                <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #8B7355, #B8860B); margin-bottom: 3px;"></div>
                <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #B8860B, #D4AF37);"></div>
            </div>
        </h2>
        <div style="max-width: 1200px; margin: 40px auto; padding: 0 20px;">
            <h2 style="color: #D4AF37; font-size: 36px; font-weight: 900; text-align: center; margin-bottom: 30px; border-bottom: 3px solid #D4AF37; padding-bottom: 15px;">מידע מקיף על איגוד עמלים</h2>
            
            <div style="color: #333333; font-size: 20px; line-height: 1.8; text-align: right; margin-bottom: 40px;">
                <p style="margin-bottom: 20px;">איגוד "עמלים" הוא ארגון ייחודי הפועל למען בני ישיבות יוצאי אתיופיה בישראל.</p>
                
                <h3 style="color: #B8860B; font-size: 28px; font-weight: bold; margin: 30px 0 15px 0; text-align: right;">היסטוריה וייסוד</h3>
                <p style="margin-bottom: 25px;">האיגוד נוסד בשנת תשפ"ד (2024) מתוך צורך עמוק להעניק לבני התורה יוצאי אתיופיה את ההזדמנות, הליווי והמסגרת הרוחנית הראויה.</p>
                
                <h3 style="color: #B8860B; font-size: 28px; font-weight: bold; margin: 30px 0 15px 0; text-align: right;">ישיבות שותפות</h3>
                <p style="margin-bottom: 25px;">האיגוד משתף פעולה עם ישיבות מובחרות: "ברית יעקב", "מאור התורה", "דעת חיים", "אש התלמוד", "באר התלמוד", "תורת אברהם", "אוהל תורה", "תפארת הלוי", "יסודות", "אוהל יוסף", "עטרת הלוי" ועוד רבות. מעל 15 ישיבות שותפות.</p>
                
                <h3 style="color: #B8860B; font-size: 28px; font-weight: bold; margin: 30px 0 15px 0; text-align: right;">פעילות ייחודית</h3>
                <p style="margin-bottom: 25px;">האיגוד מתמקד בשיבוץ בני ישיבות בלבד, ללא פעילויות ספורט או בילויים. כל הפעילות מתמקדת בלימוד תורה, שיבוץ בישיבות, מבחני סיכום תובעניים, וכינוסים תורניים.</p>
                
                <h3 style="color: #B8860B; font-size: 28px; font-weight: bold; margin: 30px 0 15px 0; text-align: right;">קשר עם גדולי ישראל</h3>
                <p style="margin-bottom: 25px;">האיגוד מקיים קשר ישיר עם גדולי ישראל: מרן הגרמ"ה הירש שליט"א, הגר"י טולדאנו שליט"א, הגר"ש כהן שליט"א, הגר"י סויסה שליט"א, מרן הראשל"צ הגר"ד יוסף שליט"א ועוד.</p>
                
                <h3 style="color: #B8860B; font-size: 28px; font-weight: bold; margin: 30px 0 15px 0; text-align: right;">מבחני סיכום וכינוסים</h3>
                <p style="margin-bottom: 25px;">האיגוד מקיים מבחני סיכום תובעניים לתלמידים המסיימים ישיבות קטנות, וכינוסים תורניים מרוממים בהשתתפות מאות בני תורה יוצאי אתיופיה מכל רחבי הארץ.</p>
                
                <h3 style="color: #B8860B; font-size: 28px; font-weight: bold; margin: 30px 0 15px 0; text-align: right;">ליווי אישי ותמיכה</h3>
                <p style="margin-bottom: 25px;">האיגוד מספק ליווי אישי ורוחני לכל תלמיד, כולל קשר ישיר עם ראשי ישיבות ומשגיחים, סיוע כלכלי, הכנה לישיבות גדולות, ותמיכה במשפחות.</p>
                </div>
            </div>
        </div>
        



    <div id="letters-page" class="page">
        <h2 style="color: black; text-align: center; margin: 0; font-size: 4em; font-weight: bold; font-family: 'Frank Ruhl Libre', serif; letter-spacing: 3px;">
            <div style="display: inline-block; vertical-align: middle; margin-right: 0px;">
                <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #D4AF37, #B8860B); margin-bottom: 3px;"></div>
                <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #B8860B, #8B7355); margin-bottom: 3px;"></div>
                <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #8B7355, #B8860B);"></div>
            </div>מכתבים<div style="display: inline-block; vertical-align: middle; margin-left: 0px;">
                <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #B8860B, #8B7355); margin-bottom: 3px;"></div>
                <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #8B7355, #B8860B); margin-bottom: 3px;"></div>
                <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #B8860B, #D4AF37);"></div>
            </div>
        </h2>
        
        <div class="letters-section-wrapper">
        <div class="letters-grid">
            <!-- מכתב 1 - חכם משה צדקה -->
            <a href="https://drive.google.com/file/d/10dyE_Y68zy-AfcPdZDhdEV9oMGjh2fxz/view" target="_blank" class="letter-card">
                <div class="letter-card-preview">
                    <img src="https://drive.google.com/thumbnail?id=10dyE_Y68zy-AfcPdZDhdEV9oMGjh2fxz&sz=w600" alt="מכתב מהגאון הגדול חכם משה צדקה שליט&quot;א">
                </div>
                <h3 class="letter-card-title">מכתב מהגאון הגדול חכם משה צדקה שליט"א</h3>
                <p class="letter-card-subtitle">ראש ישיבת פורת יוסף</p>
                <span class="letter-card-view">לצפייה במכתב</span>
            </a>

            <!-- מכתב 2 - הגר"ש בצלאל -->
            <a href="https://drive.google.com/file/d/1CuktyH1VGcEKFBttlzGjTbcAozOuLE3O/view" target="_blank" class="letter-card">
                <div class="letter-card-preview">
                    <img src="https://drive.google.com/thumbnail?id=1CuktyH1VGcEKFBttlzGjTbcAozOuLE3O&sz=w600" alt="מכתב מהגאון הגדול הגר&quot;ש בצלאל שליט&quot;א">
                </div>
                <h3 class="letter-card-title">מכתב מהגאון הגדול הגר"ש בצלאל שליט"א</h3>
                <p class="letter-card-subtitle">ראש ישיבת פורת יוסף-העיר העתיקה</p>
                <span class="letter-card-view">לצפייה במכתב</span>
            </a>

            <!-- מכתב 3 - הגר"ד כהן -->
            <a href="https://drive.google.com/file/d/1LO13iAe_8hkf6U-Vy1sCN1tBnEbSshzK/view" target="_blank" class="letter-card">
                <div class="letter-card-preview">
                    <img src="https://drive.google.com/thumbnail?id=1LO13iAe_8hkf6U-Vy1sCN1tBnEbSshzK&sz=w600" alt="מכתב מהגאון הגדול הגר&quot;ד כהן שליט&quot;א">
                </div>
                <h3 class="letter-card-title">מכתב מהגאון הגדול הגר"ד כהן שליט"א</h3>
                <p class="letter-card-subtitle">ראש ישיבת חברון</p>
                <span class="letter-card-view">לצפייה במכתב</span>
            </a>

            <!-- מכתב 4 - הגר"א סלים -->
            <a href="https://drive.google.com/file/d/1nHErUaNbC_3k1NfnJhhCh9rKIGE4yyOa/view" target="_blank" class="letter-card">
                <div class="letter-card-preview">
                    <img src="https://drive.google.com/thumbnail?id=1nHErUaNbC_3k1NfnJhhCh9rKIGE4yyOa&sz=w600" alt="מכתב מהגאון הגדול הגר&quot;א סלים שליט&quot;א">
                </div>
                <h3 class="letter-card-title">מכתב מהגאון הגדול הגר"א סלים שליט"א</h3>
                <p class="letter-card-subtitle">ראש ישיבת מאור התורה</p>
                <span class="letter-card-view">לצפייה במכתב</span>
            </a>

            <!-- מכתב 5 - הגר"מ הלל הירש והגאון הרב סלים -->
            <a href="https://drive.google.com/file/d/16yrphdo7iblNs0qo6loIgMnENGNy0pAt/view" target="_blank" class="letter-card">
                <div class="letter-card-preview">
                    <img src="https://drive.google.com/thumbnail?id=16yrphdo7iblNs0qo6loIgMnENGNy0pAt&sz=w600" alt="מכתב מהגר&quot;מ הלל הירש שליט&quot;א והגאון הרב סלים שליט&quot;א">
                </div>
                <h3 class="letter-card-title">מכתב מהגר"מ הלל הירש שליט"א והגאון הרב סלים שליט"א</h3>
                <p class="letter-card-subtitle">מנהיג עולם הישיבות וראש ישיבת מאור התורה</p>
                <span class="letter-card-view">לצפייה במכתב</span>
            </a>

            <!-- מכתב 6 - ר' בניהו שמואלי -->
            <a href="https://drive.google.com/file/d/15FXsrUYB5PNrvkFXXULBAE_siYvInGl_/view" target="_blank" class="letter-card">
                <div class="letter-card-preview">
                    <img src="https://drive.google.com/thumbnail?id=15FXsrUYB5PNrvkFXXULBAE_siYvInGl_&sz=w600" alt="מכתב מהגאון הגדול ר&apos; בניהו שמואלי שליט&quot;א">
                </div>
                <h3 class="letter-card-title">מכתב מהגאון הגדול ר' בניהו שמואלי שליט"א</h3>
                <p class="letter-card-subtitle">ראש ישיבת המקובלים</p>
                <span class="letter-card-view">לצפייה במכתב</span>
            </a>
        </div>
        </div>
    </div>

    <div id="galeinot-page" class="page">
        <h2 style="color: black; text-align: center; margin: 0; font-size: 4em; font-weight: bold; font-family: 'Frank Ruhl Libre', serif; letter-spacing: 3px;">
            <div style="display: inline-block; vertical-align: middle; margin-right: 0px;">
                <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #D4AF37, #B8860B); margin-bottom: 3px;"></div>
                <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #B8860B, #8B7355); margin-bottom: 3px;"></div>
                <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #8B7355, #B8860B);"></div>
            </div>גלינות<div style="display: inline-block; vertical-align: middle; margin-left: 0px;">
                <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #B8860B, #8B7355); margin-bottom: 3px;"></div>
                <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #8B7355, #B8860B); margin-bottom: 3px;"></div>
                <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #B8860B, #D4AF37);"></div>
            </div>
        </h2>

    <div class="letters-grid">       
    
    <div class="letter-card">
        <div class="letter-card-preview">
            <img src="https://i.ibb.co/SXYprfZ1/Recovered-12.jpg" alt="קונטרס 1">
        </div>
           <h3 class="letter-card-title">קונטרס לאור עולם-חנוכה תשפ״ה</h3>
             <a href="https://heyzine.com/flip-book/f4854af6d3.html" target="_blank" class="letter-card-view" style="display: block; margin-top: 10px; background: #c5a059; color: white; padding: 10px; text-decoration: none; border-radius: 5px; text-align: center;">לדפדוף בקונטרס</a>
    </div>

    <div class="letter-card">
        <div class="letter-card-preview">
            <img src="https://i.ibb.co/SXYprfZ1/Recovered-12.jpg" alt="קונטרס 2">
        </div>
             <h3 class="letter-card-title">קונטרס בעמלה של תורה חלק א׳  </h3>
             <a href="https://heyzine.com/flip-book/8703946286.html" target="_blank" class="letter-card-view" style="display: block; margin-top: 10px; background: #c5a059; color: white; padding: 10px; text-decoration: none; border-radius: 5px; text-align: center;">לדפדוף בקונטרס</a>
    </div>

    <div class="letter-card">
        <div class="letter-card-preview">
            <img src="https://i.ibb.co/SXYprfZ1/Recovered-12.jpg" alt="קונטרס 5">
        </div>
             <h3 class="letter-card-title">קונטרס בעמלה של תורה חלק ב׳ </h3>
             <a href="https://heyzine.com/flip-book/0ce2636f4b.html" target="_blank" class="letter-card-view" style="display: block; margin-top: 10px; background: #c5a059; color: white; padding: 10px; text-decoration: none; border-radius: 5px; text-align: center;">לדפדוף בקונטרס</a>
    </div>

    <div class="letter-card">
        <div class="letter-card-preview">
            <img src="https://i.ibb.co/SXYprfZ1/Recovered-12.jpg" alt="קונטרס 3">
        </div>
             <h3 class="letter-card-title">קונטרס ויגבה ליבו</h3>
             <a href="https://heyzine.com/flip-book/e8a2d19f19.html" target="_blank" class="letter-card-view" style="display: block; margin-top: 10px; background: #c5a059; color: white; padding: 10px; text-decoration: none; border-radius: 5px; text-align: center;">לדפדוף בקונטרס</a>
    </div>

    <div class="letter-card">
        <div class="letter-card-preview">
            <img src="https://i.ibb.co/SXYprfZ1/Recovered-12.jpg" alt="קונטרס 4">
        </div>
             <h3 class="letter-card-title">קונטרס רוח אחרת </h3>
             <a href="https://heyzine.com/flip-book/190164c958.html" target="_blank" class="letter-card-view" style="display: block; margin-top: 10px; background: #c5a059; color: white; padding: 10px; text-decoration: none; border-radius: 5px; text-align: center;">לדפדוף בקונטרס</a>
    </div>
    </div>
    </div>


    
    <div id="contact-page" class="page">
        <h2 style="color: black; text-align: center; margin: 20px 0; font-size: 4em; font-weight: bold; font-family: 'Frank Ruhl Libre', serif; letter-spacing: 3px;">
            <div style="display: inline-block; vertical-align: middle; margin-right: 0px;">
                <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #D4AF37, #B8860B); margin-bottom: 3px;"></div>
                <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #B8860B, #8B7355); margin-bottom: 3px;"></div>
                <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #8B7355, #B8860B);"></div>
            </div>תרומות<div style="display: inline-block; vertical-align: middle; margin-left: 0px;">
                <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #B8860B, #8B7355); margin-bottom: 3px;"></div>
                <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #8B7355, #B8860B); margin-bottom: 3px;"></div>
                <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #B8860B, #D4AF37);"></div>
            </div>
        </h2>
        <div class="page-content">
            <div style="max-width: 1200px; margin: 40px auto; padding: 0 20px;">
                <p style="text-align: center; line-height: 1.8; color: #333333; font-size: 20px; margin-bottom: 30px;">
                    "כפי ריבוי הפעילויות – כך גודל הצרכים לבני התורה"<br>
                    ב"ה, איגוד עמלים פועל במסירות נדירה למען בני ישיבות ברמה הגבוהה ביותר יוצאי אתיופיה.
                    עם ריבוי הפעילויות והצרכים, באים גם צרכי הארגון.<br>
                    זכות נדירה להשתתף בחיזוק בני התורה ובשיבוץ בני האיגוד בישיבות.
                </p>
                
                <h2 style="color: #D4AF37; font-size: 32px; font-weight: 900; text-align: center; margin: 40px 0 30px 0; border-bottom: 3px solid #D4AF37; padding-bottom: 15px;">לתרומות נא לפנות באחת מהדרכים המפורטות כאן:</h2>
                
                <div style="text-align: center; margin-top: 30px;">
                    <h3 style="color: #B8860B; font-size: 28px; font-weight: bold; margin: 30px 0 15px 0; text-align: right;">כתובת הארגון</h3>
                    <p style="color: #333333; font-size: 20px; margin-bottom: 25px; text-align: right;">רחוב העליה 22, נתיבות</p>
                    
                    <h3 style="color: #B8860B; font-size: 28px; font-weight: bold; margin: 30px 0 15px 0; text-align: right;">לתרומה מאובטחת</h3>
                    <p style="margin-bottom: 25px; text-align: right;">
                        <a href="https://www.matara.pro/nedarimplus/online/?mosad=7013662" style="color: #D4AF37; font-size: 22px; text-decoration: underline; font-weight: bold;">מערכת נדרים פלוס</a>
                    </p>
                    
                    <h3 style="color: #B8860B; font-size: 28px; font-weight: bold; margin: 30px 0 15px 0; text-align: right;">אימייל</h3>
                    <p style="color: #333333; font-size: 18px; margin-bottom: 10px; text-align: right;">ליצירת קשר והצטרפות לציבור התורמים</p>
                    <p style="color: #D4AF37; font-size: 22px; cursor: pointer; text-decoration: underline; margin-bottom: 10px; text-align: right; font-weight: bold;" onclick="openEmail()">
                        nisim2481@gmail.com
                    </p>
                    <p style="color: #333333; font-size: 18px; text-align: right;">ואנו נשתדל לשוב אליכם במהרה</p>
                </div>
            </div>
        </div>
    </div>

    <div id="articles-page" class="page">
        <h2 style="color: black; text-align: center; margin: 20px 0; font-size: 4em; font-weight: bold; font-family: 'Frank Ruhl Libre', serif; letter-spacing: 3px;">
            <div style="display: inline-block; vertical-align: middle; margin-right: 0px;">
                <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #D4AF37, #B8860B); margin-bottom: 3px;"></div>
                <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #B8860B, #8B7355); margin-bottom: 3px;"></div>
                <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #8B7355, #B8860B);"></div>
            </div>כתבות<div style="display: inline-block; vertical-align: middle; margin-left: 0px;">
                <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #B8860B, #8B7355); margin-bottom: 3px;"></div>
                <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #8B7355, #B8860B); margin-bottom: 3px;"></div>
                <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #B8860B, #D4AF37);"></div>
            </div>
        </h2>
        <div class="page-content">
            <p>כתבות ומאמרים על פעילות איגוד עמלים ובני התורה יוצאי אתיופיה</p>
        </div>
        
        <div class="content-box">
            <h2 style="color: #D4AF37; font-size: 36px; font-weight: 900; text-align: center; margin-bottom: 30px; text-shadow: 2px 2px 4px rgba(212, 175, 55, 0.3); padding: 20px; background: linear-gradient(135deg, rgba(245, 245, 220, 0.5), rgba(240, 240, 230, 0.5)); border-radius: 20px; border: 3px solid #D4AF37;">כתבות מהעיתונות</h2>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 25px; margin-top: 30px;">
                
                <div class="news-card" style="background: linear-gradient(135deg, #F5F5DC 0%, #F0F0E6 50%, #E8E8D8 100%); border: 3px solid #D4AF37; border-radius: 20px; padding: 30px; box-shadow: 0 15px 35px rgba(212, 175, 55, 0.2), 0 5px 15px rgba(0, 0, 0, 0.1); cursor: pointer; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);" onmouseover="this.style.transform='translateY(-8px) scale(1.02)'; this.style.boxShadow='0 20px 40px rgba(212, 175, 55, 0.4), 0 10px 20px rgba(0, 0, 0, 0.2)'; this.style.borderColor='#FFD700';" onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='0 15px 35px rgba(212, 175, 55, 0.2), 0 5px 15px rgba(0, 0, 0, 0.1)'; this.style.borderColor='#D4AF37';">
                    <h3 style="color: #D4AF37; font-size: 26px; margin-bottom: 15px; text-align: center; font-weight: 900; text-shadow: 2px 2px 4px rgba(212, 175, 55, 0.2); transition: all 0.3s ease;">כותל המזרח</h3>
                    <p style="color: #8B7355; font-size: 16px; line-height: 1.6; text-align: right; margin-bottom: 15px;">
                        כתבה מקיפה על מעמד ציון שנה לאיגוד עמלים, בהשתתפות מאות בני תורה יוצאי אתיופיה מכל רחבי הארץ. הכתבה מתארת את הפעילות המבורכת של האיגוד ואת ההצלחה הגדולה בשיבוץ בני ישיבות.
                    </p>
                    <p style="color: #B8860B; font-size: 14px; text-align: left; margin-top: 15px; font-weight: bold;">פורסם: כותל המזרח, תשפ"ד</p>
                </div>
                
                <div style="background: linear-gradient(135deg, #F0F0E6 0%, #E8E8D8 50%, #E0E0D0 100%); border: 2px solid #D4AF37; border-radius: 15px; padding: 25px; box-shadow: 0 12px 25px rgba(0, 0, 0, 0.3); overflow: visible;">
                    <h3 style="color: #D4AF37; font-size: 24px; margin-bottom: 15px; text-align: center;">המזרח</h3>
                    <p style="color: #8B7355; font-size: 16px; line-height: 1.6; text-align: right; margin-bottom: 15px;">
                        כתבה מיוחדת על כינוס ההכנה לחג מתן תורה של איגוד עמלים, בהשתתפות יו"ר ש"ס אריה דרעי וראשי ישיבות. הכתבה מתארת את המעמד המרגש ואת המסר החשוב של חיזוק בני התורה יוצאי אתיופיה.
                    </p>
                    <p style="color: #B8860B; font-size: 14px; text-align: left; margin-top: 15px; font-weight: bold;">פורסם: המזרח, תשפ"ד</p>
                </div>
                
                <div style="background: linear-gradient(135deg, #F0F0E6 0%, #E8E8D8 50%, #E0E0D0 100%); border: 2px solid #D4AF37; border-radius: 15px; padding: 25px; box-shadow: 0 12px 25px rgba(0, 0, 0, 0.3); overflow: visible;">
                    <h3 style="color: #D4AF37; font-size: 24px; margin-bottom: 15px; text-align: center;">בחדרי חרדים</h3>
                    <p style="color: #8B7355; font-size: 16px; line-height: 1.6; text-align: right; margin-bottom: 15px;">
                        כתבה מפורטת על פעילות איגוד עמלים בשיבוץ בני ישיבות יוצאי אתיופיה בישיבות מובחרות. הכתבה מתארת את הליווי האישי והתמיכה הרוחנית שמקבלים התלמידים.
                    </p>
                    <p style="color: #B8860B; font-size: 14px; text-align: left; margin-top: 15px; font-weight: bold;">פורסם: בחדרי חרדים, תשפ"ד</p>
                </div>
                
            </div>
        </div>
        
        <div class="content-box">
            <h2 style="color: #D4AF37; font-size: 36px; font-weight: 900; text-align: center; margin-bottom: 30px; text-shadow: 2px 2px 4px rgba(212, 175, 55, 0.3); padding: 20px; background: linear-gradient(135deg, rgba(245, 245, 220, 0.5), rgba(240, 240, 230, 0.5)); border-radius: 20px; border: 3px solid #D4AF37;">מאמרים תורניים</h2>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 25px; margin-top: 30px;">
                
                <div style="background: linear-gradient(135deg, #F0F0E6 0%, #E8E8D8 50%, #E0E0D0 100%); border: 2px solid #D4AF37; border-radius: 15px; padding: 25px; box-shadow: 0 12px 25px rgba(0, 0, 0, 0.3); overflow: visible;">
                    <h3 style="color: #D4AF37; font-size: 24px; margin-bottom: 15px; text-align: center;">בעמלה של תורה</h3>
                    <p style="color: #8B7355; font-size: 16px; line-height: 1.6; text-align: right; margin-bottom: 15px;">
                        מאמר תורני על חשיבות הלימוד והעמל בתורה בקרב בני התורה יוצאי אתיופיה. המאמר מתמקד בערכים של מסירות נפש ללימוד תורה והתמדה בעבודת ה'.
                    </p>
                    <p style="color: #B8860B; font-size: 14px; text-align: left; margin-top: 15px; font-weight: bold;">מאת: הרב נתנאל פרץ שליט"א</p>
                </div>
                
                <div style="background: linear-gradient(135deg, #F0F0E6 0%, #E8E8D8 50%, #E0E0D0 100%); border: 2px solid #D4AF37; border-radius: 15px; padding: 25px; box-shadow: 0 12px 25px rgba(0, 0, 0, 0.3); overflow: visible;">
                    <h3 style="color: #D4AF37; font-size: 24px; margin-bottom: 15px; text-align: center;">חבורות תורניות</h3>
                    <p style="color: #8B7355; font-size: 16px; line-height: 1.6; text-align: right; margin-bottom: 15px;">
                        מאמר על חשיבות החבורות התורניות בקרב בני התורה יוצאי אתיופיה. המאמר מתאר את הדרך שבה החבורות מסייעות לחיזוק הקשר עם התורה והקהילה.
                    </p>
                    <p style="color: #B8860B; font-size: 14px; text-align: left; margin-top: 15px; font-weight: bold;">מאת: הרב ניסים יברקן שליט"א</p>
                </div>
                
                <div style="background: linear-gradient(135deg, #F0F0E6 0%, #E8E8D8 50%, #E0E0D0 100%); border: 2px solid #D4AF37; border-radius: 15px; padding: 25px; box-shadow: 0 12px 25px rgba(0, 0, 0, 0.3); overflow: visible;">
                    <h3 style="color: #D4AF37; font-size: 24px; margin-bottom: 15px; text-align: center;">שיעורים מוקלטים</h3>
                    <p style="color: #8B7355; font-size: 16px; line-height: 1.6; text-align: right; margin-bottom: 15px;">
                        אוסף שיעורים מוקלטים מגדולי ישראל על חשיבות חיזוק בני התורה יוצאי אתיופיה. השיעורים כוללים דברי חיזוק ועידוד לבני הקהילה.
                    </p>
                    <p style="color: #B8860B; font-size: 14px; text-align: left; margin-top: 15px; font-weight: bold;">שיעורים מגדולי ישראל

                                </p>
                            </div>
                        </div>
                    </div>
                </div>

    <script>
        // 🎯 אפקטים משופרים - טקסט ותמונות לפי כיוון הכרטיסיה
        
        function addTextSlideEffects() {
                // הסרת classes קיימים
                document.querySelectorAll('.leader-text, .project-text').forEach(element => {
                        element.classList.remove('text-slide-right', 'text-slide-left', 'text-visible');
                });
                
                // הוספת classes לטקסט לפי מיקום האמיתי בכרטיסיה
                document.querySelectorAll('.leader-text, .project-text').forEach((textElement) => {
                    const isHomePage = textElement.closest('#home-page');
                    if (!isHomePage) {
                        const card = textElement.closest('.leader-card, .project-card');
                        
                        // בדיקה אם הכרטיסיה היא reverse
                        if (card && card.style.flexDirection === 'row-reverse') {
                            // בכרטיסיה הפוכה: הטקסט נמצא בצד ימין אז נכנס מימין
                            textElement.classList.add('text-slide-right');
                        } else {
                            // בכרטיסיה רגילה: הטקסט נמצא בצד שמאל אז נכנס משמאל
                            textElement.classList.add('text-slide-left');
                        }
                    }
                });
        }

        function addImageSlideEffects() {
                // הסרת classes קיימים
                document.querySelectorAll('.leader-image, .project-image').forEach(element => {
                        element.classList.remove('image-slide-right', 'image-slide-left', 'image-visible');
                });
                
                // הוספת classes לתמונות לפי מיקום האמיתי בכרטיסיה
                document.querySelectorAll('.leader-image, .project-image').forEach((imageElement) => {
                    const isHomePage = imageElement.closest('#home-page');
                    if (!isHomePage) {
                        const card = imageElement.closest('.leader-card, .project-card');
                        
                        // בדיקה אם הכרטיסיה היא reverse
                        if (card && card.style.flexDirection === 'row-reverse') {
                            // בכרטיסיה הפוכה: התמונה נמצאת בצד שמאל אז נכנסת משמאל
                            imageElement.classList.add('image-slide-left');
                        } else {
                            // בכרטיסיה רגילה: התמונה נמצאת בצד ימין אז נכנסת מימין
                            imageElement.classList.add('image-slide-right');
                        }
                    }
                });
        }

        function checkTextScroll() {
                const textElements = document.querySelectorAll('.text-slide-right, .text-slide-left');
                
                textElements.forEach(element => {
                    const rect = element.getBoundingClientRect();
                    const windowHeight = window.innerHeight;
                    
                    if (rect.top < windowHeight - 100 && rect.bottom > 100) {
                        element.classList.add('text-visible');
                    } else {
                        element.classList.remove('text-visible');
                    }
                });
        }

        function checkImageScroll() {
                const imageElements = document.querySelectorAll('.image-slide-right, .image-slide-left');
                
                imageElements.forEach(element => {
                    const rect = element.getBoundingClientRect();
                    const windowHeight = window.innerHeight;
                    
                    if (rect.top < windowHeight - 100 && rect.bottom > 100) {
                        element.classList.add('image-visible');
                    } else {
                        element.classList.remove('image-visible');
                    }
                });
        }

        // 🎯 הפעלת אפקטים בטעינת הדף
        document.addEventListener('DOMContentLoaded', function () {
            addTextSlideEffects();
            addImageSlideEffects();
            checkTextScroll();
            checkImageScroll();
        });

        // 🎯 הפעלת אפקטים בגלילה
        window.addEventListener('scroll', function () {
            checkTextScroll();
            checkImageScroll();
        });

        // 🎯 הפעלת אפקטים בשינוי גודל חלון
        window.addEventListener('resize', function () {
            addTextSlideEffects();
            addImageSlideEffects();
            checkTextScroll();
            checkImageScroll();
        });

        // הפונקציות הקיימות של האתר
        function showPage(pageId) {
            // הסתרת כל הדפים
            document.querySelectorAll('.page').forEach(page => {
                page.style.display = 'none';
            });

            // הצגת הדף הנבחר
            document.getElementById(pageId + '-page').style.display = 'block';

            // עדכון מצב הכפתורים
            document.querySelectorAll('.nav-btn').forEach(btn => {
                btn.classList.remove('active');
            });

            // סימון הכפתור הפעיל
            const activeBtn = document.querySelector(`[onclick="showPage('${pageId}')"]`);
            if (activeBtn) {
                activeBtn.classList.add('active');
            }


            // 🎯 הפעלת אפקטים חדשה לאחר החלפת דף
            setTimeout(() => {
                addTextSlideEffects();
                addImageSlideEffects();
                checkTextScroll();
                checkImageScroll();
            }, 100);
        }

        function openEmail() {
            window.location.href = 'mailto:s0534142893@gmail.com';
        }


        // פונקציות האתר הקיימות
        function openEventModal(eventName, eventDescription, eventDate, eventImage) {
            document.getElementById('modal-event-name').textContent = eventName;
            document.getElementById('modal-event-description').textContent = eventDescription;
            document.getElementById('modal-event-date').textContent = eventDate;
            
            if (eventImage) {
                document.getElementById('modal-event-image').src = eventImage;
                document.getElementById('modal-event-image').style.display = 'block';
            } else {
                document.getElementById('modal-event-image').style.display = 'none';
            }
            
            document.getElementById('eventModal').style.display = 'block';
        }

        function closeEventModal() {
            document.getElementById('eventModal').style.display = 'none';
        }

        function showEventDetails(eventTitle, eventDescription, eventDate, eventImage) {
            // יצירת כרטיסיית אירוע מלאה
            const eventCard = document.createElement('div');
            eventCard.className = 'full-event-card';
            eventCard.innerHTML = `
                <div class="event-content">
                    <button class="close-btn" onclick="closeEventDetails()">&times;</button>
                    ${eventImage ? `<img src="${eventImage}" alt="${eventTitle}" class="event-image">` : ''}
                    <h2>${eventTitle}</h2>
                    <p class="event-date">${eventDate}</p>
                    <p class="event-description">${eventDescription}</p>
                </div>
            `;
            
            document.body.appendChild(eventCard);
            
            // הוספת מצב להיסטוריה
            history.pushState({view: 'event-details'}, '', '');
        }

        function closeEventDetails() {
            const fullEventCard = document.querySelector('.full-event-card');
            if (fullEventCard) {
                fullEventCard.remove();
            }
        }

        // סגירת המודל בלחיצה מחוץ לתוכן
        document.addEventListener('click', function(event) {
            const modal = document.getElementById('eventModal');
            if (event.target === modal) {
                closeEventModal();
            }
            
            // סגירת כרטיסיות האירועים בלחיצה מחוץ לתוכן
            const fullEventCards = document.querySelectorAll('.full-event-card');
            fullEventCards.forEach(card => {
                if (event.target === card) {
                    closeEventDetails();
                }
            });
        });

        // סגירת המודל בלחיצה על מקש Escape
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeEventModal();
                closeEventDetails();
            }
        });

        // הוספת מאזין לכפתור חזרה
        window.addEventListener('popstate', function(event) {
            if (event.state && event.state.view === 'event-details') {
                closeEventDetails();
            }
        });

        // אפקט הקלדה לטקסטים בעמוד הבית
        const typewriterTexts = [
            'איגוד עמלים נוסד בשנת תשפ"ד מתוך תחושת שליחות עמוקה להעניק לבני התורה יוצאי אתיופיה את ההזדמנות והליווי והמסגרת הרוחנית הראויה כדי שיוכלו לגדול ולהתעלות בעולמה של תורה ולהשתלב בעולם הישיבות הספרדי והחרדי מתוך כבוד ושייכות וגדלות',
            'האיגוד פועל תחת נשיאותו של חבר מועצת חכמי התורה מרן ראש הישיבה הגאון הגדול רבי אברהם סאלים שליט"א ובהכוונתם הצמודה של מרנן ורבנן ראשי הישיבות שליט"א ועוסק בשיבוץ תלמידים יוצאי אתיופיה בישיבות מובחרות ומספק הכוונה אישית ורוחנית לכל תלמיד'
        ];
        
        let typewriterStarted = false;
        
        function typeWriter(elementId, text, speed = 20) {
            return new Promise((resolve) => {
                const element = document.getElementById(elementId);
                if (!element) {
                    resolve();
                    return;
                }
                let i = 0;
                element.textContent = '';
                element.classList.add('typing'); // הוספת class להצגת cursor
                
                function type() {
                    if (i < text.length) {
                        element.textContent += text.charAt(i);
                        i++;
                        setTimeout(type, speed);
                    } else {
                        // סיום הקלדה - הסרת cursor
                        setTimeout(() => {
                            element.classList.remove('typing');
                        }, 300);
                        resolve();
                    }
                }
                type();
            });
        }
        
        async function startTypewriterEffect() {
            if (typewriterStarted) return;
            typewriterStarted = true;
            
            await typeWriter('typewriter-text-1', typewriterTexts[0], 20);
            await typeWriter('typewriter-text-2', typewriterTexts[1], 20);
        }
        
        // התחלת האפקט כשגוללים לאזור הטקסט
        const typewriterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startTypewriterEffect();
                    typewriterObserver.disconnect();
                }
            });
        }, { threshold: 0.3 });
        
        const typewriterSection = document.querySelector('.hero-text-description');
        if (typewriterSection) {
            typewriterObserver.observe(typewriterSection);
        }
        
        // ניהול כפתורי "קרא עוד" בכרטיסיות ראשי האיגוד
        // ניהול כפתורי "קרא עוד" בכרטיסיות ראשי האיגוד - כמו unfold-box
        const readMoreButtons = document.querySelectorAll('.read-more-btn');
        
        readMoreButtons.forEach(button => {
            button.addEventListener('click', function() {
                const card = this.closest('.full-width-leader-card');
                const isCurrentlyOpen = card && card.classList.contains('open');
                
                if (card && !isCurrentlyOpen) {
                    // סגירה ופתיחה באותו זמן - כל השינויים באותו בלוק
                    document.querySelectorAll('.full-width-leader-card').forEach(c => c.classList.remove('open'));
                    readMoreButtons.forEach(btn => btn.textContent = 'קרא עוד');
                    card.classList.add('open');
                    this.textContent = 'סגור';
                } else if (card) {
                    card.classList.remove('open');
                    this.textContent = 'קרא עוד';
                }
            });
        });

    </script>

</body>

</html>
    <script>
        
        // 🎯 אפקטים משופרים - טקסט ותמונות לפי כיוון הכרטיסיה
        
        function addTextSlideEffects() {
            // הסרת classes קיימים
            document.querySelectorAll('.leader-text, .project-text').forEach(element => {
                element.classList.remove('text-slide-right', 'text-slide-left', 'text-visible');
            });
            
            // הוספת classes לטקסט לפי מיקום האמיתי בכרטיסיה
            document.querySelectorAll('.leader-text, .project-text').forEach((textElement) => {
                const isHomePage = textElement.closest('#home-page');
                if (!isHomePage) {
                    const card = textElement.closest('.leader-card, .project-card');
                    
                    // בדיקה אם הכרטיסיה היא reverse
                    if (card && card.style.flexDirection === 'row-reverse') {
                        // בכרטיסיה הפוכה: הטקסט נמצא בצד ימין אז נכנס מימין
                        textElement.classList.add('text-slide-right');
                    } else {
                        // בכרטיסיה רגילה: הטקסט נמצא בצד שמאל אז נכנס משמאל
                        textElement.classList.add('text-slide-left');
                    }
                }
            });
        }

        function addImageSlideEffects() {
            // הסרת classes קיימים
            document.querySelectorAll('.leader-image, .project-image').forEach(element => {
                element.classList.remove('image-slide-right', 'image-slide-left', 'image-visible');
            });
            
            // הוספת classes לתמונות לפי מיקום האמיתי בכרטיסיה
            document.querySelectorAll('.leader-image, .project-image').forEach((imageElement) => {
                const isHomePage = imageElement.closest('#home-page');
                if (!isHomePage) {
                    const card = imageElement.closest('.leader-card, .project-card');
                    
                    // בדיקה אם הכרטיסיה היא reverse
                    if (card && card.style.flexDirection === 'row-reverse') {
                        // בכרטיסיה הפוכה: התמונה נמצאת בצד שמאל אז נכנסת משמאל
                        imageElement.classList.add('image-slide-left');
                    } else {
                        // בכרטיסיה רגילה: התמונה נמצאת בצד ימין אז נכנסת מימין
                        imageElement.classList.add('image-slide-right');
                    }
                }
            });
        }

        function checkTextScroll() {
            const textElements = document.querySelectorAll('.text-slide-right, .text-slide-left');
            
            textElements.forEach(element => {
                const rect = element.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                if (rect.top < windowHeight - 100 && rect.bottom > 100) {
                    element.classList.add('text-visible');
                } else {
                    element.classList.remove('text-visible');
                }
            });
        }

        function checkImageScroll() {
            const imageElements = document.querySelectorAll('.image-slide-right, .image-slide-left');
            
            imageElements.forEach(element => {
                const rect = element.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                if (rect.top < windowHeight - 100 && rect.bottom > 100) {
                    element.classList.add('image-visible');
                } else {
                    element.classList.remove('image-visible');
                }
            });
        }

        function refreshEffectsOnPageChange() {
            setTimeout(() => {
                    addTextSlideEffects();
                    addImageSlideEffects();
                    addTitleSlideEffects();
                    checkTextScroll();
                    checkImageScroll();
                    checkTitleScroll();
            }, 100);
        }


        function showPage(pageId) {
            console.log('showPage called with:', pageId);
            // אם זה דף אירועים, סגור כרטיסיות פתוחות
            if (pageId === 'events') {
                closeEventDetails();
            } else {
                // אם זה לא דף אירועים, סגור כל כרטיסיות אירועים פתוחות
                document.querySelectorAll('.full-event-card').forEach(card => {
                    card.style.display = 'none';
                });
                
                // החזרת הגלילה לגוף הדף
                document.body.style.overflow = 'auto';
                
                // הסתרת הודעות קופצות
                document.querySelectorAll('.back-notification').forEach(notification => {
                    notification.style.display = 'none';
                });
            }
            
            // הסתרת כל הדפים
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active-page');
            });

            // הסרת active מכל הקישורים
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });

            // הצגת הדף הנבחר
            const targetPage = document.getElementById(pageId + '-page');
            console.log('Looking for page:', pageId + '-page');
            console.log('Found page:', targetPage);
            if (targetPage) {
                targetPage.classList.add('active-page');
                console.log('Added active-page to:', targetPage.id);
                
                // הוספת בראונר לדף אם אין לו עדיין
                ensureFooterExists(targetPage);
            } else {
                console.log('Page not found!');
            }

            // הוספת active לקישור הנכון
            const navLinks = document.querySelectorAll('.nav-link');
            const pageMap = {
                    'home': 0,
                    'about': 1,
                    'letters': 2,
                    'galeinot': 3,
                    'news': 4,
                    'gallery': 5,
                    'articles': 6,
                    'contact': 7
                };
                
            if (pageMap[pageId] && navLinks[pageMap[pageId]]) {
                navLinks[pageMap[pageId]].classList.add('active');
            }

            refreshEffectsOnPageChange();
            return false; // מונע ניווט לדף אחר
        }
        
        // פונקציה שמוודאת שיש בראונר בדף
        function ensureFooterExists(page) {
            // בדיקה אם כבר יש בראונר בדף
            if (page.querySelector('.footer')) {
                return; // כבר יש בראונר, אין צורך להוסיף
            }
            
            // יצירת בראונר חדש
            const footer = document.createElement('footer');
            footer.className = 'footer';
            footer.innerHTML = `
                <div class="container">
                    <div class="footer-content" style="justify-content: center; gap: 100px;">
                        <div class="footer-section" style="flex: 0 0 auto; max-width: 400px;">
                            <h3>אודותינו</h3>
                            <p>איגוד עמלים נוסד בשנת תשפ"ד מתוך תחושת שליחות עמוקה להעניק לבני התורה יוצאי אתיופיה את ההזדמנות והליווי והמסגרת הרוחנית הראויה.</p>
                        </div>

                        <div class="footer-section" style="flex: 0 0 auto; max-width: 300px;">
                            <h3>פרטי התקשרות</h3>
                            <div style="display: flex; flex-direction: column; gap: 8px;">
                                <div class="contact-item">
                                    <span>📞</span>
                                    <span>050-1234567</span>
                                </div>
                                <div class="contact-item">
                                    <span>📧</span>
                                    <a href="mailto:nisim2481@gmail.com" class="email-link">nisim2481@gmail.com</a>
                                </div>
                                <div class="contact-item">
                                    <span>📍</span>
                                    <span>ירושלים, ישראל</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="footer-bottom">
                        <p>© 2025 איגוד עמלים - כל הזכויות שמורות</p>
                        <a href="#" onclick="showPage('terms'); return false;">תנאי שימוש ומדיניות פרטיות</a>
                    </div>
                </div>
            `;
            
            // הוספת הבראונר לדף
            page.appendChild(footer);
        }

        function goToHomePage() {
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active-page');
            });

            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            
            const homePage = document.getElementById('home-page');
            homePage.classList.add('active-page');
            document.querySelector('.nav-link').classList.add('active');

            // הוספת בראונר לדף הבית אם אין לו עדיין
            ensureFooterExists(homePage);

            // איפוס הריבועים
            document.querySelectorAll('.riboim-wrapper div').forEach(div => {
                div.classList.remove('flipped');
            });

            refreshEffectsOnPageChange();
            return false; // מונע ניווט לדף אחר
        }
        
        // הוספת בראונר לדף הבית בטעינה ראשונית
        window.addEventListener('DOMContentLoaded', function() {
            const homePage = document.getElementById('home-page');
            if (homePage && homePage.classList.contains('active-page')) {
                ensureFooterExists(homePage);
            }
        });


        function openEmail() {
            const subject = 'תרומה לאיגוד עמלים';
            const body = 'שלום רב,\n\nאני רוצה לתרום לאיגוד עמלים.\n\nתודה רבה';
            const encodedSubject = encodeURIComponent(subject);
            const encodedBody = encodeURIComponent(body);
            window.location.href = `mailto:nisim2481@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;
        }



        // פונקציות לניהול כרטיסיות האירועים
        function showEventDetails(eventId) {
            // בדיקה שאנחנו במדור האירועים
            const currentPage = document.querySelector('.page.active-page');
            if (!currentPage || !currentPage.id.includes('events')) {
                // אם אנחנו לא במדור האירועים, עבור למדור האירועים קודם
                showPage('events');
                // המתן קצת ואז הצג את הכרטיסיה
                setTimeout(() => {
                    showEventDetailsInternal(eventId);
                }, 100);
                return;
            }
            
            showEventDetailsInternal(eventId);
        }

        function showEventDetailsInternal(eventId) {
            // בדיקה שאנחנו במדור האירועים
            const currentPage = document.querySelector('.page.active-page');
            if (!currentPage || !currentPage.id.includes('events')) {
                console.log('לא ניתן להציג כרטיסיות אירועים מחוץ למדור האירועים');
                return;
            }
            
            // הצגת הכרטיסיה המלאה המתאימה לפני הסתרת התוכן הקיים
            const fullCard = document.getElementById('full-' + eventId);
            if (!fullCard) {
                console.log('לא נמצאה כרטיסיה מלאה עם ID: full-' + eventId);
                return;
            }
            
            // הכנת הכרטיסיה המלאה
            fullCard.style.display = 'block';
            fullCard.style.position = 'relative';
            fullCard.style.zIndex = '1000';
            fullCard.style.opacity = '1';
            fullCard.style.visibility = 'visible';
            fullCard.style.backgroundColor = 'rgba(219, 234, 254, 0.95)';
            fullCard.style.borderRadius = '15px';
            fullCard.style.boxShadow = '0 12px 25px rgba(0, 0, 0, 1.0), 0 6px 12px rgba(0, 0, 0, 0.9)';
            fullCard.style.margin = '20px auto';
            fullCard.style.padding = '30px';
            fullCard.style.maxWidth = '95%';
            
            // רק אחרי שהכרטיסיה מוכנה - מסתיר את התוכן הקיים
            setTimeout(() => {
                // הסתרת כל הכרטיסיות המלאות האחרות
                document.querySelectorAll('.full-event-card').forEach(card => {
                    if (card.id !== 'full-' + eventId) {
                        card.style.display = 'none';
                    }
                });
                
                // הסתרת רשת האירועים
                const eventsGrid = document.querySelector('.events-grid');
                if (eventsGrid) {
                    eventsGrid.style.display = 'none';
                }
                
                // הסתרת תוכן הדף הראשי
                const pageContent = document.querySelector('.gallery-page .page-content');
                if (pageContent) {
                    pageContent.style.display = 'none';
                }
            }, 50);
            
            // גלילה לראש הדף
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // הוספת היסטוריה לדפדפן
            const state = { eventId: eventId, view: 'event-details' };
            const url = `#event-${eventId}`;
            history.pushState(state, '', url);
            
            // מניעת גלילה בגוף הדף כשהכרטיסיה פתוחה
            document.body.style.overflow = 'hidden';
            
            // הצגת הודעה קופצת לחזרה
            const notification = document.getElementById('notification' + eventId.replace('event', ''));
            if (notification) {
                notification.style.display = 'block';
                
                // הסתרת ההודעה אחרי 5 שניות
                setTimeout(() => {
                    notification.classList.add('fade-out');
                    setTimeout(() => {
                        notification.style.display = 'none';
                        notification.classList.remove('fade-out');
                    }, 500);
                }, 5000);
            }
            
            console.log('הכרטיסיה המלאה הוצגה:', eventId);
        }
        
        function closeEventDetails() {
            // בדיקה שאנחנו במדור האירועים
            const currentPage = document.querySelector('.page.active-page');
            if (!currentPage || !currentPage.id.includes('events')) {
                return; // אם אנחנו לא במדור האירועים, אל תעשה כלום
            }
            
            // הסתרת כל הכרטיסיות המלאות
            document.querySelectorAll('.full-event-card').forEach(card => {
                card.style.display = 'none';
            });
            
            // הצגת רשת האירועים מחדש
            const eventsGrid = document.querySelector('.events-grid');
            if (eventsGrid) {
                eventsGrid.style.display = 'grid';
            }
            
            // הצגת תוכן הדף הראשי מחדש
            const pageContent = document.querySelector('.events-page .page-content');
            if (pageContent) {
                pageContent.style.display = 'block';
            }
            
            // החזרת הגלילה לגוף הדף
            document.body.style.overflow = 'auto';
            
            // הסתרת הודעות קופצות
            document.querySelectorAll('.back-notification').forEach(notification => {
                notification.style.display = 'none';
            });
            
            // עדכון היסטוריית הדפדפן
            history.pushState({ view: 'events-grid' }, '', window.location.pathname);
        }

        function closeEventModal() {
            const modal = document.getElementById('eventModal');
            modal.style.display = 'none';
            
            // החזרת הגלילה לגוף הדף
            document.body.style.overflow = 'auto';
        }

        // סגירת המודל בלחיצה מחוץ לתוכן
        document.addEventListener('click', function(event) {
            const modal = document.getElementById('eventModal');
            if (event.target === modal) {
                closeEventModal();
            }
            
            // סגירת כרטיסיות האירועים בלחיצה מחוץ לתוכן
            const fullEventCards = document.querySelectorAll('.full-event-card');
            fullEventCards.forEach(card => {
                if (event.target === card) {
                    closeEventDetails();
                }
            });
        });

        // סגירת המודל בלחיצה על מקש Escape
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeEventModal();
                closeEventDetails();
            }
        });

        // סגירת כרטיסיות בלחיצה מחוץ לתוכן
        document.addEventListener('click', function(event) {
            const fullEventCards = document.querySelectorAll('.full-event-card');
            fullEventCards.forEach(card => {
                if (event.target === card) {
                    closeEventDetails();
                }
            });
        });

        // הוספת מאזין לכפתור חזרה
        window.addEventListener('popstate', function(event) {
            // בדיקה אם יש מידע על המצב הנוכחי
            if (event.state && event.state.view === 'event-details') {
                // אם היינו בכרטיסיית אירוע, חזור לרשת האירועים
                closeEventDetails();
            } else {
                // אם היינו ברשת האירועים, חזור לדף הראשי
                window.location.href = 'index.html';
            }
        });





        // פונקציות לאפקטי כותרות ראשיות בלבד - רק הכותרות הגדולות כמו "הגר"א סאלים"
        function addTitleSlideEffects() {
                document.querySelectorAll('.content-box').forEach((contentBox) => {
                    // מוצא את הכותרת הראשית (הראשונה) בכל כרטיסיה - כמו "הגר"א סאלים" בכרטיסיה הראשונה
                    const firstTitle = contentBox.querySelector('p.title');
                if (firstTitle) {
                        firstTitle.classList.add('text-slide-left'); // מוסיף אפקט החלקה משמאל - הכותרת תיכנס מהצד
                    }
                });
        }

        function checkTitleScroll() {
                document.querySelectorAll('.content-box').forEach((contentBox) => {
                    // מוצא את הכותרת הראשית (הראשונה) בכל כרטיסיה - רק הכותרות הגדולות
                    const firstTitle = contentBox.querySelector('p.title');
                if (firstTitle) {
                        const rect = firstTitle.getBoundingClientRect(); // מקבל את המיקום המדויק של הכותרת במסך
                        const windowHeight = window.innerHeight; // גובה החלון - כמה גבוה המסך
                        
                        // בודק אם הכותרת נראית במסך - האם המשתמש גלל אליה
                        if (rect.top < windowHeight - 100 && rect.bottom > 100) {
                            firstTitle.classList.add('text-visible'); // מפעיל את האפקט - הכותרת תיכנס ותקפוץ
                        } else {
                            firstTitle.classList.remove('text-visible'); // מסתיר את האפקט - הכותרת תיעלם אם המשתמש גלל הלאה
                        }
                    }
                });
        }

        // הפעלת האפקטים
        window.addEventListener('load', function() {
                addTextSlideEffects();
                addImageSlideEffects();
                addTitleSlideEffects();
                checkTextScroll();
                checkImageScroll();
                checkTitleScroll();
        });

        window.addEventListener('scroll', function() {
                checkTextScroll();
                checkImageScroll();
                checkTitleScroll();
        });





        document.addEventListener('DOMContentLoaded', function () {
            initSlideshow();
        });

        // פונקציות חיפוש משופרות
        let isSearchOpen = false;
        let currentSuggestions = [];
        let selectedIndex = -1;

        // רשימת מילות מפתח מורחבת
        const searchKeywords = [
            { text: 'עמוד ראשי', pageId: 'home', category: 'ניווט' },
            { text: 'אודות', pageId: 'about', category: 'ניווט' },
            { text: 'אודות איגוד עמלים', pageId: 'about', category: 'תוכן' },
            { text: 'מכתבי גדולי ישראל', pageId: 'letters', category: 'ניווט' },
            { text: 'גלינות', pageId: 'galeinot', category: 'ניווט' },
            { text: 'לאור עולם', pageId: 'galeinot', category: 'גלינות' },
            { text: 'בעמלה של תורה', pageId: 'galeinot', category: 'גלינות' },
            { text: 'ויגבה ליבו', pageId: 'galeinot', category: 'גלינות' },
            { text: 'רוח אחר', pageId: 'galeinot', category: 'גלינות' },
            { text: 'חדשות', pageId: 'news', category: 'ניווט' },
            { text: 'גלריות', pageId: 'gallery', category: 'ניווט' },
            { text: 'גלריות תמונות', pageId: 'gallery', category: 'תוכן' },
            { text: 'כתבות', pageId: 'articles', category: 'ניווט' },
            { text: 'לתרומות', pageId: 'contact', category: 'ניווט' },
            { text: 'תרומות', pageId: 'contact', category: 'תוכן' },
            { text: 'איגוד עמלים', pageId: 'about', category: 'תוכן' },
            { text: 'עמלים', pageId: 'about', category: 'תוכן' },
            { text: 'ישיבות', pageId: 'about', category: 'תוכן' },
            { text: 'אתיופיה', pageId: 'about', category: 'תוכן' },
            { text: 'בני תורה', pageId: 'about', category: 'תוכן' },
            { text: 'הגר"א סאלים', pageId: 'about', category: 'אישים' },
            { text: 'ר\' נתנאל פרץ', pageId: 'about', category: 'אישים' },
            { text: 'הנהגה רוחנית', pageId: 'about', category: 'תוכן' },
            { text: 'מטרות ופעילות', pageId: 'about', category: 'תוכן' },
            { text: 'שיבוץ תלמידים', pageId: 'about', category: 'תוכן' },
            { text: 'כינוסים תורניים', pageId: 'about', category: 'תוכן' },
            { text: 'מבחני סיכום', pageId: 'about', category: 'תוכן' },
            { text: 'הכוונה אישית', pageId: 'about', category: 'תוכן' },
            { text: 'גדולי ישראל', pageId: 'about', category: 'תוכן' },
            { text: 'מעמד הכנה לקבלת התורה', pageId: 'news', category: 'אירועים' },
            { text: 'עונת רישום', pageId: 'news', category: 'אירועים' },
            { text: 'ציון שנה לאיגוד', pageId: 'news', category: 'אירועים' }
        ];

        function toggleSearch() {
            const searchBar = document.getElementById('searchBar');
            const navMenu = document.querySelector('.nav-menu');
            const searchIcon = document.querySelector('.search-icon');
            
            if (!isSearchOpen) {
                // פתיחת החיפוש
                searchBar.classList.add('active');
                navMenu.classList.add('search-open');
                searchIcon.classList.add('active');
                isSearchOpen = true;
                
                // פוקוס על שדה החיפוש
                setTimeout(() => {
                    searchBar.querySelector('input').focus();
                }, 300);
            } else {
                // סגירת החיפוש
                closeSearch();
            }
        }

        function closeSearch() {
            const searchBar = document.getElementById('searchBar');
            const navMenu = document.querySelector('.nav-menu');
            const searchIcon = document.querySelector('.search-icon');
            
            searchBar.classList.remove('active');
            navMenu.classList.remove('search-open');
            searchIcon.classList.remove('active');
            searchBar.querySelector('input').value = '';
            hideSuggestions();
            isSearchOpen = false;
            selectedIndex = -1;
        }

        function showSuggestions(suggestions) {
            const suggestionsContainer = document.getElementById('searchSuggestions');
            suggestionsContainer.innerHTML = '';
            
            if (suggestions.length === 0) {
                suggestionsContainer.style.display = 'none';
                return;
            }
            
            suggestions.forEach((suggestion, index) => {
                const div = document.createElement('div');
                div.className = 'search-suggestion';
                div.innerHTML = `
                    <div style="font-weight: bold; color: #B8860B;">${suggestion.text}</div>
                    <div style="font-size: 12px; color: #8B7355; margin-top: 2px;">${suggestion.category}</div>
                `;
                div.onclick = () => selectSuggestion(suggestion);
                div.onmouseenter = () => highlightSuggestion(index);
                suggestionsContainer.appendChild(div);
            });
            
            suggestionsContainer.classList.add('show');
            suggestionsContainer.style.display = 'block';
        }

        function hideSuggestions() {
            const suggestionsContainer = document.getElementById('searchSuggestions');
            suggestionsContainer.classList.remove('show');
            suggestionsContainer.style.display = 'none';
            selectedIndex = -1;
        }

        function highlightSuggestion(index) {
            const suggestions = document.querySelectorAll('.search-suggestion');
            suggestions.forEach((suggestion, i) => {
                suggestion.classList.toggle('highlighted', i === index);
            });
            selectedIndex = index;
        }

        function selectSuggestion(suggestion) {
            showPage(suggestion.pageId);
            closeSearch();
        }

        function handleSearch(event) {
            const searchTerm = event.target.value.toLowerCase().trim();
            
            if (searchTerm.length < 1) {
                hideSuggestions();
                return;
            }
            
            // חיפוש התאמות
            const matches = searchKeywords.filter(item => 
                item.text.toLowerCase().includes(searchTerm) || 
                searchTerm.includes(item.text.toLowerCase())
            );
            
            currentSuggestions = matches;
            showSuggestions(matches);
        }

        function handleKeyDown(event) {
            if (!isSearchOpen) return;
            
            const suggestions = document.querySelectorAll('.search-suggestion');
            
            switch(event.key) {
                case 'ArrowDown':
                    event.preventDefault();
                    selectedIndex = Math.min(selectedIndex + 1, suggestions.length - 1);
                    highlightSuggestion(selectedIndex);
                    break;
                    
                case 'ArrowUp':
                    event.preventDefault();
                    selectedIndex = Math.max(selectedIndex - 1, -1);
                    if (selectedIndex === -1) {
                        suggestions.forEach(s => s.classList.remove('highlighted'));
                    } else {
                        highlightSuggestion(selectedIndex);
                    }
                    break;
                    
                case 'Enter':
                    event.preventDefault();
                    if (selectedIndex >= 0 && currentSuggestions[selectedIndex]) {
                        selectSuggestion(currentSuggestions[selectedIndex]);
                    }
                    break;
                    
                case 'Escape':
                    event.preventDefault();
                    closeSearch();
                    break;
            }
        }

        // סגירת החיפוש בלחיצה מחוץ לשדה
        document.addEventListener('click', function(event) {
            const searchBar = document.getElementById('searchBar');
            const searchIcon = document.querySelector('.search-icon');
            
            if (isSearchOpen && !searchBar.contains(event.target) && !searchIcon.contains(event.target)) {
                closeSearch();
            }
        });

        // מצגת תמונות עם אפקט דחיפה מימין לשמאל
        function initSlideshow() {
            const slides = document.querySelectorAll('.slide');
            let currentSlide = 0;
            
            // הסתרת כל התמונות
            slides.forEach(slide => {
                slide.classList.remove('active', 'prev', 'next');
            });
            
            // הצגת התמונה הראשונה
            if (slides.length > 0) {
                slides[0].classList.add('active');
            }
            
            // הכנת התמונה הבאה
            if (slides.length > 1) {
                slides[1].classList.add('next');
            }
            
            function showNextSlide() {
                if (slides.length <= 1) return;
                
                // התמונה הנוכחית הופכת ל-prev (נדחפת ימינה)
                slides[currentSlide].classList.remove('active');
                slides[currentSlide].classList.add('prev');
                
                // מעבר לתמונה הבאה
                currentSlide = (currentSlide + 1) % slides.length;
                
                // התמונה הבאה נכנסת למרכז
                slides[currentSlide].classList.remove('next');
                slides[currentSlide].classList.add('active');
                
                // הכנת התמונה הבאה אחרי הבאה
                const nextIndex = (currentSlide + 1) % slides.length;
                slides.forEach(slide => slide.classList.remove('next'));
                if (nextIndex !== currentSlide) {
                    slides[nextIndex].classList.add('next');
                }
                
                // הסרת prev מהתמונה הקודמת אחרי האנימציה
                setTimeout(() => {
                    slides.forEach(slide => slide.classList.remove('prev'));
                }, 600);
            }
            
            // הפעלת המצגת כל 4 שניות
            setInterval(showNextSlide, 4000);
        }

        // מניעת חזרה אחורה על ידי זעזועים של שני האצבעות במשטח העכבר
        document.addEventListener('wheel', function (e) {
            // בודק אם זה זעזוע של שני האצבעות (pinch gesture)
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault(); // מונע את הפעולה הרגילה
                return false;
            }
        }, { passive: false });

        // מניעת חזרה אחורה על ידי זעזועים נוספים
        document.addEventListener('gesturestart', function (e) {
            e.preventDefault(); // מונע את הפעולה הרגילה
            return false;
        });

        document.addEventListener('gesturechange', function (e) {
            e.preventDefault(); // מונע את הפעולה הרגילה
            return false;
        });

        document.addEventListener('gestureend', function (e) {
            e.preventDefault(); // מונע את הפעולה הרגילה
            return false;
        });

        // מניעת חזרה אחורה על ידי זעזועים של שני האצבעות (swipe back)
        let swipeStartX = 0;
        let swipeStartY = 0;
        let swipeEndX = 0;
        let swipeEndY = 0;

        document.addEventListener('touchstart', function (e) {
            swipeStartX = e.touches[0].clientX;
            swipeStartY = e.touches[0].clientY;
        });

        document.addEventListener('touchend', function (e) {
            swipeEndX = e.changedTouches[0].clientX;
            swipeEndY = e.changedTouches[0].clientY;
            
            const deltaX = swipeEndX - swipeStartX;
            const deltaY = swipeEndY - swipeStartY;
            
            // בודק אם זה זעזוע ימינה (חזרה אחורה)
            if (deltaX > 50 && Math.abs(deltaY) < 100) {
                e.preventDefault(); // מונע את הפעולה הרגילה
                return false;
            }
        });

        // מניעת חזרה אחורה על ידי מקש Backspace
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Backspace' && !e.target.matches('input, textarea')) {
                e.preventDefault(); // מונע את הפעולה הרגילה
                return false;
            }
        });

        // מניעת חזרה אחורה על ידי מקש Alt+Left
        document.addEventListener('keydown', function (e) {
            if (e.altKey && e.key === 'ArrowLeft') {
                e.preventDefault(); // מונע את הפעולה הרגילה
                return false;
            }
        });

        // טיפול במקש F5 (רענון) - מאפשר רענון ומקפיץ לתחילת העמוד
        document.addEventListener('keydown', function (e) {
            if (e.key === 'F5' || (e.ctrlKey && e.key === 'r')) {
                // מקפיץ לתחילת העמוד לפני הרענון
                scrollToTop();
                // מאפשר את הרענון הרגיל
                setTimeout(() => {
                    window.location.reload();
                }, 100);
            }
        });




        // Sticky Parallax Effect אמיתי - הסרטון עוצר בריבוע הלבן
        window.addEventListener('scroll', () => {
            const videoCard = document.getElementById('video-card');
            const videoParallax = document.getElementById('video-parallax');
            const mainCard = document.querySelector('div[style*="background-color: #F5F5DC"]');
            const whiteContainer = document.querySelector('div[style*="background-color: #f8f9fa"]');
            
            if (videoCard && videoParallax && mainCard && whiteContainer) {
                const cardRect = mainCard.getBoundingClientRect();
                const whiteRect = whiteContainer.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                const cardHeight = cardRect.height;
                
                // אם הכרטיסיה נמצאת במסך
                if (cardRect.top < viewportHeight && cardRect.bottom > 0) {
                    // המסגרת נדבקת למסך
                    videoCard.style.position = 'sticky';
                    videoCard.style.top = '0px';
                    
                    // חישוב התזוזה האמיתית של Sticky Parallax
                    const scrollStart = cardRect.top;
                    
                    let moveY = 0;
                    
                    // רק כשהכרטיסיה התחילה להיעלם מהמסך
                    if (scrollStart <= 0) {
                        // חישוב התקדמות הגלילה בתוך הכרטיסיה
                        const scrollProgress = Math.abs(scrollStart) / cardHeight;
                        // הסרטון יורד עד תחילת הריבוע הלבן
                        const maxMove = cardHeight - viewportHeight; // התנועה המקסימלית עד סוף הכרטיסיה
                        moveY = Math.min(scrollProgress * maxMove, maxMove);
                        
                        // הגבלה נוספת - הסרטון לא יעבור את תחילת הריבוע הלבן
                        const distanceToWhite = whiteRect.top - cardRect.bottom;
                        if (distanceToWhite < 0) {
                            moveY = Math.min(moveY, Math.abs(distanceToWhite));
                        }
                    }
                    
                    // המסגרת והסרטון זזים יחד עד תחילת הריבוע הלבן
                    videoCard.style.transform = `translateY(${moveY}px)`;
                    videoCard.style.transition = 'none';
                    
                    videoParallax.style.transform = `translate(-50%, -50%) translateY(${moveY}px)`;
                    videoParallax.style.transition = 'none';
                } else {
                    // איפוס כשהכרטיסיה לא במסך
                    videoCard.style.position = 'relative';
                    videoCard.style.top = 'auto';
                    videoCard.style.transform = 'translateY(0px)';
                    videoParallax.style.transform = 'translate(-50%, -50%) translateY(0px)';
                }
            }
        });

        document.addEventListener('keyup', function (e) {
            if (e.key === 'PrintScreen') {
                navigator.clipboard.writeText('');
            }
        });

        // אנימציה לפי גלילה לכרטיסיות ראשי האיגוד
        const leaderCards = document.querySelectorAll('.full-width-leader-card');
        
        const observerOptions = {
            threshold: 0.2, // האנימציה תתחיל כש-20% מהכרטיסיה נכנסת לתצוגה
            rootMargin: '0px'
        };
        
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // הוספת delay קטן לכל כרטיסיה כדי ליצור אפקט של רצף
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, index * 150); // 150ms delay בין כל כרטיסיה
                    // מפסיקים לעקוב אחרי הכרטיסיה אחרי שהאנימציה הופעלה
                    cardObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // התחלת מעקב אחרי כל הכרטיסיות
        leaderCards.forEach(card => {
            cardObserver.observe(card);
        });

    </script>


</body>

</html>
