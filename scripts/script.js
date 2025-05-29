
let notifSoundReady = false;
// --- DATA ---
const medias = [
    {
        img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80",
        profile: "modprofil.png",
        name: "Camille",
        badge: true,
        time: "2h",
        likes: 128,
        comments: 34,
        locked: true,
        type: "image"
    },
    {
        img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&q=80",
        profile: "modprofil.png",
        name: "Camille",
        badge: true,
        time: "2h",
        likes: 98,
        comments: 21,
        locked: true,
        type: "image"
    },
    {
        img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400&q=80",
        profile: "modprofil.png",
        name: "Camille",
        badge: true,
        time: "3h",
        likes: 67,
        comments: 12,
        locked: true,
        type: "image"
    },
    {
        img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&q=80",
        profile: "modprofil.png",
        name: "Camille",
        badge: true,
        time: "4h",
        likes: 150,
        comments: 40,
        locked: true,
        type: "image"
    },
    {
        img: "https://images.unsplash.com/photo-1465101178521-c1a9136a3fdc?w=400&q=80",
        profile: "modprofil.png",
        name: "Camille",
        badge: true,
        time: "5h",
        likes: 87,
        comments: 19,
        locked: true,
        type: "image"
    },
    {
        img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&q=80",
        profile: "modprofil.png",
        name: "Camille",
        badge: true,
        time: "6h",
        likes: 110,
        comments: 27,
        locked: true,
        type: "image"
    },
    {
        img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&q=80",
        profile: "modprofil.png",
        name: "Camille",
        badge: true,
        time: "7h",
        likes: 75,
        comments: 15,
        locked: true,
        type: "image"
    },
    {
        img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80",
        profile: "modprofil.png",
        name: "Camille",
        badge: true,
        time: "8h",
        likes: 133,
        comments: 29,
        locked: true,
        type: "image"
    },
    {
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
        profile: "modprofil.png",
        name: "Camille",
        badge: true,
        time: "9h",
        likes: 200,
        comments: 54,
        locked: true,
        type: "video"
    },
    {
        video: "https://www.w3schools.com/html/movie.mp4",
        profile: "modprofil.png",
        name: "Camille",
        badge: true,
        time: "10h",
        likes: 180,
        comments: 44,
        locked: true,
        type: "video"
    }
];

const avis = [
    {
        avatar: "https://randomuser.me/api/portraits/men/10.jpg",
        name: "Julien",
        stars: 4,
        time: "2h",
        text: "Très réactive et sympathique, je recommande !"
    },
    {
        avatar: "https://randomuser.me/api/portraits/men/12.jpg",
        name: "Adriano",
        stars: 5,
        time: "2 min",
        text: "Woow! Très contenus dingue et super hot!"
    },
    {
        avatar: "https://randomuser.me/api/portraits/men/13.jpg",
        name: "Emeraude",
        stars: 5,
        time: "now",
        text: "Putain j'en veux plus +"
    },
];

// --- FLIP CARD ---
const flipCard = document.getElementById('flipCard');
const flipAudio = new Audio('goutte.mp3'); // Mets ton fichier ici

