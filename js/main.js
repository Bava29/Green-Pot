/* =========================================
   GreenPot - Main JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =========================================
       Mobile Menu
    ========================================= */

    const menuToggle = document.getElementById("menuToggle");
    const menuClose = document.getElementById("menuClose");
    const mainNavigation = document.getElementById("mainNavigation");
    const menuOverlay = document.getElementById("menuOverlay");


    function openMenu() {

        mainNavigation.classList.add("active");
        menuOverlay.classList.add("active");

        menuToggle.setAttribute("aria-expanded", "true");

        document.body.style.overflow = "hidden";
    }


    function closeMenu() {

        mainNavigation.classList.remove("active");
        menuOverlay.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

        document.body.style.overflow = "";
    }


    if (menuToggle) {
        menuToggle.addEventListener("click", function () {
            openMenu();
        });
    }


    if (menuClose) {
        menuClose.addEventListener("click", function () {
            closeMenu();
        });
    }


    if (menuOverlay) {
        menuOverlay.addEventListener("click", function () {
            closeMenu();
        });
    }


    /* =========================================
       Close Menu When Navigation Link Clicked
    ========================================= */

    const navigationLinks =
        document.querySelectorAll(".nav-menu a");

    navigationLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            /*
             * Only close if it is not a dropdown parent.
             * Normal links will close the mobile menu.
             */

            const parentItem = link.closest(".has-dropdown");

            if (!parentItem) {
                closeMenu();
            }

        });

    });


    /* =========================================
       Mobile Dropdown
    ========================================= */

    const dropdownParents =
        document.querySelectorAll(".nav-item.has-dropdown > a");


    dropdownParents.forEach(function (dropdownLink) {

        dropdownLink.addEventListener("click", function (event) {

            /*
             * On mobile/tablet only
             */

            if (window.innerWidth <= 1199) {

                event.preventDefault();

                const parent = dropdownLink.parentElement;

                parent.classList.toggle("dropdown-open");

            }

        });

    });


    /* =========================================
       Close Menu On Resize
    ========================================= */

    window.addEventListener("resize", function () {

        if (window.innerWidth > 1199) {

            closeMenu();

            document
                .querySelectorAll(".nav-item.dropdown-open")
                .forEach(function (item) {

                    item.classList.remove("dropdown-open");

                });

        }

    });


    /* =========================================
       Dark Mode
    ========================================= */

    const themeToggles =
        document.querySelectorAll(".theme-toggle, #themeToggle");


    function updateThemeIcons() {

        const isDark =
            document.documentElement.classList.contains("dark-mode");


        themeToggles.forEach(function (toggle) {

            const icon = toggle.querySelector("i");

            if (!icon) return;


            if (isDark) {

                /*
                 * Dark Mode ON
                 * Moon -> Sun
                 */

                icon.classList.remove("fa-moon");
                icon.classList.add("fa-sun");

                toggle.setAttribute(
                    "aria-label",
                    "Switch to Light Mode"
                );

                toggle.setAttribute(
                    "title",
                    "Light Mode"
                );

            } else {

                /*
                 * Light Mode
                 * Sun -> Moon
                 */

                icon.classList.remove("fa-sun");
                icon.classList.add("fa-moon");

                toggle.setAttribute(
                    "aria-label",
                    "Switch to Dark Mode"
                );

                toggle.setAttribute(
                    "title",
                    "Dark Mode"
                );

            }

        });

    }


    function setTheme(theme) {

        if (theme === "dark") {

            document.documentElement.classList.add("dark-mode");

            localStorage.setItem(
                "greenpot-theme",
                "dark"
            );

        } else {

            document.documentElement.classList.remove("dark-mode");

            localStorage.setItem(
                "greenpot-theme",
                "light"
            );

        }

        updateThemeIcons();
    }


    /*
     * Load Saved Theme
     */

    const savedTheme =
        localStorage.getItem("greenpot-theme");


    if (savedTheme === "dark") {

        setTheme("dark");

    } else {

        setTheme("light");

    }


    /*
     * Theme Toggle Click
     */

    themeToggles.forEach(function (toggle) {

        toggle.addEventListener("click", function () {

            const isDark =
                document.documentElement.classList.contains(
                    "dark-mode"
                );


            if (isDark) {

                setTheme("light");

            } else {

                setTheme("dark");

            }

        });

    });


    /* =========================================
       RTL Mode
    ========================================= */

    const rtlToggles =
        document.querySelectorAll(".rtl-toggle, #rtlToggle");


    function updateRtlState() {

        const isRTL =
            document.documentElement.getAttribute("dir") === "rtl";


        rtlToggles.forEach(function (toggle) {

            if (isRTL) {

                toggle.classList.add("active");

                toggle.setAttribute(
                    "aria-label",
                    "Switch to LTR"
                );

                toggle.setAttribute(
                    "title",
                    "LTR Mode"
                );

            } else {

                toggle.classList.remove("active");

                toggle.setAttribute(
                    "aria-label",
                    "Switch to RTL"
                );

                toggle.setAttribute(
                    "title",
                    "RTL Mode"
                );

            }

        });

    }


    function setDirection(direction) {

        if (direction === "rtl") {

            document.documentElement.setAttribute(
                "dir",
                "rtl"
            );

            document.documentElement.setAttribute(
                "lang",
                "ar"
            );

            localStorage.setItem(
                "greenpot-direction",
                "rtl"
            );

        } else {

            document.documentElement.setAttribute(
                "dir",
                "ltr"
            );

            document.documentElement.setAttribute(
                "lang",
                "en"
            );

            localStorage.setItem(
                "greenpot-direction",
                "ltr"
            );

        }

        updateRtlState();
    }


    /*
     * Load Saved Direction
     */

    const savedDirection =
        localStorage.getItem("greenpot-direction");


    if (savedDirection === "rtl") {

        setDirection("rtl");

    } else {

        setDirection("ltr");

    }


    /*
     * RTL Toggle Click
     */

    rtlToggles.forEach(function (toggle) {

        toggle.addEventListener("click", function () {

            const isRTL =
                document.documentElement.getAttribute("dir") === "rtl";


            if (isRTL) {

                setDirection("ltr");

            } else {

                setDirection("rtl");

            }

        });

    });


    /* =========================================
       Indoor Plants Controls
    ========================================= */

    const plantFilter = document.getElementById("plant-filter");
    const plantSort = document.getElementById("plant-sort");
    const plantSearch = document.getElementById("plant-search");
    const clearFiltersButton = document.getElementById("clear-filters");
    const plantCollectionTitle = document.getElementById(
        "plant-collection-title"
    );
    const plantResultCount = document.getElementById("plant-result-count");
    const plantResultSummary = document.getElementById(
        "plant-result-summary"
    );
    const productGrid = document.querySelector(".category-product-grid");

    if (plantFilter && plantSort && productGrid) {

        const allowedFilters = new Set([
            "all",
            "easy-care",
            "low-light",
            "air-purifying",
            "statement"
        ]);

        const allowedSorts = new Set([
            "featured",
            "low-high",
            "high-low",
            "name"
        ]);

        const filterLabels = {
            all: "All Plants",
            "easy-care": "Easy Care",
            "low-light": "Low Light",
            "air-purifying": "Air Purifying",
            statement: "Statement Plants"
        };

        const defaultState = {
            filter: "all",
            sort: "featured",
            search: ""
        };

        const productMeta = {
            "Monstera Deliciosa": {
                categories: ["easy-care", "air-purifying", "low-light"],
                price: 899
            },
            "Peace Lily": {
                categories: ["air-purifying", "low-light"],
                price: 649
            },
            "Fiddle Leaf Fig": {
                categories: ["statement"],
                price: 1299
            },
            "Snake Plant": {
                categories: ["easy-care", "low-light", "air-purifying"],
                price: 549
            },
            "ZZ Plant": {
                categories: ["easy-care", "low-light"],
                price: 699
            },
            "Rubber Plant": {
                categories: ["easy-care", "air-purifying", "statement"],
                price: 799
            },
            "Areca Palm": {
                categories: ["air-purifying"],
                price: 899
            },
            "Calathea Orbifolia": {
                categories: ["low-light", "statement"],
                price: 999
            },
            Philodendron: {
                categories: ["easy-care", "low-light", "air-purifying"],
                price: 749
            },
            "Boston Fern": {
                categories: ["air-purifying"],
                price: 599
            },
            "Chinese Evergreen": {
                categories: ["easy-care", "low-light", "air-purifying"],
                price: 699
            },
            Dracaena: {
                categories: ["easy-care", "low-light", "air-purifying"],
                price: 849
            },
            "Bird of Paradise": {
                categories: ["statement"],
                price: 1499
            },
            "Spider Plant": {
                categories: ["easy-care", "low-light", "air-purifying"],
                price: 499
            },
            "Money Plant": {
                categories: ["easy-care", "low-light", "air-purifying"],
                price: 399
            },
            "Golden Pothos": {
                categories: ["easy-care", "low-light", "air-purifying"],
                price: 449
            },
            "Parlor Palm": {
                categories: ["low-light", "air-purifying"],
                price: 749
            },
            Alocasia: {
                categories: ["statement"],
                price: 1099
            }
        };

        const state = {
            filter: defaultState.filter,
            sort: defaultState.sort,
            search: defaultState.search
        };

        const productCards = Array.from(
            productGrid.querySelectorAll(".category-product-card")
        );

        let noResultsMessage = null;

        function normalizeText(value) {
            return String(value || "")
                .toLowerCase()
                .replace(/-/g, " ")
                .replace(/\s+/g, " ")
                .trim();
        }

        function parsePrice(value) {
            const numericValue =
                String(value || "").replace(/[^0-9]/g, "");

            return Number(numericValue) || 0;
        }

        function getFilterLabel(filterValue) {
            return filterLabels[filterValue] || filterLabels.all;
        }

        function pluralizePlant(count) {
            return count === 1 ? "plant" : "plants";
        }

        function readURLState() {
            const url = new URL(window.location.href);
            const urlFilter = url.searchParams.get("filter");
            const urlSort = url.searchParams.get("sort");

            const hasValidFilter =
                !urlFilter || allowedFilters.has(urlFilter);

            const hasValidSort =
                !urlSort || allowedSorts.has(urlSort);

            if (!hasValidFilter || !hasValidSort) {
                return { ...defaultState };
            }

            return {
                filter: urlFilter || defaultState.filter,
                sort: urlSort || defaultState.sort,
                search: defaultState.search
            };
        }

        function updateURL() {
            const url = new URL(window.location.href);

            if (state.filter === defaultState.filter) {
                url.searchParams.delete("filter");
            } else {
                url.searchParams.set("filter", state.filter);
            }

            if (state.sort === defaultState.sort) {
                url.searchParams.delete("sort");
            } else {
                url.searchParams.set("sort", state.sort);
            }

            const nextURL =
                url.searchParams.toString() ?
                    `${url.pathname}?${url.searchParams.toString()}${url.hash}` :
                    `${url.pathname}${url.hash}`;

            history.replaceState({}, "", nextURL);
        }

        function setCardVisibility(card, shouldShow) {
            card.classList.toggle("is-hidden", !shouldShow);
        }

        function initializeProducts() {
            productCards.forEach(function (card, index) {
                const nameElement = card.querySelector(
                    ".category-product-content h3"
                );
                const categoryElement = card.querySelector(
                    ".category-product-content > span"
                );
                const priceElement = card.querySelector(
                    ".product-bottom strong"
                );

                const name = normalizeText(
                    nameElement ? nameElement.textContent : ""
                );
                const visibleCategory = normalizeText(
                    categoryElement ? categoryElement.textContent : ""
                );
                const priceText = priceElement ? priceElement.textContent : "";
                const meta = productMeta[
                    nameElement ? nameElement.textContent.trim() : ""
                ] || {};
                const categories = Array.isArray(meta.categories) ?
                    meta.categories :
                    [];
                const price = meta.price || parsePrice(priceText);

                card.dataset.name =
                    nameElement ? nameElement.textContent.trim() : "";
                card.dataset.price = String(price);
                card.dataset.category = categories.join(" ");
                card.dataset.originalIndex = String(index);
                card.dataset.searchText = normalizeText(
                    [
                        card.dataset.name,
                        visibleCategory,
                        categories.join(" ")
                    ].join(" ")
                );

                if (!card.dataset.category) {
                    card.dataset.category = visibleCategory;
                }
            });

            const initialState = readURLState();

            state.filter = initialState.filter;
            state.sort = initialState.sort;
            state.search = initialState.search;

            plantFilter.value = state.filter;
            plantSort.value = state.sort;

            if (plantSearch) {
                plantSearch.value = state.search;
            }

            renderProducts();
            handleWishlist();
        }

        function applyFilters() {
            const searchValue = normalizeText(state.search);

            return productCards.filter(function (card) {
                const categories = normalizeText(card.dataset.category);
                const searchableText = normalizeText(
                    card.dataset.searchText || card.dataset.name || ""
                );
                const matchesCategory =
                    state.filter === defaultState.filter ||
                    categories.split(" ").includes(state.filter);
                const matchesSearch =
                    !searchValue ||
                    searchableText.includes(searchValue);

                return matchesCategory && matchesSearch;
            });
        }

        function applySorting(cards) {
            const sortedCards = cards.slice();

            sortedCards.sort(function (firstCard, secondCard) {
                if (state.sort === "low-high") {
                    return (
                        Number(firstCard.dataset.price) -
                        Number(secondCard.dataset.price)
                    );
                }

                if (state.sort === "high-low") {
                    return (
                        Number(secondCard.dataset.price) -
                        Number(firstCard.dataset.price)
                    );
                }

                if (state.sort === "name") {
                    return (
                        firstCard.dataset.name.localeCompare(
                            secondCard.dataset.name
                        )
                    );
                }

                return (
                    Number(firstCard.dataset.originalIndex) -
                    Number(secondCard.dataset.originalIndex)
                );
            });

            return sortedCards;
        }

        function updateProductCount(visibleCount) {
            const totalCount = productCards.length;
            const filterLabel = getFilterLabel(state.filter);

            if (plantCollectionTitle) {
                plantCollectionTitle.textContent = filterLabel;
            }

            if (plantResultCount) {
                plantResultCount.textContent =
                    `${visibleCount} ${pluralizePlant(visibleCount)}`;
            }

            if (plantResultSummary) {
                plantResultSummary.textContent =
                    `Showing ${visibleCount} of ${totalCount} ${pluralizePlant(totalCount)}`;
            }
        }

        function renderProducts() {
            const filteredCards = applyFilters();
            const sortedCards = applySorting(productCards);
            const visibleCards = new Set(filteredCards);
            const fragment = document.createDocumentFragment();

            sortedCards.forEach(function (card) {
                const shouldShow = visibleCards.has(card);

                setCardVisibility(card, shouldShow);
                fragment.appendChild(card);
            });

            productGrid.appendChild(fragment);

            if (filteredCards.length === 0) {
                if (!noResultsMessage) {
                    noResultsMessage = document.createElement("div");
                    noResultsMessage.className = "category-no-results";
                    noResultsMessage.setAttribute("role", "status");
                    noResultsMessage.setAttribute("aria-live", "polite");
                    noResultsMessage.innerHTML = `
                        <h3>No plants found</h3>
                        <p>Try another filter to discover more indoor plants.</p>
                        <button type="button" class="btn-primary" id="no-results-clear">
                            Clear Filters
                        </button>
                    `;
                }

                productGrid.appendChild(noResultsMessage);

                const noResultsClear = noResultsMessage.querySelector(
                    "#no-results-clear"
                );

                if (noResultsClear && !noResultsClear.dataset.bound) {
                    noResultsClear.dataset.bound = "true";
                    noResultsClear.addEventListener("click", clearFilters);
                }

            } else if (noResultsMessage && noResultsMessage.parentElement) {
                noResultsMessage.parentElement.removeChild(noResultsMessage);
            }

            updateProductCount(filteredCards.length);
            updateURL();

        }

        function clearFilters() {
            state.filter = defaultState.filter;
            state.sort = defaultState.sort;
            state.search = defaultState.search;

            plantFilter.value = state.filter;
            plantSort.value = state.sort;

            if (plantSearch) {
                plantSearch.value = state.search;
            }

            renderProducts();
        }

        function handleWishlist() {
            productGrid.addEventListener("click", function (event) {
                const wishlistButton = event.target.closest(".product-wishlist");

                if (!wishlistButton || !productGrid.contains(wishlistButton)) {
                    return;
                }

                const wishlistIcon = wishlistButton.querySelector("i");
                const isActive =
                    wishlistButton.getAttribute("aria-pressed") === "true";

                if (wishlistIcon) {
                    wishlistIcon.classList.toggle("fa-regular", isActive);
                    wishlistIcon.classList.toggle("fa-solid", !isActive);
                }

                wishlistButton.setAttribute(
                    "aria-pressed",
                    String(!isActive)
                );

                wishlistButton.setAttribute(
                    "aria-label",
                    isActive ? "Add to wishlist" : "Remove from wishlist"
                );
            });
        }

        plantFilter.addEventListener("change", function () {
            state.filter = allowedFilters.has(plantFilter.value) ?
                plantFilter.value :
                defaultState.filter;

            renderProducts();
        });

        plantSort.addEventListener("change", function () {
            state.sort = allowedSorts.has(plantSort.value) ?
                plantSort.value :
                defaultState.sort;

            renderProducts();
        });

        if (plantSearch) {
            plantSearch.addEventListener("input", function () {
                state.search = plantSearch.value;
                renderProducts();
            });
        }

        if (clearFiltersButton) {
            clearFiltersButton.addEventListener("click", clearFilters);
        }

        initializeProducts();
    }


});

/* =========================================
   Scroll To Top
========================================= */

const scrollTopButton = document.getElementById("scrollTop");

if (scrollTopButton) {

    window.addEventListener("scroll", function () {

        if (window.scrollY > 400) {

            scrollTopButton.classList.add("show");

        } else {

            scrollTopButton.classList.remove("show");

        }

    });


    scrollTopButton.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}
