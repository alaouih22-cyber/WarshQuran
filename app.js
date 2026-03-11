<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quran Tajweed App</title>
    <style>
        body { margin: 0; background: #fdf6e3; font-family: sans-serif; overflow: hidden; }
        
        /* Contenitore Immagine */
        .page-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            width: 100vw;
            position: relative;
        }

        /* La tua immagine della Fatiha */
        #quran-img {
            max-height: 95%;
            max-width: 95%;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            border-radius: 5px;
        }

        /* Menu Inferiore Elegante */
        .bottom-nav {
            position: fixed;
            bottom: 0;
            width: 100%;
            background: rgba(44, 62, 80, 0.95);
            color: #d4af37; /* Oro */
            display: flex;
            justify-content: space-around;
            padding: 15px 0;
            border-top: 2px solid #d4af37;
        }

        .nav-item { cursor: pointer; text-align: center; font-weight: bold; }
        
        /* Messaggio di incoraggiamento */
        .status {
            position: absolute;
            top: 20px;
            background: rgba(255,255,255,0.8);
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 14px;
            color: #2c3e50;
        }
    </style>
</head>
<body>

    <div class="page-container">
        <div class="status">Anteprima Professionale</div>
        
        <img id="quran-img" src="https://easyquran.com/tajweed-warsh/warsh-001.png" alt="Sura Al-Fatiha">

        <div class="bottom-nav">
            <div class="nav-item">≡ فهرس (Indice)</div>
            <div class="nav-item">صفحة 1</div>
            <div class="nav-item">▶ استماع (Audio)</div>
        </div>
    </div>

</body>
</html>
