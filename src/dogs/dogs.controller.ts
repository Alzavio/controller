import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";

@Controller('dogs')
export class DogsController {
  private dogs: Dog[] = [
    { id: 1, name: 'Botas', age: 5 },
    { id: 2, name: 'Test2', age: 4 },
  ];

  @Get('')
  getDogs() {
    return this.dogs;
  }

  @Get(':id')
  getDog(@Param('id', ParseIntPipe) id: number) {
    console.log(id)
    const dog = this.dogs.find(dog => dog.id === id)
    if (!dog) {
      return { message: "Dog not found." };
    }
    return dog;
  }

  @Post()
  postDog(@Body() newDog: Omit<Dog, 'id'>) {
    let id: number;
    if (this.dogs.length) {
      id = this.dogs[this.dogs.length - 1].id + 1
    } else {
      id = 1
    }

    const dog: Dog = { id, ...newDog };
    this.dogs.push(dog);
    return dog;
  }

  @Put(':id')
  changeDog(@Param('id', ParseIntPipe) id: number, @Body() updatedDog: Partial<Omit<Dog, 'id'>>) {
    const index = this.dogs.findIndex(dog => dog.id === id);
    if (index == -1) {
      return { message: "Dog not found." };
    }
    this.dogs[index] = { ...this.dogs[index], ...updatedDog };
    return this.dogs[index];
  }
  @Put(':id')
  deleteDog(@Param('id', ParseIntPipe) id: number) {
    const index = this.dogs.findIndex(dog => dog.id === id);
    if (index == -1) {
      return { message: "Dog not found." };
    }
    const deletedDog = this.dogs.splice(index, 1);
    return deletedDog[0];
  }
}
