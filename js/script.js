// Elementos DOM
const songList = document.getElementById('song-list');
const lyricsContent = document.getElementById('lyrics-content');
const welcomeMessage = document.getElementById('welcome-message');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const lyricsText = document.getElementById('lyrics-text');
const searchInput = document.getElementById('search-input');
const toggleSidebarBtn = document.getElementById('toggle-sidebar');
const sidebar = document.getElementById('sidebar');
const mainContent = document.querySelector('.main-content');

// Adicionar botão de toggle para mobile
const mobileToggleBtn = document.createElement('button');
mobileToggleBtn.className = 'mobile-toggle';
mobileToggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
mobileToggleBtn.style.display = 'none';
document.body.appendChild(mobileToggleBtn);

// Função para preencher a lista de músicas
function populateSongList(songs) {
    songList.innerHTML = '';

    if (songs.length === 0) {
        const noResults = document.createElement('li');
        noResults.className = 'song-item';
        noResults.innerHTML = '<div class="song-title">Nenhuma música encontrada</div>';
        songList.appendChild(noResults);
        return;
    }

    songs.forEach(song => {
        const li = document.createElement('li');
        li.className = 'song-item';
        li.dataset.id = song.id;
        li.innerHTML = `
            <div class="song-title">${song.title}</div>
            <div class="song-artist">${song.artist}</div>
        `;

        li.addEventListener('click', () => {
            displayLyrics(song);

            // Remover classe ativa de todos os itens
            document.querySelectorAll('.song-item').forEach(item => {
                item.classList.remove('active');
            });

            // Adicionar classe ativa ao item clicado
            li.classList.add('active');

            // Em dispositivos móveis, fechar a sidebar após selecionar uma música
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
                mainContent.classList.remove('sidebar-active');
                mobileToggleBtn.style.display = 'flex';
            }
        });

        songList.appendChild(li);
    });
}

// Função para exibir a letra da música
function displayLyrics(song) {
    welcomeMessage.style.display = 'none';
    lyricsContent.style.display = 'block';

    // Limpar conteúdo anterior
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    lyricsText.innerHTML = '';

    // Criar contêiner para botões e áudio
    const controlContainer = document.createElement('div');
    controlContainer.className = 'control-container';
    lyricsText.appendChild(controlContainer);

    // Botão de rolagem automática
    const autoScrollBtn = document.createElement('button');
    autoScrollBtn.textContent = '▶ Rolagem Automática';
    autoScrollBtn.className = 'auto-scroll-btn';

    let scrollInterval = null;

    autoScrollBtn.addEventListener('click', () => {
        if (scrollInterval) {
            clearInterval(scrollInterval);
            scrollInterval = null;
            autoScrollBtn.textContent = '▶ Rolagem Automática';
        } else {
            scrollInterval = setInterval(() => {
                window.scrollBy({ top: 0.5, behavior: 'smooth' });
            }, 60);
            autoScrollBtn.textContent = '⏸ Parar Rolagem';
        }
    });

    controlContainer.appendChild(autoScrollBtn);

    // Reproduzir áudio automaticamente
    const audioInfo = audioDatabase.find(audio => audio.id === song.id);
    if (audioInfo) {
        const audioElement = document.createElement('audio');
        audioElement.src = audioInfo.src;
        audioElement.controls = true;
        audioElement.autoplay = true;
        audioElement.style.display = 'block';
        audioElement.style.marginTop = '10px';
        controlContainer.appendChild(audioElement);

        audioElement.play().catch(() => {
            console.warn('Autoplay bloqueado. O usuário deve clicar em play.');
        });
    }

    // Inserir a letra
    const lyricsLines = song.lyrics.split('\n');
    lyricsLines.forEach(line => {
        const p = document.createElement('p');
        p.textContent = line;
        lyricsText.appendChild(p);
    });

    // Animação de entrada
    lyricsContent.style.opacity = 0;
    setTimeout(() => {
        lyricsContent.style.transition = 'opacity 0.5s ease';
        lyricsContent.style.opacity = 1;
    }, 10);
}

// Função de busca
function searchSongs(query) {
    if (!query) return songsDatabase;

    query = query.toLowerCase();
    return songsDatabase.filter(song =>
        song.title.toLowerCase().includes(query) ||
        song.artist.toLowerCase().includes(query)
    );
}

// Event listeners
searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
    const filteredSongs = searchSongs(query);
    populateSongList(filteredSongs);
});

toggleSidebarBtn.addEventListener('click', toggleSidebar);
mobileToggleBtn.addEventListener('click', toggleSidebar);

function toggleSidebar() {
    sidebar.classList.toggle('active');
    mainContent.classList.toggle('sidebar-active');

    mobileToggleBtn.style.display = sidebar.classList.contains('active') ? 'none' : 'flex';
}

function checkScreenSize() {
    if (window.innerWidth <= 768) {
        sidebar.classList.remove('active');
        mainContent.classList.remove('sidebar-active');
        mobileToggleBtn.style.display = 'flex';
    } else {
        sidebar.classList.remove('active');
        mainContent.classList.remove('sidebar-active');
        mobileToggleBtn.style.display = 'none';
    }
}

// Inicialização
window.addEventListener('load', () => {
    populateSongList(songsDatabase);
    checkScreenSize();
});

window.addEventListener('resize', checkScreenSize);
