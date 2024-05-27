// script.js
document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio');
    const playPauseButton = document.getElementById('play-pause');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const songList = document.getElementById('song-list');
    const songItems = songList.getElementsByTagName('li');
    const coverImage = document.getElementById('cover');
    const songTitle = document.getElementById('song-title');
    const artistName = document.getElementById('artist-name');

    let currentSongIndex = 0;
    let isPlaying = false;

    const loadSong = (index) => {
        const song = songItems[index];
        const src = song.getAttribute('data-src');
        const cover = song.getAttribute('data-cover');
        const title = song.getAttribute('data-title');
        const artist = song.getAttribute('data-artist');
        
        audio.src = src;
        coverImage.src = cover;
        songTitle.textContent = title;
        artistName.textContent = artist;

        // Update active song
        Array.from(songItems).forEach(item => item.classList.remove('active'));
        song.classList.add('active');
    };

    const playPause = () => {
        if (isPlaying) {
            audio.pause();
            playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            audio.play();
            playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    };

    playPauseButton.addEventListener('click', playPause);

    prevButton.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex - 1 + songItems.length) % songItems.length;
        loadSong(currentSongIndex);
        if (isPlaying) {
            audio.play();
        }
    });

    nextButton.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex + 1) % songItems.length;
        loadSong(currentSongIndex);
        if (isPlaying) {
            audio.play();
        }
    });

    Array.from(songItems).forEach((item, index) => {
        item.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong(currentSongIndex);
            if (isPlaying) {
                audio.play();
            }
            playPause();
        });
    });

    // Initial load
    loadSong(currentSongIndex);
});
