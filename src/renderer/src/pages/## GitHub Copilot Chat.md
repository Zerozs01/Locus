## GitHub Copilot Chat

- Extension: 0.48.0 (prod)
- VS Code: 1.120.0 (0958016b2af9f09bb4257e0df4a95e2f90590f9f)
- OS: win32 10.0.26220 x64
- GitHub Account: z0nary

## Network

User Settings:
```json
  "http.systemCertificatesNode": true,
  "github.copilot.advanced.debug.useElectronFetcher": true,
  "github.copilot.advanced.debug.useNodeFetcher": false,
  "github.copilot.advanced.debug.useNodeFetchFetcher": true
```

Connecting to https://api.github.com:
- DNS ipv4 Lookup: 20.205.243.168 (3 ms)
- DNS ipv6 Lookup: Error (9 ms): getaddrinfo ENOTFOUND api.github.com
- Proxy URL: None (1 ms)
- Electron fetch (configured): Error (5 ms): Error: net::ERR_NETWORK_ACCESS_DENIED
    at SimpleURLLoaderWrapper.<anonymous> (node:electron/js2c/utility_init:2:10684)
    at SimpleURLLoaderWrapper.emit (node:events:519:28)
    at SimpleURLLoaderWrapper.emit (node:domain:489:12)
    at SimpleURLLoaderWrapper.topLevelDomainCallback (node:domain:161:15)
    at SimpleURLLoaderWrapper.callbackTrampoline (node:internal/async_hooks:128:24)
  {"is_request_error":true,"network_process_crashed":false}
- Node.js https: Error (23 ms): Error: connect EACCES 20.205.243.168:443
    at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1637:16)
    at TCPConnectWrap.callbackTrampoline (node:internal/async_hooks:130:17)
- Node.js fetch: Error (66 ms): TypeError: fetch failed
    at node:internal/deps/undici/undici:14902:13
    at processTicksAndRejections (node:internal/process/task_queues:103:5)
    at n._fetch (c:\Program Files\Microsoft VS Code\0958016b2a\resources\app\extensions\copilot\dist\extension.js:5486:5229)
    at n.fetch (c:\Program Files\Microsoft VS Code\0958016b2a\resources\app\extensions\copilot\dist\extension.js:5486:4541)
    at u (c:\Program Files\Microsoft VS Code\0958016b2a\resources\app\extensions\copilot\dist\extension.js:5518:186)
    at Ig._executeContributedCommand (file:///c:/Program%20Files/Microsoft%20VS%20Code/0958016b2a/resources/app/out/vs/workbench/api/node/extensionHostProcess.js:502:48675)
  Error: connect EACCES 20.205.243.168:443
      at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1637:16)
      at TCPConnectWrap.callbackTrampoline (node:internal/async_hooks:130:17)

Connecting to https://api.githubcopilot.com/_ping:
- DNS ipv4 Lookup: 140.82.112.22 (9 ms)
- DNS ipv6 Lookup: Error (14 ms): getaddrinfo ENOTFOUND api.githubcopilot.com
- Proxy URL: None (16 ms)
- Electron fetch (configured): Error (2 ms): Error: net::ERR_NETWORK_ACCESS_DENIED
    at SimpleURLLoaderWrapper.<anonymous> (node:electron/js2c/utility_init:2:10684)
    at SimpleURLLoaderWrapper.emit (node:events:519:28)
    at SimpleURLLoaderWrapper.emit (node:domain:489:12)
    at SimpleURLLoaderWrapper.topLevelDomainCallback (node:domain:161:15)
    at SimpleURLLoaderWrapper.callbackTrampoline (node:internal/async_hooks:128:24)
  {"is_request_error":true,"network_process_crashed":false}
- Node.js https: Error (19 ms): Error: connect EACCES 140.82.112.22:443
    at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1637:16)
    at TCPConnectWrap.callbackTrampoline (node:internal/async_hooks:130:17)
- Node.js fetch: Error (21 ms): TypeError: fetch failed
    at node:internal/deps/undici/undici:14902:13
    at processTicksAndRejections (node:internal/process/task_queues:103:5)
    at n._fetch (c:\Program Files\Microsoft VS Code\0958016b2a\resources\app\extensions\copilot\dist\extension.js:5486:5229)
    at n.fetch (c:\Program Files\Microsoft VS Code\0958016b2a\resources\app\extensions\copilot\dist\extension.js:5486:4541)
    at u (c:\Program Files\Microsoft VS Code\0958016b2a\resources\app\extensions\copilot\dist\extension.js:5518:186)
    at Ig._executeContributedCommand (file:///c:/Program%20Files/Microsoft%20VS%20Code/0958016b2a/resources/app/out/vs/workbench/api/node/extensionHostProcess.js:502:48675)
  Error: connect EACCES 140.82.112.22:443
      at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1637:16)
      at TCPConnectWrap.callbackTrampoline (node:internal/async_hooks:130:17)

