window.onload = function() {

  let observer = new MutationObserver(mutations => {
    for(let mutation of mutations) {
      if (mutation.addedNodes[0] && mutation.addedNodes[0].firstChild && mutation.addedNodes[0].firstChild.nodeValue) {
        for(let addedNode of mutation.addedNodes) {
          if (addedNode.classList.contains('selected')) {
            const move = addedNode.firstChild.data

            const movesAudios = []
            if (move === 'O-O') {
              movesAudios.push(chrome.runtime.getURL(`audios/O-OAudio.mp3`))
            } else if (move === 'O-O-O') {
              movesAudios.push(chrome.runtime.getURL(`audios/O-O-OAudio.mp3`))
            } else {
              for (const c of move) {
                let moveLetter
                if (c === 'C') {
                  moveLetter = 'cavalo'
                } else if (c === 'B') {
                  moveLetter = 'bispo'
                } else if (c === 'D') {
                  moveLetter = 'dama'
                } else {
                  moveLetter = c
                }
                movesAudios.push(chrome.runtime.getURL(`audios/${moveLetter}Audio.mp3`))
              }
            }

            const playSequence = (sounds) => {

              const playNextSound = (audio) => {
                audio.src = sounds[currentSoundIndex++];
                audio.currentTime = 0;
                audio.play();
              };
            
              let currentSoundIndex = 0;
              if (sounds.length) {  
                const audio = new Audio();
                playNextSound(audio);
            
                audio.addEventListener('ended', () => {
                  if (currentSoundIndex < sounds.length) {
                    playNextSound(audio);
                  }
                });
              }
            }
            
            playSequence(movesAudios);
            
          }
        }
      }
     }
  })
  observer.observe(document, { childList: true, subtree: true })
}
