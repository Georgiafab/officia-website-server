function initMagneticButtons() {
  // Magnetic Buttons
  // Found via: https://codepen.io/tdesero/pen/RmoxQg
  var magnets = document.querySelectorAll(".magnetic");
  var strength = 100;

  // START : If screen is bigger as 540 px do magnetic
  if (window.innerWidth > 540) {
    // Mouse Reset
    magnets.forEach((magnet) => {
      magnet.addEventListener("mousemove", moveMagnet);
      $(this.parentNode).removeClass("not-active");
      magnet.addEventListener("mouseleave", function (event) {
        gsap.to(event.currentTarget, 1.5, {
          x: 0,
          y: 0,
          ease: Elastic.easeOut,
        });
        gsap.to($(this).find(".btn-text"), 1.5, {
          x: 0,
          y: 0,
          ease: Elastic.easeOut,
        });
      });
    });

    // Mouse move
    function moveMagnet(event) {
      var magnetButton = event.currentTarget;
      var bounding = magnetButton.getBoundingClientRect();
      var magnetsStrength = magnetButton.getAttribute("data-strength");
      var magnetsStrengthText = magnetButton.getAttribute("data-strength-text");

      gsap.to(magnetButton, 1.5, {
        x:
          ((event.clientX - bounding.left) / magnetButton.offsetWidth - 0.5) *
          magnetsStrength,
        y:
          ((event.clientY - bounding.top) / magnetButton.offsetHeight - 0.5) *
          magnetsStrength,
        rotate: "0.001deg",
        ease: Power4.easeOut,
      });
      gsap.to($(this).find(".btn-text"), 1.5, {
        x:
          ((event.clientX - bounding.left) / magnetButton.offsetWidth - 0.5) *
          magnetsStrengthText,
        y:
          ((event.clientY - bounding.top) / magnetButton.offsetHeight - 0.5) *
          magnetsStrengthText,
        rotate: "0.001deg",
        ease: Power4.easeOut,
      });
    }
  } // END : If screen is bigger as 540 px do magnetic

  // Mouse Enter
  $(".btn-click.magnetic").on("mouseenter", function () {
    if ($(this).find(".btn-fill").length) {
      gsap.to($(this).find(".btn-fill"), 0.6, {
        startAt: { y: "76%" },
        y: "0%",
        ease: Power2.easeInOut,
      });
    }
    if ($(this).find(".btn-text-inner.change").length) {
      gsap.to($(this).find(".btn-text-inner.change"), 0.3, {
        startAt: { color: "#171717" },
        color: "#FFFFFF",
        ease: Power3.easeIn,
      });
    }
    // 案例详情页按钮
    if ($(this).find(".btn-text-inner.change2").length) {
      gsap.to($(this).find(".btn-text-inner.change2"), 0.3, {
        startAt: { color: "#000" },
        color: "#C9FF85",
        ease: Power3.easeIn,
      });
    }

    // 首页+底部按钮
    if ($(this).find(".btn-text-inner.change3").length) {
      gsap.to($(this).find(".btn-text-inner.change3"), 0.3, {
        startAt: { color: "#fff" },
        color: "#000",
        ease: Power3.easeIn,
      });
    }
    $(this.parentNode).removeClass("not-active");
  });

  // Mouse Leave
  $(".btn-click.magnetic").on("mouseleave", function () {
    if ($(this).find(".btn-fill").length) {
      gsap.to($(this).find(".btn-fill"), 0.6, {
        y: "-76%",
        ease: Power2.easeInOut,
      });
    }
    if ($(this).find(".btn-text-inner.change").length) {
      gsap.to($(this).find(".btn-text-inner.change"), 0.3, {
        color: "#171717",
        ease: Power3.easeOut,
        delay: 0.3,
      });
    }
    // 案例详情页按钮
    if ($(this).find(".btn-text-inner.change2").length) {
      gsap.to($(this).find(".btn-text-inner.change2"), 0.3, {
        color: "#000",
        ease: Power3.easeOut,
        delay: 0.3,
      });
    }
    // 首页+底部按钮
    if ($(this).find(".btn-text-inner.change3").length) {
      gsap.to($(this).find(".btn-text-inner.change3"), 0.3, {
        color: "#fff",
        ease: Power3.easeOut,
        delay: 0.3,
      });
    }

    $(this.parentNode).removeClass("not-active");
  });
}

initMagneticButtons();