whenReady(() => {
    
    const seuil = 730; // valeur en pixels à dépasser

    window.addEventListener('scroll', () => {
        if (window.scrollY > seuil) {
            // Action à faire une fois le seuil dépassé
            // console.log('Scroll > 300px',window.scrollY);
            // Par exemple, ajouter une classe à un élément :
            if (!Qs("gift-airdrop").containsClass('sticked')) {
                Qs("gift-airdrop").addClass('sticked');
            }
        } else {
            // En dessous du seuil, on peut retirer la classe
            Qs("gift-airdrop").removeClass('sticked');
        }
    });

    loadStyle(document.body)
    let tlmodal = null
    
    tlmodal = Qs("#tl-pop").cloneNode(true)
    
    
    async function closeModal(modal) {
        modal.replaceClass("mounted","unmounted");
        await futureBuilder(300)
        modal.removeClass('active')
    }

    async function tlpop () {
        let modl = Qs("#tl-pop")
        if (!modl) {
            modl = tlmodal
            bodyAppend(modl)
        }
        if (!modl.containsClass("active")){
            modl.addClass('active');
            modl.addClass('mounted');
        }
        else {
            await closeModal(modl);
        }
    }
    setTimeout(() => {
        tlpop();
    }, 7000);
    
    Qst("tl-touchable-icon","click",tlpop)
    Qs("#tl-pop","click",async (e,ev) => {
        if (ev.target === e) await tlpop();
    })

    // --- SPARKLE EFFECT ---
    async function createPgSparkle(target,n) {
        for (let x=0; x < n; x++) {
            const sparkle = document.createElement('span');
            sparkle.className = 'sparkle minus';
            sparkle.textContent = Math.random() > 0.5 ? '✦' : '✧';
            sparkle.style.top = `${Math.random() * 5}%`;
            sparkle.style.left = `${Math.random() * 3 + 97}%`; // 97% à 100% sur l'axe horizontal
            target.appendChild(sparkle);
            sparkle.style.opacity = '1';
            sparkle.style.animation = 'sparkle-move 0.7s linear';
            sparkle.addEventListener('animationend', () => {
                sparkle.remove();
            });
            await futureBuilder(200)
        }
    }
    
    // --- Logique du décompte et de la barre de régression ---
    const airdrop = document.getElementById('gift-airdrop');
    // const countdownElements = airdrop.querySelector('.countdown');
    
    // Définir le temps de l'offre en secondes (par exemple, 5 minutes)
    let countdownTime = 5 * 60; // 5 minutes en secondes
    let timeLeft = countdownTime; // Temps restant en secondes
    
    // Fonction pour commencer l'animation de la barre
    function startProgressBar() {
        const interval = setInterval(() => {
            QsForeach('.progress-bar',(progressBar) => {
                // Calculer le pourcentage de la barre
                const percentage = (timeLeft / countdownTime) * 100;
                
                // Mettre à jour la largeur de la barre en fonction du temps restant
                progressBar.style.width = `${percentage}%`;

                // Ajouter des étincelles à l'extrémité de la barre si moins de 10% de temps restant
                if (percentage > 0) {
                    progressBar.classList.add('sparkling');
                    createPgSparkle(progressBar,10); // Créer une étincelle à l'extrémité
                }
                
                // Si le temps est écoulé, arrêter le décompte
                if (timeLeft <= 0) {
                    clearInterval(interval);
                    progressBar.style.width = '0%'; // S'assurer que la barre est vide à 0%
                    progressBar.classList.remove('sparkling'); // Supprimer les étincelles à la fin
                    // setTimeout(() => {
                    //     airdrop.classList.toggle("mounted")
                    // }, 1000);
                }
            })
            
        }, 1000); // Met à jour toutes les secondes
    }

    // Fonction de mise à jour du compte à rebours
    function updateCountdown() {
        timeLeft--; // Réduire le temps restant
        if (timeLeft <= 0) {
            timeLeft=0;
        }
        QsForeach('.countdown',(countdownElement) => {
            countdownElement.textContent = formatTime(timeLeft);
            // Si le temps est écoulé, arrêter le compte à rebours
            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
            }
        });
    }

    // Fonction pour afficher le format du temps
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Lancer le décompte et la barre de régression
    let countdownInterval = setInterval(updateCountdown, 1000); // Met à jour le compte à rebours toutes les secondes

    // Lancer le décompte et la régression de la barre
    setTimeout(async () => {
        airdrop.classList.toggle("mounted")
        await futureBuilder(500)
        startProgressBar();
    }, 5000);
    // Function to move the airdrop element randomly
    // function moveAirdrop() {
    //     const screenWidth = window.innerWidth;
    //     const screenHeight = window.innerHeight;
    //     const x = Math.random() * (screenWidth - airdrop.offsetWidth);
    //     const y = Math.random() * (screenHeight - airdrop.offsetHeight);
    //     airdrop.style.left = `${x}px`;
    //     airdrop.style.top = `${y}px`;
    // }
    // Move the airdrop every 3 seconds
    // setInterval(moveAirdrop, 5000);
    
    
    // === RENDER NOTIF ===

    // Notif builder

    const firstNames = [
        "Mickael", "Dylan", "Jordan", "Lucas", "Tom", "Benji", "Maxime", "Kev", "Alex",
        "Leo", "Nathan", "Enzo", "Theo", "Hugo", "Noah", "Mathis", "Louis", "Gabriel", "Raphael",
        "Axel", "Nolan", "Ethan", "Timéo", "Sacha", "Ilyes", "Ilian", "Mael", "Liam", "Yanis",
        "Aaron", "Adam", "Clément", "Paul", "Rayan", "Amine", "Kylian", "Bastien", "Thibault", "Jules",
        "Tristan", "Antoine", "Mehdi", "Samy", "Corentin", "Florian", "Loïc", "Valentin", "Gaëtan", "Adrien",
        "Quentin", "Matteo", "Youssef", "Reda", "Nassim", "Tidiane", "Zakaria", "Hamza", "Taha", "Bilal",
        "Ismael", "Nael", "Walid", "Sofiane", "Lounis", "Nino", "Elyes", "Ilies", "Imran", "Ali",
        "Owen", "Johan", "Noé", "Tony", "Bilel", "Karim", "Loris", "Anis", "Rayen", "Rayane",
        "Saïd", "Farid", "Yanisou", "Malik", "Samir", "Hakim", "Rachid", "Titouan", "Kais", "Souleymane"
    ];

    const suffixes = [
        "", "_", ".", "-", "x", "69", "75", "92", "33", "21", "973", "VIP", "Bdr", "Pro", "007", "Xx", "du93", "34", "Off",
        "king", "Qc", "bg", "Legend", "killer", "gamer", "xXx", "dark", "light", "fire",
        "storm", "boss", "champ", "zz", "rx", "alpha", "beta", "omega", "lord", "dz",
        "sniper", "shot", "hard", "flex", "prodz", "gdz", "zerg", "sk8", "bike", "fast",
        "777", "420", "bzh", "idf", "beast", "tiger", "ninja", "saitama", "goku", "naruto",
        "sasuke", "uchiha", "vegeta", "binks", "one", "zero", "null", "random", "elite", "squad",
        "squad92", "street", "city", "urbn", "xpress", "wolf", "panth", "luffy", "mad", "crazy",
        "nxt", "neo", "v2", "rev", "fury", "rush"
    ];
    

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function generatePseudos(count) {
        const pseudoNames = new Set();
        
        while (pseudoNames.size < count) {
            const name = firstNames[Math.floor(Math.random() * firstNames.length)];
            const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
            const addNumber = Math.random() < 0.5;

            let pseudo = name + suffix;
            if (addNumber && isNaN(suffix)) {
                pseudo += getRandomInt(10, 99);
            }
            
            pseudoNames.add(pseudo);
        }
        
        return Array.from(pseudoNames);
    }
    
    // Exemple : générer 1000 pseudos
    const pseudoNames = generatePseudos(1000);
    
    
    function generateName() {
        return pseudoNames[Math.floor(Math.random() * pseudoNames.length)];
    }
    
    // Liste de messages aléatoires concrets
    const notifMessages = [
        `a gagné le Snapchat GRATUIT <img src="g015151j.gif" width="20" alt="" srcset=""> de Camille`,
        "a rejoint la room de Camille 👥",
        // "invitation confirmée par Camille ✅",
        // "a débloqué plus de contenu privé de Camille 🔓",
        // "a débloqué le contenu privé 🔓",
        // "vient d’envoyer un pourboire 💸",
        `regarde la vidéo privée de Camille <img src="hot2561.gif" width="20" alt="" srcset="">`,
        "a laissé un commentaire 😍",
        "a envoyé un message privé 💌",
        "s’est abonné pour 1 mois ⭐",
        // "a commandé une vidéo personnalisée 📹"
    ];
    
    function builNotif(name="Unknow",message=`a gagné le Snapchat GRATUIT <img src="g015151j.gif" width="20" alt="" srcset=""> de Camille`) {
        const notifier = createdElement("div",{addclass: "tl-notifier"});
        let notifier_content =  `
            <div class="p-2 notifier-container">
                <div class="fcol gap-2 p-1">
                    <div class="row ai-center gap-5 jc-between">
                        <div class="col">
                            <div class="d-flex ai-center gap-2">
                                <div class="pulse"></div>
                                <h3 class="notifier-title">${name}</h3>
                            </div>
                        </div>
                        <div class="ph-2">
                            <small class="notifier-timing no-wrap">
                                à l'instant
                            </small>
                        </div>
                    </div>
                    <div class="row notifier-content ph-2 ai-center gap-1">
                        ${message}
                    </div>
                </div>
                </div>
                `;
        notifier.htmlThis(notifier_content);
        return notifier;
    }
    
    let notifwrapper = Qs('tl-notifier-wrapper');
    
    function generateRandomNotif () {
        let thename = generateName();
        let message = notifMessages[Math.floor(Math.random() * notifMessages.length)];
        const notif = builNotif(thename, message);
        notifwrapper.appendChild(notif);
        
        void notif.offsetWidth; // force repaint pour déclencher l’animation
        notif.classList.toggle('mounted')
        const audio = new Audio('notification.mp3'); // Remplace par l'URL du son
        if (notifSoundReady) {
            audio.play();
        }
        setTimeout(() => {
            notif.classList.toggle('mounted')
            notif.addEventListener('transitionend', function (ev) {
                notif.remove()
            },{once: true})
        }, 8000);
    }
    
    function startNotifLoop() {
        const delay = Math.floor(Math.random() * (30000 - 10000 + 1)) + 10000;
        setTimeout(() => {
            generateRandomNotif();
            startNotifLoop();
        }, delay);
    }
    
    
    // flipCard.addEventListener('mouseenter', () => {
    //     flipCard.classList.toggle('flipped');
    //     flipAudio.currentTime = 0;
    //     if (notifSoundReady) {
    //         // flipAudio.play();
    //     }
        
    // });
    // flipCard.addEventListener('mouseleave', () => {
    //     // flipCard.classList.toggle('flipped');
    // });

    // --- SPARKLE EFFECT ---
    let sparkleInterval = null;

    function createSparkle(target) {
        target.styleThis('position',"relative")
        const sparkle = document.createElement('span');
        sparkle.className = 'sparkle';
        sparkle.textContent = Math.random() > 0.5 ? '✦' : '✧';
        sparkle.style.top = `${Math.random() * 90}%`;
        sparkle.style.left = `${Math.random() * 90}%`;
        target.appendChild(sparkle);
        sparkle.style.opacity = '1';
        sparkle.style.animation = 'sparkle-move 0.7s linear';
        sparkle.addEventListener('animationend', () => {
            sparkle.remove();
        });
    }

    QsForeach('.mainBtn',(mainBtn) => {
        // alert("zzf")
        mainBtn.addEventListener('mouseenter', () => {
            if (sparkleInterval) return;
            sparkleInterval = setInterval(() => {
                createSparkle(mainBtn);
            }, 120);
        });
        mainBtn.addEventListener('mouseleave', () => {
            clearInterval(sparkleInterval);
            sparkleInterval = null;
        });
    });
    // --- ONGLET ---
    document.getElementById('tabContent').onclick = function() {
        this.classList.add('active');
        document.getElementById('tabAvis').classList.remove('active');
        document.getElementById('contentTab').style.display = '';
        document.getElementById('avisTab').style.display = 'none';
    };
    document.getElementById('tabAvis').onclick = function() {
        this.classList.add('active');
        document.getElementById('tabContent').classList.remove('active');
        document.getElementById('contentTab').style.display = 'none';
        document.getElementById('avisTab').style.display = '';
    };


    // --- RENDER MEDIA ---
    const mediaGrid = document.getElementById('mediaGrid');
    mediaGrid.innerHTML = medias.map(media => `
        <div class="media-card">
            <div class="media-locked-media">
                ${
                    media.type === "video"
                    ? `<video src="${media.video}" autoplay loop muted playsinline></video>`
                    : `<img src="${media.img}" alt="Aperçu">`
                }
                <div class="media-locked-overlay">
                    <span class="unlock-bubble">
                        <i class='bx bx-lock-open gradient-icon'></i>
                    </span>
                    Débloque mon contenu pour voir
                    <br>
                    <i class='bx bx-hide eye-locked-icon'></i>
                </div>
            </div>
            <div class="media-profile-row">
                <div class="media-profile-main">
                    <img src="${media.profile}" alt="Profil" class="media-avatar">
                    <div class="media-profile-info">
                        <span class="media-name">${media.name}</span>
                        ${media.badge ? `<span class="media-badge"><i class='bx bxs-badge-check gradient-icon-accent'></i></span>` : ""}
                    </div>
                </div>
                <span class="media-time">il y a ${media.time}</span>
            </div>
            <div class="media-stats">
                <span>
                    <i class='bx bx-heart gradient-icon-accent'></i> ${media.likes}
                </span>
                <span>
                    <i class='bx bx-message-rounded gradient-icon-accent'></i> ${media.comments}
                </span>
            </div>
        </div>
    `).join('');

    // --- RENDER AVIS ---
    const avisList = document.getElementById('avisList');
    avisList.innerHTML = avis.map(a => `
        <div class="avis-card">
            <div class="avis-row">
                <img src="${a.avatar}" alt="Témoin" class="avis-avatar">
                <div class="avis-col">
                    <span class="avis-name">${a.name}</span>
                    <div class="avis-stars-row">
                        <div class="stars">
                            ${'<span><i class="bx bxs-star rate-star"></i></span>'.repeat(a.stars)+'<span><i class="bx bx-star rate-star"></i></span>'.repeat(5-a.stars)}
                        </div>
                        <span class="avis-time">${a.time !== "now" ? "il y a "+a.time: "à l'instant"}</span>
                    </div>
                </div>
            </div>
            <div class="avis-text">${a.text}</div>
        </div>
    `).join('');
    
    setTimeout(() => {
        Qs(".media-card,.show-more","click",async () => {
            await tlpop();
        })
    }, 1000);

    Qst("*[tl-href]","click",function (e,ev) {
        const destination = e.getTlaction("href");
        window.location.href = destination;
    })
    
    document.addEventListener('click', () => {
        if (!notifSoundReady) {
            notifSoundReady = true;
        }
    });

    startNotifLoop();

})
