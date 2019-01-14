import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { NavBarComponent} from '../nav-bar/nav-bar.component';
import { SearchComponent } from '../search/search.component';
import {HttpWorksService} from '../services/http-works.service';
import {ElementDef} from '@angular/core/src/view';
import { Router } from '@angular/router';

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

  animations: any;

  @ViewChild('firstLeft') firstLeft: ElementRef;
  @ViewChild('firstRight') firstRight: ElementRef;
  @ViewChild('secondLeft') secondLeft: ElementRef;
  @ViewChild('secondRight') secondRight: ElementRef;
  @ViewChild('log') log: ElementRef;
  @ViewChild('pass') pass: ElementRef;
  @ViewChild('animation') animation: ElementRef;
  @ViewChild('animation_video') animationVideo: ElementRef;

  constructor(
    private httpService: HttpWorksService,
    public router: Router
    ) { }

  ngOnInit() {}

  ngAfterViewInit() {

    // this.eyeFirstLeft = this.firstLeft;
    // this.eyeFirstRight = this.firstRight;
    // this.eyeSecondLeft = this.secondLeft;
    // this.eyeFirstRight = this.secondRight;

    this.eyeFirstLeft = document.getElementById('firstLeft') as HTMLDivElement;
    this.eyeFirstRight = document.getElementById('firstRight') as HTMLDivElement;
    this.eyeSecondRight = document.getElementById('secondRight') as HTMLDivElement;
    this.eyeSecondLeft = document.getElementById('secondLeft') as HTMLDivElement;

    this.inputLogin = this.log;
    this.inputPassword = this.pass;
    this.animations = this.animation;

    this.inputLogin.nativeElement.addEventListener('focus', this.firstFocusHandler);
    this.inputPassword.nativeElement.addEventListener('focus', this.firstFocusHandler);

    // this.inputLogin.nativeElement.addEventListener('input', this.inputHandler);
    // this.inputPassword.nativeElement.addEventListener('input', this.inputHandler);

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
    this.httpService.promisedLogin(this.model).then(() => {
      this.isLogged = true;
      this.isError = false;
    })
    .catch(err => {
      this.isLogged = false;
      this.isError = true;
    });
    (async () => {
      this.loginFadeHandler();
      await new Promise((resolve) => setTimeout(() => resolve(), 2000));
      this.router.navigateByUrl('/index');
      console.log('Login done with status: ' + this.isLogged);
    })();
  }

  public firstFocusHandler() {
    const hren = document.getElementById('animation') as HTMLDivElement;
    const hrenSVideo = document.getElementById('animation-video') as HTMLVideoElement;
    hren.style.display = 'block';

    // @ts-ignore
    const eye = document.querySelectorAll('.animation__eye') as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < eye.length; i++) {
      eye[i].style.display = 'block';
      this.fadeIn(eye[i], 2000);
    }

    // this.animationVideo.nativeElement.style.display = 'block';
    hrenSVideo.style.display = 'block';
    this.fadeIn(hrenSVideo, 2000);
    hrenSVideo.play();
    // this.animationVideo.nativeElement.play();
    const pass = document.getElementById('password');
    const login = document.getElementById('login');

    pass.removeEventListener('focus', this.firstFocusHandler);
    login.removeEventListener('focus', this.firstFocusHandler);

    pass.addEventListener('focus', this.focusHandler);
    login.addEventListener('focus', this.focusHandler);

    pass.addEventListener('input', this.inputHandler);
    login.addEventListener('input', this.inputHandler);

    // this.inputLogin.nativeElement.removeEventListener('focus', this.firstFocusHandler);
    // this.inputPassword.nativeElement.removeEventListener('focus', this.firstFocusHandler);
    //
    // this.inputLogin.nativeElement.addEventListener('focus', this.focusHandler);
    // this.inputPassword.nativeElement.addEventListener('focus', this.focusHandler);

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
    console.log(length);
    this.setPositionOne(length);
    this.setPositionTwo(length);
  }

  public inputHandler(evt) {
    const length = evt.target.value.length;
    console.log(length);
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

  public loginFadeHandler() {
    const wrapper = document.querySelector('.wrapper');
    this.inputPassword.type = 'text';
    this.fadeOut(wrapper, 2000);
  }

  setPosition(person, xLeft, yLeft, xRight, yRight) {
    if (person === 'Second') {
      this.eyeSecondLeft.nativeElement.style.left = xLeft + 'px';
      this.eyeSecondLeft.nativeElement.style.top = yLeft + 'px';
      this.eyeSecondRight.nativeElement.style.left = xRight + 'px';
      this.eyeSecondRight.nativeElement.style.top = yRight + 'px';
    } else if (person === 'First') {
      this.eyeFirstRight.nativeElement.style.left = xLeft + 'px';
      this.eyeFirstRight.nativeElement.style.top = yLeft + 'px';
      this.eyeFirstLeft.nativeElement.style.left = xRight + 'px';
      this.eyeFirstLeft.nativeElement.style.top = yRight + 'px';
    }
  }
}
