import { Component, ElementRef, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  DatosConsulta,
  INTERESES,
  armarMensaje,
  enlaceWhatsApp,
  interesDesdeUrl,
} from '../../logica/consulta';
import {
  CampoConsulta,
  LIMITES,
  contarCaracteres,
  errorDeCampo,
} from '../../logica/consulta-validacion';

/** Adapta la regla pura de `consulta-validacion.ts` al formulario reactivo. */
function validar(campo: CampoConsulta): ValidatorFn {
  return (control: AbstractControl<string>): ValidationErrors | null => {
    const error = errorDeCampo(campo, control.value);
    return error ? { consulta: error } : null;
  };
}

const CAMPOS: CampoConsulta[] = ['nombre', 'negocio', 'rubro', 'localidad', 'interes', 'mensaje'];

/** Página `/consulta`: arma la consulta y la abre en WhatsApp. No guarda ni envía datos. */
@Component({
  selector: 'wl-consulta',
  imports: [ReactiveFormsModule],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.css',
})
export class ConsultaComponent {
  private readonly elemento = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly ruta = inject(ActivatedRoute);

  protected readonly intereses = INTERESES;
  protected readonly maxMensaje = LIMITES.mensaje.max;

  protected readonly form = inject(FormBuilder).nonNullable.group({
    nombre: ['', validar('nombre')],
    negocio: ['', validar('negocio')],
    rubro: ['', validar('rubro')],
    localidad: ['', validar('localidad')],
    interes: [
      interesDesdeUrl(this.ruta.snapshot.queryParamMap.get('plan')),
      validar('interes'),
    ],
    mensaje: ['', validar('mensaje')],
  });

  /** Mensaje de error visible: solo después de salir del campo o de intentar enviar. */
  protected error(campo: CampoConsulta): string | null {
    const control = this.form.controls[campo];
    if (!control.touched) {
      return null;
    }
    const errores = control.errors;
    return errores ? String(errores['consulta']) : null;
  }

  protected largoMensaje(): number {
    return contarCaracteres(this.form.controls.mensaje.value);
  }

  protected enviar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.enfocarPrimerError();
      return;
    }
    const datos: DatosConsulta = this.form.getRawValue();
    this.abrirWhatsApp(enlaceWhatsApp(armarMensaje(datos)));
  }

  /** Encapsulado para poder testear sin abrir ventanas. */
  abrirWhatsApp(url: string): void {
    window.open(url, '_blank', 'noopener');
  }

  private enfocarPrimerError(): void {
    const campo = CAMPOS.find((c) => this.form.controls[c].invalid);
    if (campo) {
      this.elemento.nativeElement.querySelector<HTMLElement>(`#wl-consulta-${campo}`)?.focus();
    }
  }
}
