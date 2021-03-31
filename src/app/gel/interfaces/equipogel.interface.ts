export interface Equiposgel {
  id?: string;
  equipo: string;
  modelo: string;
  lugarInstalacion: string;
  fechacompra: Date;
  ticketcompra?: string[]; // http:// ... direccion .. .com/img.png [] strinh
}

export interface Usuario {
  id: number;
  usuario: string;
  email: string;

}


export interface Bd {
  usuarios: Usuario[];
  equipos: Equiposgel[];
}
