declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '../../api/api' {
    import { AxiosInstance } from 'axios';
  
    export function setUpAPICLient(ctx?: any): AxiosInstance;
}