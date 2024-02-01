  // some mock data
  const top_seller = [
    { name: "Pizza", value: 1230 },
    { name: "Chicken", value: 751 },
    { name: "Rolls", value: 471 },
    { name: "Waffel", value: 280 },
    { name: "Drinks", value: 78 },
  ];
  
  const vendors = [
    { name: "Berlin Mitte", value: "DE_Berlin_0001"},
    { name: "Berlin Prenzlauer Berg", value: "DE_Berlin_0002"},
    { name: "Berlin Friedrichshain", value: "DE_Berlin_0003"},
    { name: "Berlin Kreuzberg", value: "DE_Berlin_0004"},
    { name: "Berlin Neukölln", value: "DE_Berlin_0005"},
    { name: "Berlin Schöneberg", value: "DE_Berlin_0006"},
    { name: "Berlin Charlottenburg", value: "DE_Berlin_0007"},
    { name: "Berlin Spandau", value: "DE_Berlin_0008"},
    { name: "Berlin Steglitz", value: "DE_Berlin_0009"},
    { name: "Berlin Tempelhof", value: "DE_Berlin_0010"},
    { name: "Berlin Wedding", value: "DE_Berlin_0011"},
    { name: "Berlin Reinickendorf", value: "DE_Berlin_0012"},
  ]


const categories = [
  {
    title: "Umsatz",
    metric: "3.832,29€",
  },
  {
    title: "Anz. Bestellungen",
    metric: "234",
  },
  {
    title: "Durchschn. Wahrenkorbwert",
    metric: "27,54€",
  },
  {
    title: "Rating",
    metric: "4,1",
  },
];

const revenueData = [
  {
    Month: "Jan 22",
    Lieferando: 3890,
    "Uber Eats": 2980,
    Wolt: 2645,
  },
  {
    Month: "Jan 23",
    Lieferando: 4200,
    "Uber Eats": 3100,
    Wolt: 2800,
  },
  {
    Month: "Jan 24",
    Lieferando: 3500,
    "Uber Eats": 2700,
    Wolt: 2400,
  },
  {
    Month: "Jan 25",
    Lieferando: 3900,
    "Uber Eats": 2900,
    Wolt: 2600,
  },
  {
    Month: "Jan 26",
    Lieferando: 4100,
    "Uber Eats": 3000,
    Wolt: 2700,
  },
  {
    Month: "Jan 27",
    Lieferando: 4300,
    "Uber Eats": 3200,
    Wolt: 2900,
  },
  {
    Month: "Jan 28",
    Lieferando: 4500,
    "Uber Eats": 3400,
    Wolt: 3100,
  },
  {
    Month: "Jan 29",
    Lieferando: 4700,
    "Uber Eats": 3600,
    Wolt: 3300,
  },
  {
    Month: "Jan 30",
    Lieferando: 4900,
    "Uber Eats": 3800,
    Wolt: 3500,
  },
  {
    Month: "Jan 31",
    Lieferando: 5100,
    "Uber Eats": 4000,
    Wolt: 3700,
  },
  {
    Month: "Feb 1",
    Lieferando: 5300,
    "Uber Eats": 6200,
    Wolt: 3900,
  },
  {
    Month: "Feb 2",
    Lieferando: 6500,
    "Uber Eats": 7800,
    Wolt: 4100,
  },
  {
    Month: "Feb 3",
    Lieferando: 5700,
    "Uber Eats": 7200,
    Wolt: 4300,
  },
  {
    Month: "Feb 4",
    Lieferando: 6900,
    "Uber Eats": 7100,
    Wolt: 4500,
  },
  {
    Month: "Feb 5",
    Lieferando: 6100,
    "Uber Eats": 5000,
    Wolt: 4700,
  },
  {
    Month: "Feb 6",
    Lieferando: 6300,
    "Uber Eats": 5200,
    Wolt: 4900,
  },
  {
    Month: "Feb 7",
    Lieferando: 6500,
    "Uber Eats": 5400,
    Wolt: 5100,
  },
  {
    Month: "Feb 8",
    Lieferando: 6700,
    "Uber Eats": 5600,
    Wolt: 5300,
  },
  {
    Month: "Feb 9",
    Lieferando: 6900,
    "Uber Eats": 5800,
    Wolt: 5500,
  },
  {
    Month: "Feb 10",
    Lieferando: 7100,
    "Uber Eats": 6000,
    Wolt: 5700,
  },
];
const valueFormatter = (number:number) => Intl.NumberFormat("de").format(number).toString();

const itemsSold = [
  {
    name: "Pizza",
    value: 456,   
  },
  {
    name: "Pasta",
    value: 321,
  },
  {
    name: "Burger",
    value: 234,
  },
  {
    name: "Chicken",
    value: 123,
  },
  {
    name: "Fries",
    value: 89,
  },
  {
    name: "Rolls",
    value: 78,
  },
  {
    name: "Waffel",
    value: 45,
  },
  {
    name: "Drinks",
    value: 12,
  },
];

export { top_seller, vendors, categories, revenueData, valueFormatter, itemsSoled }