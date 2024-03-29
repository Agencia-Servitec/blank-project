import {
  BannerJace,
  BannerJas,
  BannerJae,
  BannerFossep,
  BannerFovime,
  BannerAcmp,
  BannerBce,
  BannerCmsts,
  BannerTramites,
  Convenios,
} from "../images";

export const departments = [
  {
    id: "jace-01",
    title: "jace",
    titleLarge: "Jefatura de Administración de Casas del Ejército",
    banner: BannerJace,
    externalUrl: "https://jace.cobiene.mil.pe/",
  },
  {
    id: "jae-03",
    title: "jae",
    banner: BannerJae,
    titleLarge: "Jefatura de Apoyo Educativo",
    externalUrl: "https://jae.cobiene.mil.pe/",
  },
  {
    id: "dae-02",
    title: "das",
    titleLarge: "Departamento de Apoyo Social",
    banner: BannerJas,
    url: "/sub-departments/dae-02",
  },
  {
    id: "fossep-04",
    title: "fossep",
    banner: BannerFossep,
    titleLarge: "Fondo Solidario de Sepelio del Ejército del Perú",
    externalUrl: "https://www.fossep.com.pe/",
  },
  {
    id: "fovime-05",
    title: "fovime",
    banner: BannerFovime,
    titleLarge: "Fondo de Vivienda Militar del Ejército",
    externalUrl: "https://fovime.com/",
  },
  {
    id: "acmp-06",
    title: "acmp",
    banner: BannerAcmp,
    titleLarge: "Asociación Círculo Militar del Perú",
    externalUrl: "https://www.circulomilitardelperu.com/",
  },
  {
    id: "bce-07",
    title: "b.c.e",
    banner: BannerBce,
    titleLarge: "Bazar Central del Ejército",
    externalUrl: "http://www.tubazar.com.pe/",
  },
  {
    id: "cmsts-08",
    title: "cmsts",
    banner: BannerCmsts,
    titleLarge: "Círculo Militar Supervisores Tecnicos de Sub Oficiales",
    externalUrl: "https://cmsts.cobiene.mil.pe",
  },
  {
    id: "flip-book-pages",
    title: "catálogo",
    banner: Convenios,
    titleLarge: "Catálogo",
    url: "/flip-book",
  },
  {
    id: "tramites-09",
    title: "tramites",
    banner: BannerTramites,
    titleLarge: "Tramites",
    externalUrl: "https://tramites.cobiene.mil.pe/",
  },
];
