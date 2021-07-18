import axios from "axios";

export function request(config) {
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })
  // 请求 拦截器
  instance.interceptors.request.use(config => {
      return config
    },
    err => {
      return Promise.reject(err)
    }
  );
  // 响应 拦截器
  instance.interceptors.response.use(res => {
      return res.data;
    },
    err => {
      return Promise.reject(err);
    }
  );

  return instance(config)
}
