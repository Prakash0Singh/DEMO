import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AppLoaderService } from '../app-loader/app-loader.service';
import { NgOtpInputConfig } from 'ng-otp-input';

@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.scss']
})
export class KycComponent implements OnInit {

  userDetails:any=[];
  otp:any;
  pan:any=[];
  uploadedImage!: File;
  uploadedImage2!: File;
  frontImage!: File;
  backImage!: File;
  image1:any=''
  image2:any=''
  imgSrc:any;
  bankInfo:any=[]
  @ViewChild('closeBtn') modalCloseBtn !: ElementRef
  maxDate = new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0];
  front: any='';
  back: any='';
  aadhaar: any;


  constructor(private api : ApiService, private fb : FormBuilder, private tostr : ToastrService,private router : Router,private loader : AppLoaderService) { }
//  email verfication form generation 
  emailVerify = this.fb.group({
    email:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]]
  })
// getter of form 
  get f(){
    return this.emailVerify.controls;
  }


  // ngotp input configuration 
  configuration:NgOtpInputConfig={
    length:4,
    isPasswordInput:true,
    allowNumbersOnly:true,
    placeholder: '*',
    inputClass: 'border-0 border-bottom rounded-0 border-dark mx-2',
   
  }

  // close btn 
  close(){
    this.modalCloseBtn.nativeElement.click();
  }
//  mobile verification form 
  mobVerify = this.fb.group({
    mobile:['',Validators.required]
  })

  get f2(){
    return this.mobVerify.controls; 
  }
  ngOnInit(): void {
    this.loader.open()
    this.allVerify()

    this.panDetails();
    this.aadhaarDetails();
    this.bankDetails();
  }

// all verify api to confirm verification process
  allVerify(): void {
    this.api.allVerify().subscribe((res:any)=>{
      this.userDetails = res.data;
      console.log(this.userDetails,"DETAILS");
    })
  }

  //  get adhar details 
  aadhaarDetails(){
    this.api.getAadhaarDetails().subscribe((res:any)=>{
      console.log(res,"PAN DETAILS");
      this.aadhaar = res.data;
    })
  }
//  get pan details of user 
  panDetails(){
    this.api.getPanDetails().subscribe((res:any)=>{
      console.log(res,"PAN DETAILS");
      this.pan = res.data;
    })
  }

//  get bank details of user 
  bankDetails(){
    this.api.getBankDetails().subscribe((res:any)=>{
      console.log(res,"BANK DETAILS");
      this.bankInfo = res.data
      this.loader.close()
    })
  }
 
  //  submit email for verification 
  submitEmail(){
    if(this.emailVerify.valid){
      console.log(this.emailVerify.value,"VALUEE");
      let data = this.emailVerify.value;
      
      this.api.verifyEmail(data).subscribe((res:any)=>{
        if(res.status == true){
          this.tostr.success(res.message)
          document.getElementById('#openmodal')?.click();
        }
        else{       
            this.tostr.error(res.message)
        }
      })
    }

    this.emailVerify.markAllAsTouched()
    
  }


  // submit mobile number for verification 
  submitMob(){
    if(this.mobVerify.valid){
      console.log(this.mobVerify.value,"VALUEE");
      let data = this.mobVerify.value;
      
      this.api.verifyMobileNumber(data).subscribe((res:any)=>{
        if(res.status == true){
          this.tostr.success(res.message)
          document.getElementById('#openmodal')?.click();
        }
        else{       
            this.tostr.error(res.message)
        }
      })
    }

    this.mobVerify.markAllAsTouched()

  }

  // otp filled data  by user 
  otpIn(evt:any){
    console.log(evt,"OTP");  
    this.otp = evt;
  }
 
  //  verification of otp field 
  verifyOTP(){
    let data = {
      code : this.otp,
      mobile : this.mobVerify.value.mobile,
      email : this.emailVerify.value.email
    }

    this.api.verifyCode(data).subscribe((res:any)=>{
      if(res.status == true){
        this.tostr.success(res.message)
        setTimeout(()=>{
          window.location.reload();
        },1000)
      }
      else{       
        this.tostr.error(res.message)
      }
    })
  }

  // uploading pan details 
  panUpload(evt:any){
    console.log(evt.target.files[0],"EVENT")
    this.uploadedImage = evt.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = () => {
      this.image1 = reader.result;
    };
  }
  // uploading front image of adhar 
  frontUpload(evt:any){
    console.log(evt.target.files[0],"EVENT")
    this.frontImage = evt.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.frontImage);
    reader.onload = () => {
      this.front = reader.result;
    };
  }
 // uploading back image of adhar 
   backUpload(evt:any){
    console.log(evt.target.files[0],"EVENT")
    this.backImage = evt.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.backImage);
    reader.onload = () => {
      this.back = reader.result;
    };
  }

  // pan verification form 
  panCardUpload = this.fb.group({
    panname:['',Validators.required],
    dob:['',Validators.required],
    pannumber:['',[Validators.required,Validators.pattern("[A-Z]{5}[0-9]{4}[A-Z]{1}")]],
    image:['',Validators.required]
  })
  get f3(){
    return this.panCardUpload.controls
  }

 
  // adhar verification form 
  aadhaarCardUpload = this.fb.group({
    aadharname:['',Validators.required],
    aadharnumber:['',Validators.required],
    state:['',Validators.required],
    front:['',Validators.required],
    back:['',Validators.required],
  })

  get ac(){
    return this.aadhaarCardUpload.controls
  }

