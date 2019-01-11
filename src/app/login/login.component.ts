import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { NavBarComponent} from '../nav-bar/nav-bar.component';
import { SearchComponent } from '../search/search.component';
import {HttpWorksService} from '../services/http-works.service';
import {ElementDef} from '@angular/core/src/view';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [NavBarComponent, SearchComponent]
})
export class LoginComponent implements OnInit, AfterViewInit {

  model: any = {};
  isError: boolean;

  isLogged: boolean;
  inputLogin: any;
  inputPassword: any;
  eyeFirstLeft: any;
  eyeFirstRight: any;
  eyeSecondLeft: any;
  eyeSecondRight: any;

  @ViewChild('firstLeft') firstLeft: ElementRef;
  @ViewChild('firstRight') firstRight: ElementRef;
  @ViewChild('secondLeft') secondLeft: ElementRef;
  @ViewChild('secondRight') secondRight: ElementRef;
  @ViewChild('log') log: ElementRef;
  @ViewChild('pass') pass: ElementRef;

  constructor(
    private httpService: HttpWorksService
    ) { }

  ngOnInit() {}

  ngAfterViewInit() {

    this.eyeFirstLeft = this.firstLeft;
    this.eyeFirstRight = this.firstRight;
    this.eyeSecondLeft = this.secondLeft;
    this.eyeFirstRight = this.secondRight;
    this.inputLogin = this.log;
    this.inputPassword = this.pass;

    this.inputLogin.nativeElement.addEventListener('focus', this.firstFocusHandler);
    this.inputPassword.nativeElement.addEventListener('focus', this.firstFocusHandler);

    this.inputLogin.nativeElement.addEventListener('input', this.inputHandler);
    this.inputPassword.nativeElement.addEventListener('input', this.inputHandler);

    this.inputLogin.nativeElement.addEventListener('blur', this.blurHandler);
    this.inputPassword.nativeElement.addEventListener('blur', this.blurHandler);

    // this.inputLogin.addEventListener('focus', this.firstFocusHandler());
    // this.inputPassword.addEventListener('focus', this.firstFocusHandler());
    //
    // this.inputLogin.addEventListener('input', this.inputHandler);
    // this.inputPassword.addEventListener('input', this.inputHandler);
    //
    // this.inputLogin.addEventListener('blur', this.blurHandler);
    // this.inputPassword.addEventListener('blur', this.blurHandler);
  }

  login() {
   this.isLogged = this.httpService.auth(this.model);
   if (!this.isLogged) {
     this.isError = true;
   }
  }

  public firstFocusHandler() {
    // @ts-ignore
    const animation = document.querySelector('.animation')[0] as HTMLElement;
    // @ts-ignore
    const animationVideo = document.querySelector('.animation__video') as HTMLVideoElement;
    // @ts-ignore
    const eye = document.querySelectorAll('.animation__eye') as HTMLCollectionOf<HTMLElement>;

    for (let i = 0; i < eye.length; i++) {
      eye[i].style.display = 'block';
      this.fadeIn(eye[i], 2000);
    }

    animation.style.maxHeight = '374px';
    animationVideo.style.display = 'block';
    this.fadeIn(animationVideo, 2000);
    animationVideo.play();

    this.inputLogin.removeEventListener('focus', this.firstFocusHandler);
    this.inputPassword.removeEventListener('focus', this.firstFocusHandler);

    this.inputLogin.addEventListener('focus', this.focusHandler);
    this.inputPassword.addEventListener('focus', this.focusHandler);
  }

  public fadeIn(elem, speed) {
    const inInterval = setInterval(() => {
      elem.style.opacity = Number(elem.style.opacity) + 0.02;
      if (elem.style.opacity >= 1) {
        clearInterval(inInterval);
      }
    }, speed / 50);
  }

  public fadeOut(elem, speed) {
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

  public focusHandler(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    const length = evt.target.value.length;
    this.setPositionOne(length);
    this.setPositionTwo(length);
  }

  public inputHandler(evt) {
    const length = evt.target.value.length;
    this.setPositionOne(length);
    this.setPositionTwo(length);
  }

  public setPositionOne(len) {
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

  public setPositionTwo(len) {
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

  public blurHandler() {
    this.setPosition('First', 58, 107, 104, 108);
    this.setPosition('Second', 250, 164, 296, 164);
  }

  public clickHandler() {
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
