import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import configs from "./configs.json";
import { includes } from "lodash";

const hostName = window.location.hostname;

const hostsProduction = ["blank-project-367115.web.app"];

const currentEnvironment = includes(hostsProduction, hostName)
  ? "production"
  : "development";

const currentConfig = configs[currentEnvironment];

firebase.initializeApp(currentConfig.firebaseApp);

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

const buckets = {
  default: storage,
};

Object.keys(currentConfig.buckets).forEach((bucketKey) => {
  buckets[bucketKey] = firebase.app().storage(currentConfig.buckets[bucketKey]);
});

const common = configs.common;
const contactData = configs.common.contactData;

const { version } = currentConfig;

console.log(currentEnvironment, ":", version);

const imageResizes = [];

export {
  currentConfig,
  firebase,
  version,
  common,
  contactData,
  auth,
  firestore,
  imageResizes,
  buckets,
};
