export function formatCPF(cpf: string): string {
  if (!cpf) return ""

  const cpfClean = cpf.replace(/\D/g, "")

  if (cpfClean.length !== 11) return cpf

  return cpfClean.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
}

export function formatTelefone(telefone: string): string {
  if (!telefone) return ""

  const tel = telefone.replace(/\D/g, "")

  if (tel.length < 10) return telefone

  if (tel.length === 11) {
    return tel.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2$3-$4")
  }

  return tel.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3")
}

export function formatCRM(crm: string): string {
  if (!crm) return ""

  const crmClean = crm.replace(/\D/g, "")

  if (crmClean.length < 5) return `CRM ${crm}`

  return `CRM ${crmClean.replace(/(\d{3})(\d{3})/, "$1.$2")}`
}

export function formatDate(dateString: string | Date): string {
  if (!dateString) return ""

  const date = new Date(dateString)

  if (isNaN(date.getTime())) return String(dateString)

  return date.toLocaleDateString("pt-BR")
}

export function formatTime(timeString: string): string {
  if (!timeString) return ""

  if (timeString.includes("T")) {
    const date = new Date(timeString)
    return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
  }

  return timeString.substring(0, 5)
}

export function formatCEP(cep: string): string {
  if (!cep) return ""

  const cepClean = cep.replace(/\D/g, "")

  if (cepClean.length !== 8) return cep

  return cepClean.replace(/(\d{5})(\d{3})/, "$1-$2")
}

export function formatMoney(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

export function formatCardNumber(cardNumber: string): string {
  if (!cardNumber) return ""
  const clean = cardNumber.replace(/\D/g, "")

  return clean.replace(/(\d{4})(?=\d)/g, "$1 ")
}

export function applyMask(value: string, mask: string): string {
  let result = ""
  let index = 0

  for (let i = 0; i < mask.length && index < value.length; i++) {
    if (mask[i] === "#") {
      result += value[index]
      index++
    } else {
      result += mask[i]
      if (value[index] === mask[i]) index++
    }
  }

  return result
}
