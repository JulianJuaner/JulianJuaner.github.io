// Get modal element
var modal = document.getElementById("modal");

// Get modal content elements
var modalImg = document.getElementById("modal-img");
var captionText = document.getElementById("caption");
var resolutionText = document.getElementById("resolution");
var watermark = document.querySelector(".watermark");

// Get all images and thumbnails container
var images = document.querySelectorAll('.gallery-item img');
var thumbnailsContainer = document.querySelector('.thumbnails');
var currentIndex = 0;
var scale = 1; // Initial zoom ratio
var isDragging = false;
var startX, startY, scrollLeft, scrollTop;

// Create a thumbnail for each image and add click event
images.forEach((img, index) => {
    var thumbnail = img.cloneNode(true);
    thumbnail.classList.remove('gallery-image');
    thumbnail.classList.add('thumbnail');
    thumbnailsContainer.appendChild(thumbnail);

    img.onclick = function () {
        openModal(index);
    }

    thumbnail.onclick = function () {
        openModal(index);
    }
});

// Open modal
function openModal(index) {
    currentIndex = index;
    scale = 1; // Reset zoom ratio
    modal.style.display = "block";
    updateModalContent();
}

// Close modal
function closeModal() {
    modal.style.display = "none";
}

// Update modal content
function updateModalContent() {
    var img = images[currentIndex];
    modalImg.style.backgroundImage = `url(${img.src})`;
    modalImg.style.transform = `scale(${scale})`;
    modalImg.style.width = '100%'; // Fit modal width
    modalImg.style.height = '100%'; // Maintain aspect ratio
    captionText.innerHTML = img.alt;
    watermark.style.display = "block"; // Show watermark
    updateThumbnails();
}

// Update thumbnail highlight
function updateThumbnails() {
    var thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumbnail, index) => {
        if (index === currentIndex) {
            thumbnail.classList.add('thumbnail-active');
            thumbnail.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            thumbnail.classList.remove('thumbnail-active');
        }
    });
}

// Get close button and add click event
var span = document.getElementsByClassName("close")[0];
span.onclick = function () {
    closeModal();
    watermark.style.display = "none"; // Hide watermark when closing modal
}

// Controls for switching images
function plusSlides(n) {
    currentIndex += n;
    if (currentIndex >= images.length) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }
    updateModalContent();
}

var prev = document.querySelector('.prev');
var next = document.querySelector('.next');

prev.onclick = function () {
    plusSlides(-1);
}

next.onclick = function () {
    plusSlides(1);
}

// Add keyboard navigation
document.addEventListener('keydown', function(event) {
    if (modal.style.display === 'block') {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
            plusSlides(-1);
        } else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
            plusSlides(1);
        } else if (event.key === 'Escape') {
            closeModal();
            watermark.style.display = "none"; // Hide watermark when closing modal
        }
    }
});



modalImg.addEventListener('mouseleave', function() {
    isDragging = false;
});

modalImg.addEventListener('mouseup', function() {
    isDragging = false;
});

modalImg.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - modalImg.offsetLeft;
    const y = e.pageY - modalImg.offsetTop;
    const walkX = (x - startX) * 2; // Adjust image move speed
    const walkY = (y - startY) * 2; // Adjust image move speed
    modalImg.scrollLeft = scrollLeft - walkX;
    modalImg.scrollTop = scrollTop - walkY;
});




// Highlight the active part of the sidebar
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.gallery-section, .paper-info, .paper-citation, .contact-us');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });

    // Remove all active states if the page is scrolled to the top
    if (window.pageYOffset === 0) {
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
    }
});

// Update thumbnail highlight on scroll
window.addEventListener('scroll', () => {
    let currentIndex = -1;
    images.forEach((img, index) => {
        const rect = img.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
            currentIndex = index;
        }
    });

    if (currentIndex !== -1) {
        updateThumbnails();
    }
});



function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function isWeChat() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true
    } else{
        return false
    }
}


function dismissWarning() {
    document.getElementById('mobile-warning').style.display = 'none';
}

if (isMobileDevice() || isWeChat()) {
    document.getElementById('mobile-warning').style.display = 'block';
}