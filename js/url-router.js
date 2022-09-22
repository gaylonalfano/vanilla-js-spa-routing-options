// Controls the URL routing
document.addEventListener("click", (e) => {
  const { target } = e;
  if (!target.matches("nav a")) {
    return;
  }

  e.preventDefault();

  urlRoute();
});

const urlRoutes = {
  404: {
    template: "/templates/404.html",
    title: "",
    description: "",
  },
  "/": {
    template: "/templates/index.html",
    title: "",
    description: "",
  },
  "/about": {
    template: "/templates/about.html",
    title: "",
    description: "",
  },
  "/contact": {
    template: "/templates/contact.html",
    title: "",
    description: "",
  },
};

function urlRoute(event) {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  urlLocationHandler();
}

async function urlLocationHandler() {
  const location = window.location.pathname;
  if (location.length == 0) {
    location = "/";
  }

  // Get the Route object from the urlRoutes variable
  const route = urlRoutes[location] || urlRoutes[404];
  const html = await fetch(route.template).then((response) => response.text());

  // Update our HTML
  document.getElementById("main-content").innerHTML = html;
}

// Add listener for URL changes
window.onpopstate = urlLocationHandler;

// Give global access to our route function
window.route = urlRoute;

// Handle the initial route on page load
urlLocationHandler();
