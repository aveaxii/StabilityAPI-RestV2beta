import fs from "node:fs";
import axios from "axios";
import FormData from "form-data";

const formData = {
    image: fs.createReadStream("./generated/inpaint.png"),
    mask: fs.createReadStream("./generated/mask_image.png"),
    prompt: "dog wearing black glasses",
    output_format: "png"
};

const response = await axios.postForm(
    `https://api.stability.ai/v2beta/stable-image/edit/inpaint`,
    axios.toFormData(formData, new FormData()),
    {
        validateStatus: undefined,
        responseType: "arraybuffer",
        headers: {
            Authorization: `Bearer YOUR_API_KEY`,
            Accept: "image/*"
        },
    },
);

if(response.status === 200) {
    fs.writeFileSync("./generated/result_inpaint.png", Buffer.from(response.data));
} else {
    throw new Error(`${response.status}: ${response.data.toString()}`);
}