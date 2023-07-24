function getDate() {
    return new Date().toISOString()
}

export const log = {
    info: (...message: any[]) => {
        console.log('[INFO]', getDate(), ...message)        
    },
    error: (...message: any[]) => {
        console.error('[ERROR]', getDate(), ...message)
    },
    warning: (...message: any[]) => {
        console.error('[WARNING]', getDate(), ...message)
    },
}