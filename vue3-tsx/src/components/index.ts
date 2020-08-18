import { App } from 'vue';
import Container from "./Container";
import Header from "./Header";
import Content from "./Content";
import Aside from "./Aside";
import Footer from "./Footer";
import Empty from "./Empty";
import TodoCard from "./TodoCard";
import WeekCard from "./WeekCard";
import Button from "./Button";
import CardSkeleton from "./CardSkeleton";
import Toast from "./Toast";

const components = {
  Container,
  Header,
  Content,
  Aside,
  Footer,
  Empty,
  TodoCard,
  WeekCard,
  Button,
  CardSkeleton,
}

export default {
  install(app: App) {
    app.config.globalProperties.$Toast = Toast;
  }
}

