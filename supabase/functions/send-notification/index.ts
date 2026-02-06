import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface NotificationRequest {
  userEmail: string;
  decision: "confirmed" | "declined";
  venue: {
    name: string;
    address: string;
    city: string;
  };
  date: string;
  time: string;
}

const OWNER_EMAIL = "joaoluizlopespimenta@gmail.com";

const handler = async (req: Request): Promise<Response> => {
  console.log("send-notification function invoked");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userEmail, decision, venue, date, time }: NotificationRequest = await req.json();
    console.log(`Processing ${decision} decision from ${userEmail}`);

    // Validate required fields
    if (!userEmail || !decision || !venue || !date || !time) {
      console.error("Missing required fields");
      throw new Error("Missing required fields");
    }

    const emailPromises = [];

    // Email to owner (you) - always send
    const ownerSubject = decision === "confirmed" 
      ? "💕 Ela confirmou! O encontro está marcado!" 
      : "💔 Ela declinou o convite";
    
    const ownerHtml = decision === "confirmed" 
      ? `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #8b2252; text-align: center;">💕 Boa notícia!</h1>
          <p style="font-size: 18px; text-align: center; color: #333;">
            <strong>${userEmail}</strong> confirmou presença para o encontro!
          </p>
          <div style="background: #fdf2f4; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h2 style="color: #8b2252; margin-top: 0;">Detalhes do Encontro</h2>
            <p><strong>Local:</strong> ${venue.name}</p>
            <p><strong>Endereço:</strong> ${venue.address}, ${venue.city}</p>
            <p><strong>Data:</strong> ${date}</p>
            <p><strong>Horário:</strong> ${time}</p>
          </div>
          <p style="text-align: center; color: #666;">
            Aproveitem cada momento juntos! ❤️
          </p>
        </div>
      `
      : `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #666; text-align: center;">💔 Notificação</h1>
          <p style="font-size: 18px; text-align: center; color: #333;">
            <strong>${userEmail}</strong> declinou o convite para o encontro.
          </p>
          <p style="text-align: center; color: #666; margin-top: 30px;">
            Talvez seja apenas um momento... o amor sempre encontra um caminho.
          </p>
        </div>
      `;

    console.log("Sending email to owner...");
    emailPromises.push(
      resend.emails.send({
        from: "Surpresa de Amor <onboarding@resend.dev>",
        to: [OWNER_EMAIL],
        subject: ownerSubject,
        html: ownerHtml,
      })
    );

    // Email to her - only if confirmed
    if (decision === "confirmed") {
      const userHtml = `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #8b2252; text-align: center;">💕 Encontro Confirmado!</h1>
          <p style="font-size: 18px; text-align: center; color: #333;">
            Mal posso esperar para te ver!
          </p>
          <div style="background: #fdf2f4; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h2 style="color: #8b2252; margin-top: 0;">Detalhes do Nosso Encontro</h2>
            <p><strong>📍 Local:</strong> ${venue.name}</p>
            <p><strong>🏠 Endereço:</strong> ${venue.address}, ${venue.city}</p>
            <p><strong>📅 Data:</strong> ${date}</p>
            <p><strong>🕐 Horário:</strong> ${time}</p>
          </div>
          <p style="text-align: center; color: #8b2252; font-size: 20px;">
            Te amo! ❤️
          </p>
        </div>
      `;

      console.log("Sending confirmation email to user...");
      emailPromises.push(
        resend.emails.send({
          from: "Surpresa de Amor <onboarding@resend.dev>",
          to: [userEmail],
          subject: "💕 Nosso Encontro Especial - Confirmado!",
          html: userHtml,
        })
      );
    }

    const results = await Promise.all(emailPromises);
    console.log("Emails sent successfully:", results);

    return new Response(
      JSON.stringify({ success: true, emailsSent: results.length }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: unknown) {
    console.error("Error in send-notification function:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
