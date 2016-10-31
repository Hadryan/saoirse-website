const ScaleBar = {
  min: 0,
  max: 0,
  sum: 0,
  get: function (fromMin, fromMax, valueIn) {
    const toMax = ScaleBar.max;
    const toMin = ScaleBar.min;
    //fromMin = ScaleBar.sum * fromMin;
    fromMin = (fromMax * 0.45);

    return ((toMax - toMin) * (valueIn - fromMin)) / (fromMax - fromMin) + toMin;
  }
};

/*
var canvas = document.getElementsByTagName('canvas')[0];

var circle = document.querySelector('.vis-circle');



var MusicVisuals = {
  call: null,
  start: function() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(frequencyData);

    var frequencyWidth = (canvas.width / bufferLength), frequencyHeight = 0, x = 0, scales = [], shadows = [], fd = [];

    var fdMin = Math.min.apply(Math,frequencyData);
    var fdMax = Math.max.apply(Math,frequencyData);

    for(var increment = 0; increment < bufferLength; increment++) {
      frequencyHeight = frequencyData[increment] * (canvas.height / 250);

      if (increment < 15) {
        scales.push(frequencyHeight / 50);
      } else if (increment > (bufferLength / 2)) {
        shadows.push(frequencyHeight * 3);
      }
      fd.push(frequencyData[increment]);

      frequencyHeight = ScaleBar.get(fdMin, fdMax, frequencyData[increment]);
      canvasContext.fillStyle = '#fff';
      var y = canvas.height - frequencyHeight;
      canvasContext.fillRect(x, y, frequencyWidth, frequencyHeight);
      x += frequencyWidth+1.25;
    }

    var sc = scales.reduce(function(pv, cv) { return pv + cv; }, 0) / scales.length;
    ScaleBar.sum = fd.reduce(function(pv, cv) { return pv + cv; }, 0) / fd.length;
    sc *= 1.6;
    circle.style.transform = 'scale('+ (sc > 1 ? sc : 1) +')';
    circle.style.boxShadow = '0 0 ' + shadows.reduce(function(pv, cv) { return pv + cv; }, 0) / shadows.length + 'px white';

    MusicVisuals.call = requestAnimationFrame(MusicVisuals.start);
  },
  stop: function() {
    cancelAnimationFrame(MusicVisuals.call);
  }
};
*/

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

      let frequencyWidth = (canvas.width / bufferLength)
          , frequencyHeight = 0
          , x = 0
          , scales = []
          , shadows = []
          , fd = []
          ;

      var fdMin = Math.min.apply(Math,frequencyData);
      var fdMax = Math.max.apply(Math,frequencyData);

      for (let increment = 0; increment < bufferLength; increment++) {
        frequencyHeight = frequencyData[increment] * (canvas.height / 250);

        if (increment < 15) {
          scales.push(frequencyHeight / 50);
        } else if (increment > (bufferLength / 2)) {
          shadows.push(frequencyHeight * 3);
        }
        fd.push(frequencyData[increment]);

        frequencyHeight = ScaleBar.get(fdMin, fdMax, frequencyData[increment]);
        canvasContext.fillStyle = '#fff';
        var y = canvas.height - frequencyHeight;
        canvasContext.fillRect(x, y, frequencyWidth, frequencyHeight);
        x += frequencyWidth+1.25;
      }

      var sc = scales.reduce(function(pv, cv) { return pv + cv; }, 0) / scales.length;
      ScaleBar.sum = fd.reduce(function(pv, cv) { return pv + cv; }, 0) / fd.length;

      circle.style.transform = 'scale('+ (sc > 1 ? sc : 1) +')';
      // circle.style.boxShadow = '0 0 ' + shadows.reduce(function(pv, cv) { return pv + cv; }, 0) / shadows.length + 'px white';

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
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    ScaleBar.max = canvas.height;

    const audioContext = new window.AudioContext();
    console.debug(this.audioElement);
    const source = audioContext.createMediaElementSource(this.audioElement);
    analyser = audioContext.createAnalyser();

    source.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 2048;
    analyser.minDecibels = -90;
    analyser.maxDecibels = 0;

    bufferLength = analyser.frequencyBinCount;
    frequencyData = new Uint8Array(bufferLength);
  }
}
