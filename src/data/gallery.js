// Gallery content for Tim ProMebel.
//
// Photos are real completed jobs, saved in /public/gallery/ (see the README
// there for how they're processed). `width` is the piece's width in
// millimetres, printed on the card as a dimension line — these are drafted
// estimates by eye, not measurements, so replace them with the real figures
// once they're on hand.
//
// `category` drives the gallery filter; the keys are defined in `categories`
// at the bottom of this file.

export const galleryItems = [
  // — Кујни —
  {
    id: "kujna-sjajna-bela",
    category: "kujni",
    image: "/gallery/01-kujna-sjajna-bela.jpg",
    title: "Кујна во сјаен бел лак",
    width: 3600,
    material: "Сјаен лак фронтови",
    description:
      "Кујна со сјајни бели фронтови и вградени рерна и микробранова печка во иста колона. Работната плоча е во темна нијанса за контраст, а осветлувањето е вградено под горните елементи.",
  },
  {
    id: "kujna-drvo-bez",
    category: "kujni",
    image: "/gallery/02-kujna-drvo-bez.jpg",
    title: "Кујна во беж и дрвен декор",
    width: 3100,
    material: "Дрвен декор фронтови",
    description:
      "Комбинација од беж долни елементи и горни фронтови во дрвен декор, со гасов шпорет и гранитна работна плоча. Аспираторот е вграден под горните елементи за чист и прегледен изглед.",
  },
  {
    id: "kujna-lak-lajsna",
    category: "kujni",
    image: "/gallery/03-kujna-lak-lajsna.jpg",
    title: "Голема кујна во бел лак",
    width: 3800,
    material: "Сјаен лак, дрвена лајсна",
    description:
      "Аголна кујна во сјаен бел лак со дрвена лајсна меѓу горните и долните елементи. Висока колона со вградена рерна носи голем простор за складирање до плафон.",
  },

  // — Гардеробери —
  {
    id: "hol-garderoba",
    category: "garderoberi",
    image: "/gallery/04-hol-garderoba.jpg",
    title: "Гардероба за влезен хол",
    width: 2600,
    material: "Плоча, огледало",
    description:
      "Аголно решение за влезен хол: гардеробер со огледални и полни врати, отворени полици и клупа со закачалки за палта. Сè е изработено во една линија, прилагодено на аголот на просторијата.",
  },
  {
    id: "garderober-ogledalo",
    category: "garderoberi",
    image: "/gallery/05-garderober-ogledalo.jpg",
    title: "Гардеробер со огледално крило",
    width: 2200,
    material: "Плоча 18 мм, огледало",
    description:
      "Гардеробер со крилни врати, од кои едната е целосно огледална. Долгите вертикални рачки во дрвен декор се протегаат по целата височина на вратите.",
  },
  {
    id: "garderober-lizgacki",
    category: "garderoberi",
    image: "/gallery/06-garderober-lizgacki.jpg",
    title: "Гардеробер со лизгачки врати",
    width: 2400,
    material: "Мат стакло, огледало",
    description:
      "Лизгачки гардеробер во комбинација од мат затемнето стакло и огледало, со рамки во дрвен декор. Изработен по мерка на висината на просторијата, со ноќно шкафче во иста завршница.",
  },
  {
    id: "garderober-vitrina",
    category: "garderoberi",
    image: "/gallery/07-garderober-vitrina.jpg",
    title: "Гардеробер со витрина",
    width: 3200,
    material: "Сјаен лак, стакло",
    description:
      "Гардеробер во сјаен бел лак со долги вертикални рачки, надополнет со висока витрина со стаклени врати и полици. Витрината е засебна целина што се вклопува точно до гардероберот.",
  },

  // — Соби —
  {
    id: "mladinska-soba",
    category: "sobi",
    image: "/gallery/08-mladinska-soba.jpg",
    title: "Младинско креветче со шкафче",
    width: 1000,
    material: "Тапацирана табла",
    description:
      "Едно креветче со тапацирана табла и ноќно шкафче, изработени во иста нијанса за смирен, усогласен ентериер. Компактно решение за помала соба.",
  },
  {
    id: "toaletna-masichka-lamelna",
    category: "sobi",
    image: "/gallery/09-toaletna-masichka-lamelna.jpg",
    title: "Тоалетна масичка со ламели",
    width: 1000,
    material: "Ламелна фронта, огледало",
    description:
      "Висечка тоалетна масичка со фиока, вградена во панел со вертикални ламели во комбинација од графит и дрвен декор. Тркалезното огледало е монтирано директно на панелот.",
  },
  {
    id: "krevet-boucle",
    category: "sobi",
    image: "/gallery/10-krevet-boucle.jpg",
    title: "Тапациран кревет во букле",
    width: 1800,
    material: "Букле текстил",
    description:
      "Кревет со целосно тапацирана рамка и канелирана табла во мек букле текстил. Изработен по мерка за поткровна спална соба со скошен таван.",
  },
  {
    id: "toaletna-masichka",
    category: "sobi",
    image: "/gallery/11-toaletna-masichka.jpg",
    title: "Тоалетна масичка со тркалезно огледало",
    width: 900,
    material: "Дрвен фурнир, огледало",
    description:
      "Висечка тоалетна масичка со големо тркалезно огледало, монтирана во дрвен панел до креветот. Совршена комбинација со тапацираниот кревет во истата соба.",
  },
  {
    id: "tv-zid-3d",
    category: "sobi",
    image: "/gallery/12-tv-zid-3d.jpg",
    title: "ТВ ѕид со 3Д панели",
    width: 3600,
    material: "3Д панели, ЛЕД",
    description:
      "Скулптурален ТВ ѕид составен од квадратни 3Д панели, со скриено ЛЕД осветлување во делови од композицијата. Нисок телевизиски елемент со фиоки стои под телевизорот.",
  },
  {
    id: "detska-fudbal",
    category: "sobi",
    image: "/gallery/13-detska-fudbal.jpg",
    title: "Детска соба на фудбалска тема",
    width: 2400,
    material: "Плоча, тапацирано",
    description:
      "Детска соба со тапацирано креветче во сина боја, отворена полица во жолто и гардеробер во истата палета. Ѕидниот принт е избран заедно со детето, а мебелот е прилагоден на темата.",
  },
  {
    id: "detsko-biro",
    category: "sobi",
    image: "/gallery/14-detsko-biro.jpg",
    title: "Детско биро со ТВ ѕид",
    width: 1400,
    material: "Ламелна фронта",
    description:
      "Работен агол во истата детска соба: биро со фиоки под ѕид со вертикални ламели, на кој е монтиран телевизор. Практично место за учење и игри.",
  },

  // — Останато —
  {
    id: "trpezariska-masa",
    category: "ostanato",
    image: "/gallery/15-trpezariska-masa.jpg",
    title: "Трпезариска маса на масивна нога",
    width: 1800,
    material: "Масив и метал",
    description:
      "Трпезариска маса со скулптурална Х-нога од масивно дрво и стаклена површина. Изработена да биде централна точка во трпезаријата.",
  },
  {
    id: "biblioteka",
    category: "ostanato",
    image: "/gallery/16-biblioteka.jpg",
    title: "Библиотека од под до плафон",
    width: 3400,
    material: "Плоча, ламинат",
    description:
      "Библиотечен ѕид составен од три сегменти, изработен точно по мерка на просторијата од под до плафон. Отворените полици носат целата домашна колекција од книги без да заземаат вишок простор.",
  },
  {
    id: "raboten-biro",
    category: "ostanato",
    image: "/gallery/17-raboten-biro.jpg",
    title: "Работна маса за домашна канцеларија",
    width: 1800,
    material: "Плоча, метални нозе",
    description:
      "Работна маса на тенки метални нозе, со засебен контејнер од шест фиоки вграден под едниот крај. Едноставна и функционална за домашна канцеларија.",
  },
  {
    id: "polici-kosina",
    category: "ostanato",
    image: "/gallery/18-polici-kosina.jpg",
    title: "Полици под скошен таван",
    width: 1200,
    material: "Плоча",
    description:
      "Вградени полици што го следат скошениот ѕид на поткровјето, со контрастна темна преграда и затворен простор за складирање под нив. Го искористуваат просторот што инаку би останал празен.",
  },
  {
    id: "klupa-chekalna",
    category: "ostanato",
    image: "/gallery/19-klupa-chekalna.jpg",
    title: "Клупа за деловна чекална",
    width: 3000,
    material: "Тапацирано, метал",
    description:
      "Модуларна тапацирана клупа околу централна саксија, изработена за чекална во деловен простор. Секој модул стои на засебни метални нозе за лесно преместување.",
  },
]

// Filter chips above the gallery, in the order they are shown.
export const categories = [
  { id: "all", label: "Сите" },
  { id: "kujni", label: "Кујни" },
  { id: "garderoberi", label: "Гардеробери" },
  { id: "sobi", label: "Соби" },
  { id: "ostanato", label: "Останато" },
]

export default galleryItems
