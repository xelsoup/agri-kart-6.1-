// Sample product data
const products = [
  {
    id: "1",
    name: "Organic Rice",
    price: 250,
    image: "https://placeholder.pics/svg/300",
    category: "Grains",
    certification: ["Organic"],
    description:
      "Premium organic rice grown using traditional farming methods. Free from harmful chemicals and pesticides. Perfect for everyday meals.",
    stock: 50,
    seller: "Green Fields Farm",
    origin: "Isabela, Philippines",
  },
  {
    id: "2",
    name: "Fresh Mangoes",
    price: 120,
    image: "https://placeholder.pics/svg/300",
    category: "Fruits",
    certification: ["Pesticide Free"],
    description:
      "Sweet and juicy mangoes harvested at peak ripeness. These mangoes are grown without the use of harmful pesticides, ensuring a healthy and delicious treat.",
    stock: 30,
    seller: "Tropical Harvest",
    origin: "Guimaras, Philippines",
  },
  {
    id: "3",
    name: "Tomatoes",
    price: 80,
    image: "https://placeholder.pics/svg/300",
    category: "Vegetables",
    certification: ["Non-GMO"],
    description:
      "Fresh, ripe tomatoes perfect for salads, sauces, or cooking. These non-GMO tomatoes are grown with care to ensure the best flavor and nutritional value.",
    stock: 45,
    seller: "Valley Fresh Farms",
    origin: "Batangas, Philippines",
  },
  {
    id: "4",
    name: "Organic Bananas",
    price: 60,
    image: "https://placeholder.pics/svg/300",
    category: "Fruits",
    certification: ["Organic", "Fair Trade"],
    description:
      "Naturally sweet organic bananas grown using sustainable farming practices. These fair trade bananas support local farmers and communities.",
    stock: 60,
    seller: "Eco Harvest Cooperative",
    origin: "Davao, Philippines",
  },
  {
    id: "5",
    name: "Sweet Potatoes",
    price: 75,
    image: "https://placeholder.pics/svg/300",
    category: "Vegetables",
    description:
      "Nutritious sweet potatoes rich in vitamins and minerals. These versatile root vegetables can be baked, mashed, or fried for a delicious and healthy addition to any meal.",
    stock: 40,
    seller: "Highland Farms",
    origin: "Benguet, Philippines",
  },
  {
    id: "6",
    name: "Brown Rice",
    price: 220,
    image: "https://placeholder.pics/svg/300",
    category: "Grains",
    description:
      "Wholesome brown rice that retains its bran layer for added fiber and nutrients. A healthier alternative to white rice for your everyday meals.",
    stock: 55,
    seller: "Healthy Harvest Co.",
    origin: "Nueva Ecija, Philippines",
  },
  {
    id: "7",
    name: "Fresh Coconuts",
    price: 45,
    image: "https://placeholder.pics/svg/300",
    category: "Fruits",
    description:
      "Young, fresh coconuts with sweet water and soft meat. Perfect for refreshing drinks or as a healthy snack.",
    stock: 35,
    seller: "Tropical Paradise Farms",
    origin: "Quezon, Philippines",
  },
  {
    id: "8",
    name: "Organic Lettuce",
    price: 90,
    image: "https://placeholder.pics/svg/300",
    category: "Vegetables",
    certification: ["Organic"],
    description: "Crisp and fresh organic lettuce grown in controlled environments. Perfect for salads and sandwiches.",
    stock: 25,
    seller: "Green Leaf Gardens",
    origin: "Laguna, Philippines",
  },
  {
    id: "9",
    name: "White Corn",
    price: 65,
    image: "https://placeholder.pics/svg/300",
    category: "Grains",
    stock: 0,
    status: "Out of Stock",
    description: "Sweet white corn, perfect for grilling or boiling. A delicious and nutritious addition to any meal.",
    seller: "Sunshine Farms",
    origin: "Bukidnon, Philippines",
  },
  {
    id: "10",
    name: "Avocados",
    price: 150,
    image: "https://placeholder.pics/svg/300",
    category: "Fruits",
    certification: ["Pesticide Free"],
    description: "Creamy and nutritious avocados, perfect for guacamole, salads, or as a spread on toast.",
    stock: 20,
    seller: "Green Valley Farms",
    origin: "Cavite, Philippines",
  },
  {
    id: "11",
    name: "Carrots",
    price: 55,
    image: "https://placeholder.pics/svg/300",
    category: "Vegetables",
    certification: ["Organic"],
    description:
      "Sweet and crunchy carrots, rich in vitamins and antioxidants. Great for snacking, cooking, or juicing.",
    stock: 65,
    seller: "Organic Roots Farm",
    origin: "Benguet, Philippines",
  },
  {
    id: "12",
    name: "Black Rice",
    price: 280,
    image: "https://placeholder.pics/svg/300",
    category: "Grains",
    certification: ["Organic", "Fair Trade"],
    description: "Nutritious black rice with a nutty flavor and chewy texture. Rich in antioxidants and dietary fiber.",
    stock: 30,
    seller: "Heritage Grains Co.",
    origin: "Ifugao, Philippines",
  },
]

