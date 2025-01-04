// 获取模态框元素
var modal = document.getElementById("modal");

// 获取模态框内容元素
var modalImg = document.getElementById("modal-img");
var captionText = document.getElementById("caption");
var resolutionText = document.getElementById("resolution");
var watermark = document.querySelector(".watermark");

// 获取所有图片和缩略图容器
var images = document.querySelectorAll('.gallery-item img');
var thumbnailsContainer = document.querySelector('.thumbnails');
var currentIndex = 0;
var scale = 1; // 初始缩放比例
var isDragging = false;
var startX, startY, scrollLeft, scrollTop;

// 为每张图片创建缩略图并添加点击事件
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

// 打开模态框
function openModal(index) {
    currentIndex = index;
    scale = 1; // 重置缩放比例
    modal.style.display = "block";
    updateModalContent();
}

// 关闭模态框
function closeModal() {
    modal.style.display = "none";
}

// 更新模态框内容
function updateModalContent() {
    var img = images[currentIndex];
    modalImg.style.backgroundImage = `url(${img.src})`;
    modalImg.style.transform = `scale(${scale})`;
    modalImg.style.width = '100%'; // 适应模态框的宽度
    modalImg.style.height = '100%'; // 保持宽高比
    captionText.innerHTML = img.alt;
    watermark.style.display = "block"; // 显示水印
    updateThumbnails();
}

// 更新缩略图高亮
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

// 获取关闭按钮并添加点击事件
var span = document.getElementsByClassName("close")[0];
span.onclick = function () {
    closeModal();
    watermark.style.display = "none"; // 关闭模态框时隐藏水印
}

// 切换图片的前后控件
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

// 添加键盘导航功能
document.addEventListener('keydown', function(event) {
    if (modal.style.display === 'block') {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
            plusSlides(-1);
        } else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
            plusSlides(1);
        } else if (event.key === 'Escape') {
            closeModal();
            watermark.style.display = "none"; // 关闭模态框时隐藏水印
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
    const walkX = (x - startX) * 2; // 调整图片移动速度
    const walkY = (y - startY) * 2; // 调整图片移动速度
    modalImg.scrollLeft = scrollLeft - walkX;
    modalImg.scrollTop = scrollTop - walkY;
});




// 高亮侧边栏的活动部分
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

    // 如果页面滚动到顶部，移除所有激活状态
    if (window.pageYOffset === 0) {
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
    }
});

// 更新滚动时的缩略图高亮
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
}S