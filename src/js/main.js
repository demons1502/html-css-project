$(document).ready(function () {
    $('.slider').slick({
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        prevArrow:
            "<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
        nextArrow:
            "<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>",
    });

    $('.recent-post-card').slick({
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
    $('.pinned-review').slick({
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
// like button
const likeBtn = document.querySelector('.like__button');
let likeIcon = document.querySelector('#icon');
let count = document.querySelector('#count');

// button click
let clicked = false;

likeIcon?.classList.add('fa-regular', 'fa-thumbs-up');
likeBtn?.addEventListener('click', () => {
    likeIcon.classList.toggle('fas');
});

//success register
const btn_register = document.querySelector('.btn-Register');
const btn_Cancel = document.querySelector('.btn-Cancel');
const modal_container = document.getElementById('modal-container');

btn_register.addEventListener('click', () => {
    //add class Show
    modal_container.classList.add('show');
});
btn_Cancel.addEventListener('click', () => {
    modal_container.classList.remove('show');
});

// login and register
const btnRegister = document.querySelector('.btnRegister');
const btnLogin = document.querySelector('.btnlogin');
const login = document.querySelector('#login');
const signup = document.querySelector('#register');
const loginInRegister = document.querySelector('.btn-register-login');

window.onload = () => {
    signup.style.display = 'none';
};

btnRegister.addEventListener('click', () => {
    login.style.display = 'none';
    signup.style.display = 'block';
});

loginInRegister.addEventListener('click', () => {
    login.style.display = 'block';
    signup.style.display = 'none';
});
// btnRegister = () => {
//   let ui =` <div class="login-card login loginform mb-5 p-5" id="login">
//   <div class="login-card-body body">
//       <div class="d-flex justify-content-center ">
//           <figure class="body-img">
//               <img src="assets/images/handshake 1.png" alt="">
//           </figure>
//       </div>
//       <h5 class="body-text text-uppercase text-center mb-3">Welcome back</h5>
//       <form class="body-form" action="">
//           <include src="components/form-input.html" locals='{
//                                   "type" : "text",
//                                   "classInput" : "form-control form-control-lg mb-4",
//                                   "placeholder" : "Your Name",
//                                   "boxShadow" : "box-shadow: 0px 0px 6px $box-search-color"
//                               }'></include>

//           <include src="components/form-input.html" locals='{
//                                   "type" : "password",
//                                   "classInput" : "form-control form-control-lg mb-4",
//                                   "placeholder" : "Your Password",
//                                   "boxShadow" : "box-shadow: 0px 0px 6px $box-search-color"
//                               }'></include>

//           <div class="form-check mb-2 row">
//               <div class="col-md-5">
//                   <input class="form-check-input" type="checkbox" value="" id="form2Example3cg" />
//                   <label class="form-check-label" for="form2Example3g">
//                       Remember me
//                   </label>
//               </div>
//           </div>
//           <div class="body-btn row ">
//               <div class="button-login d-flex justify-content-center col-md-6">
//                   <include src="components/button.html" locals='{
//                                           "class" : "btnlogin btn btn-success btn-block btn-sm text-body",
//                                           "backgroundColor" : "#8c99dd",
//                                           "color" : "",
//                                           "boderRadius" : "20px",
//                                           "button" : "Login"
//                                       }'></include>
//               </div>
//               <div class="button-login d-flex justify-content-center col-md-6">
//                   <include src="components/button.html" locals='{
//                                           "class" : "btnRegister btn btn-success btn-block btn-sm  text-body",
//                                           "backgroundColor" : "#b7b7b7",
//                                           "color" : "",
//                                           "boderRadius" : "20px",
//                                           "button" : "Register"
//                                       }'></include>
//               </div>
//           </div>
//       </form>
//   </div>
// </div>
// `;
//   login.append(ui);
// }

