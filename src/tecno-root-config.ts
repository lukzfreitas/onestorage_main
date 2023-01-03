import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";
// import PubSub from "pubsub-js";
import { HTMLLayoutData } from "single-spa-layout/dist/types/isomorphic/constructRoutes";

// const publish: Function = (event: string, data: any) =>
//   PubSub.publish(event, data);
// const subscribe: Function = (event: string, callback: Function) =>
//   PubSub.subscribe(event, callback());

const data: HTMLLayoutData = {
  props: {
    client: "client",
    bank: "bank",
  },
  loaders: {},
};

const routes = constructRoutes(microfrontendLayout, data);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.map((mfe: any) => {
  registerApplication(mfe);
});

System.import("@tecno/styleguide").then(() => {
  // Activate the layout engine once the styleguide CSS is loaded
  layoutEngine.activate();
  start();
});
