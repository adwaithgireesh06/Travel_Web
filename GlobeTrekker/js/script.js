/*==================== SHOW MENU ====================*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle');

/*===== MENU SHOW =====*/
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.toggle('show-menu');
    });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction(){
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader(){
    const header = document.getElementById('header');
    if(this.scrollY >= 50) header.classList.add('scroll-header'); 
    else header.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/*==================== SCROLL REVEAL ANIMATION ====================*/
const cards = document.querySelectorAll('.destination__card');

const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach((entry, index) => {
        if (!entry.isIntersecting) {
            return;
        } else {
            // Add a small delay based on index for a staggered effect
            setTimeout(() => {
                entry.target.classList.add('reveal');
            }, index * 150);
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

cards.forEach(card => {
    revealOnScroll.observe(card);
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== MODAL ====================*/
const modal = document.getElementById('destination-modal');
const modalClose = document.getElementById('modal-close');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalPackagesList = document.getElementById('modal-packages-list');
const viewPackagesBtns = document.querySelectorAll('.view-packages-btn');

const packagesData = {
    beach: {
        img: 'images/beach.png',
        title: 'Paradise Beaches',
        description: 'Escape to a tropical paradise where crystal clear waters meet pristine white sands. Enjoy luxury resorts, snorkeling adventures, and unforgettable sunsets.',
        packages: [
            '3-Day Weekend Getaway - ₹39,999',
            '7-Day Ultimate Relaxation - ₹1,05,000',
            '10-Day Island Hopping - ₹1,49,999'
        ]
    },
    mountain: {
        img: 'images/mountain.png',
        title: 'Alpine Heights',
        description: 'Discover the thrill of the mountains. From challenging hikes to world-class skiing, experience nature in its most majestic and awe-inspiring form.',
        packages: [
            '5-Day Hiking Expedition - ₹65,000',
            '7-Day Ski Resort Pass - ₹1,25,000',
            '14-Day Summit Challenge - ₹2,00,000'
        ]
    },
    city: {
        img: 'images/city.png',
        title: 'Neon Nights',
        description: 'Immerse yourself in the bustling energy of the world\'s most vibrant cities. Enjoy exclusive dining, vibrant nightlife, and rich cultural experiences.',
        packages: [
            '3-Day City Highlight Tour - ₹49,999',
            '5-Day Cultural Immersion - ₹85,000',
            '7-Day VIP Nightlife Experience - ₹1,35,000'
        ]
    }
};

viewPackagesBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const id = btn.getAttribute('data-id');
        const data = packagesData[id];
        
        modalImg.src = data.img;
        modalTitle.textContent = data.title;
        modalDescription.textContent = data.description;
        
        modalPackagesList.innerHTML = '';
        data.packages.forEach(pkg => {
            const li = document.createElement('li');
            li.textContent = pkg;
            modalPackagesList.appendChild(li);
        });
        
        modal.classList.add('active');
    });
});

if(modalClose) {
    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
    });
}

// Close modal when clicking outside of it
window.addEventListener('click', (e) => {
    if(e.target === modal) {
        modal.classList.remove('active');
    }
});
