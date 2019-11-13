
import axios from 'axios';
const domain = "http://localhost:8080";

const API_LIST = {
  list : {
    method : "get",
    url : domain + "/list"
  }
}

async function request(key, param={}) {
  let {method, url} = API_LIST[key];
  
  const keys = Object.keys(param);
  for(let i=0;i<keys.length;i++) {
    url = url.replace(":" + keys[i], param[keys[i]])
  }

  let res = '';
  if (method == 'get') {
    res = await axios.get(url);
  }
  console.log(res);
  if (!res.status) {
    alert(res.data.message);
  }

  return res.data;
}

const API = {
  request : request
}
export default API;