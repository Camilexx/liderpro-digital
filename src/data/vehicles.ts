export interface VehicleModelItem {
  model: string;
  years: number[];
  engines: string[];
  recommendedCategories: {
    baterias?: string[]; // product SKUs
    lubricantes?: string[];
    filtros?: string[];
    refrigerantes?: string[];
    frenos?: string[];
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
        model: "Sail",
        years: [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
        engines: ["1.4L Gasolina", "1.5L Gasolina"],
        recommendedCategories: {
          baterias: ["LP-BAT-NS60L-55"],
          lubricantes: ["LP-LUB-5W30-SYN"],
          filtros: ["LP-FIL-ACE-CS101"],
          refrigerantes: ["LP-REF-OAT-5050"],
          frenos: ["LP-FRE-CER-044"],
        },
      },
      {
        model: "Tracker Turbo",
        years: [2020, 2021, 2022, 2023, 2024],
        engines: ["1.2L Turbo Gasolina"],
        recommendedCategories: {
          baterias: ["LP-BAT-DIN66-660"],
          lubricantes: ["LP-LUB-5W30-SYN"],
          refrigerantes: ["LP-REF-OAT-5050"],
        },
      },
      {
        model: "D-Max",
        years: [2010, 2012, 2014, 2016, 2018, 2020, 2022],
        engines: ["2.5L Diésel Turbo", "3.0L Diésel CRDi"],
        recommendedCategories: {
          lubricantes: ["LP-LUB-15W40-DIESEL"],
          refrigerantes: ["LP-REF-OAT-5050"],
        },
      },
      {
        model: "Aveo Family",
        years: [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
        engines: ["1.5L 8V"],
        recommendedCategories: {
          baterias: ["LP-BAT-NS60L-55"],
          filtros: ["LP-FIL-ACE-CS101"],
          refrigerantes: ["LP-REF-OAT-5050"],
        },
      },
    ],
  },
  {
    make: "Kia",
    models: [
      {
        model: "Rio",
        years: [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021],
        engines: ["1.4L MPI", "1.6L GDI"],
        recommendedCategories: {
          baterias: ["LP-BAT-NS60L-55"],
          lubricantes: ["LP-LUB-5W30-SYN"],
          filtros: ["LP-FIL-ACE-CS101"],
          refrigerantes: ["LP-REF-OAT-5050"],
        },
      },
      {
        model: "Sportage Active",
        years: [2009, 2011, 2013, 2015, 2017, 2019, 2020],
        engines: ["2.0L Gasolina"],
        recommendedCategories: {
          baterias: ["LP-BAT-DIN66-660"],
          lubricantes: ["LP-LUB-5W30-SYN"],
          frenos: ["LP-FRE-CER-044"],
          refrigerantes: ["LP-REF-OAT-5050"],
        },
      },
    ],
  },
  {
    make: "Hyundai",
    models: [
      {
        model: "Tucson",
        years: [2010, 2012, 2014, 2016, 2018, 2020],
        engines: ["2.0L Gasolina"],
        recommendedCategories: {
          baterias: ["LP-BAT-DIN66-660"],
          lubricantes: ["LP-LUB-5W30-SYN"],
          frenos: ["LP-FRE-CER-044"],
        },
      },
      {
        model: "Accent",
        years: [2012, 2014, 2016, 2018, 2020],
        engines: ["1.4L Gasolina", "1.6L Gasolina"],
        recommendedCategories: {
          baterias: ["LP-BAT-NS60L-55"],
          lubricantes: ["LP-LUB-5W30-SYN"],
          filtros: ["LP-FIL-ACE-CS101"],
        },
      },
    ],
  },
  {
    make: "Toyota",
    models: [
      {
        model: "Yaris",
        years: [2008, 2010, 2012, 2014, 2016, 2018, 2020, 2022],
        engines: ["1.3L 2NZ-FE", "1.5L 1NZ-FE"],
        recommendedCategories: {
          baterias: ["LP-BAT-NS60L-55"],
          lubricantes: ["LP-LUB-5W30-SYN"],
          refrigerantes: ["LP-REF-OAT-5050"],
        },
      },
      {
        model: "Hilux",
        years: [2006, 2010, 2014, 2018, 2020, 2022],
        engines: ["2.5L 2KD-FTV Diésel", "2.8L 1GD-FTV Diésel", "2.7L 2TR-FE Gasolina"],
        recommendedCategories: {
          lubricantes: ["LP-LUB-15W40-DIESEL"],
          refrigerantes: ["LP-REF-OAT-5050"],
        },
      },
    ],
  },
  {
    make: "Renault",
    models: [
      {
        model: "Duster",
        years: [2013, 2015, 2017, 2019, 2021, 2023],
        engines: ["1.6L 16V", "2.0L 16V"],
        recommendedCategories: {
          baterias: ["LP-BAT-DIN66-660"],
          frenos: ["LP-FRE-CER-044"],
          refrigerantes: ["LP-REF-OAT-5050"],
        },
      },
    ],
  },
  {
    make: "Nissan",
    models: [
      {
        model: "Tiida",
        years: [2007, 2009, 2011, 2013, 2015, 2017],
        engines: ["1.6L HR16DE", "1.8L MR18DE"],
        recommendedCategories: {
          baterias: ["LP-BAT-NS60L-55"],
          lubricantes: ["LP-LUB-5W30-SYN"],
          refrigerantes: ["LP-REF-OAT-5050"],
        },
      },
      {
        model: "Frontier / NP300",
        years: [2010, 2013, 2016, 2019, 2022],
        engines: ["2.5L YD25 Diésel", "2.4L KA24 Gasolina"],
        recommendedCategories: {
          lubricantes: ["LP-LUB-15W40-DIESEL"],
          refrigerantes: ["LP-REF-OAT-5050"],
        },
      },
    ],
  },
];
