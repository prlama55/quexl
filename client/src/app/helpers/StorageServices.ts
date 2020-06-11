import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageServices {
    sessionStorageSupported: boolean
    constructor() {
        try{
            sessionStorage.setItem('test','test')
            sessionStorage.removeItem('test')
            this.sessionStorageSupported= true
        }catch (e) {
            this.sessionStorageSupported= false
        }
    }
    save(key: string, data): void{
        if( this.sessionStorageSupported){
            sessionStorage.setItem(key, data)
        }else{
            localStorage.setItem(key, data)
        }
    }
    get(key: string): any{
        if( this.sessionStorageSupported){
            return sessionStorage.getItem(key)
        }else{
            return localStorage.getItem(key)
        }
    }

    remove(key: string): void{
        if( this.sessionStorageSupported){
            sessionStorage.removeItem(key)
        }else{
            localStorage.removeItem(key)
        }
    }
    clear(): void{
        if( this.sessionStorageSupported){
            sessionStorage.clear()
        }else{
            localStorage.clear()
        }
    }
}
