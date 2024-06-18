innerloader = {
  init: function () {
    function a() {
      if ($(".innerload-bg").length > 0) {
        $(".innerload-bg").addClass("addload");
        var demo = { score: 0 },
          scoreDisplay = document.getElementById("scoreDisplay");
        var tween = TweenLite.to(demo, 2, {
          score: 100,
          onUpdate: showScore,
        });
        function showScore() {
          scoreDisplay.innerHTML = demo.score.toFixed(0);
        }
        setTimeout(function () {
          $(".innerload").addClass("show");
          // setTimeout(function () {
          //   $(".innerload").css("opacity", 0);
          //   // $("html").scrollTop(4);
          // }, 600);
        }, 2000);
      }
    }
    a();
  },
};
//ScrollTrigger.config({ ignoreMobileResize: true });
("use strict"); // fix lenis in safari
const lenis = new Lenis({
  lerp: 0.3,
  wheelMultiplier: 0.7,
  infinite: false,
  gestureOrientation: "vertical",
  normalizeWheel: false,
  smoothTouch: false,
  syncTouchLerp: 1,
  touchMultiplier: 0.1,
  autoResize: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

function connectToScrollTrigger() {
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
}
// Uncomment this if using GSAP ScrollTrigger
connectToScrollTrigger();

window.addEventListener("resize", function () {
  lenis.resize();
});
new WOW().init();
window.onload = function () {
  innerloader.init();
  $(".nav-links a").each(function () {
    console.log($(".nav-links a").attr("href"), location.pathname);
    if ($(this).attr("href") == location.pathname) {
      $(this).addClass("w--current").siblings().removeClass("w--current");
    }
  });
};

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  markers: false,
});

// Sticky Circle Grow
$(".manifesto-circle_wrap").each(function (index) {
  let triggerElement = $(this);
  let targetElement = $(".manifesto-circle");

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement,
      // trigger element - viewport
      start: "top middle",
      end: "bottom bottom",
      scrub: 1,
    },
  });

  tl.fromTo(
    targetElement,
    {
      width: "50vh",
      height: "50vh",
      borderRadius: "35em",
      duration: 1,
    },
    {
      width: "100vw",
      height: "100vh",
      borderRadius: "0em",
      duration: 2,
      ease: "power2.inOut",
    }
  );

  tl.fromTo(
    ".container.is-manifesto",
    {
      opacity: 0,
      duration: 1,
    },
    {
      opacity: 1,
      duration: 1,
      ease: "power2.inOut",
    }
  );
});
