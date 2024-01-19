const prisma = require("../importPrisma");

let userId;
// In CreateTasks.js
exports.AssociationMessageId = function (userIdParam) {
  userId = userIdParam;
};

exports.create = async (req, res) => {
  try {
    const { name, email, task } = req.body;
    const subject = task;

    const dataTasks = { name, email, subject, userId };
    const createTasks = await prisma.createMessages.create({
      data: dataTasks, // Corrija aqui para passar o objeto dataTasks
    });
  } catch (error) {
    // Lide com o erro aqui
    console.error("Erro ao criar mensagem:", error);
  }
};

exports.getTasks = async (req, res) => {
  try {
    const { search } = req.query;
    const id = userId;
    const filter = {
      userId: {
        equals: id,
      },
      name: {
        startsWith: search || "",
      },
    };
    const dataTasks = await prisma.createMessages.findMany({
      where: filter,
    });

    const messagesToDelete = await prisma.createMessages.findMany({
      where: {
        userId: null,
      },
    });

    for (const message of messagesToDelete) {
      await prisma.createMessages.delete({
        where: {
          id: message.id,
        },
      });
    }

    console.log("dados resgatados de mensagem ", dataTasks);
    res.json(dataTasks);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  } finally {
    await prisma.$disconnect();
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.taskSelected;

    const id = parseInt(taskId, 10);

    const deletetask = await prisma.createMessages.delete({
      where: {
        id: id,
      },
    });
    res.status(204).send(); // Responder com status 204 ("No Content") para indicar sucesso sem conteúdo
  } catch (error) {
    console.error("Erro ao remover a tarefa:", error);
    res.status(500).send("Erro interno do servidor");
  }
};

exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const dataUpdate = req.body;
    console.log("dataUpdate", dataUpdate);
    const id = parseInt(taskId, 10);

    const updatedTask = await prisma.createMessages.update({
      where: { id: id },
      data: dataUpdate,
    });
    res.status(200).send(); // Responder com status 204 ("No Content") para indicar sucesso sem conteúdo
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar a tarefa" });
  }
};
