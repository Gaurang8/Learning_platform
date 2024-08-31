const { PrismaClient } = require('@prisma/client')
const database = new PrismaClient()

async function main() {
  
    try {
        const course = await database.category.createMany({
            data : [
                {name : "Information Technology"},
                {name : "Accounting"},
                {name : "Graphic Design"},
                {name : "Computer Engineering"},
                {name : "Data Analysis"},
                {name : "Creative Writing"},
                {name : "Digital Marketing"},
            ]
        })
    }
    catch (error) {
        console.error(error)
    }
    finally {
        await database.$disconnect()
    }
}

main()



