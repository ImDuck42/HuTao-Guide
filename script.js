document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('popup');
    const popupClose = document.getElementById('popup-close');
    const wrapper = document.querySelector('.wrapper');
    const toggleButtons = document.querySelectorAll('.toggle-button');

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
        });
    });
});
