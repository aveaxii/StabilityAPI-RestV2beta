import fs from "node:fs";
import axios from "axios";
import FormData from "form-data";

const formData = {
    image: fs.createReadStream("./generated/photo.png"),
    left: 400,
    right: 400,
    up: 400,
    down: 200,
    output_format: "png",
};

const response = await axios.postForm(
    `https://api.stability.ai/v2beta/stable-image/edit/outpaint`,
    axios.toFormData(formData, new FormData()),
    {
        validateStatus: undefined,
        responseType: "arraybuffer",
        headers: {
            Authorization: `Bearer YOUR_KEY_HERE`,
            Accept: "image/*"
        },
    },
);

if(response.status === 200) {
    fs.writeFileSync("./generated/outpaint_result.png", Buffer.from(response.data));
} else {
    throw new Error(`${response.status}: ${response.data.toString()}`);
}