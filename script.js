document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('popup');
    const popupClose = document.getElementById('popup-close');
    const wrapper = document.querySelector('.wrapper');
    const toggleButtons = document.querySelectorAll('.toggle-button');
    const subcategoryLinks = document.querySelectorAll('.subcategory a');

    // Show popup after 500ms with blur effect on wrapper
    setTimeout(() => {
        popup.classList.add('popup-show');
        wrapper.classList.add('blur');
    }, 500);

    // Close popup when close button is clicked
    popupClose.addEventListener('click', () => {
        popup.classList.remove('popup-show');
        wrapper.classList.remove('blur');
    });

    // Close popup when clicking outside of the popup content
    window.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.classList.remove('popup-show');
            wrapper.classList.remove('blur');
        }
    });

    // Utility function to encode URL parts
    function encodeURIComponentCustom(str) {
        return encodeURIComponent(str).replace(/%20/g, '-');
    }

    // Utility function to decode URL parts
    function decodeURIComponentCustom(str) {
        return decodeURIComponent(str.replace(/-/g, ' '));
    }

    // Toggle visibility of subcategories
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const subcategory = button.nextElementSibling;
            const isVisible = subcategory.classList.contains('show');
            
            // Collapse all subcategories
            document.querySelectorAll('.subcategory').forEach(sub => {
                sub.classList.remove('show');
            });
            
            // Toggle the clicked subcategory
            subcategory.classList.toggle('show', !isVisible);

            // Update URL
            if (!isVisible) {
                const category = encodeURIComponentCustom(button.textContent.trim());
                window.history.pushState({}, '', `/${category}`);
            } else {
                window.history.pushState({}, '', window.location.pathname);
            }
        });
    });

    // Handle click on subcategory links
    subcategoryLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior

            const subcategory = link.parentElement.parentElement;
            const toggleButton = subcategory.previousElementSibling;

            // Expand the subcategory and collapse others
            document.querySelectorAll('.subcategory').forEach(sub => {
                if (sub !== subcategory) {
                    sub.classList.remove('show');
                }
            });
            
            subcategory.classList.add('show');

            // Update URL
            const category = encodeURIComponentCustom(toggleButton.textContent.trim());
            const item = encodeURIComponentCustom(link.textContent.trim());
            window.history.pushState({}, '', `/${category}/${item}`);
        });
    });

    // Handle URL changes
    function handleCategoryFromURL() {
        const path = window.location.pathname.substring(1); // Get path without '/'
        const [category, item] = path.split('/'); // Split path into category and item

        // Show subcategory based on URL
        if (category) {
            const decodedCategory = decodeURIComponentCustom(category);
            const categoryButtons = Array.from(toggleButtons);
            categoryButtons.forEach(button => {
                if (button.textContent.trim() === decodedCategory) {
                    button.click(); // Simulate click on button to show subcategories
                    if (item) {
                        const decodedItem = decodeURIComponentCustom(item);
                        const subcategory = button.nextElementSibling;
                        const links = subcategory.querySelectorAll('a');
                        links.forEach(link => {
                            if (link.textContent.trim() === decodedItem) {
                                link.classList.add('active'); // Optional: Highlight active link
                            }
                        });
                    }
                }
            });
        }
    }

    // Initial load
    handleCategoryFromURL();

    // Handle browser navigation
    window.addEventListener('popstate', handleCategoryFromURL);
});
