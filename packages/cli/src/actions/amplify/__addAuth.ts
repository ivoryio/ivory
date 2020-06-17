/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { spawn, ChildProcess, stream } from 'child_process'

export const amplifyAddAuth = (): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const addProcess = spawn('amplify', ['add', 'auth'])
    const ENTER = '\n'
    const DOWN_ARROW = '\u001b\u005B\u0042'

    const qas = [
      { question: 'Do you want to use the default authentication', answer: ENTER },
      { question: 'How do you want users to be able to sign in?', answer: DOWN_ARROW + ENTER },
      { question: 'Do you want to configure advanced settings?', answer: ENTER },
    ]

    answerChildProcessQuestions({ childProcess: addProcess, qas })

    addProcess.stderr.on('data', (data: stream.Readable) => {
      reject(`Auth integration failed: ${data}`)
    })

    addProcess.on('exit', function () {
      resolve()
    })
  })
}

export function answerChildProcessQuestions({ childProcess, qas }: ChildQAParametersInterface) {
  const alreadyAnswered = qas.map(() => false)

  childProcess!.stdout!.on('data', (data: stream.Readable) => {
    qas.forEach(({ question }, index) => {
      if (`${data}`.indexOf(question) > 0) {
        answer(index, `${data}`)
      }
    })
  })

  function answer(index: number, message: string) {
    if (!alreadyAnswered[index]) {
      setTimeout(() => {
        childProcess!.stdin!.write(qas[index].answer)
        alreadyAnswered[index] = true
      }, 100)
    } else {
      console.log(message)
    }
  }
}

interface ChildQAParametersInterface {
  childProcess: ChildProcess
  qas: Array<QA>
}

interface QA {
  question: string
  answer: string
}
