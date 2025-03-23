const verifyCodeTemplate = (email, verifyCode) => {
    return `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9f9f9; padding: 30px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); overflow: hidden;">
          <div style="background-color: #007BFF; padding: 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0;">نظام إدارة المكتبة</h1>
          </div>
          <div style="padding: 30px; text-align: center;">
            <h2 style="color: #333333;">مرحباً ${email} 👋</h2>
            <p style="font-size: 18px; color: #555555; margin: 20px 0;">
              شكرًا لتسجيلك! إليك رمز التفعيل الخاص بك:
            </p>
            <div style="background-color: #f1f1f1; display: inline-block; padding: 15px 30px; border-radius: 8px; margin: 20px 0;">
              <span style="font-size: 32px; color: #007BFF; font-weight: bold; letter-spacing: 2px;">${verifyCode}</span>
            </div>
            <p style="font-size: 16px; color: #777777; margin-top: 20px;">
              صلاحية الكود: <strong>10 دقائق</strong>
            </p>
            <p style="font-size: 14px; color: #999999; margin-top: 30px;">
              إذا لم تطلب هذا الكود، يمكنك تجاهل هذه الرسالة بأمان.
            </p>
          </div>
          <div style="background-color: #f5f5f5; text-align: center; padding: 15px; font-size: 12px; color: #999999;">
            &copy; 2025 نظام إدارة المكتبة - جميع الحقوق محفوظة.
          </div>
        </div>
      </div>
    `;
  };
  
  module.exports = verifyCodeTemplate;
  