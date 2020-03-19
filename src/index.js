import { Carousel } from './js/Carousel';
import { QuoteModal } from "./js/QuoteModal";

window.onload = () => {
    new Carousel();
    document.querySelector('.portfolio-tags').addEventListener('click', selectPortfolioTag);
    document.querySelector('.portfolio-works-container').addEventListener('click', selectPortfolioImg);
    document.querySelector('.form-quote__submit').addEventListener('click', submitQuote);
    document.querySelector('.navigation').addEventListener('click', navigationLinks);
    document.querySelector('.iphone').addEventListener('click', toggleIphoneScreen);
    window.addEventListener('scroll', scrollPage);
};

function toggleIphoneScreen(event) {
    if (event.target.classList.contains('iphone__home-btn')) {
        let parent = event.target.closest('div');
        let getScreen = parent.querySelector('.iphone__screen');
        if (getScreen) {
            if (getScreen.classList.contains('iphone__screen-disabled'))
                getScreen.classList.remove('iphone__screen-disabled');
            else getScreen.classList.add('iphone__screen-disabled');
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
        if (clickedTag.innerText === "All")
            showAllPortfolios();
        else filterBySelectedTag(clickedTag.innerText);
    }
}

function removeSelectedTags() {
    let tags = document.querySelectorAll('.portfolio-tags .tag');
    tags.forEach(tag => {
        tag.classList.remove('tag_selected');
        tag.classList.add('tag_bordered');
    });
}

function selectClickedTag (clickedTag) {
    clickedTag.classList.add('tag_selected');
    clickedTag.classList.remove('tag_bordered');
}

function showAllPortfolios () {
    let portfolios = document.querySelectorAll('.portfolio-works-container > *');
    portfolios.forEach(portfolio => {
        portfolio.classList.remove('portfolio_hidden');
    });
}

function filterBySelectedTag (selectedTag) {
    let portfolios = document.querySelectorAll('.portfolio-works-container > *');
    portfolios.forEach(portfolio => {
        portfolio.classList.add('portfolio_hidden');
        if (portfolio.getAttribute('data-tag') === selectedTag) portfolio.classList.remove('portfolio_hidden');
    });
}

function selectPortfolioImg(event) {
    let portfolios = document.querySelectorAll('div[class^="portfolio-work-"]');
    unselectPortfolios();
    portfolios.forEach(portfolio => {
        if (event.target.classList.contains(portfolio.className)) {
            selectPortfolio(portfolio);
        }
    });
}

function unselectPortfolios() {
    let portfolios = document.querySelectorAll('div[class^="portfolio-work-"]');
    portfolios.forEach(portfolio => {
        portfolio.classList.remove('portfolio_selected');
    });
}

function selectPortfolio(selectedPortfolio) {
    selectedPortfolio.classList.add('portfolio_selected');

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