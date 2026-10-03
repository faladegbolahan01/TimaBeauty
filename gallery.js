document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       MOBILE MENU
    ========================================= */

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



    /* =========================================
       GALLERY FILTER
    ========================================= */

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const galleryItems =
        document.querySelectorAll(".gallery-item");


    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            filterButtons.forEach(function (btn) {

                btn.classList.remove("active");

            });


            this.classList.add("active");


            const filter =
                this.getAttribute("data-filter");


            galleryItems.forEach(function (item) {

                const category =
                    item.getAttribute("data-category");


                if (
                    filter === "all" ||
                    category === filter
                ) {

                    item.classList.remove("hidden");

                } else {

                    item.classList.add("hidden");

                }

            });


            /*
                Refresh AOS after filtering
                so animations work correctly
            */

            if (typeof AOS !== "undefined") {

                setTimeout(function () {

                    AOS.refresh();

                }, 100);

            }

        });

    });



    /* =========================================
       LIGHTBOX
    ========================================= */

    const lightbox =
        document.getElementById("lightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const closeButton =
        document.getElementById("lightboxClose");

    const previousButton =
        document.getElementById("lightboxPrev");

    const nextButton =
        document.getElementById("lightboxNext");

    const viewButtons =
        document.querySelectorAll(".view-image");


    let currentIndex = 0;



    /* =========================================
       GET VISIBLE ITEMS
    ========================================= */

    function getVisibleItems() {

        return Array.from(galleryItems)
            .filter(function (item) {

                return !item.classList.contains("hidden");

            });

    }



    /* =========================================
       OPEN LIGHTBOX
    ========================================= */

    function openLightbox(index) {

        const visibleItems =
            getVisibleItems();


        if (!visibleItems.length) {
            return;
        }


        currentIndex = index;


        const image =
            visibleItems[currentIndex]
                .querySelector("img");


        lightboxImage.src = image.src;

        lightboxImage.alt = image.alt;


        lightbox.classList.add("show");


        document.body.style.overflow = "hidden";

    }



    /* =========================================
       CLOSE LIGHTBOX
    ========================================= */

    function closeLightbox() {

        lightbox.classList.remove("show");

        document.body.style.overflow = "";

    }



    /* =========================================
       NEXT IMAGE
    ========================================= */

    function showNext() {

        const visibleItems =
            getVisibleItems();


        if (!visibleItems.length) {
            return;
        }


        currentIndex++;


        if (
            currentIndex >=
            visibleItems.length
        ) {

            currentIndex = 0;

        }


        const image =
            visibleItems[currentIndex]
                .querySelector("img");


        lightboxImage.src = image.src;

        lightboxImage.alt = image.alt;

    }



    /* =========================================
       PREVIOUS IMAGE
    ========================================= */

    function showPrevious() {

        const visibleItems =
            getVisibleItems();


        if (!visibleItems.length) {
            return;
        }


        currentIndex--;


        if (currentIndex < 0) {

            currentIndex =
                visibleItems.length - 1;

        }


        const image =
            visibleItems[currentIndex]
                .querySelector("img");


        lightboxImage.src = image.src;

        lightboxImage.alt = image.alt;

    }



    /* =========================================
       OPEN FROM EXPAND BUTTON
    ========================================= */

    viewButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.stopPropagation();


            const visibleItems =
                getVisibleItems();


            const clickedItem =
                button.closest(".gallery-item");


            const visibleIndex =
                visibleItems.indexOf(clickedItem);


            openLightbox(
                visibleIndex >= 0
                    ? visibleIndex
                    : 0
            );

        });

    });



    /* =========================================
       CLICK GALLERY IMAGE
    ========================================= */

    galleryItems.forEach(function (item) {

        item.addEventListener("click", function () {

            const visibleItems =
                getVisibleItems();


            const index =
                visibleItems.indexOf(item);


            openLightbox(index);

        });

    });



    /* =========================================
       CLOSE BUTTON
    ========================================= */

    closeButton.addEventListener(
        "click",
        closeLightbox
    );



    /* =========================================
       NEXT BUTTON
    ========================================= */

    nextButton.addEventListener(
        "click",
        showNext
    );



    /* =========================================
       PREVIOUS BUTTON
    ========================================= */

    previousButton.addEventListener(
        "click",
        showPrevious
    );



    /* =========================================
       CLOSE BY CLICKING BACKGROUND
    ========================================= */

    lightbox.addEventListener(
        "click",
        function (event) {

            if (event.target === lightbox) {

                closeLightbox();

            }

        }
    );



    /* =========================================
       KEYBOARD CONTROLS
    ========================================= */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                !lightbox.classList.contains("show")
            ) {

                return;

            }


            if (event.key === "Escape") {

                closeLightbox();

            }


            if (event.key === "ArrowRight") {

                showNext();

            }


            if (event.key === "ArrowLeft") {

                showPrevious();

            }

        }
    );



    /* =========================================
       HEADER SHADOW ON SCROLL
    ========================================= */

    const header =
        document.querySelector("header");


    window.addEventListener(
        "scroll",
        function () {

            if (window.scrollY > 40) {

                header.style.boxShadow =
                    "0 5px 25px rgba(0,0,0,.25)";

            } else {

                header.style.boxShadow =
                    "none";

            }

        }
    );

});