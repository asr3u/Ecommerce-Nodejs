var User = require('../models/User');
var Category = require('../models/Category');
var Department = require('../models/Department');
const fetch = require('node-fetch');
const fs = require('fs')
var Product = require('../models/Product');
var Variant = require('../models/Variant');
var mongoose = require('mongoose');
const mongoConfig = require('../configs/mongo-config')
const path = require('path')
const uuidv4 = require('uuid/v4')
const url = require('url');
//mongoose.connect('mongodb://localhost/shoppingApp');
//mongoose.connect('mongodb://localhost/myShoppingApp3', { useNewUrlParser: true, useCreateIndex: true, });
mongoose.connect(mongoConfig, { useNewUrlParser: true, useCreateIndex: true, });

const imagesDir = process.env.IMGES_DIR
let imageServerURL = process.env.IMAGE_SERVER_URL
if (imageServerURL.endsWith('/'))
  imageServerURL = imageServerURL.slice(0, - 1);

if (!imagesDir || !imageServerURL) {
  console.error('ERROR: IMGES_DIR and IMAGE_SERVER_URL environment vars must be set')
  process.exit(1)
}

if (!fs.existsSync(imagesDir))
  fs.mkdirSync(imagesDir)

function fetchImage(imageURL, destDir, baseURL) {
  const image_name = uuidv4() + '.jpg'
  const dest = path.join(destDir, image_name)
  const errorHandler = () => {
    console.error(`ERROR: can't fetch ${imageURL}`)
    // process.exit(1)
  }
  fetch(imageURL).then(res => {
    if (res.status != 200) errorHandler()
    const out = fs.createWriteStream(dest)
    res.body.pipe(out).on('error', errorHandler)
  }).catch(errorHandler)
  return [`${baseURL}/${image_name}`, dest]
}

var categories =
  [
    new Category({
      categoryName: 'Basics'
    }),
    new Category({
      categoryName: 'Blazer'
    }),
    new Category({
      categoryName: 'Knitwear'
    }),
    new Category({
      categoryName: 'Jeans'
    }),
    new Category({
      categoryName: 'Jackets'
    })
  ]

for (let i = 0; i < categories.length; i++) {
  categories[i].save(function (e, r) {
    if (i === categories.length - 1) {
      exit();
    }
  });
}

var departments =
  [
    new Department({
      departmentName: 'Women',
      categories: 'Basics,Blazer'

    }),
    new Department({
      departmentName: 'Men',
      categories: 'Knitwear,Jeans,Jackets'
    })
  ]

for (let i = 0; i < departments.length; i++) {
  departments[i].save(function (e, r) {
    if (i === departments.length - 1) {
      exit();
    }
  });
}

var products =
  [
    new Product({
      _id: "5bedf31cc14d7822b39d9d43",
      imagePath: 'https://static.zara.net/photos///2018/I/0/1/p/7568/644/802/2/w/1920/7568644802_1_1_1.jpg?ts=1541152091085',
      title: 'Oversized Textured Top',
      description: 'High collar top with short cuffed sleeves. Asymmetric hem with side slits.',
      price: 35.95,
      color: 'Gray',
      size: 'XS,S,M',
      quantity: 10,
      department: 'Women',
      category: 'Basics',
    }),
    new Product({
      _id: "5bedf3b9c14d7822b39d9d45",
      imagePath: 'https://static.zara.net/photos///2018/I/0/1/p/5644/641/800/2/w/1920/5644641800_2_5_1.jpg?ts=1540395699528',
      title: 'Tank Top',
      description: 'Flowy V-neck camisole with spaghetti straps.',
      price: 29.99,
      color: 'Black',
      size: 'XS,S,XL',
      quantity: 15,
      department: 'Women',
      category: 'Basics',
    }),
    new Product({
      _id: "5bedf448c14d7822b39d9d47",
      imagePath: 'https://static.zara.net/photos///2018/I/0/1/p/7568/469/251/2/w/1920/7568469251_2_1_1.jpg?ts=1540393989160',
      title: 'Basic Top',
      description: 'Round neck long sleeved shirt. ',
      price: 25.99,
      color: 'White',
      size: 'XS',
      quantity: 90,
      department: 'Women',
      category: 'Basics',
    }),
    new Product({
      _id: "5bedf55bc14d7822b39d9d4b",
      imagePath: 'https://static.zara.net/photos///2018/I/0/1/p/8197/757/093/4/w/1920/8197757093_2_2_1.jpg?ts=1538393944729',
      title: 'Belted Plaid Blazer',
      description: 'Flowy blazer with lapel collar and long sleeves. Self belt. Chest patch pockets and welt pockets at hip. Front double-breasted button closure.',
      price: 79.99,
      color: 'Black',
      size: 'S,M,L',
      quantity: 4,
      department: 'Women',
      category: 'Blazer',
    }),
    new Product({
      _id: "5bedf5eec14d7822b39d9d4e",
      imagePath: 'https://static.zara.net/photos///2018/I/0/2/p/1775/300/615/2/w/1920/1775300615_1_1_1.jpg?ts=1539690384503',
      title: 'Perl Knit Swear',
      description: 'Purl-stitch knit sweater in a combination of textures. Ribbed trim.',
      price: 79.99,
      color: 'Orange',
      size: 'M,L',
      quantity: 5,
      department: 'Men',
      category: 'Knitwear',
    }),
    new Product({
      _id: "5bedf6b5c14d7822b39d9d51",
      imagePath: 'https://static.zara.net/photos///2018/I/0/2/p/6186/352/407/2/w/1920/6186352407_2_1_1.jpg?ts=1540990017618',
      title: 'Ripped Jeans',
      description: 'Slim fit jeans with five pockets, washed effect, and rips on the legs. Zippered hem at in-seams. Front zip and metal button closure.',
      price: 79.99,
      color: 'Dark Blue',
      size: 'M,L',
      quantity: 80,
      department: 'Men',
      category: 'Jeans',
    }),
    new Product({
      _id: "5bedf720c14d7822b39d9d52",
      imagePath: 'https://static.zara.net/photos///2018/I/0/2/p/5575/380/406/2/c-158-0-2048-3072/w/1920/5575380406_1_1_1.jpg?ts=1527530663760',
      title: 'Basic Slim Jeans',
      description: 'Basic slim-fit jeans with five pockets. Two side pockets, two back pockets, and one coin pocket. Belt loops. Front hidden zipper and button closure.',
      price: 45.99,
      color: 'Light Blue',
      size: 'XS,S,M',
      quantity: 8,
      department: 'Men',
      category: 'Jeans',
    }),
    new Product({
      _id: "5bedf7ecc14d7822b39d9d55",
      imagePath: 'https://static.zara.net/photos///2018/I/0/2/p/3548/350/700/2/c-192-0-2048-3072/w/1920/3548350700_2_1_1.jpg?ts=1528819649601',
      title: 'Faux Leather Perforated Jacket',
      description: 'Faux leather perforated jacket with high collar and long sleeves. Two front zip pockets. Lined. Interior pocket. Front zip closure. Ribbed elastic hem and cuffs.',
      price: 99.99,
      color: 'Brown',
      size: 'XS,M,XL',
      quantity: 12,
      department: 'Men',
      category: 'Jackets',
    }),
    new Product({
      _id: "5bedf7ecc14d7822b39d9e78",
      imagePath: 'https://turntable.kagiso.io/images/animal-animal-photography-cat-96938.width-800.jpg',
      title: '!h1Dd3N####pR0duC7%',
      description: '!sdX#!S#!Fl4G|C4tK3ybrdPAsswd!',
      department: '!h1Dd3N#'
    })
  ];


