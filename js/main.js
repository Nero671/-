'use strict';

class SliderCarousel {
  constructor({
    main, 
    wrap,
    next,
    prev,
    infinity = false,
    position = 0,
    slideToShow = 4,
    responsive = [],
  }) {
    try {
      this.main = document.querySelector(main);
      this.wrap = document.querySelector(wrap);
      this.slides = document.querySelector(wrap).children;
      this.next = document.querySelector(next);
      this.prev = document.querySelector(prev);
      this.slideToShow = slideToShow;
      this.responsive = responsive;
      this.options = {
        position,
        infinity,
        widthSlide: Math.floor(100 / this.slideToShow),
      }
    } catch(err) {
      console.warn('Ошибка');
    }
  }

  init() {
    this.addSliderClass();
    this.addSliderStyle();
    if(this.prev && this.next) {
      this.controlSlider();
    } else {
      this.addArrow();
      this.controlSlider();
    }

    if(this.responsive) {
      this.responseInit();
    }
  }

  addSliderClass() {
    this.main.classList.add('build-slider');
    this.wrap.classList.add('build-slider__wrap');
    for( const item of this.slides ) {
      item.classList.add('build-slider_slides')
    }
  }

  addSliderStyle() {
    let style = document.getElementById('sliderCarusel-style');
    if(!style){
      style = document.createElement('style');
      style.id = 'sliderCarusel-style';
    }
    style.textContent = `
      .build-slider {
        overflow: hidden !important;
      }
      .build-slider__wrap {
        display: flex !important;
        transition: transform 0.5s !important;
        will-change: transform !important;
      }
      .build-slider_slides {
        display: flex;
        align-item: center;
        justify-content: center;
        flex: 0 0 ${this.options.widthSlide}% !important;
        margin: auto 0 !important;
      }
    `;

    document.head.append(style);
  }

  controlSlider() {
    this.prev.addEventListener('click', this.prevSlider.bind(this))
    this.next.addEventListener('click', this.nextSlider.bind(this))
  }

  prevSlider() {
    if(this.options.infinity || this.options.position > 0) {
      --this.options.position;
      if(this.options.position < 0) {
        this.options.position = this.slides.length - this.slideToShow;
      }
      this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
    }
  }

  nextSlider() {
    if(this.options.infinity || this.options.position < this.slides.length - this.slideToShow) {
      ++this.options.position;
      if(this.options.position > this.slides.length - this.slideToShow) {
        this.options.position = 0;
      }
      this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
    }

  }

  addArrow() {
    this.prev = document.createElement('button');
    this.next = document.createElement('button');

    this.prev.className = 'slider__prev';
    this.next.className = 'slider__next';

    this.main.append(this.prev);
    this.main.append(this.next);

    const style = document.createElement('style');
    style.textContent = `
      .slider__prev, 
      .slider__next {
        margin: 15px 10px;
        border: 20px solid transparent;
        background: transparent;
      }
      .slider__next {
        border-left-color: #FFD042;
      }
      .slider__prev {
        border-right-color: #FFD042;
      }
      .slider__prev:hover,
      .slider__next:hover,
      .slider__prev:focus,
      .slider__next:focus {
        background: transparent;
        outline: transparent;
      }
    `;
    document.head.append(style);
  }

  responseInit() {
    const slideToShowDefault = this.slideToShow;
    const allResponse = this.responsive.map(item => item.breakpoint); 
    const maxResponse = Math.max(...allResponse);

    const checkResponse = () => {
      const widtWindow = document.documentElement.clientWidth;
      if(widtWindow < maxResponse) {
        for(let i = 0; i < allResponse.length; i++) {
          if (widtWindow < allResponse[i]) {
            this.slideToShow = this.responsive[i].slideToShow;
            this.options.widthSlide = Math.floor(100 / this.slideToShow);
            this.addSliderStyle();
          }
        }
      } else {
        this.slideToShow = slideToShowDefault;
        this.options.widthSlide = Math.floor(100 / this.slideToShow);
        this.addSliderStyle();
      }
    }

    checkResponse();

    window.addEventListener('resize', checkResponse);
  }
}

const toggleTab = () => {
  const dotHead= document.querySelector('.dots'),
      dot = document.querySelectorAll('.dot'),
      reviewContent = document.querySelectorAll('.review-content');

  const toggleTabContent = index => {
    for(let i = 0; i < reviewContent.length; i++) {
      if(index === i) {
        dot[i].classList.add('active');
        reviewContent[i].classList.remove('hide');
      } else {
        dot[i].classList.remove('active');
        reviewContent[i].classList.add('hide');
      }
    }
  }

  dotHead.addEventListener('click', e => {
    let target = e.target;
    if(target.classList.contains('dot')) {
      dot.forEach((item, i) => {
        if(item === target) {
          toggleTabContent(i);
        }
      });
    }
  });
};

toggleTab();

const showMenu = () => {
  const menu = document.querySelector('menu');

  document.body.addEventListener('click', e => {
    console.log(e.target);
    if(e.target.closest('.menu')) {
      menu.classList.add('active-menu');
    } else if(!e.target.closest('menu') || e.target.matches('.close-btn')) {
      menu.classList.remove('active-menu');
    }
  })
}

showMenu();