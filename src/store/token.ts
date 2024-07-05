class TokenService {
  private static instance: TokenService
  private accessToken: string | null = null

  public static getInstance(): TokenService {
    if (!TokenService.instance) {
      TokenService.instance = new TokenService()
    }
    return TokenService.instance
  }

  public getAccessToken(): string | null {
    return this.accessToken
  }

  public setAccessToken(token: string): void {
    this.accessToken = token
  }

}

export default TokenService.getInstance()