Connecting to https://copilot-proxy.githubusercontent.com/_ping:
- DNS ipv4 Lookup: 52.175.140.176 (12 ms)
- DNS ipv6 Lookup: Error (10 ms): getaddrinfo ENOTFOUND copilot-proxy.githubusercontent.com
- Proxy URL: None (9 ms)
- Electron fetch (configured): Error (10 ms): Error: net::ERR_NETWORK_ACCESS_DENIED
    at SimpleURLLoaderWrapper.<anonymous> (node:electron/js2c/utility_init:2:10684)
    at SimpleURLLoaderWrapper.emit (node:events:519:28)
    at SimpleURLLoaderWrapper.emit (node:domain:489:12)
    at SimpleURLLoaderWrapper.topLevelDomainCallback (node:domain:161:15)
    at SimpleURLLoaderWrapper.callbackTrampoline (node:internal/async_hooks:128:24)
  {"is_request_error":true,"network_process_crashed":false}
- Node.js https: Error (18 ms): Error: connect EACCES 52.175.140.176:443
    at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1637:16)
    at TCPConnectWrap.callbackTrampoline (node:internal/async_hooks:130:17)
- Node.js fetch: Error (25 ms): TypeError: fetch failed
    at node:internal/deps/undici/undici:14902:13
    at processTicksAndRejections (node:internal/process/task_queues:103:5)
    at n._fetch (c:\Program Files\Microsoft VS Code\0958016b2a\resources\app\extensions\copilot\dist\extension.js:5486:5229)
    at n.fetch (c:\Program Files\Microsoft VS Code\0958016b2a\resources\app\extensions\copilot\dist\extension.js:5486:4541)
    at u (c:\Program Files\Microsoft VS Code\0958016b2a\resources\app\extensions\copilot\dist\extension.js:5518:186)
    at Ig._executeContributedCommand (file:///c:/Program%20Files/Microsoft%20VS%20Code/0958016b2a/resources/app/out/vs/workbench/api/node/extensionHostProcess.js:502:48675)
  Error: connect EACCES 52.175.140.176:443
      at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1637:16)
      at TCPConnectWrap.callbackTrampoline (node:internal/async_hooks:130:17)

Connecting to https://mobile.events.data.microsoft.com: Error (1 ms): Error: net::ERR_NETWORK_ACCESS_DENIED
    at SimpleURLLoaderWrapper.<anonymous> (node:electron/js2c/utility_init:2:10684)
    at SimpleURLLoaderWrapper.emit (node:events:519:28)
    at SimpleURLLoaderWrapper.emit (node:domain:489:12)
    at SimpleURLLoaderWrapper.topLevelDomainCallback (node:domain:161:15)
    at SimpleURLLoaderWrapper.callbackTrampoline (node:internal/async_hooks:128:24)
  {"is_request_error":true,"network_process_crashed":false}
Connecting to https://dc.services.visualstudio.com: Error (16 ms): Error: net::ERR_NETWORK_ACCESS_DENIED
    at SimpleURLLoaderWrapper.<anonymous> (node:electron/js2c/utility_init:2:10684)
    at SimpleURLLoaderWrapper.emit (node:events:519:28)
    at SimpleURLLoaderWrapper.emit (node:domain:489:12)
    at SimpleURLLoaderWrapper.topLevelDomainCallback (node:domain:161:15)
    at SimpleURLLoaderWrapper.callbackTrampoline (node:internal/async_hooks:128:24)
  {"is_request_error":true,"network_process_crashed":false}
Connecting to https://copilot-telemetry.githubusercontent.com/_ping: Error (26 ms): Error: connect EACCES 140.82.114.22:443
    at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1637:16)
    at TCPConnectWrap.callbackTrampoline (node:internal/async_hooks:130:17)
Connecting to https://copilot-telemetry.githubusercontent.com/_ping: Error (18 ms): Error: connect EACCES 140.82.114.22:443
    at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1637:16)
    at TCPConnectWrap.callbackTrampoline (node:internal/async_hooks:130:17)
Connecting to https://default.exp-tas.com: Error (26 ms): Error: connect EACCES 13.107.13.93:443
    at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1637:16)
    at TCPConnectWrap.callbackTrampoline (node:internal/async_hooks:130:17)

Number of system certificates: 173

## Documentation

In corporate networks: [Troubleshooting firewall settings for GitHub Copilot](https://docs.github.com/en/copilot/troubleshooting-github-copilot/troubleshooting-firewall-settings-for-github-copilot).