import throttle from "lodash/throttle";
import debounce from "lodash/debounce";

class RevealOnScroll {
  constructor(els, thresholdPerscent) {
    this.thresholdPerscent = thresholdPerscent;
    this.itemToReveal = els;
    this.browserHeight = window.innerHeight;
    this.hideInitially();
    this.scrollThrottle = throttle(this.calcCaller, 200).bind(this);
    this.events();
  }

  events() {
    window.addEventListener("scroll", this.scrollThrottle);
    window.addEventListener(
      "resize",
      debounce(() => {
        console.log("resize just ran");
        this.browserHeight = window.innerHeight;
      }, 333)
    );
  }

  calcCaller() {
    this.itemToReveal.forEach((el) => {
      if (el.isRevealed == false) {
        this.calculateIfScrolledTo(el);
      }
    });
  }

  calculateIfScrolledTo(el) {
    if (window.scrollY + this.browserHeight > el.offsetTop) {
      console.log("el was calc");
      let scrollPercent =
        (el.getBoundingClientRect().top / this.browserHeight) * 100;

      if (scrollPercent < this.thresholdPerscent) {
        el.classList.add("reveal-item--is-visible");
        el.isRevealed = true;
        if (el.isLastItem) {
          window.removeEventListener("scroll", this.scrollThrottle);
        }
      }
    }
  }

  hideInitially() {
    this.itemToReveal.forEach((el) => {
      el.classList.add("reveal-item");
      el.isRevealed = false;
    });
    this.itemToReveal[this.itemToReveal.length - 1].isLastItem = true;
  }
}

export default RevealOnScroll;
