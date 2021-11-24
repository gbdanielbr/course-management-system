const readline = require('readline-sync')
const { courses } = require('./database')

/*============ Função para criar um curso ============*/
function createCourse() {
  const newCourse = {
    id: 0,
    title: "",
    description: "",
    image: "",
    teacher: "",
    classList: [],
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
    newCourse.classList.push(readline.question())
  }

  // Armazenar data da criação do curso
  newCourse.createdAt = new Date()

  // Enviar o novo curso para o banco de dados
  courses.push(newCourse)
}

/*============ Função para mostrar um curso específico ============*/
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

/*============ Função para atualizar um curso ============*/
// function updateCourse() {
// }

/*============ Função para deletar um curso ============*/
function deleteCourse() {
  const courseId = readline.question("\nQual o ID do curso desejado? ")
  courses.filter(item => item.id == courseId)
  console.log(courses)
}

/*============ Função para executar a aplicação ============*/
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
  } else if (userOption == 1){
    createCourse()
  } else if (userOption == 2){
    showCourse()
  } else if (userOption == 3){
    return
  } else if (userOption == 4){
    deleteCourse()
  }
}

/*====== Função para perguntar se o usuário deseja executar novamente ======*/
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