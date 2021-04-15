

export interface Equiposgel {

  id?: string;
  serial: string;
  fechaCompra: Date;
  factura?: string;
  lugarInstalacion?: string;

}
// http:// ... direccion .. .com/img.png [] string


export interface Bd {

  equipos: Equiposgel[];
}

// export interface FileItem {
//   lastModified: number;
//   name: string;
//   size: number;
//   type: string;
// }
