import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import { createAuth0 } from "@auth0/auth0-vue";
import router from "./router";
import store from "./store";


const app = createApp(App).use(store);
app.use(
  createAuth0({
    domain: "dev-603ry3fk1jddplf5.us.auth0.com",
    clientId: "SpFK5gEDv8bnziFvVY4msyA1eh4WYRQL",
    authorizationParams: {
      redirect_uri: window.location.origin,
      audience: "http://localhost:3000",
    }
  })
);



app.use(router);
app.use(store);

app.mount("#app");
