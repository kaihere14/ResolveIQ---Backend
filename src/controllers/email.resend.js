import { Resend } from "resend";

const resend = new Resend("re_KKJzoeyD_MMd5MpoUdpvcWVNbdFc9xNGN");

const send = async (user, accessCode) => {
  const response = await resend.emails.send({
    from: "ResolveIQ <no-reply@pawpick.store>",
    to: user.email,
    subject: "Welcome to ResolveIQ - Account Created",
    html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to ResolveIQ</title>
            <style>
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #1a1a1a;
                background-color: #f8fafc;
                padding: 0;
                margin: 0;
              }
              
              .email-wrapper {
                max-width: 560px;
                margin: 40px auto;
                background-color: #ffffff;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
                border-radius: 8px;
                overflow: hidden;
              }
              
              .header {
                background-color: #ffffff;
                padding: 48px 40px 24px;
                text-align: center;
                border-bottom: 1px solid #e2e8f0;
              }
              
              .logo {
                font-size: 24px;
                font-weight: 700;
                color: #0f172a;
                margin-bottom: 8px;
                letter-spacing: -0.025em;
              }
              
              .subtitle {
                font-size: 14px;
                color: #64748b;
                font-weight: 400;
              }
              
              .content {
                padding: 40px;
              }
              
              .greeting {
                font-size: 16px;
                color: #0f172a;
                margin-bottom: 24px;
                font-weight: 500;
              }
              
              .message {
                font-size: 15px;
                color: #475569;
                margin-bottom: 32px;
                line-height: 1.6;
              }
              
              .credentials-section {
                background-color: #f8fafc;
                border: 1px solid #e2e8f0;
                border-radius: 6px;
                padding: 24px;
                margin: 32px 0;
              }
              
              .credentials-title {
                font-size: 14px;
                font-weight: 600;
                color: #0f172a;
                margin-bottom: 16px;
                text-transform: uppercase;
                letter-spacing: 0.025em;
              }
              
              .credential-row {
                display: flex;
                align-items: center;
                margin-bottom: 16px;
                padding: 0;
              }
              
              .credential-row:last-child {
                margin-bottom: 0;
              }
              
              .credential-label {
                font-size: 13px;
                color: #64748b;
                font-weight: 500;
                width: 100px;
                flex-shrink: 0;
                margin-right: 16px;
              }
              
              .credential-value {
                font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
                font-size: 14px;
                color: #0f172a;
                background-color: #ffffff;
                padding: 10px 12px;
                border-radius: 4px;
                border: 1px solid #e2e8f0;
                font-weight: 500;
                flex: 1;
                word-break: break-all;
              }
              
              .security-notice {
                background-color: #f0f9ff;
                border-left: 3px solid #0ea5e9;
                padding: 16px 20px;
                margin: 32px 0;
                border-radius: 0 4px 4px 0;
              }
              
              .security-notice-text {
                font-size: 14px;
                color: #0369a1;
                margin: 0;
              }
              
              .cta-container {
                text-align: center;
                margin: 40px 0;
              }
              
              .cta-button {
                display: inline-block;
                background-color: #0f172a;
                color: #ffffff;
                text-decoration: none;
                padding: 12px 24px;
                border-radius: 6px;
                font-size: 14px;
                font-weight: 500;
                transition: background-color 0.2s ease;
              }
              
              .features {
                margin: 40px 0;
              }
              
              .features-title {
                font-size: 16px;
                font-weight: 600;
                color: #0f172a;
                margin-bottom: 20px;
              }
              
              .feature-list {
                list-style: none;
                padding: 0;
              }
              
              .feature-item {
                padding: 12px 0;
                border-bottom: 1px solid #f1f5f9;
                font-size: 14px;
                color: #475569;
              }
              
              .feature-item:last-child {
                border-bottom: none;
              }
              
              .feature-name {
                font-weight: 500;
                color: #0f172a;
              }
              
              .closing {
                margin-top: 40px;
                padding-top: 24px;
                border-top: 1px solid #f1f5f9;
              }
              
              .closing-text {
                font-size: 14px;
                color: #475569;
                margin-bottom: 16px;
              }
              
              .signature {
                font-size: 14px;
                color: #0f172a;
                font-weight: 500;
              }
              
              .footer {
                background-color: #f8fafc;
                padding: 32px 40px;
                border-top: 1px solid #e2e8f0;
                text-align: center;
              }
              
              .footer-text {
                font-size: 12px;
                color: #64748b;
                margin-bottom: 8px;
              }
              
              @media (max-width: 600px) {
                .email-wrapper {
                  margin: 20px;
                  border-radius: 0;
                }
                
                .header {
                  padding: 32px 24px 16px;
                }
                
                .content {
                  padding: 24px;
                }
                
                .footer {
                  padding: 24px;
                }
                
                .credential-row {
                  flex-direction: column;
                  align-items: flex-start;
                  gap: 8px;
                }
                
                .credential-label {
                  width: auto;
                  margin-right: 0;
                }
                
                .credential-value {
                  width: 100%;
                }
              }
            </style>
          </head>
          <body>
            <div class="email-wrapper">
              <div class="header">
                <div class="logo">ResolveIQ</div>
                <div class="subtitle">Issue Resolution Platform</div>
              </div>
              
              <div class="content">
                <div class="greeting">
                  Hello ${user.username},
                </div>
                
                <div class="message">
                  Your account has been set up successfully on ResolveIQ. You can now access our issue tracking and resolution platform using the credentials below.
                </div>
                
                <div class="credentials-section">
                  <div class="credentials-title">Login Credentials</div>
                  
                  <div class="credential-row">
                    <div class="credential-label">Username</div>
                    <div class="credential-value">${user.username}</div>
                  </div>
                  
                  <div class="credential-row">
                    <div class="credential-label">Access Code</div>
                    <div class="credential-value">${accessCode}</div>
                  </div>
                </div>
                
                <div class="security-notice">
                  <p class="security-notice-text">
                    <strong>Important:</strong> Please update your access code after your first login through your account settings.
                  </p>
                </div>
                
                <div class="cta-container">
                  <span class="cta-button">
                    Get Started with ResolveIQ
                  </span>
                </div>
                
                <div class="features">
                  <div class="features-title">What You Can Do</div>
                  <ul class="feature-list">
                    <li class="feature-item">
                      <span class="feature-name">Issue Tracking</span> - Create and monitor resolution progress
                    </li>
                    <li class="feature-item">
                      <span class="feature-name">Team Collaboration</span> - Work efficiently with your team
                    </li>
                    <li class="feature-item">
                      <span class="feature-name">Analytics Dashboard</span> - Track performance and trends
                    </li>
                    <li class="feature-item">
                      <span class="feature-name">Smart Resolution</span> - Automated tools for faster solutions
                    </li>
                  </ul>
                </div>
                
                <div class="closing">
                  <div class="closing-text">
                    Need help getting started? Contact your system administrator or our support team.
                  </div>
                  
                  <div class="signature">
                    The ResolveIQ Team
                  </div>
                </div>
              </div>
              
              <div class="footer">
                <div class="footer-text">
                  This account was created for you by your system administrator.
                </div>
              </div>
            </div>
          </body>
          </html>
        `,
  });
  return response;
};

export { send };
