import { Component, OnInit } from "@angular/core";
import { Usuario } from "models/usuario.model";
import { NgForm } from "@angular/forms";
import { RegistroService } from "services/registro.service";
import Swal from "sweetalert2";
import { Router, RouterLink } from "@angular/router";
import { LoginService } from "services/login.service";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.css"],
})
export class RegistroComponent implements OnInit {
  ciBusqueda: string = "";
  public usuarios: any[] = [];
  public nuevoUsuario: Usuario = new Usuario(0,"","","","","","","",0,0);
  public editandoUsuario: Usuario | null = null;
  public estado: string;
  public res: any;
  public areas: any[] = [];
  public roles: any[] = [];
  public token: string = "";
  public users : any;
 
  constructor(
    private usuarioService: RegistroService,
    private router: Router

  ) {
    this.token= localStorage.getItem('token')
  }

  ngOnInit(): void {
    this.usuarioService.getAreas(this.token).subscribe(
      (response : any) => {
        this.areas = response.data;
        console.log(this.areas);
        
      },
      (error) => {
        console.error("Error al cargar las áreas", error);
        (error) =>
          Swal.fire("Error", "No se pudo registrar el area", "error");
      },
    );
    this.usuarioService.getRoles(this.token).subscribe(
      (response : any) => {
        this.roles = response.data;
        console.log(this.roles);
        
      },
       (error) => {
        console.error("Error al cargar los roles", error);
        (error) =>
          Swal.fire("Error", "No se pudo registrar el area", "error");
      },
    );

    this.obtenerUsuarios();

  }
  obtenerUsuarios(): void {
    this.usuarioService.obtenerUsuario(this.token).subscribe((response: any) => {
      //console.log(response);
      if (response.ok) {
        this.usuarios = response.data;
        console.log(this.usuarios);
        console.log(this.token);
        
      } else {
      }
      //error => Swal.fire('Error', 'No se pudieron obtener los usuarios', 'error')
    });
  }
  registrarNuevoUsuario(form: NgForm): void {
    console.log(form.value);
    
    if (form.valid) {
      const { ci, nombre, apellido_materno, apellido_paterno, estado } =
        form.value;
      this.nuevoUsuario.ci = ci;
      this.nuevoUsuario.nombre = nombre;
      this.nuevoUsuario.apellido_paterno = apellido_paterno;
      this.nuevoUsuario.apellido_materno = apellido_materno;
      this.nuevoUsuario.estado = estado;
      this.usuarioService
        .registrarUsuario(this.nuevoUsuario, this.token)
        .subscribe(
          (usuario) => {
            this.usuarios.push(usuario);
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
              0
            );
            form.reset();
            this.router.navigate(["/registro"]);
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
    this.usuarioService.buscarPorCi(ci, this.token).subscribe(
       (response) => {
        this.res = response;
        this.users=this.res.data;
      },(error) => {
        console.error("Error al buscar registro de usuario por CI", error),
          Swal.fire("Error", "Ingrese de nuevo los datos", "error");
      });
    }
  

  cambiarEstadoRegistro(idUsuario: number, nuevoEstado: string) {
    const estadoAnterior = this.estado;
    this.estado = nuevoEstado;

    this.usuarioService
      .cambiarEstadoUsuario(idUsuario, nuevoEstado, this.token)
      .subscribe((response) => {
        this.res=response;
        this.estado =this.res.data
          Swal.fire({
            title: "¡Éxito!",
            text: `Estado del usuario actualizado correctamente a ${
              this.estado=== "s" ? "activado" : "desactivado"
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
