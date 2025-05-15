export interface Product {
  id: number;
  name: {
    ru: string;
    en: string;
    ge: string;
  };
  description: {
    ru: string;
    en: string;
    ge: string;
  };
  price: number;
  currency: string;
  image: string;
  category: string;
  featured?: boolean;
  stock: number; // Added stock information
}

const products: Product[] = [
  {
    id: 1,
    name: {
      ru: "Браслет с Лезвием",
      en: "Blade Bracelet",
      ge: "დანის სამაჯური"
    },
    description: {
      ru: "Металлический браслет с кулоном в форме лезвия. Идеально для тех, кто любит необычные аксессуары.",
      en: "Metal bracelet with a blade-shaped pendant. Perfect for those who love unusual accessories.",
      ge: "ლითონის სამაჯური დანის ფორმის კულონით. იდეალურია მათთვის, ვისაც უჩვეულო აქსესუარები უყვარს."
    },
    price: 45,
    currency: "₾",
    image: "/shoppy/lovable-uploads/e44f7bb1-807b-4b8d-b538-0dd1ea593e33.png",
    category: "bracelets",
    featured: true,
    stock: 5
  },
  {
    id: 2,
    name: {
      ru: "Браслет Guns N' Roses",
      en: "Guns N' Roses Bracelet",
      ge: "Guns N' Roses სამაჯური"
    },
    description: {
      ru: "Металлический браслет с подвеской рок-группы Guns N' Roses. Для настоящих фанатов рока.",
      en: "Metal bracelet with a Guns N' Roses rock band pendant. For true rock fans.",
      ge: "ლითონის სამაჯური Guns N' Roses როკ ჯგუფის კულონით. ნამდვილი როკ ფანებისთვის."
    },
    price: 35,
    currency: "₾",
    image: "/shoppy/lovable-uploads/7d960c2b-179a-4202-8b7c-554d2e26a03a.png",
    category: "bracelets",
    stock: 5
  },
  {
    id: 3,
    name: {
      ru: "Заколки с Розами",
      en: "Rose Hairpins",
      ge: "ვარდის სამაგრები"
    },
    description: {
      ru: "Элегантные заколки с декоративными розами. Идеальное дополнение к вечернему образу.",
      en: "Elegant hairpins with decorative roses. Perfect complement to an evening look.",
      ge: "ელეგანტური სამაგრები დეკორატიული ვარდებით. იდეალური დამატება საღამოს იერსახისთვის."
    },
    price: 25,
    currency: "₾",
    image: "/shoppy/lovable-uploads/c45895f2-5e95-475d-aa43-e42a2ff8067b.png",
    category: "hairpins",
    stock: 5
  },
  {
    id: 4,
    name: {
      ru: "Гребень с Розами",
      en: "Rose Comb",
      ge: "ვარდის სავარცხელი"
    },
    description: {
      ru: "Изысканный гребень с декоративными розами белого и лилового цвета.",
      en: "Exquisite comb with decorative white and lilac roses.",
      ge: "დახვეწილი სავარცხელი თეთრი და იისფერი დეკორატიული ვარდებით."
    },
    price: 40,
    currency: "₾",
    image: "/shoppy/lovable-uploads/a8343320-1131-4091-b76f-99dcd62efce4.png",
    category: "hairpins",
    stock: 5
  },
  {
    id: 5,
    name: {
      ru: "Кольцо с Портретом",
      en: "Portrait Ring",
      ge: "პორტრეტის ბეჭედი"
    },
    description: {
      ru: "Оригинальное кольцо с винтажным портретом в черной оправе. Стильный аксессуар для создания уникального образа.",
      en: "Original ring with a vintage portrait in a black frame. Stylish accessory for creating a unique image.",
      ge: "ორიგინალური ბეჭედი ვინტაჟური პორტრეტით შავ ჩარჩოში. სტილური აქსესუარი უნიკალური იმიჯის შესაქმნელად."
    },
    price: 30,
    currency: "₾",
    image: "/shoppy/lovable-uploads/8b86cd6c-466a-4c62-a5bd-14923b811d03.png",
    category: "rings",
    stock: 5
  },
  {
    id: 6,
    name: {
      ru: "Серьги Зелёные",
      en: "Green Earrings",
      ge: "მწვანე საყურეები"
    },
    description: {
      ru: "Изящные серьги с зелеными бусинами. Легкие и элегантные для повседневной носки.",
      en: "Elegant earrings with green beads. Light and elegant for everyday wear.",
      ge: "ელეგანტური საყურეები მწვანე მძივებით. მსუბუქი და დახვეწილი ყოველდღიური ტარებისთვის."
    },
    price: 20,
    currency: "₾",
    image: "/shoppy/lovable-uploads/2119f525-d255-419e-ad78-3af57aa1e515.png",
    category: "earrings",
    stock: 5
  },
  {
    id: 7,
    name: {
      ru: "Заколки Роза и Череп",
      en: "Rose and Skull Hairpins",
      ge: "ვარდის და თავის ქალის სამაგრები"
    },
    description: {
      ru: "Коллекция эффектных заколок с черепом и розами разных цветов для создания дерзкого образа.",
      en: "Collection of striking hairpins with skull and roses of different colors to create a bold image.",
      ge: "თვალწარმტაცი სამაგრების კოლექცია თავის ქალით და სხვადასხვა ფერის ვარდებით თამამი იმიჯის შესაქმნელად."
    },
    price: 35,
    currency: "₾",
    image: "/shoppy/lovable-uploads/7796131e-ac33-413f-a1ee-50b23b150707.png",
    category: "hairpins",
    stock: 5
  },
  {
    id: 8,
    name: {
      ru: "Серьги Солнце и Луна",
      en: "Sun and Moon Earrings",
      ge: "მზე და მთვარე საყურეები"
    },
    description: {
      ru: "Серьги с изображением солнца и луны из золотистого металла. Мистический аксессуар для вашего образа.",
      en: "Earrings featuring sun and moon images made of golden metal. Mystical accessory for your image.",
      ge: "საყურეები მზისა და მთვარის გამოსახულებით ოქროსფერი ლითონისგან. მისტიკური აქსესუარი თქვენი იმიჯისთვის."
    },
    price: 25,
    currency: "₾",
    image: "/shoppy/lovable-uploads/7536bf2a-a9c0-457a-9a0d-5ccc1a1bce8c.png",
    category: "earrings",
    stock: 5
  }
];

export const getProducts = () => {
  return products;
};

export const getProductById = (id: number) => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = () => {
  return products.filter(product => product.featured);
};

export const getProductsByCategory = (category: string) => {
  return products.filter(product => product.category === category);
};
