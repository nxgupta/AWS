let {S3Client, GetObjectCommand, PutObjectCommand, ListObjectsV2Command, DeleteObjectCommand} = require("@aws-sdk/client-s3")
let {getSignedUrl} = require("@aws-sdk/s3-request-presigner")
require("dotenv").config()

const S3client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.KEY_ID,
    secretAccessKey: process.env.SECRET_KEY,
  },
})

async function getObjectURL(key) {
  const command = new GetObjectCommand({
    Bucket: "nxgupta",
    Key: key, //what you want to download/view
  })
  let url = await getSignedUrl(S3client, command, {expiresIn: 3600})
  return url
}

async function putObject(fileName, contentType) {
  const command = new PutObjectCommand({
    Bucket: "nxgupta",
    Key: `uploads/user-uploads/${fileName}`,
    ContentTYpe: contentType,
  })

  const url = await getSignedUrl(S3client, command, {expiresIn: 60 * 5})
  return url
}

async function listObject() {
  const command = new ListObjectsV2Command({
    Bucket: "nxgupta",
    Key: "/",
  })
  return await S3client.send(command)
}

async function deleteObject(key) {
  const command = new DeleteObjectCommand({
    Bucket: "nxgupta",
    Key: key,
  })
  return await S3client.send(command)
}

async function init() {
  //console.log(await getObjectURL("uploads/user-uploads/image-1729274457768.jpeg"))
  //console.log(await listObject())
  console.log(await deleteObject("uploads/user-uploads/image-1729274107290.jpeg"))
}

init()
