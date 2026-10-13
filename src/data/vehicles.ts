export interface VehicleModelItem {
  model: string;
  years: number[];
  engines: string[];
  recommendedCategories: {
    baterias?: string[]; // product SKUs
    lubricantes?: string[];
    filtros?: string[];
    refrigerantes?: string[];
    aditivos?: string[];
  };
}

export interface VehicleMake {
  make: string;
  models: VehicleModelItem[];
}

export const VEHICLE_DATABASE: VehicleMake[] = [
  {
    make: "Chevrolet",
    models: [
      {
        model: "Spark GT / Spark Life",
        years: [2011, 2013, 2015, 2017, 2019, 2021, 2023],
        engines: ["1.0L Gasolina", "1.2L 16V Gasolina"],
        recommendedCategories: {
          baterias: ["BE-BAT-NS40ZL-11"],
          lubricantes: ["MANNOL-5W30-SP", "HAVOLINE-PRODS-5W30", "CASTROL-MAGNATEC-5W30"],
          filtros: ["FRAM-FIL-BLINDADO"],
          refrigerantes: ["MANNOL-PROCOOL-5050"],
        },
      },
      {
        model: "Sail",
        years: [2012, 2014, 2016, 2018, 2020, 2022, 2024],
        engines: ["1.4L Gasolina", "1.5L DVVT Gasolina"],
        recommendedCategories: {
          baterias: ["BE-BAT-NS60-13"],
          lubricantes: ["MANNOL-5W30-SP", "HAVOLINE-PRODS-5W30", "CASTROL-MAGNATEC-5W30"],
          filtros: ["FRAM-FIL-BLINDADO"],
          refrigerantes: ["MANNOL-PROCOOL-5050"],
          aditivos: ["MANNOL-CERAMO-9829"],
        },
      },
      {
        model: "Aveo Family / Emotion",
        years: [2008, 2010, 2012, 2014, 2016, 2018, 2020],
        engines: ["1.5L 8V", "1.6L 16V"],
        recommendedCategories: {
          baterias: ["BE-BAT-NS60-13"],
          lubricantes: ["HAVOLINE-PRODS-5W30", "CASTROL-MAGNATEC-5W30", "MANNOL-5W30-SP"],
          filtros: ["FRAM-FIL-BLINDADO"],
          refrigerantes: ["MANNOL-PROCOOL-5050"],
        },
      },
      {
        model: "D-Max CRDi / 4x4",
        years: [2010, 2012, 2014, 2016, 2018, 2020, 2022, 2024],
        engines: ["2.5L Diésel Turbo", "3.0L Diésel CRDi"],
        recommendedCategories: {
          baterias: ["BE-BAT-27R-17", "BOSCH-S5-AGM-EFB"],
          lubricantes: ["MANNOL-15W40-CK4", "MOBIL-DELVAC-15W40"],
          filtros: ["FRAM-FIL-BLINDADO"],
          refrigerantes: ["MANNOL-PROCOOL-5050"],
          aditivos: ["MANNOL-CERAMO-9829"],
        },
      },
      {
        model: "Tracker Turbo / Captiva",
        years: [2019, 2020, 2021, 2022, 2023, 2024],
        engines: ["1.2L Turbo Gasolina", "1.5L Turbo Gasolina"],
        recommendedCategories: {
          baterias: ["BOSCH-S4-SILVER-66", "BOSCH-S5-AGM-EFB"],
          lubricantes: ["MANNOL-5W30-SP", "CASTROL-MAGNATEC-5W30"],
          filtros: ["FRAM-FIL-BLINDADO"],
          refrigerantes: ["MANNOL-PROCOOL-5050"],
        },
      },
      {
        model: "Camiones NHR / NKR / NPR",
        years: [2010, 2014, 2018, 2020, 2022, 2024],
        engines: ["2.8L / 3.0L / 5.2L Diésel Trabajo Pesado"],
        recommendedCategories: {
          baterias: ["BE-BAT-G31-110"],
          lubricantes: ["MANNOL-15W40-CK4", "MOBIL-DELVAC-15W40"],
          filtros: ["FRAM-FIL-BLINDADO"],
          refrigerantes: ["MANNOL-PROCOOL-5050"],
        },
      },
    ],
  },
  {
    make: "Kia",
    models: [
      {
        model: "Picanto",
        years: [2012, 2014, 2016, 2018, 2020, 2022, 2024],
        engines: ["1.0L MPI", "1.25L Kappa"],
        recommendedCategories: {
          baterias: ["BE-BAT-NS40ZL-11"],
          lubricantes: ["MANNOL-5W30-SP", "HAVOLINE-PRODS-5W30"],
          filtros: ["FRAM-FIL-BLINDADO"],
          refrigerantes: ["MANNOL-PROCOOL-5050"],
        },
      },
      {
        model: "Rio / Soluto",
        years: [2012, 2014, 2016, 2018, 2020, 2022, 2024],
        engines: ["1.4L MPI", "1.6L GDI"],
        recommendedCategories: {
          baterias: ["BE-BAT-NS60-13"],
          lubricantes: ["MANNOL-5W30-SP", "CASTROL-MAGNATEC-5W30", "HAVOLINE-PRODS-5W30"],
          filtros: ["FRAM-FIL-BLINDADO"],
          refrigerantes: ["MANNOL-PROCOOL-5050"],
        },
      },
      {
        model: "Sportage Active / GT Line",
        years: [2010, 2013, 2016, 2019, 2021, 2023, 2024],
        engines: ["2.0L DOHC Gasolina"],
        recommendedCategories: {
          baterias: ["BOSCH-S4-SILVER-66"],
          lubricantes: ["MANNOL-5W30-SP", "CASTROL-MAGNATEC-5W30"],
          filtros: ["FRAM-FIL-BLINDADO"],
          refrigerantes: ["MANNOL-PROCOOL-5050"],
        },
      },
    ],
  },
  {
    make: "Toyota",
    models: [
      {
        model: "Hilux 4x4 / D-4D",
        years: [2008, 2012, 2016, 2019, 2021, 2023, 2024],
        engines: ["2.5L 2KD-FTV Diésel", "2.8L 1GD-FTV Diésel", "2.7L Gasolina"],
        recommendedCategories: {
          baterias: ["BE-BAT-27R-17", "BOSCH-S5-AGM-EFB"],
          lubricantes: ["MANNOL-15W40-CK4", "MOBIL-DELVAC-15W40"],
          filtros: ["FRAM-FIL-BLINDADO"],
          refrigerantes: ["MANNOL-PROCOOL-5050"],
        },
      },
      {
        model: "Yaris / Corolla",
        years: [2010, 2014, 2018, 2020, 2022, 2024],
        engines: ["1.3L / 1.5L VVT-i", "1.8L Dual VVT-i"],
        recommendedCategories: {
          baterias: ["BE-BAT-NS60-13"],
          lubricantes: ["MANNOL-5W30-SP", "MOBIL-DELVAC-15W40", "HAVOLINE-PRODS-5W30"],
          filtros: ["FRAM-FIL-BLINDADO"],
          refrigerantes: ["MANNOL-PROCOOL-5050"],
        },
      },
    ],
  },
  {
    make: "Hyundai",
    models: [
      {
        model: "Grand i10 / i10",
        years: [2012, 2015, 2018, 2020, 2022, 2024],
        engines: ["1.0L / 1.2L Kappa"],
        recommendedCategories: {
          baterias: ["BE-BAT-NS40ZL-11"],
          lubricantes: ["MANNOL-5W30-SP", "HAVOLINE-PRODS-5W30"],
          filtros: ["FRAM-FIL-BLINDADO"],
          refrigerantes: ["MANNOL-PROCOOL-5050"],
        },
      },
      {
        model: "Accent / Creta",
        years: [2012, 2015, 2018, 2020, 2022, 2024],
        engines: ["1.4L / 1.6L Gamma"],
        recommendedCategories: {
          baterias: ["BE-BAT-NS60-13", "BOSCH-S4-SILVER-66"],
          lubricantes: ["MANNOL-5W30-SP", "CASTROL-MAGNATEC-5W30"],
          filtros: ["FRAM-FIL-BLINDADO"],
          refrigerantes: ["MANNOL-PROCOOL-5050"],
        },
      },
      {
        model: "Tucson",
        years: [2011, 2014, 2017, 2020, 2022, 2024],
        engines: ["2.0L MPI / GDI"],
        recommendedCategories: {
          baterias: ["BOSCH-S4-SILVER-66"],
          lubricantes: ["MANNOL-5W30-SP", "CASTROL-MAGNATEC-5W30"],
          filtros: ["FRAM-FIL-BLINDADO"],
          refrigerantes: ["MANNOL-PROCOOL-5050"],
        },
      },
    ],
  },
  {
    make: "Mazda / Nissan / Ford",
    models: [
      {
        model: "Mazda BT-50 / Nissan Frontier NP300",
        years: [2010, 2014, 2018, 2020, 2022, 2024],
        engines: ["2.5L Diésel Turbo", "3.2L Diésel"],
        recommendedCategories: {
          baterias: ["BE-BAT-27R-17", "BOSCH-S5-AGM-EFB"],
          lubricantes: ["MANNOL-15W40-CK4", "MOBIL-DELVAC-15W40"],
          filtros: ["FRAM-FIL-BLINDADO"],
          refrigerantes: ["MANNOL-PROCOOL-5050"],
        },
      },
    ],
  },
  {
    make: "Motos (Shineray / Daytona / Bajaj / Honda)",
    models: [
      {
        model: "Motos 4T Trabajo, Reparto y Alta Cilindrada",
        years: [2015, 2018, 2020, 2022, 2023, 2024],
        engines: ["125cc - 250cc 4T Aire/Aceite", "250cc - 1000cc Alto Rendimiento"],
        recommendedCategories: {
          lubricantes: ["MOTUL-5100-4T", "MOTUL-7100-4T"],
        },
      },
    ],
  },
  {
    make: "Pesado / Camaroneras / Flotas",
    models: [
      {
        model: "Hino / Motores Estacionarios / Maquinaria",
        years: [2010, 2014, 2018, 2020, 2022, 2024],
        engines: ["Diésel Heavy Duty / Bombas Camaroneras"],
        recommendedCategories: {
          baterias: ["BE-BAT-G31-110"],
          lubricantes: ["MANNOL-15W40-CK4", "MOBIL-DELVAC-15W40"],
          filtros: ["FRAM-FIL-BLINDADO"],
        },
      },
    ],
  },
];
