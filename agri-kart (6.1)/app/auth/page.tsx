<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Agri-Kart Authentication</title>
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Lucide Icons CDN -->
  <script src="https://unpkg.com/lucide@latest"></script>
  <!-- React and ReactDOM CDN -->
  <script src="https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.production.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/react-dom@18.2.0/umd/react-dom.production.min.js"></script>
  <!-- Babel CDN for JSX -->
  <script src="https://cdn.jsdelivr.net/npm/@babel/standalone@7.20.6/Babel.min.js"></script>
  <style>
    body {
      font-family: Arial, sans-serif;
    }
    .tabs-list {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
    }
    .tabs-trigger {
      flex: 1;
      padding: 0.5rem;
      text-align: center;
      cursor: pointer;
      border-bottom: 2px solid transparent;
    }
    .tabs-trigger.active {
      border-bottom: 2px solid #3b82f6;
      font-weight: bold;
    }
    .tabs-content {
      display: none;
    }
    .tabs-content.active {
      display: block;
    }
  </style>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel">
    const { useState } = React;

    function AuthPage() {
      const [userType, setUserType] = useState("buyer");
      const [activeTab, setActiveTab] = useState("login");

      const handleLogin = (e) => {
        e.preventDefault();
        // Simulate API call for login
        const email = e.target.email.value;
        const password = e.target.password.value;
        // In a real app, validate credentials with an API
        alert(`Logging in as ${userType} with email: ${email}`);
        // Simulate navigation
        if (userType === "buyer") {
          window.location.href = "/market.html"; // Replace with actual page or logic
        } else {
          window.location.href = "/dashboard.html"; // Replace with actual page or logic
        }
      };

      const handleSignup = (e) => {
        e.preventDefault();
        // Simulate API call for signup
        const name = e.target.name.value;
        const email = e.target['signup-email'].value;
        const password = e.target['signup-password'].value;
        const confirmPassword = e.target['confirm-password'].value;
        if (password !== confirmPassword) {
          alert("Passwords do not match!");
          return;
        }
        // In a real app, register user with an API
        alert(`Signing up as ${userType} with email: ${email}`);
        // Simulate navigation
        if (userType === "buyer") {
          window.location.href = "/market.html"; // Replace with actual page or logic
        } else {
          window.location.href = "/dashboard.html"; // Replace with actual page or logic
        }
      };

      return (
        <div className="flex min-h-screen flex-col">
          {/* Header */}
          <header className="bg-gray-800 text-white py-4">
            <div className="container mx-auto text-center">
              <h1 className="text-2xl font-bold">Agri-Kart</h1>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1">
            <div className="container mx-auto py-12">
              <div className="mx-auto max-w-md">
                <div className="mb-8 text-center">
                  <h1 className="text-3xl font-bold">Welcome to Agri-Kart</h1>
                  <p className="mt-2 text-gray-500">Sign in to your account or create a new one</p>
                </div>

                {/* User Type Selection */}
                <div className="mb-6">
                  <div className="flex justify-center space-x-4">
                    <button
                      className={`flex-1 py-2 px-4 rounded ${userType === "buyer" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                      onClick={() => setUserType("buyer")}
                    >
                      <i data-lucide="shopping-basket" className="inline-block mr-2"></i>
                      I'm a Buyer
                    </button>
                    <button
                      className={`flex-1 py-2 px-4 rounded ${userType === "seller" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                      onClick={() => setUserType("seller")}
                    >
                      <i data-lucide="tractor" className="inline-block mr-2"></i>
                      I'm a Seller
                    </button>
                  </div>
                  <p className="mt-2 text-center text-sm text-gray-500">
                    {userType === "buyer"
                      ? "Shop for fresh produce directly from farmers"
                      : "Sell your farm products directly to consumers"}
                  </p>
                </div>

                {/* Tabs */}
                <div className="tabs-list">
                  <div
                    className={`tabs-trigger ${activeTab === "login" ? "active" : ""}`}
                    onClick={() => setActiveTab("login")}
                  >
                    Login
                  </div>
                  <div
                    className={`tabs-trigger ${activeTab === "signup" ? "active" : ""}`}
                    onClick={() => setActiveTab("signup")}
                  >
                    Sign Up
                  </div>
                </div>

                {/* Login Form */}
                <div className={`tabs-content ${activeTab === "login" ? "active" : ""}`}>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium">Email</label>
                      <input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        required
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium">Password</label>
                        <a href="#" className="text-xs text-blue-500 hover:underline">Forgot password?</a>
                      </div>
                      <input
                        id="password"
                        type="password"
                        required
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded">
                      Login
                    </button>
                  </form>
                </div>

                {/* Signup Form */}
                <div className={`tabs-content ${activeTab === "signup" ? "active" : ""}`}>
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-medium">Full Name</label>
                      <input
                        id="name"
                        placeholder="John Doe"
                        required
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="signup-email" className="block text-sm font-medium">Email</label>
                      <input
                        id="signup-email"
                        type="email"
                        placeholder="your@email.com"
                        required
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="signup-password" className="block text-sm font-medium">Password</label>
                      <input
                        id="signup-password"
                        type="password"
                        required
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="confirm-password" className="block text-sm font-medium">Confirm Password</label>
                      <input
                        id="confirm-password"
                        type="password"
                        required
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded">
                      Create Account
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto text-center">
              <p>&copy; 2025 Agri-Kart. All rights reserved.</p>
            </div>
          </footer>
        </div>
      );
    }

    // Render the React component
    ReactDOM.render(<AuthPage />, document.getElementById("root"));

    // Initialize Lucide icons
    lucide.createIcons();
  </script>
</body>
</html>