// Sample order data
const orders = [
  {
    id: "ORD-001",
    customer: "Juan Dela Cruz",
    date: "2023-05-14",
    total: 750,
    status: "Delivered",
    items: 3,
  },
  {
    id: "ORD-002",
    customer: "Maria Santos",
    date: "2023-05-13",
    total: 420,
    status: "Shipped",
    items: 2,
  },
  {
    id: "ORD-003",
    customer: "Pedro Reyes",
    date: "2023-05-12",
    total: 1250,
    status: "Processing",
    items: 5,
  },
  {
    id: "ORD-004",
    customer: "Ana Gonzales",
    date: "2023-05-11",
    total: 380,
    status: "Delivered",
    items: 2,
  },
  {
    id: "ORD-005",
    customer: "Jose Rizal",
    date: "2023-05-10",
    total: 890,
    status: "Delivered",
    items: 4,
  },
  {
    id: "ORD-006",
    customer: "Sofia Andres",
    date: "2023-05-09",
    total: 560,
    status: "Shipped",
    items: 3,
  },
  {
    id: "ORD-007",
    customer: "Miguel Lopez",
    date: "2023-05-08",
    total: 320,
    status: "Processing",
    items: 1,
  },
  {
    id: "ORD-008",
    customer: "Camila Mendoza",
    date: "2023-05-07",
    total: 1450,
    status: "Delivered",
    items: 6,
  },
]

// Sample shipment data
const shipments = [
  {
    id: "SHP-001",
    orderId: "ORD-001",
    customer: "Juan Dela Cruz",
    destination: "Quezon City, Metro Manila",
    status: "In Transit",
    estimatedDelivery: "2023-05-16",
  },
  {
    id: "SHP-002",
    orderId: "ORD-002",
    customer: "Maria Santos",
    destination: "Makati City, Metro Manila",
    status: "Out for Delivery",
    estimatedDelivery: "2023-05-15",
  },
  {
    id: "SHP-003",
    orderId: "ORD-003",
    customer: "Pedro Reyes",
    destination: "Cebu City, Cebu",
    status: "Processing",
    estimatedDelivery: "2023-05-18",
  },
  {
    id: "SHP-004",
    orderId: "ORD-004",
    customer: "Ana Gonzales",
    destination: "Davao City, Davao",
    status: "Delivered",
    estimatedDelivery: "2023-05-14",
  },
  {
    id: "SHP-005",
    orderId: "ORD-006",
    customer: "Sofia Andres",
    destination: "Iloilo City, Iloilo",
    status: "In Transit",
    estimatedDelivery: "2023-05-17",
  },
]

// Helper function to get product by ID
function getProductById(id) {
  return products.find((product) => product.id === id)
}

// Helper function to filter products
function filterProducts(filters = {}) {
  return products.filter((product) => {
    // Search query filter
    if (filters.searchQuery && !product.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
      return false
    }

    // Price range filter
    if (filters.priceRange && (product.price < filters.priceRange[0] || product.price > filters.priceRange[1])) {
      return false
    }

    // Category filter
    if (filters.categories && filters.categories.length > 0 && !filters.categories.includes(product.category)) {
      return false
    }

    // Certification filter
    if (filters.certifications && filters.certifications.length > 0) {
      if (!product.certification) return false

      const hasCertification = filters.certifications.some((cert) => product.certification.includes(cert))

      if (!hasCertification) return false
    }

    return true
  })
}
