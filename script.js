document.addEventListener('DOMContentLoaded', () => {
    const element = document.querySelector('.cover')
    const menuContainer = document.querySelector('.menu-container');
    const body = document.body;

    setTimeout(() => {
        element.style.display = 'none'
    },8000);

    menuContainer.addEventListener('click', () => {
        body.classList.toggle('show-menu');
    });

    const links = document.querySelectorAll('.slide-menu a');

    links.forEach(link => {
        link.addEventListener('click', () => {
            body.classList.toggle('show-menu');
            //times.classList.remove('active');
            //bars.classList.add('show')
        }); 
    });

    window.addEventListener('scroll', function() {
        var header = document.getElementById('header');
        if (window.scrollY > 0) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    // ..........elements Animation..................
    const elements = document.querySelectorAll('.element');

    const observerOptions = {
      root: null, // Use the document’s viewport as the container
      rootMargin: '0px',
      threshold: 0.1 // Trigger when 10% of the element is visible
    };
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Stop observing the element
        }
      });
    }, observerOptions);
  
    elements.forEach(element => {
      observer.observe(element);
    });
    // ...............numCounter............

    const counters = document.querySelectorAll('.count');
    const speed = 200; // The lower the slower

    const countUp = (counter) => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    };

    const observer2 = new IntersectionObserver((entries, observer2) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                countUp(counter);
                observer2.unobserve(counter);
            }
        });
    }, {
        threshold: 0.5
    });

    counters.forEach(counter => {
        observer2.observe(counter);
    });
});


let currentIndex = 0;
let slideInterval;

function showImage(index) {
    const slides = document.querySelectorAll('.slide');
    const totalImages = slides.length;
    if (index >= totalImages) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalImages - 1;
    } else {
        currentIndex = index;
    }
    const newTransform = -currentIndex * 100;
    document.querySelector('.image-wrapper').style.transform = `translateX(${newTransform}%)`;
}

function nextImage() {
    showImage(currentIndex + 1);
}

function prevImage() {
    showImage(currentIndex - 1);
}

function startSlideShow() {
    slideInterval = setInterval(() => {
        nextImage();
    }, 2600);
}

function stopSlideShow() {
    clearInterval(slideInterval);
}

// Initial display
showImage(currentIndex);
startSlideShow();

// Optionally, you can pause the slideshow when hovering over the image
document.querySelector('.image-container').addEventListener('mouseenter', stopSlideShow);
document.querySelector('.image-container').addEventListener('mouseleave', startSlideShow);
