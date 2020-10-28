import { readFileSync } from "fs";
import path from "path";

export const criptos = JSON.parse(
  readFileSync(path.join(__dirname, "api.json")).toString()
);

export const monedas = [
  { codigo: "USD", nombre: "Dolar de Estados Unidos" },
  { codigo: "CLP", nombre: "Peso Chileno" },
  { codigo: "MXN", nombre: "Peso Mexicano" },
  { codigo: "EUR", nombre: "Euro" },
  { codigo: "GBP", nombre: "Libra Esterlina" },
];
