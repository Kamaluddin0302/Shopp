import axios from "axios";
import ENV from "../env/env";
axios.defaults.baseURL = ENV.BASE_URL;
