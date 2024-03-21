import fs from "node:fs";
import axios from "axios";
import FormData from "form-data";

const formData = {
    image: fs.createReadStream("./generated/photo.png"),
    prompt: "cute fluffy white kitten floating in space, pastel colors",
    output_format: "png"
};

const response = await axios.postForm(
    `https://api.stability.ai/v2beta/stable-image/upscale/creative`,
    axios.toFormData(formData, new FormData()),
    {
        validateStatus: undefined,
        headers: {
            Authorization: `Bearer YOUR_API_KEY`,
        },
    },
);

console.log("Generation ID:", response.data.id);