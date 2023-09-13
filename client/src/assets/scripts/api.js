const playList = document.getElementById("playList");
const songs = document.getElementById("songs");
const audioPlayer = document.getElementById("audioPlayer");
const songPlaying = document.querySelector("#songPlaying");
const playlistDescription = document.querySelector(".playlist-description");
const shuffleButton = document.getElementById("shuffleButton");

const API_KEY = "64MvqqPii4fLLgdt";
let orderList = [];
let currentSongIndex = 0;
const headers = {
  headers: new Headers({
    "X-Auth": `${API_KEY}`,
  }),
};

// GET all playlists in database and append to sidebar

fetch(
  "https://apidev.customerology.com/v1/Multimedia/Audio/listPlaylists",
  headers
)
  .then((response) => response.json())
  .then((data) => {
    playListSongs = data;
    data.forEach((playlist) => {
      const { id, title, description } = playlist;
      const button = document.createElement("button");
      button.setAttribute("data-id", id);
      button.setAttribute("data-description", description);
      button.textContent = title;
      playList.append(button);
      button.addEventListener("click", handlePlaylist);
    });
  });

// GET songs from selected playlist and append to songs conatiner

const handlePlaylist = (e) => {
  songs.innerHTML = "";
  const id = e.target.dataset.id;
  playlistDescription.innerHTML = `${e.target.dataset.description}:`;
  fetch(
    `https://apidev.customerology.com/v1/Multimedia/Audio/Playlist/${id}`,
    headers
  )
    .then((response) => response.json())
    .then((data) => {
      songList = data.audioFiles; // Store the song list
      songList.forEach((song, index) => {
        const songItem = document.createElement("div");
        const songTitle = document.createElement("h2");
        const audio = document.createElement("audio");
        const { title, artists, album, url_AudioFile } = song;
        songTitle.innerHTML = `<b class="number">${
          index + 1
        }</b> ${title} by ${artists}`;
        songItem.classList.add("songItem");
        audio.setAttribute("controls", "");
        songItem.setAttribute("data-title", title);
        songItem.setAttribute("data-artist", title);
        songItem.setAttribute("data-source", url_AudioFile);
        songItem.append(songTitle);
        songs.append(songItem);
        songItem.addEventListener("click", playSong);
      });
    });
};

// GET all songs from database and store in jQuery autocomplete

fetch(
  "https://apidev.customerology.com/v1/Multimedia/Audio/Tracks/list?limit=100",
  headers
)
  .then((response) => response.json())
  .then((data) => {
    const songs = data;
    console.log(songs);
    $("#searchBar").autocomplete({
      source: songs.map((song) => song.title),
      select: function (event, ui) {
        const selectedSongName = ui.item.value;
        const selectedSong = songs.find(
          (song) => song.title.toLowerCase() === selectedSongName.toLowerCase()
        );
        playAutoSong(selectedSongName, selectedSong.url_AudioFile);
      },
    });
  });

// GRAB the indexes of current and previous songs

const playSong = (e) => {
  const clickedSongIndex = Array.from(songs.children).indexOf(e.currentTarget);
  const previousSongItem = songs.children[currentSongIndex];
  currentSongIndex = clickedSongIndex;
  audioPlayer.src = e.currentTarget.dataset.source;
  audioPlayer.play();
  songPlaying.textContent = e.currentTarget.dataset.title;
  previousSongItem.classList.remove("active");
  e.currentTarget.classList.add("active");
  audioPlayer.addEventListener("ended", playNextSong);
};

const playNextSong = () => {
  currentSongIndex++;
  if (currentSongIndex >= songList.length) {
    currentSongIndex = 0;
  }
  const nextSongItem = songs.children[currentSongIndex];
  const songTitle = nextSongItem.dataset.title;
  const songSource = nextSongItem.dataset.source;
  audioPlayer.src = songSource;
  audioPlayer.play();
  songPlaying.textContent = songTitle;
  Array.from(songs.children).forEach((songItem) => {
    if (songItem !== nextSongItem) {
      songItem.classList.remove("active");
    }
  });
  nextSongItem.classList.add("active");
};

const playAutoSong = (songTitle, songSource) => {
  audioPlayer.src = songSource;
  audioPlayer.play();
  songPlaying.textContent = songTitle;
};