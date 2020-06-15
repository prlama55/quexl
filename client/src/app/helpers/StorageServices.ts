export class StorageServices {
    sessionStorageSupported: boolean
    private static sessionStorageSupported: boolean;
    constructor() {
        try{
            sessionStorage.setItem('test','test')
            sessionStorage.removeItem('test')
            this.sessionStorageSupported= true
        }catch (e) {
            this.sessionStorageSupported= false
        }
    }
    static save(key: string, data): void{
        if( this.sessionStorageSupported){
            sessionStorage.setItem(key, data)
        }else{
            localStorage.setItem(key, data)
        }
    }
    static get(key: string): string{
        if( this.sessionStorageSupported){
            return sessionStorage.getItem(key)
        }else{
            return localStorage.getItem(key)
        }
    }

    static remove(key: string): void{
        if( this.sessionStorageSupported){
            sessionStorage.removeItem(key)
        }else{
            localStorage.removeItem(key)
        }
    }
    static clear(): void{
        if( this.sessionStorageSupported){
            sessionStorage.clear()
        }else{
            localStorage.clear()
        }
    }
}
