/* site behaviour, no dependencies */
(function () {
    "use strict";

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------- sticky header state and back to top ---------- */

    function initScrollState() {
        var header = document.querySelector(".header");
        var toTop = document.querySelector(".to-top");
        if (!header && !toTop) {
            return;
        }

        var ticking = false;

        function update() {
            var y = window.scrollY;
            if (header) {
                header.classList.toggle("is-scrolled", y > 8);
            }
            if (toTop) {
                toTop.classList.toggle("is-visible", y > window.innerHeight * 0.9);
            }
            ticking = false;
        }

        window.addEventListener("scroll", function () {
            if (!ticking) {
                ticking = true;
                window.requestAnimationFrame(update);
            }
        }, { passive: true });

        update();
    }

    /* ---------- mobile navigation drawer ---------- */

    function initNav() {
        var toggle = document.querySelector(".nav-toggle");
        var drawer = document.querySelector(".nav-drawer");
        if (!toggle || !drawer) {
            return;
        }

        function setOpen(open) {
            drawer.classList.toggle("is-open", open);
            toggle.setAttribute("aria-expanded", open ? "true" : "false");
        }

        toggle.addEventListener("click", function () {
            setOpen(!drawer.classList.contains("is-open"));
        });

        drawer.addEventListener("click", function (e) {
            if (e.target.closest("a")) {
                setOpen(false);
            }
        });

        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && drawer.classList.contains("is-open")) {
                setOpen(false);
                toggle.focus();
            }
        });

        window.addEventListener("resize", function () {
            if (window.innerWidth > 880) {
                setOpen(false);
            }
        });
    }

    /* ---------- reveal on scroll ---------- */

    function initReveal() {
        var items = document.querySelectorAll(".reveal");
        if (!items.length) {
            return;
        }

        if (reduceMotion || !("IntersectionObserver" in window)) {
            for (var i = 0; i < items.length; i++) {
                items[i].classList.add("is-visible");
            }
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.remove("is-pending");
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { rootMargin: "0px 0px -12% 0px", threshold: 0.05 });

        items.forEach(function (item) {
            item.classList.add("is-pending");
            observer.observe(item);
        });
    }

    /* ---------- click to load video, swaps the facade for the real embed ---------- */

    function initVideos() {
        document.addEventListener("click", function (e) {
            var btn = e.target.closest(".video__btn");
            if (!btn) {
                return;
            }

            var shell = btn.closest(".video__shell");
            var id = shell.getAttribute("data-video");
            var start = shell.getAttribute("data-start");
            if (!id) {
                return;
            }

            var src = "https://www.youtube-nocookie.com/embed/" + id +
                "?autoplay=1&rel=0&modestbranding=1";
            if (start) {
                src += "&start=" + start;
            }

            var frame = document.createElement("iframe");
            frame.setAttribute("src", src);
            frame.setAttribute("title", btn.getAttribute("data-title") || "YouTube video");
            frame.setAttribute("allow",
                "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
            frame.setAttribute("allowfullscreen", "");
            frame.setAttribute("loading", "lazy");

            shell.innerHTML = "";
            shell.appendChild(frame);
        });
    }

    /* ---------- before / after comparison slider ---------- */

    function initCompare() {
        var sliders = document.querySelectorAll(".compare");

        sliders.forEach(function (slider) {
            var dragging = false;

            function setFromEvent(e) {
                var rect = slider.getBoundingClientRect();
                var x = e.clientX - rect.left;
                var pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
                slider.style.setProperty("--pos", pct + "%");
                slider.setAttribute("aria-valuenow", Math.round(pct));
            }

            slider.addEventListener("pointerdown", function (e) {
                dragging = true;
                slider.setPointerCapture(e.pointerId);
                setFromEvent(e);
            });

            slider.addEventListener("pointermove", function (e) {
                if (dragging) {
                    setFromEvent(e);
                }
            });

            slider.addEventListener("pointerup", function () {
                dragging = false;
            });

            slider.addEventListener("pointercancel", function () {
                dragging = false;
            });

            slider.addEventListener("keydown", function (e) {
                var current = parseFloat(slider.getAttribute("aria-valuenow") || "50");
                var step = e.shiftKey ? 10 : 2;
                if (e.key === "ArrowLeft") {
                    current -= step;
                } else if (e.key === "ArrowRight") {
                    current += step;
                } else {
                    return;
                }
                e.preventDefault();
                current = Math.max(0, Math.min(100, current));
                slider.style.setProperty("--pos", current + "%");
                slider.setAttribute("aria-valuenow", Math.round(current));
            });
        });
    }

    /* ---------- copy button on code blocks ---------- */

    function initCodeCopy() {
        var blocks = document.querySelectorAll(".prose .highlight, .prose > pre");

        blocks.forEach(function (block) {
            var pre = block.matches("pre") ? block : block.querySelector("pre");
            if (!pre) {
                return;
            }

            var wrap = document.createElement("div");
            wrap.className = "code-block";
            block.parentNode.insertBefore(wrap, block);
            wrap.appendChild(block);

            var btn = document.createElement("button");
            btn.className = "code-copy";
            btn.type = "button";
            btn.textContent = "Copy";
            wrap.appendChild(btn);

            btn.addEventListener("click", function () {
                var code = pre.querySelector("code") || pre;
                var text = code.innerText;

                function done(label) {
                    btn.textContent = label;
                    window.setTimeout(function () {
                        btn.textContent = "Copy";
                    }, 1800);
                }

                if (navigator.clipboard) {
                    navigator.clipboard.writeText(text).then(function () {
                        done("Copied");
                    }, function () {
                        done("Failed");
                    });
                } else {
                    done("Failed");
                }
            });
        });
    }

    /* Native dialog keeps focus inside the gallery and restores it on close. */
    function initGallery() {
        var links = Array.from(document.querySelectorAll("[data-gallery-image]"));
        var dialog = document.querySelector(".image-dialog");
        if (!links.length || !dialog || typeof dialog.showModal !== "function") return;
        var current = 0;
        var image = dialog.querySelector(".image-dialog__image");
        var caption = dialog.querySelector(".image-dialog__caption");
        var counter = dialog.querySelector("[data-gallery-count]");
        function show(index) {
            current = (index + links.length) % links.length;
            image.src = links[current].href;
            image.alt = links[current].querySelector("img").alt;
            caption.textContent = links[current].getAttribute("data-caption");
            counter.textContent = (current + 1) + " / " + links.length;
        }
        links.forEach(function (link, index) {
            link.addEventListener("click", function (event) {
                event.preventDefault();
                show(index);
                dialog.showModal();
                document.documentElement.classList.add("has-lightbox");
            });
        });
        dialog.querySelector(".image-dialog__close").addEventListener("click", function () { dialog.close(); });
        dialog.querySelector("[data-gallery-prev]").addEventListener("click", function () { show(current - 1); });
        dialog.querySelector("[data-gallery-next]").addEventListener("click", function () { show(current + 1); });
        dialog.addEventListener("keydown", function (event) {
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                event.preventDefault();
                show(current + (event.key === "ArrowLeft" ? -1 : 1));
            }
        });
        dialog.addEventListener("click", function (event) { if (event.target === dialog) dialog.close(); });
        dialog.addEventListener("close", function () { document.documentElement.classList.remove("has-lightbox"); });
    }
    /* ---------- boot ---------- */

    function init() {
        initScrollState();
        initNav();
        initReveal();
        initVideos();
        initCompare();
        initCodeCopy();
        initGallery();
        document.querySelectorAll("[data-scene-viewer]").forEach(function (viewer) {
            viewer.querySelectorAll("[data-scene]").forEach(function (button) {
                button.addEventListener("click", function () {
                    viewer.querySelectorAll("[data-scene]").forEach(function (item) {
                        var selected = item === button;
                        item.setAttribute("aria-pressed", String(selected));
                        document.getElementById(item.getAttribute("aria-controls")).hidden = !selected;
                    });
                });
            });
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
}());
