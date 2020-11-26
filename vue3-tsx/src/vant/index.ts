import { App } from 'vue';
import {
  Button,
  SwipeCell,
  Dialog,
  Toast,
  Field,
  Divider,
  Popup,
  DatetimePicker,
  Calendar,
  Rate,
  Icon,
  ActionSheet,
  Skeleton,
  Empty
} from "vant";
import 'vant/lib/index.css';

export default {
  install(app: App) {
    app.use(Button);
    app.use(SwipeCell);
    app.use(Dialog);
    app.use(Toast);
    app.use(Field);
    app.use(Divider);
    app.use(Popup);
    app.use(DatetimePicker);
    app.use(Calendar);
    app.use(Rate);
    app.use(Icon);
    app.use(ActionSheet);
    app.use(Skeleton);
    app.use(Empty);
  }
}