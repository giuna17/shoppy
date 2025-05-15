import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Определяем типы для текстов на разных языках
export type Translations = {
  [key: string]: {
    [key: string]: string;
  };
};

// Добавляем все переводы здесь
export const translations: Translations = {
  // Навигация
  'nav.home': {
    ru: 'Главная',
    en: 'Home',
    ge: 'მთავარი'
  },
  'nav.shop': {
    ru: 'Магазин',
    en: 'Shop',
    ge: 'მაღაზია'
  },
  'nav.about': {
    ru: 'О нас',
    en: 'About',
    ge: 'შესახებ'
  },
  'nav.contact': {
    ru: 'Контакты',
    en: 'Contact',
    ge: 'კონტაქტი'
  },
  'nav.categories': {
    ru: 'Категории',
    en: 'Categories',
    ge: 'კატეგორიები'
  },
  
  // Кнопки на главной странице
  'home.shop_now': {
    ru: 'Купить сейчас',
    en: 'Shop Now',
    ge: 'შეიძინე ახლა'
  },
  'home.our_story': {
    ru: 'Наша история',
    en: 'Our Story',
    ge: 'ჩვენი ისტორია'
  },
  'home.subtitle': {
    ru: 'Альтернативные украшения для тех, кто отвергает конформизм и создаёт собственные правила.',
    en: 'Alternative jewelry for those who reject conformity and create their own rules.',
    ge: 'ალტერნატიული სამკაულები მათთვის, ვინც უარყოფს კონფორმიზმს და ქმნის საკუთარ წესებს.'
  },
  
  // Секции на главной
  'home.popular_products': {
    ru: 'Популярные товары',
    en: 'Popular Products',
    ge: 'პოპულარული პროდუქტები'
  },
  'home.view_all': {
    ru: 'Смотреть все',
    en: 'View All',
    ge: 'ყველას ნახვა'
  },
  
  // Footer информация
  'footer.shop': {
    ru: 'Магазин',
    en: 'Shop',
    ge: 'მაღაზია'
  },
  'footer.company': {
    ru: 'Компания',
    en: 'Company',
    ge: 'კომპანია'
  },
  'footer.info': {
    ru: 'Информация',
    en: 'Info',
    ge: 'ინფორმაცია'
  },
  'footer.all_products': {
    ru: 'Все товары',
    en: 'All Products',
    ge: 'ყველა პროდუქტი'
  },
  'footer.bracelets': {
    ru: 'Браслеты',
    en: 'Bracelets',
    ge: 'სამაჯურები'
  },
  'footer.necklaces': {
    ru: 'Ожерелья',
    en: 'Necklaces',
    ge: 'ყელსაბამები'
  },
  'footer.rings': {
    ru: 'Кольца',
    en: 'Rings',
    ge: 'ბეჭდები'
  },
  'footer.candles': {
    ru: 'Свечи',
    en: 'Candles',
    ge: 'სანთლები'
  },
  'footer.about_us': {
    ru: 'О нас',
    en: 'About Us',
    ge: 'ჩვენს შესახებ'
  },
  'footer.contact': {
    ru: 'Контакты',
    en: 'Contact',
    ge: 'კონტაქტი'
  },
  'footer.faq': {
    ru: 'ЧЗВ',
    en: 'FAQ',
    ge: 'ხშირად დასმული კითხვები'
  },
  'footer.shipping': {
    ru: 'Доставка',
    en: 'Shipping',
    ge: 'მიწოდება'
  },
  'footer.handmade': {
    ru: 'Все изделия ручной работы, созданные с любовью и вниманием к деталям.',
    en: 'All creations are handmade, crafted with love and attention to detail.',
    ge: 'ყველა ნაკეთობა ხელნაკეთია, შექმნილია სიყვარულით და დეტალების ყურაღებით.'
  },
  'footer.delivery': {
    ru: 'Доставка от 5 лари (доставка на дом).',
    en: 'Delivery from 5 lari (home delivery).',
    ge: 'მიტანა 5 ლარიდან (სახლში მიტანა).'
  },
  
  // Корзина
  'cart.your_cart': {
    ru: 'Ваша корзина',
    en: 'Your Cart',
    ge: 'თქვენი კალათა'
  },
  'cart.empty': {
    ru: 'Корзина пуста',
    en: 'Cart is empty',
    ge: 'კალათა ცარიელია'
  },
  'cart.total': {
    ru: 'Итого',
    en: 'Total',
    ge: 'ჯამი'
  },
  'cart.checkout': {
    ru: 'Оформить заказ',
    en: 'Checkout',
    ge: 'შეკვეთის გაფორმება'
  },
  
  // Товары
  'product.add_to_cart': {
    ru: 'В корзину',
    en: 'Add to cart',
    ge: 'კალათაში დამატება'
  },
  'product.featured': {
    ru: 'Рекомендуемый товар',
    en: 'Featured Product',
    ge: 'რჩეული პროდუქტი'
  },
  'product.in_stock': {
    ru: 'В наличии',
    en: 'In stock',
    ge: 'მარაგშია'
  },
  'product.out_of_stock': {
    ru: 'Нет в наличии',
    en: 'Out of stock',
    ge: 'არ არის მარაგში'
  },
  'product.back_to_shop': {
    ru: 'Назад в магазин',
    en: 'Back to shop',
    ge: 'მაღაზიაში დაბრუნება'
  },
  'product.details': {
    ru: 'Детали',
    en: 'Details',
    ge: 'დეტალები'
  },
  'product.not_found': {
    ru: 'Товар не найден',
    en: 'Product not found',
    ge: 'პროდუქტი არ მოიძებნა'
  },
  'product.not_found_message': {
    ru: 'Извините, запрашиваемый товар не существует.',
    en: 'Sorry, the requested product does not exist.',
    ge: 'ბოდიში, მოთხოვნილი პროდუქტი არ არსებობს.'
  },
  'product.return_to_shop': {
    ru: 'Вернуться в магазин',
    en: 'Return to shop',
    ge: 'მაღაზიაში დაბრუნება'
  },
  'product.detail_1': {
    ru: '• Ручная работа из премиум-материалов',
    en: '• Handcrafted from premium materials',
    ge: '• ხელნაკეთი პრემიუმ მასალებისგან'
  },
  'product.detail_2': {
    ru: '• Уникальный альтернативный стиль',
    en: '• Unique alternative style',
    ge: '• უნიკალური ალტერნატიული სტილი'
  },
  'product.detail_3': {
    ru: '• Фирменный дизайн Anarchy',
    en: '• Signature Anarchy design',
    ge: '• Anarchy-ის ხელმოწერილი დიზაინი'
  },
  'product.detail_4': {
    ru: '• Сделано на века',
    en: '• Built to last',
    ge: '• შექმნილია საუკუნოდ'
  },
  'product.remaining_stock': {
    ru: 'Осталось: {count} шт.',
    en: 'Remaining: {count} pcs',
    ge: 'დარჩენილია: {count} ც.'
  },
  'product.no_stock': {
    ru: 'Нет в наличии',
    en: 'Out of stock',
    ge: 'არ არის მარაგში'
  },
  'product.stock_warning': {
    ru: 'Вы можете заказать не больше, чем есть в наличии. Если выбрано больше — количество будет уменьшено до доступного.',
    en: 'You can\'t order more than available in stock. If more is selected, the quantity will be reduced to available.',
    ge: 'თქვენ არ შეგიძლიათ შეუკვეთოთ მეტი, ვიდრე მარაგშია. მეტის არჩევის შემთხვევაში, რაოდენობა შემცირდება ხელმისაწვდომამდე.'
  },
  'product.most_viewed': {
    ru: 'Самый популярный',
    en: 'Most viewed',
    ge: 'ყველაზე პოპულარული'
  },

  // Категории
  'category.all': {
    ru: 'Все',
    en: 'All',
    ge: 'ყველა'
  },
  'category.bracelets': {
    ru: 'Браслеты',
    en: 'Bracelets',
    ge: 'სამაჯურები'
  },
  'category.rings': {
    ru: 'Кольца',
    en: 'Rings',
    ge: 'ბეჭდები'
  },
  'category.earrings': {
    ru: 'Серьги',
    en: 'Earrings',
    ge: 'საყურეები'
  },
  'category.hairpins': {
    ru: 'Заколки',
    en: 'Hairpins',
    ge: 'სამაგრები'
  },
  'category.candles': {
    ru: 'Свечи',
    en: 'Candles',
    ge: 'სანთლები'
  },
  
  // Уведомления
  'toast.added_to_cart': {
    ru: 'Добавлено в корзину',
    en: 'Added to cart',
    ge: 'კალათაში დამატებულია'
  },
  'toast.added_to_cart_description': {
    ru: 'Товар был добавлен в вашу корзину',
    en: 'Product has been added to your cart',
    ge: 'პროდუქტი დაემატა თქვენს კალათას'
  },
  'toast.stock_limit_reached': {
    ru: 'Эй, не жадничай',
    en: 'Hey, don\'t be greedy',
    ge: 'ჰეი, ნუ იქნები ხარბი'
  },
  'toast.stock_limit_message': {
    ru: 'Мы же сказали — максимум 5. Хочешь больше? Жди пополнения.',
    en: 'We said — maximum 5. Want more? Wait for restock.',
    ge: 'ჩვენ ვთქვით — მაქსიმუმ 5. გინდა მეტი? დაელოდე შევსებას.'
  },

  // Отзывы
  'reviews.title': {
    ru: 'Отзывы пользователей',
    en: 'User Reviews',
    ge: 'მომხმარებლის მიმოხილვები'
  },
  'reviews.leave_review': {
    ru: 'Оставить отзыв',
    en: 'Leave a Review',
    ge: 'დატოვეთ მიმოხილვა'
  },
  'reviews.rating': {
    ru: 'Оценка',
    en: 'Rating',
    ge: 'შეფასება'
  },
  'reviews.comment': {
    ru: 'Комментарий',
    en: 'Comment',
    ge: 'კომენტარი'
  },
  'reviews.comment_placeholder': {
    ru: 'Напишите ваш комментарий здесь...',
    en: 'Write your comment here...',
    ge: 'დაწერეთ თქვენი კომენტარი აქ...'
  },
  'reviews.photo_url': {
    ru: 'URL фотографии',
    en: 'Photo URL',
    ge: 'ფოტოს URL'
  },
  'reviews.photo_url_placeholder': {
    ru: 'Вставьте URL изображения здесь',
    en: 'Paste the image URL here',
    ge: 'ჩასვით სურათის URL აქ'
  },
  'reviews.submit': {
    ru: 'Отправить отзыв',
    en: 'Submit Review',
    ge: 'მიმოხილვის გაგზავნა'
  },
  'reviews.review': {
    ru: 'отзыв',
    en: 'review',
    ge: 'მიმოხილვა'
  },
  'reviews.reviews': {
    ru: 'отзывов',
    en: 'reviews',
    ge: 'მიმოხილვები'
  },
  'reviews.no_reviews': {
    ru: 'Пока нет отзывов',
    en: 'No reviews yet',
    ge: 'ჯერ არ არის მიმოხილვები'
  },
  'reviews.testimonials': {
    ru: 'Отзывы клиентов',
    en: 'Customer Reviews',
    ge: 'მომხმარებელთა მიმოხილვები'
  },
  'reviews.view_all': {
    ru: 'Смотреть все',
    en: 'View all',
    ge: 'ყველას ნახვა'
  },
  'reviews.success': {
    ru: 'Успех!',
    en: 'Success!',
    ge: 'წარმატება!'
  },
  'reviews.thank_you': {
    ru: 'Спасибо за ваш отзыв!',
    en: 'Thank you for your review!',
    ge: 'მადლობა თქვენი მიმოხილვისთვის!'
  },
  'reviews.error': {
    ru: 'Ошибка',
    en: 'Error',
    ge: 'შეცდომა'
  },
  'reviews.comment_required': {
    ru: 'Пожалуйста, оставьте комментарий',
    en: 'Please leave a comment',
    ge: 'გთხოვთ დატოვოთ კომენტარი'
  },
  'reviews.rating_required': {
    ru: 'Пожалуйста, поставьте оценку',
    en: 'Please provide a rating',
    ge: 'გთხოვთ მიუთითოთ შეფასება'
  },
  'reviews.must_purchase': {
    ru: 'Вы можете оставить отзыв только после покупки товара',
    en: 'You can only leave a review after purchasing the product',
    ge: 'თქვენ შეგიძლიათ დატოვოთ მიმოხილვა მხოლოდ პროდუქტის შეძენის შემდეგ'
  },
  'reviews.already_reviewed': {
    ru: 'Вы уже оставили отзыв на этот товар',
    en: 'You have already reviewed this product',
    ge: 'თქვენ უკვე დატოვეთ მიმოხილვა ამ პროდუქტზე'
  },
  'reviews.must_purchase_message': {
    ru: 'Отзывы могут оставлять только покупатели, которые приобрели этот товар.',
    en: 'Reviews can only be left by customers who have purchased this item.',
    ge: 'მიმოხილვების დატოვება შეუძლიათ მხოლოდ მომხმარებლებს, რომლებმაც შეიძინეს ეს ნივთი.'
  },
  
  // Аутентификация
  'auth.sign_in': {
    ru: 'Вход',
    en: 'Sign In',
    ge: 'შესვლა'
  },
  'auth.sign_up': {
    ru: 'Регистрация',
    en: 'Sign Up',
    ge: 'რეგისტრაცია'
  },
  'auth.sign_out': {
    ru: 'Выйти',
    en: 'Sign Out',
    ge: 'გამოსვლა'
  },
  'auth.email': {
    ru: 'Электронная почта',
    en: 'Email',
    ge: 'ელ.ფოსტა'
  },
  'auth.password': {
    ru: 'Пароль',
    en: 'Password',
    ge: 'პაროლი'
  },
  'auth.name': {
    ru: 'Имя',
    en: 'Name',
    ge: 'სახელი'
  },
  'auth.continue_with': {
    ru: 'Продолжить с',
    en: 'Continue with',
    ge: 'გაგრძელება'
  },
  'auth.google': {
    ru: 'Google',
    en: 'Google',
    ge: 'Google'
  },
  'auth.facebook': {
    ru: 'Facebook',
    en: 'Facebook',
    ge: 'Facebook'
  },
  'auth.no_account': {
    ru: 'Нет аккаунта?',
    en: 'Don\'t have an account?',
    ge: 'არ გაქვთ ანგარიში?'
  },
  'auth.already_account': {
    ru: 'Уже есть аккаунт?',
    en: 'Already have an account?',
    ge: 'უკვე გაქვთ ანგარიში?'
  },
  'auth.forgot_password': {
    ru: 'Забыли пароль?',
    en: 'Forgot password?',
    ge: 'დაგავიწყდათ პაროლი?'
  },
  'auth.or': {
    ru: 'или',
    en: 'or',
    ge: 'ან'
  },
  'auth.profile': {
    ru: 'Профиль',
    en: 'Profile',
    ge: 'პროფილი'
  },
  'auth.welcome': {
    ru: 'Добро пожаловать',
    en: 'Welcome',
    ge: 'მოგესალმებით'
  },
  
  // Authentication additional translations
  'auth.login_success': {
    ru: 'Вы успешно вошли в систему',
    en: 'You have successfully logged in',
    ge: 'თქვენ წარმატებით შეხვედით სისტემაში'
  },
  'auth.logout_success': {
    ru: 'Вы успешно вышли из системы',
    en: 'You have successfully logged out',
    ge: 'თქვენ წარმატებით გამოხვედით სისტემიდან'
  },
  'auth.signup_success': {
    ru: 'Регистрация успешна',
    en: 'Registration successful',
    ge: 'რეგისტრაცია წარმატებულია'
  },
  'auth.login_failed': {
    ru: 'Ошибка входа',
    en: 'Login failed',
    ge: 'შესვლა ვერ მოხერხდა'
  },
  'auth.signup_failed': {
    ru: 'Ошибка регистрации',
    en: 'Registration failed',
    ge: 'რეგისტრაცია ვერ მოხერხდა'
  },
  'auth.error': {
    ru: 'Ошибка',
    en: 'Error',
    ge: 'შეცდომა'
  },
  'auth.goodbye': {
    ru: 'До свидания',
    en: 'Goodbye',
    ge: 'ნახვამდის'
  },

  // Reviews additional translations
  'reviews.login_required': {
    ru: 'Для оставления отзыва необходимо войти в систему',
    en: 'Login required to leave a review',
    ge: 'მიმოხილვის დასატოვებლად საჭიროა სისტემაში შესვლა'
  },
  
  // About page translations
  'about.title': {
    ru: 'О нас',
    en: 'About',
    ge: 'ჩვენს შესახებ'
  },
  'about.intro': {
    ru: 'Anarchy Store родился из желания бросить вызов нормам традиционных украшений. Мы верим, что аксессуары должны быть такими же бунтарскими и уникальными, как люди, которые их носят.',
    en: 'Anarchy Store was born from a desire to challenge the norms of conventional jewelry. We believe that accessories should be as rebellious and unique as the people who wear them.',
    ge: 'Anarchy Store დაიბადა სურვილით გამოეწვია ტრადიციული სამკაულების ნორმები. ჩვენ გვჯერა, რომ აქსესუარები უნდა იყოს ისეთივე მეამბოხე და უნიკალური, როგორც ადამიანები, რომლებიც მათ ატარებენ.'
  },
  'about.quote': {
    ru: 'Мы не следуем модным трендам. Мы создаем заявления.',
    en: 'We don\'t follow fashion trends. We create statements.',
    ge: 'ჩვენ არ მივყვებით მოდურ ტენდენციებს. ჩვენ ვქმნით განცხადებებს.'
  },
  'about.philosophy_title': {
    ru: 'Наша философия',
    en: 'Our Philosophy',
    ge: 'ჩვენი ფილოსოფია'
  },
  'about.philosophy_text': {
    ru: 'Каждое изделие в нашей коллекции создано для воплощения духа бунтарства и самовыражения. Используя сырые материалы, грубую отделку и смелые дизайны, мы создаем украшения, которые противостоят массовому производству, обычным аксессуарам.',
    en: 'Each piece in our collection is designed to embody the spirit of rebellion and self-expression. Using raw materials, rough finishes, and bold designs, we create jewelry that stands against mass-produced, generic accessories.',
    ge: 'ჩვენი კოლექციის თითოეული ნაწილი შექმნილია იმისთვის, რომ განასახიეროს ამბოხის და თვითგამოხატვის სული. ნედლი მასალების, უხეში დასრულებების და თამამი დიზაინების გამოყენებით, ჩვენ ვქმნით სამკაულებს, რომლებიც უპირისპირდება მასობრივად წარმოებულ, გენერიკულ აქსესუარებს.'
  },
  'about.craftsmanship_title': {
    ru: 'Мастерство',
    en: 'Craftsmanship',
    ge: 'ხელოსნობა'
  },
  'about.craftsmanship_text': {
    ru: 'Наши изделия изготовлены вручную мастерами, которые разделяют наше видение освобождения от условностей. Мы используем высококачественные материалы, включая натуральную кожу, сталь и латунь, чтобы обеспечить долговечность без ущерба для стиля.',
    en: 'Our pieces are handcrafted by artisans who share our vision of breaking free from convention. We use high-quality materials including genuine leather, steel, and brass to ensure durability without compromising on style.',
    ge: 'ჩვენი ნაკეთობები ხელნაკეთია ხელოსნების მიერ, რომლებიც იზიარებენ ჩვენს ხედვას კონვენციისგან თავისუფლების შესახებ. ჩვენ ვიყენებთ მაღალი ხარისხის მასალებს, მათ შორის ნამდვილ ტყავს, ფოლადს და ბრინჯაოს, რათა უზრუნველვყოთ გამძლეობა სტილის კომპრომისის გარეშე.'
  },
  'about.join_title': {
    ru: 'Присоединяйтесь к движению',
    en: 'Join the Movement',
    ge: 'შეუერთდით მოძრაობას'
  },
  'about.join_text': {
    ru: 'Когда вы носите наши украшения, вы не просто носите аксессуар — вы делаете заявление. Вы присоединяетесь к сообществу, которое ценит подлинность выше соответствия и самовыражение выше впечатления.',
    en: 'When you wear our jewelry, you\'re not just wearing an accessory – you\'re making a statement. You\'re joining a community that values authenticity over conformity, and expression over impression.',
    ge: 'როდესაც ატარებთ ჩვენს სამკაულებს, თქვენ არა მხოლოდ აქსესუარს ატარებთ - თქვენ აკეთებთ განცხადებას. თქვენ უერთდებით საზოგადოებას, რომელიც აფასებს ავთენტურობას შესაბამისობაზე მეტად და გამოხატვას შთაბეჭდილებაზე მეტად.'
  },
  
  // Contact page translations
  'contact.title': {
    ru: 'Связаться',
    en: 'Contact',
    ge: 'დაკავშირება'
  },
  'contact.us': {
    ru: 'с нами',
    en: 'Us',
    ge: 'ჩვენთან'
  },
  'contact.get_in_touch': {
    ru: 'Свяжитесь с нами',
    en: 'Get In Touch',
    ge: 'დაგვიკავშირდით'
  },
  'contact.questions': {
    ru: 'Есть вопросы о наших товарах? Хотите сотрудничать? Заполните форму, и мы свяжемся с вами как можно скорее.',
    en: 'Have questions about our products? Want to collaborate? Fill out the form and we\'ll get back to you as soon as possible.',
    ge: 'გაქვთ შეკითხვები ჩვენი პროდუქტების შესახებ? გსურთ თანამშრომლობა? შეავსეთ ფორმა და დაგიკავშირდებით რაც შეიძლება მალე.'
  },
  'contact.first_name': {
    ru: 'Имя',
    en: 'First Name',
    ge: 'სახელი'
  },
  'contact.last_name': {
    ru: 'Фамилия',
    en: 'Last Name',
    ge: 'გვარი'
  },
  'contact.email': {
    ru: 'Электронная почта',
    en: 'Email Address',
    ge: 'ელ.ფოსტა'
  },
  'contact.message': {
    ru: 'Сообщение',
    en: 'Message',
    ge: 'შეტყობინება'
  },
  'contact.first_name_placeholder': {
    ru: 'Введите ваше имя',
    en: 'Enter your first name',
    ge: 'შეიყვანეთ თქვენი სახელი'
  },
  'contact.last_name_placeholder': {
    ru: 'Введите вашу фамилию',
    en: 'Enter your last name',
    ge: 'შეიყვანეთ თქვენი გვარი'
  },
  'contact.email_placeholder': {
    ru: 'example@email.com',
    en: 'example@email.com',
    ge: 'example@email.com'
  },
  'contact.message_placeholder': {
    ru: 'Чем мы можем помочь?',
    en: 'How can we help you?',
    ge: 'როგორ შეგვიძლია დაგეხმაროთ?'
  },
  'contact.send_message': {
    ru: 'Отправить сообщение',
    en: 'Send Message',
    ge: 'შეტყობინების გაგზავნა'
  },
  'contact.message_sent': {
    ru: 'Сообщение отправлено',
    en: 'Message sent',
    ge: 'შეტყობინება გაგზავნილია'
  },
  'contact.message_received': {
    ru: 'Мы получили ваше сообщение и свяжемся с вами в ближайшее время.',
    en: 'We\'ve received your message and will get back to you soon.',
    ge: 'ჩვენ მივიღეთ თქვენი შეტყობინება და მალე დაგიკავშირდებით.'
  },
  product: {
    details: {
      material: {
        ru: 'Материал',
        en: 'Material',
        ge: 'მასალა'
      },
      stainless_steel: {
        ru: 'Нержавеющая сталь',
        en: 'Stainless Steel',
        ge: 'უჟანგავი ფოლადი'
      },
      chain_length: {
        ru: 'Длина цепочки',
        en: 'Chain Length',
        ge: 'ჯაჭვის სიგრძე'
      },
      pendant_size: {
        ru: 'Размер подвески',
        en: 'Pendant Size',
        ge: 'გულსაკიდის ზომა'
      },
      in_stock: {
        ru: 'В наличии',
        en: 'In Stock',
        ge: 'მარაგშია'
      },
      pieces: {
        ru: 'шт.',
        en: 'pcs',
        ge: 'ც.'
      },
      cm: {
        ru: 'см',
        en: 'cm',
        ge: 'სმ'
      }
    }
  },

  // Profile page translations
  'profile.purchases': {
    ru: 'Покупки',
    en: 'Purchases',
    ge: 'შესყიდვები'
  },
  'profile.reviews': {
    ru: 'Отзывы',
    en: 'Reviews',
    ge: 'მიმოხილვები'
  },
  'profile.pending_reviews': {
    ru: 'Ожидающие отзыва',
    en: 'Pending Reviews',
    ge: 'მოლოდინში მიმოხილვები'
  },
  'profile.purchase_history': {
    ru: 'История покупок',
    en: 'Purchase History',
    ge: 'შესყიდვების ისტორია'
  },
  'profile.your_reviews': {
    ru: 'Ваши отзывы',
    en: 'Your Reviews',
    ge: 'თქვენი მიმოხილვები'
  },
  'profile.products_awaiting_review': {
    ru: 'Товары, ожидающие отзыва',
    en: 'Products Awaiting Review',
    ge: 'პროდუქტები მიმოხილვის მოლოდინში'
  },
  'profile.no_purchases': {
    ru: 'У вас пока нет покупок',
    en: 'You have no purchases yet',
    ge: 'თქვენ ჯერ არ გაქვთ შესყიდვები'
  },
  'profile.no_reviews': {
    ru: 'Вы еще не оставили отзывов',
    en: 'You haven\'t left any reviews yet',
    ge: 'თქვენ ჯერ არ დაგიტოვებიათ მიმოხილვები'
  },
  'profile.no_pending_reviews': {
    ru: 'Нет товаров, ожидающих отзыва',
    en: 'No products awaiting review',
    ge: 'არ არის პროდუქტები მიმოხილვის მოლოდინში'
  }
};

const resources = {
  ru: {
    translation: translations
  },
  en: {
    translation: translations
  },
  ge: {
    translation: translations
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru', // русский как язык по умолчанию
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
