'use strict';

$(document).ready(function () {
  let slider = document.querySelector('.slider__list');

  if (slider) {
  $(slider).slick({
      dots: true,
      infinite: true,
      speed: 600,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: true
          }
        }
      ]
    });
  }

  let minWidth = 1200;

  let arrowPrev = document.querySelector('.slick-prev');
  let arrowNext = document.querySelector('.slick-next');
  let dotsList = document.querySelector('.slick-dots');

  let header = document.querySelector('.header');
  let headerToggle = document.querySelector('.header__toggle');

  let activePanel;
  const faqBlocks = document.querySelectorAll('.faq__item');
  const filterBlocks = document.querySelectorAll('.filters__block');

  const loginCloseButton = document.querySelector('.login-popup__upper-wrapper a');
  const loginOpenButton = document.querySelector('.header__login');
  const loginPopup = document.querySelector('.login-popup');
  const loginSubmit = document.querySelector('.login-popup__submit');
  const loginEmailInput = document.querySelector('#email-popup');
  const loginPasswordInput = document.querySelector('#password-popup');
  const cartCloseButton = document.querySelector('.cart-popup__close');
  const cartOpenButton = document.querySelector('.product__add-to-cart');
  const cartPopup = document.querySelector('.cart-popup');
  const overlay = document.querySelector('.overlay');

  /* Menu */

  if (header) {
    headerToggle.addEventListener('click', () => {
      if (header.classList.contains('header--closed')) {
        header.classList.add('header--opened');
        header.classList.remove('header--closed');
      } else {
        header.classList.add('header--closed');
        header.classList.remove('header--opened');
      }
    });
  }

  /* Slider Settings*/

  let rez = (minWidth) => {
    if (window.clientWidth > minWidth) {
      document.querySelectorAll('.slick-slide').forEach((el) => {
        el.style.width = '270px';
      });
    }
  };

  rez(minWidth);

  if (dotsList) {
    dotsList.style.display = 'flex';
  }

  if (arrowNext && arrowNext) {
  let deleteText = (arrow) => {
      arrow.textContent = '';
    };

    deleteText(arrowPrev);
    deleteText(arrowNext);
    arrowPrev.innerHTML = '<svg width="29" height="9"><use xlink:href="#icon-arrow-left"></use></svg>';
    arrowNext.innerHTML = '<svg width="29" height="9"><use xlink:href="#icon-arrow-right"></use></svg>';

    if (window.clientWidth < 768) {
      arrows.forEach((arrow) => {
        arrow.style.display = 'none';
      });
    }
  }

  /* Popup */

  let openPopup = (openClass, closeClass, popup) => {
    popup.classList.remove(closeClass);
    popup.classList.add(openClass);
    overlay.classList.remove('overlay--hidden');
  };

  let closePopup = (openClass, closeClass, popup) => {
    popup.classList.add(closeClass);
    popup.classList.remove(openClass);
    overlay.classList.add('overlay--hidden');
  };

  /* Login Form */

  if (loginPopup) {
    loginOpenButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      openPopup('login-popup--opened', 'login-popup--closed', loginPopup);
    });

    loginCloseButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      closePopup('login-popup--opened', 'login-popup--closed', loginPopup);
    });

    window.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        closePopup('login-popup--opened', 'login-popup--closed', loginPopup);
      }
    });

    loginSubmit.addEventListener('click', (evt) => {
      if (loginEmailInput.value.valueMissing && loginPasswordInput.value.valueMissing) {
        evt.preventDefault();
      } else if ((loginEmailInput.value !== "") && (loginPasswordInput.value !== "")) {
        evt.preventDefault();
        localStorage.setItem('loginUserEmail', loginEmailInput.value);
        localStorage.setItem('loginUserPassword', loginPasswordInput.value);
        closePopup('login-popup--opened', 'login-popup--closed', loginPopup);
      }
    });
  }

  /* Cart Popup*/

  if (cartPopup) {
    cartOpenButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      openPopup('cart-popup--opened', 'cart-popup--closed', cartPopup);
    });

    cartCloseButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      closePopup('cart-popup--opened', 'cart-popup--closed', cartPopup);
    });

    window.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        closePopup('cart-popup--opened', 'cart-popup--closed', cartPopup);
      }
    });
  }

  /* Accordion */

  let renderAccordion = (accordionBlocks, accordionBody, accordionClosed) => {
    accordionBlocks.forEach((block) => {
      block.classList.add(accordionClosed);
      block.querySelector('.' + accordionBody).style.maxHeight = '0px';

      block.addEventListener('click', function() {
        if (!block.classList.contains(accordionClosed)) {
          activePanel = block;
        }

        if (block.classList.contains(accordionClosed)) {
          if (activePanel) {
            activePanel.classList.add(accordionClosed);
            activePanel.querySelector('.' + accordionBody).style.maxHeight = '0px';
          }

          let insideElHeight = block.querySelector('.'+ accordionBody + ' > *').clientHeight;

          block.classList.remove(accordionClosed);
          block.querySelector('.' + accordionBody).style.maxHeight = insideElHeight + 'px';
          activePanel = block;
        } else {
          block.querySelector('.' + accordionBody).style.maxHeight = '0px';
          block.classList.add(accordionClosed);
        }
      });
    });
  };


  if (faqBlocks) {
    renderAccordion(faqBlocks, 'faq__item-body', 'faq__item--closed');
  }

  if (filterBlocks) {
    renderAccordion(filterBlocks, 'filters__body', 'filters__block--closed');
  }
});
