import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/dashboard/services/api.service';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit,OnDestroy {

  userDetail: any=[]
  constructor(
    private toastr: ToastrService,
    private api: ApiService,
    private fb: FormBuilder,
    public datepipe: DatePipe,
    private router:Router
  ) {}
  ngOnDestroy(): void {
    // if(this.userDetail.team==''&& this.userDetail.state==''&& this.userDetail.dob==''){
    //   history.pushState(null,'','dashboard/home/create-profile');
    //   // this.router.navigateByUrl('dashboard/home/create-profile')
    // }
    // else{
    //   // this.router.navigateByUrl('/dashboard/home')
    //   history.pushState(null,'');
    // }
  }
  maxDate = new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0];
  ngOnInit(): void {
    this.api.userFullDetails().subscribe((res: any) => {
      console.log(res, 'user details api response ');
      this.userDetail = res.data;
      console.log(this.userDetail.dob, 'userDetail');

      // patching data from api
      this.editProfile.patchValue({
        team: this.userDetail.team,
        dob:  this.datepipe.transform(this.userDetail.dob,'yyyy-MM-dd'),
        state: this.userDetail.state,
      });
      console.log(this.userDetail.dob,"Thifdgfdgd---------->");
    });
  //   private unsubscriber: Subject<void> = new Subject<void>();
  //   history.pushState(null, '');

  //   fromEvent(window, 'popstate')
  //   .pipe(takeUntil(this.unsubscriber))
  //   .subscribe((_) => {
  //   history.pushState(null, '');
  //   this.showError = true;
  //  }); 

  }
// form creation
  editProfile = this.fb.group({
    team: ['',[
        Validators.required,
        Validators.pattern("^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]+$")]
    ],
    dob: ['', Validators.required],
    state: ['', Validators.required],
  });

  get f() {
    return this.editProfile.controls;
  }

  // onsubmit functioning 
  onSubmit() {
    console.log( this.datepipe.transform(this.editProfile.value.dob, 'dd/MM/yyyy'),"Date-------------------------->");
    
    if (this.editProfile.invalid) {
      this.editProfile.markAllAsTouched();
    } else {
      console.log(this.editProfile.value, 'value');
      let data = {
        dob: this.datepipe.transform(this.editProfile.value.dob,'yyyy-MM-dd'),
        state: this.editProfile.value.state,
        team: this.editProfile.value.team,
      };
      this.api.editprofile(data).subscribe((res: any) => {
        console.log(res, 'editprofile');
        this.toastr.success(res.message);
        this.router.navigate(['dashboard/home']);
      });
    }
  }
}
