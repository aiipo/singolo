export class Carousel {
    constructor() {
        this.items = document.querySelectorAll('.carousel .item');
        this.currentItem = 0;
        this.isEnabled = true;
        document.querySelector('.control.left').addEventListener('click', () => (this.isEnabled) ? this.previousItem(this.currentItem) : null);
        document.querySelector('.control.right').addEventListener('click', () => (this.isEnabled) ? this.nextItem(this.currentItem) : null);
    }

    changeCurrentItem(n) {
        this.currentItem = (n + this.items.length) % this.items.length;
    }

    hideItem(direction) {
        this.isEnabled = false;
        this.items[this.currentItem].classList.add(direction);
        this.items[this.currentItem].addEventListener('animationend', function () {
            this.classList.remove('active', direction);
        });
    }

    showItem(direction) {
        this.isEnabled = true;
        this.items[this.currentItem].classList.add('next', direction);
        this.items[this.currentItem].addEventListener('animationend', function () {
            this.classList.remove('next', direction);
            this.classList.add('active');
            this.isEnabled = true;
        })
    }

    nextItem(n) {
        this.hideItem('to-left');
        this.changeCurrentItem(n + 1);
        this.showItem('from-right');
    }

    previousItem(n) {
        this.hideItem('to-right');
        this.changeCurrentItem(n - 1);
        this.showItem('from-left');
    }
}