

const express = require ('express')
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const app = express()


app.use(cors())
app.use(express.json())
const logger = require('./loggerMiddlewares')


app.use(logger)

let notes =[
    {
      "id": 1,
      "content": "Aprender Node.js es divertido",
      "date": "2024-08-12T14:30:00Z",
      "important": true
    },
    {
      "id": 2,
      "content": "Practicar JavaScript a diario",
      "date": "2024-08-13T10:15:00Z",
      "important": false
    },
    {
      "id": 3,
      "content": "Leer sobre arquitectura de software",
      "date": "2024-08-14T16:45:00Z",
      "important": true
    },

    {
      "id": 4,
      "content": "Leer sobre arquitectura de software",
      "date": "2024-08-14T16:45:00Z",
      "important": false
    },
    {
        "id": 5,
        "content": "Leer sobre arquitectura de software",
        "date": "2023-08-14T16:45:00Z",
        "important": true
    },

    {
        "id": 6,
        "content": "Aprender Node",
        "date": "2023-05-14T16:45:00Z",
        "important": true
    }

  ]

app.get('/', (request, response) => {
    response.send('<h1>Hello world</h1>')

})

app.get('/api/notes', (request, response) => {
    response.json(notes)

})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find (note => note.id === id)
    if (note){
        response.json(note)
    }
    else
        response.status(404).end()

})

app.post('/api/notes', (request, response) => {
  const note = request.body
  if(!note || !note.content){
    response.status(400).json({error:'Note content is missing'})
  }
  const NewNote = {
    id:uuidv4(),
    content: note.content,
    date: new Date().toISOString(),
    important: typeof note.important !== 'undefined' ? note.important : false
  }

  notes = [...notes, NewNote] //agrego la nueva nota

  response.status(201).json(NewNote)

})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter (note => note.id !== id)//aca guardamos todas menos la q eliminamos
    response.status(204).end()
})




// Manejador de eventos para errores del servidor
app.on('error', (err) => {
    console.error('Server error:', err);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
