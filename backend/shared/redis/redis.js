import ioredis from "ioredis"

const redis = new ioredis({
    url: process.env.REDIS_URL
})

redis.on("connect", () => {
    console.log("Redis connected")
})

export default redis