namespace IoTHubSasToken
{
    public class Program
    {
        /*
            Helper to create Connection-Info and Credentials requried by Azure IoTHub
        */
        public static void Main(string[] args)
        {
            if (args.Length < 2) {
                Console.WriteLine("To use this utility, find DeviceId and PrimaryKey in your Azure IoT Hub, then run:");
                Console.WriteLine("dotnet run <DeviceId> <PrimaryKey>");
                return;
            }

            var deviceId = args[0];
            var deviceKey = args[1];

            //Azure IoTHub
            var host = "aac-iot-hub.azure-devices.net";

            var hostUri = $"wss://{host}:443/$iothub/websocket?iothub-no-client-cert=true";
            var resourceUri = $"{host}/devices/{deviceId}";
            var policy = ""; //setting "device" caused error
            var username = $"{host}/{deviceId}/?api-version=2021-04-12";
            var password = IoTHubSasToken.generate(resourceUri, deviceKey , policy, 10);
            
            Console.WriteLine($"Host-URL: {hostUri}");
            Console.WriteLine($"ClientId: {deviceId}");
            Console.WriteLine($"Username: {username}");
            Console.WriteLine($"Password: {password}");
        }
    }
}





