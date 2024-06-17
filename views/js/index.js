// var swiper = new Swiper(".section2 .swiper-container", {
//   speed: 1000,
//   init: true,
//   initialSlide: 1,
//   loop: false,
//   slidesPerView: 3,
//   centeredSlides: true,
//   autoplay: false,
//   mousewheel: true,
//   spaceBetween: 40,
//   mousewheel: {
//     eventsTarged: ".section2 .swiper-container",
//   },
//   on: {
//     init: function () {
//       $(".section2 .swiper-progress-bar").removeClass("animate");
//       $(".section2 .swiper-progress-bar").removeClass("active");
//       $(".section2 .swiper-progress-bar").eq(0).addClass("animate");
//       $(".section2 .swiper-progress-bar").eq(0).addClass("active");
//       var firstElem = document.getElementById("home-lottie-icon01");
//       var firstAnim = bodymovin.loadAnimation({
//         container: firstElem,
//         renderer: "svg",
//         loop: false,
//         autoplay: true,
//         rendererSettings: {
//           progressiveLoad: true,
//           preserveAspectRatio: "xMidYMid meet",
//         },
//         path: "/static/js/home-lottie-icon01.json",
//       });
//       firstAnim.setSpeed(0.72);
//     },
//     slideChangeTransitionStart: function () {
//       $(".section2 .swiper-progress-bar").removeClass("animate");
//       $(".section2 .swiper-progress-bar").removeClass("active");
//       $(".section2r .swiper-progress-bar").addClass("active");
//     },
//     slideChangeTransitionEnd: function () {
//       $(".section2 .swiper-progress-bar").addClass("animate");
//     },
//     activeIndexChange: function () {
//       var animations = [
//         "home-lottie-icon01",
//         "home-lottie-icon02",
//         "home-lottie-icon03",
//         "home-lottie-icon04",
//         "home-lottie-icon05",
//       ];
//       var lotLen = animations.length;
//       var elem = document.getElementById(animations[this.realIndex]);
//       if ($(elem).children("svg").length > 0) {
//         $(elem).children("svg").remove();
//       }
//       var anim = bodymovin.loadAnimation({
//         container: elem,
//         renderer: "svg",
//         loop: false,
//         autoplay: true,
//         rendererSettings: {
//           progressiveLoad: true,
//           preserveAspectRatio: "xMidYMid meet",
//         },
//         path: "/static/js/" + animations[this.realIndex] + ".json",
//       });
//       anim.setSpeed(0.72);
//     },
//   },
// });

$(window).scroll(function () {
  var scrollPosition = $(window).scrollTop();
  //   var targetDom = $(".loading-svg");
  //   var targetPosition = $(".loading-svg svg").offset().top;

  //   // 判断当前DOM元素的底部是否进入窗口超过100px
  //   if (
  //     scrollPosition >= targetPosition - $(window).height() + 100 &&
  //     scrollPosition < targetPosition + targetDom.outerHeight()
  //   ) {
  //     $(
  //       ".animation1__draw, .animation2__draw,.animation3__draw,.animation4__draw,.animation5__draw"
  //     ).addClass("svg-line");
  //     $(
  //       ".animation1__text,.animation2__text,.animation3__text,.animation4__text,.animation5__text"
  //     ).addClass("showText");
  //   }

  //   if (scrollPosition >= $(".section2").offset().top - $(window).height()) {
  //     swiper.autoplay.start();
  //   }

  //

  var w =
    $(".section.is-manifesto").position().top -
    document.documentElement.clientHeight / 2;
  if (scrollPosition >= w) {
    $(".section4").addClass("on");
    $(".section.is-manifesto").addClass("on");
    setTimeout(function () {
      $(".manifesto_text-wrap").css("opacity", "1");
    }, 500);
  } else {
    $(".manifesto_text-wrap").css("opacity", "0");
    $(".section4").removeClass("on");
    $(".section.is-manifesto").removeClass("on");
  }
});
$(".section5 .item").mouseenter(function () {
  $(this).addClass("active").siblings(".item").removeClass("active");
});

// setTimeout(() => {
//   if (localStorage.getItem("isAccept") == null) {
//     $(".cookie_box").fadeIn();
//   }
// }, 1000);
// $(".contact_box .close").click(function () {
//   $(".contact_box").fadeOut();
// });
// $(".cookie_box a").click(function () {
//   $(".cookie_box").fadeOut();
// });
// $("#acceptCookies").click(function () {
//   localStorage.setItem("isAccept", "1");
// });

let typeSplit;
// Split the text up
function runSplit() {
  typeSplit = new SplitType(".split-lines", {
    types: "lines, words",
  });
  $(".line").append("<div class='line-mask'></div>");
  createAnimation();
}
runSplit();
// Update on window resize
let windowWidth = $(window).innerWidth();
window.addEventListener("resize", function () {
  if (windowWidth !== $(window).innerWidth()) {
    windowWidth = $(window).innerWidth();
    typeSplit.revert();
    runSplit();
  }
});

gsap.registerPlugin(ScrollTrigger);

function createAnimation() {
  $(".line").each(function (index) {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        // trigger element - viewport
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    });
    tl.to($(this).find(".line-mask"), {
      width: "0%",
      duration: 1,
    });
  });
}

(function () {
  // Init
  var container = $(".hover-rotate-container"),
    inner = ".hover-rotate-inner";

  // Mouse
  var mouse = {
    _x: 0,
    _y: 0,
    x: 0,
    y: 0,
    updatePosition: function (event) {
      var e = event || window.event;
      this.x = e.clientX - this._x;
      this.y = (e.clientY - this._y) * -1;
    },
    setOrigin: function (eles) {
      var _this = this;
      eles.each(function () {
        _this._x = this.offsetLeft + Math.floor(this.offsetWidth / 2);
        _this._y = this.offsetTop + Math.floor(this.offsetHeight / 2);
      });
    },
    show: function () {
      return "(" + this.x + ", " + this.y + ")";
    },
  };

  // Track the mouse position relative to the center of the container.
  mouse.setOrigin(container);

  //-----------------------------------------

  var counter = 0;
  var updateRate = 10;
  var isTimeToUpdate = function () {
    return counter++ % updateRate === 0;
  };

  //-----------------------------------------

  var onMouseEnterHandler = function (event) {
    update(event, $(this).children(inner)[0]);
  };

  var onMouseLeaveHandler = function () {
    $(inner).attr("style", "");
  };

  var onMouseMoveHandler = function (event) {
    if (isTimeToUpdate()) {
      update(event, $(this).children(inner)[0]);
    }
  };

  //-----------------------------------------

  var update = function (event, currEle) {
    mouse.updatePosition(event);
    updateTransformStyle(
      currEle,
      (mouse.y / currEle.offsetHeight / 10).toFixed(2),
      (mouse.x / currEle.offsetWidth / 10).toFixed(2)
    );
  };

  var updateTransformStyle = function (currEle, x, y) {
    var style = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
    currEle.style.transform = style;
    currEle.style.webkitTransform = style;
    currEle.style.mozTransform = style;
    currEle.style.msTransform = style;
    currEle.style.oTransform = style;
  };

  //-----------------------------------------

  container.mouseenter(onMouseEnterHandler);
  container.mouseleave(onMouseLeaveHandler);
  container.mousemove(onMouseMoveHandler);
})();
