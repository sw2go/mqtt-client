Initial setup
-------------
Go to project folder i.e. "iothub-sas-token" an create empty console project
```
cd iothub-sas-token
dotnet new console -f "net6.0"
```
Then Write your code i.e. Program.cs and IoTHubSasToken.cs


Generate Connection-Credentials
-------------------------------
```
dotnet run <deviceId> <primaryKey>
```

To be able to debug dotnet add C# extension to VS-Code add a build task .vscode/tasks.json and extend .vscode/launch.json with a launch-setting for dotnet


