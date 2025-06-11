interface ConfigProps{
    DB_URL: string,
    PORT:number,
    V1_URL:string,
    RefreshTokenSecret:string,
    AccessTokenSecret:string,
    VerifyTokenSecret:string,
}

export const config:ConfigProps={
    DB_URL: process.env.DB_URL ?? '',
    V1_URL: process.env.V1_URL ?? '',
    PORT: Number(process.env.PORT),
    RefreshTokenSecret:process.env.RefreshTokenSecret ?? '',
    AccessTokenSecret:process.env.AccessTokenSecret ?? '',
    VerifyTokenSecret:process.env.VerifyTokenSecret ?? '',
}