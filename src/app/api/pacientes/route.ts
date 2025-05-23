import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/utils/prisma";
import { calcularIdade } from "@/lib/utils/getIdade";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    if (data.data_nascimento) {
      if (data.data_nascimento.length === 10) { 
        data.data_nascimento = new Date(`${data.data_nascimento}T00:00:00Z`).toISOString();
      } else {
        data.data_nascimento = new Date(data.data_nascimento).toISOString();
      }
      
        data.idade = calcularIdade(new Date(data.data_nascimento));
    }
    
    const paciente = await prisma.paciente.create({
      data
    });
    
    return NextResponse.json(paciente, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar paciente:", error);
    return NextResponse.json(
      { error: "Falha ao cadastrar paciente" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        const filters: Record<string, unknown> = {};
        const nome = searchParams.get("nome");
        const cpf = searchParams.get("cpf");
        const telefone = searchParams.get("telefone");

        if (nome) filters.nome = { contains: nome, mode: "insensitive" };
        if (cpf) filters.cpf = cpf;
        if (telefone) filters.telefone = { contains: telefone, mode: "insensitive" };

        const pacientes = await prisma.paciente.findMany({ where: filters });
        
        const pacientesComIdade = pacientes.map(paciente => ({
          ...paciente,
          idade: paciente.data_nascimento ? calcularIdade(new Date(paciente.data_nascimento)) : null
        }));
        
        return NextResponse.json(pacientesComIdade, { status: 200 });
    } catch (error) {
        console.error("Error: ", error);
        return NextResponse.json({ error: "Não foi possível listar os pacientes" }, { status: 500 });
    }
}