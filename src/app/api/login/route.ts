import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/utils/prisma';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "mvp";

export async function POST(req: NextRequest) {
    const { email, senha } = await req.json();

    const profissional = await prisma.profissional_saude.findFirst({
        where: { email },
        select: { id: true, nome: true, email: true, senha: true }
    });

    if (!profissional || !profissional.senha) {
        return NextResponse.json({ error: "Email ou senha inválidos" }, { status: 401 });
    }

    const senhaOk = await bcrypt.compare(senha, profissional.senha);
    if (!senhaOk) {
        return NextResponse.json({ error: "Email ou senha inválidos" }, { status: 401 });
    }

    const token = jwt.sign(
        { id: profissional.id, email: profissional.email, nome: profissional.nome },
        SECRET,
        { expiresIn: "8h" }
    );

    return NextResponse.json({ token });
}