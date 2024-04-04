import conf from '../conf/conf'
import {Client, ID, Databases, Storage, Query} from 'appwrite';


export class Service {
    Client = new Client();
    Databases;
    Storage;
    constructor(){
        this.Client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.projectId)
        this.Databases = new Databases(this.Client);
        this.Storag = new Storage(this.Client)    
    }

    // Create Post Service
    async createPost({title,slug,content,featuredImage,userId,status}){
        try {
            return await this.Databases.createDocument(
                conf.databaseId,
                conf.collectionId,
                slug,
                {
                    title,
                    content,
                    status,
                    featuredImage,
                    userId
                }
            );                
        } catch (error) {
            console.log('createpost error', error);
            throw error;            
        }

    };

    // Update Post Service
    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.Databases.updateDocument(
                conf.databaseId,
                conf.collectionId,
                slug,
                {
                    title,
                    content,
                    status,
                    featuredImage
                }
            )
            
        } catch (error) {
            console.log('update post error', error);
            throw error
        }
    }

    // Delete Post Service
    async deletePost(slug){
        try {
            await this.Databases.deleteDocument(
                conf.databaseId,
                conf.collectionId,
                slug,              
            )
            return true
        } catch (error) {
            console.log('delete post error', error);
            return false           
        }
    }

    // Get Post Service
    async getPost(slug){
        try {
            return await this.Databases.getDocument(
                conf.databaseId,
                conf.collectionId,
                slug
            );            
        } catch (error) {
            console.log('get post error', error);
            return false           
        }
    }

    // Get Posts Service
    async getPosts(queries = [Query.equal('status', 'active')]){
        try {
            return await this.Databases.listDocuments(
                conf.databaseId,
                conf.collectionId,
                queries
            );            
        } catch (error) {
            console.log('get posts error', error);
            return false            
        }
    }

    // File Upload Service
    async fileUpload(file){
        try {
            return await this.Storag.createFile(
                conf.storageBucket,
                ID.unique(),
                file
            );            
        } catch (error) {
            console.log('file upload error'. error);
            return false;            
        }
    }

    // File Delete Service
    async fileDelete(fileId){
        try {
             await this.Storag.deleteFile(
                conf.storageBucket,
                fileId
            );
            return true            
        } catch (error) {
            console.log('file delete error', error);
            return false;            
        }
    }

    // Get File Preview Service
     getFilePreview(fileId){        
        return  this.Storag.getFilePreview(
        conf.storageBucket, 
        fileId
        );
    };

}

const service = new Service();
export default service