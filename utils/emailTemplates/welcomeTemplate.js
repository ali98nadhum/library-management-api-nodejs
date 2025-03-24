const welcomeTemplate = (name) => {
    return `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
      <h2 style="color: #2c3e50; text-align: center;">تم تأكيد حسابك بنجاح 🎉</h2>
      <p style="font-size: 16px; color: #333333;">
        مرحبًا <strong>${name}</strong>،
      </p>
      <p style="font-size: 16px; color: #333333;">
        يسرنا إبلاغك بأنه قد تم تأكيد حسابك كموظف في نظام إدارة المكتبة الإلكترونية. يمكنك الآن الدخول إلى حسابك والبدء في إدارة محتوى المكتبة بكل سهولة.
      </p>
      <p style="font-size: 16px; color: #333333;">
        إذا واجهت أي مشكلة أو لديك استفسار، لا تتردد في التواصل مع فريق الدعم الخاص بنا.
      </p>
      <p style="font-size: 16px; color: #333333;">
        شكرًا لانضمامك إلى فريق المكتبة 💼📚
      </p>
      <hr style="margin: 20px 0;">
      <p style="font-size: 14px; color: #888888; text-align: center;">
        مع أطيب التحيات،<br>
        إدارة نظام المكتبة الإلكترونية
      </p>
    </div>
  </div>
    `;
  };
  
  module.exports = welcomeTemplate;
  