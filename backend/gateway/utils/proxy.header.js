import proxy from "express-http-proxy";

const proxyWithHeader = (serviceURL) => {
  return proxy(serviceURL, {
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      proxyReqOpts.headers["x-user-id"] = String(srcReq.user.userId);
      return proxyReqOpts;
    },
  });
};

export default proxyWithHeader;
