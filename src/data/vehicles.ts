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
          baterias: ["03042-HP"],
          lubricantes: ["012MN7512-4A", "012MN7720-4", "0368AR00032"],
          filtros: ["080AO-3387"],
          refrigerantes: ["012MN4012-1", "102EC-502"],
          aditivos: ["012MN9957-025"],
        },
      },
      {
        model: "Sail 1.4 / 1.5",
        years: [2012, 2014, 2016, 2018, 2020, 2022, 2024],
        engines: ["1.4L Gasolina", "1.5L DVVT Gasolina"],
        recommendedCategories: {
          baterias: ["03042-HP", "03034-HP-I"],
          lubricantes: ["012MN7512-4A", "012MN7720-4", "0368AR00032"],
          filtros: ["080AO-3387"],
          refrigerantes: ["012MN4012-1", "102EC-502"],
          aditivos: ["012MN9957-025"],
        },
      },
      {
        model: "Aveo Family / Emotion / Activo",
        years: [2008, 2010, 2012, 2014, 2016, 2018, 2020],
        engines: ["1.5L 8V", "1.6L 16V"],
        recommendedCategories: {
          baterias: ["03042-HP"],
          lubricantes: ["012MN7512-4A", "0368AR00032", "012MN7720-4"],
          filtros: ["080AO-3387"],
          refrigerantes: ["012MN4012-1", "102EC-502"],
          aditivos: ["012MN9770", "012MN9957-025"],
        },
      },
      {
        model: "D-Max CRDi / 4x4 (Todas las versiones)",
        years: [2010, 2012, 2014, 2016, 2018, 2020, 2022, 2024, 2025],
        engines: ["2.5L Diésel Turbo", "3.0L Diésel CRDi", "2.0T Diésel 2025"],
        recommendedCategories: {
          baterias: ["03027-HP", "02727HPIS4"],
          lubricantes: ["0368AR10031", "015MD-51300", "012MN7104-10A"],
          filtros: ["080AFE-297", "080AO-3387"],
          refrigerantes: ["012MN4012-1"],
          aditivos: ["012MN9980"],
        },
      },
      {
        model: "Tracker Turbo / Captiva",
        years: [2019, 2020, 2021, 2022, 2023, 2024],
        engines: ["1.2L Turbo Gasolina", "1.5L Turbo Gasolina"],
        recommendedCategories: {
          baterias: ["03034-HP-I"],
          lubricantes: ["012MN7720-4", "012MN7512-4A"],
          filtros: ["080AO-3387"],
          refrigerantes: ["012MN4012-1"],
        },
      },
      {
        model: "Camiones NHR / NKR / NPR",
        years: [2010, 2014, 2018, 2020, 2022, 2024],
        engines: ["2.8L / 3.0L / 5.2L Diésel Trabajo Pesado"],
        recommendedCategories: {
          baterias: ["03031-SHD", "030N150-SHD"],
          lubricantes: ["015MD-51300", "012MN7104-10A", "0368AR10010"],
          filtros: ["080AO-1314"],
          refrigerantes: ["012MN4012-1"],
          aditivos: ["012MN9980"],
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
          baterias: ["03042-HP"],
          lubricantes: ["012MN7512-4A", "012MN7720-4"],
          refrigerantes: ["012MN4012-1"],
          aditivos: ["012MN9957-025"],
        },
      },
      {
        model: "Rio / Soluto",
        years: [2012, 2014, 2016, 2018, 2020, 2022, 2024],
        engines: ["1.4L MPI", "1.6L GDI"],
        recommendedCategories: {
          baterias: ["03042-HP", "03034-HP-I"],
          lubricantes: ["012MN7512-4A", "012MN7720-4"],
          refrigerantes: ["012MN4012-1"],
        },
      },
      {
        model: "Sportage Active / Revolution / GT Line",
        years: [2010, 2013, 2016, 2019, 2021, 2023, 2024],
        engines: ["2.0L DOHC Gasolina", "2.0L CRDi Diésel"],
        recommendedCategories: {
          baterias: ["03034-HP-I", "03027-HP"],
          lubricantes: ["012MN7512-4A", "012MN7720-4", "0368AR10031"],
          refrigerantes: ["012MN4012-1"],
          aditivos: ["012MN9980", "012MN9957-025"],
        },
      },
    ],
  },
  {
    make: "Toyota",
    models: [
      {
        model: "Hilux 4x4 / D-4D / Fortuner",
        years: [2008, 2012, 2016, 2019, 2021, 2023, 2024],
        engines: ["2.5L 2KD-FTV Diésel", "2.8L 1GD-FTV Diésel", "2.7L Gasolina 2TR-FE"],
        recommendedCategories: {
          baterias: ["03027-HP", "02727HPIS4"],
          lubricantes: ["015MD-51300", "0368AR10031", "012MN7104-10A"],
          refrigerantes: ["012MN4012-1"],
          aditivos: ["012MN9980"],
        },
      },
      {
        model: "Yaris / Corolla",
        years: [2010, 2014, 2018, 2020, 2022, 2024],
        engines: ["1.3L / 1.5L VVT-i", "1.8L Dual VVT-i"],
        recommendedCategories: {
          baterias: ["03042-HP"],
          lubricantes: ["012MN7512-4A", "012MN7720-4"],
          refrigerantes: ["012MN4012-1"],
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
          baterias: ["03042-HP"],
          lubricantes: ["012MN7512-4A", "012MN7720-4"],
          refrigerantes: ["012MN4012-1"],
        },
      },
      {
        model: "Accent / Creta",
        years: [2012, 2015, 2018, 2020, 2022, 2024],
        engines: ["1.4L / 1.6L Gamma"],
        recommendedCategories: {
          baterias: ["03042-HP", "03034-HP-I"],
          lubricantes: ["012MN7512-4A", "012MN7720-4"],
          refrigerantes: ["012MN4012-1"],
        },
      },
      {
        model: "Tucson IX / Tucson TL",
        years: [2011, 2014, 2017, 2020, 2022, 2024],
        engines: ["2.0L MPI / GDI"],
        recommendedCategories: {
          baterias: ["03034-HP-I"],
          lubricantes: ["012MN7512-4A", "012MN7720-4"],
          refrigerantes: ["012MN4012-1"],
        },
      },
    ],
  },
  {
    make: "Great Wall / Haval",
    models: [
      {
        model: "Wingle 5 / Wingle 7 / Poer",
        years: [2012, 2015, 2018, 2021, 2023, 2024],
        engines: ["2.4L Gasolina Mitsubishi", "2.0T Diésel GW4D20"],
        recommendedCategories: {
          baterias: ["03027-HP", "02727HPIS4"],
          lubricantes: ["0368AR10031", "015MD-51300"],
          filtros: ["080AFP-974"],
          refrigerantes: ["012MN4012-1"],
          aditivos: ["012MN9980"],
        },
      },
    ],
  },
  {
    make: "Motos (Bajaj / Yamaha / Honda / Shineray / Daytona)",
    models: [
      {
        model: "Motos 4T Trabajo, Delivery y Paseo (Pulsar, FZ, Wave, CB)",
        years: [2015, 2018, 2020, 2022, 2023, 2024],
        engines: ["125cc - 250cc 4T", "250cc - 400cc"],
        recommendedCategories: {
          lubricantes: ["012MN7812-1", "01098960"],
          aditivos: ["012MN9770"],
        },
      },
    ],
  },
  {
    make: "Sector Productivo / Camaroneras / Flotas",
    models: [
      {
        model: "Hino / Bombas Camaroneras / Generadores / Isuzu",
        years: [2010, 2014, 2018, 2020, 2022, 2024],
        engines: ["Diésel Heavy Duty / Bombas Camaroneras / Motores Estacionarios"],
        recommendedCategories: {
          baterias: ["03031-SHD", "030N150-SHD"],
          lubricantes: ["015MD-51300", "012MN7104-10A", "0368AR10010"],
          filtros: ["080AO-1314"],
          refrigerantes: ["012MN4012-1"],
          aditivos: ["012MN9980"],
        },
      },
    ],
  },
];
