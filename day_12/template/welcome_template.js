const getEmailData = (to, name, template) => {
  let data = null;
  switch (template) {
    case "welcome":
      data = {
        from: "보내는 사람 이름 <user@gmail.com>",
        to,
        subject: `Hello ${name}`,
        html: `<h1>안녕하세요 ${name}님</h1>`,
      };
      break;
    default:
      break;
  }
  return data;
};

module.exports = { getEmailData };
