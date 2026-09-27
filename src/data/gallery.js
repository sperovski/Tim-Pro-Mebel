// Gallery content for Tim ProMebel.
//
// Photos are real completed jobs, saved in /public/gallery/ (see the README
// there for how they're processed). `width` is the piece's width in
// millimetres, printed on the card as a dimension line — these are drafted
// estimates by eye, not measurements, so replace them with the real figures
// once they're on hand.
//
// `images` is an array, not a single path: most pieces have one photo, but
// where a job has more than one (a bedroom's bed and its vanity, a kid's
// room's bed wall and desk wall) they share one card and rotate between
// them instead of duplicating the job as separate cards.
//
// `aspect` is the CSS aspect-ratio of the source photo (all of it: none of
// these are cropped square or landscape — the card is shaped to the photo,
// not the other way round). Every item in one card's `images` shares the
// same aspect so rotating between them never shifts the layout.
//
// `category` drives the gallery filter; the keys are defined in `categories`
// at the bottom of this file.
//
// `featured: true` marks the three pieces shown large in "Избрани работи"
// before the full gallery — picked for variety of room type, not order.

export const galleryItems = [
  // — Кујни —
  {
    id: "kujna-sjajna-bela",
    category: "kujni",
    images: ["/gallery/01-kujna-sjajna-bela.jpg"],
    aspect: "630/1400",
    title: "Кујна во сјаен бел лак",
    width: 3600,
    material: "Сјаен лак фронтови",
    description:
      "Кујна со сјајни бели фронтови и вградени рерна и микробранова печка во иста колона. Работната плоча е во темна нијанса за контраст, а осветлувањето е вградено под горните елементи.",
  },
  {
    id: "kujna-drvo-bez",
    category: "kujni",
    images: ["/gallery/02-kujna-drvo-bez.jpg"],
    aspect: "1050/1400",
    title: "Кујна во беж и дрвен декор",
    width: 3100,
    material: "Дрвен декор фронтови",
    description:
      "Комбинација од беж долни елементи и горни фронтови во дрвен декор, со гасов шпорет и гранитна работна плоча. Аспираторот е вграден под горните елементи за чист и прегледен изглед.",
  },
  {
    id: "kujna-lak-lajsna",
    featured: true,
    category: "kujni",
    images: ["/gallery/03-kujna-lak-lajsna.jpg"],
    aspect: "1050/1400",
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
    images: ["/gallery/04-hol-garderoba.jpg"],
    aspect: "630/1400",
    title: "Гардероба за влезен хол",
    width: 2600,
    material: "Плоча, огледало",
    description:
      "Аголно решение за влезен хол: гардеробер со огледални и полни врати, отворени полици и клупа со закачалки за палта. Сè е изработено во една линија, прилагодено на аголот на просторијата.",
  },
  {
    id: "garderober-ogledalo",
    category: "garderoberi",
    images: ["/gallery/05-garderober-ogledalo.jpg"],
    aspect: "630/1400",
    title: "Гардеробер со огледално крило",
    width: 2200,
    material: "Плоча 18 мм, огледало",
    description:
      "Гардеробер со крилни врати, од кои едната е целосно огледална. Долгите вертикални рачки во дрвен декор се протегаат по целата височина на вратите.",
  },
  {
    id: "garderober-lizgacki",
    category: "garderoberi",
    images: ["/gallery/06-garderober-lizgacki.jpg"],
    aspect: "1050/1400",
    title: "Гардеробер со лизгачки врати",
    width: 2400,
    material: "Мат стакло, огледало",
    description:
      "Лизгачки гардеробер во комбинација од мат затемнето стакло и огледало, со рамки во дрвен декор. Изработен по мерка на висината на просторијата, со ноќно шкафче во иста завршница.",
  },
  {
    id: "garderober-vitrina",
    category: "garderoberi",
    images: ["/gallery/07-garderober-vitrina.jpg"],
    aspect: "1050/1400",
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
    images: ["/gallery/08-mladinska-soba.jpg"],
    aspect: "630/1400",
    title: "Младинско креветче со шкафче",
    width: 1000,
    material: "Тапацирана табла",
    description:
      "Едно креветче со тапацирана табла и ноќно шкафче, изработени во иста нијанса за смирен, усогласен ентериер. Компактно решение за помала соба.",
  },
  {
    id: "toaletna-masichka-lamelna",
    category: "sobi",
    images: ["/gallery/09-toaletna-masichka-lamelna.jpg"],
    aspect: "1050/1400",
    title: "Тоалетна масичка со ламели",
    width: 1000,
    material: "Ламелна фронта, огледало",
    description:
      "Висечка тоалетна масичка со фиока, вградена во панел со вертикални ламели во комбинација од графит и дрвен декор. Тркалезното огледало е монтирано директно на панелот.",
  },
  {
    // Same bedroom, two pieces — the vanity's mirror reflects this bed's own
    // headboard, so it goes on one card instead of two.
    id: "spalna-boucle",
    featured: true,
    category: "sobi",
    images: ["/gallery/10-krevet-boucle.jpg", "/gallery/11-toaletna-masichka.jpg"],
    aspect: "1050/1400",
    title: "Спална соба во букле",
    width: 1800,
    material: "Букле текстил, дрвен фурнир",
    description:
      "Целосна спална соба за поткровје со скошен таван: тапациран кревет со канелирана табла во мек букле текстил, и висечка тоалетна масичка со тркалезно огледало во истиот простор.",
  },
  {
    id: "tv-zid-3d",
    category: "sobi",
    images: ["/gallery/12-tv-zid-3d.jpg"],
    aspect: "1050/1400",
    title: "ТВ ѕид со 3Д панели",
    width: 3600,
    material: "3Д панели, ЛЕД",
    description:
      "Скулптурален ТВ ѕид составен од квадратни 3Д панели, со скриено ЛЕД осветлување во делови од композицијата. Нисок телевизиски елемент со фиоки стои под телевизорот.",
  },
  {
    // Same kid's room, two walls — the bed wall and the desk wall.
    id: "detska-fudbal",
    category: "sobi",
    images: ["/gallery/13-detska-fudbal.jpg", "/gallery/14-detsko-biro.jpg"],
    aspect: "1050/1400",
    title: "Детска соба на фудбалска тема",
    width: 2400,
    material: "Плоча, тапацирано, ламелна фронта",
    description:
      "Комплетна детска соба: тапацирано креветче, отворена полица и гардеробер во сина и жолта палета, со засебен работен агол каде биро стои под ѕид со вертикални ламели за телевизорот. Ѕидниот принт е избран заедно со детето.",
  },

  // — Останато —
  {
    id: "trpezariska-masa",
    category: "ostanato",
    images: ["/gallery/15-trpezariska-masa.jpg"],
    aspect: "630/1400",
    title: "Трпезариска маса на масивна нога",
    width: 1800,
    material: "Масив и метал",
    description:
      "Трпезариска маса со скулптурална Х-нога од масивно дрво и стаклена површина. Изработена да биде централна точка во трпезаријата.",
  },
  {
    id: "biblioteka",
    featured: true,
    category: "ostanato",
    images: ["/gallery/16-biblioteka.jpg"],
    aspect: "1050/1400",
    title: "Библиотека од под до плафон",
    width: 3400,
    material: "Плоча, ламинат",
    description:
      "Библиотечен ѕид составен од три сегменти, изработен точно по мерка на просторијата од под до плафон. Отворените полици носат целата домашна колекција од книги без да заземаат вишок простор.",
  },
  {
    id: "raboten-biro",
    category: "ostanato",
    images: ["/gallery/17-raboten-biro.jpg"],
    aspect: "630/1400",
    title: "Работна маса за домашна канцеларија",
    width: 1800,
    material: "Плоча, метални нозе",
    description:
      "Работна маса на тенки метални нозе, со засебен контејнер од шест фиоки вграден под едниот крај. Едноставна и функционална за домашна канцеларија.",
  },
  {
    id: "polici-kosina",
    category: "ostanato",
    images: ["/gallery/18-polici-kosina.jpg"],
    aspect: "630/1400",
    title: "Полици под скошен таван",
    width: 1200,
    material: "Плоча",
    description:
      "Вградени полици што го следат скошениот ѕид на поткровјето, со контрастна темна преграда и затворен простор за складирање под нив. Го искористуваат просторот што инаку би останал празен.",
  },
  {
    id: "klupa-chekalna",
    category: "ostanato",
    images: ["/gallery/19-klupa-chekalna.jpg"],
    aspect: "1050/1400",
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
