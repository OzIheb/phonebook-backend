const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(express.json());

app.use(cors());

app.use(morgan(":method :url :status :response-time ms :req[content-length]"));

let data = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(data);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`app is running on ${PORT}`);
});

app.get("/info", (request, response) => {
  const entriesNb = data.length;
  date = new Date();
  response.send(`Phonebook has info for ${entriesNb} people
                 
                ${date}`);
});

app.get("/api/persons/:id", (request, response) => {
  id = Number(request.params.id);
  note = data.find((note) => note.id === id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end("not found");
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  data = data.filter((note) => note.id !== id);
  response.status(204).end();
});

const generateId = () => Math.random() * 1000;
app.post("/api/persons", (request, response) => {
  const body = request.body;
  console.log(body);

  if (!body.name || !body.number) {
    return response.status(400).json({ error: "name or number is missing" });
  }

  const nameChecker = data.find((user) => user.id === body.name);
  console.log(nameChecker);

  const note = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };
  data = data.concat(note);
  response.json(data);
});
