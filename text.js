const express = require("express");
const cors = require("cors");
const app = express();
const multer = require("multer");
const { PDFDocument } = require("pdf-lib");
const request = require("request");
const fs = require("fs");
const { getMimeType } = require("stream-mime-type");

// Initialize Empty Variables
let pdf_file_name = "";
let extracted_json_data;
let extracted_images = [];

// Multer Uplaod Config
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads");
  },
  filename: function (req, file, callback) {
    const new_name = Math.random().toString().slice(2);
    pdf_file_name = new_name;
    callback(null, `${pdf_file_name}.pdf`);
  },
});
const upload = multer({ storage: storage }).single("pdfdoc");

// Middleares
app.use("", express.static("uploads"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const keys = [
  "6e0bcaec-e708-4cc0-aca1-f8913004e77b",
  "79d4a332-4e0a-4f7b-8d0a-af130665c832",
  "d7ff6be7-33f2-4d30-8239-e2cf6abef55d",
  "955a54c5-e6e3-4e16-bd74-c9d633b70943",
  "b7146d43-faae-486e-8faf-4b5257e097a6",
  "a6e59972-fe7c-4e5b-a9bd-b4e1779201a8",
  "0453e7e8-47cf-43e7-bba9-b540f7db9460",
  "099cd9f1-cf20-4264-b6c6-113816ab12da",
  "0a3741dd-b8cb-4fed-800c-6baf0648bcaa",
  "4c4f29a1-255c-4735-a4e2-d70c626d3f22",
];

// Utilities
const send_pdf_json = require("./utils/send_pdf_json");

app.post("/", function (req, res, next) {
  extracted_images = [];
  extracted_json_data = null;

  upload(req, res, async function (err1) {
    // Extract Texts from pdf - API
    const options = {
      method: "POST",
      url: "https://selectpdf.com/api2/pdftotext/",
      headers: {
        "Content-Type":
          "multipart/form-data; boundary=---011000010111000001101001",
      },
      formData: {
        key: keys[Math.floor(Math.random() * 10)],
        url: `https://nodeserver.joblessbd.com/${pdf_file_name}.pdf`,
      },
    };

    request(options, async function (error, response, text_body) {
      // Extract Images from pdf
      const existingPdfBytes = await new Promise((resolve, reject) => {
        fs.readFile(`./uploads/${pdf_file_name}.pdf`, (err, result) => {
          if (err) {
            reject(err);
          }
          if (!err) {
            resolve(result);
          }
        });
      });
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const pages = pdfDoc.getPages();
      const result = [];
      pages[0].doc.context.indirectObjects.forEach((el) => {
        if (el.hasOwnProperty("contents")) result.push(el.contents);
      });
      const mime = await Promise.all(
        result.map(async (el) => {
          return new Promise(async (resolve) => {
            const res = await getMimeType(el);
            if (res) {
              resolve(res);
            }
          });
        })
      );

      const image_1 = `${Math.random().toString().slice(2)}.jpg`;
      const image_2 = `${Math.random().toString().slice(2)}.jpg`;

      Promise.all(
        mime.map(async (el, i) => {
          if (el.mime === "image/jpeg") {
            return new Promise(async (resolve) => {
              const resp = await result[i];
              const fileContents = new Buffer.from(resp, "base64");
              fs.writeFile(
                `uploads/${[image_1, image_2][i]}`,
                fileContents,
                (err) => {
                  if (err) throw err;
                }
              );
            });
          }
        })
      );

      res.json({
        text_body: text_body
          ?.split(/\r|\n/)
          .join("")
          .split(" ")
          .filter((word) => word)
          .join("__"),
        extracted_images: [
          `https://nodeserver.joblessbd.com/${image_1}`,
          `https://nodeserver.joblessbd.com/${image_2}`,
        ],
        uploaded_pdf: `https://nodeserver.joblessbd.com/${pdf_file_name}.pdf`,
      });
    });
  });
});

app.get("/get_extracted_data", (req, res) => {
  res.json({ ...extracted_json_data, extracted_images });
});

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
