import axios from "axios";
import fs from "node:fs";

const generationID = "YOUR_GENERATION_ID_HERE";

const response = await axios.request({
    url: `https://api.stability.ai/v2beta/stable-image/upscale/creative/result/${generationID}`,
    method: "GET",
    validateStatus: undefined,
    responseType: "arraybuffer",
    headers: {
        Authorization: `Bearer YOUR_API_KEY`,
        Accept: "image/*", // Use 'application/json' to receive base64 encoded JSON
    },
});

if (response.status === 202) {
    console.log("Generation is still running, try again in 10 seconds.");
} else if (response.status === 200) {
    console.log("Generation is complete!");
    fs.writeFileSync("./generated/result_upscaled.png", Buffer.from(response.data));
} else {
    throw new Error(`Response ${response.status}: ${response.data.toString()}`);
}