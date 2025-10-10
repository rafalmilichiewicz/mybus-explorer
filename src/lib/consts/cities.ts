import type { Position } from '../utils/types.ts';

const locales = {
    PL: 'pl', // Poland
    CZ: 'cs', // Czechia // This is inaccurate as the locale should be CZ
    SK: 'sk', // Slovakia
    LT: 'pl', // Lithuania // For some reason only lithuanian city has a polish locale
} as const;

// TODO 
/**
 * Each city in R&G's system has a unique *code*.
 *
 * This code is used in generating `cityOffset`.
 *
 **/
type CityInfo = {
    code: string;
    carrier: string;
    position: Position;
    url: string;
    locale: (typeof locales)[keyof typeof locales];
};

export const CITIES = {
    BIALA_PODLASKA: {
        code: 'BIALA',
        carrier: 'BIAŁA PODLASKA (MZK)',
        position: { longitude: 23.12557, latitude: 52.03408 },
        url: 'http://rozklad.mzkbp.pl/AndroidService/SchedulesService.svc',
        locale: locales.PL,
    },
    CHELM: {
        code: 'CHELM',
        carrier: 'CHEŁM (CLA)',
        position: { longitude: 23.477778, latitude: 51.132222 },
        url: 'http://rozklad.cla.net.pl/myBusServices/SchedulesService.svc',
        locale: locales.PL,
    },
    CIESZYN: {
        code: 'CIESZ',
        carrier: 'CIESZYN (ZGK)',
        position: { longitude: 18.63333, latitude: 49.75 },
        url: 'http://rozklad.zgk.cieszyn.pl/myBusServices/SchedulesService.svc',
        locale: locales.PL,
    },
    DEBICA: {
        code: 'DEBIC',
        carrier: 'DĘBICA (MKS)',
        position: { longitude: 21.41127, latitude: 50.05135 },
        url: 'http://rj.mks.debica.pl/AndroidService/SchedulesService.svc',
        locale: locales.PL,
    },
    ELBLAG: {
        code: 'ELBLA',
        carrier: 'ELBLĄG (ZKM)',
        position: { longitude: 19.39826, latitude: 54.16248 },
        url: 'http://www.rozklad.zkm.elblag.com.pl/AndroidService/SchedulesService.svc',
        locale: locales.PL,
    },
    GDANSK: {
        code: 'GDANS',
        carrier: 'GDAŃSK (GAiT)',
        position: { longitude: 18.61703, latitude: 54.34899 },
        url: 'http://info.gait.pl/SchedulesService/SchedulesService.svc',
        locale: locales.PL,
    },
    GLOGOW: {
        code: 'GLOGO',
        carrier: 'GŁOGÓW (KM)',
        position: { longitude: 16.08406, latitude: 51.6598 },
        url: 'http://89.151.3.5/myBusServices/SchedulesService.svc',
        locale: locales.PL,
    },
    JASTRZEBIE_ZDROJ: {
        code: 'JASTR',
        carrier: 'JASTRZĘBIE-ZDRÓJ (MZK)',
        position: { longitude: 18.61703, latitude: 49.94616 },
        url: 'http://e-biletmzkjastrzebie.com:8081/myBusServices/SchedulesService.svc',
        locale: locales.PL,
    },
    INNOWROCLAW: {
        code: 'INOWR',
        carrier: 'INOWROCŁAW (MPK)',
        position: { longitude: 18.26122, latitude: 52.79277 },
        url: 'http://bus.inowroclaw.pl/myBusServices/SchedulesService.svc',
        locale: locales.PL,
    },
    JELENIA_GORA: {
        code: 'JELGO',
        carrier: 'JELENIA GÓRA (MZK)',
        position: { longitude: 15.73512, latitude: 50.9014 },
        url: 'http://www.seba.mzk.jgora.pl:8080/myBusServices/SchedulesService.svc',
        locale: locales.PL,
    },
    KEDZIERZYN_KOZLE: {
        code: 'KKOZL',
        carrier: 'KĘDZIERZYN KOŹLE (MZK)',
        position: { longitude: 18.21259, latitude: 50.34446 },
        url: 'http://79.188.1.197/SchedulesService.svc',
        locale: locales.PL,
    },
    KIELCE: {
        code: 'KIELC',
        carrier: 'KIELCE (ZTM)',
        position: { longitude: 20.6199, latitude: 50.86905 },
        url: 'http://sip.ztm.kielce.pl/AndroidService/SchedulesService.svc',
        locale: locales.PL,
    },
    KOLOBRZEG: {
        code: 'KOLOB',
        carrier: 'KOŁOBRZEG (KM)',
        position: { longitude: 15.56642, latitude: 54.1742 },
        url: 'http://79.187.77.42/myBusServices/SchedulesService.svc',
        locale: locales.PL,
    },
    KRASNIK: {
        code: 'KRASN',
        carrier: 'KRAŚNIK (MPK)',
        position: { longitude: 22.22521, latitude: 50.92251 },
        url: 'http://176.104.119.244/myBusServices/SchedulesService.svc',
        locale: locales.PL,
    },
    KROSNO: {
        code: 'KROSN',
        carrier: 'KROSNO (MKS)',
        position: { longitude: 21.76651, latitude: 49.68239 },
        url: 'http://rozklad.mks-krosno.pl/myBusServices/SchedulesService.svc',
        locale: locales.PL,
    },
    KUTNO: {
        code: 'KUTNO',
        carrier: 'KUTNO (MZK)',
        position: { longitude: 19.35545, latitude: 52.2312 },
        url: 'http://rozklad.km.kutno.pl/myBusServices/SchedulesService.svc',
        locale: locales.PL,
    },
    LEGNICA: {
        code: 'LEGNI',
        carrier: 'LEGNICA (MPK)',
        position: { longitude: 16.1572, latitude: 51.20518 },
        url: 'http://mybus.autobusy.legnica.eu/SchedulesService.svc',
        locale: locales.PL,
    },
    LESZNO: {
        code: 'LESZN',
        carrier: 'LESZNO (MZK)',
        position: { longitude: 16.58186, latitude: 51.82734 },
        url: 'http://rozklad.mzk.leszno.pl/myBusServices/SchedulesService.svc',
        locale: locales.PL,
    },
    LUBLIN: {
        code: 'LUBLI',
        carrier: 'LUBLIN (ZTM)',
        position: { longitude: 22.55673, latitude: 51.24343 },
        url: 'http://sip.ztm.lublin.eu/AndroidService/SchedulesService.svc',
        locale: locales.PL,
    },
    LODZ: {
        code: 'LODZ ',
        carrier: 'ŁÓDŹ (ZDiT)',
        position: { longitude: 19.4947, latitude: 51.74394 },
        url: 'http://rozklady.lodz.pl/myBusServices/SchedulesService.svc',
        locale: locales.PL,
    },
    LOWICZ: {
        code: 'LOWIC',
        carrier: 'ŁOWICZ (MZK)',
        position: { longitude: 19.94504, latitude: 52.1059 },
        url: 'http://rozklad.mzklowicz.pl/myBusServices/SchedulesService.svc',
        locale: locales.PL,
    },
    MIELEC: {
        code: 'MIELE',
        carrier: 'MIELEC (MKS)',
        position: { longitude: 21.45125, latitude: 50.28866 },
        url: 'http://mapa.mks-mielec.pl/AndroidService/SchedulesService.svc',
        locale: locales.PL,
    },
    OLSZTYN: {
        code: 'OLSZT',
        carrier: 'OLSZTYN (ZDZiT)',
        position: { longitude: 20.47823, latitude: 53.77241 },
        url: 'http://sip.zdzit.olsztyn.eu/myBusServices/SchedulesService.svc',
        locale: locales.PL,
    },
    OSTROLEKA: {
        code: 'OLEKA',
        carrier: 'OSTROŁĘKA (MZK)',
        position: { longitude: 21.58662, latitude: 53.07538 },
        url: 'http://rozklad.mzk.ostroleka.pl/myBusServices/SchedulesService.svc',
        locale: locales.PL,
    },
    OSTROW_WIELKOPOLSKI: {
        code: 'OSTRO',
        carrier: 'OSTRÓW WIELKOPOLSKI (MZK)',
        position: { longitude: 17.80945, latitude: 51.65058 },
        url: 'http://77.89.85.63/myBusServices/SchedulesService.svc',
        locale: locales.PL,
    },
    OSTROWIEC_SWIETOKRZYSKI: {
        code: 'OSTSW',
        carrier: 'OSTROWIEC ŚWIĘTOKRZYSKI (MZK)',
        position: { longitude: 21.38691, latitude: 50.94004 },
        url: 'http://rozklad.mzkostrowiec.pl/myBusServices/SchedulesService.svc',
        locale: locales.PL,
    },
    PABIANICE: {
        code: 'PABIA',
        carrier: 'PABIANICE (MZK)',
        position: { longitude: 19.35787, latitude: 51.65661 },
        url: 'http://mybus.komunikacjapabianice.pl/SchedulesService.svc',
        locale: locales.PL,
    },
    PLOCK: {
        code: 'PLOCK',
        carrier: 'PŁOCK (KM)',
        position: { longitude: 19.71528, latitude: 52.53927 },
        url: 'http://rozklad.kmplock.eu/myBusServices/SchedulesService.svc',
        locale: locales.PL,
    },
    POLKOWICE: {
        code: 'POLKO',
        carrier: 'POLKOWICE (ZKM)',
        position: { longitude: 16.0717, latitude: 51.50207 },
        url: 'http://zkmp.com.pl/myBusServices/SchedulesService.svc',
        locale: locales.PL,
    },
    PRZEMYSL: {
        code: 'PRMZK',
        carrier: 'PRZEMYŚL (MZK)',
        position: { longitude: 22.77997, latitude: 49.77799 },
        url: 'http://rozklad.mzk.przemysl.pl/myBusServices/SchedulesService.svc',
        locale: locales.PL,
    },
    PULAWY: {
        code: 'PULAW',
        carrier: 'PUŁAWY (MZK)',
        position: { longitude: 21.95587, latitude: 51.41101 },
        url: 'http://mapa.mzk.pulawy.pl/AndroidService/SchedulesService.svc',
        locale: locales.PL,
    },
    RADOM: {
        code: 'RADOM',
        carrier: 'RADOM (MZDiK)',
        position: { longitude: 21.15922, latitude: 51.39989 },
        url: 'http://31.11.251.95/myBusServices/SchedulesService.svc',
        locale: locales.PL,
    },
    RADOMSKO: {
        code: 'RDMSK',
        carrier: 'RADOMSKO (MPK)',
        position: { longitude: 19.44421, latitude: 51.06443 },
        url: 'http://mpk.mpk-radomsko.pl:8081/SchedulesService.svc',
        locale: locales.PL,
    },
    RYBNIK: {
        code: 'RYBNI',
        carrier: 'RYBNIK (KM)',
        position: { longitude: 18.540189, latitude: 50.10213 },
        url: 'http://rozklad.km.rybnik.pl/myBusServices/SchedulesService.svc',
        locale: locales.PL,
    },
    RZESZOW: {
        code: 'RZZTM',
        carrier: 'RZESZÓW (ZTM)',
        position: { longitude: 21.99771, latitude: 50.04152 },
        url: 'http://84.38.160.220/myBusServices/SchedulesService.svc',
        locale: locales.PL,
    },
    SANOK: {
        code: 'SANOK',
        carrier: 'SANOK (SPGK)',
        position: { longitude: 22.212388, latitude: 49.55282 },
        url: 'http://rozkladjazdy.spgk.com.pl/myBusServices/SchedulesService.svc',
        locale: locales.LT,
    },
    SIAULIAI: {
        code: 'SIAUL',
        carrier: 'ŠIAULIAI (Busturas)',
        position: { longitude: 23.30905, latitude: 55.93047 },
        url: 'http://kis.busturas.lt/myBusServices/SchedulesService.svc',
        locale: locales.SK,
    },
    SIEDLCE: {
        code: 'SIEDL',
        carrier: 'SIEDLCE (MPK)',
        position: { longitude: 22.28428, latitude: 52.15917 },
        url: 'https://rozklad.mpk.siedlce.pl/myBusServices/SchedulesService.svc',
        locale: locales.PL,
    },
    SLUPSK: {
        code: 'ZIMSL',
        carrier: 'SŁUPSK (ZIM)',
        position: { longitude: 17.02892, latitude: 54.46268 },
        url: 'http://176.97.80.62/myBusServices/SchedulesService.svc',
        locale: locales.PL,
    },
    STALOWA_WOLA: {
        code: 'STALO',
        carrier: 'STALOWA WOLA (MZK)',
        position: { longitude: 22.0931, latitude: 50.56276 },
        url: 'https://mybus.mzk.stalowa-wola.pl/SchedulesService.svc',
        locale: locales.PL,
    },
    STARACHOWICE: {
        code: 'STRCH',
        carrier: 'STARACHOWICE (ZEC)',
        position: { longitude: 21.07949, latitude: 51.04295 },
        url: 'http://rozklad-jazdy.zecstar.pl/myBusServices/SchedulesService.svc',
        locale: locales.PL,
    },
    SUWALKI: {
        code: 'SUWAL',
        carrier: 'SUWAŁKI (PGK)',
        position: { longitude: 22.94944, latitude: 54.1066 },
        url: 'http://89.22.39.6/AndroidService/SchedulesService.svc',
        locale: locales.PL,
    },
    SWIDNICA: {
        code: 'SWIDN',
        carrier: 'ŚWIDNICA (MPK)',
        position: { longitude: 16.4776, latitude: 50.83697 },
        url: 'http://www.grj.mpk.swidnica.pl/AndroidService/SchedulesService.svc',
        locale: locales.PL,
    },
    SWIEBODZICE: {
        code: 'SWIEB',
        carrier: 'ŚWIEBODZICE (ZGK)',
        position: { longitude: 16.31952, latitude: 50.85805 },
        url: 'http://213.108.80.2:8085/SchedulesService.svc',
        locale: locales.PL,
    },
    TABOR: {
        code: 'TABOR',
        carrier: 'TABOR (COMETT PLUS)',
        position: { longitude: 14.67515, latitude: 49.41406 },
        url: 'http://www.mhd-tabor.comettplus.cz/myBusServices/SchedulesService.svc',
        locale: locales.CZ,
    },
    TARNOWSKIE_GORY: {
        code: 'NOWAK',
        carrier: 'TARNOWSKIE GÓRY (MZKP)',
        position: { longitude: 18.86591, latitude: 50.42355 },
        url: 'http://157.25.157.76/myBusServices/SchedulesService.svc',
        locale: locales.PL,
    },
    TARNOW: {
        code: 'TARNO',
        carrier: 'TARNÓW (ZDiK)',
        position: { longitude: 20.98254, latitude: 50.01224 },
        url: 'http://80.85.231.251/myBusServices/SchedulesService.svc',
        locale: locales.PL,
    },
    TCZEW: {
        code: 'TCZEW',
        carrier: 'TCZEW (Gryf)',
        position: { longitude: 18.78423, latitude: 54.08889 },
        url: 'http://www.rozklady.tczew.pl/myBusServices/SchedulesService.svc',
        locale: locales.PL,
    },
    WALBRZYCH: {
        code: 'WALBR',
        carrier: 'WAŁBRZYCH (ZDKiUM)',
        position: { longitude: 16.28885, latitude: 50.78282 },
        url: 'http://rozklad.walbrzych.eu/myBusServices/SchedulesService.svc',
        locale: locales.PL,
    },
    ZILINA: {
        code: 'ZILIN',
        carrier: 'ŽILINA (DPMZ)',
        position: { longitude: 18.74, latitude: 49.22277 },
        url: 'https://www.mybus.dpmz.sk/myBusServices/SchedulesService.svc',
        locale: locales.SK,
    },
} as const satisfies Record<string, CityInfo>;

export type CityCode = (typeof CITIES)[keyof typeof CITIES]['code'];
