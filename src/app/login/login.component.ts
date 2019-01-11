import { Component, OnInit } from '@angular/core';
import { NavBarComponent} from '../nav-bar/nav-bar.component';
import { SearchComponent } from '../search/search.component';
import {HttpWorksService} from '../services/http-works.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [NavBarComponent, SearchComponent]
})
export class LoginComponent implements OnInit {

  model: any = {};
  isError: boolean;

  isLogged: boolean;
  inputLogin: HTMLInputElement;
  inputPassword: HTMLInputElement;
  eyeFirstLeft: HTMLElement;
  eyeFirstRight: HTMLElement;
  eyeSecondLeft: HTMLElement;
  eyeSecondRight: HTMLElement;

  constructor(
    private httpService: HttpWorksService
    ) { }

  ngOnInit() {
    this.inputLogin = document.querySelector('.form__input--login')[0];
    this.inputPassword = document.querySelector('.form__input--password')[0];

    this.eyeFirstLeft = document.querySelector('.animation__eye--one-one')[0];
    this.eyeFirstRight = document.querySelector('.animation__eye--one-two')[0];

    this.eyeSecondLeft = document.querySelector('.animation__eye--two-one')[0];
    this.eyeSecondRight = document.querySelector('.animation__eye--two-two')[0];

    this.inputLogin.addEventListener('input', this.inputHandler);
    this.inputPassword.addEventListener('input', this.inputHandler);

    this.inputLogin.addEventListener('blur', this.blurHandler);
    this.inputPassword.addEventListener('blur', this.blurHandler);

  }

  login() {
   this.isLogged = this.httpService.auth(this.model);
   if (!this.isLogged) {
     this.isError = true;
   }
  }

  firstFocusHandler() {
    // @ts-ignore
    const animation = document.querySelector('.animation')[0] as HTMLElement;
    // @ts-ignore
    const animationVideo = document.querySelector('.animation__video') as HTMLVideoElement;
    // @ts-ignore
    const eye = document.querySelectorAll('.animation__eye') as HTMLCollectionOf<HTMLElement>;
    // @ts-ignore
    const button = document.querySelector('.form__button')[0] as HTMLElement;
    // @ts-ignore
    const about = document.querySelector('.about')[0] as HTMLElement;

    for (let i = 0; i < eye.length; i++) {
      eye[i].style.display = 'block';
      this.fadeIn(eye[i], 2000);
    }

    animation.style.maxHeight = '374px';
    animationVideo.style.display = 'block';
    this.fadeIn(animationVideo, 2000);
    this.fadeIn(about, 2000);
    animationVideo.play();

    this.inputLogin.removeEventListener('focus', this.firstFocusHandler);
    this.inputPassword.removeEventListener('focus', this.firstFocusHandler);

    this.inputLogin.addEventListener('focus', this.focusHandler);
    this.inputPassword.addEventListener('focus', this.focusHandler);

    button.addEventListener('click', this.clickHandler);
  }

  fadeIn(elem, speed) {
    const inInterval = setInterval(() => {
      elem.style.opacity = Number(elem.style.opacity) + 0.02;
      if (elem.style.opacity >= 1) {
        clearInterval(inInterval);
      }
    }, speed / 50);
  }

  fadeOut(elem, speed) {
    const outInterval = setInterval(() => {
      if (!elem.style.opacity) {
        elem.style.opacity = 1;
      }
      elem.style.opacity -= 0.02;
      if (elem.style.opacity <= 0) {
        clearInterval(outInterval);
      }
    }, speed / 50);
  }

  focusHandler(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    const length = evt.target.value.length;
    this.setPositionOne(length);
    this.setPositionTwo(length);
  }

  inputHandler(evt) {
    const length = evt.target.value.length;
    this.setPositionOne(length);
    this.setPositionTwo(length);
  }

  setPositionOne(len) {
    if (len < 2) {
      this.setPosition('First', 56, 110, 101, 111);
    } else if (len < 3) {
      this.setPosition('First', 57, 110, 102, 111);
    } else if (len < 4) {
      this.setPosition('First', 58, 110, 103, 111);
    } else if (len < 5) {
      this.setPosition('First', 59, 110, 104, 111);
    } else if (len < 6) {
      this.setPosition('First', 60, 110, 104, 111);
    } else if (len < 7) {
      this.setPosition('First', 61, 110, 105, 111);
    } else if (len < 8) {
      this.setPosition('First', 62, 110, 106, 111);
    } else if (len < 9) {
      this.setPosition('First', 63, 110, 107, 111);
    } else if (len > 12) {
      this.setPosition('First', 64, 110, 108, 111);
    }
  }

  setPositionTwo(len) {
    if (len < 2) {
      this.setPosition('Second', 245, 167, 290, 168);
    } else if (len < 3) {
      this.setPosition('Second', 246, 168, 291, 169);
    } else if (len < 4) {
      this.setPosition('Second', 247, 168, 292, 169);
    } else if (len < 5) {
      this.setPosition('Second', 248, 168, 293, 169);
    } else if (len < 6) {
      this.setPosition('Second', 249, 168, 294, 169);
    } else if (len < 7) {
      this.setPosition('Second', 250, 168, 294, 169);
    } else if (len < 8) {
      this.setPosition('Second', 250, 168, 294, 169);
    } else if (len === 11) {
      this.setPosition('Second', 251, 168, 295, 169);
    } else if (len === 12) {
      this.setPosition('Second', 252, 168, 296, 169);
    } else if (len === 13) {
      this.setPosition('Second', 253, 168, 297, 169);
    } else if (len > 13) {
      this.setPosition('Second', 254, 168, 298, 169);
    }
  }

  blurHandler() {
    this.setPosition('First', 58, 107, 104, 108);
    this.setPosition('Second', 250, 164, 296, 164);
  }

  clickHandler() {
    const wrapper = document.querySelector('.wrapper');
    this.inputPassword.type = 'text';
    this.fadeOut(wrapper, 1000);
  }
  setPosition(person, xLeft, yLeft, xRight, yRight) {
    if (person === 'Second') {
      this.eyeSecondLeft.style.left = xLeft + 'px';
      this.eyeSecondLeft.style.top = yLeft + 'px';
      this.eyeSecondLeft.style.left = xRight + 'px';
      this.eyeSecondLeft.style.top = yRight + 'px';
    } else if (person === 'First') {
      this.eyeSecondRight.style.left = xLeft + 'px';
      this.eyeSecondRight.style.top = yLeft + 'px';
      this.eyeSecondRight.style.left = xRight + 'px';
      this.eyeSecondRight.style.top = yRight + 'px';
    }
  }
}
