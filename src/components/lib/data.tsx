export const MOCK_PRODUCTS = [
    { id: "1", name: "Rainbow Balloon Arch Kit", description: "A stunning DIY rainbow arch with 120 balloons in vibrant colors. Perfect for birthdays and celebrations!", price: 34.99, image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=400&fit=crop", category: "Balloons", colors: ["Multicolor"], occasions: ["Birthday", "Graduation"], featured: true },
    { id: "2", name: "Gold & White Balloon Garland", description: "Elegant gold and white balloon garland kit with 80 balloons. Great for weddings and anniversaries.", price: 28.99, image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop", category: "Balloons", colors: ["Gold", "White"], occasions: ["Wedding", "Anniversary"], featured: true },
    { id: "3", name: "Princess Party Kit", description: "Complete party kit with plates, cups, napkins, and decorations in a magical princess theme.", price: 45.99, image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&h=400&fit=crop", category: "Party Kits", colors: ["Pink", "Purple"], occasions: ["Birthday"], featured: true },
    { id: "4", name: "Blue Confetti Balloons (Pack of 12)", description: "Transparent balloons filled with blue confetti. Adds sparkle to any celebration!", price: 12.99, image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=400&fit=crop", category: "Balloons", colors: ["Blue"], occasions: ["Baby Shower", "Birthday"] },
    { id: "5", name: "Happy Birthday Banner", description: "Glittering gold happy birthday banner. Reusable and easy to hang.", price: 8.99, image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop", category: "Decorations", colors: ["Gold"], occasions: ["Birthday"] },
    { id: "6", name: "Rose Gold Table Set (24 pcs)", description: "Stylish rose gold plates, cups, and napkins for 8 guests.", price: 19.99, image: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=400&h=400&fit=crop", category: "Tableware", colors: ["Pink", "Gold"], occasions: ["Wedding", "Anniversary", "Birthday"] },
    { id: "7", name: "Giant Number Balloons (0-9)", description: "40-inch foil number balloons in gold. Pick your number!", price: 6.99, image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=400&h=400&fit=crop", category: "Balloons", colors: ["Gold"], occasions: ["Birthday", "Anniversary", "Graduation"] },
    { id: "8", name: "Tropical Party Decorations", description: "Hawaiian-themed decorations with paper flowers, leaves, and pineapple garland.", price: 22.99, image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=400&fit=crop", category: "Decorations", colors: ["Green", "Yellow", "Pink"], occasions: ["Birthday", "Holiday"] },
    { id: "9", name: "Baby Shower Balloon Bundle", description: "Pastel balloon bundle with 'Oh Baby' foil balloon. Gender neutral design.", price: 24.99, image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=400&fit=crop", category: "Balloons", colors: ["Yellow", "Green", "White"], occasions: ["Baby Shower"], featured: true },
    { id: "10", name: "Graduation Cap Balloons (Pack of 6)", description: "Fun graduation cap shaped foil balloons in black and gold.", price: 14.99, image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400&h=400&fit=crop", category: "Balloons", colors: ["Black", "Gold"], occasions: ["Graduation"] },
    { id: "11", name: "Party Photo Props Kit", description: "30-piece photo booth props with hats, glasses, and fun signs.", price: 11.99, image: "https://images.unsplash.com/photo-1496843916299-590492c751f4?w=400&h=400&fit=crop", category: "Accessories", colors: ["Multicolor"], occasions: ["Birthday", "Wedding", "Graduation"] },
    { id: "12", name: "Silver Star Garland", description: "Twinkling silver star garland, 10ft long. Perfect backdrop for photos.", price: 9.99, image: "https://images.unsplash.com/photo-1481162854517-d9e353af153d?w=400&h=400&fit=crop", category: "Decorations", colors: ["Silver"], occasions: ["Birthday", "Holiday", "Anniversary"] },
];

export const CATEGORIES = ["Balloons", "Decorations", "Party Kits", "Tableware", "Accessories"];
export const COLORS = ["Red", "Pink", "Blue", "Yellow", "Green", "Purple", "Gold", "Silver", "White", "Black", "Multicolor"];
export const OCCASIONS = ["Cumpleaños",  "Baby Shower", "Navidad", "Halloween"];

export const BALLOON_TYPES = [
    { name: "Foil Balloons", description: "Shiny & shaped balloons for every occasion", icon: "✨", color: "party-pink" },
    { name: "Latex Balloons", description: "Classic balloons in every color imaginable", icon: "🎈", color: "party-blue" },
    { name: "Number Balloons", description: "Celebrate milestones with giant numbers", icon: "🔢", color: "party-yellow" },
    { name: "Balloon Bouquets", description: "Curated arrangements ready to impress", icon: "💐", color: "party-purple" },
    { name: "Letter Balloons", description: "Spell out any message you want", icon: "🔤", color: "party-green" },
    { name: "Confetti Balloons", description: "Filled with sparkle and fun", icon: "🎊", color: "party-orange" },
];

// Pastel background colors for occasion cards (arbitrary Tailwind/bg values)
    /* Cumpleaños: 'bg-[#99D92B]',
    'Baby Shower': 'bg-[#36B5EB]',
    Navidad: 'bg-[#ff0034]',
    Halloween: 'bg-[#FF7033]'

    */
export const OCCASION_COLORS: Record<string, string> = {
    Cumpleaños: 'bg-[#99D92B] bg-[url(/shop/cumpleanos.png)]  bg-no-repeat bg-bottom bg-size-[250px]',
    'Baby Shower': 'bg-[#36B5EB] bg-[url(/shop/ducha-de-bebe.png)] bg-no-repeat bg-bottom bg-size-[220px]',
    Navidad: 'bg-[#ff0034] bg-[url(/shop/monigote-de-nieve.png)] bg-no-repeat bg-bottom bg-size-[250px]',
    Halloween: 'bg-[#FF7033] bg-[url(/shop/calabaza.png)] bg-no-repeat bg-bottom bg-size-[220px]',
};