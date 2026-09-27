// Gallery content for Tim ProMebel.
//
// Photos come from the company's Facebook page:
// https://www.facebook.com/people/Tim-ProMebel/100077423180264/?sk=photos
// Facebook blocks automated downloads, so save each photo by hand into
// /public/gallery/ and point `image` at it. The .svg files referenced below
// are placeholders so the site runs.
//
// `width` is the piece's real width in millimetres and is printed on the card
// as a dimension line — replace the drafts with the actual figures.
//
// `category` drives the gallery filter; the keys are defined in `categories`
// at the bottom of this file.

export const galleryItems = [
  {
    id: "kujna-moderna",
    category: "kujni",
    image: "/gallery/01-kujna-moderna.svg",
    title: "Модерна кујна",
    width: 3200,
    material: "Мат МДФ фронтови",
    description:
      "Кујна по мерка со мат фронтови и скриени рачки. Работната плоча е отпорна на влага и топлина, а секој елемент е скроен според просторот.",
  },
  {
    id: "kujna-drvo",
    category: "kujni",
    image: "/gallery/02-kujna-drvo.svg",
    title: "Кујна во масив",
    width: 2800,
    material: "Фурнир даб",
    description:
      "Топол дрвен декор со видлива структура на фурнирот. Комбинација од затворени долни елементи и отворени полици за секојдневна употреба.",
  },
  {
    id: "garderober-lizgacki",
    category: "garderoberi",
    image: "/gallery/03-garderober-lizgacki.svg",
    title: "Гардеробер со лизгачки врати",
    width: 2400,
    material: "Плоча 18 мм, огледало",
    description:
      "Гардеробер од под до плафон со лизгачки врати и огледало. Внатрешноста е поделена на прачки, фиоки и полици според потребите на семејството.",
  },
  {
    id: "garderober-agolen",
    category: "garderoberi",
    image: "/gallery/04-garderober-agolen.svg",
    title: "Аголен гардеробер",
    width: 1800,
    material: "Плоча 18 мм",
    description:
      "Решение за аголен простор што го користи секој сантиметар. Меко затворање на вратите и осветлување во внатрешноста.",
  },
  {
    id: "spalna-soba",
    category: "sobi",
    image: "/gallery/05-spalna-soba.svg",
    title: "Спална соба",
    width: 1600,
    material: "Тапациран кревет",
    description:
      "Комплет спална соба со тапациран кревет, ноќни шкафчиња и комода. Изработена во иста нијанса за мирен и усогласен ентериер.",
  },
  {
    id: "detska-soba",
    category: "sobi",
    image: "/gallery/06-detska-soba.svg",
    title: "Детска соба",
    width: 2200,
    material: "Плоча 18 мм, заоблени рабови",
    description:
      "Функционална детска соба со работен агол, полици за книги и простор за играчки. Заоблени рабови и материјали безбедни за деца.",
  },
  {
    id: "dneven-boravok",
    category: "sobi",
    image: "/gallery/07-dneven-boravok.svg",
    title: "Дневна соба",
    width: 3000,
    material: "ТВ ѕид со ЛЕД",
    description:
      "ТВ ѕид со комбинација од затворени касети и отворени полици. Скриено водење на каблите и ЛЕД осветлување зад плочата.",
  },
  {
    id: "trpezariska-masa",
    category: "ostanato",
    image: "/gallery/08-trpezariska-masa.svg",
    title: "Трпезариска маса",
    width: 1800,
    material: "Масив и метал",
    description:
      "Маса од масивно дрво со метална конструкција. Површината е заштитена со лак отпорен на дамки и секојдневно користење.",
  },
  {
    id: "kancelariski-mebel",
    category: "ostanato",
    image: "/gallery/09-kancelariski-mebel.svg",
    title: "Канцелариски мебел",
    width: 2600,
    material: "Плоча 18 мм",
    description:
      "Работни маси и ормани за канцеларија, изработени по мерка на просторот. Издржливи материјали за секојдневна работа.",
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
