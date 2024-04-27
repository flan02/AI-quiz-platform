



export interface User {
  id: string
  email: string
  name?: string
  fullname: string
  image: string
  sub: string
}

export type type_mcqQuestion = {
  question: string
  answer: string
  choices: {
    option1: string
    option2: string
    option3: string
    option4: string
  }
}

export type type_openEnded = {
  question: string
  answer: string
}