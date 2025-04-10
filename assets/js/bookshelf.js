/**
 * Bookshelf navigation functionality
 * Handles active state of category navigation links based on scroll position
 */
(function () {
  "use strict";

  window.addEventListener("load", function () {
    const categoryNav = document.querySelector(".category-nav");
    if (!categoryNav) return;

    const categoryLinks = categoryNav.querySelectorAll("a");
    const sections = document.querySelectorAll(".book-category");

    // Function to get responsive offset based on screen width
    function getResponsiveOffset() {
      const navbarHeight = 62; // Base navbar height
      const categoryNavHeight = categoryNav.offsetHeight;
      return navbarHeight + categoryNavHeight + 5;
    }

    // Get section positions and IDs with a function to refresh them
    let sectionPositions = [];

    function updateSectionPositions() {
      sectionPositions = [];
      sections.forEach((section) => {
        sectionPositions.push({
          id: section.getAttribute("id"),
          top: section.offsetTop,
          bottom: section.offsetTop + section.offsetHeight,
        });
      });
    }

    // Initial calculation
    updateSectionPositions();

    // Function to find which section is in view
    function getCurrentSection() {
      const currentOffset = getResponsiveOffset();
      const scrollPosition = window.scrollY + currentOffset;

      // Find the section that contains the current scroll position
      for (let i = 0; i < sectionPositions.length; i++) {
        const section = sectionPositions[i];
        if (scrollPosition >= section.top && scrollPosition < section.bottom) {
          return section.id;
        }
      }

      // If we're at the very bottom of the page, return the last section
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        return sectionPositions[sectionPositions.length - 1].id;
      }

      // Find the nearest section instead of defaulting to first
      let nearestSection = null;
      let minDistance = Infinity;

      for (let i = 0; i < sectionPositions.length; i++) {
        const section = sectionPositions[i];
        const distanceToTop = Math.abs(scrollPosition - section.top);
        const distanceToBottom = Math.abs(scrollPosition - section.bottom);
        const minSectionDistance = Math.min(distanceToTop, distanceToBottom);

        if (minSectionDistance < minDistance) {
          minDistance = minSectionDistance;
          nearestSection = section.id;
        }
      }

      return nearestSection || (sectionPositions.length > 0 ? sectionPositions[0].id : "");
    }

    // Function to update active link
    function updateActiveLink(sectionId) {
      if (!sectionId) return;

      categoryLinks.forEach((link) => {
        const linkTarget = link.getAttribute("href").substring(1);
        if (linkTarget === sectionId) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    }

    // Add click listeners to nav links
    categoryLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          // Update active state immediately for better UX
          categoryLinks.forEach((l) => l.classList.remove("active"));
          this.classList.add("active");

          // Calculate scroll position with responsive offset
          const currentOffset = getResponsiveOffset();
          const scrollToPosition = targetSection.offsetTop - currentOffset;

          // Scrolling behavior
          window.scrollTo({
            top: scrollToPosition,
            behavior: "auto",
          });
        }
      });
    });

    // Handle scroll events with throttling for performance
    let isScrolling = false;
    window.addEventListener("scroll", function () {
      if (!isScrolling) {
        window.requestAnimationFrame(function () {
          const currentSection = getCurrentSection();
          updateActiveLink(currentSection);
          isScrolling = false;
        });
        isScrolling = true;
      }
    });

    // Update positions on window resize
    let resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        updateSectionPositions();
        const currentSection = getCurrentSection();
        updateActiveLink(currentSection);
      }, 250);
    });

    // Set initial active link
    setTimeout(updateActiveLink.bind(null, getCurrentSection()), 100);
  });
})();
