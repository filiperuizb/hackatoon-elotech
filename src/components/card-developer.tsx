import { DeveloperProps } from "@/types/developer";
import Image from "next/image";
import Link from "next/link";
import { FaLinkedin, FaGithub } from "react-icons/fa";

export default function CardDeveloper(dados: DeveloperProps) {
  return (
    <div className="group relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-green-500 rounded-xl blur opacity-30 group-hover:opacity-70 transition duration-1000 group-hover:duration-300 animate-pulse-slow"></div>
      <div className="relative flex flex-col items-center px-6 py-8 bg-gradient-to-b from-purple-950/80 to-black/90 rounded-xl border border-purple-500/20 group-hover:border-green-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/20 backdrop-blur-md w-72 h-80">
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-500/10 to-purple-500/10 rounded-full blur-xl -translate-y-1/4 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-green-500/10 to-purple-500/10 rounded-full blur-xl translate-y-1/4 -translate-x-1/4"></div>

        <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-4 opacity-0 group-hover:opacity-100 group-hover:-translate-y-5 transition-all duration-500 ease-out z-10">
          {dados.linkedin && (
            <Link
              href={dados.linkedin}
              target="_blank"
              className="relative flex items-center justify-center h-10 w-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full shadow-lg group-hover:shadow-purple-500/30 transition-all duration-300 hover:scale-110"
              aria-label={`LinkedIn profile of ${dados.nome}`}
            >
              <div className="absolute inset-0.5 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full blur opacity-50"></div>
              <FaLinkedin className="h-5 w-5 text-white relative z-10" />
            </Link>
          )}

          {dados.github && (
            <Link
              href={dados.github}
              target="_blank"
              className="relative flex items-center justify-center h-10 w-10 bg-gradient-to-br from-green-500 to-green-700 rounded-full shadow-lg group-hover:shadow-green-500/30 transition-all duration-300 hover:scale-110"
              aria-label={`GitHub profile of ${dados.nome}`}
            >
              <div className="absolute inset-0.5 bg-gradient-to-br from-green-500 to-green-700 rounded-full blur opacity-50"></div>
              <FaGithub className="h-5 w-5 text-white relative z-10" />
            </Link>
          )}
        </div>

        <div className="relative w-36 h-36 mb-6 transform group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-500 ease-out">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 via-green-500 to-purple-600 animate-spin-slow opacity-70 blur-sm"></div>

          <div className="absolute inset-1 rounded-full overflow-hidden border-2 border-white/10 shadow-inner shadow-black/50">
            {/* <div className="absolute inset-0 bg-gradient-to-b from-purple-500/20 to-green-500/20 group-hover:opacity-70 transition-opacity duration-300 z-10"/> */}
            <Image
              className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-3"
              src={dados.srcImage || "/placeholder.svg"}
              width={1000}
              height={1000}
              alt={dados.nome || "Developer"}
            />
          </div>

          <div className="absolute inset-1 rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out"></div>
          </div>
        </div>

        <div className="text-center z-10 transform transition-all duration-500 group-hover:-translate-y-2">
          <h3 className="text-xl font-bold bg-gradient-to-r from-green-400 to-purple-400 bg-clip-text text-transparent group-hover:from-green-300 group-hover:to-purple-300 transition-all duration-300 tracking-wide code-bold mb-2">
            {dados.nome}
          </h3>

          <div className="relative">
            <p className="code-bold text-white/80 group-hover:text-white transition-colors duration-300 text-sm">
              {dados.papel}
            </p>
            <div className="h-0.5 w-0 bg-gradient-to-r from-purple-500 to-green-500 rounded-full mx-auto group-hover:w-full transition-all duration-500 mt-1"></div>
          </div>
        </div>
      </div>
    </div>
  )
}