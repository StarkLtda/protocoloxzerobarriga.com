// 1771000
const startDelay = 1765000;
let showButtonBuyTimeout = undefined;

const ShowButtonBuy = () => {
  document.getElementById("cta1").classList.remove("d-none");
  document.getElementById("cta2").classList.remove("d-none");
};

function Timer (callback, delay) {
  var args = arguments,
    self = this,
    timer,
    start;

  this.clear = function () {
    clearTimeout(timer);
  };

  this.pause = function () {
    this.clear();
    delay -= new Date() - start;
  };

  this.resume = function () {
    start = new Date();
    timer = setTimeout(function () {
      callback.apply(
        self,
        Array.prototype.slice.call(args, 2, args.length)
      );
    }, delay);
  };

  this.resume();
}

const playVideo = () => {
  if (!showButtonBuyTimeout) {
    showButtonBuyTimeout = new Timer(ShowButtonBuy, startDelay); // temporização da Call to Action (em milissegundos)
  } else {
    showButtonBuyTimeout.resume();
  }
};

const pauseVideo = () => {
  showButtonBuyTimeout.pause();
};

const awaitVideoInPage = setInterval(() => {
  let video = document.getElementsByTagName("video")[0];
  if (video) {
    clearInterval(awaitVideoInPage);
    video.onpause = function () {
      pauseVideo();
    };
    video.onplaying = function () {
      playVideo();
    };
  }
}, 50);