import { writeFileSync } from 'fs';
import axios from "axios";
import FormData from "form-data";

const formData = {
    prompt: "Cyberpunk Ray",
    output_format: "png"
};

axios.post(
    `https://api.stability.ai/v2beta/stable-image/generate/core`,
    axios.toFormData(formData, new FormData()),
    {
        validateStatus: undefined,
        responseType: "arraybuffer",
        headers: {
            Authorization: `Bearer YOUR_API_KEY`,
            Accept: "image/*"
        },
    },
)
    .then(response => {
        if (response.status === 200) {
            writeFileSync("./generated/CyberRay.png", Buffer.from(response.data));
        } else {
            throw new Error(`${response.status}: ${response.data.toString()}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
