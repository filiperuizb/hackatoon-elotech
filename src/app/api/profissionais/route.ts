import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/utils/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    const hashedPassword = await bcrypt.hash(data.senha, 10);
    
    const profissional = await prisma.profissional_saude.create({
      data: {
        nome: data.nome,
        email: data.email,
        senha: hashedPassword,
        data_nascimento: data.data_nascimento,
        documento_numero: data.documento_numero,
        tipo_documento_id: data.tipo_documento_id,
        especialidade_id: data.especialidade_id
      },
    });
    
    const { senha: _, ...profissionalSemSenha } = profissional;
    
    return NextResponse.json(profissionalSemSenha, { status: 201 });
  } catch (error: any) {
    console.error("Não foi possível criar o profissional -> ", error);
    
    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      return NextResponse.json(
        { error: "Este email já está em uso" }, 
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Erro ao criar profissional" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const profissionais = await prisma.profissional_saude.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        documento_numero: true,
        tipo_documento: true,
        especialidade: true,
        data_nascimento: true
      }
    });
    return NextResponse.json(profissionais);
  } catch (error) {
    console.error("Erro ao listar profissionais:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}