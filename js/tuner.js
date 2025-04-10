const notedis = document.querySelectorAll("main ul li");

notedis.forEach((note) => {
  note.onclick = () => {
    notedis.forEach((note) => {
      note.className = "";
    });
    note.classList.add("active");
    const notes = {
      E: 82.41,
      A: 110.0,
      D: 146.83,
      G: 196.0,
      B: 246.94,
      e: 329.63,
    };

    let audioContext;
    let analyser;
    let dataArray;
    tuneString();
    async function tuneString() {
      const noteName = note.textContent;
      const targetFreq = notes[noteName];

      if (!targetFreq) {
        alert("Unknown note!");
        return;
      }

      if (!audioContext) {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createMediaStreamSource(stream);
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;
        source.connect(analyser);
        dataArray = new Float32Array(analyser.fftSize);
      }

      listenUntilInTune(noteName, targetFreq);
    }

    function isInTune(detectedFreq, targetFreq, tolerance = 1.5) {
      return Math.abs(detectedFreq - targetFreq) <= tolerance;
    }

    function autoCorrelate(buf, sampleRate) {
      let SIZE = buf.length;
      let rms = 0;

      for (let i = 0; i < SIZE; i++) {
        rms += buf[i] * buf[i];
      }
      rms = Math.sqrt(rms / SIZE);
      if (rms < 0.01) return -1;

      let r1 = 0,
        r2 = SIZE - 1,
        thres = 0.2;
      for (let i = 0; i < SIZE / 2; i++) {
        if (Math.abs(buf[i]) < thres) {
          r1 = i;
          break;
        }
      }
      for (let i = 1; i < SIZE / 2; i++) {
        if (Math.abs(buf[SIZE - i]) < thres) {
          r2 = SIZE - i;
          break;
        }
      }

      buf = buf.slice(r1, r2);
      SIZE = buf.length;

      let c = new Array(SIZE).fill(0);
      for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE - i; j++) {
          c[i] = c[i] + buf[j] * buf[j + i];
        }
      }

      let d = 0;
      while (c[d] > c[d + 1]) d++;
      let maxval = -1,
        maxpos = -1;
      for (let i = d; i < SIZE; i++) {
        if (c[i] > maxval) {
          maxval = c[i];
          maxpos = i;
        }
      }

      let T0 = maxpos;

      return sampleRate / T0;
    }

    function listenUntilInTune(noteName, targetFreq) {
      function checkPitch() {
        analyser.getFloatTimeDomainData(dataArray);
        const pitch = autoCorrelate(dataArray, audioContext.sampleRate);
        if (pitch !== -1) {
          const inTune = isInTune(pitch, targetFreq);

          if (!inTune) {
            note.classList.add("detuned");
          } else {
            return;
          } // stop checking if in tune
        } else {
          return;
        }

        requestAnimationFrame(checkPitch); // loop until in tune
      }

      checkPitch();
    }
  };
});
