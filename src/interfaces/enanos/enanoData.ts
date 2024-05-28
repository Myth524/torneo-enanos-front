interface EnanoData {
  _id: string;
  nombre: string;
  genero: string;
  edad: number;
  estatura: number;
  peso: number;
  rango: number;
  stamina: number;
  golpeo: number;
  experiencia: number;
  golpesCabeza: number;
  golpesTorso: number;
  golpesPiernas: number;
  golpesRecibidos: number;
  artesMarciales?: string[]; 
  peleas?: string[]; 
  historia_id?: string; 
  habilidadEspecial_id?: string; 
  biografia_id?: string;
  onVisualizar: () => void;
  onEliminar: () => void;
}