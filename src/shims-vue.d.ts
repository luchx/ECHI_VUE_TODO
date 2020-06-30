declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare module "*.less" {
  const less: any;
  export default less;
}