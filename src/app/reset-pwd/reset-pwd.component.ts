import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordMatch } from './passwordMatch';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Ireset } from '../models/resetPwd.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reset-pwd',
  templateUrl: './reset-pwd.component.html',
  styleUrls: ['./reset-pwd.component.scss']
})
export class ResetPwdComponent implements OnInit {
  myform: FormGroup;
  private id: string;
  constructor(private fb: FormBuilder,
    private authService: AuthService,
     private http: HttpClient, private actroute: ActivatedRoute,
     private modalService: NgbModal
     ) { }

  ngOnInit() {
    this.myform = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    },
    {
      validators: PasswordMatch.pwdmatch

    });

     this.id = this.actroute.snapshot.queryParamMap.get('q');
      console.log('id',this.id);
  }
  onSubmit(content){
    console.log('on submit called');
    console.log('value',this.myform.value);
    this.resetPwd(this.myform.value).subscribe(()=>{
      console.log('successfully reset the password');
    });
    this.myform.reset();
    this.modalService.open(content, { centered: true });
  }
  resetPwd(userPwd: any){
    const pwdDetails: Ireset={
      id: this.id,
      password: userPwd.password,
      confirmPassword: userPwd.confirmPassword
    }
    return this.http.put('/api/user/reset-pwd/'+this.id,pwdDetails);
  }
}
