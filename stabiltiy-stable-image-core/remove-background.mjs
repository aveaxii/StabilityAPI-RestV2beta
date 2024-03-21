import fs from "node:fs";
import axios from "axios";
import FormData from "form-data";

const formData = {
    image: fs.createReadStream("./generated/ray.png"),
    output_format: "png"
};

const response = await axios.postForm(
    `https://api.stability.ai/v2beta/stable-image/edit/remove-background`,
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
    fs.writeFileSync("./result_remove_background.png", Buffer.from(response.data));
} else {
    throw new Error(`${response.status}: ${response.data.toString()}`);
}