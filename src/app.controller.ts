import { Controller, Get, Post, Render, Query, Body} from '@nestjs/common';
import { AppService } from './app.service.js';
import CreateProductDto from './create-product.dto.js';

interface Product {
  name: string,
  category: string,
  price: number,
  stock: number
}

const termekek: Array<Product> = [
  {
    "name": "Vezeték nélküli egér",
    "category": "elektronika",
    "price": 8990,
    "stock": 12
  },
  {
    "name": "Programozás kezdőknek",
    "category": "könyv",
    "price": 6490,
    "stock": 4
  },
  {
    "name": "Mechanikus billentyűzet",
    "category": "elektronika",
    "price": 24990,
    "stock": 3
  },
  {
    "name": "Fekete kapucnis pulóver",
    "category": "ruházat",
    "price": 12990,
    "stock": 8
  },
  {
    "name": "Catan társasjáték",
    "category": "játék",
    "price": 11990,
    "stock": 0
  },
  {
    "name": "USB-C töltőkábel",
    "category": "elektronika",
    "price": 4990,
    "stock": 25
  },
  {
    "name": "Adidas sportcipő",
    "category": "ruházat",
    "price": 27990,
    "stock": 2
  },
  {
    "name": "A kis herceg",
    "category": "könyv",
    "price": 3990,
    "stock": 15
  },
  {
    "name": "LEGO City rendőrségi állomás",
    "category": "játék",
    "price": 34990,
    "stock": 5
  },
  {
    "name": "Bluetooth hangszóró",
    "category": "elektronika",
    "price": 15990,
    "stock": 7
  }
];
const categories: Array<string> = [];
termekek.forEach(element => {
  if (!categories.includes(element.category)) {
    categories.push(element.category)
  }
});

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/")
  @Render('index')
  getHello() {
    return {
      title: 'Terméklista',
      table: termekek.sort((a,b): number => {return a.price - b.price})
    }
  }

  @Get("/filter")
  @Render("filter")
  getFilter(@Query('category') category: string) {
    return {
      title: 'Filter',
      table: termekek
        .filter((element) => {if (category) {
          return element.category == category
        } else {
          return element.category == categories[0]
        }})
        .sort((a,b): number => {return b.stock - a.stock}),
      categories: categories,
      selectedCategory: category
    }
  }

  @Get("/new")
  @Render("new")
  getNew() {
    return {
      title: 'Felvétel',
      categories: categories,
      success: false
    }
  }

  @Post("/new")
  @Render('new')
  createNewProduct(@Body() createProductDto: CreateProductDto) {
    const ujTermek: Product = {
      name: createProductDto.name,
      category: createProductDto.category,
      price: Number(createProductDto.price),
      stock: Number(createProductDto.stock)
    };
    termekek.push(ujTermek);

    return {
      title: 'Felvétel',
      categories: categories,
      success: true // Sikeres felvitel jelzése a sablonnak
    };
  }
}
