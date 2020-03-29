import { Carousel } from './js/Carousel';
import { QuoteModal } from "./js/QuoteModal";

window.onload = () => {
    new Carousel();
    document.querySelector('.portfolio-tags').addEventListener('click', selectPortfolioTag);
    document.querySelector('.portfolio-works-container').addEventListener('click', selectPortfolio);
    document.querySelector('.form-quote__submit').addEventListener('click', submitQuote);
    document.querySelector('.navigation').addEventListener('click', navigationLinks);
    document.querySelector('.iphone').addEventListener('click', toggleIphoneScreen);
    window.addEventListener('scroll', scrollPage);
    document.querySelector('.header__hamburger').addEventListener('click', toggleNavigation);
};

function toggleNavigation() {
    this.classList.toggle('expanded');
    let nav = document.querySelector('.header__navigation');
    nav.classList.toggle('expanded');
}

function toggleIphoneScreen(event) {
    if (event.target.classList.contains('iphone__home-btn')) {
        let parent = event.target.closest('div');
        let getScreen = parent.querySelector('.iphone__screen');
        if (getScreen) {
            getScreen.classList.toggle('iphone__screen-disabled');
        }
    }
}

const headerHeight = document.querySelector('.header').offsetHeight;
const servicesTop = document.querySelector('.services').offsetTop;
const portfolioTop = document.querySelector('.portfolio').offsetTop;
const aboutUsTop = document.querySelector('.about-us').offsetTop;
const getQuoteTop = document.querySelector('.get-quote').offsetTop;

function scrollPage() {
    let y = window.scrollY;
    if (y < servicesTop - headerHeight) {
        removeLinksActive();
        document.querySelector('#home-link').classList.add('nav__link-active');
    }
    if (y >= servicesTop - headerHeight && y < portfolioTop - headerHeight) {
        removeLinksActive();
        document.querySelector('#services-link').classList.add('nav__link-active');
    }
    if (y >= portfolioTop - headerHeight && y < aboutUsTop - headerHeight) {
        removeLinksActive();
        document.querySelector('#portfolio-link').classList.add('nav__link-active');
    }
    if (y >= aboutUsTop - headerHeight && y < getQuoteTop - headerHeight) {
        removeLinksActive();
        document.querySelector('#about-link').classList.add('nav__link-active');
    }
    if (y >= getQuoteTop - headerHeight) {
        removeLinksActive();
        document.querySelector('#contact-link').classList.add('nav__link-active');
    }
}

function navigationLinks(event) {
    if (event.target.tagName == 'A') {
        event.preventDefault();
        removeLinksActive();
        let anchor = event.target.closest('.nav__link > a').getAttribute('href');
        goToAnchor(anchor);
        event.target.closest('.nav__link').classList.add('nav__link-active');
    }

}

function goToAnchor(anchorId) {
    if (anchorId) {
        let anchor = document.querySelector(anchorId);
        anchor.scrollIntoView({ behavior: "smooth"});
    }

}

function removeLinksActive() {
    document.querySelectorAll('.navigation > .nav__link').forEach(link => {
        link.classList.remove('nav__link-active');
    });
}

/******************
 *  Portfolio
 ******************/

function selectPortfolioTag(event) {
    if (event.target.classList.contains('tag')) {
        let clickedTag = event.target;
        removeSelectedTags();
        selectClickedTag(clickedTag);
        shufflePortfolios();
    }
}

function removeSelectedTags() {
    let tags = document.querySelectorAll('.portfolio-tags .tag');
    if (tags) {
        tags.forEach(tag => {
            tag.classList.remove('tag_selected');
            tag.classList.add('tag_bordered');
        });
    }
}

function selectClickedTag (clickedTag) {
    clickedTag.classList.add('tag_selected');
    clickedTag.classList.remove('tag_bordered');
}

function shufflePortfolios() {
    let portfolios = document.querySelectorAll('.portfolio-works-container > *');
    if (portfolios) {
        portfolios.forEach(portfolio =>
            portfolio.className = `portfolio-work-${Math.ceil(Math.random() * 12)}`
        );
    }
}

function selectPortfolio(event) {
    let portfolios = document.querySelectorAll('img[class^="portfolio-work-"]');
    if (portfolios) {
        portfolios.forEach(portfolio => {
            if (event.target.classList.contains(portfolio.className)) {
                unselectPortfolios(portfolios);
                event.target.classList.add('portfolio_selected');
            }
        });
    }
}

function unselectPortfolios(portfolios) {
    if (portfolios) {
        portfolios.forEach(portfolio => {
            portfolio.classList.remove('portfolio_selected');
        });
    }
}

/******************
 *  Get a quote
 ******************/

function submitQuote(event) {
    let requiredFields = [...document.querySelectorAll("[required]")];
    let isValid = node => node.checkValidity();
    if (requiredFields.every(isValid)) {
        event.preventDefault();
        renderQuoteModal();
        resetForm();
    }
}

function resetForm() {
    const form = document.querySelector('.form-quote');
    form.reset();
}

function renderQuoteModal() {
    let subject = document.querySelector('.form-quote__subject').value;
    let describe = document.querySelector('.form-quote__describe').value;
    let quoteModal = new QuoteModal('get-quote-modal', subject, describe);
    quoteModal.renderModal();
}