# mqtt-client
- Sample MQTT client for browser, written in Typescript
- Using paho-mqtt from npmjs.com
- Connect to a MQTT-Broker via WebSocket over an encrypted TLS connection
- Try session, retained messages, quality of service level 0 to 2
- Publish and subscribe to topics, to send and receive messages
- Try the client: https://sw2go.github.io/mqtt-client/
- Tested with "HiveMQ Cloud Broker" https://www.hivemq.com/mqtt-cloud-broker/<br>
  and a "Shelly Plus 1" Wifi-Relais https://shelly-api-docs.shelly.cloud/gen2 

Setup project
- npm install

To build automatically after every change and debug
- npm run build
- Visual Studio Code & LiveServer Extension

To build release
- npm run release

Setup MQTT broker
- https://www.hivemq.com/downloads/<br>
  I went with the free cloud version
  

Setup Shelly 1 Plus
- Power on your Shelly, it runs an Accesspoint named "ShellyPlus1_....."
- Connect your laptop to the Accesspoint
- Open http://192.168.33.1
- Setup and enable Shelly Wifi to connect to your home-WLAN
- Check and Remember the IP the Shelly got from your DHCP i.e. 192.168.0.29
- Disconnect your laptop from the Shelly-WLAN and connect to your LAN again
- Open Browser and got to your Shelly i.e. http://192.168.0.29

API-Details see: https://shelly-api-docs.shelly.cloud/gen2/

Read, write or toggle relais 0 using HTTP in your Browser
```
http://192.168.0.29/rpc/Switch.GetStatus?id=0
http://192.168.0.29/rpc/Switch.Set?id=0&on=true
http://192.168.0.29/rpc/Switch.Toggle?id=0
```

Setup MQTT

Read MQTT configuration
```
http://192.168.0.29/rpc/MQTT.GetConfig
```

Set MQTT configuration
```
http://192.168.0.29/rpc/MQTT.SetConfig?config={ "enable": true, "server": "4ac8b8f94b8249b58a194879e510413f.s2.eu.hivemq.cloud:8883", "user": "???", "pass": "???" , "ssl_ca": "*" }
```

Check if Shelly is connected
```
http://192.168.0.29/rpc/MQTT.GetStatus
```

Subscribe to the event-topic if you want to get notified whenever something on the shelly changes "input" or "output"
```
shellyplus1-083af201c7f4/events/rpc
```
Subscribe to a src/rpc-topic: 
```
user_1/rpc
```

Publish to Topic: 
```
shellyplus1-083af201c7f4/rpc
```

This publish message switches the relais 0 OFF, subscribers of the event-topic get notified
``` json
{ "method":"Switch.Set", "params": { "id":0, "on":false } }
```
This publish message switches the relais 0 ON, both subscribers (event-topic and the src/rpc-topic) get notified
``` json
{ "id":123, "src":"user_1", "method":"Switch.Set", "params":{ "id":0, "on":true } }
``` 
This publish message toggles the relais, subscribers of the event-topic get notified
``` json
{ "method":"Switch.Toggle", "params": { "id":0 } } 
```

Insights
- With 'clean session' qos > 0 for subscribers makes no sense
- Use a constant client-id, for sessioned connections, it is used to lookup the session on the server
- When using qos > 0 set it on the pub and the sub side
- When using subscriptions within a session they are automatically reestablished after a reconnect
- When subscribing in a session with a client-id use the same client-id to unsubscribe

