import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators'

@Component({
  selector: 'app-form-model',
  templateUrl: './form-model.component.html',
  styleUrls: ['./form-model.component.css']
})
export class FormModelComponent implements OnInit {
  
  form: FormGroup

  constructor() { 
    this.form = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]),
      apellidos: new FormControl('Apellidos'),
      email: new FormControl('Email', [
        Validators.required,
        Validators.email
      ]),
      edad: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]*$/),
        this.edadValidator
      ]),
      password: new FormControl('', [
        Validators.pattern(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$/)
      ]),
    })
    let controlNombre = this.form.controls.nombre
    controlNombre.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value) => {
        console.log(value)
      })
  }

  edadValidator(control) {
    let edadMax = 65
    let edadMin = 18

    let edadNum = parseInt(control.value)

    if(edadNum < edadMin || edadNum > edadMax) {
      return {
        edadMadura: {
        edadMaxima: edadMax,
        edadMinima: edadMin
        }
      }
    } else {
      return null
    }
  }

  ngOnInit() {
    console.log(this.form.value)
  }

  envioFormulario() {
    console.log(this.form.value)
    console.log(this.form.valid)
  }

}
