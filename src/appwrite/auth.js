import {Client, Account, ID} from 'appwrite';
import conf from '../config';

export class AuthService{
    Client = new Client();
    account;

    constructor(){
        this.Client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.projectId);
        this.account = new Account(this.Client);
    }

    // Create Account
    async createAccount({email,password,name}){
        try {
            const userAccount = this.account.create(ID.unique(),email,password,name);
            if (userAccount) {
                // call another method
                return this.loginAccount({email, password});                
            } else {
                return userAccount;                
            }            
        } catch (error) {
            return error
        }
    }

    // Login Account
    async loginAccount({email,password}){
        try {
            return await this.account.createEmailSession(email, password);            
        } catch (error) {
            throw error            
        }
    }

    // Get Current User
    async getCurrentUser(){
        try {
            return await this.account.get();              
        } catch (error) {
            throw error            
        }
        return null
    }

    // Logout Account
    async logoutAccount(){
        try {
            return await this.account.deleteSessions();            
        } catch (error) {
            throw error            
        }
    }      
}

const authService = new AuthService();

export default authService;