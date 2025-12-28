
// bday.js — consolidated DOM handlers and fixes
document.addEventListener("DOMContentLoaded", () => {
  const btnMem = document.getElementById("scrollMemories");
  const memories = document.getElementById("memories");
  const letterBox = document.getElementById("letterBox");
  const letterContent = document.getElementById("letterContent");
  const musicBtn = document.getElementById("toggleMusic");
  const audio = document.getElementById("bg-music");
  let isPlaying = false;

  if (btnMem && memories) {
    btnMem.addEventListener("click", () => {
      memories.scrollIntoView({ behavior: "smooth" });
    });
  }

  if (letterBox && letterContent) {
    letterBox.addEventListener("click", () => {
  letterBox.style.display = "none";   // hide envelope
  letterContent.classList.add("open"); // open letter
});

    }

  if (musicBtn && audio) {
    // initialize button text according to audio state
    musicBtn.textContent = audio.paused ? "Play Music 🎵" : "Pause Music ⏸️";

    // If audio started muted for autoplay, unmute on first user gesture
    const handleFirstGesture = async () => {
      try {
        audio.muted = false;
        await audio.play();
        isPlaying = true;
        musicBtn.textContent = "Pause Music ⏸️";
      } catch (e) {
        console.log("Could not autoplay on gesture:", e);
      }
    };

    if (audio.muted) {
      document.addEventListener('click', handleFirstGesture, { once: true });
      document.addEventListener('touchstart', handleFirstGesture, { once: true });
    }

    musicBtn.addEventListener("click", async () => {
      try {
        if (audio.paused) {
          // ensure we unmute when user explicitly starts playback
          audio.muted = false;
          await audio.play();
          isPlaying = true;
          musicBtn.textContent = "Pause Music ⏸️";
        } else {
          audio.pause();
          isPlaying = false;
          musicBtn.textContent = "Play Music 🎵";
        }
      } catch (e) {
        console.log("Could not play audio:", e);
      }
    });

    // keep button text in sync with audio element state
    audio.addEventListener('play', () => musicBtn.textContent = "Pause Music ⏸️");
    audio.addEventListener('pause', () => musicBtn.textContent = "Play Music 🎵");
  }

  // Photo modal: open when clicking the birthday photo
  const photoFrame = document.querySelector('.photo-frame');
  const photoModal = document.getElementById('photoModal');
  const photoModalBackdrop = document.getElementById('photoModalBackdrop');
  const photoModalClose = document.getElementById('photoModalClose');
  const photoAudio = document.getElementById('photo-audio');
  const photoAudioToggle = document.getElementById('photoAudioToggle');

  function openPhotoModal() {
    if (!photoModal) return;
    photoModal.classList.add('open');
    photoModal.setAttribute('aria-hidden', 'false');
    // prevent background scroll
    document.body.style.overflow = 'hidden';
  }

  function closePhotoModal() {
    if (!photoModal) return;
    photoModal.classList.remove('open');
    photoModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (photoAudio && !photoAudio.paused) photoAudio.pause();
  }

  if (photoFrame) {
    photoFrame.addEventListener('click', () => openPhotoModal());
  }
  const photoHint = document.getElementById('photoHint');
  if (photoHint) photoHint.addEventListener('click', () => openPhotoModal());

  if (photoModalBackdrop) photoModalBackdrop.addEventListener('click', closePhotoModal);
  if (photoModalClose) photoModalClose.addEventListener('click', closePhotoModal);

  if (photoAudio && photoAudioToggle) {
    photoAudioToggle.addEventListener('click', async () => {
      try {
        if (photoAudio.paused) {
          await photoAudio.play();
          photoAudioToggle.textContent = 'Pause Message ⏸️';
        } else {
          photoAudio.pause();
          photoAudioToggle.textContent = 'Play Message 🎵';
        }
      } catch (e) {
        console.log('Photo audio error', e);
      }
    });

    // sync button text with audio events
    photoAudio.addEventListener('play', () => photoAudioToggle.textContent = 'Pause Message ⏸️');
    photoAudio.addEventListener('pause', () => photoAudioToggle.textContent = 'Play Message 🎵');
  }

  // Optional: small greeting alert
  setTimeout(() => {
    alert("Today is all about you. Happy birthday 💙");
  }, 1500);
});
