(()=>{var e={691:(e,t,n)=>{"use strict";n.r(t)},295:function(e,t,n){var s;s=function(){var e=function(e){var t,n=e.localStorage||(t={},{setItem:function(e,n){t[e]=n},getItem:function(e){return t[e]},removeItem:function(e){delete t[e]}}),s=function(e,t){for(var n in e)if(e.hasOwnProperty(n)){if(!t.hasOwnProperty(n)){var s="Unknown property, "+n+". Valid properties are:";for(var i in t)t.hasOwnProperty(i)&&(s=s+" "+i);throw new Error(s)}if(typeof e[n]!==t[n])throw new Error(c(o.INVALID_TYPE,[typeof e[n],n]))}},i=function(e,t){return function(){return e.apply(t,arguments)}},o={OK:{code:0,text:"AMQJSC0000I OK."},CONNECT_TIMEOUT:{code:1,text:"AMQJSC0001E Connect timed out."},SUBSCRIBE_TIMEOUT:{code:2,text:"AMQJS0002E Subscribe timed out."},UNSUBSCRIBE_TIMEOUT:{code:3,text:"AMQJS0003E Unsubscribe timed out."},PING_TIMEOUT:{code:4,text:"AMQJS0004E Ping timed out."},INTERNAL_ERROR:{code:5,text:"AMQJS0005E Internal error. Error Message: {0}, Stack trace: {1}"},CONNACK_RETURNCODE:{code:6,text:"AMQJS0006E Bad Connack return code:{0} {1}."},SOCKET_ERROR:{code:7,text:"AMQJS0007E Socket error:{0}."},SOCKET_CLOSE:{code:8,text:"AMQJS0008I Socket closed."},MALFORMED_UTF:{code:9,text:"AMQJS0009E Malformed UTF data:{0} {1} {2}."},UNSUPPORTED:{code:10,text:"AMQJS0010E {0} is not supported by this browser."},INVALID_STATE:{code:11,text:"AMQJS0011E Invalid state {0}."},INVALID_TYPE:{code:12,text:"AMQJS0012E Invalid type {0} for {1}."},INVALID_ARGUMENT:{code:13,text:"AMQJS0013E Invalid argument {0} for {1}."},UNSUPPORTED_OPERATION:{code:14,text:"AMQJS0014E Unsupported operation."},INVALID_STORED_DATA:{code:15,text:"AMQJS0015E Invalid data in local storage key={0} value={1}."},INVALID_MQTT_MESSAGE_TYPE:{code:16,text:"AMQJS0016E Invalid MQTT message type {0}."},MALFORMED_UNICODE:{code:17,text:"AMQJS0017E Malformed Unicode string:{0} {1}."},BUFFER_FULL:{code:18,text:"AMQJS0018E Message buffer is full, maximum buffer size: {0}."}},r={0:"Connection Accepted",1:"Connection Refused: unacceptable protocol version",2:"Connection Refused: identifier rejected",3:"Connection Refused: server unavailable",4:"Connection Refused: bad user name or password",5:"Connection Refused: not authorized"},c=function(e,t){var n=e.text;if(t)for(var s,i,o=0;o<t.length;o++)if(s="{"+o+"}",(i=n.indexOf(s))>0){var r=n.substring(0,i),c=n.substring(i+s.length);n=r+t[o]+c}return n},a=[0,6,77,81,73,115,100,112,3],u=[0,4,77,81,84,84,4],h=function(e,t){for(var n in this.type=e,t)t.hasOwnProperty(n)&&(this[n]=t[n])};function d(e,t){var n,s=t,i=e[t],o=i>>4,r=i&=15;t+=1;var c=0,a=1;do{if(t==e.length)return[null,s];c+=(127&(n=e[t++]))*a,a*=128}while(0!=(128&n));var u=t+c;if(u>e.length)return[null,s];var d=new h(o);switch(o){case 2:1&e[t++]&&(d.sessionPresent=!0),d.returnCode=e[t++];break;case 3:var l=r>>1&3,f=p(e,t),g=v(e,t+=2,f);t+=f,l>0&&(d.messageIdentifier=p(e,t),t+=2);var _=new w(e.subarray(t,u));1==(1&r)&&(_.retained=!0),8==(8&r)&&(_.duplicate=!0),_.qos=l,_.destinationName=g,d.payloadMessage=_;break;case 4:case 5:case 6:case 7:case 11:d.messageIdentifier=p(e,t);break;case 9:d.messageIdentifier=p(e,t),t+=2,d.returnCode=e.subarray(t,u)}return[d,u]}function l(e,t,n){return t[n++]=e>>8,t[n++]=e%256,n}function f(e,t,n,s){return _(e,n,s=l(t,n,s)),s+t}function p(e,t){return 256*e[t]+e[t+1]}function g(e){for(var t=0,n=0;n<e.length;n++){var s=e.charCodeAt(n);s>2047?(55296<=s&&s<=56319&&(n++,t++),t+=3):s>127?t+=2:t++}return t}function _(e,t,n){for(var s=n,i=0;i<e.length;i++){var r=e.charCodeAt(i);if(55296<=r&&r<=56319){var a=e.charCodeAt(++i);if(isNaN(a))throw new Error(c(o.MALFORMED_UNICODE,[r,a]));r=a-56320+(r-55296<<10)+65536}r<=127?t[s++]=r:r<=2047?(t[s++]=r>>6&31|192,t[s++]=63&r|128):r<=65535?(t[s++]=r>>12&15|224,t[s++]=r>>6&63|128,t[s++]=63&r|128):(t[s++]=r>>18&7|240,t[s++]=r>>12&63|128,t[s++]=r>>6&63|128,t[s++]=63&r|128)}return t}function v(e,t,n){for(var s,i="",r=t;r<t+n;){var a=e[r++];if(a<128)s=a;else{var u=e[r++]-128;if(u<0)throw new Error(c(o.MALFORMED_UTF,[a.toString(16),u.toString(16),""]));if(a<224)s=64*(a-192)+u;else{var h=e[r++]-128;if(h<0)throw new Error(c(o.MALFORMED_UTF,[a.toString(16),u.toString(16),h.toString(16)]));if(a<240)s=4096*(a-224)+64*u+h;else{var d=e[r++]-128;if(d<0)throw new Error(c(o.MALFORMED_UTF,[a.toString(16),u.toString(16),h.toString(16),d.toString(16)]));if(!(a<248))throw new Error(c(o.MALFORMED_UTF,[a.toString(16),u.toString(16),h.toString(16),d.toString(16)]));s=262144*(a-240)+4096*u+64*h+d}}}s>65535&&(s-=65536,i+=String.fromCharCode(55296+(s>>10)),s=56320+(1023&s)),i+=String.fromCharCode(s)}return i}h.prototype.encode=function(){var e,t=(15&this.type)<<4,n=0,s=[],i=0;switch(void 0!==this.messageIdentifier&&(n+=2),this.type){case 1:switch(this.mqttVersion){case 3:n+=a.length+3;break;case 4:n+=u.length+3}n+=g(this.clientId)+2,void 0!==this.willMessage&&(n+=g(this.willMessage.destinationName)+2,(e=this.willMessage.payloadBytes)instanceof Uint8Array||(e=new Uint8Array(r)),n+=e.byteLength+2),void 0!==this.userName&&(n+=g(this.userName)+2),void 0!==this.password&&(n+=g(this.password)+2);break;case 8:t|=2;for(var o=0;o<this.topics.length;o++)s[o]=g(this.topics[o]),n+=s[o]+2;n+=this.requestedQos.length;break;case 10:for(t|=2,o=0;o<this.topics.length;o++)s[o]=g(this.topics[o]),n+=s[o]+2;break;case 6:t|=2;break;case 3:this.payloadMessage.duplicate&&(t|=8),t=t|=this.payloadMessage.qos<<1,this.payloadMessage.retained&&(t|=1),n+=(i=g(this.payloadMessage.destinationName))+2;var r=this.payloadMessage.payloadBytes;n+=r.byteLength,r instanceof ArrayBuffer?r=new Uint8Array(r):r instanceof Uint8Array||(r=new Uint8Array(r.buffer))}var c=function(e){var t=new Array(1),n=0;do{var s=e%128;(e>>=7)>0&&(s|=128),t[n++]=s}while(e>0&&n<4);return t}(n),h=c.length+1,d=new ArrayBuffer(n+h),p=new Uint8Array(d);if(p[0]=t,p.set(c,1),3==this.type)h=f(this.payloadMessage.destinationName,i,p,h);else if(1==this.type){switch(this.mqttVersion){case 3:p.set(a,h),h+=a.length;break;case 4:p.set(u,h),h+=u.length}var _=0;this.cleanSession&&(_=2),void 0!==this.willMessage&&(_|=4,_|=this.willMessage.qos<<3,this.willMessage.retained&&(_|=32)),void 0!==this.userName&&(_|=128),void 0!==this.password&&(_|=64),p[h++]=_,h=l(this.keepAliveInterval,p,h)}switch(void 0!==this.messageIdentifier&&(h=l(this.messageIdentifier,p,h)),this.type){case 1:h=f(this.clientId,g(this.clientId),p,h),void 0!==this.willMessage&&(h=f(this.willMessage.destinationName,g(this.willMessage.destinationName),p,h),h=l(e.byteLength,p,h),p.set(e,h),h+=e.byteLength),void 0!==this.userName&&(h=f(this.userName,g(this.userName),p,h)),void 0!==this.password&&(h=f(this.password,g(this.password),p,h));break;case 3:p.set(r,h);break;case 8:for(o=0;o<this.topics.length;o++)h=f(this.topics[o],s[o],p,h),p[h++]=this.requestedQos[o];break;case 10:for(o=0;o<this.topics.length;o++)h=f(this.topics[o],s[o],p,h)}return d};var m=function(e,t){this._client=e,this._keepAliveInterval=1e3*t,this.isReset=!1;var n=new h(12).encode(),s=function(e){return function(){return i.apply(e)}},i=function(){this.isReset?(this.isReset=!1,this._client._trace("Pinger.doPing","send PINGREQ"),this._client.socket.send(n),this.timeout=setTimeout(s(this),this._keepAliveInterval)):(this._client._trace("Pinger.doPing","Timed out"),this._client._disconnected(o.PING_TIMEOUT.code,c(o.PING_TIMEOUT)))};this.reset=function(){this.isReset=!0,clearTimeout(this.timeout),this._keepAliveInterval>0&&(this.timeout=setTimeout(s(this),this._keepAliveInterval))},this.cancel=function(){clearTimeout(this.timeout)}},y=function(e,t,n,s){t||(t=30),this.timeout=setTimeout(function(e,t,n){return function(){return e.apply(t,n)}}(n,e,s),1e3*t),this.cancel=function(){clearTimeout(this.timeout)}},I=function(t,s,i,r,a){if(!("WebSocket"in e)||null===e.WebSocket)throw new Error(c(o.UNSUPPORTED,["WebSocket"]));if(!("ArrayBuffer"in e)||null===e.ArrayBuffer)throw new Error(c(o.UNSUPPORTED,["ArrayBuffer"]));for(var u in this._trace("Paho.Client",t,s,i,r,a),this.host=s,this.port=i,this.path=r,this.uri=t,this.clientId=a,this._wsuri=null,this._localKey=s+":"+i+("/mqtt"!=r?":"+r:"")+":"+a+":",this._msg_queue=[],this._buffered_msg_queue=[],this._sentMessages={},this._receivedMessages={},this._notify_msg_sent={},this._message_identifier=1,this._sequence=0,n)0!==u.indexOf("Sent:"+this._localKey)&&0!==u.indexOf("Received:"+this._localKey)||this.restore(u)};I.prototype.host=null,I.prototype.port=null,I.prototype.path=null,I.prototype.uri=null,I.prototype.clientId=null,I.prototype.socket=null,I.prototype.connected=!1,I.prototype.maxMessageIdentifier=65536,I.prototype.connectOptions=null,I.prototype.hostIndex=null,I.prototype.onConnected=null,I.prototype.onConnectionLost=null,I.prototype.onMessageDelivered=null,I.prototype.onMessageArrived=null,I.prototype.traceFunction=null,I.prototype._msg_queue=null,I.prototype._buffered_msg_queue=null,I.prototype._connectTimeout=null,I.prototype.sendPinger=null,I.prototype.receivePinger=null,I.prototype._reconnectInterval=1,I.prototype._reconnecting=!1,I.prototype._reconnectTimeout=null,I.prototype.disconnectedPublishing=!1,I.prototype.disconnectedBufferSize=5e3,I.prototype.receiveBuffer=null,I.prototype._traceBuffer=null,I.prototype._MAX_TRACE_ENTRIES=100,I.prototype.connect=function(e){var t=this._traceMask(e,"password");if(this._trace("Client.connect",t,this.socket,this.connected),this.connected)throw new Error(c(o.INVALID_STATE,["already connected"]));if(this.socket)throw new Error(c(o.INVALID_STATE,["already connected"]));this._reconnecting&&(this._reconnectTimeout.cancel(),this._reconnectTimeout=null,this._reconnecting=!1),this.connectOptions=e,this._reconnectInterval=1,this._reconnecting=!1,e.uris?(this.hostIndex=0,this._doConnect(e.uris[0])):this._doConnect(this.uri)},I.prototype.subscribe=function(e,t){if(this._trace("Client.subscribe",e,t),!this.connected)throw new Error(c(o.INVALID_STATE,["not connected"]));var n=new h(8);n.topics=e.constructor===Array?e:[e],void 0===t.qos&&(t.qos=0),n.requestedQos=[];for(var s=0;s<n.topics.length;s++)n.requestedQos[s]=t.qos;t.onSuccess&&(n.onSuccess=function(e){t.onSuccess({invocationContext:t.invocationContext,grantedQos:e})}),t.onFailure&&(n.onFailure=function(e){t.onFailure({invocationContext:t.invocationContext,errorCode:e,errorMessage:c(e)})}),t.timeout&&(n.timeOut=new y(this,t.timeout,t.onFailure,[{invocationContext:t.invocationContext,errorCode:o.SUBSCRIBE_TIMEOUT.code,errorMessage:c(o.SUBSCRIBE_TIMEOUT)}])),this._requires_ack(n),this._schedule_message(n)},I.prototype.unsubscribe=function(e,t){if(this._trace("Client.unsubscribe",e,t),!this.connected)throw new Error(c(o.INVALID_STATE,["not connected"]));var n=new h(10);n.topics=e.constructor===Array?e:[e],t.onSuccess&&(n.callback=function(){t.onSuccess({invocationContext:t.invocationContext})}),t.timeout&&(n.timeOut=new y(this,t.timeout,t.onFailure,[{invocationContext:t.invocationContext,errorCode:o.UNSUBSCRIBE_TIMEOUT.code,errorMessage:c(o.UNSUBSCRIBE_TIMEOUT)}])),this._requires_ack(n),this._schedule_message(n)},I.prototype.send=function(e){this._trace("Client.send",e);var t=new h(3);if(t.payloadMessage=e,this.connected)e.qos>0?this._requires_ack(t):this.onMessageDelivered&&(this._notify_msg_sent[t]=this.onMessageDelivered(t.payloadMessage)),this._schedule_message(t);else{if(!this._reconnecting||!this.disconnectedPublishing)throw new Error(c(o.INVALID_STATE,["not connected"]));if(Object.keys(this._sentMessages).length+this._buffered_msg_queue.length>this.disconnectedBufferSize)throw new Error(c(o.BUFFER_FULL,[this.disconnectedBufferSize]));e.qos>0?this._requires_ack(t):(t.sequence=++this._sequence,this._buffered_msg_queue.unshift(t))}},I.prototype.disconnect=function(){if(this._trace("Client.disconnect"),this._reconnecting&&(this._reconnectTimeout.cancel(),this._reconnectTimeout=null,this._reconnecting=!1),!this.socket)throw new Error(c(o.INVALID_STATE,["not connecting or connected"]));var e=new h(14);this._notify_msg_sent[e]=i(this._disconnected,this),this._schedule_message(e)},I.prototype.getTraceLog=function(){if(null!==this._traceBuffer){for(var e in this._trace("Client.getTraceLog",new Date),this._trace("Client.getTraceLog in flight messages",this._sentMessages.length),this._sentMessages)this._trace("_sentMessages ",e,this._sentMessages[e]);for(var e in this._receivedMessages)this._trace("_receivedMessages ",e,this._receivedMessages[e]);return this._traceBuffer}},I.prototype.startTrace=function(){null===this._traceBuffer&&(this._traceBuffer=[]),this._trace("Client.startTrace",new Date,"@VERSION@-@BUILDLEVEL@")},I.prototype.stopTrace=function(){delete this._traceBuffer},I.prototype._doConnect=function(e){if(this.connectOptions.useSSL){var t=e.split(":");t[0]="wss",e=t.join(":")}this._wsuri=e,this.connected=!1,this.connectOptions.mqttVersion<4?this.socket=new WebSocket(e,["mqttv3.1"]):this.socket=new WebSocket(e,["mqtt"]),this.socket.binaryType="arraybuffer",this.socket.onopen=i(this._on_socket_open,this),this.socket.onmessage=i(this._on_socket_message,this),this.socket.onerror=i(this._on_socket_error,this),this.socket.onclose=i(this._on_socket_close,this),this.sendPinger=new m(this,this.connectOptions.keepAliveInterval),this.receivePinger=new m(this,this.connectOptions.keepAliveInterval),this._connectTimeout&&(this._connectTimeout.cancel(),this._connectTimeout=null),this._connectTimeout=new y(this,this.connectOptions.timeout,this._disconnected,[o.CONNECT_TIMEOUT.code,c(o.CONNECT_TIMEOUT)])},I.prototype._schedule_message=function(e){this._msg_queue.unshift(e),this.connected&&this._process_queue()},I.prototype.store=function(e,t){var s={type:t.type,messageIdentifier:t.messageIdentifier,version:1};if(3!==t.type)throw Error(c(o.INVALID_STORED_DATA,[e+this._localKey+t.messageIdentifier,s]));t.pubRecReceived&&(s.pubRecReceived=!0),s.payloadMessage={};for(var i="",r=t.payloadMessage.payloadBytes,a=0;a<r.length;a++)r[a]<=15?i=i+"0"+r[a].toString(16):i+=r[a].toString(16);s.payloadMessage.payloadHex=i,s.payloadMessage.qos=t.payloadMessage.qos,s.payloadMessage.destinationName=t.payloadMessage.destinationName,t.payloadMessage.duplicate&&(s.payloadMessage.duplicate=!0),t.payloadMessage.retained&&(s.payloadMessage.retained=!0),0===e.indexOf("Sent:")&&(void 0===t.sequence&&(t.sequence=++this._sequence),s.sequence=t.sequence),n.setItem(e+this._localKey+t.messageIdentifier,JSON.stringify(s))},I.prototype.restore=function(e){var t=n.getItem(e),s=JSON.parse(t),i=new h(s.type,s);if(3!==s.type)throw Error(c(o.INVALID_STORED_DATA,[e,t]));for(var r=s.payloadMessage.payloadHex,a=new ArrayBuffer(r.length/2),u=new Uint8Array(a),d=0;r.length>=2;){var l=parseInt(r.substring(0,2),16);r=r.substring(2,r.length),u[d++]=l}var f=new w(u);f.qos=s.payloadMessage.qos,f.destinationName=s.payloadMessage.destinationName,s.payloadMessage.duplicate&&(f.duplicate=!0),s.payloadMessage.retained&&(f.retained=!0),i.payloadMessage=f,0===e.indexOf("Sent:"+this._localKey)?(i.payloadMessage.duplicate=!0,this._sentMessages[i.messageIdentifier]=i):0===e.indexOf("Received:"+this._localKey)&&(this._receivedMessages[i.messageIdentifier]=i)},I.prototype._process_queue=function(){for(var e=null;e=this._msg_queue.pop();)this._socket_send(e),this._notify_msg_sent[e]&&(this._notify_msg_sent[e](),delete this._notify_msg_sent[e])},I.prototype._requires_ack=function(e){var t=Object.keys(this._sentMessages).length;if(t>this.maxMessageIdentifier)throw Error("Too many messages:"+t);for(;void 0!==this._sentMessages[this._message_identifier];)this._message_identifier++;e.messageIdentifier=this._message_identifier,this._sentMessages[e.messageIdentifier]=e,3===e.type&&this.store("Sent:",e),this._message_identifier===this.maxMessageIdentifier&&(this._message_identifier=1)},I.prototype._on_socket_open=function(){var e=new h(1,this.connectOptions);e.clientId=this.clientId,this._socket_send(e)},I.prototype._on_socket_message=function(e){this._trace("Client._on_socket_message",e.data);for(var t=this._deframeMessages(e.data),n=0;n<t.length;n+=1)this._handleMessage(t[n])},I.prototype._deframeMessages=function(e){var t=new Uint8Array(e),n=[];if(this.receiveBuffer){var s=new Uint8Array(this.receiveBuffer.length+t.length);s.set(this.receiveBuffer),s.set(t,this.receiveBuffer.length),t=s,delete this.receiveBuffer}try{for(var i=0;i<t.length;){var r=d(t,i),a=r[0];if(i=r[1],null===a)break;n.push(a)}i<t.length&&(this.receiveBuffer=t.subarray(i))}catch(e){var u="undefined"==e.hasOwnProperty("stack")?e.stack.toString():"No Error Stack Available";return void this._disconnected(o.INTERNAL_ERROR.code,c(o.INTERNAL_ERROR,[e.message,u]))}return n},I.prototype._handleMessage=function(e){this._trace("Client._handleMessage",e);try{switch(e.type){case 2:if(this._connectTimeout.cancel(),this._reconnectTimeout&&this._reconnectTimeout.cancel(),this.connectOptions.cleanSession){for(var t in this._sentMessages){var s=this._sentMessages[t];n.removeItem("Sent:"+this._localKey+s.messageIdentifier)}for(var t in this._sentMessages={},this._receivedMessages){var i=this._receivedMessages[t];n.removeItem("Received:"+this._localKey+i.messageIdentifier)}this._receivedMessages={}}if(0!==e.returnCode){this._disconnected(o.CONNACK_RETURNCODE.code,c(o.CONNACK_RETURNCODE,[e.returnCode,r[e.returnCode]]));break}this.connected=!0,this.connectOptions.uris&&(this.hostIndex=this.connectOptions.uris.length);var a=[];for(var u in this._sentMessages)this._sentMessages.hasOwnProperty(u)&&a.push(this._sentMessages[u]);if(this._buffered_msg_queue.length>0)for(var d=null;d=this._buffered_msg_queue.pop();)a.push(d),this.onMessageDelivered&&(this._notify_msg_sent[d]=this.onMessageDelivered(d.payloadMessage));a=a.sort((function(e,t){return e.sequence-t.sequence}));for(var l=0,f=a.length;l<f;l++)if(3==(s=a[l]).type&&s.pubRecReceived){var p=new h(6,{messageIdentifier:s.messageIdentifier});this._schedule_message(p)}else this._schedule_message(s);this.connectOptions.onSuccess&&this.connectOptions.onSuccess({invocationContext:this.connectOptions.invocationContext});var g=!1;this._reconnecting&&(g=!0,this._reconnectInterval=1,this._reconnecting=!1),this._connected(g,this._wsuri),this._process_queue();break;case 3:this._receivePublish(e);break;case 4:(s=this._sentMessages[e.messageIdentifier])&&(delete this._sentMessages[e.messageIdentifier],n.removeItem("Sent:"+this._localKey+e.messageIdentifier),this.onMessageDelivered&&this.onMessageDelivered(s.payloadMessage));break;case 5:(s=this._sentMessages[e.messageIdentifier])&&(s.pubRecReceived=!0,p=new h(6,{messageIdentifier:e.messageIdentifier}),this.store("Sent:",s),this._schedule_message(p));break;case 6:i=this._receivedMessages[e.messageIdentifier],n.removeItem("Received:"+this._localKey+e.messageIdentifier),i&&(this._receiveMessage(i),delete this._receivedMessages[e.messageIdentifier]);var _=new h(7,{messageIdentifier:e.messageIdentifier});this._schedule_message(_);break;case 7:s=this._sentMessages[e.messageIdentifier],delete this._sentMessages[e.messageIdentifier],n.removeItem("Sent:"+this._localKey+e.messageIdentifier),this.onMessageDelivered&&this.onMessageDelivered(s.payloadMessage);break;case 9:(s=this._sentMessages[e.messageIdentifier])&&(s.timeOut&&s.timeOut.cancel(),128===e.returnCode[0]?s.onFailure&&s.onFailure(e.returnCode):s.onSuccess&&s.onSuccess(e.returnCode),delete this._sentMessages[e.messageIdentifier]);break;case 11:(s=this._sentMessages[e.messageIdentifier])&&(s.timeOut&&s.timeOut.cancel(),s.callback&&s.callback(),delete this._sentMessages[e.messageIdentifier]);break;case 13:this.sendPinger.reset();break;default:this._disconnected(o.INVALID_MQTT_MESSAGE_TYPE.code,c(o.INVALID_MQTT_MESSAGE_TYPE,[e.type]))}}catch(e){var v="undefined"==e.hasOwnProperty("stack")?e.stack.toString():"No Error Stack Available";return void this._disconnected(o.INTERNAL_ERROR.code,c(o.INTERNAL_ERROR,[e.message,v]))}},I.prototype._on_socket_error=function(e){this._reconnecting||this._disconnected(o.SOCKET_ERROR.code,c(o.SOCKET_ERROR,[e.data]))},I.prototype._on_socket_close=function(){this._reconnecting||this._disconnected(o.SOCKET_CLOSE.code,c(o.SOCKET_CLOSE))},I.prototype._socket_send=function(e){if(1==e.type){var t=this._traceMask(e,"password");this._trace("Client._socket_send",t)}else this._trace("Client._socket_send",e);this.socket.send(e.encode()),this.sendPinger.reset()},I.prototype._receivePublish=function(e){switch(e.payloadMessage.qos){case"undefined":case 0:this._receiveMessage(e);break;case 1:var t=new h(4,{messageIdentifier:e.messageIdentifier});this._schedule_message(t),this._receiveMessage(e);break;case 2:this._receivedMessages[e.messageIdentifier]=e,this.store("Received:",e);var n=new h(5,{messageIdentifier:e.messageIdentifier});this._schedule_message(n);break;default:throw Error("Invaild qos="+e.payloadMessage.qos)}},I.prototype._receiveMessage=function(e){this.onMessageArrived&&this.onMessageArrived(e.payloadMessage)},I.prototype._connected=function(e,t){this.onConnected&&this.onConnected(e,t)},I.prototype._reconnect=function(){this._trace("Client._reconnect"),this.connected||(this._reconnecting=!0,this.sendPinger.cancel(),this.receivePinger.cancel(),this._reconnectInterval<128&&(this._reconnectInterval=2*this._reconnectInterval),this.connectOptions.uris?(this.hostIndex=0,this._doConnect(this.connectOptions.uris[0])):this._doConnect(this.uri))},I.prototype._disconnected=function(e,t){if(this._trace("Client._disconnected",e,t),void 0!==e&&this._reconnecting)this._reconnectTimeout=new y(this,this._reconnectInterval,this._reconnect);else if(this.sendPinger.cancel(),this.receivePinger.cancel(),this._connectTimeout&&(this._connectTimeout.cancel(),this._connectTimeout=null),this._msg_queue=[],this._buffered_msg_queue=[],this._notify_msg_sent={},this.socket&&(this.socket.onopen=null,this.socket.onmessage=null,this.socket.onerror=null,this.socket.onclose=null,1===this.socket.readyState&&this.socket.close(),delete this.socket),this.connectOptions.uris&&this.hostIndex<this.connectOptions.uris.length-1)this.hostIndex++,this._doConnect(this.connectOptions.uris[this.hostIndex]);else if(void 0===e&&(e=o.OK.code,t=c(o.OK)),this.connected){if(this.connected=!1,this.onConnectionLost&&this.onConnectionLost({errorCode:e,errorMessage:t,reconnect:this.connectOptions.reconnect,uri:this._wsuri}),e!==o.OK.code&&this.connectOptions.reconnect)return this._reconnectInterval=1,void this._reconnect()}else 4===this.connectOptions.mqttVersion&&!1===this.connectOptions.mqttVersionExplicit?(this._trace("Failed to connect V4, dropping back to V3"),this.connectOptions.mqttVersion=3,this.connectOptions.uris?(this.hostIndex=0,this._doConnect(this.connectOptions.uris[0])):this._doConnect(this.uri)):this.connectOptions.onFailure&&this.connectOptions.onFailure({invocationContext:this.connectOptions.invocationContext,errorCode:e,errorMessage:t})},I.prototype._trace=function(){if(this.traceFunction){var e=Array.prototype.slice.call(arguments);for(var t in e)void 0!==e[t]&&e.splice(t,1,JSON.stringify(e[t]));var n=e.join("");this.traceFunction({severity:"Debug",message:n})}if(null!==this._traceBuffer){t=0;for(var s=arguments.length;t<s;t++)this._traceBuffer.length==this._MAX_TRACE_ENTRIES&&this._traceBuffer.shift(),0===t||void 0===arguments[t]?this._traceBuffer.push(arguments[t]):this._traceBuffer.push("  "+JSON.stringify(arguments[t]))}},I.prototype._traceMask=function(e,t){var n={};for(var s in e)e.hasOwnProperty(s)&&(n[s]=s==t?"******":e[s]);return n};var w=function(e){var t,n;if(!("string"==typeof e||e instanceof ArrayBuffer||ArrayBuffer.isView(e)&&!(e instanceof DataView)))throw c(o.INVALID_ARGUMENT,[e,"newPayload"]);t=e;var s=0,i=!1,r=!1;Object.defineProperties(this,{payloadString:{enumerable:!0,get:function(){return"string"==typeof t?t:v(t,0,t.length)}},payloadBytes:{enumerable:!0,get:function(){if("string"==typeof t){var e=new ArrayBuffer(g(t)),n=new Uint8Array(e);return _(t,n,0),n}return t}},destinationName:{enumerable:!0,get:function(){return n},set:function(e){if("string"!=typeof e)throw new Error(c(o.INVALID_ARGUMENT,[e,"newDestinationName"]));n=e}},qos:{enumerable:!0,get:function(){return s},set:function(e){if(0!==e&&1!==e&&2!==e)throw new Error("Invalid argument:"+e);s=e}},retained:{enumerable:!0,get:function(){return i},set:function(e){if("boolean"!=typeof e)throw new Error(c(o.INVALID_ARGUMENT,[e,"newRetained"]));i=e}},topic:{enumerable:!0,get:function(){return n},set:function(e){n=e}},duplicate:{enumerable:!0,get:function(){return r},set:function(e){r=e}}})};return{Client:function(e,t,n,i){var r;if("string"!=typeof e)throw new Error(c(o.INVALID_TYPE,[typeof e,"host"]));if(2==arguments.length){i=t;var a=(r=e).match(/^(wss?):\/\/((\[(.+)\])|([^\/]+?))(:(\d+))?(\/.*)$/);if(!a)throw new Error(c(o.INVALID_ARGUMENT,[e,"host"]));e=a[4]||a[2],t=parseInt(a[7]),n=a[8]}else{if(3==arguments.length&&(i=n,n="/mqtt"),"number"!=typeof t||t<0)throw new Error(c(o.INVALID_TYPE,[typeof t,"port"]));if("string"!=typeof n)throw new Error(c(o.INVALID_TYPE,[typeof n,"path"]));var u=-1!==e.indexOf(":")&&"["!==e.slice(0,1)&&"]"!==e.slice(-1);r="ws://"+(u?"["+e+"]":e)+":"+t+n}for(var h=0,d=0;d<i.length;d++){var l=i.charCodeAt(d);55296<=l&&l<=56319&&d++,h++}if("string"!=typeof i||h>65535)throw new Error(c(o.INVALID_ARGUMENT,[i,"clientId"]));var f=new I(r,e,t,n,i);Object.defineProperties(this,{host:{get:function(){return e},set:function(){throw new Error(c(o.UNSUPPORTED_OPERATION))}},port:{get:function(){return t},set:function(){throw new Error(c(o.UNSUPPORTED_OPERATION))}},path:{get:function(){return n},set:function(){throw new Error(c(o.UNSUPPORTED_OPERATION))}},uri:{get:function(){return r},set:function(){throw new Error(c(o.UNSUPPORTED_OPERATION))}},clientId:{get:function(){return f.clientId},set:function(){throw new Error(c(o.UNSUPPORTED_OPERATION))}},onConnected:{get:function(){return f.onConnected},set:function(e){if("function"!=typeof e)throw new Error(c(o.INVALID_TYPE,[typeof e,"onConnected"]));f.onConnected=e}},disconnectedPublishing:{get:function(){return f.disconnectedPublishing},set:function(e){f.disconnectedPublishing=e}},disconnectedBufferSize:{get:function(){return f.disconnectedBufferSize},set:function(e){f.disconnectedBufferSize=e}},onConnectionLost:{get:function(){return f.onConnectionLost},set:function(e){if("function"!=typeof e)throw new Error(c(o.INVALID_TYPE,[typeof e,"onConnectionLost"]));f.onConnectionLost=e}},onMessageDelivered:{get:function(){return f.onMessageDelivered},set:function(e){if("function"!=typeof e)throw new Error(c(o.INVALID_TYPE,[typeof e,"onMessageDelivered"]));f.onMessageDelivered=e}},onMessageArrived:{get:function(){return f.onMessageArrived},set:function(e){if("function"!=typeof e)throw new Error(c(o.INVALID_TYPE,[typeof e,"onMessageArrived"]));f.onMessageArrived=e}},trace:{get:function(){return f.traceFunction},set:function(e){if("function"!=typeof e)throw new Error(c(o.INVALID_TYPE,[typeof e,"onTrace"]));f.traceFunction=e}}}),this.connect=function(e){if(s(e=e||{},{timeout:"number",userName:"string",password:"string",willMessage:"object",keepAliveInterval:"number",cleanSession:"boolean",useSSL:"boolean",invocationContext:"object",onSuccess:"function",onFailure:"function",hosts:"object",ports:"object",reconnect:"boolean",mqttVersion:"number",mqttVersionExplicit:"boolean",uris:"object"}),void 0===e.keepAliveInterval&&(e.keepAliveInterval=60),e.mqttVersion>4||e.mqttVersion<3)throw new Error(c(o.INVALID_ARGUMENT,[e.mqttVersion,"connectOptions.mqttVersion"]));if(void 0===e.mqttVersion?(e.mqttVersionExplicit=!1,e.mqttVersion=4):e.mqttVersionExplicit=!0,void 0!==e.password&&void 0===e.userName)throw new Error(c(o.INVALID_ARGUMENT,[e.password,"connectOptions.password"]));if(e.willMessage){if(!(e.willMessage instanceof w))throw new Error(c(o.INVALID_TYPE,[e.willMessage,"connectOptions.willMessage"]));if(e.willMessage.stringPayload=null,void 0===e.willMessage.destinationName)throw new Error(c(o.INVALID_TYPE,[typeof e.willMessage.destinationName,"connectOptions.willMessage.destinationName"]))}if(void 0===e.cleanSession&&(e.cleanSession=!0),e.hosts){if(!(e.hosts instanceof Array))throw new Error(c(o.INVALID_ARGUMENT,[e.hosts,"connectOptions.hosts"]));if(e.hosts.length<1)throw new Error(c(o.INVALID_ARGUMENT,[e.hosts,"connectOptions.hosts"]));for(var t=!1,i=0;i<e.hosts.length;i++){if("string"!=typeof e.hosts[i])throw new Error(c(o.INVALID_TYPE,[typeof e.hosts[i],"connectOptions.hosts["+i+"]"]));if(/^(wss?):\/\/((\[(.+)\])|([^\/]+?))(:(\d+))?(\/.*)$/.test(e.hosts[i])){if(0===i)t=!0;else if(!t)throw new Error(c(o.INVALID_ARGUMENT,[e.hosts[i],"connectOptions.hosts["+i+"]"]))}else if(t)throw new Error(c(o.INVALID_ARGUMENT,[e.hosts[i],"connectOptions.hosts["+i+"]"]))}if(t)e.uris=e.hosts;else{if(!e.ports)throw new Error(c(o.INVALID_ARGUMENT,[e.ports,"connectOptions.ports"]));if(!(e.ports instanceof Array))throw new Error(c(o.INVALID_ARGUMENT,[e.ports,"connectOptions.ports"]));if(e.hosts.length!==e.ports.length)throw new Error(c(o.INVALID_ARGUMENT,[e.ports,"connectOptions.ports"]));for(e.uris=[],i=0;i<e.hosts.length;i++){if("number"!=typeof e.ports[i]||e.ports[i]<0)throw new Error(c(o.INVALID_TYPE,[typeof e.ports[i],"connectOptions.ports["+i+"]"]));var a=e.hosts[i],u=e.ports[i],h=-1!==a.indexOf(":");r="ws://"+(h?"["+a+"]":a)+":"+u+n,e.uris.push(r)}}}f.connect(e)},this.subscribe=function(e,t){if("string"!=typeof e&&e.constructor!==Array)throw new Error("Invalid argument:"+e);if(s(t=t||{},{qos:"number",invocationContext:"object",onSuccess:"function",onFailure:"function",timeout:"number"}),t.timeout&&!t.onFailure)throw new Error("subscribeOptions.timeout specified with no onFailure callback.");if(void 0!==t.qos&&0!==t.qos&&1!==t.qos&&2!==t.qos)throw new Error(c(o.INVALID_ARGUMENT,[t.qos,"subscribeOptions.qos"]));f.subscribe(e,t)},this.unsubscribe=function(e,t){if("string"!=typeof e&&e.constructor!==Array)throw new Error("Invalid argument:"+e);if(s(t=t||{},{invocationContext:"object",onSuccess:"function",onFailure:"function",timeout:"number"}),t.timeout&&!t.onFailure)throw new Error("unsubscribeOptions.timeout specified with no onFailure callback.");f.unsubscribe(e,t)},this.send=function(e,t,n,s){var i;if(0===arguments.length)throw new Error("Invalid argument.length");if(1==arguments.length){if(!(e instanceof w)&&"string"!=typeof e)throw new Error("Invalid argument:"+typeof e);if(void 0===(i=e).destinationName)throw new Error(c(o.INVALID_ARGUMENT,[i.destinationName,"Message.destinationName"]));f.send(i)}else(i=new w(t)).destinationName=e,arguments.length>=3&&(i.qos=n),arguments.length>=4&&(i.retained=s),f.send(i)},this.publish=function(e,t,n,s){var i;if(0===arguments.length)throw new Error("Invalid argument.length");if(1==arguments.length){if(!(e instanceof w)&&"string"!=typeof e)throw new Error("Invalid argument:"+typeof e);if(void 0===(i=e).destinationName)throw new Error(c(o.INVALID_ARGUMENT,[i.destinationName,"Message.destinationName"]));f.send(i)}else(i=new w(t)).destinationName=e,arguments.length>=3&&(i.qos=n),arguments.length>=4&&(i.retained=s),f.send(i)},this.disconnect=function(){f.disconnect()},this.getTraceLog=function(){return f.getTraceLog()},this.startTrace=function(){f.startTrace()},this.stopTrace=function(){f.stopTrace()},this.isConnected=function(){return f.connected}},Message:w}}(void 0!==n.g?n.g:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});return e},e.exports=s()},143:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Div=t.Dom=void 0;var n=function(){function e(){}return e.btn=function(t){return e.ele("btn",t)},e.inp=function(t){return e.ele("inp",t)},e.div=function(t){return e.ele("div",t)},e.fieldset=function(t){return e.ele("fieldset",t)},e.ele=function(e,t){return document.getElementById("".concat(e,"-").concat(t))},e.divAddHTML=function(t,n){var s=e.div(t);s.innerHTML+=n+"<br>",s.scrollTop=s.scrollHeight},e.now=function(){return(new Date).toLocaleTimeString("de-CH",{hour12:!1,hour:"numeric",minute:"numeric",second:"numeric"})},e}();t.Dom=n;var s=function(){function e(e){this.div=null,this.div=n.div(e)}return e.prototype.Text=function(e){var t=document.createElement("span");return t.innerText+=n.now()+" "+e,this.div.appendChild(t),t=document.createElement("br"),this.div.appendChild(t),this},e.prototype.Br=function(){var e=document.createElement("br");return this.div.appendChild(e),this},Object.defineProperty(e.prototype,"Element",{get:function(){return this.div},enumerable:!1,configurable:!0}),e}();t.Div=s}},t={};function n(s){var i=t[s];if(void 0!==i)return i.exports;var o=t[s]={exports:{}};return e[s].call(o.exports,o,o.exports,n),o.exports}n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{"use strict";n(691);var e,t=n(295),s=n(143);!function(e){e[e.Disconnected=0]="Disconnected",e[e.Connecting=1]="Connecting",e[e.Disconnecting=2]="Disconnecting",e[e.ConnectFailure=3]="ConnectFailure",e[e.ConnectInvalidState=4]="ConnectInvalidState",e[e.DisconnectInvalidState=5]="DisconnectInvalidState",e[e.PublishInvalidState=6]="PublishInvalidState",e[e.SubscribeInvalidState=7]="SubscribeInvalidState",e[e.UnsubscribeInvalidState=8]="UnsubscribeInvalidState",e[e.ConnectionLost=9]="ConnectionLost",e[e.Connected=10]="Connected"}(e||(e={})),new(function(){function n(){var t=this;this.msg=new s.Div("messages"),this.log=new s.Div("loggings"),this.client=null,this.updateStatus(e.Disconnected),s.Dom.btn("connect").addEventListener("click",(function(){return t.connection()})),s.Dom.btn("disconnect").addEventListener("click",(function(){return t.connection()})),s.Dom.btn("pub").addEventListener("click",(function(){return t.publish()})),s.Dom.btn("sub").addEventListener("click",(function(){return t.subscribe()})),s.Dom.btn("messages").addEventListener("click",(function(e){return t.activateTab(e,"messages")})),s.Dom.btn("loggings").addEventListener("click",(function(e){return t.activateTab(e,"loggings")})),s.Dom.btn("messages").click()}return n.prototype.connection=function(){this.status==e.Connected?this.disconnect():this.status==e.Disconnected?this.connect():this.reset()},n.prototype.activateTab=function(e,t){var n,i,o;for(i=document.getElementsByClassName("tabcontent"),n=0;n<i.length;n++)i[n].style.display="none";for(o=document.getElementsByClassName("tablinks"),n=0;n<o.length;n++)o[n].className=o[n].className.replace(" active","");s.Dom.div(t).style.display="block",e.currentTarget.className+=" active"},n.prototype.connect=function(){var n=this;this.updateStatus(e.Connecting);var i=s.Dom.inp("client-id").value;if(!i||0==i.trim().length){if(!s.Dom.inp("clean-session").checked)return void this.log.Text("Client Id is mandatory when using session");i="randomId_"+Math.random().toString(16).substring(2,8)}this.client=new t.Client(s.Dom.inp("host").value,8884,i),this.client.onMessageDelivered=function(e){return n.messageDelivered(e)},this.client.onMessageArrived=function(e){return n.messageArrived(e)},this.client.onConnectionLost=function(e){return n.connectionLost(e)};try{this.client.connect({useSSL:!0,reconnect:s.Dom.inp("reconnect").checked,cleanSession:s.Dom.inp("clean-session").checked,userName:s.Dom.inp("user").value,password:s.Dom.inp("password").value,onSuccess:function(t){n.updateStatus(e.Connected,i)},onFailure:function(t){n.updateStatus(e.ConnectFailure,"".concat(i," error: ").concat(t.errorMessage))}})}catch(t){this.updateStatus(e.ConnectInvalidState,"".concat(i))}},n.prototype.disconnect=function(){this.updateStatus(e.Disconnecting),this.unsubscribeAll();try{this.client.disconnect()}catch(t){this.updateStatus(e.DisconnectInvalidState)}this.msg.Element.innerHTML="",this.log.Element.innerHTML=""},n.prototype.reset=function(){if(this.client){if(this.client.isConnected){this.unsubscribeAll();try{this.client.disconnect()}catch(t){this.updateStatus(e.DisconnectInvalidState)}}this.client=null}this.updateStatus(e.Disconnected)},n.prototype.publish=function(){var t=parseInt(s.Dom.inp("pub-qos").value);try{this.client.send(s.Dom.inp("pub").value,s.Dom.inp("message").value,t,s.Dom.inp("retained").checked)}catch(t){this.updateStatus(e.PublishInvalidState)}},n.prototype.subscribe=function(){var t=this,n=s.Dom.inp("sub").value;if(!s.Dom.div("subs").children.namedItem(n)){var i=this.createChip(n),o=parseInt(s.Dom.inp("sub-qos").value);try{this.client.subscribe(n,{qos:o,onSuccess:function(e){s.Dom.div("subs").appendChild(i),t.log.Text("subscribe: ".concat(n," success, grantedQos: ").concat(e.grantedQos))},onFailure:function(e){t.log.Text("subscribe: ".concat(n," failure, ").concat(e.errorMessage))}})}catch(t){this.updateStatus(e.SubscribeInvalidState)}}},n.prototype.createChip=function(e){var t=this,n=document.createElement("div");n.id=e,n.classList.add("chip"),n.innerText=e;var s=document.createElement("span");return s.classList.add("chip-x"),s.innerHTML="&times;",n.appendChild(s),s.addEventListener("click",(function(){return t.unsubscribe(n)})),n},n.prototype.unsubscribeAll=function(){var e=s.Dom.div("subs").lastElementChild;e&&e.classList.contains("chip")&&(this.unsubscribe(e),this.unsubscribeAll())},n.prototype.unsubscribe=function(t){var n=this;try{this.client.unsubscribe(t.id,{onSuccess:function(e){n.log.Text("unsubscribe: ".concat(t.id," success"))},onFailure:function(e){n.log.Text("unsubscribe: ".concat(t.id," failure, ").concat(e.errorMessage))}})}catch(t){this.updateStatus(e.UnsubscribeInvalidState)}t.remove()},n.prototype.messageDelivered=function(e){this.log.Text("publish: success")},n.prototype.messageArrived=function(e){this.msg.Text("".concat(e.destinationName,":").concat(e.payloadString))},n.prototype.connectionLost=function(t){this.updateStatus(e.ConnectionLost,t.errorMessage)},n.prototype.updateStatus=function(t,n){var i=this;void 0===n&&(n=null),n?this.log.Text("".concat(e[t]," ").concat(n)):this.log.Text("".concat(e[t])),t>=e.Connected?(s.Dom.div("connect").classList.add("hide"),s.Dom.div("disconnect").classList.remove("hide")):(s.Dom.div("connect").classList.remove("hide"),s.Dom.div("disconnect").classList.add("hide")),s.Dom.fieldset("pub-sub").disabled=t<e.Connected,s.Dom.btn("connect").innerText=e.Connected===t?"Disconnect":e.Disconnected===t?"Connect":"Reset",s.Dom.btn("disconnect").innerText=e.Connected===t?"Disconnect":e.Disconnected===t?"Connect":"Reset",this.status===e.Disconnecting&&t===e.ConnectionLost&&setTimeout((function(){return i.updateStatus(e.Disconnected)}),0),this.status=t},n}())})()})();
//# sourceMappingURL=main.278cf97051913ab7e077.js.map