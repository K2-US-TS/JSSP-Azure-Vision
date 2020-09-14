# JSSP-Azure-Vision

 ## JSSP Broker for Azure Vision Analytics
 Sample K2 JSSP Broker connecting K2 to Azure Vision Analytics service based on **Azure Vision API Version 2.0** (vision/v2.0/analyze). This is only a sample broker and is not supported by the product team.
 
 ***Use this code at your own risk, Happy Coding.***
  
 ## Features
 This broker currently supports the followings:
 
 ### Text Analysis and Moderation
 - ListCelebrities: Input an image URL and returns the list of celebrities detected with confidence score.
 - ListTags: Input an image URL and returns the list of tags associated with objects detected in the image
 
Additional Information:  [API Reference](https://westus.dev.cognitive.microsoft.com/docs/services/57cf753a3f9b070c105bd2c1/operations/57cf753a3f9b070868a1f66f)

## What is required to create a K2 Service Instance:
1. Azure Service Endpoint (e.g. https://eastus.api.cognitive.microsoft.com)
2. Azure Service API Key


## To deploy the broker to a K2 Nexus platform
To deploy this broker you can use the bundled JS file under dist folder. Follow the [product documentation here](https://help.k2.com/onlinehelp/platform/userguide/current/default.htm#../Subsystems/Default/Content/Extend/JS-Broker/JSSPRegister.htm%3FTocPath%3DDevelop%7CExtending%2520the%2520K2%2520Nexus%2520Platform%7CCustom%2520Service%2520Types%2520with%2520the%2520JavaScript%2520Service%2520Provider%2520(JSSP)%7C_____8) to deploy the bundled js file to your K2 Nexus instance

## To modify this broker for your use cases:
1. Download this repository
2. Run "npm install"
3. Modify the code in index.ts under the src folder
4. Then run "npm run build" to generate a new bundled JS file for deployment.
