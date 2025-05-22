import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/utils/prisma';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "mvp";

export async function POST(req: NextRequest) {
    const { login, senha } = await req.json();

    const isEmail = login.includes('@');
    
    const profissional = await prisma.profissional_saude.findFirst({
        where: isEmail 
            ? { email: login }
            : { documento_numero: login },
        include: {
            tipo_documento: true
        }
    });

    if (!profissional || !profissional.senha) {
        return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
    }

    const senhaOk = await bcrypt.compare(senha, profissional.senha);
    if (!senhaOk) {
        return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
    }

    const { senha: _, ...userInfo } = profissional;

    const token = jwt.sign(
        {
            id: profissional.id,
            nome: profissional.nome,
            email: profissional.email,
            documento: profissional.documento_numero,
            tipoDocumento: profissional.tipo_documento?.nome
        },
        SECRET,
        { expiresIn: "8h" }
    );

    return NextResponse.json({ token, user: userInfo });
}