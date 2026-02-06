

# 💕 Surpresa de Aniversário de Namoro

Uma aplicação romântica e elegante para revelar o local do encontro especial, com um sistema de "jogo de adivinhação" baseado na data em que vocês se tornaram um casal.

---

## 🎨 Design Visual

**Tema Romântico e Elegante:**
- Paleta de cores em tons de rosa suave, vermelho bordô e dourado
- Tipografia elegante com fontes cursivas para títulos e serif para textos
- Elementos sutis de corações e decorações delicadas
- Fundo com gradiente suave e possíveis animações leves (como corações flutuantes)

---

## 📱 Fluxo da Aplicação

### Página 1: Entrada (Formulário de Email)
- Campo de e-mail para identificação
- Botão "Confirmar" para avançar
- Design misterioso e convidativo

### Página 2: Desafio da Data
- Pergunta: "Qual o dia que nos tornamos um só?"
- Três campos separados: Dia, Mês e Ano
- Botões "Confirmar" e "Limpar"
- Tooltip com dica: "O dia da entrega dos anéis, olhe seu Instagram"
- Mensagem de erro elegante se a data estiver incorreta
- Validação da data correta: 14/02/2022

### Página 3: Revelação do Local
- Título celebrativo: "Parabéns, você conseguiu! ❤️"
- Subtítulo: "Agora, te convido a relembrar essa data :3"
- Informações do local (placeholder editável posteriormente):
  - Nome do restaurante/bistrô
  - Endereço completo
  - Data e horário: 14/02/2026, às 19h
  - Mapa interativo do Google Maps
- Botões "Confirmar" e "Declinar"

### Modais de Resposta
- **Confirmação:** Modal alegre com "Que alegria! Aguardo você ansiosamente."
- **Declinação:** Pop-up com ":( Valeu a tentativa. Eu ainda te amo muito!"
- Após qualquer decisão, os botões são desabilitados

---

## 📧 Sistema de Notificações

**Emails enviados via Resend (Edge Function):**
1. **Para ela** (ao confirmar): Resumo com todos os dados do encontro
2. **Para você** (joaoluizlopespimenta@gmail.com): Notificação sobre a decisão tomada (confirmou ou declinou)

---

## 🛠️ Requisitos Técnicos

- **Frontend:** React + TypeScript + TailwindCSS
- **Backend:** Supabase Edge Functions (para envio de emails)
- **Serviço de Email:** Resend (você já tem conta)
- **Mapa:** Embed do Google Maps
- **Estado:** Gerenciado na sessão do navegador

---

## 📋 Próximos Passos

Após aprovação, precisarei que você:
1. Configure a API Key do Resend no projeto
2. Forneça o nome e endereço do restaurante quando decidir
3. (Opcional) Imagens ou logo especial se quiser personalizar ainda mais

