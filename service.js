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


        /* Close menu after clicking a link */

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


    /* =====================================
       HEADER SCROLL EFFECT
    ===================================== */

    const header = document.querySelector("header");

    window.addEventListener("scroll", function () {

        if (window.scrollY > 40) {

            header.style.boxShadow =
                "0 5px 25px rgba(0,0,0,.25)";

        } else {

            header.style.boxShadow = "none";

        }

    });


    /* =====================================
       SERVICE CARD ANIMATION
    ===================================== */

    const serviceCards =
        document.querySelectorAll(".service-card");

    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity = "1";
                        entry.target.style.transform =
                            "translateY(0)";

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    serviceCards.forEach(function (card, index) {

        card.style.opacity = "0";

        card.style.transform = "translateY(30px)";

        card.style.transition =
            `opacity .6s ease ${index * .08}s,
             transform .6s ease ${index * .08}s`;

        observer.observe(card);

    });


    /* =====================================
       SMOOTH SCROLL
    ===================================== */

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                this.getAttribute("href");

            if (targetId === "#") {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


});