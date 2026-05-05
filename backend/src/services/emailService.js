import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.RESEND_FROM || 'LinuxQuest <noreply@linuxquest.dev>';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

export async function sendVerificationEmail(email, username, token) {
  const verifyUrl = `${FRONTEND_URL}/verificar-email?token=${token}`;

  if (!process.env.RESEND_API_KEY) {
    console.warn('[EMAIL] RESEND_API_KEY no configurado — link de verificación:');
    console.warn('[EMAIL]', verifyUrl);
    return;
  }

  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: 'Verifica tu cuenta — LinuxQuest',
    html: `
      <div style="font-family:'Courier New',monospace;background:#0a0e0a;color:#5fff7f;padding:32px;max-width:480px;margin:0 auto;border:2px solid #5fff7f;">
        <div style="letter-spacing:3px;font-size:20px;font-weight:bold;margin-bottom:4px;">LINUXQUEST</div>
        <div style="color:#aaa;font-size:11px;letter-spacing:2px;margin-bottom:28px;">VERIFICACIÓN DE CUENTA</div>

        <p style="margin-bottom:6px;">Hola, <strong style="color:#fff;">${username}</strong>.</p>
        <p style="margin-bottom:24px;color:#aaa;font-size:14px;">
          Haz clic en el botón para verificar tu correo y activar tu cuenta.
        </p>

        <a href="${verifyUrl}"
           style="display:inline-block;background:#5fff7f;color:#0a0e0a;padding:14px 28px;
                  text-decoration:none;font-weight:bold;letter-spacing:2px;font-size:13px;">
          ▶ VERIFICAR CUENTA
        </a>

        <div style="margin-top:28px;padding-top:16px;border-top:1px solid #1a3a1a;color:#555;font-size:11px;line-height:1.6;">
          Este link expira en 24 horas.<br>
          Si no creaste esta cuenta, ignora este correo.
        </div>
        <div style="margin-top:12px;color:#333;font-size:10px;word-break:break-all;">
          ${verifyUrl}
        </div>
      </div>
    `,
  });
}
