import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PedidosService } from '../../../services/pedidos-service';
import { MatAnchor } from "@angular/material/button";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-creaedita',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatAnchor, MatDatepickerModule, MatNativeDateModule, MatInputModule, RouterLink],
  templateUrl: './creaedita.html',
  styleUrl: './creaedita.css',
})
export class Creaedita implements OnInit {
  private route = inject(ActivatedRoute);
  private pS = inject(PedidosService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private pedidoId:number = 0;

  form = this.fb.group({
    numeroPedido: ['', Validators.required],
    precioTotal: this.fb.control<number> (0, [ Validators.required, Validators.min(1)]),
    fechaPedido: this.fb.control<Date|null>(null, Validators.required),
    estado: [0, Validators.required],
    observaciones: ['', [Validators.required, Validators.maxLength(260)]]
  })

  constructor() {}

  ngOnInit(): void {
    this.pedidoId = Number(this.route.snapshot.paramMap.get('id'));
    if(this.pedidoId){
      this.pS.getPedidosById(this.pedidoId).subscribe(
        data => {
          this.form.patchValue({
            numeroPedido: data.numeroPedido,
            precioTotal: data.precioTotal,
            estado: data.estado,
            fechaPedido: new Date(data.fechaPedido),
            observaciones: data.observaciones
          });
        }
      );
    }
  }

  submit() {
    if(this.form.valid) {
      const values = this.form.value;
      const payload = {
        NumeroPedido: values.numeroPedido ?? '',
        PrecioTotal: values.precioTotal ?? 0,
        Estado: values.estado ?? 0,
        FechaPedido: values.fechaPedido!,
        Observaciones: values.observaciones ?? ''
      }

      if(this.pedidoId > 0){
        this.pS.UpdatePedido(payload, this.pedidoId).subscribe({
          next: () => {
            this.router.navigate(['/pedidos']);
          },
          error: (err) => {
            console.error(err);
          }
        })
      }
      else{
        this.pS.CreatePedido(payload).subscribe({
          next: () => {
            this.router.navigate(['/pedidos']);
          },
          error: (err) => {
            console.error(err);
          }
        })
      }
    } else{
      this.form.markAllAsTouched();
    }
  }
}
