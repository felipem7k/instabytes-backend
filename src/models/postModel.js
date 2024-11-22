// Importa as dependências necessárias
import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Conecta ao banco de dados usando a string de conexão do ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para obter todos os posts do banco de dados
export async function getTodosPosts() {
    // Seleciona o banco de dados "instabyte"
    const db = conexao.db("instabyte");
    // Seleciona a coleção "posts"
    const colecao = db.collection("posts");
    // Retorna todos os documentos da coleção como um array
    return colecao.find().toArray();
};

export async function criarPost(novoPost) {
    // Seleciona o banco de dados "instabyte"
    const db = conexao.db("instabyte");
    // Seleciona a coleção "posts"
    const colecao = db.collection("posts");
    // Inserir POST no banco de dados
    return colecao.insertOne(novoPost);
};

export async function atualizarPost(id, post) {
    const db = conexao.db("instabyte");
    const colecao = db.collection("posts");
    const idObjeto = ObjectId.createFromHexString(id);
    
    return colecao.updateOne({
        _id: new ObjectId(idObjeto),
    },{
        $set: post
    });
};
