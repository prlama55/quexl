export class StorageServices {
    static save(key: string, data): void{
        sessionStorage.setItem(key, data)
    }
    static get(key: string): string{
        return sessionStorage.getItem(key)
    }

    static remove(key: string): void{
        sessionStorage.removeItem(key)
    }
    static clear(): void{
        sessionStorage.clear()
    }
}
