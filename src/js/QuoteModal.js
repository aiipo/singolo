import { Modal } from './Modal';

export class QuoteModal extends Modal {
    constructor(classes, subject, describe) {
        super(classes);
        this.subject = subject;
        this.describe = describe;
    }

    generateContent() {
        let template = '';
        let getQuote = document.createElement('div');
        getQuote.className = 'get-quote-modal__content';

        template += `<div class="get-quote__content">`;
        template += "<div>Письмо отправлено</div>";
        if (this.subject) template += `<p>Тема: ${this.subject}</p>`;
        else template += "<p>Без темы</p>";
        if (this.describe) template += `<p>Описание: ${this.describe}</p>`;
        else template += "<p>Без описания</p>";
        template += `</div>`;
        template += `<button class="modal__close-btn"">OK</button>`;
        getQuote.innerHTML = template;
        return getQuote;
    }

    closeModalAdditional() {
        let closeBtn = document.querySelector('.modal__close-btn');
        closeBtn.addEventListener('click',  () => document.querySelector('.overlay').remove());
    }

    renderModal() {
        let content = this.generateContent();
        super.buildModal(content);
        this.closeModalAdditional();
    }
}