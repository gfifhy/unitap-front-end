export default function config() {
  const apiProtocol = 'http://', // Access protocol
        appProtocol = 'http://', 
        apiHost = '127.0.0.1:8000/', // Access host
        appHost = '127.0.0.1:5173/' // Access host

  return { apiProtocol, apiHost, appProtocol, appHost };
}