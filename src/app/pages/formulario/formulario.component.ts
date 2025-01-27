import { ViacepService } from './../../_services/viacep.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private ViacepService: ViacepService) { }


  ngOnInit(): void {
    this.initializeForm();
    this.observePreenchimentoCep();

  }

  initializeForm() {
    this.form = this.fb.group({
      cep: ['',[Validators.required]],
      logradouro: [''],
      estado: [''],
      cidade: [''],
      bairro: [''],
    })
  }

  observePreenchimentoCep() {
    this.form.get('cep')?.valueChanges.subscribe(value => {
      if(value?.length == 8){
       // this.buscaCep();
      }
    })
  }

  buscaCep() {
    var cep = this.form.get('cep')?.value;
    this.ViacepService.getEnderecoByCep(cep).subscribe(
      {
        next: (response) => {
          this.form.patchValue({
            logradouro: response.logradouro,
            estado: response.uf,
            cidade: response.localidade,
            bairro: response.bairro,
          })
        },

        error: () => {
          console.log('Error ao buscar o cep!')
        }
      }
    )
  }

}
