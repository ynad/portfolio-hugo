/**
 * Portfolio — Main JavaScript
 * Handles: dark mode toggle, mobile menu, scroll animations, contact form
 */

(function () {
    "use strict";

    // =========================================================================
    // Dark Mode Toggle
    // =========================================================================

    function initThemeToggle() {
        var toggles = document.querySelectorAll(
            "#theme-toggle, #theme-toggle-mobile"
        );

        toggles.forEach(function (btn) {
            btn.addEventListener("click", function () {
                var html = document.documentElement;
                var isDark = html.classList.toggle("dark");
                localStorage.setItem("theme", isDark ? "dark" : "light");
            });
        });

        // Restore saved preference
        var saved = localStorage.getItem("theme");
        if (saved === "dark") {
            document.documentElement.classList.add("dark");
        } else if (saved === "light") {
            document.documentElement.classList.remove("dark");
        }
    }

    // =========================================================================
    // Mobile Menu
    // =========================================================================

    function initMobileMenu() {
        var btn = document.getElementById("mobile-menu-btn");
        var menu = document.getElementById("mobile-menu");

        if (!btn || !menu) return;

        btn.addEventListener("click", function () {
            var isOpen = !menu.classList.contains("hidden");
            menu.classList.toggle("hidden");
            btn.setAttribute("aria-expanded", !isOpen);
        });

        // Close menu when clicking a link
        menu.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                menu.classList.add("hidden");
                btn.setAttribute("aria-expanded", "false");
            });
        });
    }

    // =========================================================================
    // Scroll Reveal Animation
    // =========================================================================

    function initScrollReveal() {
        var elements = document.querySelectorAll(".fade-in");
        if (!elements.length) return;

        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        );

        elements.forEach(function (el) {
            observer.observe(el);
        });
    }

    // =========================================================================
    // Contact Form
    // =========================================================================

    function initContactForm() {
        var form = document.getElementById("contact-form");
        if (!form) return;

        form.addEventListener("submit", function (e) {
            e.preventDefault();

            var submitBtn = form.querySelector('button[type="submit"]');
            var statusEl = document.getElementById("form-status");
            var originalText = submitBtn.textContent;

            // Disable button
            submitBtn.disabled = true;
            submitBtn.textContent = submitBtn.dataset.loading || "Sending...";

            // Collect form data
            var data = {
                name: form.querySelector('[name="name"]').value.trim(),
                email: form.querySelector('[name="email"]').value.trim(),
                message: form.querySelector('[name="message"]').value.trim(),
                website: form.querySelector('[name="website"]')
                    ? form.querySelector('[name="website"]').value
                    : "", // honeypot
            };

            // Get endpoint from form action or data attribute
            var endpoint = form.action || form.dataset.endpoint || "/api/contact";

            fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })
                .then(function (res) {
                    if (!res.ok) throw new Error("Failed");
                    return res.json();
                })
                .then(function () {
                    if (statusEl) {
                        statusEl.textContent =
                            submitBtn.dataset.success || "Message sent successfully!";
                        statusEl.className =
                            "mt-4 text-sm font-medium text-green-600 dark:text-green-400";
                    }
                    form.reset();
                })
                .catch(function () {
                    if (statusEl) {
                        statusEl.textContent =
                            submitBtn.dataset.error || "Something went wrong. Please try again.";
                        statusEl.className =
                            "mt-4 text-sm font-medium text-red-600 dark:text-red-400";
                    }
                })
                .finally(function () {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                });
        });
    }

    // =========================================================================
    // Smooth scroll for anchor links
    // =========================================================================

    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
            anchor.addEventListener("click", function (e) {
                var target = document.querySelector(this.getAttribute("href"));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            });
        });
    }

    // =========================================================================
    // Initialize all modules
    // =========================================================================

    document.addEventListener("DOMContentLoaded", function () {
        initThemeToggle();
        initMobileMenu();
        initScrollReveal();
        initContactForm();
        initSmoothScroll();
    });
})();
