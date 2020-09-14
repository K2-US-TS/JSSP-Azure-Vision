import '@k2oss/k2-broker-core';
const DebugTag = "=== USTS-IAV: ";

const Azure_Vision_API = "vision/v2.0/analyze";

metadata = {
    systemName: "ImmersionAzureVision",
    displayName: "Azure Vision",
    description: "Image Analytics using Azure Vision API.",
    "configuration": {
        "Subscription Key": {
            "displayName": "Subscription Key",
            "type": "string"
        },
        "Service Endpoint": {
            "displayName": "Service Endpoint",
            "type": "string",
            "required": true
        }
    }
};

ondescribe = async function({configuration}): Promise<void> {
    postSchema({
        objects: {
            "ModerateImage": {
                displayName: "Moderate Image",
                description: "Azure Vision 2. 0 Image Analytics",
                properties: {
                    "imageURL": {
                        displayName: "imageURL",
                        type: "string"
                    },
                    "name": {
                        displayName: "name",
                        type: "string"
                    },
                    "confidence": {
                        displayName: "confidence",
                        type: "decimal"
                    },
                    "topPos": {
                        displayName: "topPos",
                        type: "number"
                    },
                    "leftPos": {
                        displayName: "leftPos",
                        type: "number"
                    },
                    "width": {
                        displayName: "width",
                        type: "number"
                    },
                    "height": {
                        displayName: "height",
                        type: "number"
                    },
                    "tag": {
                        displayName: "tag",
                        type: "string"
                    }
                },
                methods: {
                    "ListCelebrities": {
                        displayName: "ListCelebrities",
                        type: "list",
                        inputs: [ "imageURL"],
                        requiredInputs: [ "imageURL" ],
                        outputs: [ "name", "confidence", "leftPos", "topPos", "width", "height" ]
                    },
                    "ListTags": {
                        displayName: "ListTags",
                        type: "list",
                        inputs: [ "imageURL"],
                        requiredInputs: [ "imageURL"],
                        outputs: [ "tag" ]
                    }

                }
            }

        }
    });
}


onexecute = async function({objectName, methodName, parameters, properties, configuration, schema}): Promise<void> {
    switch (objectName)
    {
        case "ModerateImage": await onexecuteModerateImage(methodName, properties, parameters, configuration); break;
        
        default: throw new Error("The object " + objectName + " is not supported.");
    }
}

async function onexecuteModerateImage(methodName: string, properties: SingleRecord, parameters: SingleRecord, configuration:SingleRecord): Promise<void> {
    switch (methodName)
    {
        case "ListCelebrities": await onexecuteListCelebrities(parameters, properties, configuration); break;
        case "ListTags": await onexecuteListTags(parameters, properties, configuration); break;
        default: throw new Error("The method " + methodName + " is not supported.");
    }
}

function onexecuteListCelebrities(parameters: SingleRecord, properties: SingleRecord, configuration:SingleRecord): Promise<void> {
    return new Promise<void>((resolve, reject) =>
    {
        console.log(DebugTag+"onexecuteListCelebrities");
        var xhr = new XMLHttpRequest();

        var bodyData = JSON.stringify({"url": properties["imageURL"]});
        console.log(DebugTag+"Image URL"+bodyData );

        xhr.onreadystatechange = function() {
            try {
                if (xhr.readyState !== 4) return;
                if (xhr.status !== 200) throw new Error("Failed with status " + xhr.status);

                console.log(DebugTag+"Response: "+xhr.responseText);

                var obj = JSON.parse(xhr.responseText);

                var cat = obj.categories;
                for (var key1 in cat) {
                    if ((cat[key1].name == 'people_') || (cat[key1].name == 'people_portrait')) {
                        var celebs = cat[key1].detail.celebrities
                        for (var key in celebs) {
                            postResult({
                                "name": celebs[key].name,
                                "confidence": celebs[key].confidence,
                                "leftPos": celebs[key].faceRectangle.left,
                                "topPos": celebs[key].faceRectangle.top,
                                "width": celebs[key].faceRectangle.width,
                                "height": celebs[key].faceRectangle.height
                            });
                        }
                    }
                }

                resolve();
            } catch (e) {
                reject(e);
            }
        };



        xhr.open("POST", "https://eastus.api.cognitive.microsoft.com/vision/v2.0/analyze?details=Celebrities");
        var url = String(configuration["Service Endpoint"]);
        if (url.slice(-1) !== '/')
            url = url + '/'
        url = url + Azure_Vision_API + "?details=Celebrities";

        console.log (`${DebugTag} === URL ${url}`);

        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Ocp-Apim-Subscription-Key", String(configuration["Subscription Key"]));


        xhr.send(bodyData);
    });
}

function onexecuteListTags(parameters: SingleRecord, properties: SingleRecord, configuration:SingleRecord): Promise<void> {
    return new Promise<void>((resolve, reject) =>
    {
        var xhr = new XMLHttpRequest();
        console.log(DebugTag+"onexecuteListTags");

        var bodyData = JSON.stringify({"url": properties["imageURL"]});

        xhr.onreadystatechange = function() {
            try {
                if (xhr.readyState !== 4) return;
                if (xhr.status !== 200) throw new Error("Failed with status " + xhr.status);

                var obj = JSON.parse(xhr.responseText);
                console.log(DebugTag+"Response"+xhr.responseText );

                var tags = obj.description.tags;
                for (var key in tags) {
                    postResult({
                        "tag": tags[key]
                    });
                }
                resolve();
            } catch (e) {
                reject(e);
            }
        };


        xhr.open("POST", "https://eastus.api.cognitive.microsoft.com/vision/v2.0/analyze?visualFeatures=Description");
        var url = String(configuration["Service Endpoint"]);
        if (url.slice(-1) !== '/')
            url = url + '/'
        url = url + Azure_Vision_API + "?visualFeatures=Description";

        console.log (`${DebugTag} === URL ${url}`);

        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Ocp-Apim-Subscription-Key", String(configuration["Subscription Key"]));


        xhr.send(bodyData);
    });
}
