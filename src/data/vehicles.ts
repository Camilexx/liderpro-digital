export interface VehicleModelItem {
  model: string;
  years: number[];
  engines: string[];
  recommendedCategories: {
    baterias?: string[];
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
          baterias: ["02724HPIS4", "02724HPS4", "02727HPIS4", "02727HPS4", "03024-FE", "03024-FE-I"],
          lubricantes: ["LP-LUR-006", "LP-LUR-023", "LP-LUR-025", "LP-LUR-026", "LP-LUR-027", "LP-LUR-039"],
          filtros: ["LP-FIL-010", "LP-FIL-024", "AA-2662", "LP-FIL-033", "AA-6127", "078AO-1539"],
          refrigerantes: ["LP-LUR-002", "LP-LUR-003", "LP-LUR-004", "LP-LUR-005", "LP-ABR-004", "LP-ABR-005"],
          aditivos: ["LP-MAN-034", "LP-MAN-041", "LP-MAN-042", "LP-MAN-051", "LP-MAN-052"]
        }
      },
      {
        model: "Sail (1.4 / 1.5 / Sedan)",
        years: [2012, 2014, 2016, 2018, 2020, 2022, 2024],
        engines: ["1.4L 16V S-TEC II Gasolina", "1.5L DVVT Gasolina"],
        recommendedCategories: {
          baterias: ["02734HPS4", "02742FES3", "02742HPIS4", "03034-FE", "03034-FE-I", "03034-HP"],
          lubricantes: ["LP-LUR-009", "LP-LUR-010", "LP-LUR-011", "LP-LUR-012", "LP-LUR-013", "LP-LUR-019"],
          filtros: ["LP-FIL-019", "AA-9322", "078AO-2841", "080AO-2841ST", "080AC-9858", "080AFP-876"],
          refrigerantes: ["LP-LUR-002", "LP-LUR-003", "LP-LUR-004", "LP-LUR-005", "LP-ABR-004", "LP-ABR-005"],
          aditivos: ["LP-MAN-034", "LP-MAN-041", "LP-MAN-042", "LP-MAN-051"]
        }
      },
      {
        model: "Spark GT / Spark Life / Beat",
        years: [2008, 2011, 2014, 2017, 2020, 2023],
        engines: ["1.0L 8V S-TEC Gasolina", "1.2L 16V S-TEC II Gasolina"],
        recommendedCategories: {
          baterias: ["02734HPS4", "02742FES3", "02742HPIS4", "03034-FE", "03034-FE-I", "03034-HP"],
          lubricantes: ["LP-LUR-007", "LP-LUR-005-2", "LP-LUR-003-3", "LP-LUR-003-5", "LP-LUR-003-6"],
          filtros: ["LP-FIL-009", "LP-FIL-017", "078AO-2841", "078AO-4967", "080AC-2808", "080AC-65210"],
          refrigerantes: ["LP-LUR-002", "LP-LUR-003", "LP-LUR-004", "LP-LUR-005", "LP-ABR-004", "LP-ABR-005"],
          aditivos: ["LP-MAN-034", "LP-MAN-041", "LP-MAN-042", "LP-MAN-051"]
        }
      },
      {
        model: "Aveo (Family / Emotion / Activo)",
        years: [2006, 2009, 2012, 2015, 2018, 2020],
        engines: ["1.5L 8V Gasolina", "1.6L 16V DOHC"],
        recommendedCategories: {
          baterias: ["02734HPS4", "02742FES3", "02742HPIS4", "03034-FE", "03034-FE-I", "03034-HP"],
          lubricantes: ["LP-LUR-007", "LP-LUR-008", "LP-LUR-009", "LP-LUR-014", "LP-LUR-038", "LP-LUR-004-2"],
          filtros: ["LP-FIL-060", "080AO-3387", "080AFP-573"],
          refrigerantes: ["LP-LUR-002", "LP-LUR-003", "LP-LUR-004", "LP-LUR-005", "LP-ABR-004", "LP-ABR-005"],
          aditivos: ["LP-MAN-034", "LP-MAN-041", "LP-MAN-042", "LP-MAN-051"]
        }
      },
      {
        model: "Tracker / Cruze / Orlando",
        years: [2011, 2014, 2017, 2020, 2023, 2025],
        engines: ["1.8L Ecotec 16V", "1.2L Turbo 3-Cilindros", "1.4L Turbo Ecotec"],
        recommendedCategories: {
          baterias: ["02724HPIS4", "02724HPS4", "02727HPIS4", "02727HPS4"],
          lubricantes: ["LP-LUR-010", "LP-LUR-011", "LP-LUR-012", "LP-LUR-013", "LP-LUR-019", "LP-LUR-020"],
          filtros: ["LP-FIL-016", "079AOE-10246", "080AC-65210"],
          refrigerantes: ["LP-LUR-002", "LP-LUR-003", "LP-LUR-004", "LP-LUR-005", "LP-ABR-004", "LP-ABR-005"],
          aditivos: ["LP-MAN-034", "LP-MAN-041", "LP-MAN-042", "LP-MAN-051"]
        }
      },
      {
        model: "Onix / Onix Joy / Prisma",
        years: [2016, 2018, 2020, 2022, 2024],
        engines: ["1.4L SPE/4 Gasolina", "1.0L Turbo 3-Cilindros"],
        recommendedCategories: {
          baterias: ["02724HPIS4", "02724HPS4", "02727HPIS4", "02727HPS4"],
          lubricantes: ["LP-LUR-010", "LP-LUR-011", "LP-LUR-012", "LP-LUR-013", "LP-LUR-019", "LP-LUR-020"],
          filtros: ["LP-FIL-009", "LP-FIL-010", "LP-FIL-016", "LP-FIL-017"],
          refrigerantes: ["LP-LUR-002", "LP-LUR-003", "LP-LUR-004", "LP-LUR-005"],
          aditivos: ["LP-MAN-034", "LP-MAN-041", "LP-MAN-042", "LP-MAN-051"]
        }
      },
      {
        model: "Camiones Isuzu-Chevrolet (NHR / NPR / NQR / FTR / FVR)",
        years: [2005, 2010, 2015, 2018, 2022, 2025],
        engines: ["4JB1 2.8L Diésel", "4HG1 4.6L Diésel", "4HK1-TCN 5.2L Turbo Diésel", "6HK1-TCS 7.8L Turbo Diésel"],
        recommendedCategories: {
          baterias: ["02724HPIS4", "02724HPS4", "02727HPIS4", "02727HPS4"],
          lubricantes: ["LP-LUR-006", "LP-LUR-007", "LP-LUR-008", "LP-LUR-009"],
          filtros: ["LP-FIL-009", "LP-FIL-010", "LP-FIL-016", "LP-FIL-017"],
          refrigerantes: ["LP-LUR-002", "LP-LUR-003", "LP-LUR-004", "LP-LUR-005"],
          aditivos: ["LP-MAN-034", "LP-MAN-041", "LP-MAN-042", "LP-MAN-051"]
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
          baterias: ["02724HPIS4", "02724HPS4", "02727HPIS4", "02727HPS4", "03024-FE", "03024-FE-I"],
          lubricantes: ["LP-LUR-006", "LP-LUR-007", "LP-LUR-009", "LP-LUR-010", "LP-LUR-011", "LP-LUR-012"],
          filtros: ["LP-FIL-002", "LP-FIL-036", "078AO-8", "080AO-2825", "080AO-9566", "079AFE-268"],
          refrigerantes: ["LP-LUR-002", "LP-LUR-003", "LP-LUR-004", "LP-LUR-005", "LP-ABR-004", "LP-ABR-005"],
          aditivos: ["LP-MAN-034", "LP-MAN-041", "LP-MAN-042", "LP-MAN-051", "LP-MAN-052"]
        }
      },
      {
        model: "Fortuner (2.7 Gasolina / 2.8 TD)",
        years: [2008, 2012, 2016, 2019, 2022, 2025],
        engines: ["2.7L 2TR-FE Gasolina", "2.8L 1GD-FTV Diésel"],
        recommendedCategories: {
          baterias: ["02724HPIS4", "02724HPS4", "02727HPIS4", "02727HPS4", "03024-FE", "03024-FE-I"],
          lubricantes: ["LP-LUR-006", "LP-LUR-009", "LP-LUR-010", "LP-LUR-011", "LP-LUR-012", "LP-LUR-013"],
          filtros: ["LP-FIL-002", "LP-FIL-036", "078AO-8", "080AO-2825", "080AO-9566", "079AFE-268"],
          refrigerantes: ["LP-LUR-002", "LP-LUR-003", "LP-LUR-004", "LP-LUR-005", "LP-ABR-004", "LP-ABR-005"],
          aditivos: ["LP-MAN-034", "LP-MAN-041", "LP-MAN-042", "LP-MAN-051"]
        }
      },
      {
        model: "Yaris / Yaris Sedan / Hatchback",
        years: [2006, 2010, 2014, 2018, 2022, 2025],
        engines: ["1.3L 2NZ-FE Gasolina", "1.5L 1NZ-FE / 2NR-FE Gasolina"],
        recommendedCategories: {
          baterias: ["027N40FES4", "027NS40FEFS4", "027NS40FEIFS4", "030N40-FE-I", "030N40-HP", "030N40-HP-I"],
          lubricantes: ["LP-LUR-010", "LP-LUR-011", "LP-LUR-012", "LP-LUR-013", "LP-LUR-019", "LP-LUR-020"],
          filtros: ["LP-FIL-002", "LP-FIL-036", "078AO-8", "080AO-2825"],
          refrigerantes: ["LP-LUR-002", "LP-LUR-003", "LP-LUR-004", "LP-LUR-005", "LP-ABR-004", "LP-ABR-005"],
          aditivos: ["LP-MAN-034", "LP-MAN-041", "LP-MAN-042", "LP-MAN-051"]
        }
      },
      {
        model: "Corolla / RAV4",
        years: [2008, 2012, 2016, 2020, 2024],
        engines: ["1.8L 2ZR-FE Gasolina", "2.0L Dynamic Force / M20A"],
        recommendedCategories: {
          baterias: ["02724HPIS4", "02724HPS4", "02727HPIS4", "02727HPS4"],
          lubricantes: ["LP-LUR-007", "LP-LUR-010", "LP-LUR-011", "LP-LUR-012", "LP-LUR-013", "LP-LUR-019"],
          filtros: ["LP-FIL-002", "LP-FIL-036", "078AO-8", "080AO-2825"],
          refrigerantes: ["LP-LUR-002", "LP-LUR-003", "LP-LUR-004", "LP-LUR-005", "LP-ABR-004", "LP-ABR-005"],
          aditivos: ["LP-MAN-034", "LP-MAN-041", "LP-MAN-042", "LP-MAN-051"]
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
          baterias: ["02724HPIS4", "02724HPS4", "03024-FE", "03024-FE-I", "03024-HP-I", "03036-HP"],
          lubricantes: ["LP-LUR-010", "LP-LUR-011", "LP-LUR-012", "LP-LUR-013", "LP-LUR-019", "LP-LUR-020"],
          filtros: ["LP-FIL-004", "LP-FIL-026", "LP-FIL-047", "080AO-3593", "080AC-2807", "078AFP-179"],
          refrigerantes: ["LP-LUR-002", "LP-LUR-003", "LP-LUR-004", "LP-LUR-005", "LP-ABR-004", "LP-ABR-005"],
          aditivos: ["LP-MAN-002", "LP-MAN-003", "LP-MAN-004"]
        }
      },
      {
        model: "Picanto (R / Ion / X-Line)",
        years: [2008, 2012, 2015, 2018, 2021, 2024],
        engines: ["1.0L Kappa 3-Cilindros", "1.25L Kappa MPI"],
        recommendedCategories: {
          baterias: ["027N40FES4", "027NS40FEFS4", "027NS40FEIFS4", "030N40-FE-I", "030N40-HP", "030N40-HP-I"],
          lubricantes: ["LP-LUR-010", "LP-LUR-011", "LP-LUR-012", "LP-LUR-013"],
          filtros: ["LP-FIL-004", "LP-FIL-005", "LP-FIL-007", "LP-FIL-018"],
          refrigerantes: ["LP-LUR-002", "LP-LUR-003", "LP-LUR-004", "LP-LUR-005", "LP-ABR-004", "LP-ABR-005"],
          aditivos: ["LP-MAN-002", "LP-MAN-003", "LP-MAN-004"]
        }
      },
      {
        model: "Rio (Stylus / Xcite / R / X-Line)",
        years: [2006, 2010, 2013, 2016, 2019, 2022, 2024],
        engines: ["1.4L Gamma MPI", "1.6L Gamma CVVT", "1.5L 8V Stylus"],
        recommendedCategories: {
          baterias: ["02734HPS4", "02742FES3", "02742HPIS4", "03034-FE", "03034-FE-I", "03034-HP"],
          lubricantes: ["LP-LUR-010", "LP-LUR-011", "LP-LUR-012", "LP-LUR-013", "LP-LUR-019", "LP-LUR-020"],
          filtros: ["LP-FIL-005", "LP-FIL-007", "LP-FIL-018", "LP-FIL-049", "080AO-3614", "080AC-28160"],
          refrigerantes: ["LP-LUR-002", "LP-LUR-003", "LP-LUR-004", "LP-LUR-005", "LP-ABR-004", "LP-ABR-005"],
          aditivos: ["LP-MAN-002", "LP-MAN-003", "LP-MAN-004"]
        }
      },
      {
        model: "Soluto / Seltos / Cerato",
        years: [2013, 2017, 2020, 2023, 2025],
        engines: ["1.4L Kappa MPI", "1.6L Gamma MPI", "2.0L Nu"],
        recommendedCategories: {
          baterias: ["02734HPS4", "02742FES3", "02742HPIS4", "03034-FE", "03034-FE-I", "03034-HP"],
          lubricantes: ["LP-LUR-010", "LP-LUR-011", "LP-LUR-012", "LP-LUR-013", "LP-LUR-019", "LP-LUR-020"],
          filtros: ["LP-FIL-005", "LP-FIL-007", "LP-FIL-018", "LP-FIL-049", "080AO-3614", "080AC-28160"],
          refrigerantes: ["LP-LUR-002", "LP-LUR-003", "LP-LUR-004", "LP-LUR-005", "LP-ABR-004", "LP-ABR-005"],
          aditivos: ["LP-MAN-002", "LP-MAN-003", "LP-MAN-004"]
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
          baterias: ["02724HPIS4", "02724HPS4", "03024-FE", "03024-FE-I", "03024-HP-I", "03036-HP"],
          lubricantes: ["LP-LUR-010", "LP-LUR-011", "LP-LUR-012", "LP-LUR-013", "LP-LUR-019", "LP-LUR-020"],
          filtros: ["LP-FIL-004", "LP-FIL-005", "LP-FIL-007", "LP-FIL-018", "LP-FIL-026", "LP-FIL-047"],
          refrigerantes: ["LP-LUR-002", "LP-LUR-003", "LP-LUR-004", "LP-LUR-005", "LP-ABR-004", "LP-ABR-005"],
          aditivos: ["LP-MAN-002", "LP-MAN-003", "LP-MAN-004"]
        }
      },
      {
        model: "Accent (New Accent / Accent RB / Blue)",
        years: [2006, 2009, 2012, 2015, 2018, 2021, 2024],
        engines: ["1.4L Alpha / Gamma", "1.6L CVVT Gasolina"],
        recommendedCategories: {
          baterias: ["02734HPS4", "02742FES3", "02742HPIS4", "03034-FE", "03034-FE-I", "03034-HP"],
          lubricantes: ["LP-LUR-010", "LP-LUR-011", "LP-LUR-012", "LP-LUR-013", "LP-LUR-019", "LP-LUR-020"],
          filtros: ["LP-FIL-004", "LP-FIL-005", "LP-FIL-007", "LP-FIL-018", "LP-FIL-026", "LP-FIL-047"],
          refrigerantes: ["LP-LUR-002", "LP-LUR-003", "LP-LUR-004", "LP-LUR-005", "LP-ABR-004", "LP-ABR-005"],
          aditivos: ["LP-MAN-002", "LP-MAN-003", "LP-MAN-004"]
        }
      },
      {
        model: "Grand i10 / Atos Prime",
        years: [2006, 2010, 2014, 2018, 2022, 2025],
        engines: ["1.0L / 1.1L / 1.2L Kappa"],
        recommendedCategories: {
          baterias: ["027N40FES4", "027NS40FEFS4", "027NS40FEIFS4", "030N40-FE-I", "030N40-HP", "030N40-HP-I"],
          lubricantes: ["LP-LUR-010", "LP-LUR-011", "LP-LUR-012", "LP-LUR-013"],
          filtros: ["LP-FIL-004", "LP-FIL-005", "LP-FIL-007", "LP-FIL-018"],
          refrigerantes: ["LP-LUR-002", "LP-LUR-003", "LP-LUR-004", "LP-LUR-005"],
          aditivos: ["LP-MAN-002", "LP-MAN-003", "LP-MAN-004"]
        }
      },
      {
        model: "H-100 / Porter / HD65 / HD72 / County",
        years: [2005, 2010, 2014, 2018, 2022, 2025],
        engines: ["2.5L D4BB / D4CB Diésel", "3.9L D4GA / D4DB Turbo Diésel"],
        recommendedCategories: {
          baterias: ["02724HPIS4", "02724HPS4", "02734HPS4", "02742FES3"],
          lubricantes: ["LP-LUR-010", "LP-LUR-011", "LP-LUR-012", "LP-LUR-013"],
          filtros: ["LP-FIL-004", "LP-FIL-005", "LP-FIL-007", "LP-FIL-018"],
          refrigerantes: ["LP-LUR-002", "LP-LUR-003", "LP-LUR-004", "LP-LUR-005", "LP-ABR-004", "LP-ABR-005"],
          aditivos: ["LP-MAN-002", "LP-MAN-003", "LP-MAN-004"]
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
          baterias: ["02727HPIS4", "02727HPS4", "03027-FE", "03027-FE-I", "03027-HP", "03027-HP-I"],
          lubricantes: ["LP-LUR-006", "LP-LUR-002-2", "LP-LUR-003-2", "LP-LUR-005-3", "LP-LUR-002-6"],
          filtros: ["AA-25006", "LP-FIL-029", "LP-FIL-050", "LP-FIL-051", "078AO-2", "078AO-2849"],
          refrigerantes: ["LP-LUR-002", "LP-LUR-003", "LP-LUR-004"],
          aditivos: ["LP-MAN-002", "LP-MAN-003", "LP-MAN-004"]
        }
      },
      {
        model: "Poer 2.0T Diésel 4D20M (1ra y 2da Gen)",
        years: [2021, 2022, 2023, 2024, 2025],
        engines: ["2.0L 4D20M Turbo Diésel 161HP"],
        recommendedCategories: {
          baterias: ["02727HPIS4", "02727HPS4", "03027-FE", "03027-FE-I", "03027-HP", "03027-HP-I"],
          lubricantes: ["LP-LUR-006", "LP-LUR-002-2", "LP-LUR-003-2", "LP-LUR-005-3", "LP-LUR-002-6"],
          filtros: ["AA-25006", "LP-FIL-029", "LP-FIL-050", "LP-FIL-051", "078AO-2", "078AO-2849"],
          refrigerantes: ["LP-LUR-002", "LP-LUR-003", "LP-LUR-004"],
          aditivos: ["LP-MAN-002", "LP-MAN-003", "LP-MAN-004"]
        }
      },
      {
        model: "Haval H5 / Haval H6 / Tank 300",
        years: [2012, 2016, 2019, 2022, 2025],
        engines: ["2.0L Turbo Diésel", "2.0L Turbo Gasolina GW4C20", "2.4L Gasolina"],
        recommendedCategories: {
          baterias: ["02727HPIS4", "02727HPS4", "03027-FE", "03027-FE-I"],
          lubricantes: ["LP-LUR-006", "LP-LUR-002-2", "LP-LUR-003-2", "LP-LUR-005-3"],
          filtros: ["AA-25006", "LP-FIL-029", "LP-FIL-050", "LP-FIL-051", "078AO-2", "078AO-2849"],
          refrigerantes: ["LP-LUR-002", "LP-LUR-003", "LP-LUR-004"],
          aditivos: ["LP-MAN-002", "LP-MAN-003", "LP-MAN-004"]
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
          baterias: ["02724HPIS4", "02724HPS4", "02742FES3"],
          lubricantes: ["LP-LUR-009", "LP-LUR-010", "LP-LUR-011"],
          filtros: ["LP-FIL-003", "LP-FIL-011", "LP-FIL-036", "LP-FIL-059", "AA-3038", "078AO-2863"],
          refrigerantes: ["LP-LUR-002", "LP-LUR-003", "LP-LUR-004"],
          aditivos: ["LP-MAN-002", "LP-MAN-003", "LP-MAN-004"]
        }
      },
      {
        model: "T8 / T8 Pro / T9 Turbo Diésel",
        years: [2020, 2022, 2024, 2025],
        engines: ["2.0L CTI Turbo Diésel 136HP", "2.0L CTI Turbo Diésel 168HP (T9)"],
        recommendedCategories: {
          baterias: ["02724HPIS4", "02724HPS4", "02742FES3"],
          lubricantes: ["LP-LUR-009", "LP-LUR-010", "LP-LUR-011"],
          filtros: ["LP-FIL-003", "LP-FIL-011", "LP-FIL-036", "LP-FIL-059", "AA-3038", "078AO-2863"],
          refrigerantes: ["LP-LUR-002", "LP-LUR-003", "LP-LUR-004"],
          aditivos: ["LP-MAN-002", "LP-MAN-003", "LP-MAN-004"]
        }
      },
      {
        model: "Camiones HFC (1035 / 1040 / 1140 / 1160)",
        years: [2010, 2015, 2018, 2022, 2025],
        engines: ["2.8L Diésel", "3.8L Cummins ISF", "7.8L Diésel"],
        recommendedCategories: {
          baterias: ["02724HPIS4", "02724HPS4", "02742FES3"],
          lubricantes: ["LP-LUR-009", "LP-LUR-010", "LP-LUR-011"],
          filtros: ["LP-FIL-003", "LP-FIL-011", "LP-FIL-036", "LP-FIL-059", "AA-3038", "078AO-2863"],
          refrigerantes: ["LP-LUR-002", "LP-LUR-003", "LP-LUR-004"],
          aditivos: ["LP-MAN-002", "LP-MAN-003", "LP-MAN-004"]
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
          baterias: ["02727HPIS4", "02727HPS4", "03027-FE", "03027-FE-I", "03027-HP", "03027-HP-I"],
          lubricantes: ["LP-LUR-007", "LP-LUR-005-2", "LP-LUR-003-3", "LP-LUR-003-5", "LP-LUR-003-6"],
          filtros: ["078AO-2879", "080AOE-9540", "080AC-25091", "080AFP-083"],
          refrigerantes: ["LP-LUR-002", "LP-LUR-003", "LP-LUR-004"],
          aditivos: ["LP-MAN-002", "LP-MAN-003", "LP-MAN-004"]
        }
      },
      {
        model: "X-Trail / X-Trail e-POWER / Qashqai",
        years: [2008, 2013, 2016, 2020, 2023, 2025],
        engines: ["1.5L VC-Turbo e-POWER (T33)", "2.5L QR25DE Gasolina", "1.3L Turbo DIG-T", "2.0L MR20DD"],
        recommendedCategories: {
          baterias: ["02727HPIS4", "02727HPS4", "03027-FE", "03027-FE-I"],
          lubricantes: ["LP-LUR-010", "LP-LUR-011", "LP-LUR-012", "LP-LUR-013", "LP-LUR-019", "LP-LUR-020"],
          filtros: ["078AO-2879", "080AOE-9540", "080AC-25091", "080AFP-083"],
          refrigerantes: ["LP-LUR-002", "LP-LUR-003", "LP-LUR-004"],
          aditivos: ["LP-MAN-002", "LP-MAN-003", "LP-MAN-004"]
        }
      },
      {
        model: "Versa / Sentra / Tiida",
        years: [2006, 2010, 2014, 2018, 2022, 2025],
        engines: ["1.6L HR16DE Gasolina", "1.8L MR18DE Gasolina", "2.0L MR20DE"],
        recommendedCategories: {
          baterias: ["02727HPIS4", "02727HPS4", "03027-FE", "03027-FE-I"],
          lubricantes: ["LP-LUR-007", "LP-LUR-009", "LP-LUR-010", "LP-LUR-011", "LP-LUR-012", "LP-LUR-013"],
          filtros: ["078AO-2879", "080AOE-9540", "080AC-25091", "080AFP-083"],
          refrigerantes: ["LP-LUR-002", "LP-LUR-003", "LP-LUR-004"],
          aditivos: ["LP-MAN-002", "LP-MAN-003", "LP-MAN-004"]
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
          baterias: ["02727HPIS4", "02727HPS4", "03027-FE", "03027-FE-I", "03027-HP", "03027-HP-I"],
          lubricantes: ["LP-LUR-009", "LP-LUR-010", "LP-LUR-011"],
          filtros: ["LP-FIL-015", "LP-FIL-040", "078AO-2", "080AO-500-1", "080AOE-11651ST", "080AC-17140"],
          refrigerantes: ["LP-LUR-002", "LP-LUR-003", "LP-LUR-004"],
          aditivos: ["LP-MAN-002", "LP-MAN-003", "LP-MAN-004"]
        }
      },
      {
        model: "Ranger (2.2 / 2.5 / 3.2 TDCi)",
        years: [2005, 2010, 2014, 2018, 2021, 2024],
        engines: ["2.2L TDCi Duratorq", "3.2L TDCi Duratorq 5-Cilindros", "2.5L Duratec Gasolina"],
        recommendedCategories: {
          baterias: ["02727HPIS4", "02727HPS4", "03027-FE", "03027-FE-I", "03027-HP", "03027-HP-I"],
          lubricantes: ["LP-LUR-009", "LP-LUR-010", "LP-LUR-011"],
          filtros: ["LP-FIL-015", "LP-FIL-040", "078AO-2", "080AO-500-1", "080AOE-11651ST", "080AC-17140"],
          refrigerantes: ["LP-LUR-002", "LP-LUR-003", "LP-LUR-004"],
          aditivos: ["LP-MAN-002", "LP-MAN-003", "LP-MAN-004"]
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
          baterias: ["02724HPIS4", "02724HPS4", "03024-FE", "03024-FE-I", "03024-HP-I", "03036-HP"],
          lubricantes: ["LP-LUR-009", "LP-LUR-010", "LP-LUR-011"],
          filtros: ["LP-FIL-015", "LP-FIL-023", "LP-FIL-036", "LP-FIL-040", "078AO-2849", "078AO-8"],
          refrigerantes: ["LP-LUR-002", "LP-LUR-003", "LP-LUR-004"],
          aditivos: ["LP-MAN-002", "LP-MAN-003", "LP-MAN-004"]
        }
      },
      {
        model: "Mazda 3 / Mazda 2 / CX-5",
        years: [2008, 2012, 2016, 2020, 2024],
        engines: ["1.5L SkyActiv-G", "2.0L SkyActiv-G", "2.5L SkyActiv-G"],
        recommendedCategories: {
          baterias: ["02724HPIS4", "02724HPS4", "03024-FE", "03024-FE-I"],
          lubricantes: ["LP-LUR-009", "LP-LUR-010", "LP-LUR-011"],
          filtros: ["LP-FIL-015", "LP-FIL-023", "LP-FIL-036", "LP-FIL-040", "078AO-2849", "078AO-8"],
          refrigerantes: ["LP-LUR-002", "LP-LUR-003", "LP-LUR-004"],
          aditivos: ["LP-MAN-002", "LP-MAN-003", "LP-MAN-004"]
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
          baterias: ["027N40FES4", "027NS40FEFS4", "027NS40FEIFS4", "030N40-FE-I", "030N40-HP", "030N40-HP-I"],
          lubricantes: ["LP-LUR-009", "LP-LUR-004-2", "LP-LUR-002-3", "LP-LUR-002-5", "LP-LUR-017-2", "LP-LUR-004-5"],
          filtros: ["LP-FIL-006", "LP-FIL-045", "LP-FIL-046", "080AO-1522", "080AO-3614", "080AO-4386ST"],
          refrigerantes: ["LP-LUR-002", "LP-LUR-003", "LP-LUR-004"],
          aditivos: ["LP-MAN-002", "LP-MAN-003", "LP-MAN-004"]
        }
      },
      {
        model: "Swift / Jimny (1.2 / 1.3 / 1.5)",
        years: [2005, 2010, 2015, 2019, 2023, 2025],
        engines: ["1.2L K12M Gasolina", "1.3L M13A / G13BB Gasolina", "1.5L K15B"],
        recommendedCategories: {
          baterias: ["027N40FES4", "027NS40FEFS4", "027NS40FEIFS4", "030N40-FE-I", "030N40-HP", "030N40-HP-I"],
          lubricantes: ["LP-LUR-009", "LP-LUR-004-2", "LP-LUR-002-3", "LP-LUR-002-5"],
          filtros: ["LP-FIL-006", "LP-FIL-045", "LP-FIL-046", "080AO-1522"],
          refrigerantes: ["LP-LUR-002", "LP-LUR-003", "LP-LUR-004"],
          aditivos: ["LP-MAN-002", "LP-MAN-003", "LP-MAN-004"]
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
          baterias: ["0277B6548"],
          lubricantes: ["LP-LUR-008", "LP-LUR-014", "LP-LUR-038"],
          filtros: ["AA-5827", "LP-FIL-058", "078AO-2870", "080AOE-9496ST", "078AC-30020", "078AFP-079"],
          refrigerantes: ["LP-LUR-002", "LP-LUR-003", "LP-LUR-004"],
          aditivos: ["LP-MAN-002", "LP-MAN-003", "LP-MAN-004"]
        }
      },
      {
        model: "Renault Duster / Logan / Sandero Stepway",
        years: [2010, 2014, 2017, 2020, 2023, 2025],
        engines: ["1.6L K4M / H4M 16V", "2.0L F4R 16V", "1.4L K7J 8V"],
        recommendedCategories: {
          baterias: ["0277B6548"],
          lubricantes: ["LP-LUR-008", "LP-LUR-014", "LP-LUR-038"],
          filtros: ["LP-FIL-013", "LP-FIL-014", "LP-FIL-042", "LP-FIL-048", "AA-994", "080AO-3985"],
          refrigerantes: ["LP-LUR-002", "LP-LUR-003", "LP-LUR-004"],
          aditivos: ["LP-MAN-002", "LP-MAN-003", "LP-MAN-004"]
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
          baterias: ["02724HPIS4", "02724HPS4", "02742FES3"],
          lubricantes: ["LP-LUR-009", "LP-LUR-010", "LP-LUR-011"],
          filtros: ["AA-11113", "080AO-3614ST", "080AO-9617", "080AC-25091", "080AFP-4102", "080AFS-193"],
          refrigerantes: ["LP-LUR-002", "LP-LUR-003", "LP-LUR-004"],
          aditivos: ["LP-MAN-002", "LP-MAN-003", "LP-MAN-004"]
        }
      },
      {
        model: "Chery Tiggo 2 / Tiggo 2 Pro / Jetour X70",
        years: [2017, 2020, 2023, 2025],
        engines: ["1.5L Acteco VVT", "1.5L Turbo SQRE4T15C"],
        recommendedCategories: {
          baterias: ["02724HPIS4", "02724HPS4", "02742FES3"],
          lubricantes: ["LP-LUR-009", "LP-LUR-010", "LP-LUR-011"],
          filtros: ["AA-9123", "AA-9124", "080AO-3614ST", "080AC- 4418", "078AFP-079"],
          refrigerantes: ["LP-LUR-002", "LP-LUR-003", "LP-LUR-004"],
          aditivos: ["LP-MAN-002", "LP-MAN-003", "LP-MAN-004"]
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
          baterias: ["03031-SHD", "030N100-SHD-I", "030N150-SHD"],
          lubricantes: ["LP-LUR-006", "LP-LUR-023", "LP-LUR-025", "LP-LUR-026", "LP-LUR-027", "LP-LUR-039"],
          filtros: ["AA-25006", "AA-25011", "LP-FIL-023", "080AO-1302", "080AO-1314", "080AO-1318"],
          refrigerantes: ["LP-LUR-002", "LP-LUR-003", "LP-LUR-004", "LP-LUR-005", "LP-ABR-004", "LP-ABR-005"],
          aditivos: ["LP-MAN-034", "LP-MAN-041", "LP-MAN-042", "LP-MAN-051", "LP-MAN-052"]
        }
      },
      {
        model: "Serie 500 (GD / GH / FG / FM / FC)",
        years: [2004, 2009, 2013, 2017, 2021, 2025],
        engines: ["J08E 7.7L Turbo Diésel 260HP", "J05E 5.1L 210HP"],
        recommendedCategories: {
          baterias: ["03031-SHD", "030N100-SHD-I", "030N150-SHD"],
          lubricantes: ["LP-LUR-006", "LP-LUR-023", "LP-LUR-025", "LP-LUR-026", "LP-LUR-027", "LP-LUR-039"],
          filtros: ["AA-25006", "AA-25011", "LP-FIL-023", "080AO-1302", "080AO-1314", "080AO-1318"],
          refrigerantes: ["LP-LUR-002", "LP-LUR-003", "LP-LUR-004", "LP-LUR-005", "LP-ABR-004", "LP-ABR-005"],
          aditivos: ["LP-MAN-034", "LP-MAN-041", "LP-MAN-042", "LP-MAN-051", "LP-MAN-052"]
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
          baterias: [],
          lubricantes: ["LP-LUR-015", "LP-LUR-016", "LP-LUR-017", "LP-LUR-002-4", "LP-LUR-003-4", "LP-LUR-004-3"],
          filtros: ["AA-10891", "LP-FIL-022", "LP-FIL-027", "LP-FIL-028"],
          refrigerantes: ["LP-LUR-002", "LP-LUR-003", "LP-LUR-004"],
          aditivos: ["LP-MAN-005", "LP-MAN-006", "LP-MAN-011", "LP-MAN-016", "LP-MAN-025", "LP-MAN-037"]
        }
      },
      {
        model: "Shineray & Daytona (XY200 / Wolf 200 / Monster 200 / Custom 150)",
        years: [2010, 2014, 2018, 2021, 2024, 2025],
        engines: ["200cc CBB Cadena 4T", "150cc Varillero / Palillo 4T"],
        recommendedCategories: {
          baterias: [],
          lubricantes: ["LP-LUR-015", "LP-LUR-016", "LP-LUR-017", "LP-LUR-002-4", "LP-LUR-003-4", "LP-LUR-004-3"],
          filtros: ["AA-10891", "LP-FIL-022", "LP-FIL-027", "LP-FIL-028"],
          refrigerantes: ["LP-LUR-002", "LP-LUR-003", "LP-LUR-004"],
          aditivos: ["LP-MAN-005", "LP-MAN-006", "LP-MAN-011", "LP-MAN-016", "LP-MAN-025", "LP-MAN-037"]
        }
      },
      {
        model: "Honda & Yamaha (Wave 100 / CB190R / CG125 / FZ16 / YBR)",
        years: [2008, 2012, 2016, 2020, 2024, 2025],
        engines: ["100cc - 190cc OHC 4T", "125cc - 150cc BlueCore"],
        recommendedCategories: {
          baterias: [],
          lubricantes: ["LP-LUR-015", "LP-LUR-016", "LP-LUR-017", "LP-LUR-002-4", "LP-LUR-003-4", "LP-LUR-004-3"],
          filtros: ["AA-10891", "LP-FIL-022", "LP-FIL-027", "LP-FIL-028"],
          refrigerantes: ["LP-LUR-002", "LP-LUR-003", "LP-LUR-004"],
          aditivos: ["LP-MAN-005", "LP-MAN-006", "LP-MAN-011", "LP-MAN-016", "LP-MAN-025", "LP-MAN-037"]
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
          baterias: ["03031-SHD", "030N100-SHD-I", "030N150-SHD"],
          lubricantes: ["LP-LUR-006", "LP-LUR-018", "LP-LUR-024", "LP-LUR-028", "LP-LUR-029", "LP-LUR-030"],
          filtros: [],
          refrigerantes: ["LP-LUR-002", "LP-LUR-003", "LP-LUR-004"],
          aditivos: ["LP-MAN-002", "LP-MAN-003", "LP-MAN-004"]
        }
      }
    ]
  }
];
