# mqtt-client
- Sample MQTT client for browser, written in Typescript
- Using paho-mqtt from npmjs.com
- Connect to a MQTT-Broker via WebSocket over an encrypted TLS connection 
- Publish and subscribe to topics, to send and receive messages
- Try the client: https://sw2go.github.io/mqtt-client/
- Tested with "HiveMQ Cloud Broker" https://www.hivemq.com/mqtt-cloud-broker/ and a "Shelly Plus 1" Wifi-Relais https://shelly-api-docs.shelly.cloud/gen2 

Setup project
- npm install
To debug
- npm run build
- Visual Studio Code & LiveServer Extension
To build release
- npm run release

Setup MQTT brocker
- https://www.hivemq.com/downloads/
- I went with the free cloud version 

Setup Shelly 1 Plus
- Power on your Shelly (this runs an Accesspoint named "ShellyPlus1_.....")
- Connect your laptop to the Accesspoint
- Open http://192.168.33.1
- Setup and enable Shelly Wifi to connect to your home-WLAN
- Check and Remember the IP the Shelly got from your WLAN i.e. 192.168.0.29
- Disconnect your laptop from the Shelly-WLAN and connect to your LAN again

- Open Browser and got to http://192.168.0.29 (the IP of the Shelly in your LAN)

API-Details see: https://shelly-api-docs.shelly.cloud/gen2/

Read and Write Relais 0 from HTTP
http://192.168.0.29/rpc/Switch.GetStatus?id=0
http://192.168.0.29/rpc/Switch.Set?id=0&on=true
http://192.168.0.29/rpc/Switch.Toggle?id=0

Setup MQTT

Get MQTT Config
http://192.168.0.29/rpc/MQTT.GetConfig

Set MQTT Config
http://192.168.0.29/rpc/MQTT.SetConfig?config={ "enable": true, "server": "4ac8b8f94b8249b58a194879e510413f.s2.eu.hivemq.cloud:8883", "user": "???", "pass": "???" , "ssl_ca": "*" }

Check if Shelly is connected
http://192.168.0.29/rpc/MQTT.GetStatus

Subscribe to the event-topic: shellyplus1-083af201c7f4/events/rpc  -> this topic gets notified whenever something on the shelly changes "input" or "output"
Subscribe to a src/rpc-topic: user_1/rpc

Publish to Topic: shellyplus1-083af201c7f4/rpc
Message-Payload1: { "method":"Switch.Set", "params":{"id":0, "on":false} } -> Switches relais 0 OFF, subscribers of the event-topic get notified
Message-Payload2: { "id":123, "src":"user_1", "method":"Switch.Set", "params":{"id":0, "on":true} } -> Switches relais 0 ON, both subscribers (event-topic and the src/rpc-topic) get notified
Message-Payload3: { "method":"Switch.Toggle", "params":{"id":0} } -> Toggles the relais, subscribers of the event-topic get notified

