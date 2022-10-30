import {
  BannerApoyoEconomico,
  BannerApoyoEducativo,
  BannerDiscapacitado,
} from "../images";

export const subDepartments = [
  {
    id: "sad-01",
    departmentId: "dae-02",
    title: "s.a.d",
    titleLarge: "Sección de Apoyo al Discapacitado",
    banner: BannerDiscapacitado,
    externalUrl: "https://sad.cobiene.mil.pe/",
  },

  {
    id: "saed-02",
    departmentId: "dae-02",
    title: "saes",
    titleLarge: "Sección de Apoyo Estudios Superiores",
    banner: BannerApoyoEducativo,
    externalUrl: "https://saed.cobiene.mil.pe/",
  },

  {
    id: "saeco-03",
    departmentId: "dae-02",
    title: "SSS",
    titleLarge: "Sección de Servicio Social",
    banner: BannerApoyoEconomico,
    externalUrl: "https://apoyosocial.cobiene.mil.pe/",
  },
];
