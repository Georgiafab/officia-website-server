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
          setTimeout(function () {
            $(".innerload").css("opacity", 0);
            $("html").scrollTop(4);
          }, 600);
        }, 2000);
      }
    }
    a();
  },
};

window.onload = function () {
  innerloader.init();
  //   setTimeout(function () {
  //     $(".article-block").delay(2000).scrollClass();
  //   }, 2000);
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
