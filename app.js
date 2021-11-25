const readline = require('readline-sync')
const database = require('./database.json')
const fs = require('fs')
let courses = database

/*===================== criar um curso =====================*/
function createCourse() {
  const newCourse = {
    id: 0,
    title: '',
    description: '',
    image: '',
    teacher: '',
    classesList: [],
    createdAt: null,
    updatedAt: null
  }

  // Criar ID do novo curso (com lógica para verificar lacunas)

  if (courses[0].id != 1) {
    newCourse.id = 1
  } else {
    for (let i = 1; i < courses.length; i++) {
      if (courses[i].id != (i+1)) {
        newCourse.id = (i+1)
      } else {
        newCourse.id = courses.length + 1
      }
    }
  }

  // Armazenar dados de entrada do novo curso
  console.log('\nDigite as seguintes informações:')
  console.log('\nTítulo: ')
  newCourse.title = readline.question()
  console.log('\nDescrição: ')
  newCourse.description = readline.question()
  console.log('\nCaminho da imagem: ')
  newCourse.image = readline.question()
  console.log('\nNome do professor: ')
  newCourse.teacher = readline.question()

  // Receber e verificar o tipo da quantidade de aulas inserida
  let classQuantity = readline.question('\nQuantidade de aulas: ')
  if (isNaN(classQuantity)) {
    while (isNaN(classQuantity)) {
      console.error('ERRO: a quantidade digitada precisa ser um número')
      classQuantity = readline.question('\nQuantidade de aulas: ')
    }
  }

  // Receber e armazenar os links das aulas
  for (let i = 0; i < classQuantity; i++) {
    console.log(`\nLink da aula ${i + 1}: `)
    newCourse.classesList.push(readline.question())
  }

  // Armazenar data da criação do curso
  newCourse.createdAt = new Date()

  // Atualizar o banco de dados (database.json)
  courses.push(newCourse)
  writeJson()

  console.log('\nCurso cadastrado com sucesso!')
  againQuestion()
}

/*============== mostrar um curso específico ===============*/
function showCourse() {
  const courseId = readline.question('\nQual o ID do curso desejado? ')

  // Verificar se o ID digitado não é um número
  if (isNaN(courseId)) {
    console.error('\nERRO: o ID digitado precisa ser um número')
    showCourse()
  } else {
    // Comparar o ID fornecido pelo usuário com os IDs disponíveis no banco de dados
    const course = courses.find(item => item.id == courseId)
    // Verificar se foi encontrado o ID digitado
    if (course == undefined) {
      console.warn(`\nERRO: não existe um curso com o ID ${courseId}`)
      againQuestion()
    } else {
      console.log([course])
      againQuestion()
    }
  }
}

/*==================  atualizar um curso ===================*/
function updateCourse() {
  const courseId = readline.question('\nQual o ID do curso desejado? ')

  // Verificar se o ID digitado não é um número
  if (isNaN(courseId)) {
    console.error('ERRO: o ID digitado precisa ser um número')
    showCourse()
  } else {
    // Comparar o ID fornecido pelo usuário com os IDs disponíveis no banco de dados
    const course = courses.find(item => item.id == courseId)
    const courseIndex = courses.findIndex(item => item.id == courseId)

    // Verificar se foi encontrado o ID digitado
    if (course == undefined) {
      console.warn(`\nERRO: não existe um curso com o ID ${courseId}`)
      againQuestion()
    } else {
      // Armazenar dados de entrada para edição do curso
      console.log('\nDigite as seguintes informações:')
      console.log('\nTítulo: ')
      course.title = readline.question()
      console.log('\nDescrição: ')
      course.description = readline.question()
      console.log('\nCaminho da imagem: ')
      course.image = readline.question()
      console.log('\nNome do professor: ')
      course.teacher = readline.question()

      // Usuário deseja atualizar os links das aulas?
      console.log(`\nLista de aulas do curso ID ${course.id}:`)
      console.table(course.classesList)
      let updateClassQuestion = readline.question(`\nDeseja atualizar os links das aulas do curso "${course.title}"?\nDigite S ou N: `)
      while ((updateClassQuestion.toLowerCase() != "n") && (updateClassQuestion.toLowerCase() != "s")){
        console.log("Opção inválida!")
        updateClassQuestion = readline.question(`Digite S ou N: `)
      }
      switch (updateClassQuestion.toLowerCase()) {
        case 'n':
          break
        case 's':
          // Esvaziar array classesList
          for (let i = course.classesList.length; i > 0; i--) {
            course.classesList.pop()
          }
          // Receber e verificar o tipo do input para quantidade de aulas
          let classQuantity = readline.question('\nQuantidade de aulas: ')
          if (isNaN(classQuantity)) {
            while (isNaN(classQuantity)) {
              console.error('\nERRO: a quantidade digitada precisa ser um número')
              classQuantity = readline.question('Quantidade de aulas: ')
            }
          }
          // Receber e armazenar os links das aulas
          for (let i = 0; i < classQuantity; i++) {
            console.log(`\nLink da aula ${i + 1}: `)
            course.classesList[i] = readline.question()
          }
        default:
          break
      }

      // Armazenar data da criação do curso
      course.updatedAt = new Date()
      courses[courseIndex] = course
      writeJson()

      console.log('Curso atualizado com sucesso!')
      againQuestion()
    }
  }
}

