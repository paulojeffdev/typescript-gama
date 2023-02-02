export class Logger {
    info = (message: string) => {
        console.log(`INFO - ${message}`)
    }

    error = (message: string, error: any) => {
        console.error(`ERROR - ${message} - ${error}`)
    }
}