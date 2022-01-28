import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AppConfigService {
    // private endpointPrefix = 'http://localhost:8080';
    private endpointPrefix = '';
    private microfrontend = false;

    setEndpointPrefix(endpointPrefix: string): void {
        this.endpointPrefix = endpointPrefix;
    }

    setMicrofrontend(microfrontend = true): void {
        this.microfrontend = microfrontend;
    }

    isMicrofrontend(): boolean {
        return this.microfrontend;
    }

    constructor() {
    }

    getEndpointFor(api: string, microservice?: string): string {
        if (microservice) {
            return `${this.endpointPrefix}services/${microservice}/${api}`;
        }
        return `${this.endpointPrefix}${api}`;
    }
}
