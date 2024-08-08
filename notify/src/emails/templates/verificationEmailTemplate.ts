export const verifyEmailTemplate = (app: string, name: string, link: string, exp: number): string => {
  return `
    <div style="text-align: center; height: 70px; background-color: #DCDCDC; border-radius: 3px">
    <p style="font-size: 35px">${app}</p>
    </div>
    <div style="padding: 30px; font-size: 18px">
    <p>Hello, ${name}</p>
    <p>There's one quick step you need to complete before creating your ${app} account.
    <br />
    Let's make sure this is the right email address for you - please confirm this is the right address to use for your new account.
    </p>
    <p>Please click on this <a href="${link}">verification link</a> to get started on ${app}.</p>
    <p>Verification codes expire after ${exp} minutes.<br />Don't share this link with anyone.</p>
    <p>Thanks,<br />${app}</p>
    </div>
    `;
};
