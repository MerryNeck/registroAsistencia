import { Component, OnInit } from "@angular/core";
import { Usuario } from "models/usuario.model";
import { NgForm } from "@angular/forms";
import { RegistroService } from "services/registro.service";
import Swal from "sweetalert2";
import { Router, RouterLink } from "@angular/router";
import { AreaService } from "services/area.service";
import { RolService } from "services/rol.service";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.css"],
})
export class RegistroComponent implements OnInit {
  ciBusqueda: string = "";
  usuarios: any[] = [];
  public nuevoUsuario: Usuario = new Usuario(0, "", "", "", "", "", "", "", 0, 0);
  editandoUsuario: Usuario | null = null;
  estado: string;
  public res: any;
  public areas: any[] = [];
  public roles: any[] = [];
  token: string = "";
  public users: any;
  rutaRol: string = "";

  constructor(
    private usuarioService: RegistroService,
    private router: Router,
    private rolService: RolService,
    private areaService: AreaService,

  ) {
    this.token = localStorage.getItem('token') || ''
    this.rutaRol = localStorage.getItem('rol') || '';
    if (this.token === '' && this.rutaRol === '') {
      this.router.navigate(['/login'])
    } else if (this.rutaRol !== 'admin') {
      this.router.navigate(['/asistencia'])
    } else {
      this.obtenerUsuarios();
    }
  }

  ngOnInit(): void {
    this.areaService.listarAreas(this.token, this.rutaRol).subscribe(
      (response: any) => {
        if (response.ok) {
          console.log("Respuesta del servicio de áreas:", response);
          this.areas = response.data;
          console.log(this.areas);
        }
      },
      (error) => {
        console.error("Error al cargar las áreas", error);
        (error) =>
          Swal.fire("Error", "No se pudo registrar el area", "error");
      },
    );
    this.rolService.listarRol(this.token, this.rutaRol).subscribe(
      (response: any) => {
        if (response.ok) {
          console.log("Respuesta del servicio de rol:", response);
          this.roles = response.data;
          console.log(this.roles);
        }

      },
      (error) => {
        console.error("Error al cargar los roles", error);
        (error) =>
          Swal.fire("Error", "No se pudo registrar el area", "error");
      },
    );
    console.log(this.rolService.listarRol);
    console.log(this.areaService.listarAreas);

    this.obtenerUsuarios();
  }
  obtenerUsuarios(): void {
    this.usuarioService.obtenerUsuario(this.token, this.rutaRol).subscribe((response: any) => {
      console.log(response);
      if (response.ok) {
        this.users = response.data;
        console.log(this.users);
        
      } else {
      }
      error => Swal.fire('Error', 'No se pudieron obtener los usuarios', 'error')
    });
  }
  registrarNuevoUsuario(form: NgForm): void {
    
   // console.log(this.nuevoUsuario);

    if (form.valid) {
      
     console.log(form.value);
      const { ci, nombre, apellido_materno, apellido_paterno, id_rol, id_area } =
        form.value;

      this.nuevoUsuario.ci = ci;
      this.nuevoUsuario.nombre = nombre;
      this.nuevoUsuario.apellido_paterno = apellido_paterno;
      this.nuevoUsuario.apellido_materno = apellido_materno;
      this.nuevoUsuario.id_rol = parseInt(id_rol, 1000);
      this.nuevoUsuario.id_area = parseInt(id_area, 1000);

      this.usuarioService
        .registrarUsuario(this.nuevoUsuario, this.token, this.rutaRol)
        .subscribe(
          (response: any) => {
            this.users = response.data
            this.usuarios.push(this.users);
            this.nuevoUsuario = new Usuario(
              0,
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              0,
              0,
            );
            form.reset();

            this.obtenerUsuarios();
            Swal.fire(
              "Éxito",
              "El usuario fue registrado correctamente",
              "success"
            );

          },
          (error) =>
            Swal.fire("Error", "No se pudo registrar el usuario", "error")
        );
    } else {
      Swal.fire(
        "Advertencia",
        "Por favor, complete todos los campos",
        "warning"
      );
    }
  }
  editarUsuario(usuario: Usuario): void {
    this.router.navigate(["/editar-registro", usuario.id_usuario]);
  }

  buscarUsuarioPorCi(ci: string): void {
    this.usuarioService.buscarPorCi(ci, this.token, this.rutaRol).subscribe(
      (response) => {
        this.res = response;
        this.users = this.res.data;
      }, (error) => {
        console.error("Error al buscar registro de usuario por CI", error),
          Swal.fire("Error", "Ingrese de nuevo los datos", "error");
      });
  }


  cambiarEstadoRegistro(idUsuario: number, nuevoEstado: string) {
    const estadoAnterior = this.estado;
    this.estado = nuevoEstado;

    this.usuarioService
      .cambiarEstadoUsuario(idUsuario, nuevoEstado, this.token, this.rutaRol)
      .subscribe((response) => {
        this.res = response;
        this.estado = this.res.data
        Swal.fire({
          title: "¡Éxito!",
          text: `Estado del usuario actualizado correctamente a ${this.estado === "s" ? "activado" : "desactivado"
            }.`,
          icon: "success",
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (result.value) {
            this.obtenerUsuarios();
          }
        });
      });

    (error) => {
      console.error("Error al cambiar el estado:", error);
      this.estado = estadoAnterior;
      Swal.fire({
        title: "Error",
        text: "No se pudo cambiar el estado del usuario.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }

  }
}
