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
    bujias?: string[];
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
        model: "D-Max (CRDi / 2.0T / 2.5 / 3.0 / 2.4)",
        years: [2008, 2011, 2014, 2017, 2020, 2023, 2025],
        engines: ["2.0L Turbo Diésel 2025", "2.5L Turbo Diésel CRDi", "3.0L Turbo Diésel CRDi", "2.4L Gasolina"],
        recommendedCategories: {
          baterias: ["03027-FE", "03027-HP-I", "02727HPS4", "02727HPIS4"],
          lubricantes: ["0368AR00030", "012MN7511-1", "012MN7504-4", "038LUB-D1540-0025", "012MN8102-1"],
          filtros: ["080AA-2662", "080AFE-297", "080AO-1051", "080AA-2659", "080AO-3387", "079AFK-001", "080AC-18120", "078AFP-5138"],
          refrigerantes: ["012MN4012-1", "012MN4016-1", "102EC-502"],
          aditivos: ["012MN9829", "072GB105", "103B1532"],
          bujias: ["043BPR6EY"],
          frenos: ["141ATE-G4"]
        }
      },
      {
        model: "Sail (1.4 / 1.5 / Sedan)",
        years: [2012, 2014, 2016, 2018, 2020, 2022, 2024],
        engines: ["1.4L 16V S-TEC II Gasolina", "1.5L DVVT Gasolina"],
        recommendedCategories: {
          baterias: ["03042-HP", "02742HPIS4", "03034-HP-I"],
          lubricantes: ["012MN7512-4A", "038LUBC1030-0025", "016AM-75677-36", "0368AR00032"],
          filtros: ["078AO-2841", "080AO-2841ST", "080AA-2217", "080AA-9322", "080AFP-876", "080AFP-877", "080AC-9858"],
          bujias: ["043DCPR7E-BRAS", "043LKR6D-10E"],
          refrigerantes: ["012MN4012-1", "102EC-502"],
          aditivos: ["012MN9829", "012MN9957-025"],
          frenos: ["141ATE-G4"]
        }
      },
      {
        model: "Spark GT / Spark Life / Beat",
        years: [2008, 2011, 2014, 2017, 2020, 2023],
        engines: ["1.0L 8V S-TEC Gasolina", "1.2L 16V S-TEC II Gasolina"],
        recommendedCategories: {
          baterias: ["03042-HP", "02742HPIS4", "02742FES3"],
          lubricantes: ["012MN7512-4A", "0368AR00032", "012MN7720-4"],
          filtros: ["080AA-11071", "080AA-1485", "078AO-2841", "078AO-4967", "080AC-65220", "080AFP-573"],
          bujias: ["043DCPR7E-BRAS", "043BPR6EY"],
          refrigerantes: ["012MN4012-1"],
          aditivos: ["012MN9957-025"],
          frenos: ["141ATE-G3"]
        }
      },
      {
        model: "Aveo (Family / Emotion / Activo)",
        years: [2006, 2009, 2012, 2015, 2018, 2020],
        engines: ["1.5L 8V Gasolina", "1.6L 16V DOHC"],
        recommendedCategories: {
          baterias: ["03042-HP", "02742HPIS4", "03055-HD"],
          lubricantes: ["012MN7512-4A", "0368AR00030", "0368AR00032", "038LUB-PC2050-0025"],
          filtros: ["080AO-3387", "080AO-3387ST", "080AA-9902", "080AFP-573"],
          bujias: ["043BKR6E"],
          refrigerantes: ["012MN4012-1", "102EC-502"],
          aditivos: ["012MN9829", "103B1016"],
          frenos: ["141ATE-G4"]
        }
      },
      {
        model: "Tracker / Cruze / Orlando",
        years: [2011, 2014, 2017, 2020, 2023, 2025],
        engines: ["1.8L Ecotec 16V", "1.2L Turbo 3-Cilindros", "1.4L Turbo Ecotec"],
        recommendedCategories: {
          baterias: ["03034-HP-I", "02724HPIS4"],
          lubricantes: ["012MN7720-4", "012MN7918-4"],
          filtros: ["079AOE-10246", "080AA-1380", "080AC-65210"],
          refrigerantes: ["012MN4016-1", "012MN4012-1"],
          aditivos: ["012MN9829"],
          frenos: ["141ATE-G4"]
        }
      },
      {
        model: "Onix / Onix Joy / Prisma",
        years: [2016, 2018, 2020, 2022, 2024],
        engines: ["1.4L SPE/4 Gasolina", "1.0L Turbo 3-Cilindros"],
        recommendedCategories: {
          baterias: ["03042-HP", "02742HPIS4"],
          lubricantes: ["012MN7720-4", "012MN7512-4A"],
          filtros: ["080AA-10891", "080AO-2841ST"],
          refrigerantes: ["012MN4012-1"],
          aditivos: ["012MN9829"]
        }
      },
      {
        model: "Camiones Isuzu-Chevrolet (NHR / NPR / NQR / FTR / FVR)",
        years: [2005, 2010, 2015, 2018, 2022, 2025],
        engines: ["4JB1 2.8L Diésel", "4HG1 4.6L Diésel", "4HK1-TCN 5.2L Turbo Diésel", "6HK1-TCS 7.8L Turbo Diésel"],
        recommendedCategories: {
          baterias: ["03031-SHD", "030N100-SHD", "030N150-SHD"],
          lubricantes: ["012MN7104-20", "0368AR00030", "012MN8102-1"],
          filtros: ["080AA-9856", "080AA-6012", "080AO-5190", "080AO-1522", "080AO-1513", "080AOE-1501", "080AFS-7912", "079AFE-1509"],
          refrigerantes: ["012MN4012-20"],
          aditivos: ["012MN9829", "072GB105"],
          frenos: ["141ATE-G4"]
        }
      }
    ]
  },
  {
    make: "Toyota",
    models: [
      {
        model: "Hilux (2.4 TD / 2.7 Gasolina / 2.8 TD)",
        years: [2006, 2010, 2014, 2017, 2020, 2023, 2025],
        engines: ["2.7L 2TR-FE VVT-i Gasolina", "2.4L 2GD-FTV Turbo Diésel", "2.8L 1GD-FTV Turbo Diésel", "2.5L 2KD-FTV D-4D"],
        recommendedCategories: {
          baterias: ["03027-FE", "03027-HP-I", "02727HPS4", "03024-FE"],
          lubricantes: ["0368AR00030", "012MN7511-1", "012MN7720-4", "012MN8102-1"],
          filtros: ["078AA-1531", "080AA-5903", "080AO-9566", "080AO-4386ST", "079AFE-268", "080AFP-31120", "080AC-1114"],
          bujias: ["043LFR6C-11", "042LFR5AGP"],
          refrigerantes: ["012MN4012-1"],
          aditivos: ["012MN9829", "072GB105"],
          frenos: ["141ATE-G4"]
        }
      },
      {
        model: "Fortuner (2.7 Gasolina / 2.8 TD)",
        years: [2008, 2012, 2016, 2019, 2022, 2025],
        engines: ["2.7L 2TR-FE Gasolina", "2.8L 1GD-FTV Diésel"],
        recommendedCategories: {
          baterias: ["03024-FE", "03027-HP-I", "02724HPS4"],
          lubricantes: ["012MN7720-4", "0368AR00030", "012MN8102-1"],
          filtros: ["078AA-1531", "080AO-9566", "080AC-1114", "079AFE-268"],
          bujias: ["043LFR6C-11"],
          refrigerantes: ["012MN4012-1"],
          aditivos: ["012MN9829"],
          frenos: ["141ATE-G4"]
        }
      },
      {
        model: "Yaris / Yaris Sedan / Hatchback",
        years: [2006, 2010, 2014, 2018, 2022, 2025],
        engines: ["1.3L 2NZ-FE Gasolina", "1.5L 1NZ-FE / 2NR-FE Gasolina"],
        recommendedCategories: {
          baterias: ["03042-HP", "02742HPIS4", "03024-FE"],
          lubricantes: ["012MN7720-4", "012MN7512-4A"],
          filtros: ["080AC-1114", "080AO-4386ST"],
          bujias: ["043BKR6E-11"],
          refrigerantes: ["012MN4012-1"],
          frenos: ["141ATE-G4"]
        }
      },
      {
        model: "Corolla / RAV4",
        years: [2008, 2012, 2016, 2020, 2024],
        engines: ["1.8L 2ZR-FE Gasolina", "2.0L Dynamic Force / M20A"],
        recommendedCategories: {
          baterias: ["03024-FE", "03034-HP-I"],
          lubricantes: ["012MN7720-4"],
          filtros: ["080AC-1114", "080AO-4386ST", "078AO-4967"],
          bujias: ["042LFR5AGP"],
          refrigerantes: ["012MN4012-1"],
          frenos: ["141ATE-G4"]
        }
      }
    ]
  },
  {
    make: "Kia",
    models: [
      {
        model: "Sportage (Active / Sportage R / GT)",
        years: [2006, 2010, 2013, 2016, 2019, 2022, 2025],
        engines: ["2.0L Beta II 16V Gasolina", "2.0L Nu MPI Gasolina", "2.0L CRDi Turbo Diésel"],
        recommendedCategories: {
          baterias: ["03024-FE", "03024-HP-I", "02724HPIS4"],
          lubricantes: ["012MN7720-4", "012MN7512-4A", "0368AR00030"],
          filtros: ["080AA-8590", "080AA-10086", "080AC-2807", "080AO-3593", "080AO-3593ST"],
          bujias: ["043LFR5A-11-BR", "042LFR5AGP"],
          refrigerantes: ["012MN4012-1"],
          aditivos: ["012MN9829"],
          frenos: ["141ATE-G4"]
        }
      },
      {
        model: "Picanto (R / Ion / X-Line)",
        years: [2008, 2012, 2015, 2018, 2021, 2024],
        engines: ["1.0L Kappa 3-Cilindros", "1.25L Kappa MPI"],
        recommendedCategories: {
          baterias: ["03042-HP", "02742HPIS4"],
          lubricantes: ["012MN7720-4", "012MN7512-4A"],
          filtros: ["080AA-4000", "080AA-6000", "080AC-2808", "080AO-6607", "080AO-6607ST"],
          bujias: ["043BKR6E-11"],
          refrigerantes: ["012MN4012-1"],
          frenos: ["141ATE-G3"]
        }
      },
      {
        model: "Rio (Stylus / Xcite / R / X-Line)",
        years: [2006, 2010, 2013, 2016, 2019, 2022, 2024],
        engines: ["1.4L Gamma MPI", "1.6L Gamma CVVT", "1.5L 8V Stylus"],
        recommendedCategories: {
          baterias: ["03042-HP", "02742HPIS4", "03055-HD"],
          lubricantes: ["012MN7512-4A", "012MN7720-4", "0368AR00030"],
          filtros: ["080AA-2070", "080AA-9100", "080AA-10088", "080AC-28261", "080AFI-9307", "080AO-3593"],
          bujias: ["043BKR6E-11"],
          refrigerantes: ["012MN4012-1"],
          frenos: ["141ATE-G4"]
        }
      },
      {
        model: "Soluto / Seltos / Cerato",
        years: [2013, 2017, 2020, 2023, 2025],
        engines: ["1.4L Kappa MPI", "1.6L Gamma MPI", "2.0L Nu"],
        recommendedCategories: {
          baterias: ["03042-HP", "03024-FE"],
          lubricantes: ["012MN7720-4", "012MN7512-4A"],
          filtros: ["080AA-10699", "080AA-9392", "081AA-1132", "080AC-28261", "080AC-2807", "078AO-7317"],
          bujias: ["043BKR6E-11"],
          refrigerantes: ["012MN4012-1"],
          frenos: ["141ATE-G4"]
        }
      }
    ]
  },
  {
    make: "Hyundai",
    models: [
      {
        model: "Tucson (IX / TL / All New Tucson)",
        years: [2006, 2010, 2014, 2017, 2020, 2023, 2025],
        engines: ["2.0L Beta II Gasolina", "2.0L Nu MPI Gasolina", "2.0L CRDi Turbo Diésel"],
        recommendedCategories: {
          baterias: ["03024-FE", "03024-HP-I", "02724HPIS4", "03027-FE"],
          lubricantes: ["012MN7720-4", "012MN7512-4A", "0368AR00030"],
          filtros: ["080AA-8590", "080AA-10086", "080AA-28115", "080AC-2807", "080AO-3593", "080AO-3593ST", "078AFP-179"],
          bujias: ["043LFR5A-11-BR", "042LFR5AGP"],
          refrigerantes: ["012MN4012-1"],
          aditivos: ["012MN9829"],
          frenos: ["141ATE-G4"]
        }
      },
      {
        model: "Accent (New Accent / Accent RB / Blue)",
        years: [2006, 2009, 2012, 2015, 2018, 2021, 2024],
        engines: ["1.4L Alpha / Gamma", "1.6L CVVT Gasolina"],
        recommendedCategories: {
          baterias: ["03042-HP", "02742HPIS4", "03055-HD"],
          lubricantes: ["012MN7512-4A", "012MN7720-4", "0368AR00030"],
          filtros: ["080AA-2070", "080AA-10088", "080AC-28160", "080AFI-9307", "080AO-6607ST"],
          bujias: ["043BKR6E-11"],
          refrigerantes: ["012MN4012-1"],
          frenos: ["141ATE-G4"]
        }
      },
      {
        model: "Grand i10 / Atos Prime",
        years: [2006, 2010, 2014, 2018, 2022, 2025],
        engines: ["1.0L / 1.1L / 1.2L Kappa"],
        recommendedCategories: {
          baterias: ["03042-HP", "02742HPIS4"],
          lubricantes: ["012MN7720-4", "012MN7512-4A"],
          filtros: ["080AC-2808", "080AO-6607", "078AO-7317"],
          bujias: ["043BKR6E-11"],
          refrigerantes: ["012MN4012-1"],
          frenos: ["141ATE-G3"]
        }
      },
      {
        model: "H-100 / Porter / HD65 / HD72 / County",
        years: [2005, 2010, 2014, 2018, 2022, 2025],
        engines: ["2.5L D4BB / D4CB Diésel", "3.9L D4GA / D4DB Turbo Diésel"],
        recommendedCategories: {
          baterias: ["03027-FE", "03031-SHD"],
          lubricantes: ["0368AR00030", "012MN7104-20"],
          filtros: ["080AA-28130", "080AO-3830", "078AO-10127", "080AFP-1020", "080AFP-046"],
          refrigerantes: ["012MN4012-20"],
          frenos: ["141ATE-G4"]
        }
      }
    ]
  },
  {
    make: "Great Wall / Haval",
    models: [
      {
        model: "Wingle 5 / Wingle 7 (2.0 TD / 2.8 TD / 2.4 Gas)",
        years: [2012, 2015, 2018, 2020, 2023, 2025],
        engines: ["2.0L 4D20 Turbo Diésel", "2.8L GW2.8TC Turbo Diésel", "2.4L 4G69 Mitsubishi Gasolina"],
        recommendedCategories: {
          baterias: ["03027-FE", "03027-HP-I", "02727HPS4"],
          lubricantes: ["0368AR00030", "012MN7511-1", "012MN7504-4", "012MN8102-1"],
          filtros: ["080AA-38240", "080AA-9102", "080AC-4403-2", "080AC-49030", "080AO-2801", "078AO-2849", "078AO-2863", "078AFP-5138", "080AFP-140"],
          refrigerantes: ["012MN4012-1"],
          aditivos: ["012MN9829"],
          frenos: ["141ATE-G4"]
        }
      },
      {
        model: "Poer 2.0T Diésel 4D20M (1ra y 2da Gen)",
        years: [2021, 2022, 2023, 2024, 2025],
        engines: ["2.0L 4D20M Turbo Diésel 161HP"],
        recommendedCategories: {
          baterias: ["03027-HP-I", "02727HPIS4"],
          lubricantes: ["012MN7504-4", "012MN7720-4", "0368AR00030"],
          filtros: ["080AA-25006", "080AC-4412", "080AFE-295-1", "080AFE-296-1", "080AOE-9974ST"],
          refrigerantes: ["012MN4012-1"],
          aditivos: ["012MN9829"],
          frenos: ["141ATE-G4"]
        }
      },
      {
        model: "Haval H5 / Haval H6 / Tank 300",
        years: [2012, 2016, 2019, 2022, 2025],
        engines: ["2.0L Turbo Diésel", "2.0L Turbo Gasolina GW4C20", "2.4L Gasolina"],
        recommendedCategories: {
          baterias: ["03027-FE", "03024-FE"],
          lubricantes: ["012MN7720-4", "0368AR00030"],
          filtros: ["080AA-25011", "080AOE-486ST", "078AFP-179", "080AO-3593"],
          refrigerantes: ["012MN4012-1"],
          aditivos: ["012MN9829"]
        }
      }
    ]
  },
  {
    make: "JAC",
    models: [
      {
        model: "T6 Pick Up (2.0 Gasolina / 2.8 Diésel)",
        years: [2017, 2019, 2021, 2023, 2025],
        engines: ["2.0L VVT Gasolina", "2.8L Turbo Diésel"],
        recommendedCategories: {
          baterias: ["03027-FE", "03024-FE", "02727HPS4"],
          lubricantes: ["0368AR00030", "012MN7511-1", "012MN7720-4"],
          filtros: ["078AA-3040", "080AFP-4183", "080AFP-140", "078AO-2863"],
          refrigerantes: ["012MN4012-1"],
          frenos: ["141ATE-G4"]
        }
      },
      {
        model: "T8 / T8 Pro / T9 Turbo Diésel",
        years: [2020, 2022, 2024, 2025],
        engines: ["2.0L CTI Turbo Diésel 136HP", "2.0L CTI Turbo Diésel 168HP (T9)"],
        recommendedCategories: {
          baterias: ["03027-HP-I", "02727HPIS4"],
          lubricantes: ["0368AR00030", "012MN7504-4"],
          filtros: ["FILTRO AIRE 080AA-3038", "080AO-2849ST", "080AO-500ST"],
          refrigerantes: ["012MN4012-1"],
          aditivos: ["012MN9829"]
        }
      },
      {
        model: "Camiones HFC (1035 / 1040 / 1140 / 1160)",
        years: [2010, 2015, 2018, 2022, 2025],
        engines: ["2.8L Diésel", "3.8L Cummins ISF", "7.8L Diésel"],
        recommendedCategories: {
          baterias: ["03031-SHD", "030N100-SHD"],
          lubricantes: ["012MN7104-20", "0368AR00030"],
          filtros: ["080AA-9856", "080AAK-122", "080AO-2801", "080AOE-9229-1", "080AFP-5612"],
          refrigerantes: ["012MN4012-20"]
        }
      }
    ]
  },
  {
    make: "Nissan",
    models: [
      {
        model: "Frontier (D22 / D40 / NP300 2.5 Diésel / Gas)",
        years: [2006, 2010, 2014, 2017, 2020, 2023, 2025],
        engines: ["2.5L YD25DDTi Turbo Diésel", "2.4L KA24DE Gasolina"],
        recommendedCategories: {
          baterias: ["03027-FE", "03024-FE", "02727HPS4"],
          lubricantes: ["0368AR00030", "012MN7511-1", "012MN8102-1"],
          filtros: ["080AC-25091", "080AOE-9540", "078AO-2879", "080AFP-083", "080AFP-202"],
          bujias: ["043BKR6E-11"],
          refrigerantes: ["012MN4012-1"],
          frenos: ["141ATE-G4"]
        }
      },
      {
        model: "X-Trail / X-Trail e-POWER / Qashqai",
        years: [2008, 2013, 2016, 2020, 2023, 2025],
        engines: ["1.5L VC-Turbo e-POWER (T33)", "2.5L QR25DE Gasolina", "1.3L Turbo DIG-T", "2.0L MR20DD"],
        recommendedCategories: {
          baterias: ["03024-FE", "03034-HP-I", "02724HPIS4"],
          lubricantes: ["012MN7720-4"],
          filtros: ["080AA-54661", "080AA-25040", "080AC-18120", "080AO-6607"],
          bujias: ["042LFR5AGP"],
          refrigerantes: ["012MN4012-1"],
          frenos: ["141ATE-G4"]
        }
      },
      {
        model: "Versa / Sentra / Tiida",
        years: [2006, 2010, 2014, 2018, 2022, 2025],
        engines: ["1.6L HR16DE Gasolina", "1.8L MR18DE Gasolina", "2.0L MR20DE"],
        recommendedCategories: {
          baterias: ["03042-HP", "02742HPIS4", "03055-HD"],
          lubricantes: ["012MN7512-4A", "012MN7720-4"],
          filtros: ["080AA-4309", "080AA-6900", "080AC-22010", "080AO-6607", "078AO-2825"],
          bujias: ["043BKR6E-11"],
          refrigerantes: ["012MN4012-1"]
        }
      }
    ]
  },
  {
    make: "Ford",
    models: [
      {
        model: "F-150 (3.5 EcoBoost / 5.0 V8 / 4.6 V8)",
        years: [2004, 2008, 2012, 2016, 2020, 2023, 2025],
        engines: ["3.5L V6 EcoBoost Twin-Turbo", "5.0L Ti-VCT V8 Coyote", "4.6L / 5.4L V8 Triton"],
        recommendedCategories: {
          baterias: ["0277B6548", "03034-HP-I", "02734HPS4"],
          lubricantes: ["012MN7720-4", "012MN7707-4", "0368AR00030"],
          filtros: ["080AO-500-1", "080AO-500ST", "078AO-2"],
          refrigerantes: ["012MN4016-1"],
          aditivos: ["012MN9829"],
          frenos: ["141ATE-G4"]
        }
      },
      {
        model: "Ranger (2.2 / 2.5 / 3.2 TDCi)",
        years: [2005, 2010, 2014, 2018, 2021, 2024],
        engines: ["2.2L TDCi Duratorq", "3.2L TDCi Duratorq 5-Cilindros", "2.5L Duratec Gasolina"],
        recommendedCategories: {
          baterias: ["03027-FE", "03027-HP-I", "02727HPS4"],
          lubricantes: ["0368AR00030", "012MN7504-4", "012MN7707-4"],
          filtros: ["080AA-11674", "080AFE-385", "080AOE-11651ST", "080AC-17140", "080AFP-704"],
          refrigerantes: ["012MN4012-1"],
          aditivos: ["012MN9829"]
        }
      }
    ]
  },
  {
    make: "Mazda",
    models: [
      {
        model: "BT-50 (2.2 / 2.5 / 2.6 / 3.2 TDCi)",
        years: [2007, 2011, 2014, 2018, 2021, 2024],
        engines: ["2.5L WL-C Turbo Diésel", "2.6L G6 Gasolina", "3.2L MZ-CD Turbo Diésel", "2.2L Gasolina"],
        recommendedCategories: {
          baterias: ["03027-FE", "03027-HP-I", "03024-FE"],
          lubricantes: ["0368AR00030", "012MN7511-1", "012MN8102-1"],
          filtros: ["080AA-25128", "080AA-6558", "080AA-11674", "080AO-1", "078AO-2849", "080AOE-11651ST", "080AFP-083", "080AC-17140"],
          bujias: ["043BKR5E"],
          refrigerantes: ["012MN4012-1"]
        }
      },
      {
        model: "Mazda 3 / Mazda 2 / CX-5",
        years: [2008, 2012, 2016, 2020, 2024],
        engines: ["1.5L SkyActiv-G", "2.0L SkyActiv-G", "2.5L SkyActiv-G"],
        recommendedCategories: {
          baterias: ["03024-FE", "03034-HP-I"],
          lubricantes: ["012MN7720-4"],
          filtros: ["080AO-2849ST", "078AO-7317"],
          bujias: ["042LFR5AGP"],
          refrigerantes: ["012MN4012-1"]
        }
      }
    ]
  },
  {
    make: "Suzuki",
    models: [
      {
        model: "Grand Vitara SZ (2.0 / 2.4 / 2.7 V6)",
        years: [2008, 2011, 2014, 2017, 2020, 2022],
        engines: ["2.0L J20A DOHC 16V", "2.4L J24B VVT Gasolina", "2.7L H27A V6 24V"],
        recommendedCategories: {
          baterias: ["03024-FE", "03024-HP-I", "02724HPS4"],
          lubricantes: ["012MN7720-4", "012MN7512-4A", "0368AR00030"],
          filtros: ["080AA-10286", "080AA-8078", "080AC-14050", "080AC-14051", "080AO-4386ST"],
          bujias: ["042LFR5AGP", "043BKR6E-11"],
          refrigerantes: ["012MN4012-1"],
          aditivos: ["012MN9829"]
        }
      },
      {
        model: "Swift / Jimny (1.2 / 1.3 / 1.5)",
        years: [2005, 2010, 2015, 2019, 2023, 2025],
        engines: ["1.2L K12M Gasolina", "1.3L M13A / G13BB Gasolina", "1.5L K15B"],
        recommendedCategories: {
          baterias: ["03042-HP", "027NS40FEFS4", "027NS40FEIFS4"],
          lubricantes: ["012MN7720-4", "012MN7512-4A"],
          filtros: ["080AO-3614"],
          bujias: ["042K16PR-U", "043BKR6E-11"],
          refrigerantes: ["012MN4012-1"]
        }
      }
    ]
  },
  {
    make: "Volkswagen / Renault",
    models: [
      {
        model: "Volkswagen Amarok / Gol / Jetta / Bora",
        years: [2008, 2012, 2016, 2020, 2024],
        engines: ["2.0L BiTDI Turbo Diésel", "1.6L 8V MSI Gasolina", "2.0L TSI / 2.5L 5-Cilindros"],
        recommendedCategories: {
          baterias: ["03027-FE", "03034-HP-I", "02727HPS4"],
          lubricantes: ["012MN7715-5", "0368AR00030", "012MN7504-4"],
          filtros: ["080AO-10600", "080AO-2870ST", "080AOE-9496ST", "080AA-9800", "080AA-5827", "078AC-30020", "078AFP-079"],
          refrigerantes: ["012MN4012-1"]
        }
      },
      {
        model: "Renault Duster / Logan / Sandero Stepway",
        years: [2010, 2014, 2017, 2020, 2023, 2025],
        engines: ["1.6L K4M / H4M 16V", "2.0L F4R 16V", "1.4L K7J 8V"],
        recommendedCategories: {
          baterias: ["03042-HP", "03034-HP-I"],
          lubricantes: ["012MN7512-4A", "012MN7720-4", "0368AR00030"],
          filtros: ["080AA-11654", "080AA-11652", "080AA-8964", "080AO-3985", "AO-3985ST", "080AFP-072"],
          bujias: ["043BKR6E"],
          refrigerantes: ["012MN4012-1"]
        }
      }
    ]
  },
  {
    make: "Dongfeng / Chery / Jetour",
    models: [
      {
        model: "Dongfeng Rich 6 2.5 Diésel 4x4",
        years: [2019, 2021, 2023, 2025],
        engines: ["2.5L ZD25T5 Turbo Diésel 140HP"],
        recommendedCategories: {
          baterias: ["03027-FE", "03027-HP-I", "02727HPS4"],
          lubricantes: ["0368AR00030", "012MN7504-4"],
          filtros: ["080AA-11113", "080AC-25091", "080AFS-194-1", "080AFS-193", "080AO-9617"],
          refrigerantes: ["012MN4012-1"],
          aditivos: ["012MN9829"]
        }
      },
      {
        model: "Chery Tiggo 2 / Tiggo 2 Pro / Jetour X70",
        years: [2017, 2020, 2023, 2025],
        engines: ["1.5L Acteco VVT", "1.5L Turbo SQRE4T15C"],
        recommendedCategories: {
          baterias: ["03042-HP", "03024-FE"],
          lubricantes: ["012MN7720-4", "012MN7512-4A"],
          filtros: ["080AA-9123", "080AA-9124", "080AC- 4418", "080AC-4408", "078AFP-079", "080AO-3614ST"],
          refrigerantes: ["012MN4012-1"]
        }
      }
    ]
  },
  {
    make: "Hino",
    models: [
      {
        model: "Serie 300 Dutro (512 / 616 / 716 / 816)",
        years: [2007, 2011, 2015, 2019, 2022, 2025],
        engines: ["N04C-TJ 4.0L Turbo Diésel Intercooler Euro 3/4"],
        recommendedCategories: {
          baterias: ["03031-SHD"],
          lubricantes: ["0368AR00030", "012MN7104-20", "012MN8102-1"],
          filtros: ["080AO-1321", "080AO-1318", "078AFP-5138", "080AFS-127-1"],
          refrigerantes: ["012MN4012-20"],
          frenos: ["141ATE-G4"]
        }
      },
      {
        model: "Serie 500 (GD / GH / FG / FM / FC)",
        years: [2004, 2009, 2013, 2017, 2021, 2025],
        engines: ["J08E 7.7L Turbo Diésel 260HP", "J05E 5.1L 210HP"],
        recommendedCategories: {
          baterias: ["03031-SHD", "030N100-SHD", "030N150-SHD"],
          lubricantes: ["012MN7104-20", "0368AR00030", "012MN8102-1"],
          filtros: ["080AAK-102", "080AO-1314", "080AFS-1306", "080AFS-127-1"],
          refrigerantes: ["012MN4012-20"],
          aditivos: ["012MN9829"]
        }
      }
    ]
  },
  {
    make: "Motos Multimarca (Bajaj / Shineray / Daytona / Honda / Yamaha)",
    models: [
      {
        model: "Bajaj Pulsar 200 NS / 180 / 150",
        years: [2012, 2015, 2018, 2021, 2024, 2025],
        engines: ["199.5cc Triple Spark 4V Refrigeración Líquida", "178.6cc DTS-i Aire"],
        recommendedCategories: {
          lubricantes: ["01001012", "01098960", "01099362"],
          bujias: ["043LKR6D-10E", "043D8EA"],
          refrigerantes: ["012MN4012-1"],
          frenos: ["141ATE-M4"]
        }
      },
      {
        model: "Shineray & Daytona (XY200 / Wolf 200 / Monster 200 / Custom 150)",
        years: [2010, 2014, 2018, 2021, 2024, 2025],
        engines: ["200cc CBB Cadena 4T", "150cc Varillero / Palillo 4T"],
        recommendedCategories: {
          lubricantes: ["01098960", "01099362", "01001012"],
          bujias: ["043D8EA", "043C7HSA"],
          frenos: ["141ATE-M4"]
        }
      },
      {
        model: "Honda & Yamaha (Wave 100 / CB190R / CG125 / FZ16 / YBR)",
        years: [2008, 2012, 2016, 2020, 2024, 2025],
        engines: ["100cc - 190cc OHC 4T", "125cc - 150cc BlueCore"],
        recommendedCategories: {
          lubricantes: ["01001012", "01098960"],
          bujias: ["043C7HSA", "043D8EA", "043CR9E"],
          frenos: ["141ATE-M4"]
        }
      }
    ]
  },
  {
    make: "Sector Camaronero / Maquinaria Pesada",
    models: [
      {
        model: "Bombas Fluviales y Motores Estacionarios Camaroneras",
        years: [2005, 2010, 2015, 2020, 2025],
        engines: ["Caterpillar 3306 / 3406 Diésel", "Cummins 6BT / ISM380", "Perkins 4.236 / 1004-4", "Yanmar 4TNV"],
        recommendedCategories: {
          baterias: ["03031-SHD", "030N100-SHD", "030N150-SHD"],
          lubricantes: ["012MN7104-20", "0368AR00030", "0368AR00032", "012MN2203-20"],
          filtros: ["080AO-667-1", "080AFS-1212", "080AFP-4183", "080AFP-5612"],
          refrigerantes: ["012MN4012-20"],
          aditivos: ["012MN9829", "072GB105", "143DGN-5", "099AN-ANT"]
        }
      }
    ]
  }
];
