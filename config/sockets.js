/**
 * WebSocket Server Settings
 * (sails.config.sockets)
 *
 * These settings provide transparent access to the options for Sails'
 * encapsulated WebSocket server, as well as some additional Sails-specific
 * configuration layered on top.
 *
 * For more information on sockets configuration, including advanced config options, see:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.sockets.html
 */

module.exports.sockets = {


    /***************************************************************************
     *                                                                          *
     * Node.js (and consequently Sails.js) apps scale horizontally. It's a      *
     * powerful, efficient approach, but it involves a tiny bit of planning. At *
     * scale, you'll want to be able to copy your app onto multiple Sails.js    *
     * servers and throw them behind a load balancer.                           *
     *                                                                          *
     * One of the big challenges of scaling an application is that these sorts  *
     * of clustered deployments cannot share memory, since they are on          *
     * physically different machines. On top of that, there is no guarantee     *
     * that a user will "stick" with the same server between requests (whether  *
     * HTTP or sockets), since the load balancer will route each request to the *
     * Sails server with the most available resources. However that means that  *
     * all room/pubsub/socket processing and shared memory has to be offloaded  *
     * to a shared, remote messaging queue (usually Redis)                      *
     *                                                                          *
     * Luckily, Socket.io (and consequently Sails.js) apps support Redis for    *
     * sockets by default. To enable a remote redis pubsub server, uncomment    *
     * the config below.                                                        *
     *                                                                          *
     * Worth mentioning is that, if `adapter` config is `redis`, but host/port  *
     * is left unset, Sails will try to connect to redis running on localhost   *
     * via port 6379                                                            *
     *      Node.js（因此帆。JS）应用规模水平。这是一个*
     *功能强大、有效的方法，但它涉及到一点点规划。在*
     *规模，你会希望能够复制你的应用到多个sails.js *
     *服务器和负载平衡器后面扔。*
     **
     *一个应用程序的最大挑战是，这些类型*
     *群集部署无法共享内存，因为它们在*
     *物理上不同的机器。在这上面，没有保证*
     *用户将“粘”在请求（无论是*
     * HTTP或插座），由于负载均衡器将每个请求的
     *帆服务器与最可用的资源。然而，这意味着*
     *所有房间/ PubSub /插座处理和共享内存必须卸载*
     *一个共享、远程消息队列（通常使用）*
     **
     “幸运的是，socket.io（因此帆。JS）的应用程序支持使用*
     默认的套接字。为了使远程Redis PubSub服务器，取消*
     *下面的配置。*
     **
     *值得一提的是，如果`适配器`配置是` redis `，但主机/端口*
     *左设置，帆将尝试连接到本地主机上运行redis *
     *通过端口6379                                                                    *
     ***************************************************************************/
    // adapter: 'memory',

    //
    // -OR-
    //

    // adapter: 'redis',
    // host: '127.0.0.1',
    // port: 6379,
    // db: 'sails',
    // pass: '<redis auth password>',


    /***************************************************************************
     *                                                                          *
     * Whether to expose a 'get /__getcookie' route with CORS support that sets *
     * a cookie (this is used by the sails.io.js socket client to get access to *
     * a 3rd party cookie and to enable sessions).                              *
     *                                                                          *
     * Warning: Currently in this scenario, CORS settings apply to interpreted  *
     * requests sent via a socket.io connection that used this cookie to        *
     * connect, even for non-browser clients! (e.g. iOS apps, toasters, node.js *
     * unit tests)                                                              *
     *是否暴露到/ __getcookie与CORS支持设置路线
     *一个cookie（这是由sails.io.js socket客户端用来获得*
     *一个第三方的饼干和使会议）。*
     **
     *警告：目前在这种情况下，系统的设置应用于解释*
     *通过使用该cookie * socket.io连接发送请求
     *连接，即使是非浏览器客户端！（例如iOS应用，烤面包机，Node.js *
     *单元测试）                                                  *
     ***************************************************************************/

    // grant3rdPartyCookie: true,


    /***************************************************************************
     *                                                                          *
     * `beforeConnect`                                                          *
     *                                                                          *
     * This custom beforeConnect function will be run each time BEFORE a new    *
     * socket is allowed to connect, when the initial socket.io handshake is    *
     * performed with the server.                                               *
     *                                                                          *
     * By default, when a socket tries to connect, Sails allows it, every time. *
     * (much in the same way any HTTP request is allowed to reach your routes.  *
     * If no valid cookie was sent, a temporary session will be created for the *
     * connecting socket.                                                       *
     *                                                                          *
     * If the cookie sent as part of the connection request doesn't match any   *
     * known user session, a new user session is created for it.                *
     *                                                                          *
     * In most cases, the user would already have a cookie since they loaded    *
     * the socket.io client and the initial HTML page you're building.         *
     *                                                                          *
     * However, in the case of cross-domain requests, it is possible to receive *
     * a connection upgrade request WITHOUT A COOKIE (for certain transports)   *
     * In this case, there is no way to keep track of the requesting user       *
     * between requests, since there is no identifying information to link      *
     * him/her with a session. The sails.io.js client solves this by connecting *
     * to a CORS/jsonp endpoint first to get a 3rd party cookie(fortunately this*
     * works, even in Safari), then opening the connection.                     *
     *                                                                          *
     * You can also pass along a ?cookie query parameter to the upgrade url,    *
     * which Sails will use in the absence of a proper cookie e.g. (when        *
     * connecting from the client):                                             *
     * io.sails.connect('http://localhost:1337?cookie=smokeybear')              *
     *                                                                          *
     * Finally note that the user's cookie is NOT (and will never be) accessible*
     * from client-side javascript. Using HTTP-only cookies is crucial for your *
     * app's security.                                                          *
     *                         ` beforeconnect ` *
     **
     *这一习俗beforeconnect功能将每一次新的之前
     *插座允许连接，初始socket.io握手时*
     *与服务器执行。*
     **
     *默认情况下，当一个套接字尝试连接时，允许它，每次。*
     *（同样地任何HTTP请求允许达到你的路线。*
     *如果没有有效的饼干被发送，将为*
     *连接插座。*
     **
     *如果作为连接请求的一部分发送的饼干不匹配任何*
     *已知用户会话，为它创建一个新的用户会话。*
     **
     *在大多数情况下，用户已经有一个饼干，因为他们加载*
     * socket.io客户端和最初的HTML页面你的建筑。*
     **
     然而，在跨域请求的情况下，可以接收*
     *一个连接升级请求没有一个“饼干”（某些传输）*
     *在这种情况下，有没有办法跟踪请求用户* *
     *之间的请求，因为没有确定信息链接*
     *他/她有一个会议。解决了这个问题的sails.io.js客户端连接*
     *一个CORS / JSONP端点的第一到第三方Cookie（幸运的是这个
     *作品，甚至在Safari浏览器），然后打开连接。*
     **
     *你也可以通过一个？饼干查询参数的升级网址，*
     *在没有适当的饼干的情况下，该帆将使用，例如：*
     *从客户端连接）：*
     * IO。帆。连接（'http：/ /本地：1337？饼干= smokeybear '）*
     **
     *最后注意到用户的饼干是不是（而且永远不会）访问*
     *客户端JavaScript。使用HTTP只饼干你*是至关重要的
     *应用程序的安全。                                                 *
     ***************************************************************************/
    // beforeConnect: function(handshake, cb) {
    //   // `true` allows the connection
    //   return cb(null, true);
    //
    //   // (`false` would reject the connection)
    // },


    /***************************************************************************
     *                                                                          *
     * `afterDisconnect`                                                        *
     *                                                                          *
     * This custom afterDisconnect function will be run each time a socket      *
     * disconnects                                                              *
     *                 * ` ` afterdisconnect
     * *
     *这afterdisconnect自定义函数将在每次运行套接字
     * disconnects                                                         *
     ***************************************************************************/
    // afterDisconnect: function(session, socket, cb) {
    //   // By default: do nothing.
    //   return cb();
    // },

    /***************************************************************************
     *                                                                          *
     * `transports`                                                             *
     *                                                                          *
     * A array of allowed transport methods which the clients will try to use.  *
     * On server environments that don't support sticky sessions, the "polling" *
     * transport should be disabled.                                            *
     *                 运输*
     **
     *一个允许客户机将尝试使用的传输方法的数组。*
     *在不支持粘性会话的服务器环境中，“轮询”*
     *运输应禁用。                                                         *
     ***************************************************************************/
    // transports: ["polling", "websocket"]

};