function initStickyCursorWithDelay() {
  // Sticky Cursor with delay
  // https://greensock.com/forums/topic/21161-animated-mouse-cursor/
  var cursorImage = $(".mouse-pos-list-image");
  var cursorBtn = $(".mouse-pos-list-btn");
  var cursorSpan = $(".mouse-pos-list-span");

  var posXImage = 0;
  var posYImage = 0;
  var posXBtn = 0;
  var posYBtn = 0;
  var posXSpan = 0;
  var posYSpan = 0;
  var mouseX = 0;
  var mouseY = 0;

  if (
    document.querySelector(
      ".mouse-pos-list-image, .mouse-pos-list-btn, .mouse-post-list-span"
    )
  ) {
    gsap.to({}, 0.0083333333, {
      repeat: -1,
      onRepeat: function () {
        if (document.querySelector(".mouse-pos-list-image")) {
          posXImage += (mouseX - posXImage) / 12;
          posYImage += (mouseY - posYImage) / 12;
          gsap.set(cursorImage, {
            css: {
              left: posXImage,
              top: posYImage,
            },
          });
        }
        if (document.querySelector(".mouse-pos-list-btn")) {
          posXBtn += (mouseX - posXBtn) / 7;
          posYBtn += (mouseY - posYBtn) / 7;
          gsap.set(cursorBtn, {
            css: {
              left: posXBtn,
              top: posYBtn,
            },
          });
        }
        if (document.querySelector(".mouse-pos-list-span")) {
          posXSpan += (mouseX - posXSpan) / 6;
          posYSpan += (mouseY - posYSpan) / 6;
          gsap.set(cursorSpan, {
            css: {
              left: posXSpan,
              top: posYSpan,
            },
          });
        }
      },
    });
  }

  $(document).on("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Animated Section Assortiment Single Floating Image
  // Source: http://jsfiddle.net/639Jj/1/

  $(".mouse-pos-list-image-wrap a").on("mouseenter", function () {
    $(
      ".mouse-pos-list-image, .mouse-pos-list-btn, .mouse-pos-list-span, .mouse-pos-list-span-big"
    ).addClass("active");
  });
  $(".mouse-pos-list-image-wrap a").on("mouseleave", function () {
    $(
      ".mouse-pos-list-image, .mouse-pos-list-btn, .mouse-pos-list-span, .mouse-pos-list-span-big"
    ).removeClass("active");
  });
  $(".single-tile-wrap a, .mouse-pos-list-archive a, .next-case-btn").on(
    "mouseenter",
    function () {
      $(".mouse-pos-list-btn, .mouse-pos-list-span").addClass("active-big");
    }
  );
  $(".single-tile-wrap a, .mouse-pos-list-archive a, .next-case-btn").on(
    "mouseleave",
    function () {
      $(".mouse-pos-list-btn, .mouse-pos-list-span").removeClass("active-big");
    }
  );
  $("main").on("mousedown", function () {
    $(".mouse-pos-list-btn, .mouse-pos-list-span").addClass("pressed");
  });
  $("main").on("mouseup", function () {
    $(".mouse-pos-list-btn, .mouse-pos-list-span").removeClass("pressed");
  });

  $(".mouse-pos-list-image-wrap li.visible").on("mouseenter", function () {
    var $elements = $(".mouse-pos-list-image-wrap li.visible");
    var index = $elements.index($(this));
    var count = $(".mouse-pos-list-image li.visible").length;
    // var index =  $(this).index();
    if ($(".float-image-wrap")) {
      gsap.to($(".float-image-wrap"), {
        y: (index * 100) / (count * -1) + "%",
        duration: 0.6,
        ease: Power2.easeInOut,
      });
    }
    $(".mouse-pos-list-image.active .mouse-pos-list-image-bounce")
      .addClass("active")
      .delay(400)
      .queue(function (next) {
        $(this).removeClass("active");
        next();
      });
  });

  $(".archive-work-grid li").on("mouseenter", function () {
    $(".mouse-pos-list-btn")
      .addClass("hover")
      .delay(100)
      .queue(function (next) {
        $(this).removeClass("hover");
        next();
      });
  });
}

$("html,body").animate(
  {
    scrollTop: 0,
  },
  500
);

initStickyCursorWithDelay();

$("#top_menu").click(function () {
  $(".phone_menu").stop().addClass("show_menu");
});
$(".phone_menu .close").click(function () {
  $(".phone_menu").stop().removeClass("show_menu");
});

window.addEventListener("load", function () {
  lenis.resize();
});

if (document.body.clientWidth < 768) {
  let href = "tel:400-6065-301";
  $(".footer .need .l .btns a").eq(0).attr("href", href);
}
