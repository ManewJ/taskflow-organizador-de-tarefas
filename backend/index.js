const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Conectando ao MongoDB (serviço 'db' do docker-compose)
mongoose.connect('mongodb://db:27017/taskflow')
  .then(() => console.log('Conectado ao MongoDB com sucesso!'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Modelo da Tarefa
const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false }
});
const Task = mongoose.model('Task', TaskSchema);

// --- ROTAS DO CRUD ---

// 1. LISTAR TAREFAS (READ)
app.get('/tarefas', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: "Erro ao buscar tarefas" });
    }
});

// 2. CRIAR TAREFA (CREATE) - Com Validação
app.post('/tarefas', async (req, res) => {
    const { title } = req.body;

    // Trava de segurança: impede títulos vazios
    if (!title || title.trim() === "") {
        return res.status(400).json({ message: "O título da tarefa é obrigatório!" });
    }

    try {
        const newTask = new Task({ title, completed: false });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ message: "Erro ao salvar no banco de dados" });
    }
});

// 3. ATUALIZAR TAREFA (UPDATE: Status ou Texto)
app.patch('/tarefas/:id', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        if (!updatedTask) return res.status(404).json({ message: "Tarefa não encontrada" });
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: "Erro ao atualizar tarefa" });
    }
});

// 4. DELETAR TAREFA (DELETE)
app.delete('/tarefas/:id', async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) return res.status(404).json({ message: "Tarefa não encontrada" });
        res.json({ message: "Tarefa removida com sucesso!" });
    } catch (err) {
        res.status(400).json({ message: "Erro ao deletar tarefa" });
    }
});

// Inicialização do servidor
const PORT = 5000;
app.listen(PORT, () => console.log(`Backend TaskFlow rodando na porta ${PORT}`));