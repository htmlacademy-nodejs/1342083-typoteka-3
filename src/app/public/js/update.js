'use strict';

(() => {
  const API_URL = `http://localhost:3000`;

  const dateSelect = document.getElementById(`publication-date`);

  if (dateSelect && window.flatpickr) {
    dateSelect._flatpickr.setDate(dateSelect.dataset.value);
  }

  if (io) {
    const socket = io(API_URL);
    const hot = document.querySelector(`.hot__list`);
    const lastComments = document.querySelector(`.last__list`);

    if (hot) {
      const createHotItem = (article) => {
        const template = document.getElementById('template-hot').content;
        const newItem = template.querySelector('.hot__list-item').cloneNode(true);

        const announce = article.announce;
        const url = `/articles/${article.id}`;

        const link = newItem.querySelector('.hot__list-link');
        const linkText = link.querySelector('.hot__link-text');
        const counter = link.querySelector('.hot__link-sup ');

        link.href = url;
        linkText.textContent = announce;
        counter.textContent = article.commentsCount;

        return newItem;
      };

      const updateHot = (articles) => {
        const items = articles.map(createHotItem);
        hot.innerHTML = '';
        items.forEach((item) => hot.appendChild(item));
      };

      socket.addEventListener(`hot:update`, (articles) => {
        updateHot(articles);
      })
    }

    if (lastComments) {
      const createLastComment = (comment) => {
        const template = document.getElementById('template-last').content;
        const newItem = template.querySelector('.last__list-item').cloneNode(true);
        const avatarSrc = `/img/${comment.avatar ? comment.avatar : `icons/smile.svg`}`;
        const fullName = `${comment.firstName} ${comment.lastName}`;
        const url = `/articles/${comment.articleId}/#comment-${comment.id}`;

        const avatar = newItem.querySelector('.last__list-image');
        const name = newItem.querySelector('.last__list-name');
        const link = newItem.querySelector('.last__list-link');

        avatar.src = avatarSrc;
        name.textContent = fullName;
        link.href = url;
        link.textContent = comment.text;

        return newItem;
      };

      const updateLastComments = (comment) => {
        const last = lastComments.lastElementChild;
        lastComments.insertAdjacentElement(`afterbegin`, createLastComment(comment));

        if (last) {
          lastComments.lastElementChild.remove();
        }
      };

      socket.addEventListener(`comment:create`, (comment) => {
        updateLastComments(comment);
      })
    }
  }
})();

