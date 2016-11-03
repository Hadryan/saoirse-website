const ScaleBar = {
  min: 5,
  max: 0,
  get: function (fromMin, fromMax, valueIn) {
    const toMax = ScaleBar.max;
    const toMin = ScaleBar.min;

    fromMin = (fromMax * 0.45);

    return ((toMax - toMin) * (valueIn - fromMin)) / (fromMax - fromMin) + toMin;
  }
};

let canvas
  , canvasContext
  , analyser
  , rafCall
  , bufferLength
  , frequencyData
  , circle
  ;

export default {
  props: ['audioElement'],
  methods: {
    startVisuals () {
      canvasContext.clearRect(0, 0, canvas.width, canvas.height);
      analyser.getByteFrequencyData(frequencyData);

      let frequencyWidth = window.devicePixelRatio
        , frequencyHeight = 0
        , x = 0
        , scales = []
        , fd = []
        ;

      const fdMin = Math.min.apply(Math, frequencyData);
      const fdMax = Math.max.apply(Math, frequencyData);

      for (let increment = 0; increment < bufferLength; increment++) {
        frequencyHeight = frequencyData[increment] * (canvas.height / 250);

        if (increment < 15) {
          scales.push(frequencyHeight / 50);
        }

        fd.push(frequencyData[increment]);

        frequencyHeight = ScaleBar.get(fdMin, fdMax, frequencyData[increment]);
        canvasContext.fillStyle = '#fff';

        let y = canvas.height - frequencyHeight;

        y = y > canvas.height - 1 ? canvas.height - 1 : y;
        y = y < 0 ? 0 : y;

        canvasContext.fillRect(x, y, frequencyWidth, canvas.height);
        x += frequencyWidth * 2;
      }

      let scale = (scales.reduce((pv, cv) => (pv + cv), 0) / scales.length) * 0.5;

      scale = scale < 1 ? 1 : scale;
      scale = scale > 3 ? 3 : scale;

      circle.style.transform = 'scale('+ scale +')';

      rafCall = requestAnimationFrame(this.startVisuals);
    },
    stopVisuals () {
      cancelAnimationFrame(rafCall);
    }
  },
  mounted () {
    canvas = this.$el.querySelector('canvas');
    circle = document.querySelector('.background');

    canvasContext = canvas.getContext('2d');

    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;

    canvasContext.imageSmoothingEnabled = false;

    ScaleBar.max = canvas.height;

    const audioContext = new window.AudioContext();
    const source = audioContext.createMediaElementSource(this.audioElement);

    analyser = audioContext.createAnalyser();

    source.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 1024;
    analyser.minDecibels = -90;
    analyser.maxDecibels = 0;

    bufferLength = analyser.frequencyBinCount;
    frequencyData = new Uint8Array(bufferLength);
  }
}
