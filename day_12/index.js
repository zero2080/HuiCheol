const express = require("express");
const multer = require("multer");
const app = express();
const port = 3000;
const mailer = require("nodemailer");
const { getEmailData } = require("./template/welcome_template");
require("dotenv").config();
app.use(express.json());

// multer 설정: 업로드된 파일을 ./uploads 폴더에 저장
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads");
  },
  filename: function (req, file, callback) {
    const fileType = `.${file.mimetype.substring(
      file.mimetype.indexOf("/") + 1
    )}`;
    callback(null, file.fieldname + "-" + Date.now() + fileType);
  },
});

const upload = multer({ storage: storage });

// 라우트 설정: 파일을 업로드하는 라우트
app.post("/upload", upload.single("file"), (req, res) => {
  try {
    res.send("파일이 성공적으로 업로드 되었습니다!");
  } catch (error) {
    console.error(error);
    res.send("파일 업로드 중 오류가 발생했습니다.");
  }
});

app.post("/mail", (req, res) => {
  const { to, name } = req.body;
  const transporter = mailer.createTransport({
    service: "gmail",
    auth: {
      user: "dhflhn@gmail.com",
      pass: process.env.MAILER_PASSWORD,
    },
  });

  const mailData = getEmailData(to, name, "welcome");

  transporter.sendMail(mailData, (err, response) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(response);
    }
    transporter.close();
  });
});

// 서버 시작
app.listen(port, () => {
  console.log(`서버가 ${port}번 포트에서 실행중입니다.`);
});
