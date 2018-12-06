interface JSConsole {
    clear: () => void
    log: (str: string) => void
    print: (str: string) => void
    println: (str: string) => void
    requestInput: (prompt: string, callback: (str: string) => void) => void
    write: (str: string) => void
}