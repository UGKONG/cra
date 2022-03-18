import axios from "axios";
import { APIBaseURL } from '~/static';

export default axios.create({
  baseURL: APIBaseURL,
  timeout: 10000
});
