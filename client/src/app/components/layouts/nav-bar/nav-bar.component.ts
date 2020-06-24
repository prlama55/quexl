import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../user/login.service";
import {Auth} from "../../../@types/User";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication.service";
import {first} from "rxjs/operators";

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
    modalRef: BsModalRef;
    loginForm: FormGroup;
    signUpForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    auth: Auth
    isOpen = false;

    constructor(
        private modalService: BsModalService,
        private authService: AuthenticationService,
        private loginService: LoginService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
    ) {
        this.loginForm = this.createFormGroup();
        this.signUpForm = this.createSignUpFormGroup();
        // redirect to home if already logged in
        if (this.authService.authValue) {
            this.auth = this.authService.authValue
            this.router.navigate(['/dashboard']);
        }
    }

    ngOnInit(): void {
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
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

    createSignUpFormGroup() {
        return this.fb.group({
            username: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    async login() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;
        this.authService.login(this.loginForm.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    window.location.href = this.returnUrl
                },
                error: error => {
                    this.error = error;
                    this.loading = false;
                }
            });
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.loginForm.controls;
    }

    get r() {
        return this.signUpForm.controls;
    }

    logout() {
        this.authService.logout()
        window.location.href = '/'
    }

    register() {
        this.submitted = true;
        console.log("Submitting", this.signUpForm.value)
        if (this.signUpForm.invalid) {
            return;
        }
        this.loginService.register(this.signUpForm.value).subscribe(user => {
            this.modalRef.hide();
        }, error => {
            this.error = error.message
        })
    }
}
