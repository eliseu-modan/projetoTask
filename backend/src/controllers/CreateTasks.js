const e = require("cors");
const prisma = require("../importPrisma");

const io = require("socket.io")(6060, {
  cors: {
    origin: "*",
  },
});

let userId;
exports.AssociationMessageId = function (userIdParam) {
  userId = userIdParam;
};

exports.create = async (req, res) => {
  try {
    const { name, email, task, dateInitial, dateFinally, permanent } = req.body;

    const dataConcluided = null;
    console.log("permanent", permanent);
    const subject = task;
    const dataTasks = {
      name,
      email,
      subject,
      userId,
      dateInitial,
      dateFinally,
      dataConcluided,
      permanent,
    };
    console.log("dataTasks", dataTasks);
    await prisma.createMessages.create({
      data: dataTasks,
    });

    io.emit("update task");
  } catch (error) {
    console.log("Erro ao criar mensagem:", error);
  }
};

exports.getTasks = async (req, res) => {
  try {
    const { search } = req.query;
    const id = userId;

    const filter = {
      AND: [
        {
          userId: { equals: id },
        },
        {
          name: { startsWith: search || "" },
        },
        {
          dataConcluided: { equals: null },
        },
        {
          permanent: { equals: false },
        },
      ],
    };

    const dataTasks = await prisma.createMessages.findMany({
      where: filter,
    });

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
    res.status(204).send();
  } catch (error) {
    console.error("Erro ao remover a tarefa:", error);
    res.status(500).send("Erro interno do servidor");
  }
};

exports.concluidedTask = async (req, res) => {
  try {
    const taskConcluide = req.params.taskSelected;
    const ids = parseInt(taskConcluide, 10);
    console.log("id chegou no backend", taskConcluide);

    const resultado = await prisma.createMessages.update({
      where: { id: ids },
      data: {
        dataConcluided: new Date(),
      },
    });

    io.emit("update task");
    res.status(204).send();
  } catch (error) {
    console.error("Erro ao concluir a tarefa:", error);
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
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar a tarefa" });
  }
};

exports.getTasksConcluided = async (req, res) => {
  try {
    const dataConcluided = await prisma.createMessages.findMany({
      where: {
        userId: userId,
        dataConcluided: {
          not: null,
        },
      },
    });

    res.json(dataConcluided);
  } catch (error) {
    console.error("Erro ao buscar tarefas concluídas:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

exports.getTasksPermanent = async (req, res) => {
  try {
    const dataPermanents = await prisma.createMessages.findMany({
      where: {
        userId: userId,
        permanent: true,
      },
    });
    console.log("dataPermanents", dataPermanents);

    res.json(dataPermanents);
  } catch (error) {
    console.error("Erro ao buscar tarefas concluídas:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};