/*==================== deletar um curso ====================*/
function deleteCourse() {
  const courseId = readline.question('\nQual o ID do curso desejado? ')

  // Comparar o ID fornecido pelo usuário com os IDs disponíveis no banco de dados
  const course = courses.find(item => item.id == courseId)
  // Verificar se foi encontrado o ID digitado
  if (course == undefined) {
    console.warn(`\nERRO: não existe um curso com o ID ${courseId}`)
    againQuestion()
  } else {
    const newCourses = courses.filter(item => item.id != courseId)
    courses = newCourses
    writeJson()
    console.log(`\nCurso ID ${courseId} deletado!`)

    againQuestion()
  }
}

/*================= listar todos os cursos =================*/
function listCourses(data) {
  if (data.length == 0){
    console.log('Nenhum curso cadastrado no banco de dados')
  } else {
    console.log(data)
  }
}

/*================== executar a aplicação ==================*/
function app() {
  const optionsList = [
    ' 0 (zero) para listar todos os cursos         ',
    ' 1 (um) para adicionar um novo curso          ',
    ' 2 (dois) para exibir um curso                ',
    ' 3 (tres) para atualizar os dados de um curso ',
    ' 4 (quatro) para deletar um curso             '
  ]

  // Input: usuário deve escolher uma opção
  console.table(optionsList)
  console.log('Digite o número da opção desejada: ')
  const userOption = readline.question()

  // Lógica após a escolha do usuário
  switch (userOption) {
    case '0':
      listCourses(courses)
      againQuestion()
      break
    case '1':
      createCourse()
      break
    case '2':
      showCourse()
      break
    case '3':
      updateCourse()
      break
    case '4':
      deleteCourse()
      break
    default:
      console.error('\nERRO: Opção inválida!')
      app()
  }
}

/*============== atualizar banco de dados ==================*/
function writeJson() {
  courses = courses.sort((a, b) => a.id - b.id)
  fs.readFile('./database.json', 'utf8', function readFileCallback(err, data) {
    if (err) {
      console.log(err)
    } else {
      fs.writeFile(
        './database.json',
        JSON.stringify(courses, null, 2),
        'utf8',
        err => {
          if (err) throw err
        }
      )
    }
  })
}

/*================= executar novamente ? ===================*/
function againQuestion() {
  console.log('\nVoltar ao início?')
  const answer = readline.question("Digite 'S' ou 'N': ")
  if (answer.toLowerCase() === 's') {
    app()
  } else if (answer.toLowerCase() === 'n') {
    console.log('\nAté logo! :)')
    console.log('\n============ Aplicação finalizada ============\n')
    return
  } else {
    console.log('\nOpção inválida!')
    againQuestion()
  }
}

app()