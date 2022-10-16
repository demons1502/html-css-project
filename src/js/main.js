$(document).ready(function () {
  $(".slider").slick({
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow:
      "<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
    nextArrow:
      "<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>",
  });

  $(".recent-post-card").slick({
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 980,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
  $(".pinned-review").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 980,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
});
const likeBtn = document.querySelector(".like__button");
let likeIcon = document.querySelector("#icon");
let count = document.querySelector("#count");

// button click
let clicked = false;

likeIcon?.classList.add("fa-regular", "fa-thumbs-up");
likeBtn?.addEventListener("click", () => {
  likeIcon.classList.toggle("fas");
});
