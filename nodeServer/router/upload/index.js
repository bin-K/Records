const Router = require('koa-router')
const fs = require('fs');
const router = new Router()

router.post("/uploadImg", async (ctx) => {
  const file = ctx.request.files.file; // 获取上传的文件
  const reader = fs.createReadStream(file.filepath); // 创建可读流
  const ext = file.newFilename.split('.').pop(); // 获取文件后缀名
  const fileName = `${Date.now()}.${ext}`; // 生成新文件名
  const stream = fs.createWriteStream(`D:/Data/Code/Frontend/Learn/Temporary/nodeServer/Upload/${fileName}`); // 创建可写流
  reader.pipe(stream); // 将可读流的数据写入可写流
  ctx.body = { message: '文件上传成功' }
})

module.exports = router
