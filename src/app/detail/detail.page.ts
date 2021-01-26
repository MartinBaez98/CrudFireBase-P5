import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Estudiante } from '../models/estudiante';
import { EstudianteService } from '../services/estudiante.service';
import { ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  student: Estudiante;
  public myForm: FormGroup;
  //Banderas
  public nameFlag = true;
  public ncFlag = true;
  public curpFlag = true;
  public ageFlag = true;

  constructor(private service: EstudianteService,
    private actroute: ActivatedRoute, 
    private router:Router, 
    private toast: ToastController,
    private fb: FormBuilder) { 
      this.actroute.queryParams.subscribe(
        params => {
          if(params && params.special){
            this.student = JSON.parse(params.special) as Estudiante;
            console.log(this.student);
          }
        }
      )
    }

    async presentToast(message: string) {
      const toast = await this.toast.create({
        message: message,
        duration: 2000
      });
      toast.present();
    }

    update(){
      this.student = {
        id:this.student.id,
        name:this.myForm.controls.name.value,
        controlnumber:this.myForm.controls.controlnumber.value,
        curp:this.myForm.controls.curp.value,
        age:this.myForm.controls.age.value,
        active:this.myForm.controls.active.value
      }

      this.service.updateStudent(this.student,this.student.id);
      this.presentToast("Datos actualizados.");
      this.disabledAll();
      this.ngOnInit();
    }

    disabledAll(){
      this.nameFlag = true;
      this.ncFlag = true;
      this.curpFlag = true;
      this.ageFlag = true;
    }

  ngOnInit() {
    this.myForm = this.fb.group({
      name:new FormControl({value: this.student.name, disabled: false}),
      controlnumber:new FormControl({value: this.student.controlnumber, disabled:false}),
      curp:new FormControl({value: this.student.curp, disabled:false}),
      age:new FormControl({value: this.student.age, disabled:false}),
      active:new FormControl({value: this.student.active, disabled:false })
    });
  }

}
