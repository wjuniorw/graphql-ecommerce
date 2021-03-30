import mongoose, { ConnectionOptions } from 'mongoose'

const {
  MONGO_HOST,
  MONGO_PORT,
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_DATABASE,
} = process.env

const MONGO_OPTIONS: ConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

const DB_URI = `mongodb://${MONGO_USERNAME}:${encodeURIComponent(MONGO_PASSWORD)}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`

try {
  mongoose.connect(DB_URI, MONGO_OPTIONS)
}
catch (e) {
  console.log('<====mongoDB connection error====>', e.message)
}

mongoose.Promise = global.Promise

const db = mongoose.connection

db.on('open', () => {
  console.log('conectado ao db...')
})
db.on('close', () => {
  console.log('conexao com o DB encerrada!')
  process.exit(0)
})

export default mongoose
