'use strict'

$(function () {
  // multiscroll
  $("#multiscroll").multiscroll({
    loopTop: false,
    loopBottom: true,
    scrollingSpeed: 500 // イージングのスピード
  });

  player.addEventListener("ended", function () {
    $("#player").remove(); //videoタグをDOM的に削除
    $('.logo').fadeIn();
  });

  // portfolio
  $(".portfolio").css("display", "none");

  $(".close").click(function () {
    $(".fv").css("display", "block");
    $(".portfolio").css("display", "none");
    $(".box").removeClass("line");
  });

  const video = document.querySelector("#detail");
  const video_btn = document.querySelector("#detail-btn");

  video_btn.addEventListener("click", () => {
    video.play();
    $("#detail").css("transition", "10s");
    $("#detail").css("transform", "scale(3)");
    $("#layer").css("opacity", "0");
    $(".fv-detail").css("opacity", "0");
    $(".contact").css("opacity", "0");
    $(".news_ticker").css("display", "none");
  });

  video.addEventListener("ended", () => {
    $(".fv").fadeOut();
    $(".portfolio").fadeIn();
    $(".box").addClass("line");
    $("#detail").css("transform", "scale(1.4)");
    $("#layer").css("opacity", "1");
    $(".fv-detail").css("opacity", "1");
    $(".contact").css("opacity", "1");
    $(".news_ticker").css("display", "block");
  });
  
});


class ShuffleText {
  constructor(element) {
    this.element = element
    this.randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234566789!?'
    this.emptyChar = '-'
    this.originalText = element.innerText
    this.originalLength = this.originalText.length
    this.startTime = new Date().getTime()
    this.timeOut = 40
    this.shuffle()
  }

  init() {
    this.text = ''
    this.length = 0
    this.shuffleLength = 0
  }

  shuffle() {
    this.init()
    requestAnimationFrame(this.update.bind(this))
  }

  update() {
    if (this.length > this.originalLength) {
      return // 表示完了
    }

    let currentTime = new Date().getTime()
    if (currentTime - this.startTime > this.timeOut) {
      this.startTime = currentTime

      if (this.text.length < this.originalLength) {
        this.text += this.emptyChar
      }

      if (this.text.length > this.originalLength / 3) {
        this.text =
          this.generateRandomText(this.shuffleLength) +
          this.text.slice(this.shuffleLength)

        if (this.shuffleLength < this.originalLength)
          this.shuffleLength++
      }

      if (this.shuffleLength > this.originalLength / 2) {
        this.text =
          this.originalText.slice(0, this.length) + this.text.slice(this.length)
        this.length++
      }
    }
    this.element.innerText = this.text
    requestAnimationFrame(this.update.bind(this))
  }

  generateRandomText(length) {
    let randomText = ''
    for (let i = 0; i < length; i++) {
      randomText += this.randomChars[
        Math.floor(Math.random() * this.randomChars.length)
      ]
    }
    return randomText
  }
}

var el = document.querySelectorAll('.shuffle')
// var st = new ShuffleText(el)

// el.addEventListener("mouseover", function () {
//   st.shuffle();
// });

// el.forEach(function (elem) {
//   elem.addEventListener("mouseover", function () {
//     var st = new ShuffleText(elem);
//     st.shuffle();
//   });
// });

const video = document.querySelector("#detail");
video.addEventListener('ended', function () {
  el.forEach(function (elem) {
    var st = new ShuffleText(elem);
    st.shuffle();
  });
});

const video2 = document.querySelector("#player");
video2.addEventListener('ended', function () {
  el.forEach(function (elem) {
    var st = new ShuffleText(elem);
    st.shuffle();
  });
});

const close = document.querySelector(".close");
close.addEventListener('click', function () {
  el.forEach(function (elem) {
    var st = new ShuffleText(elem);
    st.shuffle();
  });
});