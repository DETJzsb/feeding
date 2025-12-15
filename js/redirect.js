const role = localStorage.getItem("role");

if (!role) {
  window.location.href = "/index.html";
}

const routes = {
  admin: "/admin/index.html",
  directeur: "/directeur/index.html",
  sous_directeur: "/sous-directeur/index.html",
  supervisor: "/supervisor/index.html",
  team_leader: "/team-leader/index.html",
  agent: "/agent/index.html"
};

window.location.href = routes[role];
