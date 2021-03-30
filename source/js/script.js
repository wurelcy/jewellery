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

  const accordionBlocks = document.querySelectorAll('.faq__item');

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

  /* Accordion */

  if (accordionBlocks) {
    let activePanel;

    accordionBlocks.forEach((block) => {
      block.classList.add('faq__item--closed');
      block.querySelector('.faq__item-body').style.maxHeight = '0px';

      block.addEventListener('click', function() {
        if (!block.classList.contains('faq__item--closed')) {
          activePanel = block;
        }

        if (block.classList.contains('faq__item--closed')) {
          if (activePanel) {
            activePanel.classList.add('faq__item--closed');
            activePanel.querySelector('.faq__item-body').style.maxHeight = '0px';
          }

          let insideElHeight = block.querySelector('.faq__item-body > *').clientHeight;

          block.classList.remove('faq__item--closed');
          block.querySelector('.faq__item-body').style.maxHeight = insideElHeight + 'px';
          activePanel = block;
        } else {
          block.querySelector('.faq__item-body').style.maxHeight = '0px';
          block.classList.add('faq__item--closed');
        }
      });
    });
  }
});
