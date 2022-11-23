export default {
    on: "messageCreate",

    async invoke (message: any) {
        console.log(message)
    },
}