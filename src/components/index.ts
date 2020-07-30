import Button from "./Button";
import Container from "./Container";

export default {
  install(app) {
    console.log(app, Button)
    
    app.component("EButton", Button);
    app.component("EContainer", Container);
  }
}