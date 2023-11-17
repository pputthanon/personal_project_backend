const bcrypt = require("bcryptjs");
const prisma = require("../src/models/prisma");

const hashPassword = bcrypt.hashSync("12345678", 12);

const user = [
  {
    email: "admin@gmail.com",
    password: hashPassword,
    firstName: "Admin",
    lastName: "Onmyway",
    isAdmin: true,
  },
  {
    email: "b@gmail.com",
    password: hashPassword,
    firstName: "B",
    lastName: "Codecamp",
    isAdmin: false,
  },
  {
    email: "c@gmail.com",
    password: hashPassword,
    firstName: "C",
    lastName: "Codecamp",
    isAdmin: false,
  },
  {
    email: "d@gmail.com",
    password: hashPassword,
    firstName: "D",
    lastName: "Codecamp",
    isAdmin: false,
  },
  {
    email: "e@gmail.com",
    password: hashPassword,
    firstName: "E",
    lastName: "Codecamp",
    isAdmin: false,
  },
];

const category = [
  {
    classification: "นิยาย",
  },
  {
    classification: "จิตวิทยา",
  },
];

const product = [
  {
    name: "ภาพวาดปริศนากับการตามหาฆาตกร",
    author: "อุเก็ตสึ",
    price: 335,
    image:
      "https://res.cloudinary.com/dvvjeo48l/image/upload/v1697874888/m8mgolfjv5yqva8dazx0.webp",
    categoryId: 1,
  },
  {
    name: "คดีฆาตกรรมในบ้านสิบเหลี่ยม",
    author: " อายาสึจิ ยูกิโตะ",
    price: 295,
    image:
      "https://res.cloudinary.com/dvvjeo48l/image/upload/v1697538566/pncuggpvnwzvx4pmdgpm.webp",
    categoryId: 1,
  },
  {
    name: "การผจญภัยของคินดะอิจิ โคสุเกะ 1",
    author: "โยโคมิโซะ เซซิ",
    price: 215,
    image:
      "https://res.cloudinary.com/dvvjeo48l/image/upload/v1697538785/n6kspgjpwfmbglbo0nzc.webp",
    categoryId: 1,
  },
  {
    name: "การผจญภัยของคินดะอิจิ โคสุเกะ 2",
    author: "โยโคมิโซะ เซซิ",
    price: 215,
    image:
      "https://res.cloudinary.com/dvvjeo48l/image/upload/v1697538821/kbahshcvc7tmfcrb9zec.webp",
    categoryId: 1,
  },
  {
    name: "คดีฆาตกรรมในคฤหาสน์แมวดำ",
    author: "อายาสึจิ ยูกิโตะ",
    price: 345,
    image:
      "https://res.cloudinary.com/dvvjeo48l/image/upload/v1697610145/bztoxbpi1jaikkuyag4i.jpg",
    categoryId: 1,
  },
  {
    name: "คดีฆาตกรรมในคฤหาสน์กังหันทดน้ำ",
    author: "อายาสึจิ ยูกิโตะ",
    price: 275,
    image:
      "https://res.cloudinary.com/dvvjeo48l/image/upload/v1700239923/cr4kbdrkckywrhtnfxv1.webp",
    categoryId: 1,
  },
  {
    name: "คฤหาสน์เขาวงกต",
    author: "โยโคมิโซะ เซซิ",
    price: 355,
    image:
      "https://res.cloudinary.com/dvvjeo48l/image/upload/v1700239923/d5zqlv1atypktiseuxl7.webp",
    categoryId: 1,
  },
  {
    name: "คดีฆาตกรรมบนเกาะโกะกุมง (ฉ.ปรับปรุง)",
    author: "โยโคมิโซะ เซซิ",
    price: 275,
    image:
      "https://res.cloudinary.com/dvvjeo48l/image/upload/v1700239923/r8eub6bdbso4hipb4tx7.webp",
    categoryId: 1,
  },
  {
    name: "บอกแล้วไงว่าไม่ได้ฆ่า : หนึ่งคนหัวหาย",
    author: "Karen M. McManus",
    price: 345,
    image:
      "https://res.cloudinary.com/dvvjeo48l/image/upload/v1700239924/doklwm8ucyf8ok8ooni7.webp",
    categoryId: 1,
  },
  {
    name: "บอกแล้วไงว่าไม่ได้ฆ่า : สามคนเพื่อนตาย",
    author: "Karen M. McManus",
    price: 345,
    image:
      "https://res.cloudinary.com/dvvjeo48l/image/upload/v1700239924/u1wnuhgwj9y0rnzviuem.webp",
    categoryId: 1,
  },
];

async function seedDatabase() {
  //   await prisma.user.createMany({ data: user });
  //   await prisma.category.createMany({ data: category });
  await prisma.products.createMany({ data: product });
}

seedDatabase()
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    prisma.$disconnect();
  });
