import axios from "axios";
import { Loading, Notify } from "quasar";
require("dotenv").config();

export default async fileForm => {
  const UPLOAD_PRESET = process.env.VUE_APP_CLOUDINARY_UPLOAD_PRESET;
  const API_KEY = process.env.VUE_APP_CLOUDINARY_API_KEY;
  const CLOUDINARY_URL = process.env.VUE_APP_CLOUDINARY_URL;

  fileForm.append("upload_preset", UPLOAD_PRESET);
  fileForm.append("api_key", API_KEY);

  Notify.create({
    type: "warning",
    timeout: 1500,
    message: "Uploading image"
  });
  Loading.show();

  return (
    axios
      .post(CLOUDINARY_URL, fileForm)
      .then(res => {
        if (res.status == 200) {
          Loading.hide();
          Notify.create({
            type: "positive",
            timeout: 1500,
            message: "Image uploaded successfully"
          });
          return { status: "success", link: res.data.url };
        }
      })
      // eslint-disable-next-line no-unused-vars
      .catch(err => {
        //console.log(err);
        Loading.hide();
        Notify.create({
          type: "negative",
          timeout: 1500,
          message: "Error in image upload"
        });
        return { status: "failure" };
      })
  );
};
