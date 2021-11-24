const readline = require('readline-sync')
const { courses } = require('./database')


// Lista das opções
const optionsList = [
 " 0 (zero) para listar todos os cursos         ",
 " 1 (um) para adicionar um novo curso          ",
 " 2 (dois) para exibir um curso                ",
 " 3 (tres) para atualizar os dados de um curso ",
 " 4 (quatro) para deletar um curso             "
]

// Input: usuário deve escolher uma opção
console.table(optionsList)
console.log("Digite o número da opção desejada: ")
const userOption = readline.question()

// Função para criar curso
function createCourse() {
  const newCourse = {
    id: 0,
    title: "",
    description: "",
    image: "",
    teacher: "",
    classList: [],
    createdAt: null
  }

  console.log("\nDigite as seguintes informações:")

  console.log("\nTítulo: ")
  newCourse.title = readline.question()

  console.log("\nDescrição: ")
  newCourse.description = readline.question()

  console.log("\nCaminho da imagem: ")
  newCourse.image = readline.question()

  console.log("\nNome do professor: ")
  newCourse.teacher = readline.question()

  const classQuantity = readline.question("\nQuantidade de aulas: ")

  for (let i = 0; i < classQuantity; i++){
    console.log(`\nLink da aula ${i+1}: `)
    newCourse.classList.push(readline.question())
  }

  newCourse.createdAt = new Date()

  newCourse.id = courses.length + 1

  courses.push(newCourse)
}

// Função para mostrar um curso específico pelo ID
function showCourse() {
  const courseId = readline.question("\nQual o ID do curso desejado? ")
  const course = courses.find(item => item.id == courseId)
  console.table([course])
}

// Função para atualizar um curso
// function updateCourse() {
// }

function deleteCourse(){
  const courseId = readline.question("\nQual o ID do curso desejado? ")
  courses = courses.filter(item => item.id == courseId)
  console.log(courses)
}

if (userOption == 0){
  console.table(courses)
} else if (userOption == 1){
  createCourse()
} else if (userOption == 2){
  showCourse()
} else if (userOption == 3){
  return
} else if (userOption == 4){
  deleteCourse()
}

// if (userOption.toLocaleUpperCase() === 'Y') {

//   // printing the available categories without repeating logic
//   const distinctCategories = courses
//     .filter((book, index) => courses
//       .findIndex(firstBook => firstBook.category === book.category) === index)
//     .map(book => book.category)

//   const sortedCategories = distinctCategories.sort()

//   console.log(`\nAvailable categories: `)
//   console.table(sortedCategories)

//   // witch category input and print selected category logic
//   const choice = readline.question(`\nPlease write the chosen category: `)
//   console.table(courses.filter(book => book.category.toLowerCase() === choice.toLowerCase()))
// } else {
//   // printing all courses in order of id
//   console.log('\nEstes são todos os livros disponíveis')
//   console.table(courses.sort((a,b) => a.pages - b.pages))
// }