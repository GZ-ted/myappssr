# myappssr
react16 node ssr小demo，直接使用了express生产的脚手架，对于这个demo部分文件是没用的

## 客户端和服务器端渲染区别

### 客户端
1. npm run build 正常打包 
2. main.js是正常页面入口，直接配置一个服务器（node，nginx）映射到dist目录访问index.html就可以了，像一般的SPA  

**如果不需要ssr，到这里就可以完成了**

### 服务器端渲染ssr
1. 在客户端基础上，增加server.js，目前demo是写死打包js的路径  
2. npm run server 启动server.js，直出入口页面，代替了访问index.html 
3. 打开 http://localhost:3000/
4. 查看`view-source:http://localhost:3000/`，可以看到直出的内容
``````````
<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Hello HomePage</title></head><body><div id="app"><div data-reactroot=""><h3>Home Page!</h3><ul><li>点我看看</li></ul></div></div></body><script type="text/javascript" src="../dist/runtime.js"></script><script type="text/javascript" src="../dist/vendors.js"></script><script type="text/javascript" src="../dist/main.js"></script></html>
``````````
5. 直出后，js代码会继续执行，完成绑定等操作

### react15使用renderToString和renderToStaticMarkup的区别
- renderToString：渲染的结果是带有data-reactid属性的，此时，在服务端的基础上，客户端的render不会重新渲染，只会执行组件componetDidmout中的业务，以及绑定事件等等。
- renderToStaticMarkup：渲染的结果是不带有data-reactid属性的，此时不管服务端有没有渲染，在客户端中都会重新渲染该组件。

### react16 支持 Streaming，使用renderToNodeStream和renderToStaticNodeStream