for (let i = 0; i < products.length; i++) {
  const product = products[i]
  const [externalImgURL, localImgURL] = fetchImage(product.imagePath, imagesDir, imageServerURL)
  console.log(`${product.imagePath} fetched to ${localImgURL} and server on ${externalImgURL}`)
  product.imagePath = externalImgURL
  product.save(function (e, r) {
    if (i === products.length - 1) {
      exit();
    }
  });
}

var variants =
  [
    new Variant({
      productID: '5bedf31cc14d7822b39d9d43',
      imagePath: 'https://static.zara.net/photos///2018/I/0/1/p/7568/644/710/2/w/1920/7568644710_1_1_1.jpg?ts=1541151891840',
      color: 'Beige',
      size: 'S,L',
      quantity: 5,
    }),
    new Variant({
      productID: '5bedf3b9c14d7822b39d9d45',
      imagePath: 'https://static.zara.net/photos///2018/I/0/1/p/5644/641/735/2/w/1920/5644641735_2_5_1.jpg?ts=1540395590656',
      color: 'Copper',
      size: 'S,L,XL',
      quantity: 12,
    }),
    new Variant({
      productID: '5bedf448c14d7822b39d9d47',
      imagePath: 'https://static.zara.net/photos///2018/I/0/1/p/7568/469/605/2/w/1920/7568469605_2_1_1.jpg?ts=1540394095062',
      color: 'Maroon',
      size: 'XS,M,L',
      quantity: 4,
    }),
    new Variant({
      productID: '5bedf448c14d7822b39d9d47',
      imagePath: 'https://static.zara.net/photos///2018/I/0/1/p/7568/469/822/2/w/1920/7568469822_2_1_1.jpg?ts=1540394193241',
      color: 'Charcool',
      size: 'XS,L,XL',
      quantity: 5,
    }),
    new Variant({
      productID: '5bedf5eec14d7822b39d9d4e',
      imagePath: 'https://static.zara.net/photos///2018/I/0/2/p/1775/300/806/2/w/1920/1775300806_2_1_1.jpg?ts=1539690394197',
      color: 'Stone',
      size: 'S,XL',
      quantity: 35,
    }),
    new Variant({
      productID: '5bedf720c14d7822b39d9d52',
      imagePath: 'https://static.zara.net/photos///2018/I/0/2/p/5575/380/407/2/c-269-0-2048-3072/w/1920/5575380407_1_1_1.jpg?ts=1527602989905',
      color: 'Dark Blue',
      size: 'M,XL',
      quantity: 5,
    })

  ];

for (let i = 0; i < variants.length; i++) {
  variants[i].save(function (e, r) {
    if (i === variants.length - 1) {
      exit();
    }
  });
}

var newUser = new User({
  email: 'admin@admin.com',
  password: 'C4tK3ybrdPAsswd',
  fullname: 'The administrator',
  admin: true
});
User.createUser(newUser, function (err, user) {
  if (err) throw err;
  console.log(user);
});

function exit() {
  mongoose.disconnect();
}
