// Format currency to Philippine Peso
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(amount)
}

// Cart management
const cart = {
  items: [],

  init() {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        this.items = JSON.parse(savedCart)
      } catch (e) {
        console.error("Failed to parse cart from localStorage")
        this.items = []
      }
    }
    this.updateCartCount()
  },

  addItem(item) {
    const existingItem = this.items.find((i) => i.id === item.id)
    if (existingItem) {
      existingItem.quantity += item.quantity
    } else {
      this.items.push(item)
    }
    this.saveCart()
    this.updateCartCount()

    // Show notification
    showNotification(`Added ${item.name} to cart`)
  },

  removeItem(id) {
    this.items = this.items.filter((item) => item.id !== id)
    this.saveCart()
    this.updateCartCount()
  },

  updateQuantity(id, quantity) {
    const item = this.items.find((item) => item.id === id)
    if (item) {
      item.quantity = Math.max(1, quantity)
      this.saveCart()
      this.updateCartCount()
    }
  },

  clearCart() {
    this.items = []
    localStorage.removeItem("cart")
    this.updateCartCount()
  },

  saveCart() {
    localStorage.setItem("cart", JSON.stringify(this.items))
  },

  getTotalItems() {
    return this.items.reduce((total, item) => total + item.quantity, 0)
  },

  getTotalPrice() {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0)
  },

  updateCartCount() {
    const cartCountElements = document.querySelectorAll(".cart-count")
    const count = this.getTotalItems()

    cartCountElements.forEach((element) => {
      element.textContent = count
      if (count > 0) {
        element.classList.remove("hidden")
      } else {
        element.classList.add("hidden")
      }
    })
  },
}

// Authentication management
const auth = {
  user: null,

  init() {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        this.user = JSON.parse(savedUser)
        this.updateAuthUI()
      } catch (e) {
        console.error("Failed to parse user from localStorage")
      }
    }
  },

  login(email, password, type) {
    // In a real app, you would validate credentials with an API
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = {
          id: Math.random().toString(36).substring(2, 9),
          name: email.split("@")[0],
          email,
          type,
        }

        this.user = newUser
        localStorage.setItem("user", JSON.stringify(newUser))
        this.updateAuthUI()
        resolve(newUser)
      }, 1000)
    })
  },

  signup(name, email, password, type) {
    // In a real app, you would register the user with an API
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = {
          id: Math.random().toString(36).substring(2, 9),
          name,
          email,
          type,
        }

        this.user = newUser
        localStorage.setItem("user", JSON.stringify(newUser))
        this.updateAuthUI()
        resolve(newUser)
      }, 1000)
    })
  },

  logout() {
    this.user = null
    localStorage.removeItem("user")
    this.updateAuthUI()
    window.location.href = "index.html"
  },

  updateAuthUI() {
    const authButtons = document.querySelectorAll(".auth-button")
    const userMenus = document.querySelectorAll(".user-menu")

    if (this.user) {
      authButtons.forEach((button) => {
        button.classList.add("hidden")
      })

      userMenus.forEach((menu) => {
        menu.classList.remove("hidden")
        const nameElement = menu.querySelector(".user-name")
        if (nameElement) {
          nameElement.textContent = this.user.name
        }
      })
    } else {
      authButtons.forEach((button) => {
        button.classList.remove("hidden")
      })

      userMenus.forEach((menu) => {
        menu.classList.add("hidden")
      })
    }
  },

  redirectBasedOnUserType() {
    if (!this.user) return

    if (this.user.type === "buyer") {
      window.location.href = "market.html"
    } else if (this.user.type === "seller") {
      window.location.href = "dashboard.html"
    }
  },

  requireAuth() {
    if (!this.user) {
      window.location.href = "auth.html"
      return false
    }
    return true
  },

  requireSellerAuth() {
    if (!this.user || this.user.type !== "seller") {
      window.location.href = "auth.html"
      return false
    }
    return true
  },

  requireBuyerAuth() {
    if (!this.user || this.user.type !== "buyer") {
      window.location.href = "auth.html"
      return false
    }
    return true
  },
}

// Show notification
function showNotification(message, type = "success") {
  const notification = document.createElement("div")
  notification.className = `fixed bottom-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
    type === "success" ? "bg-primary text-primary-foreground" : "bg-destructive text-destructive-foreground"
  } transition-opacity duration-300`
  notification.textContent = message

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.classList.add("opacity-0")
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}

// Toggle mobile menu
function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobile-menu")
  if (mobileMenu.classList.contains("hidden")) {
    mobileMenu.classList.remove("hidden")
  } else {
    mobileMenu.classList.add("hidden")
  }
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  cart.init()
  auth.init()
})