// submit adhar details 
  submitAadhaar(){
    if(this.aadhaarCardUpload.valid){
     let data:FormData = new FormData();
     data.append('aadharname',this.aadhaarCardUpload.value.aadharname||'');
     data.append('aadharnumber',this.aadhaarCardUpload.value.aadharnumber||'');
     data.append('state',this.aadhaarCardUpload.value.state||'');
     data.append('typename','aadharcard');
     data.append('front',this.frontImage);
     data.append('back',this.backImage);
     this.api.aadhaarUpload(data).subscribe((res:any)=>{
       if(res.success == true){
         this.tostr.success(res.message)
         this.aadhaarDetails()
           window.location.reload();
        
       }else{
         this.tostr.error(res.message)
       }
     }) 
    }
    this.aadhaarCardUpload.markAllAsTouched();
   }

// submit pan details 
  submitPan(){
   if(this.panCardUpload.valid){
    let imageFormData:FormData = new FormData();
    imageFormData.append('typename','uploads');
    imageFormData.append('image',this.uploadedImage);
    imageFormData.append('panname',this.panCardUpload.value.panname||'');
    imageFormData.append('dob',this.panCardUpload.value.dob||'');
    imageFormData.append('pannumber',this.panCardUpload.value.pannumber||'');
    this.api.panUpload(imageFormData).subscribe((res:any)=>{
      console.log(res,"IMAGEEEE");
      if(res.success == true){
        this.tostr.success(res.message)
        this.panDetails()
          window.location.reload();
      }else{
        this.tostr.error(res.message)
      }
    }) 
   }
   this.panCardUpload.markAllAsTouched();
  }

  
// event to open modal of image 
  onClick(event:any){
    // console.log("helloo");
    const imgElem = event.target;
    var target = event.target || event.srcElement || event.currentTarget;
    var srcAttr = target.attributes.src;
    this.imgSrc = srcAttr.nodeValue;
  }

  // bank verification form 
  bankUpload = this.fb.group({
    accName:['',Validators.required],
    accNumber:['',[
      Validators.required,
      (c: AbstractControl) => Validators.required(c),
    ]],
    accNumber2:['',[
      Validators.required,
      (c: AbstractControl) => Validators.required(c),
    ]],
    branch:['',Validators.required],
    bank:['',Validators.required],
    IFSC:['',[Validators.required,Validators.pattern("^[A-Z]{4}0[A-Z0-9]{6}$")]],
    state:['',Validators.required],
    image:['',Validators.required]
  },
  {
    validator: this.ConfirmedValidator('accNumber', 'accNumber2'),
  }
  )

  get f4(){
    return this.bankUpload.controls
  }


  bank(evt:any){
    console.log(evt.target.files[0],"EVENT")
    this.uploadedImage2 = evt.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage2);
    reader.onload = () => {
      this.image2 = reader.result;
    };
  }
 
  // uploadinjg bank details 
  onBankUpload(){
    if(this.bankUpload.valid){
      let imageFormData:FormData = new FormData();
    imageFormData.append('typename','uploads');
    imageFormData.append('image',this.uploadedImage2);
    imageFormData.append('accountholder',this.bankUpload.value.accName ||'');
    imageFormData.append('accno',this.bankUpload.value.accNumber2 ||'');
    imageFormData.append('bankbranch',this.bankUpload.value.branch ||'');
    imageFormData.append('bankname',this.bankUpload.value.bank ||'');
    imageFormData.append('ifsc',this.bankUpload.value.IFSC ||'');
    imageFormData.append('state',this.bankUpload.value.state ||'');

    this.api.bankUpload(imageFormData).subscribe((res:any)=>{
      console.log(res,"IMAGEEEE");
      if(res.success == true){
        this.tostr.success(res.message)
        this.api.getBankDetails().subscribe((res:any)=>{
          console.log(res,"BANK DETAILS");
          this.bankInfo = res.data
          window.location.reload();
        })
      }else{
        this.tostr.error(res.message)
      }
    }) 
     }
     this.bankUpload.markAllAsTouched();
  }
//  custom validator for matching account number 
  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors['confirmedValidator']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  //  only number validation 
  keyPressNumbers(event:any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  AlphaOnly(event:any) {
    var charCode = (event.which) ? event.which : event.keyCode;

    if ((charCode < 48 || charCode > 57)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  };

  onBack(){
    window.history.go(-1)
  }
}
