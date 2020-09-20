import {Inject, Injectable} from "@angular/core";
import {DOCUMENT} from "@angular/common";

@Injectable()
export class FadeInService {
  constructor(@Inject(DOCUMENT) document) {
  }

  fadeIn() {
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
<<<<<<< HEAD
      threshold: 0.3
=======
      threshold: 0.2
>>>>>>> 0fbbb9b2d182fa8a9c48f20c176815d830cc6d40
    };
    const appearOnScroll = new IntersectionObserver(
      function (entries, appearOnScroll) {
        entries.forEach(entry => {
          if(!entry.isIntersecting) {
            return;
          } else {
            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target);
          }
        });
    }, appearOptions);
    faders.forEach(fader => {
      appearOnScroll.observe(fader);
    });
  }
}
