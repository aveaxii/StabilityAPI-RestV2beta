import fs from "node:fs";
import axios from "axios";
import FormData from "form-data";

const formData = {
    image: fs.createReadStream("./generated/photo.png"),
    prompt: "cat wearing english hat of 19th century",
    search_prompt: "cat",
    output_format: "png"
};

const response = await axios.postForm(
    `https://api.stability.ai/v2beta/stable-image/edit/search-and-replace`,
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
    fs.writeFileSync("./generated/result_search_and_replace.png", Buffer.from(response.data));
} else {
    throw new Error(`${response.status}: ${response.data.toString()}`);
}