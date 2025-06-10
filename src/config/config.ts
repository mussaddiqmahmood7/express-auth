interface ConfigProps{
    DB_URL: string,
    PORT:number,
    RefreshTokenSecret:string,
    AccessTokenSecret:string,
    VerifyTokenSecret:string,
}

export const config:ConfigProps={
    DB_URL: process.env.DB_URL ?? '',
    PORT: Number(process.env.PORT),
    RefreshTokenSecret:process.env.RefreshTokenSecret ?? '',
    AccessTokenSecret:process.env.AccessTokenSecret ?? '',
    VerifyTokenSecret:process.env.VerifyTokenSecret ?? '',
}