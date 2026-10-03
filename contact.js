document.addEventListener("DOMContentLoaded", function () {

    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");

    if (menuBtn && navMenu) {

        menuBtn.addEventListener("click", function () {

            navMenu.classList.toggle("active");

            const icon = menuBtn.querySelector("i");

            if (navMenu.classList.contains("active")) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        });
        /* Close menu when link is clicked */

        const navLinks = navMenu.querySelectorAll("a");
        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                navMenu.classList.remove("active");

                const icon = menuBtn.querySelector("i");

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            });
        });
    }


    /*    CONTACT FORM */
    const contactForm = document.querySelector(".contact-form form");
    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const submitButton =
                contactForm.querySelector(".submit-btn");

            const originalText = submitButton.innerHTML;

            submitButton.innerHTML =
                '<i class="fa-solid fa-check"></i> MESSAGE SENT';
            submitButton.style.background = "#171714";
            contactForm.reset();

            setTimeout(function () {
                submitButton.innerHTML = originalText;
                submitButton.style.background = "";
            }, 3000);

        });

    }
});