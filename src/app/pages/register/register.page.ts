import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit() {}

  register() {
    const formData = this.registerForm.value;

    this.userService.registerUser(formData).subscribe({
      next: (result) => {
        alert('Registed successfully!');

        this.registerForm.reset();

        console.log(result);

        this.router.navigateByUrl('login');
      },
      error: (err) => {
        alert(err.error.errors[0].message);

        console.log(err.error);
      },
    });
  }
}
