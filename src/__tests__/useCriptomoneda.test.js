import React from "react";
import { render, screen } from "@testing-library/react";
import Formulario from "../components/Formulario";
import userEvent from "@testing-library/user-event";
import { monedas, criptos } from "../__mocks__/criptomonedas";
import axios from "axios";

const mockAxios = axios;
const guardarMoneda = jest.fn();
const guardarCriptomoneda = jest.fn();

test("<useCriptomonedas />", async () => {
  // Crear funcion espia en jest para resolver peticion http mediante axios
  mockAxios.get = jest.fn().mockResolvedValue({
    data: criptos,
  });

  render(
    <Formulario
      guardarMoneda={guardarMoneda}
      guardarCriptomoneda={guardarCriptomoneda}
    />
  );

  // Verificar la cantidad de opciones de monedas
  const monedasDropDown = screen.getByTestId("select-monedas");
  expect(monedasDropDown.children.length).toEqual(monedas.length + 1);

  // Verificar la cantidad de opciones de las criptomonedas
  const opciones = await screen.findAllByTestId("opcion-cripto");
  expect(opciones).toHaveLength(10);

  expect(mockAxios.get).toHaveBeenCalled();
  expect(mockAxios.get).toHaveBeenCalledTimes(1);

  // Seleccionar Bitcoin y USD
  userEvent.selectOptions(screen.getByTestId("select-monedas"), "USD");
  userEvent.selectOptions(screen.getByTestId("select-criptos"), "BTC");

  // Submit al fomulario
  userEvent.click(screen.getByTestId("submit"));

  // Verificar que las funciones hayan sido llamadas
  expect(guardarMoneda).toHaveBeenCalled();
  expect(guardarMoneda).toHaveBeenCalledTimes(1);
  expect(guardarCriptomoneda).toHaveBeenCalled();
  expect(guardarCriptomoneda).toHaveBeenCalledTimes(1);
});
