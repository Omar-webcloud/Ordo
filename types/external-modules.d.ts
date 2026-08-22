declare module "bcrypt" {
  const bcrypt: any;
  export default bcrypt;
}

declare module "jsonwebtoken" {
  namespace jwt {
    interface SignOptions {
      expiresIn?: string | number;
    }
  }

  const jwt: {
    sign(payload: object, secret: string, options?: jwt.SignOptions): string;
    verify(token: string, secret: string): unknown;
  };

  export default jwt;
}
