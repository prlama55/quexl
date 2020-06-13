import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpMessage} from "../../../@types/HttpMessage";
import {LoginService} from "../../user/login.service";
import {StorageServices} from "../../../helpers/StorageServices";
import {AUTH_KEY} from "../../../helpers/Constants";
import {UserProfile} from "../../../@types/User";
import {Router} from "@angular/router";
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  modalRef: BsModalRef;
  loginForm: FormGroup;
  message: HttpMessage;
  isLoggedIn: boolean
  userProfile: UserProfile
  isOpen = false;
  active: string;
  constructor(
      private modalService: BsModalService,
      private loginService: LoginService,
      private fb: FormBuilder,
      protected storageService: StorageServices,
      private router: Router
  ) {
    this.loginForm = this.createFormGroup();
    this.isLoggedIn= this.loginService.isLoggedIn()
    this.userProfile= this.loginService.userProfile
  }
  ngOnInit(): void {
    console.log(this.router.url)
    if(this.loginService.isLoggedIn()){
      this.router.navigate(['/dashboard']);
    }
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  createFormGroup() {
    return this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  async login(){
    console.log(this.loginForm.value)
    this.loginService.login(this.loginForm.value).subscribe(data=>{
      this.storageService.save(AUTH_KEY, JSON.stringify(data))
    },error => {
      this.message=error
      this.storageService.remove(AUTH_KEY)
      this.loginForm.patchValue({
        username:'',
        password: ''
      })
    })
    setTimeout(()=>{
      this.router.navigate(['/dashboard']);
      location.reload()
    },500)
  }

  logout(){
    this.storageService.remove(AUTH_KEY)
    this.loginForm.patchValue({
      username:'',
      password: ''
    })
    this.router.navigate(['/']);
    location.reload()
  }
}
