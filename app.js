const readline = require('readline-sync')
const database = require('./database')

let courses = database.courses

/*===================== criar um curso =====================*/
function createCourse() {
  const newCourse = {
    id: 0,
    title: "",
    description: "",
    image: "",
    teacher: "",
    classesList: [],
    createdAt: null,
    modifiedAt: null
  }

  // Criar ID do novo curso
  newCourse.id = courses.length + 1

  // Armazenar dados de entrada do novo curso
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
    newCourse.classesList.push(readline.question())
  }

  // Armazenar data da criação do curso
  newCourse.createdAt = new Date()

  // Enviar o novo curso para o banco de dados
  courses.push(newCourse)
  console.log(courses)

  againQuestion()
}

/*============== mostrar um curso específico ================*/
function showCourse() {
  const courseId = readline.question("\nQual o ID do curso desejado? ")

  // Verificar se o ID digitado não é um número
  if (isNaN(courseId)){
    console.log("ERRO: o ID digitado precisa ser um número")
    showCourse()
  } else {
    // Comparar o ID fornecido pelo usuário com os IDs disponíveis no banco de dados
    const course = courses.find(item => item.id == courseId)
    // Verificar se foi encontrado o ID digitado
    if (course == undefined){
      console.log("ERRO: não existe um curso com este ID")
      againQuestion()
    } else {
      console.table([course])
      againQuestion()
    }
  }
}

/*===================  atualizar um curso ===================*/
function updateCourse() {
  const courseId = readline.question("\nQual o ID do curso desejado? ")

  // Verificar se o ID digitado não é um número
  if (isNaN(courseId)){
    console.log("ERRO: o ID digitado precisa ser um número")
    showCourse()
  } else {
    // Comparar o ID fornecido pelo usuário com os IDs disponíveis no banco de dados
    const course = courses.find(item => item.id == courseId)
    const courseIndex = courses.findIndex(item => item.id == courseId)

    // Verificar se foi encontrado o ID digitado
    if (course == undefined){
      console.log("ERRO: não existe um curso com este ID")
      againQuestion()
    } else {
      // Armazenar dados de entrada para edição do curso
      console.log("\nDigite as seguintes informações:")
      console.log("\nTítulo: ")
      course.title = readline.question()
      console.log("\nDescrição: ")
      course.description = readline.question()
      console.log("\nCaminho da imagem: ")
      course.image = readline.question()
      console.log("\nNome do professor: ")
      course.teacher = readline.question()
        
      const classQuantity = readline.question("\nQuantidade de aulas: ")
      for (let i = 0; i < classQuantity; i++){
        console.log(`\nLink da aula ${i+1}: `)
        course.classesList[i] = readline.question()
      }

      // Armazenar data da criação do curso
      course.updatedAt = new Date()

      courses[courseIndex] = course
      againQuestion()
    }
  }

}

/*==================== deletar um curso ====================*/
function deleteCourse() {
  const courseId = readline.question("\nQual o ID do curso desejado? ")

  // Comparar o ID fornecido pelo usuário com os IDs disponíveis no banco de dados
  const course = courses.find(item => item.id == courseId)
  // Verificar se foi encontrado o ID digitado
  if (course == undefined){
    console.log("ERRO: não existe um curso com este ID")
    againQuestion()
  } else {
    const newCourses = courses.filter(item => item.id != courseId)
    courses = newCourses
    console.log(`\nCurso ID ${courseId} deletado!`)
    console.log(courses)
    againQuestion()
  }

}

/*================== executar a aplicação ==================*/
function app() {

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

  // Lógica após a escolha do usuário
  if (userOption == 0){
    console.table(courses)
    againQuestion()
  } else if (userOption == 1){
    createCourse()
  } else if (userOption == 2){
    showCourse()
  } else if (userOption == 3){
    updateCourse()
  } else if (userOption == 4){
    deleteCourse()
  }
}

/*================= executar novamente ? ===================*/
function againQuestion() {
  console.log("\nDeseja executar novamente?")
  const answer = readline.question("Digite 'S' ou 'N'")
  if (answer.toLowerCase() === "s"){
    app()
  } else if (answer.toLowerCase() === "n"){
    console.log('\nAté logo! :)')
    return
  } else {
    console.log("\nOpção inválida")
    againQuestion()
  }
}

app()