
document.addEventListener("DOMContentLoaded", function () {

    // ===== Переключение фотографий в галерее кукол =====

    document.querySelectorAll(".photo-gallery").forEach(function (gallery) {
        const photos = (gallery.dataset.photos || "")
            .split("|")
            .filter(Boolean);

        const img = gallery.querySelector(".work-photo");
        const counter = gallery.querySelector(".photo-counter");
        const prev = gallery.querySelector(".prev");
        const next = gallery.querySelector(".next");

        if (!photos.length || !img) return;

        let current = 0;

        function showPhoto(index) {
            current = (index + photos.length) % photos.length;
            img.src = photos[current];
            img.alt = "Фотография куклы " + (current + 1);

            if (counter) {
                counter.textContent = (current + 1) + " / " + photos.length;
            }
        }

        if (prev) {
            prev.addEventListener("click", function (event) {
                event.stopPropagation();
                showPhoto(current - 1);
            });
        }

        if (next) {
            next.addEventListener("click", function (event) {
                event.stopPropagation();
                showPhoto(current + 1);
            });
        }

        showPhoto(0);
    });


    // ===== Полноэкранная галерея кукол =====

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxClose = document.getElementById("lightboxClose");
    const lightboxPrev = document.getElementById("lightboxPrev");
    const lightboxNext = document.getElementById("lightboxNext");
    const lightboxCounter = document.getElementById("lightboxCounter");

    let currentGalleryPhotos = [];
    let currentPhotoIndex = 0;

    function showLightboxPhoto() {
        if (!lightboxImage || !currentGalleryPhotos.length) return;

        lightboxImage.src = currentGalleryPhotos[currentPhotoIndex];

        if (lightboxCounter) {
            lightboxCounter.textContent =
                (currentPhotoIndex + 1) + " / " + currentGalleryPhotos.length;
        }
    }

    function openLightbox(photos, index) {
        if (!lightbox || !lightboxImage) return;

        currentGalleryPhotos = photos;
        currentPhotoIndex = index;

        showLightboxPhoto();
        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
        if (!lightbox) return;

        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");

        if (lightboxImage) lightboxImage.src = "";

        document.body.style.overflow = "";
    }

    function changeLightboxPhoto(direction) {
        if (!currentGalleryPhotos.length) return;

        currentPhotoIndex =
            (currentPhotoIndex + direction + currentGalleryPhotos.length)
            % currentGalleryPhotos.length;

        showLightboxPhoto();
    }

    document.querySelectorAll(".photo-gallery").forEach(function (gallery) {
        const image = gallery.querySelector(".work-photo");
        const photos = (gallery.dataset.photos || "")
            .split("|")
            .filter(Boolean);

        if (!image || !photos.length) return;

        image.style.cursor = "zoom-in";

        image.addEventListener("click", function () {
            let index = photos.findIndex(function (photo) {
                return new URL(photo, document.baseURI).href === image.src;
            });

            openLightbox(photos, Math.max(0, index));
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener("click", closeLightbox);
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener("click", function () {
            changeLightboxPhoto(-1);
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener("click", function () {
            changeLightboxPhoto(1);
        });
    }

    if (lightbox) {
        lightbox.addEventListener("click", function (event) {
            if (event.target === lightbox) closeLightbox();
        });
    }


    // ===== Увеличение фотографий на странице «Идеи» =====

    const ideaLightbox = document.getElementById("ideaLightbox");
    const ideaLightboxImage = document.getElementById("ideaLightboxImage");
    const ideaLightboxClose = document.getElementById("ideaLightboxClose");

    if (ideaLightbox && ideaLightboxImage && ideaLightboxClose) {
        document.querySelectorAll(".idea-photos img").forEach(function (img) {
            img.style.cursor = "zoom-in";

            img.addEventListener("click", function () {
                ideaLightboxImage.src = img.src;
                ideaLightboxImage.alt = img.alt;
                ideaLightbox.classList.add("open");
                document.body.style.overflow = "hidden";
            });
        });

        function closeIdeaLightbox() {
            ideaLightbox.classList.remove("open");
            ideaLightboxImage.src = "";
            document.body.style.overflow = "";
        }

        ideaLightboxClose.addEventListener("click", closeIdeaLightbox);

        ideaLightbox.addEventListener("click", function (event) {
            if (event.target === ideaLightbox) closeIdeaLightbox();
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") closeIdeaLightbox();
        });
    }


    // ===== Увеличение трёх эскизов в дневнике =====

    const sketchImages = document.querySelectorAll(".sketch-row img");
    const sketchLightbox = document.getElementById("sketchLightbox");
    const sketchLightboxImage = document.getElementById("sketchLightboxImage");
    const sketchLightboxClose = document.getElementById("sketchLightboxClose");

    if (sketchLightbox && sketchLightboxImage && sketchLightboxClose) {

        sketchImages.forEach(function (img) {
            img.style.cursor = "zoom-in";

            img.addEventListener("click", function () {
                sketchLightboxImage.src = img.src;
                sketchLightboxImage.alt = img.alt;
                sketchLightbox.classList.add("show");
                document.body.style.overflow = "hidden";
            });
        });

        function closeSketchLightbox() {
            sketchLightbox.classList.remove("show");
            sketchLightboxImage.src = "";
            document.body.style.overflow = "";
        }

        sketchLightboxClose.addEventListener("click", closeSketchLightbox);

        sketchLightbox.addEventListener("click", function (event) {
            if (
                event.target === sketchLightbox ||
                event.target === sketchLightboxImage
            ) {
                closeSketchLightbox();
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") closeSketchLightbox();
        });
    }

});
